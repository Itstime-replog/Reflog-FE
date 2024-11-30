import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkLoginStatus } from '../../utils/auth';

// 보호된 라우트를 처리하는 컴포넌트
// 인증되지 않은 사용자의 접근을 차단하고 로그인 페이지로 리다이렉트
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = checkLoginStatus();

  // 로그인되지 않은 경우 현재 시도한 경로를 state로 전달하여 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 로그인된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;