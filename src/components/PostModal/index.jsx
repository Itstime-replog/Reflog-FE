import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import profileIcon from "../../assets/images/community/profile-icon.png";
import bookmarkBeforeIcon from "../../assets/images/community/bookmark-before.png";
import bookmarkAfterIcon from "../../assets/images/community/bookmark-after.png";
import moreIcon from "../../assets/images/community/more-icon.png";
import heartBeforeIcon from "../../assets/images/community/heart-before.png";
import heartAfterIcon from "../../assets/images/community/heart-after.png";
import commentIcon from "../../assets/images/community/comment-icon.png";
import modifyIcon from "../../assets/images/community/modify-icon.png";
import deleteIcon from "../../assets/images/community/delete-icon.png";
import { deleteCommunityPost } from "../../apis/postModalApi"; // API 함수 임포트

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 1057px;
  height: 759.76px;
  box-sizing: border-box;
  background: #ffffff;
  border: 0.613924px solid #d6d6d6;
  border-radius: 12.28px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  padding-bottom: 40px;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
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
  gap: 7px;
`;

const ProfileImage = styled.img`
  width: 82.59px;
  height: 82.59px;
`;

const Nickname = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 33px;
  color: #000000;
  padding-bottom: 5px;
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

const MoreIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MoreIcon = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: fixed;
  top: 255px;
  right: 402px;
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px;
  width: 164px;
  height: 90px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 10000;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.127231px;
  cursor: pointer;
  color: ${(props) => (props.danger ? "#ff4d4f" : "#000")};
  font-weight: ${(props) => (props.danger ? "bold" : "normal")};
  z-index: 10001;

  &:hover {
    background: #e5eeff;
    border-radius: 6px;
    color: ${(props) => (props.danger ? "#ff4d4f" : "#0059FF")};
    font-weight: 600;
  }
`;

const ModifyIcon = styled.img`
  width: 19px;
  height: 19px;
  margin-right: 3px;
`;

const DeleteIcon = styled.img`
  width: 25px;
  height: 25px;
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

const PostContentWrapper = styled.div`
  height: 300px;
  overflow: hidden;
  flex-shrink: 0;
  margin-bottom: 20px;
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
`;

const PostFooter = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-top: 20px;
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
  margin-right: 30px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 33px;
  color: rgba(0, 0, 0, 0.6);
`;

const CommentSection = styled.div`
  flex-grow: 1;
  padding: 15px;
  overflow: visible;
  margin-bottom: 40px;
`;

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 166.6px;
  border-radius: 0 0 26.2px 26.2px;
  left: 50%;
  transform: translateX(-50%);
  width: 1005px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 10px 20px;
  z-index: 15;
`;

const ReplyToMessage = styled.div`
  width: 754px;
  background: #f7faff;
  padding: 10px;
  border: 1.19px solid #d6d6d6;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.8346px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.237795px;
  color: #b8b8b8;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -0.1px;
  position: absolute;
  bottom: 79.5px;
  left: 113px;
`;

const CancelReplyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.4;
  font-size: 15px;

  &:hover {
    color: #555;
  }
`;

const CommentInput = styled.input`
  flex: 10;
  height: 40px;
  padding: 5px 15px;
  border-radius: 7.13px;
  border: 1.18898px solid #d6d6d6;
  color: black;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17.8346px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.237795px;
  outline: none;
  background: #ffffff;
  margin-bottom: 20px;

  &::placeholder {
    color: #b8b8b8;
  }
`;

const SubmitButton = styled.button`
  background: #0059ff;
  color: white;
  border: none;
  width: 115.33px;
  padding: 16px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 20px 10px;

  &:hover {
    background: #0046cc;
  }
`;

const CommentTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CommentProfileImage = styled.img`
  width: 84px;
  height: 84px;
  margin-bottom: 4px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;

const CommentText = styled.p`
  padding: 0;
  border-radius: 8px;
  font-size: 14px;
`;

const CommentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const CommentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CommentRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #a1a1a1;
  font-size: 14px;
  cursor: pointer;
`;

const CommentDate = styled.span`
  font-size: 14px;
  color: #a1a1a1;
`;

