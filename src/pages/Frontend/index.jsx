import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Notes from '../../components/category/notes';
import SubNotes from '../../components/category/subnotes';

export default function FrontEnd() {
  return (
    <>
    <Routes>
        
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:subject" element={<SubNotes />} />
          
        
    </Routes>
      
    </>
  )
}
