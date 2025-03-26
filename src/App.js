import React from 'react';
import { Routes, Route } from "react-router-dom";
import NotesPage from "./components/category/notes";
import SubjectNotes from "./components/category/subnotes";
import './index.css'; // Importing the CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS (for components like navbar, modals, tooltips, etc.)
import Header from './components/Header/header';
import Hero from "./components/hero";
import OurTrack from "./components/ourTrack";
import Testimonials from './components/testimonial';
import Premium from './components/premium';
import FormAuth from './components/formauth';
import Footer from './components/Footer/footer';
import CardSection from './components/cardsection';



   

function App() {
  return (
    <div>
     <Header />
       {/* <Hero />
      <CardSection />
      <OurTrack />
      <Premium />
      <Testimonials />
      <FormAuth />  */}
      
  
      <Routes>
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/notes/:subject" element={<SubjectNotes />} />
      </Routes>
      <Footer />
    
    
      
    </div>
  );
}

export default App;
