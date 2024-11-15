import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

// 전체 레이아웃을 감싸는 컨테이너
const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
`;

// 메인 콘텐츠 영역
const MainContent = styled.main`
  margin-left: 240px;
  padding: 85px 24px 24px;
  flex: 1;  // 남은 공간을 모두 차지하도록 설정
  min-height: calc(100vh - 100px);  // footer 높이를 고려한 최소 높이
`;

const RootLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default RootLayout;
