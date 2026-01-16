import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";
import { getCurrentUser } from "../services/authService";

const CreatePost = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    qualification: "",
    experience: "",
    classToTeach: "",
    subjects: "",
    fees: "",
  });

  const [error, setError] = useState("");

  // 🔐 Safety check
  if (!user || user.role !== "TUTOR") {
    return (
      <div className="container">
        <h3>Access Denied</h3>
        <p>Only tutors can create posts.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (
    !form.qualification ||
    !form.experience ||
    !form.classToTeach ||
    !form.subjects ||
    !form.fees
  ) {
    setError("Please fill all fields");
    return;
  }

  try {
    await createPost(
      {
        qualification: form.qualification,
        experience: form.experience,
        classToTeach: form.classToTeach,
        subjects: form.subjects,
        fees: Number(form.fees),
      },
      user.email
    );

    // ✅ SUCCESS MESSAGE
    alert("Post created successfully");

    // ✅ AUTO REDIRECT TO HOME
    navigate("/");
  } catch (err) {
    setError("Failed to create post");
  }
};


  return (
    <div className="container">
      <h2>Create Tutor Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="qualification"
          placeholder="Qualification (e.g. B.Sc Maths)"
          value={form.qualification}
          onChange={handleChange}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g. 5 years)"
          value={form.experience}
          onChange={handleChange}
        />

        <input
          type="text"
          name="classToTeach"
          placeholder="Class to Teach (e.g. 6-10)"
          value={form.classToTeach}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subjects"
          placeholder="Subjects (e.g. Maths, Physics)"
          value={form.subjects}
          onChange={handleChange}
        />

        <input
          type="number"
          name="fees"
          placeholder="Fees (per month)"
          value={form.fees}
          onChange={handleChange}
        />

        <button type="submit">Create Post</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
