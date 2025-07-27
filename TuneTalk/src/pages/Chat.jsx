// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import './Chat.css';

// const socket = io('http://localhost:3001');

// export default function Chat() {
//   const [username, setUsername] = useState('');
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       message, 
//       username,
//       time: new Date().toLocaleTimeString(),
//       type: isPrivate ? 'private' : 'public',
//     };

//     if (isPrivate && selectedUser) {
//       msgData.to = selectedUser;
//     }

//     socket.emit('send_message', msgData);
//     setMessage('');
//   };

//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     socket.on('user_list', (list) => {
//       setUsers(list);
//     });

//     return () => {
//       socket.off('receive_message');
//       socket.off('user_list');
//     };
//   }, []);

//   const handleJoin = (e) => {
//     if (e.key === 'Enter' && e.target.value.trim()) {
//       const name = e.target.value.trim();
//       setUsername(name);
//       socket.emit('set_username', name);
//     }
//   };

//   if (!username) {
//     return (
//       <div className="chat-container">
//         <h2>Enter your name to join chat</h2>
//         <input
//           type="text"
//           placeholder="Your name"
//           onKeyDown={handleJoin}
//           className="chat-input"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="chat-container">
//       <h2>Welcome, {username} 👋</h2>

//       <div className="chat-toggle">
//         <button
//           className={!isPrivate ? 'active-tab' : ''}
//           onClick={() => setIsPrivate(false)}
//         >
//           Public Chat
//         </button>
//         <button
//           className={isPrivate ? 'active-tab' : ''}
//           onClick={() => setIsPrivate(true)}
//         >
//           Private Chat
//         </button>
//       </div>

//       {isPrivate && (
//         <select
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//           className="user-select"
//         >
//           <option value="">Select a user</option>
//           {users
//             .filter((user) => user.username !== username)
//             .map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.username}
//               </option>
//             ))}
//         </select>
//       )}

//       <div className="chat-box">
//         {chat
//           .filter((msg) =>
//             isPrivate ? msg.type === 'private' : msg.type === 'public'
//           )
//           .map((msg, idx) => (
//             <div key={idx} className="chat-message">
//               <span className="chat-time">{msg.time}</span>
//               <strong>{msg.username}:</strong> {msg.message}
//             </div>
//           ))}
//       </div>

//       <div className="chat-form">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           className="chat-input"
//           placeholder={`Type a ${isPrivate ? 'private' : 'public'} message...`}
//         />
//         <button onClick={sendMessage} className="chat-send-btn">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



// === Updated Chat.jsx ===

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

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      message,
      username,
      time: new Date().toLocaleTimeString(),
      type: isPrivate ? 'private' : 'public',
    };

    if (isPrivate && selectedUser) msgData.to = selectedUser;

    socket.emit('send_message', msgData);
    setMessage('');
  };

  const sendTrack = (track) => {
    const msgData = {
      username,
      time: new Date().toLocaleTimeString(),
      type: isPrivate ? 'private' : 'public',
      isSpotify: true,
      embedUrl: `https://open.spotify.com/embed/track/${track.id}`,
      trackName: track.name,
      to: isPrivate ? selectedUser : null,
    };

    socket.emit('send_message', msgData);
  };

  const searchSpotify = async () => {
    if (!searchTerm.trim()) return;
    const res = await fetch(`http://localhost:3001/spotify-search?q=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    setSearchResults(data);
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
          {users.filter((u) => u.username !== username).map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      )}

      <div className="spotify-search">
        <input
          type="text"
          placeholder="Search Spotify tracks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="chat-input"
        />
        <button onClick={searchSpotify} className="chat-send-btn">Search</button>
        <div className="spotify-results">
          {searchResults.map((track) => (
            <div key={track.id} className="spotify-result">
              <span>{track.name} - {track.artists[0].name}</span>
              <button onClick={() => sendTrack(track)}>Send</button>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-box">
        {chat.filter((msg) =>
          isPrivate ? msg.type === 'private' : msg.type === 'public'
        ).map((msg, idx) => (
          <div key={idx} className="chat-message">
            <span className="chat-time">{msg.time}</span>
            <strong>{msg.username}:</strong>
            {msg.isSpotify ? (
              <iframe
                src={msg.embedUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
              ></iframe>
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
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="chat-input"
          placeholder={`Type a ${isPrivate ? 'private' : 'public'} message...`}
        />
        <button onClick={sendMessage} className="chat-send-btn">Send</button>
      </div>
    </div>
  );
}
