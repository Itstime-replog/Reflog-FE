import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  margin-left: 240px;
  padding: 85px 24px 24px;
  flex: 1;
  min-height: calc(100vh - 100px);
`;

const RootLayout = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const isOnboardingPage = location.pathname === "/onboarding";

  return (
    <LayoutContainer>
      <Sidebar disabled={isOnboardingPage} />
      <Navbar setIsLoggedIn={setIsLoggedIn} disabled={isOnboardingPage} />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default RootLayout;
