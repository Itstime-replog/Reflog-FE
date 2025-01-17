import React from "react";
import styled from "styled-components";
import { useReport } from "../context/ReportContext";

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  width: 960.67px;
  height: 59px;
  background: #ffffff;
  border-radius: 29.5px;
  position: relative;
  margin-bottom: 30px;
`;

const Tab = styled.div`
  width: 472px;
  height: 48.74px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 19.2391px;
  line-height: 23px;
  text-align: center;
  background: ${(props) => (props.$active ? "#E5EEFF" : "transparent")};
  color: ${(props) => (props.$active ? "#0059FF" : "#A1A1A1")};
  border-radius: 24.3696px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Tabs = () => {
  const { reportType, setReportType } = useReport();

  return (
    <TabContainer>
      <Tab
        $active={reportType === "weekly"}
        onClick={() => setReportType("weekly")}
      >
        주간보고서
      </Tab>
      <Tab
        $active={reportType === "monthly"}
        onClick={() => setReportType("monthly")}
      >
        월간보고서
      </Tab>
    </TabContainer>
  );
};

export default Tabs;
