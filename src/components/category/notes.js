import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/notes.css";

const subjects = [
  "Urdu",
  "English",
  "Math",
  "Islamiyat",
  "Biology",
  "Physics",
  "Chemistry",
  "Computer",
  "Tarjma tul Quran",
  "Pak Studies",
];

const pdfUrl =
  "https://firebasestorage.googleapis.com/v0/b/shop-nest-278.appspot.com/o/uploads%2F1743060277359-Basic%20CMD%20commands%20for%20Windows%20oct%202024.pdf?alt=media&token=58fa9d4f-9495-48e6-ae32-4964c695b436";

const Notes = () => {
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const toggleSubDropdown = (index) => {
    setOpenSubDropdown(openSubDropdown === index ? null : index);
  };

  return (
    <div className="notes-container">
      <main>
        <h2 className="text-dark text-center">
          Welcome to Our Educational Portal
        </h2>
        <p className="intro-text fw-bold text-center">
          Our goal is to provide high-quality educational resources for students
          of all levels. Explore subject-wise notes, past papers, and
          self-assessment tools to enhance your learning experience.
        </p>

        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div key={index} className="subject-card">
              {/* Subject Header */}
              <div className="subject-header">
                <span className="subject-name">{subject}</span>
              </div>

              {/* Book Lessons Dropdown */}
              <div
                className="dropdown-item"
                onClick={() => toggleSubDropdown(index)}
              >
                📖 Book Lessons {openSubDropdown === index ? "▲" : "▼"}
              </div>

              {/* Nested Dropdown for Book Lessons */}
              <div
                className={`nested-dropdown ${
                  openSubDropdown === index ? "open" : ""
                }`}
              >
                {[1, 2, 3, 4, 5].map((unit) => (
                  <Link
                    key={unit}
                    to={`/preview?url=${encodeURIComponent(pdfUrl)}`}
                    className="nested-item"
                  >
                    Unit {unit}
                  </Link>
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
