import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import "./styles/main.css";


function App() {
  return (
    <BrowserRouter>
    <div className="app-wrapper"> 
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-post" element={<CreatePost />} />

      </Routes>
      </main>

      <Footer />
      </div>
    </BrowserRouter>
    
  );
}

export default App;
