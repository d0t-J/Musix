import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
    Paper,
    Card,
    CardContent,
    Snackbar,
    Alert,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";

const HeroSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "40vh",
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
            "radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        zIndex: 1,
    },
}));

const ContactCard = styled(Card)(({ theme }) => ({
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    height: "100%",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-5px)",
    },
}));

const FormSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    minHeight: "60vh",
    py: 8,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 15,
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 1)",
        },
        "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 1)",
        },
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 25,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 56,
    padding: "0 40px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    "&:hover": {
        background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
        transform: "scale(1.02)",
    },
}));

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
        setOpenSnackbar(true);
        // Reset form
        setFormData({ name: "", email: "", message: "" });
    };

    const contactInfo = [
        {
            icon: <EmailIcon sx={{ fontSize: 40 }} />,
            title: "Email Us",
            description: "Get in touch via email",
            info: "hello@tunetalk.com",
        },
        {
            icon: <PhoneIcon sx={{ fontSize: 40 }} />,
            title: "Call Us",
            description: "Speak directly with our team",
            info: "+1 (555) 123-4567",
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
            title: "Visit Us",
            description: "Come to our office",
            info: "123 Music Street, Sound City",
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
                    <Box textAlign="center">
                        <Chip
                            label="📞 Get In Touch"
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
                                fontSize: { xs: "3rem", md: "4rem" },
                                fontWeight: "bold",
                                mb: 2,
                                background:
                                    "linear-gradient(45deg, #FFD700, #FFA500)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Contact Us
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                opacity: 0.9,
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            We'd love to hear from you! Get in touch with the
                            TuneTalk team
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                opacity: 0.8,
                                maxWidth: 500,
                                mx: "auto",
                            }}
                        >
                            Whether you have questions, feedback, or just want
                            to say hello, we're here to help!
                        </Typography>
                    </Box>
                </Container>
            </HeroSection>

            {/* Contact Info Cards */}
            <Box
                sx={{
                    py: 8,
                    background:
                        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {contactInfo.map((info, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <ContactCard>
                                    <CardContent
                                        sx={{ textAlign: "center", p: 4 }}
                                    >
                                        <Box sx={{ mb: 2 }}>{info.icon}</Box>
                                        <Typography
                                            variant="h5"
                                            sx={{ mb: 1, fontWeight: "bold" }}
                                        >
                                            {info.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ mb: 2, opacity: 0.9 }}
                                        >
                                            {info.description}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {info.info}
                                        </Typography>
                                    </CardContent>
                                </ContactCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Contact Form */}
            <FormSection>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={6}>
                        <Typography
                            variant="h3"
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
                            Send us a Message
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#666" }}>
                            Fill out the form below and we'll get back to you as
                            soon as possible
                        </Typography>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 6,
                            borderRadius: 4,
                            background: "rgba(255, 255, 255, 0.9)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <StyledTextField
                                        fullWidth
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <StyledTextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        fullWidth
                                        label="Your Message"
                                        name="message"
                                        multiline
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        placeholder="Tell us what's on your mind..."
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ textAlign: "center", mt: 2 }}>
                                        <SubmitButton
                                            type="submit"
                                            size="large"
                                            endIcon={<SendIcon />}
                                        >
                                            Send Message
                                        </SubmitButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </FormSection>

            {/* Success Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon! 🎵
                </Alert>
            </Snackbar>
        </>
    );
}
