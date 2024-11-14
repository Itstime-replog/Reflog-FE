import React, { useState } from "react";
import styled from "styled-components";
import plusIcon from "../../assets/images/plus-icon.png";
import cancelIcon from "../../assets/images/cancel-icon.png";
import checkIcon from "../../assets/images/check-icon.png";

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
  appearance: none; /* 기본 체크박스 스타일 제거 */
  width: 18px;
  height: 18px;
  margin-right: 10px;
  transform: scale(1.3);
  border: 1.5px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  /* 체크 상태 시 커스텀 체크 아이콘 추가 */
  &:checked {
    background-color: #669cff;
    border-color: #669cff;
    background-image: url(${checkIcon}); /* 체크 아이콘 이미지 */
    background-size: 70%; /* 아이콘 크기 조정 */
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
  flex: 1; /* 텍스트 입력 필드가 가능한 공간을 차지하도록 */
  margin-right: 10px;
`;

const CancelIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const TodaysResolution = () => {
  const [todos, setTodos] = useState([]); // 투두 리스트 상태

  // 새로운 투두 항목 추가
  const addTodo = () => {
    setTodos([...todos, ""]);
  };

  // 각 투두 항목의 텍스트 변경 시 상태 업데이트
  const handleTodoChange = (index, value) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = value;
    setTodos(updatedTodos);
  };

  // 투두 항목 삭제
  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <TitleContainer>
        <Title>투두리스트</Title>
        <PlusIcon src={plusIcon} alt="Add" onClick={addTodo} />
      </TitleContainer>
      <TodoContainer>
        {todos.map((todo, index) => (
          <TodoItem key={index}>
            <Checkbox type="checkbox" />
            <TodoInput
              type="text"
              value={todo}
              onChange={(e) => handleTodoChange(index, e.target.value)}
              placeholder="할 일 입력"
            />
            <CancelIcon
              src={cancelIcon}
              alt="Delete"
              onClick={() => removeTodo(index)}
            />
          </TodoItem>
        ))}
      </TodoContainer>
    </div>
  );
};

export default TodaysResolution;
