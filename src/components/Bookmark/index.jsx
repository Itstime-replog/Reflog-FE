import React from "react";
import styled from "styled-components";

const BookmarkContainer = styled.div`
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

const BookmarkItem = styled.div`
  display: flex;
  padding: 20px;
  position: relative;
  gap: 16px;
`;

const ProfileImage = styled.div`
  width: 64px;
  height: 64px;
  background: #f3f3f3;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const PostTitle = styled.h3`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
  margin: 0 0 5px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PostContent = styled.p`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: #ffffff;
  box-shadow: 0px 0px 0.816289px 0.816289px rgba(143, 144, 152, 0.1);
  border-radius: 4.08145px;
  border: none;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 12.5px;
  color: #000000;
  cursor: pointer;
  white-space: nowrap;
`;

const BookmarkPanel = ({ onClose }) => {
  const bookmarks = [
    {
      id: 1,
      title: "프로젝트에서 자주 사용하는 회고 방법론 인사이트 공유드립니다!",
      content:
        "회고 종류에 어떤 것들이 있는지 궁금한 분들! 프로젝트에서는 어떤 회고를 주로 진행하는지 궁금하신 분들 모두 아래 내용을 확인해보세...",
    },
    {
      id: 2,
      title: "학습 회고 고민",
      content:
        "요즘 부트캠프로 프로젝트를 준비 중인데 기획 과정에서 배워야 할 점이 많더라구요...그 과정에서 내가 어떤 점을 모르고 아는지 파악하...",
    },
  ];

  return (
    <BookmarkContainer>
      <TitleArea>
        <Title>북마크</Title>
        <Divider />
      </TitleArea>
      <ScrollContainer>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id}>
            <ProfileImage />
            <ContentContainer>
              <PostTitle>{bookmark.title}</PostTitle>
              <PostContent>{bookmark.content}</PostContent>
            </ContentContainer>
            <RemoveButton>북마크 제거</RemoveButton>
          </BookmarkItem>
        ))}
      </ScrollContainer>
    </BookmarkContainer>
  );
};

export default BookmarkPanel;
