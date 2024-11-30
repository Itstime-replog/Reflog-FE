import { useState, useCallback } from 'react';
import { setLoginToken, removeLoginToken } from '../utils/auth';

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleKakaoLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 개발용 임시 토큰 - 간단한 문자열로 대체
      const tempToken = 'dev_token_' + Date.now();
      
      setLoginToken(tempToken);
      return true;
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNaverLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      throw new Error('네이버 로그인은 현재 준비중입니다.');
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeLoginToken();
  }, []);

  return {
    isLoading,
    error,
    handleKakaoLogin,
    handleNaverLogin,
    logout
  };
};

export default useAuth;