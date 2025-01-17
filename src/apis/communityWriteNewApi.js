/*import axios from "axios";

const BASE_URL = "https://www.network-chat.store";

/**
 * 커뮤니티 게시글 생성 API
 * @param {object} postData - 작성할 게시물 데이터
 * @returns {Promise<object>} - API 응답 데이터
 /
export const createCommunityPost = async (postData) => {
  try {
    // 로컬 스토리지에서 Access Token 가져오기
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access Token이 없습니다. 로그인이 필요합니다.");
    }

    console.log("게시글 작성 요청 데이터:", JSON.stringify(postData, null, 2));
    console.log("AccessToken:", accessToken);

    // API 호출
    const response = await axios.post(`${BASE_URL}/communities`, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("게시글 작성 성공:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 에러 상태 코드:", error.response.status);
      console.error("서버 응답 데이터:", error.response.data);

      if (error.response.status === 404) {
        console.warn("404 에러: 요청된 리소스를 찾을 수 없습니다.");
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러 발생.");
      }
    } else {
      console.error("요청 생성 중 에러:", error.message);
    }
    throw error;
  }
};

// 요청 데이터 예시
const postData = {
  memberId: localStorage.getItem("memberId"), // 로컬 스토리지에서 가져오기
  title: "",
  content: "",
  postTypes: [""],
  learningTypes: [""],
  fileUrls: [""], // 업로드된 파일 URL
};

// API 호출
createCommunityPost(postData)
  .then((response) => console.log("게시글 생성 성공:", response))
  .catch((error) => console.error("게시글 작성 중 에러:", error));
*/
import axios from "axios";

const BASE_URL = "https://www.network-chat.store";
const memberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 고정된 Member ID

/**
 * 커뮤니티 게시글 생성 API
 * @param {object} postData - 작성할 게시물 데이터
 * @returns {Promise<object>} - API 응답 데이터
 */
export const createCommunityPost = async (postData) => {
  try {
    // 로컬 스토리지에서 Access Token 가져오기
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access Token이 없습니다. 로그인이 필요합니다.");
    }

    console.log("게시글 작성 요청 데이터:", JSON.stringify(postData, null, 2));
    console.log("AccessToken:", accessToken);

    // API 호출
    const response = await axios.post(
      `${BASE_URL}/api/v1/communities`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("게시글 작성 성공:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 에러 상태 코드:", error.response.status);
      console.error("서버 응답 데이터:", error.response.data);

      if (error.response.status === 404) {
        console.warn("404 에러: 요청된 리소스를 찾을 수 없습니다.");
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러 발생.");
      }
    } else {
      console.error("요청 생성 중 에러:", error.message);
    }
    throw error;
  }
};

// 요청 데이터 예시
const postData = {
  memberId: memberId, // 고정된 Member ID 사용
  title: "",
  content: "",
  postTypes: [""],
  learningTypes: [""],
  fileUrls: [""], // 업로드된 파일 URL
};

// API 호출
createCommunityPost(postData)
  .then((response) => console.log("게시글 생성 성공:", response))
  .catch((error) => console.error("게시글 작성 중 에러:", error));
