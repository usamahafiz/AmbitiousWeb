import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notes from '../../components/category/notes';
import SubNotes from '../../components/category/subnotes';
import Preview from "../../components/pdfviewer/index";
import AboutSection from './AboutPage';
import ContactSection from './ContactPage';

export default function FrontEnd() {
  return (
    <>
    <Routes>

        <Route path="/notes/:selectedClass/:category?/:subCategory?" element={<Notes />} />

        <Route path="/preview" element={<Preview/>} />

        <Route path="/note/:subject" element={<SubNotes />} />
        <Route path="/about" element={<AboutSection/>} />
        <Route path="/contact" element={<ContactSection/>} />

          
        
    </Routes>
      
    </>
  )
}
