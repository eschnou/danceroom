# 🎵 SunoRooms

> **Listen to music together, in perfect sync** 🎧

A real-time multiplayer music room where you can create unique avatars, join virtual dance floors, and enjoy synchronized music playback with friends. Built during the Vibe Coding Fight Club.

![SunoRooms Demo](./demo.png)

## ✨ Features

### 🎭 **Character Creation**
- **Procedurally generated avatars** with seeded randomization
- Unique character styles: bodies, heads, faces, hair, and clothing
- Consistent avatar appearance across all clients using seed sharing

### 🕺 **Animated Dance Floor**
- Avatars appear on the dance floor when participants join
- **Smooth dancing animations** synchronized with music playback
- Multiple independent animations (body bounce, head bob, leg kicks, hair sway)
- Random positioning on the dance floor for a natural party vibe

### 🎶 **Synchronized Music Playback**
- **DJ mode**: Upload tracks and control playback for the entire room
- **Visitor mode**: Auto-sync with current music and animations
- Late-joiner synchronization with timestamp-based audio alignment
- Supabase Realtime for instant playback control broadcasting

### 👥 **Real-time Presence**
- Live participant list with DJ and visitor roles
- Automatic avatar appearance/disappearance on join/leave
- Presence metadata sharing (nickname, avatar seed, position)

### 🔊 **Smart Audio Handling**
- Autoplay detection and user-friendly "Click to enable sound" prompt
- Browser autoplay policy compliance
- Synchronized audio across all participants

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for real-time and storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sunorooms.git
   cd sunorooms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Storage**

   In your Supabase project:
   - Create a storage bucket named `audio`
   - Make it public or configure appropriate policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## 🎮 How to Use

### Creating a Room (DJ Mode)

1. **Create your character** on the home page
2. Click **"Create Room"**
3. **Upload music tracks** using the upload zone
4. Use the **DJ controls** to play, pause, and skip tracks
5. Share the room code with friends!

### Joining a Room (Visitor Mode)

1. **Create your character** on the home page
2. Enter the **room code** provided by the DJ
3. Click **"Join Room"**
4. If music is playing, click **"Enable sound"** to hear it
5. Watch your avatar and others **dance on the floor**!

## 🛠️ Technology Stack

### Frontend
- **React 19** with Vite for fast development
- **React Router 7** for navigation
- **Web Audio API** for audio playback and synchronization

### Backend & Real-time
- **Supabase Realtime** for presence and broadcast channels
- **Supabase Storage** for audio file hosting

### Character Generation
- Custom **SVG-based avatar system** with procedural generation
- **Seeded randomization** for reproducible characters
- CSS animations for dancing effects

### Styling
- Pure CSS with custom animations
- Responsive design for desktop and mobile

## 📂 Project Structure

```
sunorooms/
├── src/
│   ├── components/         # React components
│   │   ├── Home.jsx       # Character creation & room join
│   │   ├── RoomView.jsx   # Main room interface (DJ/Visitor)
│   │   ├── DanceFloor.jsx # Animated avatar display
│   │   ├── Playlist.jsx   # Track list
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useRealtimeRoom.js  # Supabase presence
│   │   ├── useAudioPlayer.js   # Audio sync
│   │   └── usePlaylist.js      # Track management
│   └── utils/             # Utility functions
├── character-generator/   # Avatar generation system
│   ├── src/
│   │   ├── core/         # Main generator
│   │   ├── parts/        # Body parts (head, body, hair, etc.)
│   │   ├── templates/    # SVG structure
│   │   └── utils/        # Seeded random, SVG builder
│   └── demo/             # Standalone character demos
└── README.md
```

## 🎨 Features in Detail

### Avatar System

The character generator creates unique SVG avatars with:
- **4 head shapes**
- **3 eye types** (normal, happy, surprised)
- **4 mouth types** (neutral, smile, sad, open)
- **4 hair styles** (short, spiky, long, bald)
- **Multiple skin tones and clothing colors**

All avatars share a unified SVG structure, enabling universal CSS animations.

### Dance Animations

When music plays, avatars perform synchronized dance moves:
- **Body bounce**: Gentle up-down movement with rotation
- **Head bob**: Subtle head nodding
- **Leg kicks**: Alternating leg movements
- **Hair sway**: Flowing hair motion

All animations are CSS-based and run at 2x slower speed for smooth, groovy movements.

### Real-time Synchronization

- **Presence tracking**: Supabase Realtime channels broadcast user presence
- **Position sharing**: Avatar positions are shared via presence metadata
- **Playback sync**: Audio playback state is broadcast to all participants
- **Late-joiner handling**: New users sync to current playback position using timestamps

## 🏆 Built During Vibe Coding Fight Club

This project was built in **4 hours** during the **Vibe Coding Fight Club** hackathon organized by [ClubAI](https://www.clubai.site/).

The challenge was to create a unique multiplayer experience combining real-time collaboration, audio synchronization, and creative visual elements. SunoRooms brings people together through music, dance, and procedurally generated avatars!

## 👥 Authors

Created with passion by:
- **Eschnou** - [GitHub](https://github.com/eschnou)
- **Sandro** - [GitHub](https://github.com/SeyZ)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License

Copyright (c) 2025 SunoRooms

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- Organized by [ClubAI](https://www.clubai.site/)
- Inspired by the joy of sharing music with friends

---

**Made with ❤️ during Vibe Coding Fight Club by Eschnou & Sandro**
