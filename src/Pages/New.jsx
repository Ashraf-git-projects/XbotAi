import React from 'react'
import logo from "../Assets/ai_logo.png";

export default function New() {
  return (
    <div>
        <div className="txt_logo">
            <h3>How Can I Help You Today ?</h3>
            <img alt="logo_img" className="ai_logo-right" src={logo} />
          </div>
        <div className="txt_grids">
            <div className="grid_typos">
              <h3>Hi , What is the weather</h3>
              <p>Get immediate ai generated response</p>
            </div>
            <div className="grid_typos">
              <h3>Hi , What is my location</h3>
              <p>Get immediate ai generated response</p>
            </div>
            <div className="grid_typos">
              <h3>Hi , What is the temperature</h3>
              <p>Get immediate ai generated response</p>
            </div>
            <div className="grid_typos">
              <h3>Hi , how are you</h3>
              <p>Get immediate ai generated response</p>
            </div>
          </div>
    </div>
  )
}
