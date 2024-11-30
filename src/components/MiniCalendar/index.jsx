import React, { useState } from "react";
import Calendar from "react-calendar";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import beforeIcon from "../../assets/images/before-icon.png";
import afterIcon from "../../assets/images/after-icon.png";

const GlobalStyle = createGlobalStyle`
  .react-calendar__month-view__days__day--neighboringMonth:disabled {
    color: #c0c0c0 !important;
  }
`;

const PageWrapper = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 1px rgba(139, 139, 139, 0.2);
  width: 946.24px;
  height: 869.9px;
  margin: 0 auto; /* 가운데 정렬 */
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우로 배치 */
  align-items: center;
  width: 100%;
  padding: 25px 0 0 20px;
`;

const MiniCalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 220px); /* 4개의 칼럼 */
  grid-template-rows: repeat(3, 235px);
  place-items: center;
  background-color: white;
  margin-top: -20px;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
`;

const PrevButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 36.2px;
  height: 36.2px;
  background-image: url(${beforeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 10px;
`;

const NextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 36.2px;
  height: 36.2px;
  background-image: url(${afterIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 10px;
`;

const CurrentYear = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 26.6058px;
  line-height: 32px;
  text-align: center;
  letter-spacing: 0.206102px;
  color: #494a50;
`;

const StyledMiniCalendar = styled(Calendar)`
  border: none;
  font-family: Pretendard;
  width: 180px;
  height: 100px;
  margin-left: 72px;
  paddung: 0;

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    /* 제목 영역 스타일 */
    .react-calendar__navigation__label {
      font-size: 16px;
      font-weight: bold;
      pointer-events: none; /* 클릭 불가 */
    }

    /* 네비게이션 버튼 스타일 */
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button {
      font-size: 25px; /* 버튼 크기 */
      padding: 0; /* 기본 여백 제거 */
      background: none; /* 버튼 배경 제거 */
      border: none; /* 기본 테두리 제거 */
      color: #494a50; /* 텍스트 색상 */
      cursor: pointer; /* 클릭 시 커서 모양 */
    }

    .react-calendar__navigation__prev-button:hover,
    .react-calendar__navigation__next-button:hover {
      color: #0458ff; /* 호버 시 색상 변경 */
    }

    /* 양옆의 이동 버튼 숨기기 */
    .react-calendar__navigation__prev-button,
    .react-calendar__navigation__next-button,
    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    font-size: 9px;
    font-weight: 500;
    color: #494a4f;
    text-align: center;
    padding-bottom: 8px;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days__day {
    font-size: 12px;
    height: 25px;
    padding: 0;

    abbr {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      margin: 0 auto;
      border-radius: 50%;
      text-decoration: none; /* '일' 제거 */
    }
  }

  /* 선택된 날짜 스타일 제거 */
  .react-calendar__tile--active abbr {
    background: none;
    color: inherit;
  }

  /* 오늘 날짜 스타일 유지 */
  .react-calendar__tile--now abbr {
    background: #0458ff; /* 파란색 동그라미 */
    color: white;
  }

  /* hover 스타일 */
  .react-calendar__tile:enabled:hover abbr {
    background: none;
  }

  /* 기타 동그라미 스타일 제거 */
  .react-calendar__tile--active:not(.react-calendar__tile--now) abbr {
    background: none;
  }

  /* 기본 비활성화된 타일 스타일 제거 */
  .react-calendar__tile:disabled {
    background-color: transparent !important; /* 배경 투명 */
    color: inherit !important; /* 텍스트 색상 상속 */
    pointer-events: none; /* 클릭 불가 */
  }
`;

const MiniCalendar = ({ year, onMonthClick }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevYear = () => {
    setCurrentYear((prevYear) => prevYear - 1); // 이전 년도로 업데이트
  };

  const handleNextYear = () => {
    setCurrentYear((prevYear) => prevYear + 1); // 다음 년도로 업데이트
  };

  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(currentYear, i, 1)
  );

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <HeaderWrapper>
          {/* 년도 네비게이션 */}
          <Navigation>
            <PrevButton onClick={handlePrevYear} />
            <CurrentYear>{currentYear}년</CurrentYear>
            <NextButton onClick={handleNextYear} />
          </Navigation>
        </HeaderWrapper>

        <MiniCalendarWrapper>
          {months.map((month, index) => (
            <StyledMiniCalendar
              key={index}
              value={month}
              view="month"
              onClick={() => onMonthClick(index)} // 미니 캘린더 클릭 시 호출
              formatMonthYear={(locale, date) => `${date.getMonth() + 1}월`} // '6월'처럼 달만 표시
              formatDay={(locale, date) => `${date.getDate()}`} // 숫자만 표시
              tileDisabled={() => false} // 모든 날짜 활성화
              locale="en-US"
            />
          ))}
        </MiniCalendarWrapper>
      </PageWrapper>
    </>
  );
};

export default MiniCalendar;
