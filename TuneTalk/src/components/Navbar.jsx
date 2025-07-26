import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
}));

const Logo = styled(Typography)(({ theme }) => ({
    fontWeight: "bold",
    fontSize: "1.8rem",
    background: "linear-gradient(45deg, #FFD700, #FFA500)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

const NavButton = styled(Button)(({ theme, active }) => ({
    color: "white",
    fontWeight: active ? "bold" : "normal",
    backgroundColor: active ? "rgba(255, 255, 255, 0.2)" : "transparent",
    borderRadius: 20,
    padding: "8px 20px",
    margin: "0 4px",
    transition: "all 0.3s ease",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        transform: "translateY(-2px)",
    },
}));

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Chat", path: "/chat" },
        { label: "Contact", path: "/contact" },
    ];

    return (
        <StyledAppBar position="sticky">
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
                    <Logo
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{ textDecoration: "none" }}
                    >
                        <MusicNoteIcon sx={{ color: "#FFD700" }} />
                        TuneTalk
                    </Logo>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {navItems.map((item) => (
                            <NavButton
                                key={item.path}
                                component={Link}
                                to={item.path}
                                active={location.pathname === item.path ? 1 : 0}
                            >
                                {item.label}
                            </NavButton>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}
