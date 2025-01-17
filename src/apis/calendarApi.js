/*import axios from "axios";

const BASE_URL = "https://www.network-chat.store";

export const fetchSchedules = async (memberId, month) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 화면으로 이동합니다.");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    // JWT 디코딩 및 토큰 만료 확인
    const decoded = JSON.parse(atob(accessToken.split(".")[1])); // payload 디코딩
    if (decoded.exp * 1000 < Date.now()) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    console.log("사용 중인 Access Token:", accessToken);
    console.log("사용 중인 Member ID:", memberId);

    const response = await axios.get(`${BASE_URL}/api/v1/plan/schedule`, {
      params: { memberId, month },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { isSuccess, result, message } = response.data;

    if (isSuccess) {
      return result; // 성공적으로 데이터를 반환
    } else {
      console.error(
        "API 호출 실패: ",
        message || "알 수 없는 오류가 발생했습니다."
      );
      return {};
    }
  } catch (error) {
    console.error("서버 에러 발생: ", error.response?.data || error.message);
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          alert("인증이 필요합니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
          break;
        case 500:
          alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    } else {
      alert("네트워크 연결에 문제가 있습니다.");
    }
  }
};
*/

import axios from "axios";

const BASE_URL = "https://www.network-chat.store";
const memberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 고정된 memberId

export const fetchSchedules = async (month) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 화면으로 이동합니다.");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    // JWT 디코딩 및 토큰 만료 확인
    const decoded = JSON.parse(atob(accessToken.split(".")[1])); // payload 디코딩
    if (decoded.exp * 1000 < Date.now()) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    console.log("사용 중인 Access Token:", accessToken);
    console.log("사용 중인 Member ID:", memberId);

    const response = await axios.get(`${BASE_URL}/api/v1/plan/schedule`, {
      params: { memberId: memberId, month },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { isSuccess, result, message } = response.data;

    if (isSuccess) {
      return result; // 성공적으로 데이터를 반환
    } else {
      console.error(
        "API 호출 실패: ",
        message || "알 수 없는 오류가 발생했습니다."
      );
      return {};
    }
  } catch (error) {
    console.error("서버 에러 발생: ", error.response?.data || error.message);
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          alert("인증이 필요합니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
          break;
        case 500:
          alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    } else {
      alert("네트워크 연결에 문제가 있습니다.");
    }
  }
};

export const deleteSchedule = async (scheduleId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 화면으로 이동합니다.");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    const response = await axios.delete(
      `${BASE_URL}/api/v1/plan/schedule/${scheduleId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { isSuccess, message } = response.data;

    if (isSuccess) {
      console.log("일정 삭제 성공:", message);
      return true;
    } else {
      console.error(
        "일정 삭제 실패:",
        message || "알 수 없는 오류가 발생했습니다."
      );
      return false;
    }
  } catch (error) {
    console.error("서버 에러 발생: ", error.response?.data || error.message);
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 404:
          alert("삭제하려는 일정을 찾을 수 없습니다.");
          break;
        case 500:
          alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
          break;
        default:
          alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    } else {
      alert("네트워크 연결에 문제가 있습니다.");
    }
    return false;
  }
};
