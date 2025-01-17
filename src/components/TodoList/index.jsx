import React, { useState, useEffect } from "react";
import styled from "styled-components";
import plusIcon from "../../assets/images/todolist/plus-icon.png";
import cancelIcon from "../../assets/images/common/cancel-icon.png";
import checkIcon from "../../assets/images/todolist/check-icon.png";
import {
  fetchTodoList,
  createTodo,
  checkTodo,
  deleteTodo,
} from "../../apis/todoListApi";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 25px;
  margin-right: 15px;
`;

const Title = styled.div`
  text-align: left;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.2px;
  color: #1f2024;
  padding-bottom: 5px;
`;

const PlusIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const TodoContainer = styled.div`
  margin-top: 10px;
  margin-right: 16px;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  transform: scale(1.3);
  border: 1.5px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #669cff;
    border-color: #669cff;
    background-image: url(${checkIcon});
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const TodoInput = styled.input`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  color: #494a50;
  border: none;
  outline: none;
  flex: 1;
  margin-right: 10px;
`;

const CancelIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const TodoList = ({ todos, selectedDate, setTodos }) => {
  console.log("초기 todos 상태:", todos);

  const [error, setError] = useState(null); // 에러 상태
  /*
  // 동적으로 memberId와 date 설정
  const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 가져오기
  const date = new Date().toISOString().split("T")[0]; // 현재 날짜 (YYYY-MM-DD)

  // API로부터 투두리스트 받아오기
  useEffect(() => {
    const getTodoList = async () => {
      try {
        if (!memberId) {
          throw new Error("로그인이 필요합니다. Member ID를 찾을 수 없습니다.");
        }

        const data = await fetchTodoList(memberId, date);

        if (data?.isSuccess) {
          setTodos(data.result || []); // 결과가 없을 경우 빈 배열로 설정
        } else {
          setError(data.message || "투두리스트 조회에 실패했습니다.");
        }
      } catch (error) {
        setError("투두리스트 조회 중 에러가 발생했습니다.");
        console.error(error.message);
      }
    };

    getTodoList();
  }, [memberId, date]);*/

  // 하드코딩된 memberId와 현재 날짜
  const hardcodedMemberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1";
  const date = new Date().toISOString().split("T")[0]; // 현재 날짜 (YYYY-MM-DD)

  // 투두리스트 조회
  useEffect(() => {
    const getTodoList = async () => {
      if (!selectedDate) return;

      try {
        const fetchedTodos = await fetchTodoList(selectedDate);
        console.log("조회된 투두리스트:", fetchedTodos);

        setTodos(fetchedTodos);
      } catch (error) {
        console.error("투두 조회 에러:", error.message);
        setError("투두 리스트를 불러오지 못했습니다.");
      }
    };

    getTodoList();
  }, [selectedDate]);

  // 새로운 투두 항목 추가
  const addTodo = async () => {
    const newContent = "할 일 입력";
    try {
      const response = await createTodo(newContent);
      console.log("투두 생성 응답:", response);

      if (response?.isSuccess) {
        const updatedTodos = await fetchTodoList(selectedDate);
        console.log("새로운 투두 생성 후 조회된 리스트:", updatedTodos);
        setTodos(updatedTodos);
      }
    } catch (error) {
      console.error("투두 생성 에러:", error.message);
      setError("투두 생성 중 에러가 발생했습니다.");
    }
  };

  // 각 투두 항목의 텍스트 변경 시 상태 업데이트
  const handleTodoChange = async (index, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index].content = value;
    setTodos(updatedTodos);

    try {
      // 변경된 내용을 서버에 업데이트 (추가적인 API 필요 시 구현 가능)
      console.log("투두 내용 업데이트:", updatedTodos[index]);
    } catch (error) {
      console.error("투두 업데이트 중 에러:", error.message);
    }
  };

  // 투두 체크
  const handleCheckTodo = async (todolistId) => {
    if (!todolistId) {
      console.error("체크하려는 todolistId가 제공되지 않았습니다.");
      return;
    }

    try {
      console.log("체크 요청할 todolistId:", todolistId); // 디버깅용
      const response = await checkTodo(todolistId);

      if (response?.isSuccess) {
        console.log("투두 체크 성공:", response);
        setTodos((prev) =>
          prev.map((todo) =>
            todo.todolistId === todolistId
              ? { ...todo, status: !todo.status }
              : todo
          )
        );
      } else {
        console.error("투두 체크 실패:", response.message);
      }
    } catch (error) {
      console.error("투두 체크 에러:", error.message);
    }
  };

  // 투두 삭제
  const handleDeleteTodo = async (todolistId) => {
    try {
      const response = await deleteTodo(todolistId);
      console.log("투두 삭제 응답:", response);

      if (response?.isSuccess) {
        setTodos((prev) =>
          prev.filter((todo) => todo.todolistId !== todolistId)
        );
      }
    } catch (error) {
      console.error("투두 삭제 에러:", error.message);
      setError("투두 삭제 중 에러가 발생했습니다.");
    }
  };

  return (
    <div>
      <TitleContainer>
        <Title>투두리스트</Title>
        <PlusIcon src={plusIcon} alt="Add" onClick={addTodo} />
      </TitleContainer>
      <TodoContainer>
        {todos.length > 0 &&
          todos.map((todo, index) => (
            <TodoItem key={todo.todolistId}>
              <Checkbox
                type="checkbox"
                checked={todo.status} // 상태에 따라 체크 표시
                onChange={() => handleCheckTodo(todo.todolistId)} // 체크 시 API 호출
              />
              <TodoInput
                type="text"
                value={todo.content}
                onChange={(e) => handleTodoChange(index, e.target.value)}
                placeholder="할 일 입력"
              />
              <CancelIcon
                src={cancelIcon}
                alt="Delete"
                onClick={() => {
                  console.log("삭제 요청할 todo ID:", todo.todolistId);
                  handleDeleteTodo(todo.todolistId);
                }}
              />
            </TodoItem>
          ))}
      </TodoContainer>
    </div>
  );
};

export default TodoList;
