import React, { useEffect, useRef, useState } from "react";
import boyAvatar from "../Assets/boy.png";
import aiAvatar from "../Assets/ai_logo.png";
import Toast from "./Toast";   // ✅ import Toast

function Chat({ messages, setMessages }) {
  const chatEndRef = useRef(null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReaction = (index, reaction) => {
    const updated = [...messages];
    updated[index].reaction = reaction;
    setMessages(updated);

    // also update localStorage
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    if (saved.length > 0) {
      saved[saved.length - 1].messages = updated;
      localStorage.setItem("conversations", JSON.stringify(saved));
    }

    // ✅ show toast
    setToastMsg(reaction === "like" ? "You liked this response 👍" : "You disliked this response 👎");
    setTimeout(() => setToastMsg(""), 2000);
  };

  return (
    <div className="chat_container">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`chat_message ${msg.sender === "You" ? "user_msg" : "bot_msg"}`}
        >
          {msg.sender === "You" ? (
            <>
              <div className="msg_text user_bubble">
                 <span style={{fontWeight:"bold"}}>You</span>
                <p>{msg.text}</p>
                <span className="msg_time">{msg.time}</span>
              </div>
              <img src={boyAvatar} alt="user" className="avatar" />
            </>
          ) : (
            <>
              <img src={aiAvatar} alt="bot" className="avatar" />
              <div className="msg_text bot_bubble">
                <span style={{fontWeight:"bold"}}>Soul AI</span>
                <p>{msg.text}</p>
                <span className="msg_time">{msg.time}</span>

                {/* Like/Dislike */}
                <div className="bot_actions">
                  <button
                    className={`like_btn ${msg.reaction === "like" ? "active" : ""}`}
                    onClick={() => handleReaction(i, "like")}
                  >
                    👍
                  </button>
                  <button
                    className={`dislike_btn ${msg.reaction === "dislike" ? "active" : ""}`}
                    onClick={() => handleReaction(i, "dislike")}
                  >
                    👎
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <div ref={chatEndRef} />

      {/* ✅ Toast Popup */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}
    </div>
  );
}

export default Chat;
