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

  const memberId = 1; // 예제 사용자 ID
  const date = "2024-12-01"; // 예제 날짜

  const fetchData = async () => {
    try {
      const data = await fetchDailyGoal(memberId, date);
      if (data.isSuccess) {
        setText(data.result?.goal || ""); // 결과에서 goal 데이터 설정
        adjustHeight();
      } else {
        setError(data.message || "데이터를 가져올 수 없습니다.");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("해당 회원 또는 학습목표를 찾을 수 없습니다.");
      } else if (err.response?.status === 500) {
        setError("서버 에러가 발생했습니다.");
      } else {
        setError(err.message || "알 수 없는 에러가 발생했습니다.");
      }
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
