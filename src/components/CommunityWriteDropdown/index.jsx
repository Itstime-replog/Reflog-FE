import React, { useState, useEffect } from "react";
import styled from "styled-components";
import postTypeIcon from "../../assets/images/community/postType-icon.png";
import studyTypeIcon from "../../assets/images/community/studyType-icon.png";
import typeDropdownIcon from "../../assets/images/community/typeDropdown-icon.png";

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: fit-content;
`;

const PostTypeFilterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 131.23px;
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 0px 3px 0.907166px rgba(139, 139, 139, 0.15);
  border-radius: 5.80645px;
  margin-right: 11.61px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.329px;
  line-height: 19px;
  letter-spacing: 0.181433px;
  color: #494a4f;
  cursor: pointer;
`;

const StudyTypeFilterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 148.65px;
  height: 36px;
  background: #ffffff;
  box-shadow: 0px 0px 3px 0.907166px rgba(139, 139, 139, 0.15);
  border-radius: 5.80645px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.329px;
  line-height: 19px;
  letter-spacing: 0.181433px;
  color: #494a4f;
  cursor: pointer;
`;

const PostTypeDropdownMenu = styled.ul`
  position: absolute;
  right: 12px;
  margin-top: 7px;
  width: 89px;
  height: 140px;
  text-align: center;
  line-height: 0;
  list-style: none;
  padding: 21px;
  display: ${(props) => (props.isOpen ? "grid" : "none")};
  grid-template-columns: repeat(1, 1fr);
  gap: 9.87px;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0px 0px 3px 0.907166px rgba(139, 139, 139, 0.15);
  border-radius: 8px;
`;

const StudyTypeDropdownMenu = styled.ul`
  position: absolute;
  right: 0;
  margin-top: 7px;
  width: 373px;
  text-align: center;
  list-style: none;
  padding: 21px;
  display: ${(props) => (props.isOpen ? "grid" : "none")};
  grid-template-columns: repeat(3, 1fr);
  gap: 9.87px;
  z-index: 1000;
  background: #ffffff;
  box-shadow: 0px 0px 3px 0.907166px rgba(139, 139, 139, 0.15);
  border-radius: 8px;
`;

const DropdownItem = styled.li`
  padding: 7px;
  font-size: 13px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  border: 0.87px solid #e1e1e1;
  color: #a1a1a1;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  white-space: nowrap;

  ${(props) =>
    props.active &&
    `
    border: none;
    background: #0059FF;
    color: white;
  `}
`;

const CommunityWriteDropdowns = ({ onPostTypeChange, onStudyTypeChange }) => {
  const [isOpen, setIsOpen] = useState({ postType: false, studyType: false });
  const [selectedPostType, setSelectedPostType] = useState([]);
  const [selectedStudyType, setSelectedStudyType] = useState([]);

  const toggleDropdown = (type) => {
    setIsOpen((prev) => ({
      postType: false,
      studyType: false,
      [type]: !prev[type],
    }));
  };

  const handlePostTypeSelect = (item) => {
    setSelectedPostType((prev) => {
      const updated = prev.includes(item)
        ? prev.filter((t) => t !== item)
        : [...prev, item].slice(0, 2);
      onPostTypeChange(updated);
      return updated;
    });
  };

  const handleStudyTypeSelect = (item) => {
    setSelectedStudyType((prev) => {
      const updated = prev.includes(item)
        ? prev.filter((t) => t !== item)
        : [...prev, item].slice(0, 2);
      onStudyTypeChange(updated);
      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-container") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setIsOpen({ postType: false, studyType: false });
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <FilterContainer>
      {/* 글 유형 드롭다운 */}
      <DropdownContainer className="dropdown-container">
        <PostTypeFilterButton onClick={() => toggleDropdown("postType")}>
          <img
            src={postTypeIcon}
            alt="글 유형"
            width="16"
            height="16"
            style={{ marginRight: "5px" }}
          />
          글 유형
          {selectedPostType.length > 0 && ` ${selectedPostType.length}`}
          <img
            src={typeDropdownIcon}
            alt="드롭다운"
            width="30.84"
            height="30.84"
          />
        </PostTypeFilterButton>
        {isOpen.postType && (
          <PostTypeDropdownMenu
            className="dropdown-menu"
            isOpen={isOpen.postType}
            right="7px"
          >
            {["회고고민", "학습일지", "인사이트"].map((item) => (
              <DropdownItem
                key={item}
                active={selectedPostType.includes(item)}
                onClick={() => handlePostTypeSelect(item)}
              >
                {item}
              </DropdownItem>
            ))}
          </PostTypeDropdownMenu>
        )}
      </DropdownContainer>

      {/* 학습 유형 드롭다운 */}
      <DropdownContainer className="dropdown-container">
        <StudyTypeFilterButton onClick={() => toggleDropdown("studyType")}>
          <img
            src={studyTypeIcon}
            alt="학습 유형"
            width="16"
            height="16"
            style={{ marginRight: "5px" }}
          />
          학습 유형
          {selectedStudyType.length > 0 && ` ${selectedStudyType.length}`}
          <img
            src={typeDropdownIcon}
            alt="드롭다운"
            width="30.84"
            height="30.84"
          />
        </StudyTypeFilterButton>
        {isOpen.studyType && (
          <StudyTypeDropdownMenu
            className="dropdown-menu"
            isOpen={isOpen.studyType}
            right="70.52px"
            large
          >
            {[
              "전공 공부",
              "자격증 공부",
              "코딩 공부",
              "외국어 공부",
              "부트캠프",
              "고시",
              "팀 프로젝트",
              "개인 프로젝트",
              "그룹 스터디",
              "온라인 강의 수강",
              "기타",
            ].map((item) => (
              <DropdownItem
                key={item}
                active={selectedStudyType.includes(item)}
                onClick={() => handleStudyTypeSelect(item)}
              >
                {item}
              </DropdownItem>
            ))}
          </StudyTypeDropdownMenu>
        )}
      </DropdownContainer>
    </FilterContainer>
  );
};

export default CommunityWriteDropdowns;
