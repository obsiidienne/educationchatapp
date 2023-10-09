import "./App.css";
import React from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Auth from "./Pages/Auth";
import ChatPage from "./Pages/ChatPage";
import { useEffect, useState } from "react";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminHomePage from "./Pages/AdminHomePage";
import AddUserPage from "./Pages/AddUserPage";
import EditUserPage from "./Pages/EditUserPage";
import Sidebar from "./Pages/sidebar";
import Sidebarr from "./Components/sidebar/sidebar";
function App() {
    useEffect(() => {
    fetch("https://educationline.onrender.com")
      .then((res) => res.json());
  },[]);
  return (
    <div className="App">
      <Routes>
      
        
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="auth" element={<Auth />}></Route>
        <Route path="auth/" element={<Auth />}></Route>
        <Route path="chats" element={<ChatPage />}></Route>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/add-user" element={<AddUserPage />} />
        <Route path="/admin/edit-user" element={<EditUserPage />} />    
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/sidebarr" element={<Sidebarr/>} />
        
      </Routes>
    </div>
  );
}

export default App;
