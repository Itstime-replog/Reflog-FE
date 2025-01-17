import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserName } from "../../../../utils/auth";
import lockIcon from "../../../../assets/images/badge/lock.png";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 27px;
  line-height: 32px;
  color: #0059ff;
  margin-bottom: 13px;
  margin-left: -120px;
  margin-top: -40px;
  text-align: left;
`;

const Subtitle = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #8f9097;
  margin-bottom: 90px;
  margin-left: -120px;
  text-align: left;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 130px;
  row-gap: 40px;
  margin-top: 20px;
`;

const BadgeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BadgeBox = styled.div`
  width: 106px;
  height: 106px;
  background: #f8f8f8;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const LockIconContainer = styled.div`
  width: 66px;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LockIcon = styled.img`
  width: 90px;
  height: 90px;
`;

const BadgeName = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);
`;

const MissionBadge = () => {
  const [userName, setUserName] = useState("사용자");

  useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const badges = [
    { id: 1, name: "첫 만남", isLocked: true },
    { id: 2, name: "회고쟁이", isLocked: true },
    { id: 3, name: "회고매니아", isLocked: true },
    { id: 4, name: "소통의 왕", isLocked: true },
    { id: 5, name: "주간 리포터", isLocked: true },
    { id: 6, name: "월간 리포터", isLocked: true },
    { id: 7, name: "습관의 시작", isLocked: true },
    { id: 8, name: "동기의 시작", isLocked: true },
    { id: 9, name: "하트의 힘", isLocked: true },
    { id: 10, name: "회고스타터", isLocked: true },
    { id: 11, name: "회고리뷰어", isLocked: true },
    { id: 12, name: "댓글의 힘", isLocked: true },
  ];

  return (
    <Container>
      <Content>
        <Title>미션을 클리어하고 배지를 획득하세요!</Title>
        <Subtitle>
          총 12개의 미션이 {userName}님을 기다리고 있어요. 원하는 미션을 하나씩
          달성해 보세요!
        </Subtitle>
        <BadgeGrid>
          {badges.map((badge) => (
            <BadgeItem key={badge.id}>
              <BadgeBox>
                {badge.isLocked && (
                  <LockIconContainer>
                    <LockIcon src={lockIcon} alt="잠금" />
                  </LockIconContainer>
                )}
              </BadgeBox>
              <BadgeName>{badge.name}</BadgeName>
            </BadgeItem>
          ))}
        </BadgeGrid>
      </Content>
    </Container>
  );
};

export default MissionBadge;
