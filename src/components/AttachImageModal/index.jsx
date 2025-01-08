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

const AttachImageModal = ({ onClose, onImageSelect }) => {
  const hiddenFileInput = useRef(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const maxSize = 20 * 1024 * 1024; // 20MB 제한
    const maxFiles = 3;

    // jpg, png 파일만 허용
    let validFiles = selectedFiles.filter(
      (file) =>
        file.size <= maxSize && ["image/jpeg", "image/png"].includes(file.type)
    );

    if (validFiles.length < selectedFiles.length) {
      alert("JPG, PNG 형식만 지원되며 20MB 이하 파일만 가능합니다.");
    }

    if (validFiles.length > maxFiles) {
      alert("최대 3개의 이미지만 업로드 가능합니다.");
      validFiles = validFiles.slice(0, maxFiles);
    }

    if (validFiles.length > 0) {
      onImageSelect(validFiles); // 부모 컴포넌트로 전달
    }

    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton src={cancelIcon} alt="닫기" onClick={onClose} />
        <Icon src={addModalIcon} alt="이미지 추가" />
        <Text>
          사진은 최대 3장, 용량은 최대 20MB까지 <br></br>
          jpg, png 포맷만 가능합니다.
        </Text>
        <AttachButton onClick={() => hiddenFileInput.current.click()}>
          파일첨부
        </AttachButton>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleImageUpload}
          style={{ display: "none" }}
          accept="image/jpeg, image/png"
          multiple
        />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AttachImageModal;
