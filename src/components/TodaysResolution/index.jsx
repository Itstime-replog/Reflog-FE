import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";

const Title = styled.div`
  margin-top: 10px;
  padding-top: 2x;
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
  width: 259px;
  margin-top: 12px;
  padding: 12px 10px;
  font-family: "Pretendard";
  font-size: 16px;
  color: #1f2024;
  border: none;
  border-radius: 8px;
  resize: none;
  outline: none;
  overflow: hidden; /* 스크롤 숨기기 */
  background-color: #f0f7ff;

  /*어떻게할지 정한 뒤 수정해야함*/
  ${(props) =>
    props.isTextPresent &&
    css`
      border: none;
      box-shadow: none;
      font-family: "Pretendard", sans-serif;
      font-size: 18px;
      font-weight: 500;
      color: #1f2024;
      text-align: center;
    `}
`;

const TodaysResolution = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞는 높이 설정
    }
  };

  return (
    <div>
      <Title>오늘의 학습 다짐</Title>
      <Textarea
        ref={textareaRef}
        placeholder="오늘의 다짐을 작성해보아요!"
        value={text}
        onChange={handleChange}
        isTextPresent={text.length > 0}
      />
    </div>
  );
};

export default TodaysResolution;
