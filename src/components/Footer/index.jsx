import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: calc(100% - 240px);
  margin-left: 240px;
  height: 80px;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  // border-top 속성 제거
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 8px;
`;

const Link = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #4A86F7;
  }
`;

const Copyright = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
  letter-spacing: -0.3px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LinkContainer>
        <Link>이용약관</Link>
        <Link>개인정보처리방침</Link>
        <Link>문의하기</Link>
      </LinkContainer>
      <Copyright>© 2024. 리플로그 All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;