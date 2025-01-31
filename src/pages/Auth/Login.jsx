import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import logo2 from "../../assets/images/common/logo2.png";
import kakaoIcon from "../../assets/images/common/kakao.png";
import naverIcon from "../../assets/images/common/naver.png";
import bookmarkIcon from "../../assets/images/common/Bookmark-unsaved.png";
import alarmIcon from "../../assets/images/common/alarm-icon.png";
import profileIcon from "../../assets/images/common/profile-icon.png";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
`;

const Header = styled.div`
  width: 100%;
  height: 37.4%;
  background: #0059ff;
  position: relative;
`;

const LogoLink = styled(Link)`
  position: absolute;
  left: 57px;
  top: 50px;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 132.96px;
  height: 71px;
`;

const TopIconsContainer = styled.div`
  position: absolute;
  display: flex;
  gap: 24px;
  align-items: center;
  right: 48px;
  top: 48px;
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

const ProfileIconContainer = styled.div`
  width: 56px;
  height: 56px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TitleSection = styled.div`
  margin-bottom: 120px;
`;

const LoginTitle = styled.h1`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 36px;
  line-height: 60px;
  color: #0059ff;
  margin-bottom: 16px;
`;

const LoginSubtitle = styled.p`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #4e4e4e;
  white-space: pre-line;
`;

const SocialButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 12px;
  background: ${(props) => props.$bgColor};
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  transition: opacity 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.7 : 0.9)};
  }
`;

const ButtonIcon = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 20px;
`;

const ButtonText = styled.span`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  color: ${(props) => props.$color || "#FFFFFF"};
  flex: 1;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0059ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
`;

const Login = ({ setIsLoggedIn }) => {
  const { isLoading, error, handleKakaoLogin, handleNaverLogin } =
    useAuth(setIsLoggedIn);

  const handleSocialLoginClick = async (provider) => {
    try {
      if (provider === "kakao") {
        await handleKakaoLogin();
      } else if (provider === "naver") {
        await handleNaverLogin();
      }
    } catch (err) {
      console.error(`${provider} 로그인 중 오류 발생:`, err);
    }
  };

  return (
    <PageContainer>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}

      <Header>
        <LogoLink to="/login">
          <Logo src={logo2} alt="Reflog" />
        </LogoLink>
        <TopIconsContainer>
          <StyledBookmarkIcon src={bookmarkIcon} alt="Bookmark" />
          <StyledAlarmIcon src={alarmIcon} alt="Alarm" />
          <ProfileIconContainer>
            <StyledProfileIcon src={profileIcon} alt="Profile" />
          </ProfileIconContainer>
        </TopIconsContainer>
      </Header>

      <LoginBox>
        <TitleSection>
          <LoginTitle>LOGIN</LoginTitle>
          <LoginSubtitle>
            SNS로 간편하게 로그인하고{"\n"}더 많은 서비스를 즐겨보세요!
          </LoginSubtitle>
        </TitleSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SocialButton
          $bgColor="#FFE812"
          onClick={() => handleSocialLoginClick("kakao")}
          disabled={isLoading}
        >
          <ButtonIcon src={kakaoIcon} alt="Kakao" />
          <ButtonText $color="#000000">카카오로 계속하기</ButtonText>
        </SocialButton>
        <SocialButton
          $bgColor="#03C75A"
          onClick={() => handleSocialLoginClick("naver")}
          disabled={isLoading}
        >
          <ButtonIcon src={naverIcon} alt="Naver" />
          <ButtonText>NAVER로 계속하기</ButtonText>
        </SocialButton>
      </LoginBox>
    </PageContainer>
  );
};

export default Login;
