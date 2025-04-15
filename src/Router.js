import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Frontend/HomePage';
import Dashboard from './pages/AdminDashboard';
import FrontEnd from './pages/Frontend';
import Auth from './pages/Auth/index';
import InstitutionAdminPage from './components/institutionadmin';


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard/*" element={<Dashboard />} /> 
   
      {/* <Route path="/*" element={<Auth />} /> */}
      <Route path="/*" element={<FrontEnd />} />
        {/* FrontEnd Route */}
        {/* <Route path="institutionpage" element={<InstitutionAdminPage />} />  */}
    </Routes>
  );
}
