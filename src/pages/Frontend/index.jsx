import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notes from '../../components/category/notes';
import SubNotes from '../../components/category/subnotes';
import Preview from "../../components/pdfviewer/index";

export default function FrontEnd() {
  return (
    <>
    <Routes>

        <Route path="/notes/:selectedClass/:category?/:subCategory?" element={<Notes />} />

        <Route path="/preview" element={<Preview/>} />

        <Route path="/note/:subject" element={<SubNotes />} />
          
        
    </Routes>
      
    </>
  )
}