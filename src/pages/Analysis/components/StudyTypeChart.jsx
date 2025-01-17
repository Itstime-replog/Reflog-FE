import React from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell } from "recharts";
import { useReport } from "../context/ReportContext";

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  margin-top: -20px;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-size: 25px;
  font-weight: 600;
  color: #000000;
  margin: 0;
  padding: 0;
`;

const Subtitle = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  color: #8f9097;
  margin: 16px 0 40px 0;

  span {
    color: #0059ff;
  }
`;

const ChartContent = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  margin-left: 80px;
`;

const ChartWrapper = styled.div`
  width: 220px;
  height: 220px;
  position: relative;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const LegendText = styled.span`
  font-family: "Pretendard";
  font-size: 14px;
  color: #666666;
`;

const CenterLabel = styled.div`
  position: absolute;
  top: 52%;
  left: 52%;
  transform: translate(-50%, -50%);
  font-family: "Pretendard";
  font-size: 24px;
  font-weight: bold;
  color: #0059ff;
`;

const PercentageText = styled.text`
  font-family: "Pretendard";
  font-size: 12px;
  fill: white;
  font-weight: 500;
`;

const StudyTypeChart = () => {
  const { reportData } = useReport();

  const data = [
    { name: "외국어 공부", value: 40, color: "#0059FF" },
    { name: "팀프로젝트", value: 25, color: "#FFC300" },
    { name: "전공공부", value: 20, color: "#CCDEFF" },
    { name: "그룹 스터디", value: 10, color: "#E5EEFF" },
    { name: "나머지", value: 5, color: "#F1F1F1" },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <PercentageText x={x} y={y} textAnchor="middle" dominantBaseline="middle">
        {`${(percent * 100).toFixed(0)}%`}
      </PercentageText>
    );
  };

  return (
    <ChartContainer>
      <Title>학습유형</Title>
      <Subtitle>
        이번달은 <span>외국어 공부</span>에 대한 회고를 가장 많이 진행했어요!
      </Subtitle>

      <ChartContent>
        <ChartWrapper>
          <PieChart width={220} height={220}>
            <Pie
              data={data}
              cx={110}
              cy={110}
              innerRadius={50}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <CenterLabel>{reportData.studyTotal}</CenterLabel>
        </ChartWrapper>

        <Legend>
          {data.map((item, index) => (
            <LegendItem key={index}>
              <LegendDot color={item.color} />
              <LegendText>{item.name}</LegendText>
            </LegendItem>
          ))}
        </Legend>
      </ChartContent>
    </ChartContainer>
  );
};

export default StudyTypeChart;
