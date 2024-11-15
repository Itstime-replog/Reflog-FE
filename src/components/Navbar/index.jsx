// Material UI 아이콘과 필요한 컴포넌트들을 임포트
import React from "react";
import styled from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";

// 상단 네비게이션 바의 메인 컨테이너
const Nav = styled.nav`
  background-color: #fff;
  padding: 2.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  height: 50px;
  z-index: 999;
`;

// 환영 메시지 등 텍스트를 포함하는 컨테이너
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-left: 32px;
  flex: 1;
`;

// 메인 환영 메시지 스타일링
const MainText = styled.div`
  color: #1f2024;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: 0.2px;
`;

// 서브 안내 메시지 스타일링
const SubText = styled.div`
  color: #a1a1a1;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
`;

// 우측 아이콘들을 감싸는 컨테이너
const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-right: 32px;
`;

// Material UI 아이콘 버튼 커스텀 스타일링
const StyledIconButton = styled(IconButton)`
  color: #666;
  padding: 12px;

  &:hover {
    color: #4a86f7;
    background-color: #f0f7ff;
  }

  .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

// Navbar 컴포넌트
const Navbar = () => {
  return (
    <Nav>
      <TextContainer>
        <MainText>사용자님 오늘도 파이팅하세요!</MainText>
        <SubText>
          날짜를 클릭해 일정을 등록하고 투두리스트를 작성해보세요.
        </SubText>
      </TextContainer>
      <IconContainer>
        <StyledIconButton>
          <NotificationsIcon />
        </StyledIconButton>
        <StyledIconButton>
          <PersonIcon />
        </StyledIconButton>
      </IconContainer>
    </Nav>
  );
};

export default Navbar;
