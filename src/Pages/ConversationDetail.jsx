import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        ← Back to History
      </button>

      <h2>Conversation #{parseInt(id) + 1}</h2>
      <div className="conversation_messages">
        {conversation.messages.map((msg, index) => (
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
              <p>{msg.text}</p>
              <span className="timestamp">{msg.time}</span>

              {/* Reaction display only for bot messages */}
              {msg.sender === "Bot" && msg.reaction && (
                <div
                  className="reaction_tag"
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    marginTop: "4px",
                    fontStyle: "italic",
                  }}
                >
                  {msg.reaction === "like" ? "👍 Liked" : "👎 Disliked"}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="feedback_section">
          <strong>Feedback:</strong>{" "}
          {conversation.feedback ? conversation.feedback : "None"}
        </div>
      </div>
    </div>
  );
}

export default ConversationDetail;
