import React, { useState } from 'react';
import axios from 'axios';
import './PlaylistGenerator.css';

export default function PlaylistGenerator() {
  const [input, setInput] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/api/playlist/generate', {
        mood: input,
      });
      setPlaylist(res.data.tracks || []); // fallback in case `tracks` is undefined
    } catch (err) {
      console.error(err);
      alert('Error generating playlist. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="playlist-generator">
      <h2>Playlist Generator 🎶</h2>
      <input
        type="text"
        placeholder="Enter mood or genre (e.g. chill, happy, energetic)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Playlist'}
      </button>

      <ul>
        {playlist.map((track, i) => (
          <li key={i}>
            <strong>{track.name}</strong> by {track.artists.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
