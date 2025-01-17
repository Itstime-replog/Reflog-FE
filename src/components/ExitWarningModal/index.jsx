import React from "react";
import styled from "styled-components";
import warningIcon from "../../assets/images/community/warning-icon.png";
import cancelIcon from "../../assets/images/common/cancel-icon.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 471px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 54px;
  height: 54px;
  margin-top: 10px;
`;

const Message = styled.p`
  margin-bottom: 40px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #494a4f;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const CancelButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 5px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0.2px;
  color: #a1a1a1;
`;

const ConfirmButton = styled.button`
  background: #0059ff;
  color: white;
  border: none;
  padding: 5px 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;

  &:hover {
    background: #0046cc;
  }
`;

const ExitWarningModal = ({ onClose, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton src={cancelIcon} alt="닫기" onClick={onClose} />
        <Icon src={warningIcon} alt="경고" />
        <Message>
          이 페이지를 벗어나면 현재 작성 중인 내용은 저장되지 않습니다.
        </Message>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ExitWarningModal;
