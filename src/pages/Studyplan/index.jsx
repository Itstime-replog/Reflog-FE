import React, { useState, useEffect } from "react";
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
  const [memberId, setMemberId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // YYYY-MM-DD 형식의 오늘 날짜로 초기화
  const [todos, setTodos] = useState([]); // 선택된 날짜의 투두리스트 데이터

  // 토큰 만료 여부 확인
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const tokenParts = accessToken.split(".");
      if (tokenParts.length === 3) {
        try {
          const tokenPayload = JSON.parse(atob(tokenParts[1]));
          const expirationTime = tokenPayload.exp;
          const currentTime = Math.floor(Date.now() / 1000);

          console.log(`토큰 만료 시간 (유닉스 타임스탬프): ${expirationTime}`);
          console.log(
            expirationTime > currentTime
              ? "토큰이 아직 유효합니다."
              : "토큰이 만료되었습니다."
          );

          if (expirationTime <= currentTime) {
            alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
            localStorage.clear();
            window.location.href = "/login";
          }
        } catch (error) {
          console.error("토큰 디코딩 중 오류 발생:", error);
        }
      } else {
        console.error("올바르지 않은 토큰 형식입니다.");
      }
    } else {
      console.log("토큰이 없습니다.");
      alert("로그인이 필요합니다.");
      localStorage.clear();
      window.location.href = "/login";
    }
  }, []);
  /*
  // 로그인 시 로컬 스토리지에 저장된 memberId 가져오기
  useEffect(() => {
    const storedMemberId = localStorage.getItem("memberId");
    if (storedMemberId) {
      setMemberId(storedMemberId);
    } else {
      console.warn("memberId가 없습니다. 로그인이 필요합니다.");
    }
  }, []);

  // 선택된 날짜가 변경될 때마다 투두리스트를 가져오는 함수
  useEffect(() => {
    const fetchTodos = async () => {
      if (!memberId) {
        console.warn("memberId가 없습니다. 로그인이 필요합니다.");
        setTodos([]); // memberId가 없을 경우 투두리스트를 초기화
        return;
      }

      try {
        const response = await fetch(
          `/api/todos?date=${selectedDate}&memberId=${memberId}`
        );
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setTodos(data.todos || []); // 받아온 투두 데이터로 업데이트
      } catch (error) {
        console.error("투두리스트를 가져오는 중 에러 발생:", error);
        setTodos([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchTodos();
  }, [selectedDate, memberId]);*/

  // 하드코딩된 memberId
  const hardcodedMemberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1";

  // 선택된 날짜가 변경될 때마다 투두리스트를 가져오는 함수
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `/api/todos?date=${selectedDate}&memberId=${memberId}`
        );
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setTodos(data.todos || []); // 받아온 투두 데이터로 업데이트
      } catch (error) {
        console.error("투두리스트를 가져오는 중 에러 발생:", error);
        setTodos([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchTodos();
  }, [selectedDate, memberId]); // 날짜 또는 memberId 변경 시 다시 호출

  return (
    <StudyplanContainer>
      {/* 캘린더 컴포넌트에 onDateChange 콜백 전달 */}
      <CalendarComponent
        onDateChange={setSelectedDate}
        memberId={memberId} // memberId 전달
      />
      <RightContainer>
        <TodaysResolution />
        {/* TodoList에 선택된 날짜와 해당 투두 데이터를 전달 */}
        <TodoList
          todos={todos}
          selectedDate={selectedDate}
          setTodos={setTodos}
        />
      </RightContainer>
    </StudyplanContainer>
  );
};

export default Studyplan;
