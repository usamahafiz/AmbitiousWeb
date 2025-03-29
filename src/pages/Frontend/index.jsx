import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notes from '../../components/category/notes';
import SubNotes from '../../components/category/subnotes';
import Preview from "../../components/pdfviewer/index";
import AboutSection from './AboutPage';

export default function FrontEnd() {
  return (
    <>
    <Routes>
        
        <Route path="/notes" element={<Notes />} />
        <Route path="/preview" element={<Preview/>} />
        <Route path="/about" element={<AboutSection/>} />


        <Route path="/notes/:subject" element={<SubNotes />} />
          
        
    </Routes>
      
    </>
  )
}
