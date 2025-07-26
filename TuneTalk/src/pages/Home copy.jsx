import React from "react";
import ProductHero from "../components/ProductHero";
import ProductCTA from "../components/ProductCTA";

export default function Home() {
    return (
        <div>
            <ProductHero />
            <ProductCTA />
            {/* Add more sections here as needed */}
        </div>
    );
}
