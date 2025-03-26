import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/notes.css";

const subjects = [
  { name: "Urdu", path: "/notes/urdu" },
  { name: "English", path: "/notes/english" },
  { name: "Math", path: "/notes/math" },
  { name: "Islamiyat", path: "/notes/islamiyat" },
  { name: "Biology", path: "/notes/biology" },
  { name: "Physics", path: "/notes/physics" },
  { name: "Chemistry", path: "/notes/chemistry" },
  { name: "Computer", path: "/notes/computer" }
];

const Notes = () => {
  const navigate = useNavigate();

  return (
    <div className="notes-container mt-5">
      
      <main>
        <h2 className="text-dark mt-4">Welcome to Our Educational Portal</h2>
        <p className="intro-text fw-bold">
          Our goal is to provide high-quality educational resources for students of all levels.
          Explore subject-wise notes, past papers, and self-assessment tools to enhance your learning experience.
        </p>

        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <div 
              key={index} 
              className="subject-card" 
              onClick={() => navigate(subject.path)}
            >
              {subject.name}
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};

export default Notes;
