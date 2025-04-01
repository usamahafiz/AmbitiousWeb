import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/cardsection.css";
import { FaBookOpen } from "react-icons/fa";

const categories = [
  { title: "Class 9" },
  { title: "Class 10" },
  { title: "Class 11" },
  { title: "Class 12" }
];

const CardSection = () => {
  const { selectedClass } = useParams(); // Get selected class from URL
  const navigate = useNavigate();
  const [activeClass, setActiveClass] = useState(selectedClass || "");

  const handleSelectClass = (title) => {
    setActiveClass(title);
    navigate(`notes/${title.replace(" ", "").toLowerCase()}`); // Update URL
  };

  return (
    <div className="featured-container">
      <h2 className="section-heading text-center text-dark fw-bold mb-4">
        Featured classes
      </h2>
      <div className="featured-section">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card ${activeClass === category.title ? "active" : ""}`}
            onClick={() => handleSelectClass(category.title)}
          >
            <div className="icon-wrapper">
              <FaBookOpen className="category-icon" />
            </div>
            <h3>{category.title}</h3>
            <ul>
              <li>Notes</li>
              <li>Past Papers</li>
              <li>Test Yourself</li>
              <li>Guess Papers</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;