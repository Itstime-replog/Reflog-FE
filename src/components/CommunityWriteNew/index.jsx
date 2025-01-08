import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AttachImageModal from "../../components/AttachImageModal";
import AttachFileModal from "../../components/AttachFileModal";
import backIcon from "../../assets/images/community/back-icon.png";
import postTypeIcon from "../../assets/images/community/postType-icon.png";
import studyTypeIcon from "../../assets/images/community/studyType-icon.png";
import attachImageIcon from "../../assets/images/community/image-icon.png";
import attachFileIcon from "../../assets/images/community/attach-icon.png";
import typeDropdownIcon from "../../assets/images/community/typeDropdown-icon.png";
import fileIcon from "../../assets/images/community/file-icon.png";

const WriteContainer = styled.div`
  margin-top: 79px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackContainer = styled.div`
  position: absolute;
  top: 160px;
  left: 270px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
`;

const BackIcon = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const WriteBox = styled.div`
  position: relative; /* Footer가 하단에 고정될 수 있도록 설정 */
  padding: 20px;
  background: #ffffff;
  border-radius: 16.37px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1232px;
  height: 820.7px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  margin-right: 50px;
`;

const HeaderInfo = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #b8b8b8;
  margin-right: 50px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const CategoryButton = styled.button`
  background: #ffffff;
  border: 0.2px solid rgb(227, 227, 227);
  padding: 10px 8px 10px 14px;
  cursor: pointer;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.329px;
  line-height: 19px;
  letter-spacing: 0.181433px;
  color: #494a4f;
  display: flex;
  align-items: center;
  height: 36px;
  box-shadow: 0px 0px 3px 0.907166px rgba(139, 139, 139, 0.15);
  border-radius: 5.80645px;
`;

const TypeDropdownIcon = styled.img`
  width: 30.84px;
  height: 30.84px;
  cursor: pointer;
`;

const PostTypeIcon = styled.img`
  width: 15.43px;
  height: 15.43px;
  cursor: pointer;
  margin-right: 5px;
`;

const StudyTypeIcon = styled.img`
  width: 15.43px;
  height: 15.43px;
  cursor: pointer;
  margin-right: 5px;
`;

const TitleBox = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  width: 96%;
`;

const TitleInput = styled.input`
  width: 85%;
  border: none;
  margin-top: 20px;
  outline: none;
  padding: 0 0 10px 20px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: #000000;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const TitleInfo = styled.div`
  width: 15%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #a1a1a1;
  margin-bottom: -20px;
  padding-right: 20px;
`;

const ContentTextarea = styled.textarea`
  width: 93%;
  height: 300px;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 70px;
  color: #000000;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const FileList = styled.ul`
  width: 100%;
  padding-left: 20px;
  list-style: none;
  margin: 10px 0 0 128px;
  position: absolute;
  bottom: 110px;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
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
  flex-grow: 1; /* 내용이 확장되도록 설정 */
`;

const FileInnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FileIcon = styled.img`
  width: 29.29px;
  height: 29.29px;
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

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute; /* 부모 요소 기준으로 하단에 고정 */
  bottom: 20px;
  left: 0;
  width: 95%;
  padding: 20px;
  background: white;
`;

const LeftIcons = styled.div`
  display: flex;
  gap: 14px;
  margin-left: 50px;
`;

const Icon = styled.img`
  width: 36.89px;
  height: 36.89px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 14.37px;
`;

const CancelButton = styled.button`
  background: white;
  padding: 11px 45px;
  cursor: pointer;
  border: 1px solid #b8b8b8;
  border-radius: 4.74094px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.5269px;
  line-height: 15px;
  letter-spacing: 0.01em;
  color: #b8b8b8;
`;

const SubmitButton = styled.button`
  background: #0059ff;
  color: white;
  border: none;
  border-radius: 4.74094px;
  padding: 11px 45px;
  cursor: pointer;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16.5269px;
  line-height: 15px;
  letter-spacing: 0.01em;

  &:hover {
    background: #0046cc;
  }
`;

const CommunityWriteNew = () => {
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [files, setFiles] = useState([]); // 파일 목록 상태

  // 파일 추가 핸들러
  const handleFileSelect = (selectedFiles) => {
    setFiles([...files, ...selectedFiles]);
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <WriteContainer>
      <BackContainer>
        <BackButton onClick={() => navigate("/community")}>
          <BackIcon src={backIcon} alt="뒤로가기" />
        </BackButton>
      </BackContainer>
      <WriteBox>
        <Header>
          <HeaderInfo>
            *글 유형과 학습 유형은 최대 2개까지 복수 선택 가능합니다.
          </HeaderInfo>
          <CategoryContainer>
            <CategoryButton>
              <PostTypeIcon src={postTypeIcon} alt="글 유형" />
              글 유형
              <TypeDropdownIcon src={typeDropdownIcon} alt="유형 드롭다운" />
            </CategoryButton>
            <CategoryButton>
              <StudyTypeIcon src={studyTypeIcon} alt="학습 유형" />
              학습 유형
              <TypeDropdownIcon src={typeDropdownIcon} alt="유형 드롭다운" />
            </CategoryButton>
          </CategoryContainer>
        </Header>
        <TitleBox>
          <TitleInput placeholder="제목" maxLength={80} />
          <TitleInfo>80자 이내</TitleInfo>
        </TitleBox>
        <ContentTextarea placeholder="자유롭게 글을 작성해보세요!" />

        {/* 첨부된 파일 리스트 */}
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <FileInfo>
                <FileIcon src={fileIcon} alt="파일 아이콘" />
                <FileInnerInfo>
                  <FileName>{file.name}</FileName>
                  <FileSize>
                    {(file.size / (1024 * 1024)).toFixed(1)}MB
                  </FileSize>
                </FileInnerInfo>
              </FileInfo>
              <RemoveButton onClick={() => handleRemoveFile(index)}>
                ✖
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
        <Footer>
          <LeftIcons>
            <Icon
              src={attachImageIcon}
              alt="이미지 업로드"
              onClick={() => setIsImageModalOpen(true)}
            />
            <Icon
              src={attachFileIcon}
              alt="파일 첨부"
              onClick={() => setIsFileModalOpen(true)}
            />
          </LeftIcons>
          <ButtonContainer>
            <CancelButton onClick={() => navigate("/")}>취소</CancelButton>
            <SubmitButton>등록</SubmitButton>
          </ButtonContainer>
        </Footer>
      </WriteBox>
      {/* 파일 업로드 모달 */}
      {isFileModalOpen && (
        <AttachFileModal
          onClose={() => setIsFileModalOpen(false)}
          onFileSelect={handleFileSelect} // 파일 선택 함수 전달
        />
      )}
    </WriteContainer>
  );
};

export default CommunityWriteNew;
