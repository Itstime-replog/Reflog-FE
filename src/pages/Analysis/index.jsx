import React from "react";
import styled from "styled-components";
import { ReportProvider } from "./context/ReportContext";
import Tabs from "./components/Tabs";
import DateSelector from "./components/DateSelector";
import StatusBox from "./components/StatusBox";
import StudyTypeChart from "./components/StudyTypeChart";
import ImprovementBubbles from "./components/ImprovementBubbles";
import StudyProgress from "./components/StudyProgress";
import KeywordBubbles from "./components/KeywordBubbles";
import { Box } from "./components/styles";
import LearningComprehension from "./components/LearningComprehension";
import { useReport } from "./context/ReportContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 80px 32px 32px 32px;
`;

const TopRow = styled.div`
  display: flex;
  gap: 20px;
  height: 250px;
  margin-top: 30px;
`;

const TopLeftSection = styled.div`
  display: flex;
  gap: 20px;
  width: 48.5%;
`;

const TopRightBox = styled(Box)`
  width: 48.5%;
  height: 360px;
`;

const MiddleRow = styled.div`
  display: flex;
  gap: 20px;
  height: 350px;
  transform: translateY(30%);
`;

const Box4 = styled(Box)`
  width: 48.5%;
  height: 131%;
  transform: translateY(-23%);
`;

const Box5 = styled(Box)`
  width: 48.5%;
`;

const Box6 = styled(Box)`
  width: 48.5%;
`;

const Box7 = styled(Box)`
  width: 48.5%;
`;

const BottomRow = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 70px;
  transform: translateY(50%);
`;

const LongBox = styled(Box)`
  width: 99%;
  height: 180%;
`;

const AnalysisContent = () => {
  const { reportData } = useReport();

  return (
    <Container>
      <Tabs />
      <DateSelector />

      <TopRow>
        <TopLeftSection>
          <StatusBox
            title="투두리스트 실천 정도"
            value={reportData.todoCompletion}
          />
          <StatusBox title="회고횟수" value={reportData.retroCount} />
        </TopLeftSection>
        <TopRightBox>
          <StudyTypeChart total={reportData.studyTotal} />
        </TopRightBox>
      </TopRow>

      <MiddleRow>
        <Box4>
          <ImprovementBubbles />
        </Box4>
        <Box5>
          <StudyProgress />
        </Box5>
      </MiddleRow>

      <MiddleRow>
        <Box6>
          <KeywordBubbles
            title="잘한 점 키워드"
            keywords={[
              { text: "시간관리", percentage: 50 },
              { text: "피드백 수용", percentage: 25 },
              { text: "계획수립", percentage: 10 },
            ]}
          />
        </Box6>
        <Box7>
          <KeywordBubbles
            title="부족한 점 키워드"
            keywords={[
              { text: "복습 및 예습", percentage: 50 },
              { text: "지식 응용", percentage: 30 },
              { text: "질의응답", percentage: 10 },
            ]}
          />
        </Box7>
      </MiddleRow>

      <BottomRow>
        <LongBox>
          <LearningComprehension />
        </LongBox>
      </BottomRow>
    </Container>
  );
};

const Analysis = () => {
  return (
    <ReportProvider>
      <AnalysisContent />
    </ReportProvider>
  );
};

export default Analysis;
