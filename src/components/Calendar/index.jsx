import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled, { createGlobalStyle } from "styled-components";
import CalendarModal from "../CalendarModal";
import MiniCalendar from "../MiniCalendar";

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
  height: 26.61px;
  border-radius: 2.31px;
  margin: 2.6px 2.3px 1px 2.4px;
  background: ${({ isActive }) =>
    isActive ? "#EBF0F9" : "none"}; /* 활성화된 버튼 배경색 */
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
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 4px;
`;

const EventBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const EventDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #ffc300;
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
  const [view, setView] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);
  const [events, setEvents] = useState({});
  const [clickCount, setClickCount] = useState(0);
  const [editingEvent, setEditingEvent] = useState(null);

  const calculateModalPosition = (tileElement, date) => {
    const rect = tileElement.getBoundingClientRect();
    const activeStartDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const weekNumber = Math.ceil(
      (date.getDate() + activeStartDate.getDay()) / 7
    );
    const totalWeeks = Math.ceil((totalDays + activeStartDate.getDay()) / 7);
    const isLastWeek = weekNumber === totalWeeks;

    return {
      top: rect.top + window.scrollY - (isLastWeek ? 170 : 20),
      left: rect.right + window.scrollX + 1,
    };
  };

  const onChange = (date, event) => {
    setClickCount((prev) => prev + 1);

    if (clickCount === 1) {
      setSelectedDate(date);

      const tileElement = event.target.closest(".react-calendar__tile");
      if (tileElement) {
        setModalPosition(calculateModalPosition(tileElement, date));
      }

      setTimeout(() => {
        setShowModal(true);
        setEditingEvent(null);
      }, 0);
    }

    setTimeout(() => setClickCount(0), 300);
  };

  const handleEventClick = (date, index, event) => {
    setSelectedDate(date);
    setEditingEvent(index);

    if (event) {
      const tileElement = event.target.closest(".react-calendar__tile");
      if (tileElement) {
        setModalPosition(calculateModalPosition(tileElement, date));
      }
    }

    setShowModal(true);
  };

  const handleAddEvent = (text, times, additionalInfo) => {
    const formattedDate = selectedDate.toDateString();
    setEvents((prev) => {
      const currentEvents = prev[formattedDate] || [];

      if (editingEvent !== null) {
        if (text.trim() === "") {
          // 제목이 비어있을 경우 삭제
          const updatedEvents = currentEvents.filter(
            (_, index) => index !== editingEvent
          );
          return {
            ...prev,
            [formattedDate]: updatedEvents.length ? updatedEvents : undefined,
          };
        }

        // 일정 수정
        const updatedEvents = [...currentEvents];
        updatedEvents[editingEvent] = {
          text: text.trim(),
          startTime: times.startTime.trim(),
          endTime: times.endTime.trim(),
          ...additionalInfo,
        };
        return {
          ...prev,
          [formattedDate]: updatedEvents,
        };
      }

      if (currentEvents.length >= 3) {
        alert("최대 3개의 일정만 등록할 수 있습니다.");
        return prev;
      }

      // 새 일정 추가
      return {
        ...prev,
        [formattedDate]: [
          ...currentEvents,
          {
            text: text.trim(),
            startTime: times.startTime.trim(),
            endTime: times.endTime.trim(),
            ...additionalInfo,
          },
        ],
      };
    });
    setShowModal(false);
  };

  const handleModalClose = () => {
    if (editingEvent !== null) {
      const formattedDate = selectedDate.toDateString();
      setEvents((prev) => {
        const currentEvents = prev[formattedDate] || [];
        const updatedEvents = currentEvents.filter(
          (_, index) => index !== editingEvent
        );
        return {
          ...prev,
          [formattedDate]: updatedEvents.length ? updatedEvents : undefined,
        };
      });
    }
    setShowModal(false);
  };

  return (
    <>
      <GlobalStyle />
      <CalendarContainer>
        <NavigationWrapper>
          {view === "year" ? (
            <MiniCalendar
              year={date.getFullYear()}
              onMonthClick={(month) => {
                setDate(new Date(date.getFullYear(), month, 1));
                setView("month");
              }}
            />
          ) : (
            <StyledCalendar
              onChange={(date, event) => onChange(date, event.nativeEvent)}
              value={date}
              view={view}
              onActiveStartDateChange={({ view }) => setView(view)}
              locale="en-US"
              formatMonthYear={(locale, date) =>
                `${date.getFullYear()}년 ${date.getMonth() + 1}월`
              }
              formatDay={(locale, date) => date.getDate().toString()}
              tileContent={({ date }) => {
                const eventDate = date.toDateString();
                if (events[eventDate]) {
                  return (
                    <EventContainer>
                      {events[eventDate].map((event, index) => (
                        <EventBox
                          key={index}
                          onDoubleClick={(e) =>
                            handleEventClick(date, index, e)
                          }
                        >
                          <EventDot />
                          <EventTextWithTime>{event.text}</EventTextWithTime>
                          <EventTime>{event.startTime}</EventTime>
                        </EventBox>
                      ))}
                    </EventContainer>
                  );
                }
                return null;
              }}
            />
          )}
          <ButtonContainer>
            <NavButton
              isActive={view === "month"}
              onClick={() => setView("month")}
            >
              월
            </NavButton>
            <NavButton
              isActive={view === "year"}
              onClick={() => setView("year")}
            >
              년
            </NavButton>
          </ButtonContainer>
        </NavigationWrapper>
        {showModal && (
          <CalendarModal
            onClose={handleModalClose}
            selectedDate={selectedDate}
            onAddEvent={(text, times) =>
              handleAddEvent(text, times, {
                allDay:
                  events[selectedDate?.toDateString()]?.[editingEvent]
                    ?.allDay || false,
                memo:
                  events[selectedDate?.toDateString()]?.[editingEvent]?.memo ||
                  "",
                alarm:
                  events[selectedDate?.toDateString()]?.[editingEvent]?.alarm ||
                  false,
                endDate:
                  events[selectedDate?.toDateString()]?.[editingEvent]
                    ?.endDate || selectedDate,
              })
            }
            existingEvent={
              editingEvent !== null
                ? events[selectedDate?.toDateString()][editingEvent]
                : null
            }
            modalPosition={modalPosition}
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default CalendarComponent;
