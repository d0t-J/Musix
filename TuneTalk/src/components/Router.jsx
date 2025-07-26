import React, { useState, useEffect } from "react";
import { Home, About, Contact } from "../pages";

export default function Router() {
    const [currentPage, setCurrentPage] = useState("home");

    useEffect(() => {
        // Simple hash-based routing
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1); // Remove the #
            if (hash && ["home", "about", "contact"].includes(hash)) {
                setCurrentPage(hash);
            } else {
                setCurrentPage("home");
            }
        };

        // Listen for hash changes
        window.addEventListener("hashchange", handleHashChange);

        // Set initial page based on current hash
        handleHashChange();

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case "about":
                return <About />;
            case "contact":
                return <Contact />;
            case "home":
            default:
                return <Home />;
        }
    };

    return <div>{renderPage()}</div>;
}
