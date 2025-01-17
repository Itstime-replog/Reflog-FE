import React, { useState } from "react";
import styled from "styled-components";
import ProfileSection from "./components/ProfileSection";
import ProfileEdit from "./components/ProfileEdit";
import NotificationSettings from "./components/NotificationSettings";
import CommunityLog from "./components/CommunityLog";
import MissionBadge from "./components/Missionbadge";
import KakaoIcon from "../../assets/images/common/kakao2.png";

const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 246px;
  right: 0;
  bottom: 0;
  background: #ffffff;
  min-height: 100vh;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 136px;
  background: #ffffff;
  display: flex;
  justify-content: center;
`;

const ContentArea = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 1600px;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  letter-spacing: 0.2px;
  color: #000000;
  margin: 30px 0 40px;
`;

const TabContainer = styled.div`
  position: relative;
  margin-bottom: 80px;
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Tab = styled.button`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.2px;
  color: ${(props) => (props.$active ? "#0059FF" : "rgba(0, 0, 0, 0.7)")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 0 19px 0;
  width: 100%;
  text-align: center;
`;

const TabBorder = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #d9d9d9;
  z-index: 1;
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: ${(props) => (props.$active ? "#0059FF" : "transparent")};
  z-index: 2;
`;

const TabWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SettingsList = styled.div`
  width: 550px;
  margin: 40px 0;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const SettingText = styled.span`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20px;
  line-height: 20px;
  color: #000000;
`;

const ChevronIcon = styled.span`
  color: #b7b7b7;
  font-size: 24px;
`;

const KakaoButton = styled.button`
  width: 363px;
  height: 48.5px;
  background: #ffe812;
  border-radius: 6.06px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    opacity: 0.9;
  }
`;

const KakaoIconImg = styled.img`
  width: 20px;
  height: 20px;
`;

const ButtonText = styled.span`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 14.78px;
  line-height: 18px;
  letter-spacing: 0.128564px;
  color: #000000;
`;

const MyPage = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("info");
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  const handleKakaoChat = () => {
    window.open("https://pf.kakao.com/_kTCCn", "_blank");
  };

  const handleNoticeClick = () => {
    window.open(
      "https://coherent-spaghetti-92d.notion.site/168f596f4e4b803b9439e4d1fa805d29",
      "_blank"
    );
  };

  const handleTermsClick = () => {
    window.open(
      "https://coherent-spaghetti-92d.notion.site/16af596f4e4b802791eec85887395293",
      "_blank"
    );
  };

  const handlePrivacyClick = () => {
    window.open(
      "https://coherent-spaghetti-92d.notion.site/12cf596f4e4b80fb9614f55a4a973653",
      "_blank"
    );
  };

  const renderContent = () => {
    if (activeTab === "info") {
      return !isEditing ? (
        <>
          <ProfileSection
            setIsLoggedIn={setIsLoggedIn}
            onEditClick={handleEditClick}
          />
          <SettingsList>
            <SettingItem onClick={() => setShowNotificationSettings(true)}>
              <SettingText>알림 설정</SettingText>
              <ChevronIcon>›</ChevronIcon>
            </SettingItem>
            <SettingItem onClick={handleNoticeClick}>
              <SettingText>공지사항</SettingText>
              <ChevronIcon>›</ChevronIcon>
            </SettingItem>
            <SettingItem onClick={handleTermsClick}>
              <SettingText>이용약관</SettingText>
              <ChevronIcon>›</ChevronIcon>
            </SettingItem>
            <SettingItem onClick={handlePrivacyClick}>
              <SettingText>개인정보 처리방침</SettingText>
              <ChevronIcon>›</ChevronIcon>
            </SettingItem>
          </SettingsList>
          <KakaoButton onClick={handleKakaoChat}>
            <KakaoIconImg src={KakaoIcon} alt="Kakao" />
            <ButtonText>리플로그 카카오톡 채널 문의하기</ButtonText>
          </KakaoButton>
        </>
      ) : (
        <ProfileEdit onCancel={handleEditComplete} />
      );
    } else if (activeTab === "activity") {
      return <CommunityLog />;
    } else if (activeTab === "mission") {
      return <MissionBadge />;
    }
    return null;
  };

  return (
    <PageWrapper>
      <PageContainer>
        <ContentArea>
          <PageTitle>마이페이지</PageTitle>

          <TabContainer>
            <TabList>
              <TabWrapper>
                <Tab
                  $active={activeTab === "info"}
                  onClick={() => setActiveTab("info")}
                >
                  내 정보
                </Tab>
                <TabIndicator $active={activeTab === "info"} />
              </TabWrapper>
              <TabWrapper>
                <Tab
                  $active={activeTab === "activity"}
                  onClick={() => setActiveTab("activity")}
                >
                  커뮤니티 활동 로그
                </Tab>
                <TabIndicator $active={activeTab === "activity"} />
              </TabWrapper>
              <TabWrapper>
                <Tab
                  $active={activeTab === "mission"}
                  onClick={() => setActiveTab("mission")}
                >
                  미션/배지
                </Tab>
                <TabIndicator $active={activeTab === "mission"} />
              </TabWrapper>
            </TabList>
            <TabBorder />
          </TabContainer>

          <ContentSection>{renderContent()}</ContentSection>

          {showNotificationSettings && (
            <NotificationSettings
              onClose={() => setShowNotificationSettings(false)}
            />
          )}
        </ContentArea>
      </PageContainer>
    </PageWrapper>
  );
};

export default MyPage;
