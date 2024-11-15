import React from "react";
import styled from "styled-components";

const Title = styled.div`
  padding-top: 2px;
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
  height: 24px;
  margin-top: 17px;
  padding: 12px 10px;
  font-family: "Pretendard";
  font-size: 16px;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none; /* 사용자가 크기 조정 못하도록 */
  outline: none;

  &:focus {
    border-color: #4a86f7;
    box-shadow: 0 0 5px rgba(74, 134, 247, 0.3);
  }
`;

const TodaysResolution = () => {
  return (
    <div>
      <Title>오늘의 학습 다짐</Title>
      <Textarea placeholder="오늘의 다짐을 작성해보아요!" />
    </div>
  );
};

export default TodaysResolution;
