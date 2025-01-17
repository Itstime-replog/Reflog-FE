import React, { useState, useEffect } from "react";
import styled from "styled-components";
import infoIcon from "../../assets/images/calendar/info-icon.png";
import InnerCalendar from "../InnerCalendar/InnerCalendar";
import TimeSelect from "../TimeSelect/TimeSelect";
import infoBoxImage from "../../assets/images/calendar/infoBox.png";
import { createSchedule } from "../../apis/calendarModalApi";
import { deleteSchedule } from "../../apis/calendarApi";

const ModalOverlay = styled.div`
  position: absolute;
  z-index: 1000;
  top: ${(props) => props.top || "50%"}px;
  left: ${(props) => props.left || "50%"}px;
`;

const ModalContent = styled.div`
  background: white;
  padding-top: 6px;
  padding-bottom: 15px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: "Pretendard", sans-serif;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 25px;
  color: #888;
  cursor: pointer;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 21px;
  color: #494a4f;
`;

const ScheduleInput = styled.input`
  font-size: 15px;
  color: black;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  margin-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Pretendard", sans-serif;
  &::placeholder {
    color: #d6d6d6;
  }
`;

const Section = styled.div`
  background-color: rgba(229, 238, 255, 0.5);
  padding: 14px 20px 9px 20px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 8px;
  font-family: "Pretendard";
  font-weight: bold;
  font-size: 13px;
  color: #494a4f;
`;

const ToggleSwitchAllday = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin-left: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 20px;
    transition: 0.4s;
  }

  span:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  input:checked + span {
    background-color: #4a86f7;
  }

  input:checked + span:before {
    transform: translateX(14px);
  }
`;

const ToggleSwitchAlarm = styled.label`
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin-left: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 20px;
    transition: 0.4s;
  }

  span:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }

  input:checked + span {
    background-color: #4a86f7;
  }

  input:checked + span:before {
    transform: translateX(14px);
  }
`;

const AlarmModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlarmModalTitle = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 21px;
  color: #494a4f;
`;

const InfoIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 5px;
  cursor: pointer;
  margin-left: -18px;
