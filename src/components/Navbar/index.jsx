import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BookmarkIcon from "../../assets/images/common/Bookmark-unsaved.png";
import AlarmIcon from "../../assets/images/common/alarm-icon.png";
import ProfileIcon from "../../assets/images/common/profile-icon.png";
import { removeLoginToken } from "../../utils/auth";

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

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  margin-left: 32px;
  flex: 1;
`;

const MainText = styled.div`
  color: #1f2024;
  font-family: "Pretendard", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: 0.2px;
`;

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

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-right: 32px;
`;

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

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 174px;
  height: 98px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 12px 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  margin-top: 5px;
  width: 140px;

  &:hover {
    opacity: 0.7;
    background-color: #e5eeff;
    color: #0059ff;
    border-radius: 3px;
  }
`;

const Navbar = ({ setIsLoggedIn }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 먼저 토큰 제거
    removeLoginToken();
    // 로그인 상태 업데이트
    setIsLoggedIn(false);
    // replace: true로 설정하여 히스토리 스택에서 현재 페이지를 대체
    navigate("/login", { replace: true });
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("#profile-container")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        <ProfileContainer id="profile-container">
          <IconButton onClick={handleProfileClick}>
            <StyledProfileIcon src={ProfileIcon} alt="Profile Icon" />
          </IconButton>
          <ProfileDropdown $isOpen={isDropdownOpen}>
            <DropdownItem>마이페이지</DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      </IconContainer>
    </Nav>
  );
};

export default Navbar;
