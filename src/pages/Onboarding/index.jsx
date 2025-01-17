import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bg1 from "../../assets/images/onboarding/bg1.png";
import icon1 from "../../assets/images/onboarding/icon1.png";
import icon2 from "../../assets/images/onboarding/icon2.png";
import icon3 from "../../assets/images/onboarding/icon3.png";
import calendar from "../../assets/images/onboarding/calender.png";
import retro from "../../assets/images/onboarding/retro.png";
import analyze from "../../assets/images/onboarding/analyze.png";
import community from "../../assets/images/onboarding/community.png";

const OnboardingContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow-x: hidden;
`;

const BackgroundSection = styled.div`
  position: relative;
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 15%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bg1});
  background-size: cover;
  background-position: center;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  z-index: 1;
  max-width: 800px;
`;

const SubTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  text-align: left;
`;

const MainTitle = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 55px;
  color: #ffffff;
  margin-bottom: 40px;
  text-align: left;
`;

const StartButton = styled.button`
  width: 236px;
  height: 54px;
  border: 2px solid #ffffff;
  border-radius: 5px;
  background: transparent;
  color: #ffffff;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FeaturesSection = styled.div`
  width: 100%;
  background: #0059ff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
  padding: 120px 0;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  text-align: center;
`;

const FeatureIcon = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
`;

const FeatureTitle = styled.h3`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 10px 0;
`;

const FeatureDescription = styled.p`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const Section = styled.div`
  width: 100%;
  padding: 60px 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
`;

const SectionContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 40px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 740px;
  line-height: 1.8;
  text-align: ${(props) => props.$align || "center"};
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 47px;
  line-height: 56px;
  color: #000000;
  margin-bottom: 40px;
  text-align: center;
  letter-spacing: 0.2px;
  text-transform: capitalize;
`;

const Description = styled.p`
  font-family: "Pretendard";
  font-weight: 400;
  font-size: 25px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
  text-align: center;
  white-space: pre-line;
  letter-spacing: 0.2px;
  text-transform: capitalize;
`;

const SectionImage = styled.img`
  width: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const CommunitySection = styled.div`
  width: 100%;
  padding: 60px 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
`;

const CommunitySectionContent = styled.div`
  width: 100%;
  max-width: 1306px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const CommunityTextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 740px;
  margin-bottom: 60px;
`;

const CommunityImage = styled.div`
  width: 1306px;
  height: 1002px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <OnboardingContainer>
      <BackgroundSection>
        <BackgroundImage />
        <DarkOverlay />
        <ContentWrapper>
          <SubTitle>리플로그와 함께 시작해보세요!</SubTitle>
          <MainTitle>오늘의 회고가 내일의 성장으로</MainTitle>
          <StartButton onClick={() => navigate("/login")}>시작하기</StartButton>
        </ContentWrapper>
      </BackgroundSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureIcon src={icon1} alt="회고 템플릿" />
          <FeatureTitle>다양한 회고 템플릿과 가이드 제공</FeatureTitle>
          <FeatureDescription>
            제공되는 회고 템플릿으로 간편하고 효율적인 회고를 진행해보세요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon src={icon2} alt="커뮤니티" />
          <FeatureTitle>커뮤니티로 나의 회고 고민 해결</FeatureTitle>
          <FeatureDescription>
            다른 사람의 회고일지를 통해 자극도 받고, 회고와 관련된 정보 공유로
            회고의 질을 높여보아요.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon src={icon3} alt="학습 플랜" />
          <FeatureTitle>학습 플랜 기능으로 효과적인 회고 지원</FeatureTitle>
          <FeatureDescription>
            학습 일정 관리는 물론 회고를 통해 느낀 점을 바로 반영해 회고의 전
            과정을 함께 해요.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>

      <Section>
        <SectionContent>
          <TextContent>
            <Title>효율적인 학습 일정 관리</Title>
            <Description>
              학습플랜 기능으로 회고 일지 작성 후, 개선점을 반영해 학습 다짐과
              투두리스트를 세우고 개인적인 학습 일정도 관리해보세요!
            </Description>
          </TextContent>
          <SectionImage src={calendar} alt="캘린더" />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <TextContent>
            <Title>빠르고 간편한 회고일지 작성</Title>
            <Description>
              학습 완료 후, 회고 일지 작성이 귀찮거나 어려우셨나요? 리플로그의
              간편한 회고 일지 템플릿으로 학습 회고를 간편하게 진행해보세요!
            </Description>
          </TextContent>
          <SectionImage src={retro} alt="회고" />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <SectionImage src={analyze} alt="분석" />
          <TextContent>
            <Title>분석보고서로 한 눈에 확인</Title>
            <Description>
              학습회고 기록 현황을 기반으로 제공되는 분석보고서를 통해{"\n"}
              나의 학습 회고 습관을 검토해보아요!
            </Description>
          </TextContent>
        </SectionContent>
      </Section>

      <CommunitySection>
        <CommunitySectionContent>
          <CommunityTextContent>
            <Title>커뮤니티로 고민 해결</Title>
            <Description>
              학습회고 방법에 있어 막막함을 느끼거나 학습 과정에 어려움을
              느끼시나요?{"\n"}
              커뮤니티를 통해 유용한 정보도 얻고 다른 사람의{"\n"}
              회고 일지도 확인하며 동기부여 받아요!
            </Description>
          </CommunityTextContent>
          <CommunityImage>
            <img src={community} alt="커뮤니티" />
          </CommunityImage>
        </CommunitySectionContent>
      </CommunitySection>
    </OnboardingContainer>
  );
};

export default Onboarding;
