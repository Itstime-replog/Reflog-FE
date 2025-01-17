import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AttachImageModal from "../../components/AttachImageModal";
import AttachFileModal from "../../components/AttachFileModal";
import backIcon from "../../assets/images/community/back-icon.png";
import attachImageIcon from "../../assets/images/community/image-icon.png";
import attachFileIcon from "../../assets/images/community/attach-icon.png";
import fileIcon from "../../assets/images/community/file-icon.png";
import ExitWarningModal from "../../components/ExitWarningModal";
import UploadComplete from "../../components/UploadComplete";
import CommunityWriteDropdowns from "../../components/CommunityWriteDropdown";
import { createCommunityPost } from "../../apis/communityWriteNewApi";
import { updateCommunityPost } from "../../apis/communityApi"; // 수정 API 호출 함수

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
  position: relative;
  padding: 40px;
  background: #ffffff;
  border-radius: 16.37px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1232px;
  height: auto;
  overflow: visible;
  gap: 20px;
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
  margin-right: 0;
`;

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 85%;
  border: none;
  outline: none;
  padding: 20px;
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
  padding-right: 22px;
`;

const ContentTextarea = styled.textarea`
  width: 93%;
  min-height: 300px;
  height: auto;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  color: #000000;
  word-break: break-word;

  &::placeholder {
    color: #a1a1a1;
  }
`;

const AttachmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 80px;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px 0 10px 10px;
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const PreviewImage = styled.img`
  width: 80%;
  width: height: auto;
  object-fit: contain;

  &:hover {
    filter: brightness(60%);
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24x;
  cursor: pointer;
  display: none;
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  ${ImageContainer}:hover & {
    display: block;
  }
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
  padding: 40px 20px 20px 20px;
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

const CommunityWriteNew = ({ onPostSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // `editingPost`가 있으면 '수정 모드', 없으면 '새 글 작성 모드'
  const editingPost = location.state?.editingPost;
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState([]);
  const [selectedStudyType, setSelectedStudyType] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    console.log("Access Token:", accessToken);

    // 필요한 경우, 토큰을 저장하거나 처리
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken); // 로컬 스토리지에 저장
    }
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  // 파일 추가 핸들러
  const handleFileSelect = (selectedFiles) => {
    setFiles([...files, ...selectedFiles]);
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleImageSelect = (selectedImages) => {
    setImages([
      ...images,
      ...selectedImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const handlePostTypeChange = (types) => {
    setSelectedPostType(types);
  };
  const handleStudyTypeChange = (types) => {
    setSelectedStudyType(types);
  };

  // 수정 모드라면 기존 데이터 채우기
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setContent(editingPost.content || "");
      setImages(editingPost.images || []);
      setFiles(editingPost.files || []);
      setSelectedPostType(editingPost.postType || []);
      setSelectedStudyType(editingPost.studyType || []);
    }
  }, [editingPost]);
  /*
  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const memberId = localStorage.getItem("memberId"); // 로컬 스토리지에서 멤버 ID 가져오기
    console.log("AccessToken:", accessToken); // AccessToken 확인용
    console.log("MemberId:", memberId); // MemberId 확인용

    if (!accessToken) {
      alert("로그인이 필요합니다!");
      return;
    }

    if (!memberId) {
      alert("멤버 ID를 확인할 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // 공통 데이터 구조
    const postData = {
      memberId: memberId, // 로컬 스토리지에서 가져온 멤버 ID 사용
      title,
      content,
      postTypes: selectedPostType,
      learningTypes: selectedStudyType,
      fileUrls: files.map((file) => file.url || ""), // 파일 URL 배열
    };

    if (editingPost) {
      // 수정 모드
      try {
        console.log("수정 요청 데이터:", postData);

        await updateCommunityPost(
          editingPost.id, // 게시글 ID
          postData, // 수정할 데이터
          accessToken // 사용자 인증 토큰
        );

        alert("게시글이 성공적으로 수정되었습니다!");
        navigate("/community"); // 수정 후 커뮤니티 페이지로 이동
      } catch (error) {
        console.error("게시글 수정 오류:", error);
        alert("게시글 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      // 새 글 작성 모드
      try {
        console.log("새 글 작성 요청 데이터:", postData);

        await createCommunityPost(postData, accessToken); // 새 글 작성 API 호출

        alert("게시글이 성공적으로 작성되었습니다!");
        navigate("/community"); // 작성 후 커뮤니티 페이지로 이동
      } catch (error) {
        console.error("게시글 작성 오류:", error);
        alert("게시글 작성 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };*/

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const hardcodedMemberId = "59819297-9f21-4a42-aeae-3f4f8f8cf1e1"; // 하드코딩된 멤버 ID
    console.log("AccessToken:", accessToken); // AccessToken 확인용
    console.log("Hardcoded MemberId:", hardcodedMemberId); // 하드코딩된 MemberId 확인용

    if (!accessToken) {
      alert("로그인이 필요합니다!");
      return;
    }

    if (!hardcodedMemberId) {
      alert("멤버 ID를 확인할 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    // 공통 데이터 구조
    const postData = {
      memberId: hardcodedMemberId, // 하드코딩된 멤버 ID 사용
      title,
      content,
      postTypes: selectedPostType,
      learningTypes: selectedStudyType,
      fileUrls: files.map((file) => file.url || ""), // 파일 URL 배열
    };

    if (editingPost) {
      // 수정 모드
      try {
        console.log("수정 요청 데이터:", postData);

        await updateCommunityPost(
          editingPost.id, // 게시글 ID
          postData, // 수정할 데이터
          accessToken // 사용자 인증 토큰
        );

        alert("게시글이 성공적으로 수정되었습니다!");
        navigate("/community"); // 수정 후 커뮤니티 페이지로 이동
      } catch (error) {
        console.error("게시글 수정 오류:", error);
        alert("게시글 수정 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      // 새 글 작성 모드
      try {
        console.log("새 글 작성 요청 데이터:", postData);

        await createCommunityPost(postData, accessToken); // 새 글 작성 API 호출

        alert("게시글이 성공적으로 작성되었습니다!");
        navigate("/community"); // 작성 후 커뮤니티 페이지로 이동
      } catch (error) {
        console.error("게시글 작성 오류:", error);
        alert("게시글 작성 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <WriteContainer>
      {isUploadComplete ? (
        <UploadComplete onGoBack={() => navigate("/community")} />
      ) : (
        <>
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
                {/* 선택된 태그 정보를 CommunityWriteDropdowns로 전달 */}
                <CommunityWriteDropdowns
                  onPostTypeChange={handlePostTypeChange}
                  onStudyTypeChange={handleStudyTypeChange}
                />
              </CategoryContainer>
            </Header>
            <TitleBox>
              <TitleInput
                placeholder="제목"
                maxLength={80}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TitleInfo>80자 이내</TitleInfo>
            </TitleBox>
            <ContentTextarea
              placeholder="자유롭게 글을 작성해보세요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <AttachmentContainer>
              {/* 이미지 미리보기 */}
              <ImagePreview>
                {images.map((image, index) => (
                  <ImageContainer key={index}>
                    <PreviewImage src={image} alt="미리보기" />
                    <RemoveImageButton onClick={() => handleRemoveImage(index)}>
                      ✖
                    </RemoveImageButton>
                  </ImageContainer>
                ))}
              </ImagePreview>

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
            </AttachmentContainer>
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
                <CancelButton onClick={() => setIsExitModalOpen(true)}>
                  취소
                </CancelButton>
                <SubmitButton onClick={handleSubmit}>등록</SubmitButton>
              </ButtonContainer>
            </Footer>
          </WriteBox>
          {isExitModalOpen && (
            <ExitWarningModal
              onClose={() => setIsExitModalOpen(false)}
              onConfirm={() => navigate("/community")}
            />
          )}
          {/* 이미지 업로드 모달 */}
          {isImageModalOpen && (
            <AttachImageModal
              onClose={() => setIsImageModalOpen(false)}
              onImageSelect={handleImageSelect}
            />
          )}
          {/* 파일 업로드 모달 */}
          {isFileModalOpen && (
            <AttachFileModal
              onClose={() => setIsFileModalOpen(false)}
              onFileSelect={handleFileSelect} // 파일 선택 함수 전달
            />
          )}
        </>
      )}
    </WriteContainer>
  );
};

export default CommunityWriteNew;
