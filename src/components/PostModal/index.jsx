import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 700px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  float: right;
`;

const PostModal = ({ postTitle, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h2>{postTitle}</h2>
        <p>
          이번에 처음 기획부터 디자인, 개발 팀 프로젝트를 시작했는데 스프린트
          회고가 필요한 상황입니다. 비슷한 상황에서 어떤 회고 방법론을 활용해
          회고를 진행하시나요?! 효율적인 회고 방법 추천해주세요!
        </p>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PostModal;
