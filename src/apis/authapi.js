import { BACKEND_URL } from "./config/axiosConfig";

// HTTPS URL 보장을 위한 헬퍼 함수
const ensureHttpsUrl = (url) => {
  return url.replace("http://", "https://");
};

// 로그아웃 API
export const logoutAPI = async (token) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const baseUrl = ensureHttpsUrl(BACKEND_URL);
    const encodedToken = encodeURIComponent(token);

    const response = await fetch(
      `${baseUrl}/api/v1/logout?token=${encodedToken}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`Logout failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// 회원탈퇴 API
export const deleteAccount = async (token) => {
  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const baseUrl = ensureHttpsUrl(BACKEND_URL);
    const encodedToken = encodeURIComponent(token);

    const response = await fetch(
      `${baseUrl}/api/v1/delete?token=${encodedToken}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Account deletion failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Account deletion error:", error);
    throw error;
  }
};
