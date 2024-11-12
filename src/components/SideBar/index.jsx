import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import logo from '../../assets/images/logo.png';

// 사이드바의 전체를 감싸는 컨테이너
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

// 로고를 감싸는 컨테이너 (클릭 시 홈으로 이동)
const LogoContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  text-decoration: none;
`;

// 로고 이미지 스타일링
const Logo = styled.img`
  height: 70px;
`;

// 메뉴 항목들을 감싸는 컨테이너
const MenuContainer = styled.div`
  padding-top: 40px;
`;

// 각 메뉴 항목의 스타일링 (호버 효과 포함)
const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin: 8px 24px;
  color: #666;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: all 0.2s;

  &:hover {
    color: #4A86F7;
    &:before {
      content: '';
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

// 아이콘을 감싸는 래퍼
const IconWrapper = styled.span`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

// 아이콘 스타일링
const StyledIcon = styled.div`
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
`;

// 메뉴 항목 데이터 배열
const menuItems = [
  { path: '/studyplan', label: '학습 플랜', icon: CalendarMonthIcon },
  { path: '/retrospect', label: '회고 일지', icon: HistoryEduIcon },
  { path: '/analysis', label: '분석 보고서', icon: AssessmentIcon },
  { path: '/community', label: '커뮤니티', icon: PeopleIcon },
];

// Sidebar 컴포넌트
const Sidebar = () => {
  // 현재 경로 정보를 가져오기 위한 hook
  const location = useLocation();

  return (
    <SidebarContainer>
      {/* 로고를 클릭하면 홈으로 이동 */}
      <LogoContainer to="/">
        <Logo src={logo} alt="Reflog" />
      </LogoContainer>
      {/* 메뉴 항목들을 매핑하여 렌더링 */}
      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem 
            key={item.path} 
            to={item.path}
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