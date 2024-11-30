import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import logo from "../../assets/images/common/logo.png";

const SidebarContainer = styled.div`
  width: 246px;
  background-color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 1000;
  border-right: 1px solid #e5e5e5;
  box-shadow: 0px 0px 4px rgba(139, 139, 139, 0.25);
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 70px;
  margin-top: 50px;
`;

const MenuContainer = styled.div`
  padding-top: 44px;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 18px 20px;
  margin: 8px 20px;
  color: ${(props) => (props.$isActive ? "#0059FF" : "#8F9098")};
  text-decoration: none;
  position: relative;
  transition: all 0.2s;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.2px;

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
      background-color: #F0F7FF;
      border-radius: 8px;
      z-index: -1;
      color: #0059FF;
    }
  `}

  &:hover {
    color: #0059ff; /* 호버 시에도 활성화 색상과 동일하게 설정 */
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 85%;
      height: 42px;
      background-color: #f0f7ff;
      border-radius: 8px;
      z-index: -1;
    }
  }
`;

const IconWrapper = styled.span`
  margin-right: 16px;
  margin-left: 14px;
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
