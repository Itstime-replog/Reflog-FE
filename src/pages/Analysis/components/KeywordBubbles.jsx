import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #000000;
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 470px;
`;

const BubblesContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 43px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BubbleGroup = styled.div`
  position: relative;
  width: 350px; /* 더 축소 */
  height: 250px; /* 더 축소 */
`;

const LargeBubble = styled.div`
  position: absolute;
  width: 160px; /* 더 축소 */
  height: 160px; /* 더 축소 */
  left: 70px;
  top: 0;
  background: #0059ff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px; /* 더 축소 */
  line-height: 28px; /* 더 축소 */
  text-align: center;
  padding-left: 5px;
`;

const MediumBubble = styled.div`
  position: absolute;
  width: 110px; /* 더 축소 */
  height: 110px; /* 더 축소 */
  left: 0;
  top: 90px;
  background: #ccdeff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px; /* 더 축소 */
  line-height: 24px; /* 더 축소 */
  text-align: center;
  padding-left: 5px;
`;

const SmallBubble = styled.div`
  position: absolute;
  width: 90px; /* 더 축소 */
  height: 90px; /* 더 축소 */
  right: 0;
  top: 110px;
  background: #e5eeff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #669cff;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 16px; /* 더 축소 */
  line-height: 24px; /* 더 축소 */
  text-align: center;
  padding-left: 5px;
  margin-right: 60px;
`;

const KeywordBubbles = ({ title, keywords }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <BubblesContainer>
        <BubbleGroup>
          <LargeBubble>
            {keywords[0].text}
            <div>{keywords[0].percentage}%</div>
          </LargeBubble>
          <MediumBubble>
            {keywords[1].text}
            <div>{keywords[1].percentage}%</div>
          </MediumBubble>
          <SmallBubble>
            {keywords[2].text}
            <div>{keywords[2].percentage}%</div>
          </SmallBubble>
        </BubbleGroup>
      </BubblesContainer>
    </Container>
  );
};

export default KeywordBubbles;
