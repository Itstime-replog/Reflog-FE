import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled, { createGlobalStyle } from "styled-components";
import CalendarModal from "../CalendarModal";

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

const NavigationWrapper = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 25.45px;
  right: 23.14px;
  display: flex;
  gap: 3px;
  box-sizing: border-box;
  width: 172.36px;
  height: 33.55px;
  border: 1.15678px solid #e1e1e1;
  border-radius: 5.78388px;
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.3516px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.206102px;
  color: #494a50;
  width: 82.13px;
  height: 33.55px;
  margin: 2px;
`;

const StyledCalendar = styled(Calendar)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 1px rgba(139, 139, 139, 0.2);
  width: 946.24px;
  height: 869.9px;

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
    font-size: 26.6058px;
    line-height: 32px;
    text-align: center;
    letter-spacing: 0.206102px;
    color: #494a50;
    pointer-events: none; /* 클릭 이벤트 비활성화 */
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
    height: 151.7px !important;
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
    background-color: #0059ff;
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

const EventText = styled.div`
  font-size: 10px;
  color: #494a4f;
  text-align: left;
  padding: 5px;
  word-wrap: break-word;
`;

const EventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
`;

const EventDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #1087ff;
  border-radius: 50%;
`;

const EventTextWithTime = styled.div`
  font-size: 10px;
  color: #494a4f;
  text-align: left;
  flex-grow: 1;
  padding: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventTime = styled.div`
  font-size: 10px;
  color: #888;
  margin-left: 5px;
`;

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month"); // 현재 뷰 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const [modalPosition, setModalPosition] = useState(null); // 모달 위치 상태
  const [events, setEvents] = useState({}); // 날짜별 일정 상태

  const onChange = (date, event) => {
    setDate(date);
    setSelectedDate(date); // 선택한 날짜 설정

    // 클릭한 날짜 타일의 위치 계산
    const tileElement = event.target.closest(".react-calendar__tile");
    if (tileElement) {
      const rect = tileElement.getBoundingClientRect();
      setModalPosition({
        top: rect.top + window.scrollY - 20, // 타일의 상단 위치
        left: rect.right + window.scrollX + 1, // 타일의 오른쪽 옆으로 10px
      });
    }

    setShowModal(true); // 모달 표시
  };

  // 일정 추가 핸들러
  const handleAddEvent = (text, times) => {
    const formattedDate = selectedDate.toDateString(); // 날짜를 문자열로 변환
    setEvents((prev) => ({
      ...prev,
      [formattedDate]: {
        text: text.trim(),
        startTime: times.startTime.trim(), // 시작 시간 저장
        endTime: times.endTime.trim(), // 종료 시간 저장
      },
    }));
    setShowModal(false); // 모달 닫기
  };

  // 일정 삭제 핸들러
  const handleRemoveEvent = () => {
    const formattedDate = selectedDate.toDateString();
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      delete updatedEvents[formattedDate]; // 일정 삭제
      return updatedEvents;
    });
    setShowModal(false); // 모달 닫기
  };

  return (
    <>
      <GlobalStyle />
      <CalendarContainer>
        <NavigationWrapper>
          <StyledCalendar
            onChange={(date, event) => onChange(date, event.nativeEvent)}
            value={date}
            view={view}
            onActiveStartDateChange={({ activeStartDate, view }) =>
              setView(view)
            }
            locale="en-US"
            formatMonthYear={(locale, date) =>
              `${date.getFullYear()}년 ${date.getMonth() + 1}월`
            }
            formatDay={(locale, date) => date.getDate().toString()}
            tileContent={({ date }) => {
              const eventDate = date.toDateString();
              if (events[eventDate]) {
                const { text, startTime } = events[eventDate];
                return (
                  <EventContainer>
                    <EventDot />
                    <EventTextWithTime>{text}</EventTextWithTime>
                    <EventTime>{startTime}</EventTime> {/* 시작 시간만 표시 */}
                  </EventContainer>
                );
              }
              return null;
            }}
          />
          <ButtonContainer>
            <NavButton onClick={() => setView("year")}>월</NavButton>
            <NavButton onClick={() => setView("decade")}>년</NavButton>
          </ButtonContainer>
        </NavigationWrapper>
        {showModal && (
          <CalendarModal
            onClose={() => setShowModal(false)}
            selectedDate={selectedDate}
            onAddEvent={handleAddEvent} // 일정 추가 핸들러
            onRemoveEvent={handleRemoveEvent} // 일정 삭제 핸들러
            existingEvent={events[selectedDate?.toDateString()]} // 이미 있는 일정 전달
            modalPosition={modalPosition} // 모달 위치 전달
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default CalendarComponent;
