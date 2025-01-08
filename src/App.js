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
          <Route path="/community" element={<Community />} />
          <Route path="/community/write" element={<CommunityWriteNew />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
