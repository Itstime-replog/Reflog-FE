import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PopularPosts from "../../components/PopularPosts";
import PostList from "../../components/PostList";
import searchIcon from "../../assets/images/community/search-icon.png";
import CommunityDropdowns from "../../components/CommunityDropdown";

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

const Community = ({ posts, addPost }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      alert(`'${searchQuery}' 검색 실행`);
      // 여기에 검색 처리 로직 추가
    } else {
      alert("검색어를 입력해주세요.");
    }
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
          <CommunityDropdowns />
        </FilterContainer>
        <PostList posts={posts} />
      </TopSecondBox>
    </CommunityContainer>
  );
};

export default Community;
