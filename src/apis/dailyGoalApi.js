/*import axios from "axios";

const BASE_URL = "https://www.network-chat.store";
export const fetchDailyGoal = async (memberId, date) => {
  if (!memberId || !date) {
    throw new Error("memberId와 date는 필수 파라미터입니다.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/learn/dailyGoal`, {
      params: { memberId, date },
    });

    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Daily Goal API 요청에 실패했습니다."
    );
  }
};
*/
import axios from "axios";

const BASE_URL = "https://www.network-chat.store";
const memberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 고정된 Member ID

export const fetchDailyGoal = async (date) => {
  if (!date) {
    throw new Error("date는 필수 파라미터입니다.");
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/learn/dailyGoal`, {
      params: { memberId: memberId, date },
    });

    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Daily Goal API 요청에 실패했습니다."
    );
  }
};
