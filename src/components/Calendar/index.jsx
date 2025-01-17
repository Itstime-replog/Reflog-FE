import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled, { createGlobalStyle } from "styled-components";
import CalendarModal from "../CalendarModal";
import MiniCalendar from "../MiniCalendar";
import { fetchSchedules } from "../../apis/calendarApi";

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
  align-items: flex-start;
  width: 100%;
  padding-left: 4px;
  margin-top: 20px;
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

const EventWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

const CalendarComponent = ({ onDateChange, memberId }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month"); // 현재 뷰 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태
  const [modalPosition, setModalPosition] = useState(null); // 모달 위치 상태
  const [events, setEvents] = useState({}); // 초기값을 빈 객체로 설정
  /*
  // 선택된 날짜가 변경될 때 일정 데이터 로드
  useEffect(() => {
    if (!memberId) {
      console.error("memberId가 제공되지 않았습니다.");
      return;
    }

    const loadSchedules = async () => {
      try {
        const selectedDateString = date.toISOString().split("T")[0];
        const schedules = await fetchSchedules(memberId, selectedDateString);

        setEvents(schedules || []);
      } catch (error) {
        console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    loadSchedules();
  }, [date, memberId]);
  */

  // 하드코딩된 memberId
  const hardcodedMemberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1";

  // 선택된 날짜가 변경될 때 일정 데이터 로드
  useEffect(() => {
    if (!hardcodedMemberId) {
      console.error("memberId가 제공되지 않았습니다.");
      return;
    }

    const loadSchedules = async () => {
      try {
        // 현재 선택된 월 가져오기 (1~12로 표현)
        const selectedMonth = date.getMonth() + 1;
        console.log("요청할 month 값:", selectedMonth);

        // API 호출로 일정 데이터 가져오기
        const schedules = await fetchSchedules(selectedMonth);

        if (schedules) {
          // 기존 로컬 상태와 API 데이터를 병합
          setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };

            // API에서 가져온 데이터를 추가
            schedules.forEach((schedule) => {
              const eventDate = new Date(schedule.startDateTime).toDateString();
              if (!updatedEvents[eventDate]) {
                updatedEvents[eventDate] = [];
              }
              updatedEvents[eventDate].push({
                id: schedule.id,
                text: schedule.title,
                startTime: new Date(schedule.startDateTime).toLocaleTimeString(
                  "ko-KR",
                  { hour: "2-digit", minute: "2-digit" }
                ),
                endTime: new Date(schedule.endDateTime).toLocaleTimeString(
                  "ko-KR",
                  { hour: "2-digit", minute: "2-digit" }
                ),
              });
            });

            return updatedEvents; // 병합된 상태 반환
          });
        } else {
          console.error("일정 데이터를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("일정 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    // 데이터 로드 실행
    loadSchedules();
  }, [date]);

  // 날짜 선택 시
  const onChange = (selectedDate, event) => {
    setDate(selectedDate);
    setSelectedDate(selectedDate); // 선택된 날짜 상태 업데이트
    onDateChange(selectedDate.toISOString().split("T")[0]); // YYYY-MM-DD 형식으로 상위 컴포넌트에 전달

    // 클릭한 날짜 타일의 위치 계산
    const tileElement = event.target.closest(".react-calendar__tile");
    if (tileElement) {
      const rect = tileElement.getBoundingClientRect();

      // 마지막 주 판단 로직
      const activeStartDate = new Date(date.getFullYear(), date.getMonth(), 1); // 현재 달의 시작일
      const totalDays = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate(); // 현재 달의 총 일수
      const weekNumber = Math.ceil(
        (date.getDate() + activeStartDate.getDay()) / 7
      ); // 클릭된 날짜의 주차
      const totalWeeks = Math.ceil((totalDays + activeStartDate.getDay()) / 7); // 달의 총 주차

      const isLastWeek = weekNumber === totalWeeks; // 마지막 주인지 확인

      setModalPosition({
        top: rect.top + window.scrollY - (isLastWeek ? 170 : 20), // 마지막 주는 Y축 -170, 나머지는 -20
        left: rect.right + window.scrollX + 1, // 타일의 오른쪽 옆으로 1px
      });
    }

    setShowModal(true); // 모달 표시
  };

  // 일정 추가 핸들러
  const handleAddEvent = (text, times) => {
    if (!selectedDate) {
      console.error("선택된 날짜가 없습니다.");
      return;
    }

    const formattedDate = selectedDate.toDateString(); // 날짜를 문자열로 변환
    const newEvent = {
      id: Date.now(), // 고유 ID 생성
      text: text.trim(),
      startTime: times.startTime.trim(),
      endTime: times.endTime.trim(),
    };

    setEvents((prevEvents) => {
      const updatedEvents = {
        ...prevEvents,
        [formattedDate]: [
          // `id`가 없는 일정 제거
          ...(prevEvents[formattedDate]?.filter(
            (event) => event.id !== undefined
          ) || []),
          newEvent, // 새로운 일정 추가
        ],
      };

      return updatedEvents;
    });

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

  // "월" 버튼 핸들러
  const handleMonthView = () => {
    setView("month");
  };

  // "년" 버튼 핸들러
  const handleYearView = () => {
    setView("year");
  };

  const handleMiniCalendarClick = (month) => {
    // 클릭된 달로 이동
    setDate(new Date(date.getFullYear(), month, 1));
    setView("month");
  };

  // 기존 일정 수정 상태 추가
  const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 일정 상태

  // 날짜 숫자 영역 더블 클릭 시 새로운 일정 등록 모달 표시
  const onDateDoubleClick = (date, event) => {
    setDate(date);
    setSelectedDate(date);
    setSelectedEvent(null); // 새로운 일정 등록이므로 선택된 일정 초기화

    // 클릭한 날짜 타일의 위치 계산
    const tileElement = event.target.closest(".react-calendar__tile");
    if (tileElement) {
      const rect = tileElement.getBoundingClientRect();
      const isLastWeek = checkIsLastWeek(date); // 마지막 주 판단 로직

      setModalPosition({
        top: rect.top + window.scrollY - (isLastWeek ? 170 : 20),
        left: rect.right + window.scrollX + 1,
      });
    }

    setShowModal(true); // 모달 표시
  };

  // 일정 텍스트 더블 클릭 시 수정 모달 표시
  const onEventDoubleClick = (date, eventId) => {
    setDate(date);
    setSelectedDate(date);
    console.log("Double-clicked date:", date); // 클릭한 날짜
    console.log("Double-clicked eventId:", eventId); // 클릭한 일정 ID

    const event = events[date.toDateString()]?.find((e) => e.id === eventId);
    console.log("Found event:", event); // 찾아낸 일정

    if (event) {
      console.log("Selected event for double click:", event);
      setSelectedEvent({
        ...event,
        endTime: event.endTime || "00:00 오전", // 기본 값 설정
      });
      setShowModal(true);
    } else {
      console.error("선택된 이벤트를 찾을 수 없습니다.", eventId);
    }
  };

  useEffect(() => {
    const filterInvalidEvents = () => {
      setEvents((prevEvents) => {
        const updatedEvents = {};

        let isUpdated = false; // 상태 변경 여부를 추적

        for (const [date, eventList] of Object.entries(prevEvents)) {
          const validEvents = eventList.filter(
            (event) => event.id !== undefined
          );
          if (validEvents.length !== eventList.length) {
            isUpdated = true; // 변경 사항 발생
          }
          if (validEvents.length > 0) {
            updatedEvents[date] = validEvents;
          }
        }

        // 변경이 없으면 기존 상태 반환
        return isUpdated ? updatedEvents : prevEvents;
      });
    };

    filterInvalidEvents(); // 이벤트 필터링 실행
  }, [events]); // `events` 상태가 변경될 때마다 실행

  // 마지막 주 판단 함수
  const checkIsLastWeek = (date) => {
    const activeStartDate = new Date(date.getFullYear(), date.getMonth(), 1); // 현재 달의 시작일
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate(); // 총 일수
    const weekNumber = Math.ceil(
      (date.getDate() + activeStartDate.getDay()) / 7
    ); // 클릭된 주차
    const totalWeeks = Math.ceil((totalDays + activeStartDate.getDay()) / 7); // 총 주차
    return weekNumber === totalWeeks;
  };

  // 모달에 전달할 기존 일정 데이터 및 핸들러
  const modalProps = {
    onClose: () => setShowModal(false),
    selectedDate,
    existingEvent: selectedEvent, // 선택된 일정 전달
    onAddEvent: handleAddEvent, // 일정 추가 핸들러
    onRemoveEvent: handleRemoveEvent, // 일정 삭제 핸들러
    modalPosition,
  };

  return (
    <>
      <GlobalStyle />
      <CalendarContainer>
        <NavigationWrapper>
          {view === "year" ? (
            <MiniCalendar
              year={date.getFullYear()}
              onMonthClick={handleMiniCalendarClick}
            />
          ) : (
            <StyledCalendar
              onChange={(date, event) => onChange(date, event.nativeEvent)} // 날짜 변경 처리
              value={date}
              view={view}
              onDoubleClick={(date, event) =>
                onDateDoubleClick(date, event.nativeEvent)
              } // 날짜 더블 클릭
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
                const dayEvents = Array.isArray(events[eventDate])
                  ? events[eventDate]
                  : [];
                console.log("Day events for", eventDate, ":", dayEvents);

                if (events[eventDate]) {
                  const { text, startTime } = events[eventDate];
                  return (
                    <EventContainer>
                      {events[eventDate].map((event) => (
                        <EventWrapper
                          key={event.id}
                          onDoubleClick={() =>
                            onEventDoubleClick(date, event.id)
                          }
                          // 일정 더블 클릭
                        >
                          <EventDot />
                          <EventTextWithTime>
                            {typeof event.text === "string"
                              ? event.text.trim()
                              : "N/A"}
                          </EventTextWithTime>
                          <EventTime>
                            {typeof event.startTime === "string"
                              ? event.startTime
                              : ""}
                          </EventTime>
                        </EventWrapper>
                      ))}
                    </EventContainer>
                  );
                }
                return null;
              }}
            />
          )}
          <ButtonContainer>
            <NavButton isActive={view === "month"} onClick={handleMonthView}>
              월
            </NavButton>
            <NavButton isActive={view === "year"} onClick={handleYearView}>
              년
            </NavButton>
          </ButtonContainer>
        </NavigationWrapper>
        {showModal && (
          <CalendarModal
            onClose={() => setShowModal(false)}
            selectedDate={selectedDate}
            onAddEvent={handleAddEvent} // 일정 추가 핸들러
            onRemoveEvent={handleRemoveEvent} // 일정 삭제 핸들러
            existingEvent={selectedEvent} // 선택된 일정 전달
            modalPosition={modalPosition} // 모달 위치 전달
          />
        )}
      </CalendarContainer>
    </>
  );
};

export default CalendarComponent;
