import React from "react";
import { ContentBox, BoxTitle, BoxValue } from "./styles";

const StatusBox = ({ title, value }) => {
  return (
    <ContentBox>
      <BoxTitle>{title}</BoxTitle>
      <BoxValue>{value}</BoxValue>
    </ContentBox>
  );
};

export default StatusBox;
