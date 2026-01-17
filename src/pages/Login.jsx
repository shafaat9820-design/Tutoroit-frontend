// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       await loginUser({ email, password });
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>

//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔹 ADDED: loading state
  // WHY: multiple clicks prevent + better UX
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 ADDED: clear old error on new submit
    setError("");

    // 🔹 SAME: basic validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // 🔹 ADDED: start loading before API call
    setLoading(true);

    try {
      // 🔹 SAME: API call
      await loginUser({ email, password });

      // 🔹 SAME: successful login → home page
      navigate("/");
    } catch (err) {
      // 🔹 ADDED: console log for debugging
      console.error("Login error:", err);

      // 🔹 ADDED: backend message agar ho, warna fallback
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      // 🔹 ADDED: stop loading in all cases
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
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

        {/* 🔹 ADDED: disable button while loading */}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

//   );
// };

// export default Login;
