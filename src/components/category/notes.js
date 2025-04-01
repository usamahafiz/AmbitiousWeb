import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fireStore } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
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

const contentTypes = [
  { label: "📖 Book Lessons", value: "book-lessons" },
  { label: "📝 MCQs", value: "mcqs" },
  { label: "📜 Past Papers", value: "past-papers" },
];

const Notes = () => {
  const { selectedClass, subject, contentType, topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(false);
  const [openSubject, setOpenSubject] = useState(null); // Track only the currently open subject
  const [activeContentType, setActiveContentType] = useState(contentType);

  // Effect to sync URL params with component state
  useEffect(() => {
    if (subject) {
      const subjectIndex = subjects.findIndex(
        (s) => s.toLowerCase() === subject.toLowerCase()
      );
      if (subjectIndex !== -1) {
        setOpenSubject(subjectIndex);
      }
    }

    if (contentType) {
      setActiveContentType(contentType);
      const currentSubject = subject
        ? subjects.find((s) => s.toLowerCase() === subject.toLowerCase())
        : null;

      if (currentSubject) {
        fetchTopics(currentSubject, contentType);
      }
    }
  }, [subject, contentType]);

  // Fetch topics based on subject & content type
  const fetchTopics = async (subject, contentType) => {
    if (!subject || !contentType) return;

    setLoading(true);
    try {
      const topicsRef = collection(fireStore, "topics");
      const q = query(
        topicsRef,
        where("class", "==", selectedClass),
        where("subject", "==", subject.toLowerCase()),
        where("contentType", "==", contentType)
      );

      const querySnapshot = await getDocs(q);
      const topicData = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.topic) {
          topicData[data.topic] = data.fileUrls || [];
        }
      });

      setTopics(topicData);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
    setLoading(false);
  };

  // Handle subject selection - open only one subject at a time
  const handleSelectSubject = (subject, index) => {
    // Toggle the current subject or select a new one
    const newOpenSubject = openSubject === index ? null : index;
    setOpenSubject(newOpenSubject);

    if (newOpenSubject !== null) {
      // If we're opening a subject, update the URL
      if (activeContentType) {
        // If we already have a content type, include it in the URL
        navigate(`/notes/${selectedClass}/${subject.toLowerCase()}/`);
      } else {
        // Otherwise just navigate to the subject
        navigate(`/notes/${selectedClass}/${subject.toLowerCase()}`);
      }
    } else {
      // If we're closing the subject, go back to the class level
      navigate(`/notes/${selectedClass}`);
    }

    // Clear topics when changing subjects
    if (openSubject !== index) {
      setTopics({});
    }
  };

  // Handle content type selection
  const handleSelectContentType = (subject, contentType) => {
    setActiveContentType(contentType);
    setTopics({}); // Reset topics when switching content type
    setLoading(true); // Set loading state to true to show "Loading topics..."
    // Update URL when selecting content type
    navigate(`/notes/${selectedClass}/${subject.toLowerCase()}/${contentType}`);
    fetchTopics(subject, contentType);
  };

  const handleTopicClick = (topicName, subject, contentType) => {
    // Fetch the file URLs for the selected topic
    const fileUrls = topics[topicName];  // This accesses the file URLs for the selected topic
  
    if (fileUrls && fileUrls.length > 0) {
      // You can choose to open the first URL or show multiple URLs if needed
      const fileUrl = fileUrls[0];  // Assuming the first URL is the one you want
  
      // Navigate to the preview page with the encoded URL
      navigate(`/preview?url=${encodeURIComponent(fileUrl)}`);
    } else {
      // Handle case when no file URL is available for the topic
      console.error('No file URL found for this topic.');
    }
  };
  

  return (
    <div className="notes-container">
      <main>
        <h2 className="text-dark text-center py-5">
          Welcome to Our Educational Portal
        </h2>
        <p className="intro-text fw-bold text-center">
          Our goal is to provide high-quality educational resources for students
          of all levels.
        </p>

        <div className="subjects-grid">
          {subjects.map((subjectName, index) => (
            <div key={index} className="subject-card">
              <div
                className={`subject-header ${
                  openSubject === index ? "active" : ""
                }`}
                onClick={() => handleSelectSubject(subjectName, index)}
              >
                <span className="subject-name">{subjectName}</span>
                <span className="dropdown-indicator">
                  {openSubject === index ? "" : ""}
                </span>
              </div>

              {openSubject === index && (
                <div className="content-type-dropdown">
                  {contentTypes.map(({ label, value }) => (
                    <div key={value} className="content-type-container">
                      <div
                        className={`dropdown-item ${
                          activeContentType === value ? "active" : ""
                        }`}
                        onClick={() =>
                          handleSelectContentType(subjectName, value)
                        }
                      >
                        {label}
                      </div>

                      {/* Show topics only if this content type is selected */}
                      {activeContentType === value && (
                        <div className="topics-list">
                          {loading ? (
                            <p className="loading-text">Loading topics...</p>
                          ) : Object.keys(topics).length === 0 ? (
                            <p className="error-text">No topics available.</p>
                          ) : (
                            Object.keys(topics).map((topicName, topicIndex) => (
                              <div
                                key={topicIndex}
                                className="topic-item"
                                onClick={() =>
                                  handleTopicClick(
                                    topicName,
                                    subjectName,
                                    value
                                  )
                                }
                              >
                                📌 {topicName}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notes;