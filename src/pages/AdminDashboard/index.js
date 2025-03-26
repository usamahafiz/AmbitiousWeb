import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddContent from './AddTopic'
import ManageContent from './ManageTopic'

export default function Dashboard() {
  return (
    <>
    <Routes>
        <Route path="addContent" element={< AddContent/>} />
        <Route path="manageContent" element={<ManageContent/>} />
        
    </Routes>
      
    </>
  )
}
