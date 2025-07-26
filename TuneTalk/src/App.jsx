import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Contact, Chat } from "./pages";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}
