import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 828px;
  background: #FFFFFF;
  border-radius: 30px 30px 0px 0px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: 40px 70px;
`;

const Title = styled.h2`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 32px;
`;

const Subtitle = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #8F9098;
  margin: 34px 0;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #E8E8E8;
  margin: 32px 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 27px;
  right: 54px;
  width: 62px;
  height: 62px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: #B8B8B8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const NotificationsContainer = styled.div`
  margin-top: 120px;
  padding: 0 633px;
`;

const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 45px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const NotificationText = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.9);
`;

const ToggleWrapper = styled.button`
  width: 73.8px;
  height: 41px;
  background: ${props => props.$active ? '#0059FF' : '#A1A1A1'};
  border-radius: 205px;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;
`;

const ToggleButton = styled.div`
  position: absolute;
  width: 32.8px;
  height: 32.8px;
  left: ${props => props.$active ? '36.9px' : '4.1px'};
  top: 4.1px;
  background: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
  border-radius: 205px;
  transition: left 0.2s ease-in-out;
`;

const NotificationSettings = ({ onClose }) => {
  const [notifications, setNotifications] = useState({
    all: false,
    community: false,
    analysis: true,
    plan: true,
    review: false,
    mission: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const notificationItems = [
    { key: 'all', text: '전체 알림' },
    { key: 'community', text: '커뮤니티 활동 알림' },
    { key: 'analysis', text: '분석보고서 알림' },
    { key: 'plan', text: '학습플랜 D-day 알림' },
    { key: 'review', text: '회고일지 작성 이메일 알림' },
    { key: 'mission', text: '미션/배지 알림' }
  ];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ContentWrapper>
          <Title>알림 설정</Title>
          <Subtitle>
            알림 수신 동의와 함께 개인정보 마케팅 활용에 동의하시게 됩니다.
          </Subtitle>
          <Divider />
          <CloseButton onClick={onClose}>×</CloseButton>

          <NotificationsContainer>
            {notificationItems.map((item) => (
              <NotificationItem key={item.key}>
                <NotificationText>{item.text}</NotificationText>
                <ToggleWrapper 
                  $active={notifications[item.key]}
                  onClick={() => handleToggle(item.key)}
                >
                  <ToggleButton $active={notifications[item.key]} />
                </ToggleWrapper>
              </NotificationItem>
            ))}
          </NotificationsContainer>
        </ContentWrapper>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default NotificationSettings;