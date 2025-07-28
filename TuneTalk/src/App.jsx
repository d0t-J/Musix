import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Contact, Chat, Auth, Feed } from "./pages";
import Navbar from "./components/Navbar";
import PlaylistGenerator from './components/PlaylistGenerator';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/chat"
                    element={
                        <>
                            <Chat />
                            <PlaylistGenerator />
                        </>
                    }
                />
                <Route path="/feed" element={<Feed />} />
                <Route path="/about" element={
                    <>
                    <About />
                    </>} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
}
