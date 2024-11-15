import React, { useState } from "react";
import styled from "styled-components";
import infoIcon from "../../assets/images/info-icon.png";
import InnerCalendar from "../InnerCalendar/InnerCalendar";
import TimeSelect from "../TimeSelect/TimeSelect";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding-top: 10px;
  padding-bottom: 15px;
  width: 340px;
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
  margin-bottom: 5px;
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
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Pretendard", sans-serif;
  &::placeholder {
    color: #d6d6d6;
  }
`;

const Section = styled.div`
  background-color: rgba(229, 238, 255, 0.5);
  padding: 16px 20px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-bottom: 9px;
  font-family: "Pretendard";
  font-weight: bold;
  font-size: 13px;
  line-height: 23px;
  color: #494a4f;
`;

const ToggleSwitch = styled.label`
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
  position: fixed;
  top: 56%;
  left: 41%;
  transform: translate(-100%, -50%);
  width: 250px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 10px 20px 20px 20px;
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
  margin-top: 20px;
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
  margin-top: 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13.5px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 15px;
`;

const CalendarModal = ({
  onClose,
  selectedDate,
  onAddEvent,
  onRemoveEvent,
  existingEvent,
}) => {
  const [scheduleText, setScheduleText] = useState(existingEvent || ""); // 기존 일정 로드
  const [alarmOption, setAlarmOption] = useState("없음"); // 알림 옵션 상태 관리
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [showEndCalendar, setShowEndCalendar] = useState(false); // 종료일 캘린더 표시 상태
  const [endDate, setEndDate] = useState(selectedDate); // 종료일 상태
  const [startTime, setStartTime] = useState("00:00 AM"); // 시작 시간 상태

  // 일정 등록
  const handleRegister = () => {
    if (scheduleText.trim()) {
      onAddEvent(scheduleText, startTime); // 일정과 시간을 함께 추가
    }
  };

  // 일정 삭제
  const handleRemove = () => {
    onRemoveEvent(); // 일정 삭제 핸들러 호출
    onClose(); // 모달 닫기
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
      <ModalOverlay>
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
              <ToggleSwitch>
                <input type="checkbox" />
                <span></span>
              </ToggleSwitch>
            </Label>
            <Label>
              시작일 : {selectedDate.toLocaleDateString()}{" "}
              <TimeSelect value={startTime} onChange={setStartTime} />
            </Label>
            <Label onClick={() => setShowEndCalendar(true)}>
              종료일 : {endDate.toLocaleDateString()}{" "}
              <TimeSelect value={startTime} onChange={setStartTime} />
            </Label>

            <Label>
              <InfoIcon src={infoIcon} alt="Info" onClick={toggleTooltip} />
              알림 기능:
              <Dropdown
                value={alarmOption}
                onChange={(e) => setAlarmOption(e.target.value)}
              >
                <option value="없음">없음</option>
                <option value="10분 후">10분 후</option>
                <option value="30분 후">30분 후</option>
                <option value="1시간 후">1시간 후</option>
                <option value="2시간 후">2시간 후</option>
              </Dropdown>
            </Label>
          </Section>

          <Input placeholder="메모, URL" />

          <ButtonContainer>
            <RegisterButton onClick={handleRegister}>등록</RegisterButton>
            {existingEvent && (
              <DeleteButton onClick={handleRemove}>삭제</DeleteButton>
            )}
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>

      {showEndCalendar && (
        <InnerCalendar
          selectedDate={endDate}
          onDateChange={(date) => setEndDate(date)}
          onClose={() => setShowEndCalendar(false)}
          startDate={selectedDate} // 시작일 기준으로 종료일 설정
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
