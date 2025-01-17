import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  width: 95%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 20px;
  line-height: 31px;
  letter-spacing: 0.25px;
  color: #000000;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 1.09px;
  color: #8f9097;
  margin: 5px 0 15px 0;
`;

const TypeSelector = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(139, 139, 139, 0.15);
  border-radius: 5.8px;
  cursor: pointer;
`;

const BookIcon = styled.span`
  margin-right: 8px;
  color: #494a4f;
`;

const SelectorText = styled.span`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 14px;
  color: #494a4f;
  margin-right: 8px;
`;

const ChevronIcon = styled.span`
  color: #494a4f;
`;

const Legend = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div`
  width: 52px;
  height: 14px;
  background: ${(props) => props.color};
  opacity: 0.7;
`;

const LegendText = styled.span`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14px;
  color: #000000;
`;

const data = [
  { day: "월", major: 20, cert: 0 },
  { day: "화", major: 60, cert: 30 },
  { day: "수", major: 50, cert: 40 },
  { day: "목", major: 70, cert: 90 },
  { day: "금", major: 50, cert: 20 },
  { day: "토", major: 60, cert: 30 },
  { day: "일", major: 80, cert: 70 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "white",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <p>{label}요일</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const LearningComprehension = () => {
  return (
    <Container>
      <Header>
        <div>
          <Title>학습 내용 이해도</Title>
          <Subtitle>
            이번달 평균 학습 이해도는 전공 공부가 55.71%로 가장 높아요!
          </Subtitle>
        </div>
        <TypeSelector>
          <BookIcon>📚</BookIcon>
          <SelectorText>학습 유형 2</SelectorText>
          <ChevronIcon>▼</ChevronIcon>
        </TypeSelector>
      </Header>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
          <XAxis
            dataKey="day"
            stroke="rgba(0,0,0,0.7)"
            tick={{ fontSize: 12, fontFamily: "Pretendard" }}
          />
          <YAxis
            stroke="rgba(0,0,0,0.7)"
            tick={{ fontSize: 12, fontFamily: "Pretendard" }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="major"
            stroke="#669CFF"
            strokeWidth={2}
            dot={{ stroke: "#669CFF", strokeWidth: 2, r: 4, fill: "#669CFF" }}
          />
          <Line
            type="monotone"
            dataKey="cert"
            stroke="#FFDF76"
            strokeWidth={2}
            dot={{ stroke: "#FFDF76", strokeWidth: 2, r: 4, fill: "#FFDF76" }}
          />
        </LineChart>
      </ResponsiveContainer>

      <Legend>
        <LegendItem>
          <LegendColor color="#669CFF" />
          <LegendText>전공 공부</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#FFDF76" />
          <LegendText>자격증 공부</LegendText>
        </LegendItem>
      </Legend>
    </Container>
  );
};

export default LearningComprehension;
