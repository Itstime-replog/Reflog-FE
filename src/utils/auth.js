export const setLoginToken = ({
  accessToken,
  refreshToken,
  name,
  memberId,
  profile_image,
}) => {
  if (!accessToken) {
    console.error("Access token is required");
    return;
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("isLoggedIn", "true");

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  if (name) {
    localStorage.setItem("userName", name);
  }

  if (memberId) {
    localStorage.setItem("memberId", memberId);
    console.log("MemberId stored:", memberId);
  } else {
    console.warn("No memberId provided to setLoginToken");
  }

  if (profile_image) {
    localStorage.setItem("profile_image", profile_image);
    console.log("Profile image stored:", profile_image);
  }
};

export const checkLoginStatus = () => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return !!token && isLoggedIn === "true";
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const getUserName = () => {
  return localStorage.getItem("userName");
};

export const getMemberId = () => {
  const memberId = localStorage.getItem("memberId");
  console.log("Retrieved memberId:", memberId);
  return memberId;
};

export const getProfileImage = () => {
  const profileImage = localStorage.getItem("profile_image");
  console.log("Retrieved profile image:", profileImage);
  return profileImage;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("memberId");
  localStorage.removeItem("profile_image");
  localStorage.removeItem("isLoggedIn");
};

export const removeLoginToken = logout;
