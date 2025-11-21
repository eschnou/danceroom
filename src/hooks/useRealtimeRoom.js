import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { getUserId, generateNickname } from '../utils/userUtils';

/**
 * Hook to manage Supabase Realtime room connection and presence
 * @param {string} slug - Room slug identifier
 * @param {boolean} isDJ - Whether the current user is the DJ
 */
export function useRealtimeRoom(slug, isDJ = false) {
  const [participants, setParticipants] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const channelRef = useRef(null);
  const userId = getUserId();
  const nickname = generateNickname();

  // Get avatar seed from localStorage (saved in Home.jsx)
  const getAvatarSeed = () => {
    try {
      const savedCharacter = localStorage.getItem('danceroom_character');
      if (savedCharacter) {
        const character = JSON.parse(savedCharacter);
        // Use seed (should always exist now since Home.jsx generates with seed)
        if (character.seed) {
          return character.seed;
        }
        console.warn('[useRealtimeRoom] Character has no seed, using ID as fallback');
        return character.id;
      }
    } catch (error) {
      console.error('[useRealtimeRoom] Error reading character from localStorage:', error);
    }
    // Fallback: generate seed from userId if no character saved
    console.warn('[useRealtimeRoom] No character found in localStorage, using userId as seed');
    return `${userId}-fallback`;
  };

  // Generate random position on the dance floor (lower part of screen)
  const generateDanceFloorPosition = () => {
    // Generate position in the lower 40% of the screen (dance floor area)
    // x: 10% to 90% (avoid edges)
    // y: 60% to 90% (lower part of screen)
    return {
      x: 10 + Math.random() * 80, // 10-90%
      y: 60 + Math.random() * 30, // 60-90%
    };
  };

  // Store position in ref so it doesn't change on re-renders
  const positionRef = useRef(null);
  if (!positionRef.current) {
    positionRef.current = generateDanceFloorPosition();
  }

  const avatarSeed = getAvatarSeed();

  useEffect(() => {
    if (!slug) return;

    console.log(`[useRealtimeRoom] Connecting to room: ${slug}, isDJ: ${isDJ}`);

    // Create channel
    const channel = supabase.channel(slug, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channelRef.current = channel;

    // Listen for presence sync (full state)
    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      console.log('[Presence] Sync:', state);

      // Convert presence state to participants array
      const participantsList = [];
      Object.keys(state).forEach((key) => {
        state[key].forEach((presence) => {
          participantsList.push({
            userId: key,
            ...presence, // Include ALL presence fields (nickname, isDJ, joinedAt, playbackState, etc.)
          });
        });
      });

      setParticipants(participantsList);
    });

    // Listen for presence join
    channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('[Presence] User joined:', key, newPresences);
    });

    // Listen for presence leave
    channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('[Presence] User left:', key, leftPresences);
    });

    // Subscribe to the channel
    channel.subscribe(async (status) => {
      console.log('[Channel] Subscription status:', status);

      if (status === 'SUBSCRIBED') {
        setIsConnected(true);

        // Track our presence with avatar and position
        const presenceData = {
          nickname,
          isDJ,
          joinedAt: Date.now(),
          avatarSeed,
          position: positionRef.current,
        };

        console.log('[Presence] Tracking:', presenceData);
        await channel.track(presenceData);
      }
    });

    // Cleanup on unmount
    return () => {
      console.log('[useRealtimeRoom] Cleaning up channel:', slug);
      channel.unsubscribe();
      channelRef.current = null;
      setIsConnected(false);
    };
  }, [slug, isDJ, userId, nickname]);

  /**
   * Send a broadcast event to all clients in the room
   */
  const sendBroadcast = useCallback((event, payload) => {
    if (!channelRef.current) {
      console.error('[sendBroadcast] Channel not initialized');
      return;
    }

    console.log(`[Broadcast] Sending event: ${event}`, payload);
    channelRef.current.send({
      type: 'broadcast',
      event,
      payload,
    });
  }, []);

  /**
   * Update presence data (for DJ to broadcast playback state)
   */
  const updatePresence = useCallback((presenceData) => {
    if (!channelRef.current) {
      console.error('[updatePresence] Channel not initialized');
      return;
    }

    console.log('[Presence] Updating:', presenceData);
    channelRef.current.track({
      nickname,
      isDJ,
      joinedAt: Date.now(),
      avatarSeed,
      position: positionRef.current,
      ...presenceData,
    });
  }, [nickname, isDJ, avatarSeed]);

  /**
   * Subscribe to a broadcast event
   */
  const onBroadcast = useCallback((event, callback) => {
    if (!channelRef.current) {
      console.error('[onBroadcast] Channel not initialized');
      return;
    }

    channelRef.current.on('broadcast', { event }, callback);
  }, []);

  return {
    channel: channelRef.current,
    participants,
    isConnected,
    sendBroadcast,
    onBroadcast,
    updatePresence,
    currentUser: {
      userId,
      nickname,
      isDJ,
    },
  };
}
