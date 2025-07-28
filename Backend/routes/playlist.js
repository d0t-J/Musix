// backend/routes/playlist.js
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Utility to extract genres from Gemini response
function extractGenres(text) {
  return text
    .toLowerCase()
    .match(/([a-z-]+)/g)
    ?.filter((genre, index, arr) => arr.indexOf(genre) === index) // remove duplicates
    .slice(0, 3); // use max 3 genres for Spotify API
}

// Main route
router.post('/generate', async (req, res) => {
  const { mood } = req.body;
  if (!mood) return res.status(400).json({ error: 'Mood is required' });

  try {
    // 🔮 Step 1: Use Gemini to get genres
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
    const result = await model.generateContent(`Suggest music genres based on this mood: "${mood}". Keep it short.`);
    const genresText = await result.response.text();
    const genres = extractGenres(genresText);

    if (!genres || genres.length === 0) {
      return res.status(400).json({ error: 'Could not determine genres from input.' });
    }

    console.log('🎵 Genres:', genres);

    // 🎧 Step 2: Get Spotify Access Token
    const spotifyAuth = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: { grant_type: 'client_credentials' },
      headers: {
        'Authorization': `Basic ${Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const token = spotifyAuth.data.access_token;

    // 🎶 Step 3: Get tracks using Spotify recommendations
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_genres: genres.join(','),
        limit: 10,
      },
    });

    const tracks = response.data.tracks.map(track => ({
      name: track.name,
      artists: track.artists.map(a => a.name),
      id: track.id,
    }));

    res.json({ tracks });

  } catch (err) {
    console.error('Error generating playlist:', err.message || err);
    res.status(500).json({ error: 'Something went wrong while generating playlist.' });
  }
});

module.exports = router;
