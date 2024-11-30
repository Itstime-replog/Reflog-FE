import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

const CalendarWrapper = styled.div`
  position: absolute; /* 위치를 동적으로 설정할 수 있도록 변경 */
  top: ${({ top }) => `${top}px`}; /* props로 top 전달 */
  left: ${({ left }) => `${left}px`}; /* props로 left 전달 */
  transform: translate(-50%, -50%);
  background: #fbfbfb;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  margin: 10px;
  width: 262.04px;
  height: 221px;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  font-family: Pretendard;
  background: none;

  .react-calendar__navigation {
    margin-bottom: -5px;
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
    font-size: 15px;
    font-weight: 600;
  }

  .react-calendar__navigation button {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.0876808px;
    color: #494a50;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none; /* 2개월 이동 버튼 숨기기 */
  }

  .react-calendar__tile:disabled {
    background: none;
  }

  .react-calendar__month-view__weekdays {
    margin-left: 3px;
    margin-right: 3px;
  }

  .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    padding-bottom: 5px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    letter-spacing: 0.187502px;
    color: #494a50;

    abbr {
      text-decoration: none;
      cursor: default;
    }
  }

  .react-calendar__month-view__days {
    margin-left: px;
    margin-right: 3px;
    padding-bottom: 6px;
  }

  .react-calendar__month-view__days__day {
    font-size: 14px;
    font-family: Pretendard;
    height: 28px;
    padding: 0;
    margin-left: 2px;
    margin-right: 2px;

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
  }

  .react-calendar__tile--active {
    background: none;
    color: black;
    abbr {
      background: #fec300;
      color: white;
      width: 23.15px;
      height: 23.15px;
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
    margin: 0px;
  }

  .react-calendar__month-view__days > :nth-last-child(-n + 7) {
    margin-bottom: 0px;
  }

  .react-calendar__tile.hidden-day {
    visibility: hidden; /* 날짜 숨김 */
  }
`;

const InnerCalendar = ({
  selectedDate,
  onDateChange,
  onClose,
  innerCalendarPosition, // 부모 컴포넌트에서 전달받는 위치 값
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 현재 달 상태

  const handleDateChange = (date) => {
    onDateChange(date); // 날짜 변경을 부모 컴포넌트에 전달
    onClose(); // 캘린더 닫기
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate.getMonth()); // 현재 보이는 달 업데이트
  };

  const isNotCurrentMonth = (date) => {
    return date.getMonth() !== currentMonth; // 현재 보이는 달이 아닌 날짜
  };

  return (
    innerCalendarPosition && ( // 위치가 있을 때만 렌더링
      <CalendarWrapper
        top={innerCalendarPosition.top + 85} // 동적 top 위치
        left={innerCalendarPosition.left + 183} // 동적 left 위치>
      >
        <StyledCalendar
          locale="en-US"
          value={selectedDate}
          onChange={handleDateChange} // 날짜 변경 시 실행
          onActiveStartDateChange={handleActiveStartDateChange} // 현재 보이는 달 변경 시 실행
          tileDisabled={({ date }) => isNotCurrentMonth(date)} // 현재 달이 아닌 날짜 비활성화
          tileClassName={({ date }) =>
            isNotCurrentMonth(date) ? "hidden-day" : ""
          } // 현재 달이 아닌 날짜 숨김
          formatMonthYear={(locale, date) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`
          }
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 3)
          }
          formatDay={(locale, date) => date.getDate().toString()} // 숫자만 표시
        />
      </CalendarWrapper>
    )
  );
};

export default InnerCalendar;
