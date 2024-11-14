import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .react-calendar {
    border: none !important;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: transparent !important;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: transparent !important;
  }

  .react-calendar__tile--now {
    background: transparent !important;
  }

  .react-calendar__tile--active {
    background: transparent !important;
    color: inherit !important;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 29px 25px;
  border-radius: 15px;
`;

const StyledCalendar = styled(Calendar)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 1px rgba(139, 139, 139, 0.2);
  width: 818px;
  height: 752px;

  .react-calendar__navigation {
    display: flex;
    justify-content: left;
    align-items: center;
    padding-right: 582px;
    margin-top: 20px;
    margin-left: 14px;
  }

  /* 네비게이션 라벨 */
  .react-calendar__navigation__label {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 27px;
    text-align: center;
    letter-spacing: 0.178169px;
    color: #494a50;
  }

  /* 년도 조절 버튼 숨기기 */
  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  /* 월 조절 버튼 크기 조정 */
  .react-calendar__navigation__prev-button,
  .react-calendar__navigation__next-button {
    font-size: 25px; /* 아이콘 크기 조정 */
    padding: 0;
  }

  .react-calendar__tile {
    width: 116.86px !important;
    height: 130.04px !important;
    font-size: 1rem;
    color: #333;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    position: relative;
    padding: 0;
  }

  .react-calendar__tile abbr {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.875rem;
  }

  /* 지난달 및 다음달 날짜 */
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #d6d6d6 !important;
  }

  /* 주간 헤더 */
  .react-calendar__month-view__weekdays__weekday {
    font-weight: bold;
    font-size: 0.875rem;
    color: #888;
  }

  /* 요일 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.178169px;
    color: #494a50;
  }

  /* 오늘 날짜 동그라미 */
  .react-calendar__tile--now abbr {
    background-color: #1087ff; /* 노란색 */
    color: white;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.875rem;
  }

  /* 오늘이 아닌 선택된 날짜 동그라미 */
  .react-calendar__tile--active:not(.react-calendar__tile--now) abbr {
    background-color: #ffc300; /* 파란색 */
    color: white;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.875rem;
  }
`;

// 선택한 날짜 텍스트
const SelectedDate = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
`;

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => setDate(date);

  return (
    <>
      <GlobalStyle />
      <CalendarContainer>
        <StyledCalendar
          onChange={onChange}
          value={date}
          locale="en-US"
          formatDay={(locale, date) => date.getDate().toString()}
          formatMonthYear={(locale, date) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`
          }
        />
      </CalendarContainer>
    </>
  );
};

export default CalendarComponent;
