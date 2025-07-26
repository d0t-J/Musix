import React from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ProductHero from "../components/ProductHero";
import ProductCTA from "../components/ProductCTA";

// Styled components with bright colors
const GradientSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    color: "white",
}));

const FeatureCard = styled(Card)(({ theme }) => ({
    height: "100%",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-10px)",
    },
}));

const BrightButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 25,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    "&:hover": {
        background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
        transform: "scale(1.05)",
    },
}));

const HeroSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    color: "white",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
            "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        zIndex: 1,
    },
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    padding: "80px 0",
}));

export default function Home() {
    const features = [
        {
            icon: <MusicNoteIcon sx={{ fontSize: 40 }} />,
            title: "Stream Music",
            description:
                "Discover and enjoy your favorite tracks with high-quality streaming.",
        },
        {
            icon: <ChatIcon sx={{ fontSize: 40 }} />,
            title: "Live Chat",
            description:
                "Connect with music lovers worldwide through our real-time chat feature.",
        },
        {
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            title: "Community",
            description:
                "Join a vibrant community of music enthusiasts and share your passion.",
        },
        {
            icon: <HeadphonesIcon sx={{ fontSize: 40 }} />,
            title: "Premium Experience",
            description:
                "Enjoy ad-free listening with premium audio quality and exclusive content.",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <HeroSection>
                <Container
                    maxWidth="lg"
                    sx={{ position: "relative", zIndex: 2 }}
                >
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Chip
                                    label="🎵 New Experience"
                                    sx={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        color: "white",
                                        mb: 3,
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                    }}
                                />
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: { xs: "3rem", md: "4.5rem" },
                                        fontWeight: "bold",
                                        mb: 2,
                                        background:
                                            "linear-gradient(45deg, #FFD700, #FFA500)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    Welcome to TuneTalk
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 4,
                                        opacity: 0.9,
                                        fontSize: { xs: "1.5rem", md: "2rem" },
                                    }}
                                >
                                    Where Music Meets Conversation
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 4,
                                        opacity: 0.8,
                                        maxWidth: 500,
                                    }}
                                >
                                    Experience seamless music streaming while
                                    connecting with fellow music lovers in
                                    real-time chat rooms.
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <BrightButton
                                        component={Link}
                                        to="/chat"
                                        size="large"
                                        startIcon={<ChatIcon />}
                                    >
                                        Start Chatting
                                    </BrightButton>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        component={Link}
                                        to="/about"
                                        sx={{
                                            borderColor: "white",
                                            color: "white",
                                            borderWidth: 2,
                                            borderRadius: 25,
                                            padding: "12px 30px",
                                            fontSize: "1.1rem",
                                            fontWeight: "bold",
                                            "&:hover": {
                                                borderColor: "#FFD700",
                                                color: "#FFD700",
                                                backgroundColor:
                                                    "rgba(255, 215, 0, 0.1)",
                                            },
                                        }}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: 400,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        borderRadius: "50%",
                                        background:
                                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        animation: "pulse 2s infinite",
                                        "@keyframes pulse": {
                                            "0%": {
                                                transform: "scale(1)",
                                                boxShadow:
                                                    "0 0 0 0 rgba(240, 147, 251, 0.7)",
                                            },
                                            "70%": {
                                                transform: "scale(1.05)",
                                                boxShadow:
                                                    "0 0 0 20px rgba(240, 147, 251, 0)",
                                            },
                                            "100%": {
                                                transform: "scale(1)",
                                                boxShadow:
                                                    "0 0 0 0 rgba(240, 147, 251, 0)",
                                            },
                                        },
                                    }}
                                >
                                    <MusicNoteIcon
                                        sx={{ fontSize: 120, color: "white" }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection>
                <Container maxWidth="lg">
                    <Typography
                        variant="h2"
                        align="center"
                        sx={{
                            mb: 2,
                            fontWeight: "bold",
                            background:
                                "linear-gradient(45deg, #667eea, #764ba2)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Why Choose TuneTalk?
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ mb: 6, color: "#666", maxWidth: 600, mx: "auto" }}
                    >
                        Discover the perfect blend of music and social
                        interaction in one amazing platform
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <FeatureCard>
                                    <CardContent
                                        sx={{ textAlign: "center", p: 4 }}
                                    >
                                        <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ mb: 2, fontWeight: "bold" }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{ opacity: 0.9 }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </FeatureCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </FeaturesSection>

            {/* Call-to-Action Section */}
            <Box
                sx={{
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    py: 10,
                    color: "white",
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h3"
                        align="center"
                        sx={{ mb: 2, fontWeight: "bold" }}
                    >
                        Ready to Join the Music Revolution?
                    </Typography>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ mb: 4, opacity: 0.9 }}
                    >
                        Start your journey with TuneTalk today and connect with
                        music lovers worldwide!
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <BrightButton
                            component={Link}
                            to="/chat"
                            size="large"
                            startIcon={<ChatIcon />}
                        >
                            Join Chat Now
                        </BrightButton>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/contact"
                            sx={{
                                borderColor: "white",
                                color: "white",
                                borderWidth: 2,
                                borderRadius: 25,
                                padding: "12px 30px",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                "&:hover": {
                                    borderColor: "#FFD700",
                                    color: "#FFD700",
                                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                                },
                            }}
                        >
                            Get in Touch
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
