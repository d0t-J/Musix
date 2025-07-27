require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const { Server } = require("socket.io");
const playlistRoutes = require("./routes/playlist"); //playlistgenerator

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// CORS configuration for deployment
const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? [process.env.FRONTEND_URL]
            : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(express.json());

/* ---------- SOCKET.IO SETUP ---------- */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:
            process.env.NODE_ENV === "production"
                ? [process.env.FRONTEND_URL]
                : ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const users = {}; // { socket.id: username }

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("set_username", (username) => {
        users[socket.id] = username;

        io.emit(
            "user_list",
            Object.entries(users).map(([id, name]) => ({
                id,
                username: name,
            }))
        );
    });

    socket.on("send_message", (data) => {
        if (data.type === "private" && data.to) {
            io.to(data.to).emit("receive_message", data); // recipient
            io.to(socket.id).emit("receive_message", data); // sender
        } else {
            io.emit("receive_message", data); // public
        }
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit(
            "user_list",
            Object.entries(users).map(([id, name]) => ({
                id,
                username: name,
            }))
        );
        console.log(`User disconnected: ${socket.id}`);
    });
});

/* ---------- SPOTIFY API ROUTE ---------- */

let accessToken = "";
let tokenExpiresAt = 0;

async function getAccessToken() {
    const now = Date.now();
    if (accessToken && now < tokenExpiresAt) return accessToken;

    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString("base64"),
            },
        }
    );

    accessToken = response.data.access_token;
    tokenExpiresAt = now + response.data.expires_in * 1000;
    return accessToken;
}

app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send({ error: "Missing query" });

    try {
        const token = await getAccessToken();

        const result = await axios.get(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
            )}&type=track&limit=5`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const tracks = result.data.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0]?.name || "Unknown",
            url: `https://open.spotify.com/embed/track/${track.id}`,
        }));

        res.send(tracks);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send({ error: "Search failed" });
    }
});

// ROUTES
app.use("/api/playlist", playlistRoutes); //playlistgenerator

// Health check endpoint for monitoring
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

/* ---------- START SERVER ---------- */
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
