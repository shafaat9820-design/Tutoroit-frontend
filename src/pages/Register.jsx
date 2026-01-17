// import { useState } from "react";
// import { registerUser } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("STUDENT");
//   const [mobile, setMobile] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!name || !email || !password) {
//       setError("Please fill all required fields");
//       return;
//     }

//     if (role === "TUTOR" && !mobile) {
//       setError("Mobile number is required for tutors");
//       return;
//     }

//     try {
//       await registerUser({
//         name,
//         email,
//         password,
//         role,
//         mobile: role === "TUTOR" ? mobile : null,
//       });

//       setSuccess("Registration successful, now login");
//       setTimeout(() => navigate("/login"), 1500);
//     } catch {
//       setError("Registration failed. Email may already exist.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>

//       <form onSubmit={handleRegister}>
//         <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="STUDENT">Student</option>
//           <option value="PARENT">Parent</option>
//           <option value="TUTOR">Tutor</option>
//         </select>

//         {role === "TUTOR" && (
//           <input
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         )}

//         <button type="submit">Register</button>

//         {error && <p className="error">{error}</p>}
//         {success && <p className="success">{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔹 ADDED: loading state
  // WHY: double submit prevent karne + better UX ke liye
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔹 ADDED: har submit pe purana error/success clear
    setError("");
    setSuccess("");

    // 🔹 SAME: basic validation
    if (!name || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    if (role === "TUTOR" && !mobile) {
      setError("Mobile number is required for tutors");
      return;
    }

    // 🔹 ADDED: request start hone se pehle loading true
    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        role,
        mobile: role === "TUTOR" ? mobile : null,
      });

      // 🔹 SAME logic, bas message thoda clear
      setSuccess("Registration successful. Redirecting to login...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // 🔹 ADDED: backend ka real error console me
      // WHY: debugging + interview explanation
      console.error("Register error:", err);

      // 🔹 ADDED: backend se aaya hua message dikhao
      // fallback diya hai agar backend message na bheje
      setError(
        err?.response?.data?.message ||
          "Registration failed. Email may already exist."
      );
    } finally {
      // 🔹 ADDED: chahe success ho ya error, loading false
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="PARENT">Parent</option>
          <option value="TUTOR">Tutor</option>
        </select>

        {role === "TUTOR" && (
          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        )}

        {/* 🔹 ADDED: loading ke time button disable */}
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Register;

