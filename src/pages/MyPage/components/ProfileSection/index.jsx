import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileIcon from "../../../../assets/images/common/profile-icon.png";
import {
  removeLoginToken,
  getUserName,
  getAccessToken,
} from "../../../../utils/auth";
import { logoutAPI } from "../../../../apis/authapi";

const Container = styled.div`
  width: 40%;
  height: 208px;
  border: 1px solid #b7b7b7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  margin: 0 auto;
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const ProfileImage = styled.img`
  width: 134px;
  height: 134px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Username = styled.h2`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  color: rgba(0, 0, 0, 0.7);
  margin: 0;
`;

const RoleText = styled.span`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #b7b7b7;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const EditButton = styled.button`
  height: 36px;
  padding: 0 26px;
  background: #0059ff;
  border: 1px solid #0059ff;
  border-radius: 5px;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    opacity: 0.9;
  }
`;

const ProfileSection = ({ setIsLoggedIn, onEditClick }) => {
  const userName = getUserName() || "리플이";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = getAccessToken();
      if (token) {
        await logoutAPI(token);
      }
      removeLoginToken();
      setIsLoggedIn(false);
      navigate("/onboarding", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      removeLoginToken();
      setIsLoggedIn(false);
      navigate("/onboarding", { replace: true });
    }
  };

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImage src={ProfileIcon} alt="Profile" />
        <ProfileInfo>
          <Username>{userName}</Username>
          <RoleText onClick={handleLogout}>로그아웃</RoleText>
        </ProfileInfo>
      </ProfileImageWrapper>
      <EditButton onClick={onEditClick}>프로필 편집</EditButton>
    </Container>
  );
};

export default ProfileSection;
