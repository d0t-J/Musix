import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import config from "../config/environment";
import "./Chat.css";

const socket = io(config.SOCKET_URL);

const handleSpotifySearch = async () => {
    if (!searchQuery.trim()) return;

    try {
        const res = await axios.get(`${config.API_URL}/search`, {
            params: { q: searchQuery },
        });
        setSearchResults(res.data);
    } catch (err) {
        console.error("Spotify search error:", err);
    }
};

export default function Chat() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const sendMessage = () => {
        if (!message.trim()) return;

        const msgData = {
            message,
            username,
            time: new Date().toLocaleTimeString(),
            type: isPrivate ? "private" : "public",
        };

        if (isPrivate && selectedUser) {
            msgData.to = selectedUser;
        }

        socket.emit("send_message", msgData);
        setMessage("");
    };

    const sendSpotifySong = (track) => {
        const embedHTML = `<iframe style="border-radius:12px" src="${track.url}" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

        const msgData = {
            html: embedHTML,
            username,
            time: new Date().toLocaleTimeString(),
            type: isPrivate ? "private" : "public",
        };

        if (isPrivate && selectedUser) {
            msgData.to = selectedUser;
        }

        socket.emit("send_message", msgData);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleSpotifySearch = async () => {
        if (!searchQuery.trim()) return;

        try {
            const res = await axios.get(`${config.API_URL}/search`, {
                params: { q: searchQuery },
            });
            setSearchResults(res.data);
        } catch (err) {
            console.error("Spotify search error:", err);
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        socket.on("user_list", (list) => {
            setUsers(list);
        });

        return () => {
            socket.off("receive_message");
            socket.off("user_list");
        };
    }, []);

    useEffect(() => {
        const chatBox = document.querySelector(".chat-box");
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, [chat]);

    const handleJoin = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
            const name = e.target.value.trim();
            setUsername(name);
            socket.emit("set_username", name);
        }
    };

    if (!username) {
        return (
            <div className="chat-container">
                <h2>Enter your name to join chat</h2>
                <input
                    type="text"
                    placeholder="Your name"
                    onKeyDown={handleJoin}
                    className="chat-input"
                />
            </div>
        );
    }

    return (
        <div className="chat-container">
            <h2>Welcome, {username} !</h2>
            <h3 className="subheading">Chat and share music with friends 🎧</h3>

            <div className="chat-toggle">
                <button
                    className={!isPrivate ? "active-tab" : ""}
                    onClick={() => setIsPrivate(false)}
                >
                    Public Chat
                </button>
                <button
                    className={isPrivate ? "active-tab" : ""}
                    onClick={() => setIsPrivate(true)}
                >
                    Private Chat
                </button>
            </div>

            {isPrivate && (
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="user-select"
                >
                    <option value="">Select a user</option>
                    {users
                        .filter((user) => user.username !== username)
                        .map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                </select>
            )}

            <div className="chat-box">
                {chat
                    .filter((msg) =>
                        isPrivate
                            ? msg.type === "private"
                            : msg.type === "public"
                    )
                    .map((msg, idx) => (
                        <div
                            key={idx}
                            className={`chat-message ${
                                msg.username === username
                                    ? "my-message"
                                    : "other-message"
                            }`}
                        >
                            <span className="chat-time">{msg.time}</span>
                            <strong>{msg.username}:</strong>
                            {msg.html ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: msg.html,
                                    }}
                                    style={{ marginTop: 4 }}
                                />
                            ) : (
                                <span> {msg.message}</span>
                            )}
                        </div>
                    ))}
            </div>

            <div className="chat-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="chat-input"
                    placeholder={`Type a ${
                        isPrivate ? "private" : "public"
                    } message...`}
                />
                <button onClick={sendMessage} className="chat-send-btn">
                    Send
                </button>
            </div>

            <div style={{ marginTop: 20 }}>
                <h4 style={{ color: "#cb075b" }}>Search Spotify:</h4>
                <div style={{ display: "flex", gap: 10 }}>
                    <input
                        type="text"
                        placeholder="Search for a song..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="chat-input"
                    />
                    <button
                        onClick={handleSpotifySearch}
                        className="chat-send-btn"
                    >
                        Search
                    </button>
                </div>

                {searchResults.length > 0 && (
                    <div style={{ marginTop: 15 }}>
                        {searchResults.map((track) => (
                            <div
                                key={track.id}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: 10,
                                    marginBottom: 10,
                                    borderRadius: 6,
                                    background: "#fff",
                                }}
                            >
                                <strong>{track.name}</strong> by {track.artist}
                                <button
                                    onClick={() => sendSpotifySong(track)}
                                    style={{
                                        float: "right",
                                        padding: "4px 10px",
                                        background: "#1DB954",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: 4,
                                        cursor: "pointer",
                                    }}
                                >
                                    Send
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
