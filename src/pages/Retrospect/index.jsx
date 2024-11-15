import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BookImage from '../../assets/images/Book.svg';
import ChevronDown from '../../assets/images/Chevron-Down.svg';
import LockIcon from '../../assets/images/Lock.svg';
import UnlockIcon from '../../assets/images/Unlock.svg';
import CheckIcon from '@mui/icons-material/Check'; // Material-UI Icons
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

// Styled Components

const SlideOutDetailView = styled.div`
  position: fixed;
  right: ${(props) => (props.isOpen ? '0' : '-100%')};
  top: 0;
  width: 33.333%;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  padding: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;

  &:hover {
    opacity: 0.7;
  }
`;

const EditButton = styled(Button)`
  && {
    margin-top: auto; /* 상단 여백을 자동으로 설정하여 하단에 위치 */
    align-self: flex-end; /* 오른쪽 정렬 */
    color: #494a4f;
    border: 1px solid #494a4f;
    background-color: white;
    padding: 8px 24px;
    margin-right: 24px;
    margin-bottom: 24px;

    &:hover {
      border-color: #494a4f;
      background-color: rgba(73, 74, 79, 0.04);
    }
  }
`;

const DetailContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

const JournalCard = styled.div`
  width: 290px;
  height: 210px;
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #e5eefe;
  }
`;

const RetrospectJournalCard = ({ journal, onClick }) => {
  return (
    <JournalCard onClick={onClick}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          {journal.date}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            maxWidth: '60%',
          }}
        >
          {journal.learningTags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                padding: '4px 12px',
                backgroundColor: '#0059ff',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                color: 'white',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: '500',
            maxWidth: '70%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginBottom: '4px',
          }}
        >
          {journal.title}
        </h3>
        <img
          src={journal.isLocked ? LockIcon : UnlockIcon}
          alt={journal.isLocked ? '잠금' : '공개'}
          style={{ width: '20px', height: '20px' }}
        />
      </div>
    </JournalCard>
  );
};

const RetrospectContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const CalendarContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 40px;
  z-index: 10;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  .react-calendar {
    border: none;
    font-family: Pretendard;
    padding: 16px;

    .react-calendar__navigation__prev2-button,
    .react-calendar__navigation__next2-button {
      display: none;
    }

    .react-calendar__month-view__weekdays__weekday {
      font-size: 14px;
      font-weight: 500;
      color: #494a4f;
      padding-bottom: 8px;

      abbr {
        text-decoration: none;
        cursor: default;
      }

      abbr[title] {
        text-decoration: none;
      }
    }

    .react-calendar__month-view__days__day {
      font-size: 14px;
      font-family: Pretendard;
      height: 40px;
      padding: 0;
      margin: 4px 0;

      abbr {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        margin: 0 auto;
        border-radius: 50%;
      }
    }

    .react-calendar__month-view__days {
      padding-bottom: 8px;
    }

    .react-calendar__tile--now,
    .react-calendar__tile--now.react-calendar__tile--active {
      background: none;
      abbr {
        background: #0458ff;
        color: white;
      }
    }

    .react-calendar__tile--active {
      background: none;
      color: black;
      abbr {
        background: #fec300;
        color: white;
      }
    }

    .react-calendar__navigation {
      margin-bottom: 16px;

      button {
        font-family: Pretendard;
        font-size: 16px;
        font-weight: 500;
        min-width: 36px;

        &:hover {
          background: none;
        }
        &:enabled:focus {
          background: none;
        }
      }
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      abbr {
        background: #f5f5f5;
      }
      background: none;
    }

    .react-calendar__month-view__days__day {
      position: relative;
      margin: 0px 0;
    }

    .react-calendar__month-view__days > :nth-last-child(-n+7) {
      margin-bottom: 1px;
    }
  }
`;

const TopButtonContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TagButtonsContainer = styled.div`
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 175px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 전체적인 20px 간격 추가 */
`;

const TagButtons = styled(Stack)`
  && {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: flex-start;
    width: 100%;
    margin-left: 30px;

    & .MuiButton-root {
      white-space: nowrap;
      flex-shrink: 0;
      min-width: fit-content;
    }
  }
