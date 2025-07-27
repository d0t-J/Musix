import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const rightLink = {
    fontSize: 16,
    color: "common.white",
    ml: 3,
};

const navLink = {
    fontSize: 16,
    color: "common.white",
    ml: 2,
    mr: 2,
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
    },
};

function AppAppBar() {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "inherit",
                        }}
                    >
                        TuneTalk
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link href="#home" sx={navLink}>
                            Home
                        </Link>
                        <Link href="#about" sx={navLink}>
                            About
                        </Link>
                        <Link href="#contact" sx={navLink}>
                            Contact
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            href="#signin"
                            sx={rightLink}
                        >
                            Sign In
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="#signup"
                            sx={{ ...rightLink, color: "secondary.main" }}
                        >
                            Sign Up
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;
