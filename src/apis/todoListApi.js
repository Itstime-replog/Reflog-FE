/*import axios from "axios";

const BASE_URL = "https://www.network-chat.store";

/**
 * 특정 회원의 특정 날짜에 해당하는 투두리스트 조회 API
 * @param {string} memberId
 * @param {string} date (YYYY-MM-DD)
 * @returns {object} API 응답 데이터
 /
export const fetchTodoList = async (memberId, date) => {
  try {
    // GET /api/v1/todo/todolist?memberId={memberId}&date={date}
    const response = await axios.get(`${BASE_URL}/api/v1/todo/todolist`, {
      params: { memberId, date },
    });

    // 2xx 범위인 경우 성공으로 간주
    if (response.status === 200) {
      // {
      //   "isSuccess": true,
      //   "code": "string",
      //   "message": "string",
      //   "result": {}  // 실제 투두리스트 데이터
      // }
      return response.data;
    }
  } catch (error) {
    // HTTP 상태 코드에 따라 분기 처리
    if (error.response) {
      if (error.response.status === 400) {
        console.error("400 에러: 해당 회원 또는 투두리스트를 찾을 수 없음");
        // 필요하다면 에러 메시지 등을 반환/처리
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러");
        // 필요하다면 에러 메시지 등을 반환/처리
      }
    } else {
      console.error("네트워크 오류 혹은 CORS 문제 등으로 요청 실패", error);
    }
    // 에러를 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 함
    throw error;
  }
};
*/
import axios from "axios";

const BASE_URL = "https://www.network-chat.store";
const memberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 고정된 Member ID

/**
 * 특정 회원의 특정 날짜에 해당하는 투두리스트 조회 API
 * @param {string} date (YYYY-MM-DD)
 * @returns {object} API 응답 데이터
 * @returns {object} API 응답 데이터
 */
export const fetchTodoList = async (date) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/todo/todolist`, {
      params: { memberId, date },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    console.log("서버 응답 데이터:", response.data);

    if (response.status === 200 && Array.isArray(response.data.result)) {
      return response.data.result.map((todo) => ({
        todolistId: todo.todolistId, // 정확한 필드 매핑
        content: todo.content,
        status: todo.status,
      }));
    }

    return [];
  } catch (error) {
    console.error("fetchTodoList 에러:", error.message);
    throw error;
  }
};

export const createTodo = async (content, status = false) => {
  try {
    // 로컬 스토리지에서 토큰 가져오기
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error(
        "유효한 인증 토큰이 없습니다. 로그인 후 다시 시도해주세요."
      );
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/todo/todolist`,
      {
        memberId,
        content,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
        },
      }
    );

    if (response.status === 200) {
      console.log("투두리스트 생성 성공:", response.data);
      console.log("투두 생성 요청 데이터:", { memberId, content, status });
      console.log("투두 생성 응답 데이터:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("404 에러: 해당 회원을 찾을 수 없음");
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러", error.response.data);
      }
    } else {
      console.error("네트워크 오류 혹은 기타 에러:", error.message);
    }
    throw error;
  }
};

/**
 * 특정 투두리스트 항목 체크 API
 * @param {string} todolistId 체크할 투두리스트의 ID
 * @returns {object} API 응답 데이터
 */
export const checkTodo = async (todolistId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("AccessToken이 없습니다. 로그인 후 다시 시도하세요.");
    }

    const response = await axios.post(
      `${BASE_URL}/api/v1/todo/todolist/check`,
      { todolistId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
        },
      }
    );
    console.log("체크 API 응답 데이터:", response.data);

    if (response.status === 200) {
      console.log("투두리스트 체크 성공:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("404 에러: 해당 투두리스트를 찾을 수 없음");
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러", error.response.data);
      }
    } else {
      console.error("네트워크 오류 혹은 기타 에러:", error.message);
    }
    throw error;
  }
};

/**
 * 특정 투두리스트 항목 삭제 API
 * @param {string} todolistId 삭제할 투두리스트의 ID
 * @returns {object} API 응답 데이터
 */
export const deleteTodo = async (todolistId) => {
  try {
    // 로컬 스토리지에서 AccessToken 가져오기
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("AccessToken이 없습니다. 로그인 후 다시 시도하세요.");
    }

    const response = await axios.delete(
      `${BASE_URL}/api/v1/todo/todolist/${todolistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Authorization 헤더 추가
        },
      }
    );

    if (response.status === 200) {
      console.log("투두리스트 삭제 성공:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error("404 에러: 해당 투두리스트를 찾을 수 없음");
      } else if (error.response.status === 500) {
        console.error("500 에러: 서버 에러", error.response.data);
      }
    } else {
      console.error("네트워크 오류 혹은 기타 에러:", error.message);
    }
    throw error;
  }
};
