import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "../../components/PostModal";
import profileIcon from "../../assets/images/community/profile-icon.png";
import bookmarkBeforeIcon from "../../assets/images/community/bookmark-before.png";
import moreIcon from "../../assets/images/community/more-icon.png";
import heartBeforeIcon from "../../assets/images/community/heart-before.png";
import commentIcon from "../../assets/images/community/comment-icon.png";
import postTypeIcon from "../../assets/images/community/postType-icon.png";
import studyTypeIcon from "../../assets/images/community/studyType-icon.png";

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
  flex-direction: column;
  align-items: center;
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
  gap: 13px;
  padding-left: 56.16px;
`;

const Tag = styled.div`
  background: #ffffff;
  border-radius: 3.07px;
  border: 0.55px solid #a1a1a1;
  padding: 5px 15px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15.4845px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.17205px;
  color: #a1a1a1;
  gap: 6px;

  img {
    opacity: 0.6; /* 아이콘도 연하게 */
    filter: brightness(80%); /* 밝기 조절 */
    width: 15.5px;
    height: auto;
  }
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

const PostContentWrapper = styled.div`
  position: relative;
  height: 180px;
  overflow: hidden;
`;

const PostContent = styled.p`
  margin-top: 0;
  padding: 0 56.16px 0 56.16px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18.721px;
  line-height: 33px;
  color: #000000;
  max-height: calc(33px * 4); /* 최대 4줄까지만 표시하도록 높이 제한 */
  overflow: hidden;
  text-overflow: clip;
  white-space: normal;
  word-break: break-word;
`;

const ReadMore = styled.span`
  position: absolute;
  bottom: 20px;
  left: 56.16px;
  background: none;
  color: #a4a4a4;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
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

const PostList = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);

  const openModal = (e) => {
    e.stopPropagation();
    setSelectedPost({
      title: "회고 방법 고민 들어주세요ㅠ",
      content: "이번에 처음 기획부터 디자인",
    });
  };

  useEffect(() => {
    const newPost = JSON.parse(localStorage.getItem("newPost"));
    if (newPost) {
      setLocalPosts((prevPosts) => [newPost, ...prevPosts]);
      localStorage.removeItem("newPost");
    }
  }, []);

  return (
    <PostsContainer>
      <PostGrid>
        {posts.map((post) => (
          <PostCard onClick={openModal} key={post.id}>
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
              {post.postType.map((type) => (
                <Tag key={type}>
                  <img src={postTypeIcon} alt="" width="16" height="16" />
                  {type}
                </Tag>
              ))}
              {post.studyType.map((type) => (
                <Tag key={type}>
                  <img src={studyTypeIcon} alt="" width="16" height="16" />
                  {type}
                </Tag>
              ))}
            </CategoryTags>

            {/* 게시글 제목 & 내용 */}
            <PostTitle>{post.title}</PostTitle>
            <PostContentWrapper>
              <PostContent>
                {post.content.length > 100
                  ? post.content.substring(0, 100) + "..."
                  : post.content}
              </PostContent>
              {post.content.length > 100 && (
                <ReadMore onClick={openModal}>...더보기</ReadMore>
              )}
            </PostContentWrapper>

            {/* 하단 좋아요 & 댓글 & 날짜 */}
            <PostFooter>
              <InteractionIcons>
                <Icon src={heartBeforeIcon} alt="Like" />
                <Icon src={commentIcon} alt="Comment" />
              </InteractionIcons>
              <PostDate>{post.date}</PostDate>
            </PostFooter>
          </PostCard>
        ))}
      </PostGrid>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </PostsContainer>
  );
};

export default PostList;
