import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../Assets/ai_logo.png";
import Chat from "./Chat";
import sampleData from "../aiData/sampleData.json";
import Toast from "./Toast";
import FeedbackModal from "./FeedbackModal";

function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [showToast, setShowToast] = useState(false);

  // 🔹 store index of conversation for feedback, or false if closed
  const [showFeedback, setShowFeedback] = useState(false);

  // ✅ sidebar toggle for mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ lock/unlock body scroll when sidebar is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [menuOpen]);

  const handleAsk = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    let updated = [...messages, newMessage];

    const found = sampleData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    const botMessage = {
      sender: "Soul AI",
      text: found ? found.response : "Sorry, Did not understand your query!",
      time: new Date().toLocaleTimeString(),
    };

    updated = [...updated, botMessage];
    setMessages(updated);
    setInput("");
    setShowChat(true);
  };

  const handleSave = () => {
    if (messages.length === 0) return;

    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    const updated = [...saved, { messages, feedback: "" }];

    localStorage.setItem("conversations", JSON.stringify(updated));

    setShowToast(true);

    // ✅ Pass index of newly saved conversation
    setShowFeedback(updated.length - 1);
  };

  return (
    <div className="home_container">
      {/* Left sidebar */}
      <div className={`home_left ${menuOpen ? "open" : ""}`}>
        <div className="top_left_ele">
          <div className="ai_logo_wrapper">
            <img alt="logo_img" className="ai_logo" src={logo} />
          </div>
          <a
            href="/"
            className="new_chat_btn"
            onClick={() => {
              navigate("/");
              setMessages([]);
              setShowChat(false);
              setMenuOpen(false);
            }}
          >
            New Chat
          </a>
          <FiEdit />
        </div>
        <a
          href="/history"
          className="past_chat"
          onClick={() => {
            navigate("/history");
            setShowChat(false);
            setMenuOpen(false);
          }}
        >
          Past conversations
        </a>
      </div>

      {/* Right section */}
      <div className="home_right">
        {/* ✅ toggle button visible only on mobile */}
        <button
          className="menu_toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* ✅ semantic header for test */}
        <header className="header">
          <h1>Bot AI</h1>
        </header>

        <div className="chat_wrapper">
          {showChat ? (
            <Chat messages={messages} setMessages={setMessages} />
          ) : (
            <Outlet />
          )}
        </div>

        <form
          className="input_section"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="input_ele"
            placeholder="Message Bot AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          />
          <button type="submit" onClick={handleAsk} className="input_btn">
            Ask
          </button>
          <button className="input_btn" type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>

      {showToast && (
        <Toast
          message="Conversation saved!"
          onClose={() => setShowToast(false)}
        />
      )}

      {showFeedback !== false && (
        <FeedbackModal
          conversationIndex={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}

export default Home;
