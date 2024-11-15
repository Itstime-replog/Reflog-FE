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

const TimeSelect = ({ value = "00:00 AM", onChange }) => {
  const [time, setTime] = useState(value.split(" ")[0]); // "00:00"
  const [period, setPeriod] = useState(value.split(" ")[1]); // "AM" or "PM"

  const handleTimeChange = (e) => {
    const newTime = e.target.value;

    // 시간/분 검증 로직
    const [hours, minutes] = newTime.split(":");

    if (
      /^\d{0,2}:\d{0,2}$/.test(newTime) && // 형식 검증
      (hours === undefined || (Number(hours) >= 0 && Number(hours) <= 24)) && // 0~24 시간 제한
      (minutes === undefined || (Number(minutes) >= 0 && Number(minutes) <= 59)) // 0~59 분 제한
    ) {
      setTime(newTime);

      // 시간에 따라 AM/PM 자동 지정
      const numericHours = Number(hours);
      const newPeriod = numericHours >= 12 && numericHours <= 24 ? "PM" : "AM";
      setPeriod(newPeriod);

      // 상위 컴포넌트로 값 전달
      onChange(`${newTime} ${newPeriod}`);
    }
  };

  return (
    <TimeInputWrapper>
      <TimeInput
        type="text"
        value={time}
        onChange={handleTimeChange}
        placeholder="00:00"
      />
      <AmPmDisplay>{period}</AmPmDisplay>
    </TimeInputWrapper>
  );
};

export default TimeSelect;
