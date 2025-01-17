import React, { useState } from "react";
import styled from "styled-components";

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const TimeInput = styled.input`
  width: 45px;
  text-align: center;
  padding: 5px;
  border: none;
  background: transparent;
  border-radius: 5px;
  font-size: 14px;
  font-family: "Pretendard", sans-serif;

  &:focus {
    outline: none;
    background-color: #e1e1e1;
  }
`;

const AmPmDisplay = styled.span`
  margin-left: 4px;
  font-size: 13px;
  font-family: "Pretendard", sans-serif;
  color: #494a4f;
`;

const TimeSelect = ({ value = "00:00 오전", onChange }) => {
  const [time, setTime] = useState(value.split(" ")[0]); // "00:00"
  const [period, setPeriod] = useState(value.split(" ")[1] || "오전"); // 기본: "오전"

  // 시간 변경 핸들러
  const handleTimeChange = (e) => {
    const newTime = e.target.value;

    // 시간/분 검증 로직
    const [hours, minutes] = newTime.split(":");

    if (
      /^\d{1,2}:\d{2}$/.test(newTime) && // 형식 검증
      Number(hours) >= 0 &&
      Number(hours) <= 12 && // 0~12 시간 제한
      Number(minutes) >= 0 &&
      Number(minutes) <= 59 // 0~59 분 제한
    ) {
      setTime(newTime);

      // 상위 컴포넌트로 값 전달
      onChange(`${newTime} ${period}`);
    }
  };

  // 오전/오후 변경 핸들러
  const togglePeriod = () => {
    const newPeriod = period === "오전" ? "오후" : "오전";
    setPeriod(newPeriod);

    // 상위 컴포넌트로 값 전달
    onChange(`${time} ${newPeriod}`);
  };

  return (
    <TimeInputWrapper>
      <TimeInput
        type="text"
        value={time}
        onChange={handleTimeChange}
        placeholder="00:00"
      />
      <AmPmDisplay onClick={togglePeriod}>{period}</AmPmDisplay>
    </TimeInputWrapper>
  );
};

export default TimeSelect;
