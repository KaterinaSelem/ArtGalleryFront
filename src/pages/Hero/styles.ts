import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// const imagePath = ''

export const HomePageComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url('src/assets/backgroundHome.jpg');
  height: 842px;
`;

export const StyledList = styled.div`
width: fit-content;
padding: 17px 739px 40px 152px;
align-items: center;
color: #FFF;
font-family: Barlow;
font-size: 32px;
font-style: normal;
font-weight: 400;
line-height: var(--Display-Medium-Line-Height, 52px);
margin-top: 20px;
`

export const StyledLink = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  background: transparent;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #D9D9D9;
  }

  /* &.active {
    background-color: #007bff;
    color: #fff;
    border: none;
  } */
`;