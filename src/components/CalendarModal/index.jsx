// src/components/CalendarModal/index.jsx
import React from "react";
import styled from "styled-components";
import infoIcon from "../../assets/images/info-icon.png";

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
  width: 320px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: "Pretendard", sans-serif;
  overflow: hidden; /* 모달 내부에서 요소가 튀어나가지 않도록 설정 */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #888;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  font-size: 14px;
  color: #888;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  margin-bottom: 20px;
  padding: 5px 0;
  font-family: "Pretendard", sans-serif;
  &::placeholder {
    color: #888;
  }
`;

const Section = styled.div`
  background-color: #f1f5ff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Label = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 5px;
`;

const Toggle = styled.input.attrs({ type: "checkbox" })`
  accent-color: #4a86f7;
  margin-left: 10px;
`;

const Input = styled.input`
  font-size: 14px;
  color: #555;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  width: 100%;
  background-color: #4a86f7;
  color: white;
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
`;

const CalendarModal = ({ onClose, selectedDate }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>일정 등록</Title>
        <TitleInput placeholder="새로운 일정을 입력해주세요." />

        <Section>
          <Label>
            종일 : <Toggle />
          </Label>
          <Label>시작일 : {selectedDate.toLocaleDateString()}</Label>
          <Label>종료일 : {selectedDate.toLocaleDateString()}</Label>
          <Label>
            <InfoIcon src={infoIcon} alt="Info" />
            알림 기능 : <Input placeholder="없음" />
          </Label>
        </Section>

        <Input
          style={{
            width: "90%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
          placeholder="메모, URL"
        />

        <RegisterButton>등록</RegisterButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CalendarModal;
