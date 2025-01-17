import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: absolute;
  width: 450px;
  height: 380px;
  right: 0;
  top: 85px;
  background: #ffffff;
  box-shadow: 0px 0px 3px 1px rgba(143, 144, 152, 0.15);
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const TitleArea = styled.div`
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 20px;
  color: #000000;
  padding: 16px 26px;
  margin: 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #cdcdcd;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 19px;
    background: #f8f8f8;
  }

  &::-webkit-scrollbar-thumb {
    background: #a1a1a1;
    border-radius: 5px;
    width: 9px;
  }
`;

const NotificationItem = styled.div`
  display: flex;
  padding: 16px 20px;
  align-items: center;
  gap: 16px;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  background: #f3f3f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const NotificationText = styled.p`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NotificationPanel = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: "like",
      text: "지윤 님이 글 제목에 좋아요를 눌렀습니다.",
      icon: "💬",
    },
    {
      id: 2,
      type: "comment",
      text: "지윤 님이 글 제목에 댓글을 남겼습니다.",
      icon: "💬",
    },
    {
      id: 3,
      type: "study",
      text: "오늘은 회계원리 중간고사 D-day 입니다!",
      icon: "📅",
    },
    {
      id: 4,
      type: "badge",
      text: '"미션제목" 미션을 달성해 배지를 획득했어요!',
      icon: "🏅",
    },
  ];

  return (
    <NotificationContainer>
      <TitleArea>
        <Title>알림</Title>
        <Divider />
      </TitleArea>
      <ScrollContainer>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <IconContainer>{notification.icon}</IconContainer>
            <NotificationText>{notification.text}</NotificationText>
          </NotificationItem>
        ))}
      </ScrollContainer>
    </NotificationContainer>
  );
};

export default NotificationPanel;
