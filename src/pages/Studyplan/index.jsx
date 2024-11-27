import React from "react";
import styled from "styled-components";
import CalendarComponent from "../../components/Calendar";
import TodaysResolution from "../../components/TodaysResolution";
import TodoList from "../../components/TodoList";

const StudyplanContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RightContainer = styled.div`
  width: 340.09px;
  height: 869.9px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 29px;
  box-shadow: 0px 0px 5px 1px rgba(139, 139, 139, 0.2);
  padding-left: 18px;
  padding-right: 5px;
  margin-left: 20px;
`;

const Studyplan = () => {
  return (
    <StudyplanContainer>
      <CalendarComponent />{" "}
      <RightContainer>
        <TodaysResolution />
        <TodoList />
      </RightContainer>
    </StudyplanContainer>
  );
};

export default Studyplan;
