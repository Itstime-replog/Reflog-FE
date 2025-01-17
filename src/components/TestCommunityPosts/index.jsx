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
import heartAfterIcon from "../../assets/images/community/heart-after.png";
import testCommunityImg from "../../assets/images/community/testCommunity-img.png";
import testCommunityImg2 from "../../assets/images/community/testCommunity-img2.png";
import bookmarkAfterIcon from "../../assets/images/community/bookmark-after.png";

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
  gap: 3px;
`;

const ProfileImage = styled.img`
  width: 83px;
  height: 83px;
`;

const Nickname = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
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

const PostContent = styled.div`
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
  object-fit: cover;
  display: block;
  position: relative;
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
  margin-left: 60px;
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
  margin-right: 8px;
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

const Counts = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16.5185px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.220247px;
  text-transform: capitalize;
  color: #b8b8b8;
`;

const TestCommunityPosts = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prevBookmarks) => ({
      ...prevBookmarks,
      [postId]: !prevBookmarks[postId], // 상태 반전
    }));
  };
  // 고정된 더미 데이터
  const fixedPosts = [
    {
      id: 1,
      writer: "ji_eun",
      title: "회고 방법 고민 들어주세요ㅠ",
      content: (
        <>
          이번에 처음 기획부터 디자인, 개발 팀프로젝트를 시작했는데 스프린트
          회고가 필요한 상황입니다.
          <br />
          비슷한 상황에서 어떤 회고 방법론을 활용해 회고를 진행하시나요?!
          <br />
          효율적인 회고 방법 추천해주세요!
        </>
      ),
      postType: ["회고고민"],
      studyType: ["팀 프로젝트"],
      images: [],
      files: [],
      comment: ["2"],
      date: ["1월 16일"],
    },
    {
      id: 2,
      writer: "회고왕",
      title: "회고 방법론 소개",
      content: (
        <>
          회고 방법론을 찾아보면 여러가지 방법론이 있습니다. KPT, 4L, 5F 등
          다양한 방법들이 존재합니다. <br />
          방법론들의 핵심 메세지는 비슷합니다. 방법론이 중요한 것이 아니고,
          자신이 했던 일에 대해 <br />
          생각하고 그 후에 무엇을 할지를 고민하는게 핵심입니다. <br />
          대표적인 방법론을 말씀드리되, 제가 자주 활용하는 KPT 회고에 대해
          알려드리겠습니다! <br />
          ... 더보기
        </>
      ),
      postType: ["인사이트"],
      studyType: [],
      images: [],
      files: [],
      comment: ["1"],
      date: ["1월 16일"],
    },
    {
      id: 3,
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
      postType: ["회고고민"],
      studyType: [],
      images: [],
      files: [],
      comment: ["4"],
      date: ["1월 15일"],
    },
    {
      id: 4,
      writer: "mrang",
      title: "전공 A+ 맞자!!",
      content: [],
      postType: ["회고일지"],
      studyType: ["전공 공부"],
      images: [testCommunityImg],
      files: [],
      comment: ["4"],
      date: ["1월 15일"],
    },
    {
      id: 5,
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
        </>
      ),
      postType: ["인사이트"],
      studyType: [],
      images: [testCommunityImg2],
      files: [],
      comment: ["5"],
      date: ["1월 14일"],
    },
  ];

  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState(() => {
    const counts = {};
    fixedPosts.forEach((post) => {
      counts[post.id] = 4;
    });
    return counts;
  });

  const toggleLike = (postId) => {
    setLikedPosts((prevLikes) => {
      const isLiked = !prevLikes[postId];
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [postId]: isLiked
          ? prevCounts[postId] + 1
          : Math.max(prevCounts[postId] - 1, 0),
      }));
      return {
        ...prevLikes,
        [postId]: isLiked,
      };
    });
  };

  return (
    <PostsContainer>
      <PostGrid>
        {fixedPosts.map((post) => (
          <PostCard key={post.id}>
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
                  onClick={() => toggleBookmark(post.id)} // 클릭 이벤트 핸들러 추가
                  style={{ cursor: "pointer" }} // 클릭 가능한 스타일
                />
                <MoreIcon src={moreIcon} alt="More" />
              </IconSection>
            </PostHeader>
            <CategoryTags>
              {post.postType.map((type, index) => (
                <Tag key={index}>
                  <img src={postTypeIcon} alt="" width="16" height="16" />
                  {type}
                </Tag>
              ))}
              {post.studyType.map((type, index) => (
                <Tag key={index}>
                  <img src={studyTypeIcon} alt="" width="16" height="16" />
                  {type}
                </Tag>
              ))}
            </CategoryTags>
            <PostTitle>{post.title}</PostTitle>
            <PostContentWrapper>
              <PostContent>{post.content}</PostContent>
            </PostContentWrapper>
            <MediaContainer showMedia={post.images && post.images.length > 0}>
              <ImageContainer>
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Post Image ${index + 1}`}
                    style={{
                      width: "90%",
                      marginTop: "-4px",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </ImageContainer>
            </MediaContainer>
            <PostFooter>
              <InteractionIcons>
                <Icon
                  src={likedPosts[post.id] ? heartAfterIcon : heartBeforeIcon}
                  alt="Like"
                  onClick={() => toggleLike(post.id)}
                  style={{ cursor: "pointer" }}
                />
                <Counts>{likeCounts[post.id]}</Counts>
                <Icon src={commentIcon} alt="Comment" />
                <Counts>{post.comment}</Counts>
              </InteractionIcons>
              <PostDate>{post.date}</PostDate>
            </PostFooter>
          </PostCard>
        ))}
      </PostGrid>
    </PostsContainer>
  );
};

export default TestCommunityPosts;
