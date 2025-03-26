import React from "react";
import { FaHeart, FaSmile } from "react-icons/fa"; // Icons for features
import learn from '../assets/images/learn.png'
import "../assets/css/premium.css"; // Import CSS file


const Premium = () => {
  return (
    <section className="learning-section">
      <div className="learning-container">
        {/* Left Side - Image */}
        <div className="learning-image">
          <img src={learn} alt="Premium Learning" />
        </div>

        {/* Right Side - Content */}
        <div className="learning-content">
          <h1>
            Premium <span className="highlight">Learning</span> Experience
          </h1>
          <div className="learning-feature">
            <div className="feature-icon">
              <FaHeart />
            </div>
            <div>
              <h4>Easily Accessible</h4>
              <p>Learning will feel very comfortable with ambitious goals.</p>
            </div>
          </div>
          <div className="learning-feature">
            <div className="feature-icon">
              <FaSmile />
            </div>
            <div>
              <h4>Fun Learning Experience</h4>
              <p>Unlock knowledge effortlessly with an engaging learning journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Premium;







