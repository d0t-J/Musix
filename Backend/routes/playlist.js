// Playlist generator based on genre
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Allowed genres whitelist
const allowedGenres = [
  'pop', 'rock', 'hip-hop', 'classical', 'jazz', 'electronic',
  'blues', 'country', 'reggae', 'metal', 'dance', 'indie',
  'soul', 'punk', 'r&b', 'k-pop', 'folk', 'funk', 'techno', 'edm'
];

// Token cache variables
let accessToken = '';
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Date.now();
  if (accessToken && now < tokenExpiresAt) return accessToken;

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64'),
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiresAt = now + response.data.expires_in * 1000;
  return accessToken;
}

// GET /api/playlist/generate?genres=pop,jazz
router.get('/generate', async (req, res) => {
  try {
    const rawGenres = req.query.genres;
    if (!rawGenres) {
      return res.status(400).json({ error: "Missing 'genres' query parameter." });
    }

    const genres = rawGenres
      .split(',')
      .map(g => g.trim().toLowerCase())
      .filter(g => allowedGenres.includes(g));

    if (genres.length === 0) {
      return res.status(400).json({
        error: `No valid genres provided. Allowed genres: ${allowedGenres.join(', ')}`
      });
    }

    console.log("✅ Filtered genres:", genres);

    const token = await getAccessToken();

    // Create a query string joining genres with OR for search
    const query = genres.map(g => `"${g}"`).join(' OR ');

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: query,
        type: 'track',
        limit: 10,
      },
    });

    const tracks = response.data.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(a => a.name),
      url: `https://open.spotify.com/embed/track/${track.id}`,
    }));

    console.log(`✅ Retrieved ${tracks.length} tracks from Spotify`);

    res.json(tracks);
  } catch (error) {
    console.error("❌ Error in /generate");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({
      error: "Something went wrong while generating playlist.",
    });
  }
});

module.exports = router;
