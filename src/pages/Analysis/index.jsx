import React, { useState } from 'react';
import styled from 'styled-components';
// Recharts 관련 컴포넌트
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

/* -------------------------------------
 * styled-components
 * ------------------------------------- */

// 전체 화면을 감싸는 컨테이너
const RetrospectContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
`;

// 윗 배너 영역 (여백 최소화)
const TopBanner = styled.div`
  position: absolute;
  top: 20px;  
  left: 0;
  right: 0;
  height: 40px;
  background-color: transparent;
`;

// 중앙 배너(메인) 영역 (여백 최소화)
const MiddleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 120px); 
  background-color: transparent;
  padding-top: 80px;  
  padding-bottom: 80px;
`;

// 아래 고정 영역
const BottomFixed = styled.div`
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  height: 60px; 
  background-color: transparent;
`;

// 실제 내용들을 감싸는 래퍼
const ContentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

/* 상단 탭, 날짜 선택 영역 */
const TopControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-bottom: 20px;
  gap: 10px;
`;

/* 탭을 감싸는 컨테이너 */
const TabsContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 32px;
  padding: 4px;
`;

/* 탭 버튼 */
const TabButton = styled.button`
  border: none;
  border-radius: 32px;
  padding: 10px 30px;
  margin-right: 2px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#e0edff' : 'transparent')};
  color: ${({ active }) => (active ? '#337aff' : '#888')};
  font-weight: 600;
  font-size: 1rem;
  outline: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#dbe7ff' : '#f1f1f1')};
  }
`;

/* 날짜 범위 버튼 */
const DateRangeButton = styled.button`
  background-color: #ffc300;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #ffb000;
  }
`;

/* -------------------------------------
 * 그리드 레이아웃
 * ------------------------------------- */
const GridContainer = styled.div`
  display: grid;
  /* 2열 그리드 + 카드들 사이 간격 20px */
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
`;

// 카드(박스) 스타일 (그림자 줄임)
const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);  /* 그림자 옅게 */
`;

// 섹션 제목
const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: 600;
`;

// 설명 텍스트
const Description = styled.p`
  font-size: 0.9rem;
  margin-bottom: 10px;
  color: #555;
`;

// 강조 숫자
const HighlightNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;

// 키워드(버블)
const KeywordBubbleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const KeywordBubble = styled.div`
  background-color: #e8f0fe;
  color: #333;
  border-radius: 50%;
  text-align: center;
  padding: 10px 15px;
  font-size: 0.85rem;
  white-space: nowrap;
`;

// 잘한 점 / 부족한 점 키워드 (원형)
const CircleKeywordContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CircleKeyword = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({bgColor}) => bgColor || '#cce5ff'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CircleText = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const CirclePercent = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

/* -------------------------------------
 * 차트 데이터 & 컬러 팔레트
 * ------------------------------------- */
const CHART_COLORS = ['#337aff', '#ffc300', '#669cff', '#e5eefe', '#0059ff'];

// PieChart (학습유형)
const studyTypeData = [
  { name: '외국어 공부', value: 40 },
  { name: '팀프로젝트', value: 25 },
  { name: '전공공부', value: 20 },
  { name: '그룹 스터디', value: 10 },
  { name: '나머지', value: 5 },
];

// BarChart (학습 수행도)
const performanceData = [
  { day: '월', value: 30 },
  { day: '화', value: 50 },
  { day: '수', value: 100 },
  { day: '목', value: 60 },
  { day: '금', value: 70 },
  { day: '토', value: 80 },
  { day: '일', value: 40 },
];

// LineChart (학습 내용 이해도)
const understandingData = [
  { day: '월', major: 10, etc: 0 },
  { day: '화', major: 40, etc: 30 },
  { day: '수', major: 60, etc: 50 },
  { day: '목', major: 90, etc: 80 },
  { day: '금', major: 55, etc: 20 },
  { day: '토', major: 70, etc: 45 },
  { day: '일', major: 95, etc: 75 },
];

/* -------------------------------------
 * 메인 컴포넌트
 * ------------------------------------- */
