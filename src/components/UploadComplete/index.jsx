import React from "react";
import styled from "styled-components";
import blueCheckIcon from "../../assets/images/community/blueCheck-icon.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlueCheckIcon = styled.img`
  width: 134px;
  height: 134px;
`;

const Message = styled.h2`
  margin-top: 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #494a4f;
`;

const GoBackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: none;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  transition: background 0.2s ease-in-out;
  color: #a1a1a1;

  &:hover {
    background: #f2f2f2;
  }
`;

const UploadCompleteScreen = ({ onGoBack }) => {
  return (
    <Container>
      <IconWrapper>
        <BlueCheckIcon src={blueCheckIcon} alt="체크 아이콘" />
      </IconWrapper>
      <Message>게시글이 업로드되었습니다.</Message>
      <GoBackButton onClick={onGoBack}>커뮤니티로 돌아가기</GoBackButton>
    </Container>
  );
};

export default UploadCompleteScreen;
