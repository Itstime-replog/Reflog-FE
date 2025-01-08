import React, { useState, useEffect, useRef } from "react";
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
  flex-direction: column; /* 내부 요소를 세로 배치 */
  position: relative;
  overflow-y: auto;
  padding-bottom: 50px;
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
  position: absolute;
  top: 55px;
  right: -200%;
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 10px;
  width: 164px;
  height: 90px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1000;
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
  position: relative;
  height: 300px;
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
  flex-grow: 1; /* 모달 내에서 나머지 공간을 차지 */
  overflow-y: auto; /* 댓글이 많으면 스크롤 가능하도록 */
  padding: 15px; /* 여백 추가 */
`;

const CommentInputContainer = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  position: absolute; /* 모달 하단에 고정 */
  bottom: 0;
  left: 0;
  width: 95%;
  background-color: white;
`;

const CommentInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 5px 15px;
  border-radius: 7.13px;
  border: 1.18898px solid #d6d6d6;
  border-radius: 7.13386px;
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
  width: 100%; /* 댓글과 버튼을 양쪽 정렬 */
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
  justify-content: space-between; /* 오른쪽 아이콘을 오른쪽 정렬 */
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

const PostModal = ({ onClose }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    setIsOpen((prev) => !prev);
  };
  // 모달 외부 클릭 시 닫힘
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

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() === "") return; // 빈 댓글 방지
    const newComment = {
      text: comment,
      date: new Date(), // 현재 날짜 저장
    };
    setComments([...comments, newComment]); // 새로운 댓글 추가
    setComment(""); // 입력 필드 초기화
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`; // 월/일 형식 변환
  };

  const [likedComments, setLikedComments] = useState({});

  const toggleLike = (index) => {
    setLikedComments((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* 상단 프로필 & 북마크 & 더보기 */}
        <PostHeader>
          <ProfileSection>
            <ProfileImage src={profileIcon} alt="Profile" />
            <Nickname>리풀이</Nickname>
          </ProfileSection>
          <IconSection>
            <BookmarkIcon
              src={isBookmarked ? bookmarkAfterIcon : bookmarkBeforeIcon}
              alt="Bookmark"
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark();
              }}
            />
            <MoreIconWrapper ref={dropdownRef}>
              <MoreIcon src={moreIcon} alt="More" onClick={toggleDropdown} />
              <DropdownMenu isOpen={isOpen}>
                <MenuItem>
                  수정하기 <ModifyIcon src={modifyIcon} alt="Modify" />
                </MenuItem>
                <MenuItem danger>
                  삭제하기 <DeleteIcon src={deleteIcon} alt="Delete" />
                </MenuItem>
              </DropdownMenu>
            </MoreIconWrapper>
          </IconSection>
        </PostHeader>

        {/* 카테고리 태그 */}
        <CategoryTags>
          <Tag>회고 고민</Tag>
          <Tag>팀 프로젝트</Tag>
        </CategoryTags>

        {/* 게시글 제목 & 내용 */}
        <PostTitle>회고 방법 고민 들어주세요ㅠ</PostTitle>
        <PostContentWrapper>
          <PostContent>
            회고 방법론을 찾아보면 여러가지 방법론이 있습니다. KPT, 4L, 5F 등
            다양한 방법들이 존재합니다. 방법론들의 핵심 메세지는 비슷합니다.
            방법론이 중요한 것이 아니고, 자신이 했던 일에 대해 생각하고 그 후에
            무엇을 할지를 고민하는게 핵심입니다. 대표적인 방법론을 말씀드리되,
            제가 자주 활용하는 KPT 회고에 대해 알려드리겠습니다! 회고 방법론을
            찾아보면 여러가지 방법론이 있습니다. KPT, 4L, 5F 등 다양한 방법들이
            존재합니다. 방법론들의 핵심 메세지는 비슷합니다. 방법론이 중요한
            것이 아니고, 자신이 했던 일에 대해 생각하고 그 후에 무엇을 할지를
            고민하는게 핵심입니다. 대표적인 방법론을 말씀드리되, 제가 자주
            활용하는 KPT 회고에 대해 알려드리겠습니다!
          </PostContent>
        </PostContentWrapper>

        {/* 하단 좋아요 & 댓글 & 날짜 */}
        <PostFooter>
          <InteractionIcons>
            <Icon src={heartBeforeIcon} alt="Like" />
            <Icon src={commentIcon} alt="Comment" />
          </InteractionIcons>
          <PostDate>10월 9일</PostDate>
        </PostFooter>
        <CommentSection>
          {/* 댓글 입력창 */}
          <CommentInputContainer>
            <CommentProfileImage src={profileIcon} alt="Profile" />
            <CommentInput
              type="text"
              placeholder="댓글을 남겨주세요."
              value={comment}
              onChange={handleCommentChange}
            />
            <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
          </CommentInputContainer>
          {/* 댓글 리스트 */}
          <CommentList>
            {comments.map((cmt, index) => (
              <CommentItem key={index}>
                <CommentLeft>
                  <ProfileImage src={profileIcon} alt="Profile" />
                  <div>
                    {/* 이름 + 날짜 (첫 번째 줄) */}
                    <CommentTop>
                      <Nickname>이름</Nickname>
                      <CommentDate>{formatDate(cmt.date)}</CommentDate>
                    </CommentTop>

                    {/* 댓글 + 답글달기 (두 번째 줄) */}
                    <CommentBottom>
                      <CommentText>{cmt.text}</CommentText>
                      <ReplyButton>답글달기</ReplyButton>
                    </CommentBottom>
                  </div>
                </CommentLeft>
                <CommentRight>
                  <LikeIcon
                    src={
                      likedComments[index] ? heartAfterIcon : heartBeforeIcon
                    }
                    alt="Like"
                    onClick={() => toggleLike(index)}
                  />
                </CommentRight>
              </CommentItem>
            ))}
          </CommentList>
        </CommentSection>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PostModal;
