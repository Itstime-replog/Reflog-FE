import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 100px;
`;

const FilterContainer = styled.div`
  width: 514px;
  height: 46px;
  position: relative;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  margin-left: -930px; // 왼쪽으로 이동
  margin-top: -50px;
  margin-bottom: 160px;
`;

const FilterButton = styled.button`
  width: 251px;
  height: 38px;
  position: absolute;
  top: 4px;
  left: ${(props) => (props.$isRight ? "259px" : "4px")};
  background: ${(props) => (props.$active ? "#E5EEFF" : "transparent")};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  span {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: ${(props) => (props.$active ? "#0059FF" : "#A1A1A1")};
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 31px;
`;

const EmptyCircle = styled.div`
  width: 150px;
  height: 150px;
  background: #f2f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: #0059ff;
  border-radius: 50%;
`;

const EmptyText = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #494a4f;
  margin: 0;
`;

const CommunityLog = () => {
  const [activeFilter, setActiveFilter] = useState("written");

  return (
    <Container>
      <FilterContainer>
        <FilterButton
          onClick={() => setActiveFilter("written")}
          $active={activeFilter === "written"}
        >
          <span>내가 작성한 글</span>
        </FilterButton>
        <FilterButton
          onClick={() => setActiveFilter("liked")}
          $active={activeFilter === "liked"}
          $isRight
        >
          <span>좋아요 누른 글</span>
        </FilterButton>
      </FilterContainer>

      <EmptyStateContainer>
        <EmptyCircle>
          <DotContainer>
            <Dot />
            <Dot />
            <Dot />
          </DotContainer>
        </EmptyCircle>
        <EmptyText>아직 커뮤니티 활동 이력이 없어요!</EmptyText>
      </EmptyStateContainer>
    </Container>
  );
};

export default CommunityLog;