const Retrospect = () => {
  // 탭 상태 (주간 / 월간) - 예시
  const [activeTab, setActiveTab] = useState('WEEK');

  return (
    <RetrospectContainer>
      {/* 상단 배너 (빈공간 최소화) */}
      <TopBanner />

      {/* 중앙 메인 영역 */}
      <MiddleBanner>
        <ContentWrapper>
          {/* (1) 상단 탭, 날짜 선택 영역 */}
          <TopControls>
            <TabsContainer>
              <TabButton
                active={activeTab === 'WEEK'}
                onClick={() => setActiveTab('WEEK')}
              >
                주간보고서
              </TabButton>
              <TabButton
                active={activeTab === 'MONTH'}
                onClick={() => setActiveTab('MONTH')}
              >
                월간보고서
              </TabButton>
            </TabsContainer>

            <DateRangeButton>
              2024.10.6 ~ 10.13 ▼
            </DateRangeButton>
          </TopControls>

          {/* (2) 2열 그리드 레이아웃 */}
          <GridContainer>
            {/* 1. 투두리스트 실천 정도 */}
            <Card>
              <SectionTitle>투두리스트 실천 정도</SectionTitle>
              <HighlightNumber>10/30개</HighlightNumber>
            </Card>

            {/* 2. 회고횟수 */}
            <Card>
              <SectionTitle>회고횟수</SectionTitle>
              <HighlightNumber>7회</HighlightNumber>
            </Card>

            {/* 3. 학습유형 (파이차트) */}
            <Card>
              <SectionTitle>학습유형</SectionTitle>
              <Description>
                {activeTab === 'WEEK'
                  ? '이번주는 외국어 공부가 많아요!'
                  : '이번달은 전공공부가 많아요!'}
              </Description>
              <PieChart width={300} height={220}>
                <Pie
                  data={studyTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {studyTypeData.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={30} />
              </PieChart>
            </Card>

            {/* 4. 개선점 키워드 (버블) */}
            <Card>
              <SectionTitle>개선점 키워드</SectionTitle>
              <Description>
                {activeTab === 'WEEK'
                  ? '이번주 자주 등장한 개선점'
                  : '이번달 자주 등장한 개선점'}
              </Description>
              <KeywordBubbleContainer>
                <KeywordBubble>실천 가능한 목표 설정</KeywordBubble>
                <KeywordBubble>실천율 향상</KeywordBubble>
                <KeywordBubble>객관적 이해</KeywordBubble>
                <KeywordBubble>소통 강화</KeywordBubble>
                <KeywordBubble>피드백 적용</KeywordBubble>
              </KeywordBubbleContainer>
            </Card>

            {/* 5. 학습 수행도 (막대차트) - span 2 열 */}
            <Card style={{ gridColumn: 'span 2' }}>
              <SectionTitle>학습 수행도</SectionTitle>
              <Description>
                {activeTab === 'WEEK'
                  ? '이번주 목요일 달성도가 제일 높아요!'
                  : '이번달 2주차 달성도가 제일 높아요!'}
              </Description>
              <BarChart width={900} height={250} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={CHART_COLORS[0]} 
                />
              </BarChart>
            </Card>

            {/* 6. 잘한 점 키워드 */}
            <Card>
              <SectionTitle>잘한 점 키워드</SectionTitle>
              <CircleKeywordContainer>
                <CircleKeyword bgColor="#e5eefe">
                  <CircleText>시간관리</CircleText>
                  <CirclePercent>50%</CirclePercent>
                </CircleKeyword>
                <CircleKeyword bgColor="#669cff">
                  <CircleText>피드백 수용</CircleText>
                  <CirclePercent>25%</CirclePercent>
                </CircleKeyword>
                <CircleKeyword bgColor="#337aff33">
                  <CircleText>계획수립</CircleText>
                  <CirclePercent>10%</CirclePercent>
                </CircleKeyword>
              </CircleKeywordContainer>
            </Card>

            {/* 7. 부족한 점 키워드 */}
            <Card>
              <SectionTitle>부족한 점 키워드</SectionTitle>
              <CircleKeywordContainer>
                <CircleKeyword bgColor="#ffc30066">
                  <CircleText>복습 및 예습</CircleText>
                  <CirclePercent>50%</CirclePercent>
                </CircleKeyword>
                <CircleKeyword bgColor="#0059ff33">
                  <CircleText>지식 응용</CircleText>
                  <CirclePercent>30%</CirclePercent>
                </CircleKeyword>
                <CircleKeyword bgColor="#e5eefe">
                  <CircleText>질의응답</CircleText>
                  <CirclePercent>10%</CirclePercent>
                </CircleKeyword>
              </CircleKeywordContainer>
            </Card>

            {/* 8. 학습 내용 이해도 (라인차트) - span 2 열 */}
            <Card style={{ gridColumn: 'span 2' }}>
              <SectionTitle>학습 내용 이해도</SectionTitle>
              <Description>
                {activeTab === 'WEEK'
                  ? '이번주 평균 이해도는 전공 공부가 높아요!'
                  : '이번달 평균 이해도는 전공 공부가 높아요!'}
              </Description>
              <LineChart width={900} height={300} data={understandingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="major"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="etc"
                  stroke={CHART_COLORS[1]}
                  strokeWidth={2}
                />
              </LineChart>
            </Card>
          </GridContainer>
        </ContentWrapper>
      </MiddleBanner>

      {/* 하단 고정 영역 (필요시 내부에 다른 내용 추가) */}
      <BottomFixed />
    </RetrospectContainer>
  );
};

export default Retrospect;