import React from 'react';
import { Routes, Route } from "react-router-dom";
import NotesPage from "./components/category/notes";
import SubjectNotes from "./components/category/subnotes";
import './index.css'; // Importing the CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (for components like navbar, modals, tooltips, etc.)
import Header from './components/Header/header';
import Router from './Router';
import Footer from './components/Footer/footer';



   

function App() {
  return (
    <div>
      <Header />
      <Router/>
      <Footer />
    
    
      
    </div>
  );
}

export default App;
