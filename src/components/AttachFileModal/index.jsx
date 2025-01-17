import React, { useRef } from "react";
import styled from "styled-components";
import addModalIcon from "../../assets/images/community/addModal-icon.png";
import cancelIcon from "../../assets/images/common/cancel-icon.png";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 471px;
  padding: 50px 0;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const CloseButton = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: 12px;
  right: 12px;
  margin-bottom: 10px;
`;

const AttachButton = styled.button`
  background: #0059ff;
  border: none;
  padding: 7px 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 25px;
  letter-spacing: 0.2px;
  color: #ffffff;

  &:hover {
    background: #0046cc;
  }
`;

const Icon = styled.img`
  width: 54px;
  height: 54px;
  margin-bottom: 12px;
`;

const Text = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  color: #494a4f;
  margin-bottom: 10px;
`;

const AttachFileModal = ({ onClose, onFileSelect = () => {} }) => {
  const hiddenFileInput = useRef(null);

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB 제한
    let validFiles = selectedFiles.filter((file) => file.size <= maxSize);

    if (validFiles.length < selectedFiles.length) {
      alert("10MB를 초과하는 파일은 추가할 수 없습니다.");
    }

    if (validFiles.length > 0) {
      onFileSelect(validFiles); // 부모 컴포넌트에 전달
    }

    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton src={cancelIcon} alt="닫기" onClick={onClose} />
        <Icon src={addModalIcon} alt="파일 추가" />
        <Text>파일은 최대 10MB까지 첨부 가능합니다.</Text>
        <AttachButton onClick={() => hiddenFileInput.current.click()}>
          파일첨부
        </AttachButton>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileUpload}
          style={{ display: "none" }}
          multiple
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AttachFileModal;
