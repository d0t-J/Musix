import React from "react";
import "./Feed.css";
import recordingImage from "../assets/recording.png";

const posts = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  user: `User${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${(i % 10) + 1}`,
  content: `This is a sample post content #${i + 1}.`,
  image: i % 2 === 0 ? recordingImage : null,
  timestamp: `${i + 1}h ago`,
}));

const Post = ({ post }) => (
  <div className="post">
    <div className="post-header">
      <img className="avatar" src={post.avatar} alt={`${post.user}'s avatar`} />
      <div>
        <div className="username">{post.user}</div>
        <div className="timestamp">{post.timestamp}</div>
      </div>
    </div>

    <div className="post-content">{post.content}</div>
    {post.image && <img className="post-image" src={post.image} alt="Post content" />}

    <div className="post-actions">
      <button className="post-btn">👍 Like</button>
      <button className="post-btn">💬 Comment</button>
    </div>
  </div>
);

const Feed = () => (
  <div className="app-wrapper">
    <header className="header">
      <h2>My Social Feed</h2>
      <button className="new-post-btn">+ New Post</button>
    </header>

    <div className="feed-scroll-container">
      <div className="feed-container">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  </div>
);

export default Feed;
