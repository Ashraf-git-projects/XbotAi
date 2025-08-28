import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import boy from "../Assets/boy.png";
import aiLogo from "../Assets/ai_logo.png";

function History() {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    setConversations(saved);
  }, []);

  return (
    <div className="history_wrapper">
      <h2>Conversation History</h2>
      <div className="history_content">
        {conversations.length === 0 ? (
          <p>No saved conversations yet.</p>
        ) : (
          conversations.map((conv, index) => {
            const userMsg = conv.messages.find((m) => m.sender === "You");
            const botMsg = conv.messages.find((m) => m.sender === "Bot");

            return (
              <div
                key={index}
                className="history_card"
                onClick={() => navigate(`/history/${index}`)}
                style={{ cursor: "pointer" }}
              >
                {userMsg && (
                  <div className="chat_row user_row">
                    <img src={boy} alt="user" className="chat_avatar" />
                    <div className="chat_bubble user">
                      <p>{userMsg.text}</p>
                      <span className="timestamp">{userMsg.time}</span>
                    </div>
                  </div>
                )}
                {botMsg && (
                  <div className="chat_row bot_row">
                    <img src={aiLogo} alt="bot" className="chat_avatar" />
                    <div className="chat_bubble bot">
                      <p>{botMsg.text}</p>
                      <span className="timestamp">{botMsg.time}</span>

                      {/* Reaction display */}
                      {botMsg.reaction && (
                        <div
                          className="reaction_tag"
                          style={{
                            fontSize: "12px",
                            color: "#666",
                            marginTop: "4px",
                            fontStyle: "italic",
                          }}
                        >
                          {botMsg.reaction === "like" ? "👍 Liked" : "👎 Disliked"}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="feedback_section">
                  <strong>Feedback:</strong>{" "}
                  {conv.feedback ? conv.feedback : "None"}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default History;
