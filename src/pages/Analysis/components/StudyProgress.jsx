import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

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

  span {
    color: #0059ff;
    font-weight: 600;
  }

  strong {
    color: #0059ff;
    font-weight: 600;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  margin-left: -55px;
  margin-top: 10px;
`;

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#0059FF",
          padding: "5px 10px",
          borderRadius: "4px",
          color: "white",
          fontSize: "14px",
        }}
      >
        {`${payload[0].value}%`}
      </div>
    );
  }
  return null;
};

const StudyProgress = () => {
  const data = [
    { day: "월", value: 40 },
    { day: "화", value: 30 },
    { day: "수", value: 55 },
    { day: "목", value: 100 },
    { day: "금", value: 70 },
    { day: "토", value: 50 },
    { day: "일", value: 20 },
  ];

  return (
    <Container>
      <Title>학습 수행도</Title>
      <Subtitle>
        이번달은 <span>목요일</span>에 목표한 학습을 달성한 정도가{" "}
        <strong>100%</strong>로 가장 높아요!
      </Subtitle>

      <ChartContainer>
        <BarChart width={450} height={200} data={data} barSize={35}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            scale="point"
            padding={{ left: 30, right: 30 }}
            tick={{ fill: "rgba(0, 0, 0, 0.7)", fontSize: 13 }}
          />
          <YAxis
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fill: "rgba(0, 0, 0, 0.7)", fontSize: 11 }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey="value" fill="#CCDEFF" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.day === "목" ? "#0059FF" : "#CCDEFF"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </Container>
  );
};

export default StudyProgress;
