import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './assets/contexts/AuthContext';

import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import UsersPage from './components/UsersPage';
import LoginPage from './components/LoginPage';
import Footer from './components/Footer';

function App() {
  return (
  <Router>
    <AuthProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/users" element={<UsersPage/>}/>
      </Routes>
      <Footer/>
    </AuthProvider>
  </Router>
  );
}

export default App;
