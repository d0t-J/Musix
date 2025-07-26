import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Tabs,
    Tab,
    Divider,
    IconButton,
    InputAdornment,
    Chip,
    Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    Visibility,
    VisibilityOff,
    Google,
    Facebook,
    Twitter,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

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
            "radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
        zIndex: 1,
    },
}));

const FormSection = styled(Box)(({ theme }) => ({
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    minHeight: "60vh",
    py: 8,
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(6),
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    maxWidth: 500,
    margin: "0 auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 15,
        "&:hover": {
            "& > fieldset": {
                borderColor: theme.palette.primary.main,
            },
        },
    },
}));

const AuthButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 25,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 56,
    padding: "0 40px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    width: "100%",
    "&:hover": {
        background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
        transform: "scale(1.02)",
    },
}));

const SocialButton = styled(Button)(({ theme }) => ({
    borderRadius: 15,
    padding: "12px",
    flex: 1,
    "&.google": {
        backgroundColor: "#db4437",
        "&:hover": {
            backgroundColor: "#c23321",
        },
    },
    "&.facebook": {
        backgroundColor: "#3b5998",
        "&:hover": {
            backgroundColor: "#2d4373",
        },
    },
    "&.twitter": {
        backgroundColor: "#1da1f2",
        "&:hover": {
            backgroundColor: "#0d95e8",
        },
    },
}));

function TabPanel({ children, value, index }) {
    return (
        <div hidden={value !== index}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

export default function Auth() {
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (tabValue === 0) {
            console.log("Sign In:", {
                email: formData.email,
                password: formData.password,
            });
        } else {
            console.log("Sign Up:", formData);
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login clicked`);
    };

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
                            label="🎵 Join TuneTalk"
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
                            Welcome Back
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
                            Sign in to continue your musical journey or create a
                            new account
                        </Typography>
                    </Box>
                </Container>
            </HeroSection>

            {/* Auth Form Section */}
            <FormSection>
                <Container maxWidth="sm">
                    <AuthPaper elevation={0}>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: "divider",
                                mb: 3,
                            }}
                        >
                            <Tabs
                                value={tabValue}
                                onChange={handleTabChange}
                                centered
                                variant="fullWidth"
                                sx={{
                                    "& .MuiTab-root": {
                                        fontSize: "1.1rem",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                    },
                                }}
                            >
                                <Tab label="Sign In" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <TabPanel value={tabValue} index={0}>
                                {/* Sign In Form */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 3,
                                    }}
                                >
                                    <StyledTextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <StyledTextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <AuthButton type="submit">
                                        Sign In
                                    </AuthButton>
                                </Box>
                            </TabPanel>

                            <TabPanel value={tabValue} index={1}>
                                {/* Sign Up Form */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 3,
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        <StyledTextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon color="primary" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <StyledTextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Box>
                                    <StyledTextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <StyledTextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <StyledTextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon color="primary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <AuthButton type="submit">
                                        Create Account
                                    </AuthButton>
                                </Box>
                            </TabPanel>
                        </form>

                        <Box sx={{ mt: 4 }}>
                            <Divider>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Or continue with
                                </Typography>
                            </Divider>
                            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                                <SocialButton
                                    variant="contained"
                                    className="google"
                                    onClick={() => handleSocialLogin("Google")}
                                    startIcon={<Google />}
                                >
                                    Google
                                </SocialButton>
                                <SocialButton
                                    variant="contained"
                                    className="facebook"
                                    onClick={() =>
                                        handleSocialLogin("Facebook")
                                    }
                                    startIcon={<Facebook />}
                                >
                                    Facebook
                                </SocialButton>
                                <SocialButton
                                    variant="contained"
                                    className="twitter"
                                    onClick={() => handleSocialLogin("Twitter")}
                                    startIcon={<Twitter />}
                                >
                                    Twitter
                                </SocialButton>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                By{" "}
                                {tabValue === 0
                                    ? "signing in"
                                    : "creating an account"}
                                , you agree to our{" "}
                                <Typography
                                    component="span"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Terms of Service
                                </Typography>{" "}
                                and{" "}
                                <Typography
                                    component="span"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                >
                                    Privacy Policy
                                </Typography>
                            </Typography>
                        </Box>
                    </AuthPaper>
                </Container>
            </FormSection>
        </>
    );
}