const LikeIcon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  margin-right: 38px;
`;

const PostModal = ({ post, onClose, accessToken, onDelete }) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Post 데이터:", post); // post 객체 전체 출력
    console.log("작성자 ID (post.writerId):", post?.writerId);
    console.log(
      "현재 로그인된 사용자 ID (localStorage):",
      localStorage.getItem("memberId")
    );
  }, [post]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [replyTo, setReplyTo] = useState(null); // 답글 대상 상태
  const isOwnedByCurrentUser =
    String(post.writerId) === localStorage.getItem("memberId");

  // 게시물 삭제 핸들러
  const handleDelete = () => {
    if (window.confirm("정말로 게시물을 삭제하시겠습니까?")) {
      onDelete(post.id); // 부모 컴포넌트에 삭제 요청
      onClose(); // 모달 닫기
    }
  };

  const handleEditClick = (currentPost) => {
    // CommunityWriteNew 페이지로 이동 + 게시물 데이터 전달
    navigate("/community/write", {
      state: {
        editingPost: currentPost, // 기존 게시물 정보
      },
    });
  };

  const handleReplyClick = (comment) => {
    setReplyTo(comment); // 답글 대상 설정
  };

  const togglePostLike = (e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    setIsLiked((prev) => !prev); // 좋아요 상태 반전
  };

  const toggleBookmark = (e) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    setIsBookmarked((prev) => !prev); // 북마크 상태 반전
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() === "") return;

    const newComment = {
      id: Date.now(),
      text: comment,
      date: new Date(),
      author: "리풀이",
      replies: [],
    };

    if (replyTo) {
      // 대댓글 또는 부모 댓글에 답글 추가
      const updatedComments = comments.map((cmt) => {
        if (cmt.id === replyTo.id) {
          // 부모 댓글에 답글
          return { ...cmt, replies: [...cmt.replies, newComment] };
        }
        if (cmt.replies.some((reply) => reply.id === replyTo.id)) {
          // 대댓글에 답글
          return {
            ...cmt,
            replies: cmt.replies.map((reply) =>
              reply.id === replyTo.id
                ? { ...reply, replies: [...reply.replies, newComment] }
                : reply
            ),
          };
        }
        return cmt;
      });

      setComments(updatedComments);
      setReplyTo(null); // 답글 대상 초기화
    } else {
      // 일반 댓글 추가
      setComments([...comments, newComment]);
    }

    setComment(""); // 입력 필드 초기화
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`; // 월/일 형식 변환
  };

  const toggleLike = (index) => {
    setLikedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((cmt) => (
      <div key={cmt.id}>
        {/* 부모 댓글 */}
        <CommentItem style={{ marginLeft: depth * 20 + "px" }}>
          <CommentLeft>
            <ProfileImage src={profileIcon} alt="Profile" />
            <div>
              <CommentTop>
                <Nickname>{cmt.author}</Nickname>
                <CommentDate>{formatDate(cmt.date)}</CommentDate>
              </CommentTop>
              <CommentBottom>
                <CommentText>{cmt.text}</CommentText>
                <ReplyButton onClick={() => setReplyTo(cmt)}>
                  답글달기
                </ReplyButton>
              </CommentBottom>
            </div>
          </CommentLeft>
          <CommentRight>
            <LikeIcon
              src={likedComments[cmt.id] ? heartAfterIcon : heartBeforeIcon}
              alt="Like"
              onClick={() => toggleLike(cmt.id)}
            />
          </CommentRight>
        </CommentItem>

        {/* 대댓글 렌더링 */}
        {cmt.replies.length > 0 &&
          cmt.replies.map((reply) => (
            <div key={reply.id}>
              {/* 대댓글 */}
              <CommentItem style={{ marginLeft: (depth + 1) * 20 + "px" }}>
                <CommentLeft>
                  <ProfileImage src={profileIcon} alt="Profile" />
                  <div>
                    <CommentTop>
                      <Nickname>{reply.author}</Nickname>
                      <CommentDate>{formatDate(reply.date)}</CommentDate>
                    </CommentTop>
                    <CommentBottom>
                      <CommentText>{reply.text}</CommentText>
                      <ReplyButton onClick={() => setReplyTo(reply)}>
                        답글달기
                      </ReplyButton>
                    </CommentBottom>
                  </div>
                </CommentLeft>
                <CommentRight>
                  <LikeIcon
                    src={
                      likedComments[reply.id] ? heartAfterIcon : heartBeforeIcon
                    }
                    alt="Like"
                    onClick={() => toggleLike(reply.id)}
                  />
                </CommentRight>
              </CommentItem>

              {/* 대댓글의 답글 (대댓글과 동일한 depth 유지) */}
              {reply.replies.length > 0 &&
                renderComments(reply.replies, depth + 1)}
            </div>
          ))}
      </div>
    ));
  };

  if (!post) {
    return null; // 혹은 로딩 상태 표시
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 상단 프로필 & 북마크 & 더보기 */}
        <PostHeader>
          <ProfileSection>
            <ProfileImage src={profileIcon} alt="Profile" />
            <Nickname>리플이</Nickname>
          </ProfileSection>
          <IconSection>
            <BookmarkIcon
              src={isBookmarked ? bookmarkAfterIcon : bookmarkBeforeIcon}
              alt="Bookmark"
              onClick={toggleBookmark} // 북마크 상태 토글
            />
            <MoreIconWrapper ref={dropdownRef}>
              <MoreIcon
                src={moreIcon}
                alt="More"
                onClick={() => setIsOpen(!isOpen)}
              />
              <DropdownMenu isOpen={isOpen}>
                <MenuItem onClick={() => handleEditClick(post)}>
                  수정하기
                </MenuItem>
                <MenuItem danger onClick={handleDelete}>
                  삭제하기
                </MenuItem>
              </DropdownMenu>
            </MoreIconWrapper>
          </IconSection>
        </PostHeader>

        {/* 카테고리 태그 */}
        <CategoryTags>
          {post.tags &&
            post.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
        </CategoryTags>

        {/* 게시글 제목 및 내용 */}
        <PostTitle>{post.title}</PostTitle>
        <PostContentWrapper>
          <PostContent>{post.content}</PostContent>
        </PostContentWrapper>

        {/* 좋아요, 댓글, 날짜 */}
        <PostFooter>
          <InteractionIcons>
            <Icon
              src={isLiked ? heartAfterIcon : heartBeforeIcon}
              alt="Like"
              onClick={togglePostLike} // 좋아요 상태 토글
            />
            <Icon src={commentIcon} alt="Comment" />
          </InteractionIcons>
          <PostDate>{post.date}</PostDate>
        </PostFooter>

        {/* 댓글 섹션 */}
        <CommentSection>
          <CommentInputContainer>
            {replyTo && (
              <ReplyToMessage>
                {replyTo.author}님께 답글 남기는 중
                <CancelReplyButton onClick={() => setReplyTo(null)}>
                  X
                </CancelReplyButton>
              </ReplyToMessage>
            )}
            <CommentProfileImage src={profileIcon} alt="Profile" />
            <CommentInput
              type="text"
              placeholder="댓글을 남겨주세요."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
          </CommentInputContainer>
          <CommentList>{renderComments(comments)}</CommentList>
        </CommentSection>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PostModal;
