import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BookmarkIcon from "../../assets/images/common/Bookmark-unsaved.png";
import AlarmIcon from "../../assets/images/common/alarm-icon.png";
import ProfileIcon from "../../assets/images/common/profile-icon.png";
import {
  removeLoginToken,
  getAccessToken,
  getUserName,
} from "../../utils/auth";
import { logoutAPI } from "../../apis/authapi";

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
  display: ${(props) => (props.$isHidden ? "none" : "flex")};
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

const EmptySpace = styled.div`
  flex: 1;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    opacity: 0.8;
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
  width: 180px;
  background: white;
  border-radius: 20px;
  padding: 20px;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div`
  padding: 10px 0;
  color: black;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Navbar = ({ setIsLoggedIn, disabled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("사용자");
  const navigate = useNavigate();
  const location = useLocation();
  const isOnboarding = location.pathname === "/onboarding";

  useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogout = disabled
    ? undefined
    : async () => {
        try {
          const token = getAccessToken();
          if (token) {
            await logoutAPI(token); // API 호출
            removeLoginToken(); // 성공하면 로컬 스토리지 클리어
            setIsLoggedIn(false);
            navigate("/onboarding", { replace: true });
          } else {
            throw new Error("No token available for logout");
          }
        } catch (error) {
          console.error("Logout failed:", error);
          // API 호출이 실패하더라도 로컬에서는 로그아웃 처리
          removeLoginToken();
          setIsLoggedIn(false);
          navigate("/onboarding", { replace: true });
        }
      };

  const handleProfileClick = disabled
    ? undefined
    : (e) => {
        e.stopPropagation();
        setIsDropdownOpen(!isDropdownOpen);
      };

  const handleMyPageClick = disabled
    ? undefined
    : () => {
        navigate("/mypage");
        setIsDropdownOpen(false);
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
    <Nav style={{ pointerEvents: disabled ? "none" : "auto" }}>
      <TextContainer $isHidden={isOnboarding}>
        <MainText>{userName}님 오늘도 파이팅하세요!</MainText>
        <SubText>
          날짜를 클릭해 일정을 등록하고 투두리스트를 작성해보세요.
        </SubText>
      </TextContainer>
      {isOnboarding && <EmptySpace />}
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
            <DropdownItem onClick={handleMyPageClick}>마이페이지</DropdownItem>
            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      </IconContainer>
    </Nav>
  );
};

export default Navbar;
