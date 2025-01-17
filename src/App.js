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
import Analysis from "./pages/Analysis";
import Login from "./pages/Auth/Login";
import OAuthCallback from "./pages/Auth/OAuthCallback";
import MyPage from "./pages/MyPage";
import ProfileEdit from "./pages/MyPage/components/ProfileEdit";
import Onboarding from "./pages/Onboarding";
import Community from "./pages/Community";
import CommunityWriteNew from "./components/CommunityWriteNew";

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
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    const KAKAO_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_KEY) {
      window.Kakao.init(KAKAO_KEY);
    }

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
          path="/analysis"
          element={
            isLoggedIn ? <Analysis /> : <Navigate to="/onboarding" replace />
          }
        />
        <Route
          path="/community"
          element={
            isLoggedIn ? (
              <Community posts={posts} addPost={addPost} />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/community/write"
          element={
            isLoggedIn ? (
              <CommunityWriteNew onPostSubmit={addPost} />
            ) : (
              <Navigate to="/onboarding" replace />
            )
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
