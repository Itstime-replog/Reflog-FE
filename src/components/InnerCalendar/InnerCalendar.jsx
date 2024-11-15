import React from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

const CalendarWrapper = styled.div`
  position: fixed;
  top: 73%;
  left: 57%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  padding: 10px;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: Pretendard;

  .react-calendar__navigation {
    margin-bottom: 16px;
    button {
      font-family: Pretendard;
      font-size: 16px;
      font-weight: 500;
      min-width: 36px;
      background: none;
      border: none;
      &:hover {
        background: none;
      }
      &:enabled:focus {
        background: none;
      }
    }
  }

  .react-calendar__navigation__label {
    font-size: 16px;
    font-weight: 600;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none; /* 2개월 이동 버튼 숨기기 */
  }

  .react-calendar__month-view__weekdays__weekday {
    font-size: 14px;
    font-weight: 500;
    color: #494a4f;
    text-align: center;
    padding-bottom: 8px;

    abbr {
      text-decoration: none;
      cursor: default;
    }
  }

  .react-calendar__month-view__days__day {
    font-size: 14px;
    font-family: Pretendard;
    height: 40px;
    padding: 0;
    margin: 4px 0;

    abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      margin: 0 auto;
      border-radius: 50%;
      color: #494a4f; /* 기본 텍스트 색상 */
    }

    &.disabled-day abbr {
      color: #d3d3d3; /* 회색 텍스트 */
    }
  }

  .react-calendar__month-view__days {
    padding-bottom: 8px;
  }

  .react-calendar__tile--now,
  .react-calendar__tile--now.react-calendar__tile--active {
    background: none;
    abbr {
      background: #0458ff;
      color: white;
    }
  }

  .react-calendar__tile--active {
    background: none;
    color: black;
    abbr {
      background: #fec300;
      color: white;
    }
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    abbr {
      background: #f5f5f5;
    }
    background: none;
  }

  .react-calendar__month-view__days__day {
    position: relative;
    margin: 0px 0;
  }

  .react-calendar__month-view__days > :nth-last-child(-n + 7) {
    margin-bottom: 1px;
  }
`;

const InnerCalendar = ({ selectedDate, onDateChange, onClose }) => {
  const today = new Date(); // 오늘 날짜

  const handleDateChange = (date) => {
    onDateChange(date); // 날짜 변경을 부모 컴포넌트에 전달
    onClose(); // 캘린더 닫기
  };

  const isBeforeToday = (date) => {
    return date < today.setHours(0, 0, 0, 0); // 오늘 날짜 이전인지 확인
  };

  return (
    <CalendarWrapper>
      <StyledCalendar
        locale="en-US"
        value={selectedDate}
        onChange={handleDateChange} // 날짜 변경 시 실행
        tileDisabled={({ date }) => isBeforeToday(date)} // 오늘 이전 날짜 비활성화
        tileClassName={({ date }) =>
          isBeforeToday(date) ? "disabled-day" : ""
        } // 오늘 이전 날짜 텍스트 색상 변경
        formatMonthYear={(locale, date) =>
          `${date.getFullYear()}년 ${date.getMonth() + 1}월`
        }
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 3)
        }
        formatDay={(locale, date) => date.getDate().toString()} // 숫자만 표시
      />
    </CalendarWrapper>
  );
};

export default InnerCalendar;
