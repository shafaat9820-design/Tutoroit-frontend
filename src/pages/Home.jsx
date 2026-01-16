import { useEffect, useState } from "react";
import { getAllPosts, deletePost } from "../services/postService";
import { getCurrentUser } from "../services/authService";
import "../styles/home.css";

const Home = () => {
  const user = getCurrentUser();
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");

  // ✅ ALWAYS fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
  };

  // ❌ Not logged in
  if (!user) {
    return (
      <div className="home-message">
        <h2>Please login or register</h2>
        <p>to see available tutors.</p>
      </div>
    );
  }

  // Tutor ke apne posts
  const myPosts =
    user.role === "TUTOR"
      ? posts.filter((p) => p.tutorEmail === user.email)
      : [];

  return (
    <div className="home-container">
      {/* 🔹 Tabs ONLY for Tutor */}
      {user.role === "TUTOR" && (
        <div className="tabs">
          <button
            className={activeTab === "ALL" ? "active" : ""}
            onClick={() => setActiveTab("ALL")}
          >
            Available Tutors
          </button>

          <button
            className={activeTab === "MY" ? "active" : ""}
            onClick={() => setActiveTab("MY")}
          >
            My Posts
          </button>
        </div>
      )}
    {/* Student / Parent info text */}
    {user.role !== "TUTOR" && (
      <div className="student-info">
        <h2>Available Tutors</h2>
        <p>
          Browse verified tutors and contact them directly for classes
        </p>
      </div>
    )}




  <div className="posts">
  {/* AVAILABLE TUTORS */}
  {(user.role !== "TUTOR" || activeTab === "ALL") &&
    posts.map((post) => (
          <div className="post-card" key={post.id}>
          {/* Tutor Name on top */}
          <h3 className="tutor-name">{post.tutorName}</h3>

          <p><b>Qualification:</b> {post.qualification}</p>
          <p><b>Subjects:</b> {post.subjects}</p>
          <p><b>Class:</b> {post.classToTeach}</p>
          <p><b>Experience:</b> {post.experience}</p>
          <p><b>Fees:</b> ₹{post.fees}</p>
          <p><b>Contact:</b> {post.contactNumber}</p>
        </div>

    ))}

  {/* MY POSTS */}
  {user.role === "TUTOR" &&
    activeTab === "MY" &&
    myPosts.map((post) => (
        <div className="post-card" key={post.id}>
        {/* Tutor Name on top */}
        <h3 className="tutor-name">{post.tutorName}</h3>

        <p><b>Qualification:</b> {post.qualification}</p>
        <p><b>Subjects:</b> {post.subjects}</p>
        <p><b>Class:</b> {post.classToTeach}</p>
        <p><b>Experience:</b> {post.experience}</p>
        <p><b>Fees:</b> ₹{post.fees}</p>
        <p><b>Contact:</b> {post.contactNumber}</p>
      
        <button
          className="delete-btn"
          onClick={() => deletePost(post.id).then(fetchPosts)}
        >
          Delete
        </button>
      </div>
    ))}
</div>

      
    </div>
  );
};

export default Home;
