import { useMemo } from 'react';
import { generateCharacter } from '../../character-generator/src/index.js';
import './DanceFloor.css';

/**
 * DanceFloor component - displays all participant avatars at their positions
 * @param {Array} participants - List of participants from presence
 */
function DanceFloor({ participants }) {
  // Generate avatars for all participants
  const avatars = useMemo(() => {
    return participants
      .filter(p => p.avatarSeed && p.position)
      .map(participant => {
        try {
          const character = generateCharacter({ seed: participant.avatarSeed });
          return {
            userId: participant.userId,
            nickname: participant.nickname,
            svg: character.svg,
            position: participant.position,
            isDJ: participant.isDJ,
          };
        } catch (error) {
          console.error('[DanceFloor] Error generating avatar for participant:', participant.userId, error);
          return null;
        }
      })
      .filter(Boolean); // Remove any null entries
  }, [participants]);

  return (
    <div className="dance-floor">
      {avatars.map(avatar => (
        <div
          key={avatar.userId}
          className={`avatar-container ${avatar.isDJ ? 'avatar-dj' : ''}`}
          style={{
            left: `${avatar.position.x}%`,
            top: `${avatar.position.y}%`,
          }}
        >
          <div
            className="avatar-display"
            dangerouslySetInnerHTML={{ __html: avatar.svg }}
          />
          <div className="avatar-label">
            {avatar.isDJ && '🎧 '}
            {avatar.nickname}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DanceFloor;
