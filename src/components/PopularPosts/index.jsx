import React, { useState } from "react";
import styled from "styled-components";
import profileIcon from "../../assets/images/community/profile-icon.png";
import bookmarkBeforeIcon from "../../assets/images/community/bookmark-before.png";
import bookmarkAfterIcon from "../../assets/images/community/bookmark-after.png";
import moreIcon from "../../assets/images/community/more-icon.png";
import heartBeforeIcon from "../../assets/images/community/heart-before.png";
import commentIcon from "../../assets/images/community/comment-icon.png";
import postTypeIcon from "../../assets/images/community/postType-icon.png";
import studyTypeIcon from "../../assets/images/community/studyType-icon.png";

const PopularPostsContainer = styled.div`
  margin-top: 31px;
`;

const PostGrid = styled.div`
  display: flex;
  gap: 23.39px;
`;

const PostCard = styled.div`
  width: 496px;
  height: auto;
  box-sizing: border-box;
  background: #ffffff;
  border: 0.613924px solid #d6d6d6;
  border-radius: 12.28px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const ProfileImage = styled.img`
  width: 46.04px;
  height: 46.04px;
`;

const Nickname = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12.2785px;
  line-height: 18px;
  color: #000000;
  padding-bottom: 5px;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BookmarkIcon = styled.img`
  width: 12.2px;
  height: 18.09px;
`;

const MoreIcon = styled.img`
  width: 38.93px;
  height: 38.93px;
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.div`
  background: #ffffff;
  border-radius: 3.07px;
  border: 0.55px solid #a1a1a1;
  padding: 5px 15px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 10px;
  display: flex;
  align-items: center;
  letter-spacing: 0.0959159px;
  color: #a1a1a1;
  gap: 5px;
`;

const PostTitle = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 14.7342px;
  line-height: 12px;
  color: #000000;
  margin: 18px 0 0 0;
`;

const PostContent = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
`;

const PostFooter = styled.div`
  width: calc(100% + 40px);
  margin-left: -20px;
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
  gap: 5px;
  align-items: center;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const PostDate = styled.div`
  margin-right: 21px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.6);
`;

const Count = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #b8b8b8;
  padding-right: 4px;
`;

const PopularPosts = () => {
  const posts = [
    {
      id: 1,
      writer: "yooni",
      title: "학습 회고 고민",
      content: (
        <>
          요즘 부트캠프로 프로젝트를 준비 중인데 기획 과정에서 배워야 할 점이
          많더라구요...
          <br />그 과정에서 내가 어떤 점을 모르고 아는지 파악하면서 학습 계획
          세우고 싶은데 기획 공부하시는 <br />
          분들 플젝 회고 어떻게 진행하시나요ㅠ <br />팁 좀 알려주세요!
        </>
      ),
      postType: "회고고민",
      likes: 4,
      comments: 4,
      date: "1월 15일",
    },
    {
      id: 2,
      writer: "yunju",
      title: "프로젝트에서 자주 사용하는 회고 방법론 인사이트 공유드립니다!",
      content: (
        <>
          회고 종류에 어떤 것들이 있는지 궁금한 분들!
          <br />
          프로젝트에서는 어떤 회고를 주로 진행하는지 궁금하신 분들 모두 아래
          내용을 확인해보세요.
          <br />
          실제 현업에서 자주 사용하고 있는 회고 방법이니 참고해보세요!
          <br />
          <br />
        </>
      ),
      postType: "인사이트",
      likes: 11,
      comments: 5,
      date: "1월 14일",
    },
  ];

  // 북마크 상태를 객체 형태로 관리
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prevBookmarks) => ({
      ...prevBookmarks,
      [postId]: !prevBookmarks[postId], // 상태 반전
    }));
  };

  return (
    <PopularPostsContainer>
      <PostGrid>
        {posts.map((post) => (
          <PostCard key={post.id}>
            {/* 상단 프로필 & 북마크 & 더보기 */}
            <PostHeader>
              <ProfileSection>
                <ProfileImage src={profileIcon} alt="Profile" />
                <Nickname>{post.writer}</Nickname>
              </ProfileSection>
              <IconSection>
                <BookmarkIcon
                  src={
                    bookmarkedPosts[post.id]
                      ? bookmarkAfterIcon
                      : bookmarkBeforeIcon
                  }
                  alt="Bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(post.id); // 해당 게시물의 북마크 상태 토글
                  }}
                />
                <MoreIcon src={moreIcon} alt="More" />
              </IconSection>
            </PostHeader>

            {/* 카테고리 태그 */}
            <CategoryTags>
              <Tag>
                <img src={postTypeIcon} alt="" width="10" height="10" />
                {post.postType}
              </Tag>
            </CategoryTags>

            {/* 게시글 제목 & 내용 */}
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>

            {/* 하단 좋아요 & 댓글 & 날짜 */}
            <PostFooter>
              <InteractionIcons>
                <Icon src={heartBeforeIcon} alt="Like" />
                <Count>{post.likes}</Count>
                <Icon src={commentIcon} alt="Comment" />
                <Count>{post.comments}</Count>
              </InteractionIcons>
              <PostDate>{post.date}</PostDate>
            </PostFooter>
          </PostCard>
        ))}
      </PostGrid>
    </PopularPostsContainer>
  );
};

export default PopularPosts;
