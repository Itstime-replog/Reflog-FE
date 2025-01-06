import React, { useState } from "react";
import styled from "styled-components";
import PostModal from "../../components/PostModal";
import profileIcon from "../../assets/images/community/profile-icon.png";
import bookmarkBeforeIcon from "../../assets/images/community/bookmark-before.png";
import moreIcon from "../../assets/images/community/more-icon.png";
import heartBeforeIcon from "../../assets/images/community/heart-before.png";
import commentIcon from "../../assets/images/community/comment-icon.png";

const PostsContainer = styled.div`
  margin-top: 47px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PostGrid = styled.div`
  display: flex;
  gap: 39.14px;
`;

const PostCard = styled.div`
  width: 888.7px;
  height: 521.99px;
  box-sizing: border-box;
  background: #ffffff;
  border: 0.613924px solid #d6d6d6;
  border-radius: 12.28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 82.59px;
  height: 82.59px;
`;

const Nickname = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 22.0247px;
  line-height: 33px;
  color: #000000;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BookmarkIcon = styled.img`
  width: 21px;
  height: 30px;
`;

const MoreIcon = styled.img`
  width: 60px;
  height: 60px;
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 15.42px;
  padding-left: 56.16px;
`;

const Tag = styled.div`
  background: #ffffff;
  border-radius: 3.07px;
  border: 0.55px solid #a1a1a1;
  padding: 5px 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15.4845px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.17205px;
  color: #a1a1a1;
`;

const PostTitle = styled.h2`
  padding: 0 56.16px 0 56.16px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 26.4296px;
  line-height: 22px;
  color: #000000;
`;

const PostContent = styled.p`
  margin-top: 0;
  padding: 0 56.16px 0 56.16px;
  height: 180px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18.721px;
  line-height: 33px;
  color: #000000;
`;

const PostFooter = styled.div`
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 0.5px solid #d6d6d6;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InteractionIcons = styled.div`
  margin-left: 21px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
`;

const PostDate = styled.div`
  margin-right: 21px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 33px;
  color: rgba(0, 0, 0, 0.6);
`;

const PostList = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = () => {
    setSelectedPost({
      title: "회고 방법 고민 들어주세요ㅠ",
      content: "이번에 처음 기획부터",
    });
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <PostsContainer>
      <PostGrid>
        <PostCard onClick={openModal}>
          {/* 상단 프로필 & 북마크 & 더보기 */}
          <PostHeader>
            <ProfileSection>
              <ProfileImage src={profileIcon} alt="Profile" />
              <Nickname>리풀이</Nickname>
            </ProfileSection>
            <IconSection>
              <BookmarkIcon src={bookmarkBeforeIcon} alt="Bookmark" />
              <MoreIcon src={moreIcon} alt="More" />
            </IconSection>
          </PostHeader>

          {/* 카테고리 태그 */}
          <CategoryTags>
            <Tag>회고 고민</Tag>
            <Tag>팀 프로젝트</Tag>
          </CategoryTags>

          {/* 게시글 제목 & 내용 */}
          <PostTitle>회고 방법 고민 들어주세요ㅠ</PostTitle>
          <PostContent>
            이번에 처음 기획부터 디자인, 개발 팀 프로젝트를 시작했는데 스프린트
            회고가 필요한 상황입니다. 비슷한 상황에서 어떤 회고 방법론을 활용해
            회고를 진행하시나요?! 효율적인 회고 방법 추천해주세요!
          </PostContent>

          {/* 하단 좋아요 & 댓글 & 날짜 */}
          <PostFooter>
            <InteractionIcons>
              <Icon src={heartBeforeIcon} alt="Like" />
              <Icon src={commentIcon} alt="Comment" />
            </InteractionIcons>
            <PostDate>10월 9일</PostDate>
          </PostFooter>
        </PostCard>
      </PostGrid>
      {selectedPost && <PostModal post={selectedPost} onClose={closeModal} />}
    </PostsContainer>
  );
};

export default PostList;
