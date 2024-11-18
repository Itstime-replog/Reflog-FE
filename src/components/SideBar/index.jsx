import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import logo from "../../assets/images/logo.png";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 1000;
  border-right: 1px solid #e5e5e5;
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 70px;
  margin-top: 20px;
`;

const MenuContainer = styled.div`
  padding-top: 18px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin: 8px 24px;
  color: ${(props) => (props.$isActive ? "#4a86f7" : "#666")};
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: all 0.2s;

  ${(props) =>
    props.$isActive &&
    `
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      height: 42px;
      background-color: #f0f7ff;
      border-radius: 21px;
      z-index: -1;
    }
  `}

  &:hover {
    color: #4a86f7;
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      height: 42px;
      background-color: #f0f7ff;
      border-radius: 21px;
      z-index: -1;
    }
  }
`;

const IconWrapper = styled.span`
  margin-right: 16px;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

const menuItems = [
  { path: "/studyplan", label: "학습 플랜", icon: CalendarMonthIcon },
  { path: "/retrospect", label: "회고 일지", icon: HistoryEduIcon },
  { path: "/analysis", label: "분석 보고서", icon: AssessmentIcon },
  { path: "/community", label: "커뮤니티", icon: PeopleIcon },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <LogoContainer to="/">
        <Logo src={logo} alt="Reflog" />
      </LogoContainer>
      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            $isActive={location.pathname === item.path} // 현재 경로와 메뉴 경로가 일치하는지 확인
          >
            <IconWrapper>
              <StyledIcon>
                <item.icon />
              </StyledIcon>
            </IconWrapper>
            {item.label}
          </MenuItem>
        ))}
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
