import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportType, setReportType] = useState("monthly"); // 'weekly' or 'monthly'

  // 보고서 타입에 따른 데이터
  const reportData = {
    monthly: {
      todoCompletion: "130/170개",
      retroCount: "22회",
      studyTotal: "40개",
    },
    weekly: {
      todoCompletion: "10/30개",
      retroCount: "7회",
      studyTotal: "25개",
    },
  };

  const getCurrentData = () => reportData[reportType];

  return (
    <ReportContext.Provider
      value={{
        reportType,
        setReportType,
        reportData: getCurrentData(),
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};
