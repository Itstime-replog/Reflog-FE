// src/apis/dailyGoalApi.js
import axios from "axios";

// Daily Goal API 호출 함수
export const fetchDailyGoal = async (memberId, date) => {
  if (!memberId || !date) {
    throw new Error("memberId와 date는 필수 파라미터입니다.");
  }

  try {
    const response = await axios.get(
      "http://54.180.61.91:8080/api/v1/learn/dailyGoal",
      {
        params: {
          memberId, // API에서 요구하는 memberId
          date, // API에서 요구하는 date
        },
      }
    );
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    // 에러 처리
    throw new Error(
      error.response?.data?.message || "Daily Goal API 요청에 실패했습니다."
    );
  }
};
