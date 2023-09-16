import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Auth from "./Pages/Auth";
import ChatPage from "./Pages/ChatPage";
//import AdminLoginPage from "./Pages/AdminLoginPage";
//import AdminHomePage from "./Pages/AdminHomePage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminHomePage from "./Pages/AdminHomePage";
import EtablissementHomePage from "./Pages/EtablissementHomePage";
import AddUserPage from "./Pages/AddUserPage";
import AddEtablissementPage from "./Pages/AddEtablissementPage";
import EditUserPage from "./Pages/EditUserPage";
import Sidebar from "./Pages/sidebar";
import Sidebarr from "./Components/sidebar/sidebar";
function App() {
  return (
    <div className="App">
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<Auth />}></Route>
        <Route path="auth/" element={<Auth />}></Route>
        <Route path="chats" element={<ChatPage />}></Route>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/list" element={<EtablissementHomePage/>} />
        <Route path="/admin/add" element={<AddEtablissementPage/>} />
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
