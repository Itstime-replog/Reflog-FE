import { BACKEND_URL } from "./config/axiosConfig";

// 프로필 조회 API
export const getProfile = async (token, memberId) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/v1/mypage/myinfo/profile?memberId=${memberId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};

// 프로필 생성 API
export const createProfile = async (token, memberId, profileData) => {
  try {
    console.log("Creating profile with data:", profileData);
    const response = await fetch(
      `${BACKEND_URL}/api/v1/mypage/myinfo/profile`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId,
          dto: {
            nickname: profileData.nickname,
            email: profileData.email,
            imageUrl: profileData.imageUrl || "",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Profile creation response:", data);
    return data;
  } catch (error) {
    console.error("Profile creation error:", error);
    throw error;
  }
};

// 프로필 수정 API
export const updateProfile = async (token, memberId, profileData) => {
  try {
    console.log("Updating profile with data:", profileData);
    const response = await fetch(
      `${BACKEND_URL}/api/v1/mypage/myinfo/profile`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId,
          dto: {
            nickname: profileData.nickname,
            email: profileData.email,
            imageUrl: profileData.imageUrl || "",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Profile update response:", data);
    return data;
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
};
