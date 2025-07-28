import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center">
        <MusicNoteIcon sx={{ fontSize: 60, color: "#ff4f85", mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Welcome to TuneTalk
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Where music meets meaningful conversation.
        </Typography>

        <Typography variant="body1" paragraph>
          TuneTalk is a unique space built for music lovers who want more than just a playlist. Whether you're vibing to lo-fi beats or sharing your favorite tracks with friends, we let you do it all — together.
        </Typography>

        <Typography variant="body1" paragraph>
            🌟 <strong>Share your music moments</strong> in the community feed. <br />
            💬 <strong>Drop comments</strong> on your friends’ posts. <br />
          💬 <strong>Chat in real-time</strong> with fellow listeners. <br />
           🎤 <strong>Upload your own voice</strong> — sing, hum, or just vibe.
          {/* 🧠 <strong>AI-powered</strong> features to enhance your musical journey. */}
        </Typography>

        <Box mt={4}>
          <ChatIcon sx={{ fontSize: 40, color: "#5ddcdc", mx: 1 }} />
          <MusicNoteIcon sx={{ fontSize: 40, color: "#cb075b", mx: 1 }} />
          <FavoriteIcon sx={{ fontSize: 40, color: "#ff4f85", mx: 1 }} />
        </Box>

        <Typography variant="body2" color="text.secondary" mt={4}>
          Built with ❤️ for people who feel music in their soul.
        </Typography>
      </Box>
    </Container>
  );
}
