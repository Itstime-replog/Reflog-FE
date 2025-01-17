import { useState, useCallback } from "react";

const BACKEND_URL = "https://www.network-chat.store";

const useAuth = (setIsLoggedIn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSocialLogin = useCallback(async (provider) => {
    setIsLoading(true);
    setError(null);

    try {
      window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}`;
    } catch (err) {
      console.error(`${provider} 로그인 에러:`, err);
      setError(`${provider} 로그인에 실패했습니다. 나중에 다시 시도해 주세요.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleKakaoLogin = useCallback(() => {
    handleSocialLogin("kakao");
  }, [handleSocialLogin]);

  const handleNaverLogin = useCallback(() => {
    handleSocialLogin("naver");
  }, [handleSocialLogin]);

  return {
    isLoading,
    error,
    handleKakaoLogin,
    handleNaverLogin,
  };
};

export default useAuth;
