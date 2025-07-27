import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:3001');

export default function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      message, 
      username,
      time: new Date().toLocaleTimeString(),
      type: isPrivate ? 'private' : 'public',
    };

    if (isPrivate && selectedUser) {
      msgData.to = selectedUser;
    }

    socket.emit('send_message', msgData);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('user_list', (list) => {
      setUsers(list);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_list');
    };
  }, []);

  const handleJoin = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const name = e.target.value.trim();
      setUsername(name);
      socket.emit('set_username', name);
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
            isPrivate ? msg.type === 'private' : msg.type === 'public'
          )
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
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
          placeholder={`Type a ${isPrivate ? 'private' : 'public'} message...`}
        />
        <button onClick={sendMessage} className="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
}
