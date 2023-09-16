import React from "react";
import AdminHome from "../Components/AdminHome/AdminHome";
import AdminNav from "../Components/AdminNav/AdminNav";
import Sidebar from "../Components/EditUser/EditUser";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <>
      <AdminNav />
      <AdminHome />
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', marginTop:"-24%" }}>
      <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(45deg, #49a09d, #5f2c82)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Auth" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Ajouter un Utilisateur</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/list" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Etablissement</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Admin/home" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Utilisateurs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Admin/add" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Ajouter un Etablissement</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    </>
  );
};

export default AdminHomePage;
