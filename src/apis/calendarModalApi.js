import axios from "axios";
const BASE_URL = "https://www.network-chat.store";

// 일정 등록 API
export const createSchedule = async (accessToken, scheduleData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/plan/schedule`, // 백틱(``)으로 템플릿 문자열 작성
      scheduleData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // AccessToken 추가
        },
      }
    );
    return response.data; // 성공한 응답 데이터 반환
  } catch (error) {
    console.error("Failed to create schedule:", error);
    throw error; // 호출한 쪽에서 에러를 처리하도록 다시 던짐
  }
};
