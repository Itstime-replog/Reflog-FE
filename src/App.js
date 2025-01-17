import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import * as auth from "./utils/auth";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Studyplan from "./pages/Studyplan";
import Retrospect from "./pages/Retrospect";
import Login from "./pages/Auth/Login";
import OAuthCallback from "./pages/Auth/OAuthCallback";
import MyPage from "./pages/MyPage";
import ProfileEdit from "./pages/MyPage/components/ProfileEdit";
import Onboarding from "./pages/Onboarding";

const LoginRoute = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();

  if (location.search.includes("access_token")) {
    return <OAuthCallback setIsLoggedIn={setIsLoggedIn} />;
  }

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Login setIsLoggedIn={setIsLoggedIn} />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const KAKAO_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_KEY) {
      window.Kakao.init(KAKAO_KEY);
    }

    // 온보딩 페이지일 때만 로그인 상태 초기화
    if (location.pathname === "/onboarding") {
      auth.logout();
      setIsLoggedIn(false);
    } else {
      const loginStatus = auth.checkLoginStatus();
      setIsLoggedIn(loginStatus);
    }

    const handleStorageChange = () => {
      setIsLoggedIn(auth.checkLoginStatus());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location.pathname]);

  const handleLogout = () => {
    auth.logout();
    setIsLoggedIn(false);
    return <Navigate to="/onboarding" replace />;
  };

  // OAuth 콜백 URL에서는 리다이렉트하지 않음
  if (
    !isLoggedIn &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/oauth/callback") &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding" replace />} />

      {/* 로그인 및 OAuth 콜백 라우트 */}
      <Route
        path="/login/*"
        element={
          <LoginRoute isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/oauth/callback/*"
        element={<OAuthCallback setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* RootLayout으로 감싸진 라우트들 */}
      <Route
        element={
          <RootLayout setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />
        }
      >
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/studyplan"
          element={
            isLoggedIn ? <Studyplan /> : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/retrospect"
          element={
            isLoggedIn ? <Retrospect /> : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage setIsLoggedIn={setIsLoggedIn} onLogout={handleLogout} />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/mypage/edit"
          element={
            isLoggedIn ? <ProfileEdit /> : <Navigate to="/onboarding" replace />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
