// 로그인 상태를 확인하는 함수
export const checkLoginStatus = () => {
  // localStorage에서 accessToken을 가져와서 존재 여부를 확인
  const token = localStorage.getItem("accessToken");
  return !!token; // token이 존재하면 true, 없으면 false 반환
};

// 로그인 토큰을 저장하는 함수
export const setLoginToken = (token) => {
  if (!token) {
    console.error("Token is required");
    return;
  }
  // localStorage에 accessToken 저장
  localStorage.setItem("accessToken", token);
};

// 로그인 토큰을 제거하는 함수 (로그아웃 시 사용)
export const removeLoginToken = () => {
  // localStorage에서 accessToken 제거
  localStorage.removeItem("accessToken");
};

// 토큰이 만료되었는지 확인하는 함수
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    // JWT 토큰의 payload 부분을 디코딩
    const payload = JSON.parse(atob(token.split(".")[1]));
    // 현재 시간이 만료 시간을 지났는지 확인
    return payload.exp < Date.now() / 1000;
  } catch (error) {
    console.error("Token validation error:", error);
    return true;
  }
};

// 현재 저장된 토큰을 가져오는 함수
export const getToken = () => {
  return localStorage.getItem("accessToken");
};

// 토큰의 유효성을 검사하는 함수
export const validateToken = () => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    removeLoginToken();
    return false;
  }
  return true;
};
