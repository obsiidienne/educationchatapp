import React from "react";
import AdminNav from "../Components/AdminNav/AdminNav";
import EtabHome from "../Components/EtablissementHome/EtablissementHome";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const EtablissementHomePage = () => {
  return (
    <>
      <AdminNav />
      <EtabHome/>
      <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', marginTop:"-50.2%"  }}>
      <CDBSidebar textColor="#fff" backgroundColor="linear-gradient(to top, #accbee 0%, #e7f0fd 100%)">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"style={{ color: 'black' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'black' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/Auth" activeClassName="activeClicked"style={{ color: 'black' }}>
              <CDBSidebarMenuItem icon="user">Ajouter un Utilisateur</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/admin/list" activeClassName="activeClicked"style={{ color: 'black' }}>
              <CDBSidebarMenuItem icon="city">Etablissement</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Admin/home" activeClassName="activeClicked"style={{ color: 'black' }}>
              <CDBSidebarMenuItem icon="users">Utilisateurs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Admin/add" activeClassName="activeClicked"style={{ color: 'black' }}>
              <CDBSidebarMenuItem icon="building">Ajouter un Etablissement</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/Admin/add" activeClassName="activeClicked"style={{ color: 'black' }}>
              <CDBSidebarMenuItem icon="message">Archives</CDBSidebarMenuItem>
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

export default EtablissementHomePage;
