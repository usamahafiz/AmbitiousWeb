import React from "react";
import "../assets/css/cardsection.css";
import { FaBookOpen } from "react-icons/fa";

const categories = [
    
  { 
    title: "Class 9", 
    links: [
      { name: "Notes", url: "#" },
      { name: "Past Papers", url: "/notes" },
      { name: "Test Yourself", url: "#" },
      { name: "Guess Papers", url: "#" }
    ]
  },
  { 
    title: "Class 10", 
    links: [
      { name: "Notes", url: "#" },
      { name: "Past Papers", url: "#" },
      { name: "Test Yourself", url: "#" },
      { name: "Guess Papers", url: "#" }
    ]
  },
  { 
    title: "Class 11", 
    links: [
      { name: "Notes", url: "#" },
      { name: "Past Papers", url: "#" },
      { name: "Test Yourself", url: "#" },
      { name: "Guess Papers", url: "#" }
    ]
  },
  { 
    title: "Class 12", 
    links: [
      { name: "Notes", url: "#" },
      { name: "Past Papers", url: "#" },
      { name: "Test Yourself", url: "#" },
      { name: "Guess Papers", url: "#" }
    ]
  }
];

const CardSection = () => {
  return (
    <div className="featured-container">
    <h2 className="section-heading text-center text-dark fw-bold mb-4">Featured Categories</h2>
    <div className="featured-section">
      {categories.map((category, index) => (
        <div className="category-card" key={index}>
          <div className="icon-wrapper">
            <FaBookOpen className="category-icon" />
          </div>
          <h3>{category.title}</h3>
          <ul>
            {category.links.map((link, idx) => (
              <li key={idx}>
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  );
};

export default CardSection;