`;

const InfoTooltip = styled.div`
  background-image: url(${infoBoxImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: absolute; /* 모달창 기준으로 위치 설정 */
  top: ${({ top }) => `${top}px`}; /* props로 top 위치 전달 */
  left: ${({ left }) => `${left}px`}; /* props로 left 위치 전달 */
  transform: translate(-100%, -50%);
  width: 250px;
  padding: 10px 16px 20px 15px;
  font-size: 13px;
  color: #494a4f;
  z-index: 1001;
`;

const Dropdown = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 21px;
  color: #494a4f;

  &:focus {
    outline: none;
    border-color: #4a86f7;
  }
`;

const Input = styled.textarea`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 20px;
  resize: none;
  width: 87%;
  height: auto;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  &::placeholder {
    color: #d6d6d6;
  }
`;

const DeleteButton = styled.button`
  width: 75px;
  height: 30px;
  background-color: red;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 10px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13.5px;
  text-align: center;
  margin-left: 4px;
`;

const RegisterButton = styled.button`
  width: 75px;
  height: 30px;
  background-color: #0059ff;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 10px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13.5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
`;

const CalendarModal = ({
  onClose,
  selectedDate,
  onAddEvent,
  onRemoveEvent,
  existingEvent,
  modalPosition,
}) => {
  const [scheduleText, setScheduleText] = useState(existingEvent?.text || "");
  const [startTime, setStartTime] = useState(
    existingEvent?.startTime || "00:00 오전"
  );
  const [endTime, setEndTime] = useState(
    existingEvent?.endTime || "00:00 오전"
  ); // 기존 종료 시간 로드
  const [alarmOption, setAlarmOption] = useState("없음"); // 알림 옵션 상태 관리
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [showEndCalendar, setShowEndCalendar] = useState(false); // 종료일 캘린더 표시 상태
  const [endDate, setEndDate] = useState(selectedDate); // 종료일 상태
  const [endCalendarPosition, setEndCalendarPosition] = useState(null); // 종료일 캘린더 위치
  const [content, setContent] = useState(existingEvent?.content || ""); // 메모 상태
  const [allday, setAllday] = useState(existingEvent?.allday || false);
  const [isOn, setIsOn] = useState(existingEvent?.isOn || false);

  // 마지막 주 판단 함수
  const isLastWeek = (date) => {
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1); // 해당 달의 첫째 날
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0); // 해당 달의 마지막 날
    const lastWeekStart = new Date(monthEnd);
    lastWeekStart.setDate(lastWeekStart.getDate() - 6); // 마지막 주 시작 날짜 계산
    return date >= lastWeekStart && date <= monthEnd; // 마지막 주 날짜 여부 확인
  };

  const convertTo24Hour = (time) => {
    const match = time.match(/^(\d{1,2}):(\d{2}) (오전|오후)$/);
    if (!match) {
      throw new Error(`Invalid time format: ${time}`);
    }

    const [_, hours, minutes, period] = match; // "hours"와 "minutes"를 분리
    const hours24 =
      period === "오후" && hours !== "12" // 오후이고 12시가 아니면
        ? parseInt(hours, 10) + 12
        : period === "오전" && hours === "12" // 오전 12시는 00시로 변환
          ? 0
          : parseInt(hours, 10);

    return `${hours24.toString().padStart(2, "0")}:${minutes}`;
  };
  useEffect(() => {
    console.log("existingEvent in CalendarModal:", existingEvent);
  }, [existingEvent]);

  useEffect(() => {
    if (existingEvent) {
      setScheduleText(existingEvent.text || "");
      setStartTime(existingEvent.startTime || "00:00 오전");
      setEndTime(existingEvent.endTime || "00:00 오전");
      setContent(existingEvent.content || "");
      setAllday(existingEvent.allday || false);
      setIsOn(existingEvent.isOn || false);
      setEndDate(selectedDate); // 선택된 종료일 업데이트
    }
  }, [existingEvent, selectedDate]);

  // 일정 등록
  const handleRegister = async () => {
    if (scheduleText.trim()) {
      try {
        const startTime24 = convertTo24Hour(startTime);
        const endTime24 = convertTo24Hour(endTime);

        const startDateTime = new Date(
          `${selectedDate.toISOString().split("T")[0]}T${startTime24}`
        ).toISOString();

        const endDateTime = new Date(
          `${endDate.toISOString().split("T")[0]}T${endTime24}`
        ).toISOString();

        const scheduleData = {
          memberId: "59819297-9f21-4a42-aeae-3f4f8f8cf1e1",
          title: scheduleText,
          content,
          allday,
          isOn,
          startDateTime,
          endDateTime,
        };

        const result = await createSchedule(
          localStorage.getItem("accessToken"),
          scheduleData
        );
        if (result.isSuccess) {
          onAddEvent(scheduleText, { startTime, endTime });
          onClose();
        } else {
          console.error("일정 등록 실패:", result.message);
        }
      } catch (error) {
        console.error("일정 등록 중 에러 발생:", error.message);
      }
    }
  };

  // 일정 삭제
  const handleDeleteEvent = async () => {
    if (!existingEvent?.id) {
      console.error("삭제할 일정의 ID가 존재하지 않습니다.");
      return;
    }

    if (window.confirm("이 일정을 삭제하시겠습니까?")) {
      const isDeleted = await deleteSchedule(existingEvent.id); // 삭제 API 호출

      if (isDeleted) {
        onRemoveEvent(); // 로컬 상태에서 일정 삭제
        console.log("일정 삭제 완료");
        onClose(); // 모달 닫기
      } else {
        console.error("일정 삭제에 실패했습니다.");
      }
    }
  };

  // 종료일 클릭 시 InnerCalendar 위치 계산 및 표시/숨김
  const handleEndDateClick = (event) => {
    if (showEndCalendar) {
      setShowEndCalendar(false); // 이미 표시 중이면 숨김
    } else {
      const rect = event.target.getBoundingClientRect();
      console.log("Rect values:", rect);
      console.log("isLastWeek(endDate):", isLastWeek(endDate));
      setEndCalendarPosition({
        top: rect.bottom + window.scrollY + (isLastWeek(endDate) ? -20 : 10), // 마지막 주면 위로
        left: rect.left + window.scrollX, // 클릭된 요소 기준 왼쪽
      });
      setShowEndCalendar(true); // 캘린더 표시
    }
  };

  const toggleTooltip = (event) => {
    if (tooltipPosition) {
      setTooltipPosition(null);
    } else {
      const rect = event.target.closest("div").getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY + 40, // 모달 아래로 약간 이동
        left: rect.left + window.scrollX - 270, // 모달 왼쪽으로 위치
      });
    }
  };

  return (
    <>
      <ModalOverlay top={modalPosition?.top} left={modalPosition?.left}>
        <ModalContent>
          <Header>
            <Title>일정 등록</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </Header>
          <ScheduleInput
            value={scheduleText}
            onChange={(e) => setScheduleText(e.target.value)}
            placeholder="새로운 일정을 입력해주세요."
          />
          <Section>
            <Label>
              종일 :
              <ToggleSwitchAllday>
                <input
                  type="checkbox"
                  checked={allday} // 상태 값으로 연결
                  onChange={(e) => setAllday(e.target.checked)}
                />
                <span></span>
              </ToggleSwitchAllday>
            </Label>
            <Label>
              시작일 : {selectedDate.toLocaleDateString()}
              <TimeSelect value={startTime} onChange={setStartTime} />
            </Label>
            <Label onClick={handleEndDateClick}>
              종료일 : {endDate.toLocaleDateString()}
              <TimeSelect value={endTime} onChange={setEndTime} />
            </Label>
            <Label>
              <InfoIcon src={infoIcon} alt="Info" onClick={toggleTooltip} />
              알림 기능:
              <ToggleSwitchAlarm>
                <input
                  type="checkbox"
                  checked={isOn} // 상태 값으로 연결
                  onChange={(e) => setIsOn(e.target.checked)}
                />
                <span></span>
              </ToggleSwitchAlarm>
            </Label>
          </Section>
          <Input
            placeholder="메모, URL"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonContainer>
            <RegisterButton onClick={handleRegister}>등록</RegisterButton>
            {existingEvent && (
              <DeleteButton onClick={handleDeleteEvent}>삭제</DeleteButton>
            )}
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
      {showEndCalendar && endCalendarPosition && (
        <InnerCalendar
          selectedDate={endDate}
          onDateChange={(date) => setEndDate(date)}
          onClose={() => setShowEndCalendar(false)}
          innerCalendarPosition={endCalendarPosition} // 동적 위치 전달
        />
      )}
      {tooltipPosition && (
        <InfoTooltip top={tooltipPosition.top} left={tooltipPosition.left}>
          <AlarmModalHeader>
            <AlarmModalTitle>알림 기능</AlarmModalTitle>
            <CloseButton onClick={() => setTooltipPosition(null)}>
              ×
            </CloseButton>
          </AlarmModalHeader>
          등록한 일정 완료 후, 알림을 통해 회고일지 작성을 잊지 않도록 도와줘요!
        </InfoTooltip>
      )}
    </>
  );
};

export default CalendarModal;
