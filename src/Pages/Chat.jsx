import React, { useState } from "react";
import sampleData from "../aiData/sampleData.json";
import userAvatar from "../Assets/boy.png";
import aiAvatar from "../Assets/ai_logo.png";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // 1️⃣ Add user message
    const newMessage = {
      sender: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // 2️⃣ Try to find AI response in sampleData
    const found = sampleData.find(
      (item) => item.question.toLowerCase() === input.toLowerCase()
    );

    const aiMessage = {
      sender: "Soul AI",
      text: found ? found.response : "Sorry, I don’t have an answer for that.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // 3️⃣ Update state with both messages
    setMessages((prev) => [...prev, newMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="chat_container">
      <div className="chat_window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat_message ${msg.sender === "You" ? "user_msg" : "ai_msg"}`}
          >
            <img
              src={msg.sender === "You" ? userAvatar : aiAvatar}
              alt="avatar"
              className="avatar"
            />
            <div className="msg_content">
              <strong>{msg.sender}</strong>
              <p>{msg.text}</p>
              <span className="msg_time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="input_section">
        <input
          type="text"
          className="input_ele"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="input_btn">Ask</button>
        <button className="input_btn" type="button">Save</button>
      </div>
    </div>
  );
}

export default Chat;
