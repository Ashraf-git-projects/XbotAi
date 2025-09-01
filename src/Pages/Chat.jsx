import React, { useEffect, useRef, useState } from "react";
import boyAvatar from "../Assets/boy.png";
import aiAvatar from "../Assets/ai_logo.png";
import Toast from "./Toast";

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

    // ✅ Update correct conversation in localStorage
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    if (saved.length > 0) {
      // find the active conversation (last one for ongoing chat)
      let activeIndex = saved.length - 1;
      saved[activeIndex].messages = updated;
      localStorage.setItem("conversations", JSON.stringify(saved));
    }

    // ✅ Show toast
    setToastMsg(
      reaction === "like"
        ? "You liked this response 👍"
        : "You disliked this response 👎"
    );
    setTimeout(() => setToastMsg(""), 2000);
  };

  return (
    <div className="chat_container">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`chat_row ${msg.sender === "You" ? "user_row" : "bot_row"}`}
        >
          {msg.sender === "You" ? (
            <>
              <div className="chat_bubble user">
                <span className="sender_label">You</span>
                <p>{msg.text}</p>
                <span className="timestamp">{msg.time}</span>
              </div>
              <img src={boyAvatar} alt="user" className="chat_avatar" />
            </>
          ) : (
            <>
              <img src={aiAvatar} alt="bot" className="chat_avatar" />
              <div className="chat_bubble bot">
                <span className="sender_label">Soul AI</span>
                <p>{msg.text}</p>
                <span className="timestamp">{msg.time}</span>

                {/* ✅ Reaction buttons */}
                <div className="bot_actions">
                  <button
                    aria-label="Like response"
                    className={`like_btn ${msg.reaction === "like" ? "active" : ""}`}
                    onClick={() => handleReaction(i, "like")}
                  >
                    👍
                  </button>
                  <button
                    aria-label="Dislike response"
                    className={`dislike_btn ${msg.reaction === "dislike" ? "active" : ""}`}
                    onClick={() => handleReaction(i, "dislike")}
                  >
                    👎
                  </button>
                </div>

                {/* ✅ Show reaction tag if saved */}
                {msg.reaction && (
                  <div className="reaction_tag">
                    {msg.reaction === "like" ? "👍 Liked" : "👎 Disliked"}
                  </div>
                )}
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
