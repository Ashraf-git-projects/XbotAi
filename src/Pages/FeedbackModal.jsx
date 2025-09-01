import React, { useState } from "react";
import { X, Lightbulb } from "lucide-react";

function FeedbackModal({ onClose, conversationIndex = null }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return;

    let conversations = JSON.parse(localStorage.getItem("conversations")) || [];
    if (conversations.length > 0) {
      const index = conversationIndex ?? conversations.length - 1;
      if (conversations[index]) {
        conversations[index].feedback = feedback;
        localStorage.setItem("conversations", JSON.stringify(conversations));
      }
    }
    onClose();
  };

  return (
    <div className="modal_overlay">
      <div className="modal_box">
        {/* Header */}
        <div className="modal_header">
          <div className="modal_title_wrap">
            <Lightbulb size={20} className="modal_icon" />
            <h3 className="modal_title">Feedback</h3>
          </div>
          <button className="close_btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Input */}
        <textarea
          className="feedback_area"
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Footer */}
        <div className="modal_footer">
          <button className="submit_btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;
