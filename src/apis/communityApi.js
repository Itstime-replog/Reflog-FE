/*import axios from "axios";
const BASE_URL = "https://www.network-chat.store";

export const fetchFilteredPosts = async (memberId) => {
  try {
    // URL 생성
    const url = `${BASE_URL}/api/v1/communities?memberId=${memberId}`;

    // API 호출
    const response = await fetch(url);

    // 응답 상태 확인
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Error 404: 해당 회원을 찾을 수 없습니다.";
      } else if (response.status === 500) {
        errorMessage = "Error 500: 서버에 문제가 발생했습니다.";
      }
      throw new Error(errorMessage);
    }

    // 응답 데이터 처리
    const data = await response.json();
    if (data.isSuccess && data.result) {
      return data.result; // 게시물 데이터 반환
    } else {
      throw new Error(data.message || "Unexpected API response");
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error; // 에러를 상위 호출로 전달
  }
};

/*
 * 게시물 수정 API
 * @param {string} communityId - 수정하려는 게시물 ID
 * @param {object} updatedData - 수정된 게시물 데이터
 * @param {string} accessToken - 사용자 인증 토큰
 * @returns {Promise<object>} - API 응답 데이터
 /
export const updateCommunityPost = async (
  communityId,
  updatedData,
  accessToken
) => {
  try {
    console.log("수정 API 호출 시작");

    // communityId를 요청 본문에 추가
    const requestBody = {
      communityId,
      ...updatedData,
    };

    const response = await axios.patch(
      `${BASE_URL}/api/v1/communities`,
      requestBody, // Request Body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("수정 API 응답 데이터:", response.data);
    if (response.data.isSuccess) {
      return response.data;
    } else {
      throw new Error(response.data.message || "게시물 수정 실패");
    }
  } catch (error) {
    console.error("수정 API 호출 중 오류 발생:", error);
    throw error;
  }
};
*/

import axios from "axios";
const BASE_URL = "https://www.network-chat.store";
const memberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 고정된 memberId

export const fetchFilteredPosts = async () => {
  try {
    // URL 생성
    const url = `${BASE_URL}/api/v1/communities?memberId=${memberId}`;

    // API 호출
    const response = await fetch(url);

    // 응답 상태 확인
    if (!response.ok) {
      let errorMessage = `HTTP Error: ${response.status}`;
      if (response.status === 404) {
        errorMessage = "Error 404: 해당 회원을 찾을 수 없습니다.";
      } else if (response.status === 500) {
        errorMessage = "Error 500: 서버에 문제가 발생했습니다.";
      }
      throw new Error(errorMessage);
    }

    // 응답 데이터 처리
    const data = await response.json();
    if (data.isSuccess && data.result) {
      return data.result; // 게시물 데이터 반환
    } else {
      throw new Error(data.message || "Unexpected API response");
    }
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error; // 에러를 상위 호출로 전달
  }
};

/**
 * 게시물 수정 API
 * @param {string} communityId - 수정하려는 게시물 ID
 * @param {object} updatedData - 수정된 게시물 데이터
 * @param {string} accessToken - 사용자 인증 토큰
 * @returns {Promise<object>} - API 응답 데이터
 */
export const updateCommunityPost = async (
  communityId,
  updatedData,
  accessToken
) => {
  try {
    console.log("수정 API 호출 시작");

    // communityId를 요청 본문에 추가
    const requestBody = {
      communityId,
      ...updatedData,
    };

    const response = await axios.patch(
      `${BASE_URL}/api/v1/communities`,
      requestBody, // Request Body
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("수정 API 응답 데이터:", response.data);
    if (response.data.isSuccess) {
      return response.data;
    } else {
      throw new Error(response.data.message || "게시물 수정 실패");
    }
  } catch (error) {
    console.error("수정 API 호출 중 오류 발생:", error);
    throw error;
  }
};
