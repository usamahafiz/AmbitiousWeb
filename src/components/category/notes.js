import React, { useState } from "react";
import "../../assets/css/notes.css";

const subjects = [
  "Urdu",
  "English",
  "Math",
  "Islamiyat",
  "Biology",
  "Physics",
  "Chemistry",
  "Computer"
];

const Notes = () => {
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const toggleSubDropdown = (index) => {
    setOpenSubDropdown(openSubDropdown === index ? null : index);
  };

  return (
    <div className="notes-container">
      <main>
        <h2 className="text-dark text-center">Welcome to Our Educational Portal</h2>
        <p className="intro-text fw-bold text-center">
          Our goal is to provide high-quality educational resources for students of all levels.
          Explore subject-wise notes, past papers, and self-assessment tools to enhance your learning experience.
        </p>

        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-card">
              {/* Subject Header */}
              <div className="subject-header">
                <span className="subject-name">{subject}</span>
              </div>

              {/* Book Lessons Dropdown */}
              <div className="dropdown-item" onClick={() => toggleSubDropdown(index)}>
                📖 Book Lessons {openSubDropdown === index ? "▲" : "▼"}
              </div>

              {/* Nested Dropdown for Book Lessons */}
              <div className={`nested-dropdown ${openSubDropdown === index ? "open" : ""}`}>
                {[1, 2, 3, 4, 5].map((unit) => (
                  <div key={unit} className="nested-item">
                    Unit {unit}
                  </div>
                ))}
              </div>

              <div className="dropdown-item">📝 MCQs</div>
              <div className="dropdown-item">📜 Past Papers</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notes;






