import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
`;

const MainContent = styled.main`
  margin-left: 240px;
`;

const RootLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default RootLayout;
