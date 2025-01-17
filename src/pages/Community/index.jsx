import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PopularPosts from "../../components/PopularPosts";
import PostList from "../../components/PostList";
import searchIcon from "../../assets/images/community/search-icon.png";
import CommunityDropdowns from "../../components/CommunityDropdown";
import { fetchFilteredPosts } from "../../apis/communityApi"; // API 호출 함수 import
import PostModal from "../../components/PostModal";
import TestCommunityPosts from "../../components/TestCommunityPosts";

const CommunityContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  margin-top: 50px;
  overflow-x: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 603px;
  margin: 0;
  padding-top: 50px;
  background-color: #f7faff;
`;

const TopFirstBox = styled.div`
  width: 100%;
`;

const SearchAndWriteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 70px;
`;

const SearchWrapper = styled.div`
  display: flex;
  position: relative;
  width: 859px;
  height: 54px;
  flex: none;
  flex-grow: 0;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #0059ff;
  border-radius: 29px;
  box-sizing: border-box;
  outline: none;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-left: 27px;
  padding-right: 57px;

  &::placeholder {
    color: #b8b8b8;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
  width: 44px;
  height: 44px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const WriteButton = styled.div`
  margin-right: 71px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5.74px;
  width: 133.1px;
  height: 35.57px;
  background-color: #0059ff;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.0642px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #ffffff;
`;

const PopularPostsContainer = styled.div`
  width: 100%;
`;

const PopularPostsTitle = styled.div`
  margin: 58px 0 31px 70px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 42px;
  letter-spacing: 0.2px;
  color: #000000;
`;

const PopularPostsBoxContainer = styled.div`
  width: 100%;
  margin: 0 70px 0 70px;
`;

const TopSecondBox = styled.div`
  width: 100%;
  background-color: white;
  min-height: 100vh;
  height: auto;
  padding-bottom: 100px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 37px;
  margin-right: 70.52px;
`;

const Community = ({ posts: initialPosts }) => {
  const navigate = useNavigate();

  // 검색어
  const [searchQuery, setSearchQuery] = useState("");
  // 원본 게시물 + 로컬스토리지에서 가져온 새 게시물 전부를 합쳐 관리할 state
  const [allPosts, setAllPosts] = useState(initialPosts || []);
  // 필터링된 게시물
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  // 선택된 게시물 (모달에 표시하기 위함)
  const [selectedPost, setSelectedPost] = useState(null);

  /*
  // 서버에서 게시물 데이터 불러오기
  const loadPosts = async () => {
    try {
      console.log("게시물 데이터 로드 시작");
      const posts = await fetchFilteredPosts(); // memberId는 이미 fetchFilteredPosts에서 처리됨
      console.log("API 응답 데이터:", posts);
      setAllPosts(posts);
    } catch (error) {
      console.error("게시물을 불러오는 중 오류 발생:", error);
      alert("게시물을 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);
*/

  // 글 유형/학습 유형 필터링
  const handleFilterChange = (selectedPostType, selectedStudyType) => {
    let filtered = [...allPosts];

    if (selectedPostType.length > 0) {
      filtered = filtered.filter((post) =>
        post.postType.some((type) => selectedPostType.includes(type))
      );
    }

    if (selectedStudyType.length > 0) {
      filtered = filtered.filter((post) =>
        post.studyType.some((type) => selectedStudyType.includes(type))
      );
    }

    setFilteredPosts(filtered);
  };

  // allPosts가 바뀔 때마다 filteredPosts도 갱신
  useEffect(() => {
    setFilteredPosts(allPosts);
  }, [allPosts]);

  // 검색 버튼 로직
  const handleSearch = () => {
    if (searchQuery) {
      alert(`'${searchQuery}' 검색 실행`);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  // 게시물 삭제 처리
  const handleDeletePost = (deletedPostId) => {
    setAllPosts((prev) => prev.filter((post) => post.id !== deletedPostId));
    setSelectedPost(null);
  };

  return (
    <CommunityContainer>
      <TopContainer>
        <TopFirstBox>
          <SearchAndWriteContainer>
            <SearchWrapper>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchButton onClick={handleSearch} />
            </SearchWrapper>
            <WriteButton onClick={() => navigate("/community/write")}>
              글쓰기
            </WriteButton>
          </SearchAndWriteContainer>
          <PopularPostsContainer>
            <PopularPostsTitle>실시간 인기글</PopularPostsTitle>
            <PopularPostsBoxContainer>
              <PopularPosts />
            </PopularPostsBoxContainer>
          </PopularPostsContainer>
        </TopFirstBox>
      </TopContainer>
      <TopSecondBox>
        <FilterContainer>
          <CommunityDropdowns onFilterChange={handleFilterChange} />
        </FilterContainer>
        <PostList posts={filteredPosts} onPostClick={setSelectedPost} />
        <TestCommunityPosts />
      </TopSecondBox>
      {/* 게시물 클릭 시 모달 표시 */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onDelete={handleDeletePost}
        />
      )}
    </CommunityContainer>
  );
};

export default Community;
