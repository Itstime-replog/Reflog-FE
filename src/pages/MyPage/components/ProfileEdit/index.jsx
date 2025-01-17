import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getMemberId,
  getProfileImage,
} from "../../../../utils/auth";
import {
  getProfile,
  createProfile,
  updateProfile,
} from "../../../../apis/usersapi";
import styled from "styled-components";
import ProfileIcon from "../../../../assets/images/common/profile-icon.png";

const Container = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: -30px;
  top: -40px;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #b8b8b8;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transform: scaleX(0.8);
`;

const ProfileImage = styled.div`
  width: 156.07px;
  height: 156.07px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  img {
    width: 127.11px;
    height: 127.11px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 90px;
  height: 31px;
  border: 1px solid rgba(161, 161, 161, 0.8);
  border-radius: 5px;
  background: white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.2px;
  color: rgba(161, 161, 161, 0.8);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 580px;
  padding: 0 40px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 529px;
  margin: 0 auto;
`;

const Label = styled.label`
  width: 103px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.2px;
  color: #000000;
  flex-shrink: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 394px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  border: 1.07407px solid #a1a1a1;
  border-radius: 6px;
  padding: 0 12px;
  padding-right: ${(props) => (props.type === "text" ? "80px" : "12px")};
  font-family: "Pretendard";
  font-size: 16px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #0059ff;
  }
`;

const CharLimit = styled.span`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 10.8319px;
  line-height: 13px;
  display: flex;
  align-items: center;
  letter-spacing: 0.108319px;
  color: #a1a1a1;
`;

const SaveButton = styled.button`
  width: 167.7px;
  height: 45.5px;
  margin: 40px auto 0;
  border: 1.3px solid #a1a1a1;
  border-radius: 6.5px;
  background: white;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18.2px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.26px;
  color: #a1a1a1;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const ProfileEdit = ({ onCancel }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    profile_image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isNewProfile, setIsNewProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAccessToken();
        const memberId = getMemberId();
        const socialProfileImage = getProfileImage();

        console.log("Fetching profile for memberId:", memberId);
        console.log("Social Profile Image:", socialProfileImage);

        try {
          const response = await getProfile(token, memberId);
          console.log("Profile fetch response:", response);

          if (response.isSuccess && response.result) {
            setFormData({
              nickname: response.result.nickname || "",
              email: response.result.email || "",
              profile_image:
                response.result.profile_image || socialProfileImage || "",
            });
            setIsNewProfile(false);
          }
        } catch (err) {
          if (err.message.includes("404")) {
            console.log("No existing profile, will create new one");
            const userName = localStorage.getItem("userName");
            setFormData((prev) => ({
              ...prev,
              nickname: userName || "",
              email: "",
              profile_image: socialProfileImage || "",
            }));
            setIsNewProfile(true);
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nickname" && value.length > 20) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }
    if (!formData.email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = getAccessToken();
      const memberId = getMemberId();

      const apiFunction = isNewProfile ? createProfile : updateProfile;
      console.log(
        `${isNewProfile ? "Creating" : "Updating"} profile with data:`,
        formData
      );

      const response = await apiFunction(token, memberId, {
        ...formData,
        profile_image: formData.profile_image || "",
      });

      if (!response.isSuccess) {
        throw new Error(response.message || "작업이 실패했습니다.");
      }

      alert(`프로필이 ${isNewProfile ? "생성" : "수정"}되었습니다.`);
      if (onCancel) {
        onCancel();
      } else {
        navigate("/mypage");
      }
    } catch (err) {
      console.error("Profile save error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={onCancel}>‹</BackButton>
      <ProfileImage>
        <img
          src={formData.profile_image || getProfileImage() || ProfileIcon}
          alt="Profile"
          onError={(e) => {
            e.target.src = ProfileIcon;
            console.log("Image load failed, using default icon");
          }}
        />
      </ProfileImage>
      <ButtonGroup>
        <Button disabled>변경하기</Button>
        <Button disabled>삭제하기</Button>
      </ButtonGroup>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>이름(닉네임)</Label>
          <InputWrapper>
            <Input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              maxLength={20}
              placeholder="닉네임을 입력해주세요"
            />
            <CharLimit>{formData.nickname.length}/20자</CharLimit>
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label>이메일 정보</Label>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
            />
          </InputWrapper>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SaveButton type="submit" disabled={isLoading}>
          {isLoading ? "처리중..." : isNewProfile ? "생성" : "저장"}
        </SaveButton>
      </Form>
    </Container>
  );
};

export default ProfileEdit;
