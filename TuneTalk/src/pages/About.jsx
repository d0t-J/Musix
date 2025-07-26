import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function About() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1" gutterBottom>
                    About TuneTalk
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Learn more about our mission and what we do.
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to TuneTalk - your destination for music discovery
                    and conversation. We're passionate about connecting people
                    through the power of music.
                </Typography>
            </Box>
        </Container>
    );
}
