// playlist generator

import React, { useState } from "react";
import axios from "axios";
// import config from "../config/environment";
import "./PlaylistGenerator.css";

// EMERGENCY HARDCODE - Replace with your actual backend URL
const BACKEND_URL =
    "https://tunetalk-backend-e9d9gzf6a9awdadq.eastus-01.azurewebsites.net/";

const allowedGenres = [
    "pop",
    "rock",
    "hip-hop",
    "classical",
    "jazz",
    "electronic",
    "blues",
    "country",
    "reggae",
    "metal",
    "dance",
    "indie",
    "soul",
    "punk",
    "r&b",
    "k-pop",
    "folk",
    "funk",
    "techno",
    "edm",
];

export default function PlaylistGenerator() {
    const [input, setInput] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [invalidGenres, setInvalidGenres] = useState([]);

    const handleGenerate = async () => {
        setError("");
        setInvalidGenres([]);
        setPlaylist([]);

        if (!input.trim()) {
            setError("Please enter at least one genre.");
            return;
        }

        const genres = input
            .split(",")
            .map((g) => g.trim().toLowerCase())
            .filter((g) => g);

        const invalid = genres.filter((g) => !allowedGenres.includes(g));
        if (invalid.length > 0) {
            setInvalidGenres(invalid);
            setError("Some genres are invalid.");
            return;
        }

        setLoading(true);

        try {
            const genreQuery = encodeURIComponent(genres.join(","));
            const res = await axios.get(
                `${BACKEND_URL}/api/playlist/generate?genres=${genreQuery}`
            );
            setPlaylist(res.data || []);
            if (res.data.length === 0) {
                setError("No tracks found for the given genres.");
            }
        } catch (err) {
            console.error(err);
            setError("Error generating playlist. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="playlist-generator">
            <h2>Playlist Generator 🎶</h2>
            <input
                type="text"
                placeholder="Enter genre(s), e.g. pop, jazz, metal"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={error ? "input-error" : ""}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? "Generating..." : "Generate Playlist"}
            </button>

            {error && (
                <div className="error-message">
                    {error}
                    {invalidGenres.length > 0 && (
                        <>
                            <br />
                            Invalid genre{invalidGenres.length > 1
                                ? "s"
                                : ""}:{" "}
                            <strong>{invalidGenres.join(", ")}</strong>
                            <br />
                            Allowed genres: <em>{allowedGenres.join(", ")}</em>
                        </>
                    )}
                </div>
            )}

            <ul>
                {playlist.map((track) => (
                    <li key={track.id}>
                        <strong>{track.name}</strong> by{" "}
                        {track.artists.join(", ")}
                        <div>
                            <iframe
                                src={track.url}
                                width="300"
                                height="80"
                                frameBorder="0"
                                allow="encrypted-media"
                                title={`track-${track.id}`}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
