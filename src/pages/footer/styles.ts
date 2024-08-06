import styled from '@emotion/styled';

export const FooterContainer = styled.div`
  display: flex;
  /* justify-content: space-around; */
  background-color: black;
  color: white;
  padding: 20px;
  font-family: Arial, sans-serif;
  gap: 20px;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
`;

export const FooterTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const FooterItem = styled.p`
  font-size: 14px;
  margin: 5px 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;