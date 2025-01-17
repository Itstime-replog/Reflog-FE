import axios from "axios";

const BASE_URL = "https://www.network-chat.store";

/**
 * 게시물 삭제 API
 * @param {string} communityId - 삭제하려는 게시물 ID
 * @param {string} accessToken - 사용자 인증을 위한 토큰
 * @returns {Promise<object>} - API 응답 데이터
 */
export const deleteCommunityPost = async (communityId, accessToken) => {
  try {
    console.log("삭제 API 호출 시작");
    console.log("communityId:", communityId);
    console.log("accessToken:", accessToken);

    const response = await axios.delete(`${BASE_URL}/api/v1/communities`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        communityId, // Query Parameter로 전달
      },
    });

    console.log("삭제 API 응답 데이터:", response.data);

    // 응답 상태에 따른 처리
    if (response.data.isSuccess) {
      console.log("게시물 삭제 성공:", response.data.message);
      return response.data; // 성공 응답 데이터 반환
    } else {
      console.warn("API 응답 실패:", response.data.message);
      throw new Error(response.data.message || "게시물 삭제 실패");
    }
  } catch (error) {
    // 에러 상태에 따른 처리
    if (error.response) {
      const { status, data } = error.response;

      if (status === 404) {
        console.error("Error 404: 해당 회원 또는 게시물을 찾을 수 없음.");
        throw new Error(data.message || "해당 게시물을 찾을 수 없습니다.");
      } else if (status === 500) {
        console.error("Error 500: 서버 에러 발생.");
        throw new Error(data.message || "서버 에러가 발생했습니다.");
      } else {
        console.error(`Error ${status}: ${data.message}`);
        throw new Error(data.message || `Unexpected error: ${status}`);
      }
    } else {
      console.error("네트워크 또는 기타 오류:", error.message);
      throw error;
    }
  }
};