`;

const UnderlinedButton = styled(Button)`
  && {
    color: #494a4f;
    text-decoration: underline;
    padding: 6px 8px;
    min-width: 0;
    font-weight: 400;
    text-transform: none;

    &:hover {
      background: none;
      text-decoration: underline;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: #0059ff;

    &:hover {
      background-color: #0046cc;
    }
  }
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 80px;
  margin-top: 40px;
  margin-bottom: 40px;
  margin-right: -40px;
`;

const RegisterButton = styled(Button)`
  && {
    background-color: #0059ff;
    color: white;

    &:hover {
      background-color: #0046cc;
    }

    padding: 8px 16px; /* 크기 축소 */
    font-size: 14px; /* 폰트 크기 축소 */
  }
`;

const SaveButton = styled(Button)`
  && {
    color: #494a4f;
    border-color: #494a4f;

    &:hover {
      border-color: #494a4f;
      background-color: transparent;
    }

    padding: 8px 16px; /* 크기 축소 */
    font-size: 14px; /* 폰트 크기 축소 */
  }
`;

const DateButton = styled(Button)`
  && {
    background-color: #ffc300;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    position: absolute;
    top: 44px;
    left: 40px;
    text-transform: none;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 11;

    &:hover {
      background-color: #e6b000;
    }

    img {
      transition: transform 0.3s ease;
      transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    }
  }
`;

const ChevronIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const Circle = styled.div`
  width: 134px;
  height: 134px;
  background-color: #e5eefe;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledBookImage = styled.img`
  margin: 26px;
  width: calc(100% - 82px);
  height: calc(100% - 82px);
`;

const Message = styled.p`
  color: #494a4f;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.2px;
  margin-top: 24px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  min-height: calc(100vh - 250px);
  margin-top: -100px;
`;

const TagButton = styled(Button)`
  && {
    &.active {
      color: white;
      border-color: #0059ff;
      background-color: #0059ff;
    }
  }
`;

const BackgroundOverlay = styled.div`
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 140px;
  overflow-y: auto;
`;

const WriteCardContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  background-color: white;
  border-radius: 14.881px;
  padding: 44px 24px 24px;
  position: relative;
  z-index: 1;
  box-shadow: 0px 0px 3.72px 0.744px rgba(139, 139, 139, 0.05);
  margin-bottom: 180px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
  }
`;

const CardTitle = styled.h1`
  color: #1f2024;
  text-align: left;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15px;
  margin-top: 100px;
  margin-bottom: 24px;
  padding: 0 80px;
`;

const Question = styled.p`
  color: #494a4f;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15px;
  margin-top: 20px;
  margin-bottom: 24px;
  padding: 0 80px;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 80px;
  color: #494a4f;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15px;
  margin-top: 20px;
  margin-bottom: 24px;
`;

const LockIconImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const PrivacyNote = styled.p`
  display: flex;
  width: 250px;
  height: 12px;
  flex-direction: column;
  justify-content: left;
  flex-shrink: 0;
  color: #a1a1a1;
  text-align: left;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.149px;
  margin: -8px 80px 24px 80px;
`;

const QuestionSevenWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 80px;
  color: #494a4f;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.15px;
  margin-top: 20px;
  margin-bottom: 24px;
`;

const InfoCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #494a4f;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #494a4f;
  position: relative;

  &:hover {
    & > div {
      display: block;
    }
  }
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  left: 650%;
  transform: translateX(-50%);
  width: 280px;
  background: #e5eefe;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 11%;
    transform: translateX(-50%);
    border: solid transparent;
    height: 0;
    width: 0;
    pointer-events: none;
  }

  &::before {
    border-bottom-color: #e5e5e5;
    border-width: 10px 6px;
    margin-left: -1px;
  }

  &::after {
    border-bottom-color: #e5eefe;
    border-width: 9px 5px;
  }
`;

const TooltipTitle = styled.div`
  color: #494a4f;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 700;
  line-height: 11px;
  margin-bottom: 8px;
`;

const TooltipContent = styled.div`
  color: #494a4f;
  font-family: Pretendard;
  font-size: 8px;
  font-weight: 500;
  line-height: 11px;
`;

// Success Screen Styled Components

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SuccessIconWrapper = styled.div`
  width: 120px;
  height: 120px;
  background-color: #e5eefd; /* 원 색상 변경 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const SuccessMessage = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2024;
  margin-bottom: 12px;
`;

const SuccessSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 32px;
  text-align: center;
`;

const SuccessButton = styled(Button)`
  && {
    background-color: transparent; /* 배경을 투명하게 */
    color: #6b7280; /* 텍스트 색상 변경 */
    border: 1px solid #6b7280; /* 테두리 색상 변경 */
    padding: 8px 16px; /* 크기 축소 */
    border-radius: 8px;
    font-size: 14px; /* 폰트 크기 축소 */
    font-weight: 500;
    text-transform: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px; /* 버튼과 아래 요소 간격 추가 */

    &:hover {
      background-color: rgba(107, 114, 128, 0.1); /* 약간의 배경색 추가 */
      border-color: #6b7280;
      color: #6b7280;
    }
  }
`;

// Main Component

const Retrospect = () => {
  const [journals, setJournals] = useState([]);
  const [selectedFilterTag, setSelectedFilterTag] = useState(null); // 필터링 태그 상태
  const [selectedLearningTag, setSelectedLearningTag] = useState(null); // 단일 선택 상태로 변경
  const [selectedGoodTags, setSelectedGoodTags] = useState([]);
  const [selectedBadTags, setSelectedBadTags] = useState([]);
  const [showWriteCard, setShowWriteCard] = useState(false);
  const [title, setTitle] = useState('');
  const [improvement, setImprovement] = useState('');
  const [performanceValue, setPerformanceValue] = useState(0);
  const [understandingValue, setUnderstandingValue] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false); // 성공 화면 상태

  useEffect(() => {
    if (showWriteCard) {
      setPerformanceValue(0);
      setUnderstandingValue(0);
      setTitle('');
      setImprovement('');
      setSelectedLearningTag(null); // 단일 선택 상태 초기화
      setSelectedGoodTags([]);
      setSelectedBadTags([]);
    }
  }, [showWriteCard]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCalendar && !event.target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  const tags = [
    '전공 공부',
    '자격증 공부',
    '코딩 공부',
    '외국어 공부',
    '부트캠프',
    '고시',
    '팀 프로젝트',
    '개인 프로젝트',
    '그룹 스터디',
    '온라인 강의 수강',
    '기타 (직접입력)',
  ];

  const evaluationTags = [
    '계획 수립',
    '목표 설정',
    '지식 응용',
    '적절한 수준 설정',
    '피드백 수용',
    '시간 관리',
    '복습 및 예습',
    '학습 현황 점검',
    '자원의 효과적 활용',
    '질의응답',
    '기타 (직접입력)',
  ];

  // 필터링 버튼 클릭 핸들러
  const handleTagClick = (tag) => {
    setSelectedFilterTag(selectedFilterTag === tag ? null : tag); // 동일한 태그 클릭 시 필터 해제
  };

  // 학습 태그 클릭 핸들러 (단일 선택)
  const handleLearningTagClick = (tag) => {
    setSelectedLearningTag(selectedLearningTag === tag ? null : tag);
  };

  const handleGoodTagClick = (tag) => {
    if (selectedGoodTags.length >= 3 && !selectedGoodTags.includes(tag)) {
      return;
    }
    if (selectedGoodTags.includes(tag)) {
      setSelectedGoodTags(selectedGoodTags.filter((t) => t !== tag));
    } else {
      setSelectedGoodTags([...selectedGoodTags, tag]);
    }
  };

  const handleBadTagClick = (tag) => {
    if (selectedBadTags.length >= 3 && !selectedBadTags.includes(tag)) {
      return;
    }
    if (selectedBadTags.includes(tag)) {
      setSelectedBadTags(selectedBadTags.filter((t) => t !== tag));
    } else {
      setSelectedBadTags([...selectedBadTags, tag]);
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowWriteCard(false);
    }
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleCardClick = (journal) => {
    setSelectedJournal(journal);
    setIsDetailOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedJournal(null);
  };

  const handleTemporarySave = () => {
    console.log('Temporary Save:', {
      title,
      learningTag: selectedLearningTag, // 단일 태그 저장
      performanceValue,
      understandingValue,
      goodTags: selectedGoodTags,
      badTags: selectedBadTags,
      improvement,
      isLocked,
    });
  };

  const handleSubmit = () => {
    const newJournal = {
      title,
      date: formatDate(selectedDate),
      learningTags: selectedLearningTag ? [selectedLearningTag] : [], // 단일 태그 배열로 저장
      performanceValue,
      understandingValue,
      goodTags: selectedGoodTags,
      badTags: selectedBadTags,
      improvement,
      isLocked,
    };

    setJournals([newJournal, ...journals]);
    setShowWriteCard(false);
    setIsUploadSuccess(true); // 성공 상태로 전환

    // Reset all form fields
    setTitle('');
    setSelectedDate(new Date());
    setSelectedLearningTag(null);
    setPerformanceValue(0);
    setUnderstandingValue(0);
    setSelectedGoodTags([]);
    setSelectedBadTags([]);
    setImprovement('');
    setIsLocked(true);
  };

  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = days[date.getDay()];

    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const formatMonthYear = (locale, date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const valuetext = (value) => `${value}%`;

  // 필터링된 JournalCards 계산
  const filteredJournals = selectedFilterTag
    ? journals.filter((journal) => journal.learningTags.includes(selectedFilterTag))
    : journals; // 필터 태그가 없으면 모든 카드를 표시

  return (
    <RetrospectContainer>
      {isUploadSuccess ? (
        <SuccessContainer>
          {/* 성공 아이콘 */}
          <SuccessIconWrapper>
            <CheckIcon style={{ fontSize: '48px', color: '#0059ff' }} />
          </SuccessIconWrapper>

          {/* 성공 메시지 */}
          <SuccessMessage>회고 일지가 업로드되었습니다.</SuccessMessage>
          <SuccessSubtitle>오늘 하루도 수고했어요! 내일도 화이팅:)</SuccessSubtitle>

          {/* 일지 목록 버튼 */}
          <SuccessButton
            variant="outlined"
            onClick={() => setIsUploadSuccess(false)} // 성공 상태 해제
          >
            일지목록
          </SuccessButton>
        </SuccessContainer>
      ) : (
        <>
          {!showWriteCard ? (
            <>
              <TopButtonContainer>
                <UnderlinedButton>임시보관 일지</UnderlinedButton>
                <StyledButton
                  variant="contained"
                  size="medium"
                  onClick={() => setShowWriteCard(true)}
                >
                  + 회고일지 작성하기
                </StyledButton>
              </TopButtonContainer>
              <TagButtonsContainer>
                <TagButtons direction="row" spacing={1}>
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outlined"
                      onClick={() => handleTagClick(tag)}
                      className={selectedFilterTag === tag ? 'active' : ''}
                      sx={{
                        height: '36px',
                        padding: '0 16px',
                        minWidth: 'auto',
                        marginRight: '8px',
                        marginBottom: '8px',
                        borderRadius: '18px',
                        '&.active': {
                          borderColor: '#0059ff',
                          color: 'white',
                          backgroundColor: '#0059ff',
                          '&:hover': {
                            borderColor: '#0046cc',
                            color: 'white',
                            backgroundColor: '#0046cc',
                          },
                        },
                        '&:not(.active)': {
                          borderColor: '#a1a1a1',
                          color: '#a1a1a1',
                          '&:hover': {
                            borderColor: '#a1a1a1',
                            backgroundColor: 'transparent',
                          },
                        },
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </TagButtons>
                {filteredJournals.length > 0 ? (
                  <div
                    style={{
                      marginTop: '32px',
                      marginLeft: '30px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, 290px)',
                      gap: '40px 80px',
                      justifyContent: 'start', // 왼쪽 정렬 유지
                    }}
                  >
                    {filteredJournals.map((journal, index) => (
                      <RetrospectJournalCard
                        key={index}
                        journal={journal}
                        onClick={() => handleCardClick(journal)}
                      />
                    ))}
                  </div>
                ) : (
                  <ContentContainer>
                    <Circle>
                      <StyledBookImage src={BookImage} alt="Book" />
                    </Circle>
                    <Message>회고일지 작성을 통해 한 걸음 더 성장해 보아요!</Message>
                  </ContentContainer>
                )}
              </TagButtonsContainer>

              <SlideOutDetailView isOpen={isDetailOpen}>
                <CloseButton onClick={handleDetailClose}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </CloseButton>

                {selectedJournal && (
                  <DetailContent>
                    {/* 날짜 */}
                    <div
                      style={{
                        backgroundColor: '#FFC300',
                        color: '#FFFFFF',
                        padding: '16px 16px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '14px',
                        display: 'inline-block',
                        textAlign: 'left', // 좌측 정렬
                        maxWidth: '100px', // 길이 제한
                        whiteSpace: 'nowrap', // 한 줄 유지
                        overflow: 'hidden', // 넘칠 경우 숨김
                        textOverflow: 'ellipsis', // 말줄임 표시
                        lineHeight: '2px',
                        marginBottom: '24px',
                      }}
                    >
                      {selectedJournal.date}
                    </div>

                    {/* 질문 1 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        1. 오늘의 회고일지 제목
                      </h3>
                      <p style={{ fontSize: '14px', color: '#494A4F' }}>
                        {selectedJournal.title}
                      </p>
                    </div>

                    {/* 질문 2 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        2. 오늘은 어떤 학습을 진행하셨나요?
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {tags.map((tag) => (
                          <Button
                            key={tag}
                            variant="outlined"
                            onClick={() => handleLearningTagClick(tag)}
                            className={selectedLearningTag === tag ? 'active' : ''}
                            sx={{
                              height: '36px',
                              padding: '0 16px',
                              minWidth: 'auto',
                              marginRight: '8px',
                              marginBottom: '8px',
                              borderRadius: '18px',
                              '&.active': {
                                borderColor: '#0059ff',
                                color: 'white',
                                backgroundColor: '#0059ff',
                                '&:hover': {
                                  borderColor: '#0046cc',
                                  color: 'white',
                                  backgroundColor: '#0046cc',
                                },
                              },
                              '&:not(.active)': {
                                borderColor: '#a1a1a1',
                                color: '#a1a1a1',
                                '&:hover': {
                                  borderColor: '#a1a1a1',
                                  backgroundColor: 'transparent',
                                },
                              },
                            }}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* 질문 3 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        3. 오늘 계획한 학습의 수행정도를 평가해주세요.
                      </h3>
                      <Box sx={{ width: '100%' }}>
                        <Slider
                          value={selectedJournal.performanceValue}
                          step={10}
                          marks
                          min={0}
                          max={100}
                          disabled
                          sx={{
                            color: '#0059ff', // 슬라이더 색상
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#0059ff', // 슬라이더 손잡이 색상
                            },
                            '& .MuiSlider-track': {
                              backgroundColor: '#0059ff', // 슬라이더 채워진 트랙 색상
                            },
                            '& .MuiSlider-rail': {
                              backgroundColor: '#cfd8dc', // 슬라이더 비채워진 트랙 색상
                            },
                          }}
                          aria-label="학습 수행정도"
                          getAriaValueText={valuetext}
                          valueLabelDisplay="on"
                        />
                      </Box>
                    </div>

                    {/* 질문 4 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        4. 오늘 학습한 내용의 이해도를 평가해주세요.
                      </h3>
                      <Box sx={{ width: '100%' }}>
                        <Slider
                          value={selectedJournal.understandingValue}
                          step={10}
                          marks
                          min={0}
                          max={100}
                          disabled
                          sx={{
                            color: '#0059ff', // 슬라이더 색상
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#0059ff', // 슬라이더 손잡이 색상
                            },
                            '& .MuiSlider-track': {
                              backgroundColor: '#0059ff', // 슬라이더 채워진 트랙 색상
                            },
                            '& .MuiSlider-rail': {
                              backgroundColor: '#cfd8dc', // 슬라이더 비채워진 트랙 색상
                            },
                          }}
                          aria-label="학습 이해도"
                          getAriaValueText={valuetext}
                          valueLabelDisplay="on"
                        />
                      </Box>
                    </div>

                    {/* 질문 5 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        5. 학습의 전반적인 과정에서 어떤 점을 가장 잘했다고 생각하시나요?
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedJournal.goodTags?.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: '#0059ff',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              color: 'white',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 질문 6 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        6. 학습의 전반적인 과정에서 어떤 점이 부족했다고 생각하시나요?
                      </h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedJournal.badTags?.map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: '#0059ff',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              color: 'white',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 질문 7 */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                        }}
                      >
                        7. 부족한 점을 개선하기 위해 어떤 노력을 할 수 있을까요?
                      </h3>
                      <p style={{ fontSize: '14px', color: '#494a4f' }}>
                        {selectedJournal.improvement}
                      </p>
                    </div>

                    {/* 질문 8 */}
                    <div
                      style={{
                        marginBottom: '32px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          marginBottom: '8px',
                          marginRight: '10px', // 텍스트와 아이콘 간격 조정
                        }}
                      >
                        8. 커뮤니티 공개여부
                      </h3>
                      <img
                        src={selectedJournal.isLocked ? LockIcon : UnlockIcon}
                        alt={selectedJournal.isLocked ? '비공개' : '공개'}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'default',
                          marginTop: '8px',
                        }}
                      />
                    </div>

                    {/* 수정 버튼 */}
                    <EditButton variant="outlined">수정하기</EditButton>
                  </DetailContent>
                )}
              </SlideOutDetailView>
            </>
          ) : (
            <BackgroundOverlay onClick={handleBackgroundClick}>
              <WriteCardContainer>
                <DateButton variant="contained" onClick={toggleCalendar} $isOpen={showCalendar}>
                  {formatDate(selectedDate)}
                  <ChevronIcon src={ChevronDown} alt="chevron" />
                </DateButton>

                {showCalendar && (
                  <CalendarContainer className="calendar-container">
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate}
                      formatDay={(locale, date) => date.getDate()}
                      formatShortWeekday={(locale, date) => {
                        const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
                        return weekdays[date.getDay()];
                      }}
                      formatMonthYear={formatMonthYear}
                      locale="en-US"
                    />
                  </CalendarContainer>
                )}

                <CardTitle>오늘의 회고일지를 작성해보세요!</CardTitle>
                <QuestionsContainer>
                  {/* 질문 1 */}
                  <Question>1. 오늘의 회고일지 제목을 적어 볼까요?</Question>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                      width: 'calc(100% - 160px)',
                      margin: '8px 80px 24px 80px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '100px',
                        height: '40px',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '8px 16px',
                        height: '24px',
                      },
                    }}
                  />

                  {/* 질문 2 - 단일 선택으로 변경 */}
                  <Question>2. 오늘은 어떤 학습을 진행하셨나요?</Question>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      margin: '8px 80px 24px 80px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {tags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outlined"
                        onClick={() => handleLearningTagClick(tag)}
                        className={selectedLearningTag === tag ? 'active' : ''}
                        sx={{
                          height: '36px',
                          padding: '0 16px',
                          minWidth: 'auto',
                          marginRight: '8px',
                          marginBottom: '8px',
                          borderRadius: '18px',
                          '&.active': {
                            borderColor: '#0059ff',
                            color: 'white',
                            backgroundColor: '#0059ff',
                            '&:hover': {
                              borderColor: '#0046cc',
                              color: 'white',
                              backgroundColor: '#0046cc',
                            },
                          },
                          '&:not(.active)': {
                            borderColor: '#a1a1a1',
                            color: '#a1a1a1',
                            '&:hover': {
                              borderColor: '#a1a1a1',
                              backgroundColor: 'transparent',
                            },
                          },
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>

                  {/* 질문 3 */}
                  <Question>3. 오늘 계획한 학습의 수행정도를 평가해주세요.</Question>
                  <Box
                    sx={{
                      width: 'calc(100% - 160px)',
                      margin: '8px 80px 24px 80px',
                    }}
                  >
                    <Slider
                      aria-label="학습 수행정도"
                      defaultValue={0}
                      value={performanceValue}
                      onChange={(event, newValue) => setPerformanceValue(newValue)}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      sx={{
                        color: '#0059ff', // 슬라이더 색상
                        '& .MuiSlider-thumb': {
                          backgroundColor: '#0059ff', // 슬라이더 손잡이 색상
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: '#0059ff', // 슬라이더 채워진 트랙 색상
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: '#cfd8dc', // 슬라이더 비채워진 트랙 색상
                        },
                      }}
                    />
                  </Box>

                  {/* 질문 4 */}
                  <Question>4. 오늘 학습한 내용의 이해도를 평가해주세요.</Question>
                  <Box
                    sx={{
                      width: 'calc(100% - 160px)',
                      margin: '8px 80px 24px 80px',
                    }}
                  >
                    <Slider
                      aria-label="학습 이해도"
                      defaultValue={0}
                      value={understandingValue}
                      onChange={(event, newValue) => setUnderstandingValue(newValue)}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={0}
                      max={100}
                      sx={{
                        color: '#0059ff', // 슬라이더 색상
                        '& .MuiSlider-thumb': {
                          backgroundColor: '#0059ff', // 슬라이더 손잡이 색상
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: '#0059ff', // 슬라이더 채워진 트랙 색상
                        },
                        '& .MuiSlider-rail': {
                          backgroundColor: '#cfd8dc', // 슬라이더 비채워진 트랙 색상
                        },
                      }}
                    />
                  </Box>

                  {/* 질문 5 */}
                  <Question>
                    5. 학습의 전반적인 과정에서 어떤 점을 가장 잘했다고 생각하시나요?(최대3개)
                  </Question>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      margin: '8px 80px 24px 80px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {evaluationTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outlined"
                        onClick={() => handleGoodTagClick(tag)}
                        className={selectedGoodTags.includes(tag) ? 'active' : ''}
                        sx={{
                          height: '36px',
                          padding: '0 16px',
                          minWidth: 'auto',
                          marginRight: '8px',
                          marginBottom: '8px',
                          borderRadius: '18px',
                          '&.active': {
                            borderColor: '#0059ff',
                            color: 'white',
                            backgroundColor: '#0059ff',
                            '&:hover': {
                              borderColor: '#0046cc',
                              color: 'white',
                              backgroundColor: '#0046cc',
                            },
                          },
                          '&:not(.active)': {
                            borderColor: '#a1a1a1',
                            color: '#a1a1a1',
                            '&:hover': {
                              borderColor: '#a1a1a1',
                              backgroundColor: 'transparent',
                            },
                          },
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>

                  {/* 질문 6 */}
                  <Question>
                    6. 학습의 전반적인 과정에서 어떤 점이 부족했다고 생각하시나요?(최대3개)
                  </Question>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      margin: '8px 80px 24px 80px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    {evaluationTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outlined"
                        onClick={() => handleBadTagClick(tag)}
                        className={selectedBadTags.includes(tag) ? 'active' : ''}
                        sx={{
                          height: '36px',
                          padding: '0 16px',
                          minWidth: 'auto',
                          marginRight: '8px',
                          marginBottom: '8px',
                          borderRadius: '18px',
                          '&.active': {
                            borderColor: '#0059ff',
                            color: 'white',
                            backgroundColor: '#0059ff',
                            '&:hover': {
                              borderColor: '#0046cc',
                              color: 'white',
                              backgroundColor: '#0046cc',
                            },
                          },
                          '&:not(.active)': {
                            borderColor: '#a1a1a1',
                            color: '#a1a1a1',
                            '&:hover': {
                              borderColor: '#a1a1a1',
                              backgroundColor: 'transparent',
                            },
                          },
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Stack>

                  {/* 질문 7 */}
                  <QuestionSevenWrapper>
                    <span>
                      7. 부족한 점을 개선하기 위해 어떤 노력을 할 수 있을까요?
                    </span>
                    <InfoCircle>
                      <span>i</span>
                      <Tooltip>
                        <TooltipTitle>어떻게 하면 잘 작성할 수 있을까요?</TooltipTitle>
                        <TooltipContent>
                          회고는 단순히 문제점을 찾는 것이 아닌 액션 플랜을 함께 작성해야 더 효과적이에요. 개선점에는 내가 생각한 부족한 점을 바탕으로 최대한 현실적으로 구체적인 방안을 생각해 작성해보세요!
                        </TooltipContent>
                      </Tooltip>
                    </InfoCircle>
                  </QuestionSevenWrapper>

                  {/* 질문 7 입력 */}
                  <TextField
                    id="improvement-input"
                    variant="outlined"
                    value={improvement}
                    onChange={(e) => setImprovement(e.target.value)}
                    sx={{
                      width: 'calc(100% - 160px)',
                      margin: '8px 80px 24px 80px',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '100px',
                        height: '40px',
                      },
                      '& .MuiOutlinedInput-input': {
                        padding: '8px 16px',
                        height: '24px',
                      },
                    }}
                  />

                  {/* 질문 8 */}
                  <QuestionContainer>
                    <span>8. 커뮤니티 공개여부를 선택해주세요.</span>
                    <LockIconImage
                      src={isLocked ? LockIcon : UnlockIcon}
                      alt="lock-status"
                      onClick={toggleLock}
                    />
                  </QuestionContainer>
                  <PrivacyNote>
                    *공개로 설정 시, 커뮤니티 피드에 자동으로 업로드됩니다.
                  </PrivacyNote>

                  {/* 버튼 */}
                  <BottomButtonContainer>
                    <SaveButton variant="outlined" onClick={handleTemporarySave}>
                      임시저장
                    </SaveButton>
                    <RegisterButton variant="contained" onClick={handleSubmit}>
                      등록하기
                    </RegisterButton>
                  </BottomButtonContainer>
                </QuestionsContainer>
              </WriteCardContainer>
            </BackgroundOverlay>
          )}
        </>
      )}
    </RetrospectContainer>
  );
};

export default Retrospect;