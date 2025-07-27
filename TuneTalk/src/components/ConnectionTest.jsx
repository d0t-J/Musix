import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const BACKEND_URL =
    "https://tunetalk-backend-e9d9gzf6a9awdadq.eastus-01.azurewebsites.net";

export default function ConnectionTest() {
    const [status, setStatus] = useState("Connecting...");
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const addLog = (message) => {
            setLogs((prev) => [
                ...prev,
                `${new Date().toLocaleTimeString()}: ${message}`,
            ]);
        };

        // Test HTTP connection first
        fetch(`${BACKEND_URL}/health`)
            .then((res) => res.json())
            .then((data) => {
                addLog("✅ HTTP connection successful");
                addLog(`Health check: ${data.status}`);
            })
            .catch((err) => {
                addLog(`❌ HTTP connection failed: ${err.message}`);
            });

        // Test Socket.IO connection
        const socket = io(BACKEND_URL, {
            transports: ["websocket", "polling"],
        });

        socket.on("connect", () => {
            addLog("✅ Socket.IO connected");
            setStatus("Connected");

            // Test setting username
            socket.emit("set_username", "TestUser");
        });

        socket.on("disconnect", () => {
            addLog("⚠️ Socket.IO disconnected");
            setStatus("Disconnected");
        });

        socket.on("connect_error", (error) => {
            addLog(`❌ Socket.IO connection error: ${error.message}`);
            setStatus("Connection Error");
        });

        socket.on("user_list", (users) => {
            addLog(`👥 User list received: ${users.length} users`);
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "monospace" }}>
            <h2>Connection Test</h2>
            <p>
                <strong>Status:</strong> {status}
            </p>
            <p>
                <strong>Backend URL:</strong> {BACKEND_URL}
            </p>

            <div
                style={{
                    background: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "5px",
                    marginTop: "20px",
                    maxHeight: "300px",
                    overflow: "auto",
                }}
            >
                <h3>Connection Logs:</h3>
                {logs.map((log, index) => (
                    <div key={index}>{log}</div>
                ))}
            </div>
        </div>
    );
}
