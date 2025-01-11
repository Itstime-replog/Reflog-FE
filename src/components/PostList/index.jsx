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
import fileIcon from "../../assets/images/community/file-icon.png";

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
  min-height: 521.99px; /* 동적으로 높이가 늘어나도록 변경 */
  box-sizing: border-box;
  background: #ffffff;
  border: 0.613924px solid #d6d6d6;
  border-radius: 12.28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-bottom: 60px; /* PostFooter를 위한 공간 확보 */
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
  margin: 10px 0;
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
    opacity: 0.6;
    filter: brightness(80%);
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
  overflow: hidden;
  flex-grow: 1;
  max-height: calc(33px * 4 + 20px); /* "더보기"를 위한 추가 공간 */
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  padding-bottom: 20px; /* Footer와 겹치지 않도록 여유 공간 추가 */
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
  white-space: pre-wrap;
  word-break: break-word;
`;

const ReadMore = styled.span`
  position: relative;
  left: 56.16px;
  color: #a4a4a4;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
`;

const MediaContainer = styled.div`
  display: ${({ showMedia }) =>
    showMedia ? "flex" : "none"}; /* 4줄 이상이면 숨김 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  width: 90%;
  height: ${({ height }) => height}px; /* 텍스트 높이에 따라 유동 조정 */
  overflow: hidden;
  margin: 0 auto;
  position: relative;
`;

const PreviewImage = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  display: block;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const FileList = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 0 10px 10px;
  font-size: 14px;
  color: #333;
  width: 368px;
  background: #f7faff;
  border: 0.915423px solid #ccdeff;
  border-radius: 4.57711px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
`;

const FileInnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FileIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const FileName = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #000000;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 10.9851px;
  line-height: 18px;
  color: #8f9097;
`;

const PostFooter = styled.div`
  width: 100%;
  height: 40px; /* 고정된 높이 설정 */
  padding: 15px 0;
  border-top: 0.5px solid #d6d6d6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: absolute; /* 하단에 고정 */
  bottom: 0; /* 카드의 하단에 위치 */
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

  const openModal = (e, post) => {
    e.stopPropagation();
    setSelectedPost(post); // post 객체를 상태로 설정
  };

  return (
    <PostsContainer>
      <PostGrid>
        {posts.map((post) => {
          const isLongText = post.content.split("\n").length > 4;
          const showMedia = !isLongText;

          return (
            <PostCard onClick={(e) => openModal(e, post)} key={post.id}>
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
                  {post.content.split("\n").length > 4
                    ? post.content.split("\n").slice(0, 4).join("\n")
                    : post.content}
                </PostContent>
                {post.content.split("\n").length > 4 && (
                  <ReadMore onClick={openModal}>...더보기</ReadMore>
                )}
              </PostContentWrapper>

              <MediaContainer showMedia={showMedia}>
                {post.images.length > 0 ? (
                  <ImageContainer>
                    {post.images.map((image, index) => (
                      <PreviewImage key={index} src={image} alt="첨부 이미지" />
                    ))}
                  </ImageContainer>
                ) : (
                  <FileList>
                    {post.files.map((file, index) => (
                      <FileItem key={index}>
                        <FileIcon src={fileIcon} alt="파일 아이콘" />
                        <FileName>{file.name}</FileName>
                      </FileItem>
                    ))}
                  </FileList>
                )}
              </MediaContainer>

              {/* 하단 좋아요 & 댓글 & 날짜 */}
              <PostFooter>
                <InteractionIcons>
                  <Icon src={heartBeforeIcon} alt="Like" />
                  <Icon src={commentIcon} alt="Comment" />
                </InteractionIcons>
                <PostDate>{post.date}</PostDate>
              </PostFooter>
            </PostCard>
          );
        })}
      </PostGrid>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </PostsContainer>
  );
};

export default PostList;
