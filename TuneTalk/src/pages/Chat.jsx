
// src/pages/Chat.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

export default function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit('send_message', {
        message,
        username,
        time: new Date().toLocaleTimeString(),
        type: isPrivate ? 'private' : 'public',
      });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  if (!username) {
    return (
      <div className="chat-container">
        <h2>Enter your name to join chat</h2>
        <input
          type="text"
          placeholder="Your name"
          onKeyDown={(e) => {
            if (e.key === 'Enter') setUsername(e.target.value);
          }}
          className="chat-input"
        />
      </div>
    );
  }

  return (
    <div className="chat-container">
      <h2>Welcome, {username} 👋</h2>

      <div className="chat-toggle">
        <button
          className={!isPrivate ? 'active-tab' : ''}
          onClick={() => setIsPrivate(false)}
        >
          Public Chat
        </button>
        <button
          className={isPrivate ? 'active-tab' : ''}
          onClick={() => setIsPrivate(true)}
        >
          Private Chat
        </button>
      </div>

      <div className="chat-box">
        {chat
          .filter((msg) => (isPrivate ? msg.type === 'private' : msg.type === 'public'))
          .map((msg, idx) => (
            <div key={idx} className="chat-message">
              <span className="chat-time">{msg.time}</span>
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          ))}
      </div>

      <div className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          className="chat-input"
          placeholder={`Type a ${isPrivate ? 'private' : 'public'} message...`}
        />
        <button onClick={sendMessage} className="chat-send-btn">Send</button>
      </div>
    </div>
  );
}

