import React from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { LineChart, Line } from 'recharts';

// ============== Styled Components ==============
const Container = styled.div`
  font-family: 'Pretendard', sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 24px 40px;
  box-sizing: border-box;
`;

// 상단 탭(주간보고서, 월간보고서) + 날짜 선택
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
`;

const TabButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 12px;
  color: ${(props) => (props.active ? '#0059ff' : '#494A4F')};
  border-bottom: ${(props) => (props.active ? '2px solid #0059ff' : 'none')};

  &:hover {
    opacity: 0.8;
  }
`;

const MonthSelect = styled.select`
  margin-left: auto;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

// 메인 컨텐츠 영역
const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 24px;
  width: 100%;
`;

// 간단히 숫자 혹은 통계를 보여주는 카드
const SimpleCard = styled.div`
  grid-column: span 3;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SimpleCardTitle = styled.div`
  font-size: 14px;
  color: #494a4f;
  margin-bottom: 8px;
`;

const SimpleCardNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #1f2024;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 키워드 뭉치(버블 구름)처럼 표현하는 것(예시는 단순 원 모양으로)
const BubbleSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const Bubble = styled.div`
  min-width: 80px;
  padding: 16px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || '#E5EEFE'};
  color: #494a4f;
  text-align: center;
  font-weight: 600;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
`;

// 차트 캡션
const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #494a4f;
  margin-bottom: 12px;
`;

// ============== 차트에 쓰일 예시 데이터 ==============

// 도넛 차트(학습유형, 잘한 점, 부족한 점)에 쓰일 예시 데이터
const learningPieData = [
  { name: '외국어 공부', value: 40 },
  { name: '팀프로젝트', value: 25 },
  { name: '전공공부', value: 20 },
  { name: '그룹 스터디', value: 10 },
  { name: '나머지', value: 5 },
];

const goodPieData = [
  { name: '시간관리', value: 50 },
  { name: '피드백 수용', value: 25 },
  { name: '계획수립', value: 10 },
  // 나머지는 15% 정도? 임의로 하나 추가
  { name: '기타', value: 15 },
];

const badPieData = [
  { name: '복습 및 예습', value: 50 },
  { name: '지식 응용', value: 30 },
  { name: '질의응답', value: 10 },
  { name: '기타', value: 10 },
];

// (예시) 바 차트(학습 수행도)에 쓰일 데이터
const barData = [
  { day: '월', value: 60 },
  { day: '화', value: 40 },
  { day: '수', value: 75 },
  { day: '목', value: 100 },
  { day: '금', value: 50 },
  { day: '토', value: 70 },
  { day: '일', value: 80 },
];

// (예시) 라인 차트(학습 내용 이해도)에 쓰일 데이터
const lineData = [
  { day: '월', major: 10, cert: 0 },
  { day: '화', major: 40, cert: 20 },
  { day: '수', major: 60, cert: 30 },
  { day: '목', major: 90, cert: 80 },
  { day: '금', major: 40, cert: 25 },
  { day: '토', major: 60, cert: 45 },
  { day: '일', major: 85, cert: 65 },
];

const COLORS = ['#0059FF', '#FFC300', '#FAA0A0', '#7950F2', '#82ca9d'];

// ============== 메인 컴포넌트 ==============
const MonthlyReport = () => {
  return (
    <Container>
      {/* 헤더 영역: 탭 & 월 선택 */}
      <Header>
        <TabButton active>주간보고서</TabButton>
        <TabButton active={false}>월간보고서</TabButton>

        <MonthSelect>
          <option>2024.10월</option>
          <option>2024.09월</option>
          <option>2024.08월</option>
        </MonthSelect>
      </Header>

      {/* 통계 카드 & 차트 배치 */}
      <MainContent>
        {/* 투두리스트 실천 정도 */}
        <SimpleCard>
          <SimpleCardTitle>투두리스트 실천 정도</SimpleCardTitle>
          <SimpleCardNumber>130/170개</SimpleCardNumber>
        </SimpleCard>

        {/* 회고횟수 */}
        <SimpleCard>
          <SimpleCardTitle>회고횟수</SimpleCardTitle>
          <SimpleCardNumber>22회</SimpleCardNumber>
        </SimpleCard>

        {/* 빈 칸 맞추기 위해 */}
        <div style={{ gridColumn: 'span 6' }} />

        {/* 학습유형 (도넛 차트) */}
        <ChartCard style={{ gridColumn: 'span 4' }}>
          <ChartTitle>학습유형</ChartTitle>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#494A4F' }}>
            이번달은 <strong>외국어 공부</strong>에 대한 회고를 가장 많이 진행했어요!
          </div>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={learningPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {learningPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 개선점 키워드 (버블) */}
        <ChartCard style={{ gridColumn: 'span 4', justifyContent: 'space-between' }}>
          <ChartTitle>개선점 키워드</ChartTitle>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#494A4F' }}>
            이번달 회고에서 가장 많이 언급된 개선점이에요!
          </div>
          <BubbleSection>
            <Bubble bgColor="#E5EEFE">실천 가능한 목표 설정</Bubble>
            <Bubble bgColor="#FFE8B2">실천율 향상</Bubble>
            <Bubble bgColor="#E5EEFE">객관적 이해</Bubble>
            <Bubble bgColor="#E5EEFE">소통 강화</Bubble>
            <Bubble bgColor="#E5EEFE">피드백 적용</Bubble>
          </BubbleSection>
        </ChartCard>

        {/* 학습 수행도 (바 차트) */}
        <ChartCard style={{ gridColumn: 'span 4' }}>
          <ChartTitle>학습 수행도</ChartTitle>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#494A4F' }}>
            이번달은 <strong>목요일</strong>에 목표한 학습 달성 정도가 <strong>100%</strong>로 가장 높아요!
          </div>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0059FF">
                  <LabelList dataKey="value" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 잘한 점 키워드 (도넛 차트) */}
        <ChartCard style={{ gridColumn: 'span 4' }}>
          <ChartTitle>잘한 점 키워드</ChartTitle>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={goodPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {goodPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 부족한 점 키워드 (도넛 차트) */}
        <ChartCard style={{ gridColumn: 'span 4' }}>
          <ChartTitle>부족한 점 키워드</ChartTitle>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={badPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {badPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 학습 내용 이해도 (라인 차트) */}
        <ChartCard style={{ gridColumn: 'span 12' }}>
          <ChartTitle>학습 내용 이해도</ChartTitle>
          <div style={{ fontSize: '14px', marginBottom: '8px', color: '#494A4F' }}>
            이번달 평균 학습 이해도는 <strong>전공 공부: 55.71%</strong>로 가장 높아요!
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="major"
                  stroke="#0059ff"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  type="monotone"
                  dataKey="cert"
                  stroke="#FFC300"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </MainContent>
    </Container>
  );
};

export default MonthlyReport;
