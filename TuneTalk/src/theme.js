import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#667eea",
            light: "#9bb5ff",
            dark: "#3f4fb7",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#f093fb",
            light: "#ffbdff",
            dark: "#bc63c8",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#ff8e53",
            light: "#ffbf83",
            dark: "#c85f23",
            contrastText: "#ffffff",
        },
        success: {
            main: "#4caf50",
            light: "#80e27e",
            dark: "#087f23",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f8f9fa",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "3.5rem",
        },
        h2: {
            fontWeight: 600,
            fontSize: "2.5rem",
        },
        h3: {
            fontWeight: 600,
            fontSize: "2rem",
        },
        h4: {
            fontWeight: 500,
            fontSize: "1.5rem",
        },
        h5: {
            fontWeight: 500,
            fontSize: "1.25rem",
        },
        h6: {
            fontWeight: 500,
            fontSize: "1rem",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 25,
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                },
            },
        },
    },
});

export default theme;
