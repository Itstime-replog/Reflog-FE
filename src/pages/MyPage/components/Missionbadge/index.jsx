import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserName } from "../../../../utils/auth";
import lockIcon from "../../../../assets/images/badge/lock.png";
import badge1 from "../../../../assets/images/badge/badge1.png";
import badge2 from "../../../../assets/images/badge/badge2.png";
import badge3 from "../../../../assets/images/badge/badge3.png";
import badge4 from "../../../../assets/images/badge/badge4.png";
import badge5 from "../../../../assets/images/badge/badge5.png";
import badge6 from "../../../../assets/images/badge/badge6.png";
import badge7 from "../../../../assets/images/badge/badge7.png";
import badge8 from "../../../../assets/images/badge/badge8.png";
import badge9 from "../../../../assets/images/badge/badge9.png";
import badge10 from "../../../../assets/images/badge/badge10.png";
import badge11 from "../../../../assets/images/badge/badge11.png";
import badge12 from "../../../../assets/images/badge/badge12.png";

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
  margin-left: -110px;
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
  margin-left: -110px;
  text-align: left;
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 110px;
  row-gap: 40px;
  margin-top: 20px;
  margin-right: 70px;
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
  cursor: ${(props) => (props.id === 1 ? "pointer" : "default")};
`;

const IconContainer = styled.div`
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BadgeIcon = styled.img`
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
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const badgeImages = {
    1: badge1,
    2: badge2,
    3: badge3,
    4: badge4,
    5: badge5,
    6: badge6,
    7: badge7,
    8: badge8,
    9: badge9,
    10: badge10,
    11: badge11,
    12: badge12,
  };

  const badges = [
    { id: 1, name: "첫 만남" },
    { id: 2, name: "회고쟁이" },
    { id: 3, name: "회고매니아" },
    { id: 4, name: "소통의 왕" },
    { id: 5, name: "주간 리포터" },
    { id: 6, name: "월간 리포터" },
    { id: 7, name: "습관의 시작" },
    { id: 8, name: "동기의 시작" },
    { id: 9, name: "하트의 힘" },
    { id: 10, name: "회고스타터" },
    { id: 11, name: "회고리뷰어" },
    { id: 12, name: "댓글의 힘" },
  ];

  const handleFirstBadgeClick = () => {
    setIsUnlocked(!isUnlocked);
  };

  const getIconForBadge = (badgeId) => {
    if (!isUnlocked) {
      return lockIcon;
    }
    return badgeImages[badgeId];
  };

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
              <BadgeBox
                id={badge.id}
                onClick={badge.id === 1 ? handleFirstBadgeClick : undefined}
              >
                <IconContainer>
                  <BadgeIcon src={getIconForBadge(badge.id)} alt={badge.name} />
                </IconContainer>
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
