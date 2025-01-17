import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { fetchDailyGoal } from "../../apis/dailyGoalApi";

const Title = styled.div`
  margin-top: 10px;
  padding-top: 24px;
  text-align: left;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #1f2024;
`;

const Textarea = styled.textarea`
  width: 300px;
  margin-top: 12px;
  padding: 12px 10px;
  font-family: "Pretendard";
  font-size: 16px;
  color: #1f2024;
  border: 1.16px solid #e1e1e1;
  border-radius: 5.78px;
  resize: none;
  outline: none;
  overflow: hidden; /* 스크롤 숨기기 */

  ${(props) =>
    props.isTextPresent &&
    css`
      border: none;
      box-shadow: none;
      font-family: "Pretendard", sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #1f2024;
      border: 1.16px solid #e1e1e1;
    `}
`;

const TodaysResolution = () => {
  const [text, setText] = useState(""); // 사용자 입력 데이터
  const [error, setError] = useState(null); // 에러 상태
  const textareaRef = useRef(null);
  /*
  const fetchData = async () => {
    try {
      const memberId = localStorage.getItem("memberId");
      const date = new Date().toISOString().split("T")[0]; // 현재 날짜

      if (!memberId) {
        throw new Error("로그인이 필요합니다. Member ID를 찾을 수 없습니다.");
      }

      const data = await fetchDailyGoal(memberId, date);
      console.log("오늘의 목표 데이터:", data);

      if (data.isSuccess) {
        setText(data.result?.goal || ""); // 결과에서 goal 데이터 설정
      } else {
        setError(data.message || "데이터를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("데이터 가져오기 에러:", error.message);
    }
  };*/
  const fetchData = async () => {
    try {
      const hardcodedMemberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 하드코딩된 멤버 ID
      const date = new Date().toISOString().split("T")[0]; // 현재 날짜

      if (!hardcodedMemberId) {
        throw new Error("로그인이 필요합니다. Member ID를 찾을 수 없습니다.");
      }

      const data = await fetchDailyGoal(hardcodedMemberId, date); // 하드코딩된 memberId 사용
      console.log("오늘의 목표 데이터:", data);

      if (data.isSuccess) {
        setText(data.result?.goal || ""); // 결과에서 goal 데이터 설정
      } else {
        setError(data.message || "데이터를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("데이터 가져오기 에러:", error.message);
    }
  };

  // textarea 높이 자동 조정
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞는 높이 설정
    }
  };

  // 컴포넌트 마운트 시 API 호출
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    adjustHeight();
  };

  return (
    <div>
      <Title>오늘의 학습 다짐</Title>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Textarea
          ref={textareaRef}
          placeholder="오늘의 다짐을 작성해보아요!"
          value={text}
          onChange={handleChange}
          isTextPresent={text.length > 0}
        />
      )}
    </div>
  );
};

export default TodaysResolution;
