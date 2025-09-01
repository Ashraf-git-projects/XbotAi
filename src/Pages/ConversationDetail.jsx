import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import boy from "../Assets/boy.png";
import aiLogo from "../Assets/ai_logo.png";

function ConversationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    if (saved[id]) setConversation(saved[id]);
  }, [id]);

  if (!conversation) {
    return <p>No conversation found.</p>;
  }

  return (
    <div className="conversation_detail">
      <button onClick={() => navigate("/history")} className="back_btn">
        <ArrowLeft size={18} /> Back
      </button>

      <h2>Conversation {parseInt(id) + 1}</h2>

      <div className="conversation_messages">
        {conversation.messages?.map((msg, index) => (
          <div
            key={index}
            className={`chat_row ${msg.sender === "You" ? "user_row" : "bot_row"}`}
          >
            <img
              src={msg.sender === "You" ? boy : aiLogo}
              alt={msg.sender}
              className="chat_avatar"
            />
            <div className={`chat_bubble ${msg.sender === "You" ? "user" : "bot"}`}>
             <p className="sender_label">{msg.sender}</p>
<p>{msg.text}</p>
<span className="timestamp">{msg.time}</span>


              {/* ✅ Fix sender check: use "Bot" instead of "Soul AI" */}
              {msg.sender === "Bot" && msg.reaction && (
                <div className="reaction_tag">
                  {msg.reaction === "like" ? "👍 Liked" : "👎 Disliked"}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="feedback_section">
          <strong>Feedback:</strong>{" "}
          {conversation.feedback && conversation.feedback.trim()
            ? conversation.feedback
            : "None"}
        </div>
      </div>
    </div>
  );
}

export default ConversationDetail;
