import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkLoginStatus } from "./utils/auth";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Studyplan from "./pages/Studyplan";
import Retrospect from "./pages/Retrospect";
import Login from "./pages/Auth/Login";
import Community from "./pages/Community";
import CommunityWriteNew from "./components/CommunityWriteNew";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 로그인 상태 확인
    setIsLoggedIn(checkLoginStatus());

    const handleStorageChange = () => {
      setIsLoggedIn(checkLoginStatus());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const [posts, setPosts] = useState([]);
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    // 이미 로컬 스토리지에 저장된 토큰이 있는지 확인
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      console.log("이미 저장된 Access Token:", storedToken);
      return;
    }

    // URL에서 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      console.log("Access Token 추출 완료:", accessToken);
      // 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);

      // URL에서 쿼리 파라미터 제거
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    } else {
      console.warn("Access Token이 URL에 포함되어 있지 않습니다.");
    }
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          element={
            isLoggedIn ? (
              <RootLayout setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/studyplan" element={<Studyplan />} />
          <Route path="/retrospect" element={<Retrospect />} />
          <Route
            path="/community"
            element={<Community posts={posts} addPost={addPost} />}
          />
          <Route
            path="/community/write"
            element={<CommunityWriteNew onPostSubmit={addPost} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
