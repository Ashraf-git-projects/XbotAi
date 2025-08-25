import React from "react";
import { FiEdit } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../Assets/ai_logo.png";
// import New from "./New";
// import History from "./History";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home_container">
      <div className="home_left">
        <div className="top_left_ele">
          <div className="ai_logo_wrapper">
            <img alt="logo_img" className="ai_logo" src={logo} />
          </div>
          <button className="new_chat_btn" onClick={()=>navigate('/')}>New Chat </button>
          <FiEdit />
        </div>
        <button className="past_chat" onClick={()=>navigate('/history')}>Past conversations</button>
      </div>
      <div className="home_right">
        <h2>BOT AI</h2>
        <div className="home_right_content">
          <Outlet />
        </div>
        <div className="input_section">
            <input type="text" className="input_ele" placeholder = "Message Bot AI..."/>
            <button type="submit" onClick={()=>navigate('/chat')} className="input_btn">
              Ask
            </button>
            <button className="input_btn" type="button">Save</button>
          </div>
      </div>
    </div>
    
  );
}
export default Home;
