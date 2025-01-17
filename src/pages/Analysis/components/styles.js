import styled from "styled-components";

export const Box = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 0px 4px rgba(139, 139, 139, 0.25);
`;

export const ContentBox = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 50px 30px;
`;

export const BoxTitle = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
  text-align: left;
  letter-spacing: 0.250707px;
  color: #000000;
  width: 100%;
`;

export const BoxValue = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 43px;
  text-align: right;
  letter-spacing: 0.250707px;
  color: #0059ff;
  width: 100%;
`;
