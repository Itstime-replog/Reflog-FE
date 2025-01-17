import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-size: 22px;
  font-weight: 600;
  line-height: 31px;
  letter-spacing: 0.25px;
  color: #000000;
  margin: 0;
  padding: 0;
`;

const Subtitle = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 1.09px;
  color: #8f9097;
  margin: 12px 0 30px 0;
`;

const BubblesContainer = styled.div`
  position: relative;
  flex: 1;
  margin-top: 20px;
`;

const Bubble = styled.div`
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Pretendard";
  font-weight: 600;
  color: ${(props) => props.textColor || "#FFFFFF"};
  background-color: ${(props) => props.bgColor};
`;

// 메인 버블 (가장 큰 파란색 원) - 실천 가능한 목표 설정
// width: 271.56px, height: 271.56px
// background: #337AFF
// font-size: 29.4466px
const MainBubble = styled(Bubble)`
  width: 160px;
  height: 160px;
  left: 120px;
  top: -10px;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 1.19px;
`;

// 두 번째 버블 (노란색 원) - 실천율 향상
// width: 226.14px, height: 227.35px
// background: #FFC300
// font-size: 32.6513px
const SecondBubble = styled(Bubble)`
  width: 140px;
  height: 140px;
  right: 200px;
  top: 0px;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 1.32px;
`;

// 세 번째 버블 (중간 크기 파란색 원) - 객관적 이해
// width: 189.53px, height: 189.53px
// background: #669CFF
// font-size: 27.7657px
const ThirdBubble = styled(Bubble)`
  width: 120px;
  height: 120px;
  right: 280px;
  top: 130px;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 1.31px;
`;

// 네 번째 버블 (작은 연한 파란색 원) - 소통 강화
// width: 131.61px, height: 130.18px
// background: #E5EEFF
// font-size: 24.3196px
// color: #669CFF (글자색만 다름)
const SmallBubble1 = styled(Bubble)`
  width: 80px;
  height: 80px;
  left: 150px;
  top: 160px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1.56px;
`;

// 다섯 번째 버블 (가장 작은 연한 파란색 원) - 피드백 적용
// width: 139.6px, height: 140.69px
// background: #CCDEFF
// font-size: 20.7217px
const SmallBubble2 = styled(Bubble)`
  width: 90px;
  height: 90px;
  right: 180px;
  top: 141px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1.19px;
`;

const ImprovementBubbles = () => {
  return (
    <Container>
      <Title>개선점 키워드</Title>
      <Subtitle>이번달 회고에서 가장 많이 언급된 개선점이에요!</Subtitle>

      <BubblesContainer>
        <MainBubble bgColor="#337AFF">
          실천 가능한
          <br />
          목표 설정
        </MainBubble>
        <SecondBubble bgColor="#FFC300">실천율 향상</SecondBubble>
        <ThirdBubble bgColor="#669CFF">객관적 이해</ThirdBubble>
        <SmallBubble1 bgColor="#E5EEFF" textColor="#669CFF">
          소통 강화
        </SmallBubble1>
        <SmallBubble2 bgColor="#CCDEFF">피드백 적용</SmallBubble2>
      </BubblesContainer>
    </Container>
  );
};

export default ImprovementBubbles;
