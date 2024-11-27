// 필요한 컴포넌트와 스타일 임포트
import React from "react";
import styled from "styled-components";
import BookmarkIcon from "C:/Users/SAMSUNG/Desktop/Reflog/src/assets/images/Bookmark-unsaved.png";
import AlarmIcon from "C:/Users/SAMSUNG/Desktop/Reflog/src/assets/images/alarm-icon.png";
import ProfileIcon from "C:/Users/SAMSUNG/Desktop/Reflog/src/assets/images/profile-icon.png";

// 상단 네비게이션 바의 메인 컨테이너
const Nav = styled.nav`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  left: 240px;
  right: 0;
  height: 136px;
  z-index: 999;
  box-shadow: 0px 0px 4px rgba(139, 139, 139, 0.25);
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

// 이미지 버튼 스타일링
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover img {
    filter: brightness(0.8);
  }
`;

const StyledBookmarkIcon = styled.img`
  width: 51px;
  height: 51px;
`;
const StyledAlarmIcon = styled.img`
  width: 30px;
  height: 30px;
`;
const StyledProfileIcon = styled.img`
  width: 53px;
  height: 53px;
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
        <IconButton>
          <StyledBookmarkIcon src={BookmarkIcon} alt="Bookmark Icon" />
        </IconButton>
        <IconButton>
          <StyledAlarmIcon src={AlarmIcon} alt="Alarm Icon" />
        </IconButton>
        <IconButton>
          <StyledProfileIcon src={ProfileIcon} alt="Profile Icon" />
        </IconButton>
      </IconContainer>
    </Nav>
  );
};

export default Navbar;
