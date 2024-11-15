import React from "react";
import styled from "styled-components";
import CalendarComponent from "../../components/Calendar";
import TodaysResolution from "../../components/TodaysResolution";
import TodoList from "../../components/TodoList";

const StudyplanContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 161px;
  display: flex;
  flex-direction: row;
`;

const RightContainer = styled.div`
  width: 294px;
  height: 752px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 29px;
  box-shadow: 0px 0px 5px 1px rgba(139, 139, 139, 0.2);
  padding-left: 18px;
  padding-right: 5px;
  padding-top: 22px;
`;

const Studyplan = () => {
  return (
    <StudyplanContainer>
      {/* 추후 학습 플랜 컨텐츠가 들어갈 자리 */}
      <CalendarComponent />{" "}
      {/* CalendarComponent 컴포넌트를 사용하여 캘린더 표시 */}
      <RightContainer>
        <TodaysResolution />
        <TodoList />
      </RightContainer>
    </StudyplanContainer>
  );
};

export default Studyplan;
