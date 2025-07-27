// import React from "react";
// import "./Feed.css";
// import recordingImage from "../assets/recording.png";

// const posts = Array.from({ length: 5 }, (_, i) => ({
//   id: i + 1,
//   user: `User${i + 1}`,
//   avatar: `https://i.pravatar.cc/150?img=${(i % 10) + 1}`,
//   content: `This is a sample post content #${i + 1}.`,
//   image: i % 2 === 0 ? recordingImage : null,
//   timestamp: `${i + 1}h ago`,
// }));

// const Post = ({ post }) => (
//   <div className="post">
//     <div className="post-header">
//       <img className="avatar" src={post.avatar} alt={`${post.user}'s avatar`} />
//       <div>
//         <div className="username">{post.user}</div>
//         <div className="timestamp">{post.timestamp}</div>
//       </div>
//     </div>

//     <div className="post-content">{post.content}</div>
//     {post.image && <img className="post-image" src={post.image} alt="Post content" />}

//     <div className="post-actions">
//       <button className="post-btn">👍 Like</button>
//       <button className="post-btn">💬 Comment</button>
//     </div>
//   </div>
// );

// const Feed = () => (
//   <div className="app-wrapper">
//     <header className="header">
//       <h2>My Social Feed</h2>
//       <button className="new-post-btn">+ New Post</button>
//     </header>

//     <div className="feed-scroll-container">
//       <div className="feed-container">
//         {posts.map(post => (
//           <Post key={post.id} post={post} />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default Feed;


import React, { useState } from 'react';
import './Feed.css';

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Ariana',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Listening to this fire track 🔥',
      image: 'https://starspangledmusic.org/wp-content/uploads/2022/04/music-white-background.png',
      timestamp: '2h ago',
      spotifyUrl: '2NtgQvDdY30yPXlbEGFvuc',
      likes: 0,
      comments: [],
      showCommentBox: false
    },
    {
      id: 2,
      user: 'Zayn',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Mood right now 🎧',
      image: 'https://wpvip.edutopia.org/wp-content/uploads/2023/06/hero_blog_music_all-grades_illustration_iSpot_a4227ir1451_Anna-Godeassi.jpg?w=2880&quality=85',
      timestamp: '4h ago',
      spotifyUrl: '1gyS3Du8NghJea1lU8Vt0V',
      likes: 0,
      comments: [],
      showCommentBox: false
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    image: '',
    spotifyUrl: ''
  });

  const handleNewPost = () => {
    if (newPost.content.trim() === '') return;
    const post = {
      ...newPost,
      id: Date.now(),
      user: 'You',
      avatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: 'just now',
      likes: 0,
      comments: [],
      showCommentBox: false
    };
    setPosts([post, ...posts]);
    setNewPost({ content: '', image: '', spotifyUrl: '' });
    setShowModal(false);
  };

  const handleLike = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const toggleCommentBox = (id) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, showCommentBox: !post.showCommentBox } : post
      )
    );
  };

  const handleAddComment = (id, text) => {
    if (text.trim() === '') return;
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              comments: [...post.comments, text],
              showCommentBox: false
            }
          : post
      )
    );
  };

  return (
    <div className="app-wrapper">
      <div className="header">
        <h2>🎶 My Music Feed</h2>
        <button className="post-btn" onClick={() => setShowModal(true)}>
          + New Post
        </button>
      </div>

      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="post-header">
            <img src={post.avatar} className="avatar" alt="user" />
            <div>
              <strong>{post.user}</strong>
              <div className="timestamp">{post.timestamp}</div>
            </div>
          </div>
          <div className="post-content">{post.content}</div>
          {post.image && <img src={post.image} className="post-image" alt="music" />}
          {post.spotifyUrl && (
            <iframe
              style={{ borderRadius: '8px', marginBottom: '10px' }}
              src={`https://open.spotify.com/embed/track/${post.spotifyUrl}`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
          <div className="post-actions">
            <button className="post-btn" onClick={() => handleLike(post.id)}>❤️ Like ({post.likes})</button>
            <button className="post-btn" onClick={() => toggleCommentBox(post.id)}>💬 Comment</button>
          </div>

          {post.showCommentBox && (
            <div className="comment-box">
              <input
                type="text"
                placeholder="Write a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}

          {post.comments.length > 0 && (
            <div className="comments-section">
              {post.comments.map((comment, idx) => (
                <div key={idx} className="comment">
                  💬 {comment}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>New Post</h3>
            <textarea
              placeholder="What's on your mind?"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newPost.image}
              onChange={e => setNewPost({ ...newPost, image: e.target.value })}
            />
            <input
              type="text"
              placeholder="Spotify Track ID"
              value={newPost.spotifyUrl}
              onChange={e => setNewPost({ ...newPost, spotifyUrl: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleNewPost} className="post-btn">Post</button>
              <button onClick={() => setShowModal(false)} className="post-btn cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
