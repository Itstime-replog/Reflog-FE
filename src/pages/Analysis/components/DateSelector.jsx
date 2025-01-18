import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReport } from "../context/ReportContext";
import { ko } from "date-fns/locale";

const Container = styled.div`
  position: relative;
  margin: 20px 0;
  z-index: 100;
`;

const DateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: #ffd74b;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  min-width: 200px;

  &:after {
    content: "▼";
    margin-left: 8px;
    font-size: 12px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  background: #ffd74b;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const CustomDatePickerStyles = styled.div`
  .react-datepicker-wrapper {
    position: relative;
    z-index: 1000;
  }

  .react-datepicker {
    font-family: "Pretendard";
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    position: absolute;
    background: white;
    left: 50%;
    transform: translateX(-50%);
  }

  .react-datepicker-popper {
    z-index: 1000 !important;
  }

  .react-datepicker__header {
    background-color: white;
    border-bottom: none;
    padding: 0;
    margin: 0;
  }

  .react-datepicker__navigation {
    top: 20px;
  }

  .react-datepicker__current-month {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .react-datepicker__month {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .react-datepicker__month-text {
    padding: 10px;
    margin: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: auto !important;
    border-radius: 8px;

    &:hover {
      background-color: rgba(255, 215, 75, 0.3);
    }

    &.react-datepicker__month--selected {
      background-color: #ffd74b;
      color: black;
    }
  }

  .react-datepicker__month-container {
    float: none;
  }

  .react-datepicker__year-read-view {
    font-size: 18px;
    font-weight: 600;
  }

  .react-datepicker__navigation--previous {
    border: none;
    left: 20px;
  }

  .react-datepicker__navigation--next {
    border: none;
    right: 20px;
  }

  .react-datepicker__year-dropdown {
    background-color: white;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .react-datepicker__year-option {
    padding: 8px 16px;

    &:hover {
      background-color: rgba(255, 215, 75, 0.3);
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__day-names {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .react-datepicker__day-name {
    width: 32px;
    text-align: center;
  }

  .react-datepicker__month {
    display: table;
    margin: 0;
    border-spacing: 8px;
    border-collapse: separate;
  }

  .react-datepicker__week {
    display: table-row;
  }

  .react-datepicker__day {
    display: table-cell;
    width: 32px;
    height: 32px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 215, 75, 0.3);
    }

    &.react-datepicker__day--selected {
      background-color: #ffd74b;
      color: black;
    }

    &.react-datepicker__day--in-range {
      background-color: rgba(255, 215, 75, 0.5);
      color: black;
    }

    &.react-datepicker__day--range-start,
    &.react-datepicker__day--range-end {
      background-color: #ffd74b;
      color: black;
    }
  }
`;

const DateSelector = () => {
  const { reportType } = useReport();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [monthDate, setMonthDate] = useState(new Date());

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      ...(reportType === "weekly" ? { day: "numeric" } : {}),
    }).format(date);
  };

  const handleWeeklyChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleMonthlyChange = (date) => {
    setMonthDate(date);
  };

  return (
    <Container>
      <CustomDatePickerStyles>
        {reportType === "weekly" ? (
          <StyledDatePicker
            selected={startDate}
            onChange={handleWeeklyChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            locale={ko}
            dateFormat="yyyy.MM.dd"
            placeholderText="기간을 선택하세요"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={
              startDate && endDate
                ? `${formatDate(startDate)} ~ ${formatDate(endDate).split("년")[1]}`
                : "기간을 선택하세요"
            }
          />
        ) : (
          <StyledDatePicker
            selected={monthDate}
            onChange={handleMonthlyChange}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            locale={ko}
            showFullMonthYearPicker
            showTwoColumnMonthYearPicker
            placeholderText="월을 선택하세요"
          />
        )}
      </CustomDatePickerStyles>
    </Container>
  );
};

export default DateSelector;
