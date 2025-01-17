import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { setLoginToken } from "../../utils/auth";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

const LoadingBox = styled.div`
  padding: 30px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #0059ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-family: "Pretendard";
  font-size: 16px;
  color: #333;
`;

const OAuthCallback = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        console.log("Raw Login response params:");
        searchParams.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const name = searchParams.get("name");
        const imageUrl = searchParams.get("profile_image");

        console.log("Profile image URL:", imageUrl);

        let memberId = "";
        try {
          const tokenParts = accessToken.split(".");
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            console.log("Decoded token payload:", payload);
            memberId = payload.userId;
          }
        } catch (error) {
          console.error("Failed to extract memberId from token:", error);
        }

        const loginData = {
          accessToken,
          refreshToken,
          name: name ? decodeURIComponent(name) : "",
          memberId,
          profile_image: imageUrl,
        };

        console.log("Setting login data:", JSON.stringify(loginData, null, 2));

        setLoginToken(loginData);
        setIsLoggedIn(true);

        // 로그인 성공 시 /home으로 리다이렉트
        navigate("/home", { replace: true });
      } catch (error) {
        console.error("Login process failed:", error);
        // 로그인 실패 시 로그인 페이지로 리다이렉트
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, location.search, setIsLoggedIn]);

  return (
    <LoadingContainer>
      <LoadingBox>
        <LoadingSpinner />
        <LoadingText>로그인 처리 중입니다...</LoadingText>
      </LoadingBox>
    </LoadingContainer>
  );
};

export default OAuthCallback;
