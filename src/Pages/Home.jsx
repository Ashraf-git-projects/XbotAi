import React, { useState } from "react";
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
  const [showFeedback, setShowFeedback] = useState(false);

  // ✅ sidebar toggle for mobile
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAsk = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    let updated = [...messages, newMessage];

    // Find AI response from sampleData
    const found = sampleData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    const botMessage = {
      sender: "Bot",
      text: found ? found.response : "Sorry, Did not understand your query!",
      time: new Date().toLocaleTimeString(),
    };

    updated = [...updated, botMessage];
    setMessages(updated);
    setInput("");
    setShowChat(true); // switch to Chat UI
  };

  const handleSave = () => {
    if (messages.length === 0) return;

    // fetch existing conversations
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    const updated = [...saved, { messages }];

    localStorage.setItem("conversations", JSON.stringify(updated));

    setShowToast(true);
    setShowFeedback(true);
  };

  return (
    <div className="home_container">
      {/* Left sidebar */}
      <div className={`home_left ${menuOpen ? "open" : ""}`}>
        <div className="top_left_ele">
          <div className="ai_logo_wrapper">
            <img alt="logo_img" className="ai_logo" src={logo} />
          </div>
          <button
            className="new_chat_btn"
            onClick={() => {
              navigate("/");
              setMessages([]);
              setShowChat(false);
              setMenuOpen(false); // close menu on mobile
            }}
          >
            New Chat
          </button>
          <FiEdit className="fied"/>
        </div>
        <button
          className="past_chat"
          onClick={() => {
            navigate("/history");
            setShowChat(false);
            setMenuOpen(false); // close menu on mobile
          }}
        >
          Past conversations
        </button>
      </div>

      {/* Right section */}
      <div className="home_right">
        {/* ✅ Mobile toggle button */}
        <button
          className="menu_toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <h2>BOT AI</h2>

        <div className="chat_wrapper">
          {showChat ? (
            <Chat messages={messages} setMessages={setMessages} />
          ) : (
            <Outlet />
          )}
        </div>

        <div className="input_section">
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
        </div>
      </div>

      {/* ✅ Toast + Feedback modal */}
      {showToast && (
        <Toast message="Conversation saved!" onClose={() => setShowToast(false)} />
      )}

      {showFeedback && (
        <FeedbackModal
          messages={messages}
          onClose={() => setShowFeedback(false)}
        />
      )}

      {/* ✅ Dark overlay for mobile sidebar */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}

export default Home;
