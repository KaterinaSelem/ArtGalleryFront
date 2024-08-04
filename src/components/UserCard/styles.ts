import styled from "@emotion/styled";
import { Link } from 'react-router-dom';

export const UsersWrap = styled.div`
  display: flex;
  background-color: #F4F4F4;`

export const CardWrapper = styled.div`
display: flex;
width: 100%;
background: #F4F4F4;
justify-content: center;
margin-bottom: 40px;
`
export const UserCardWrapper = styled.div`
max-width: 80%px;
height: 676px;
flex-shrink: 0;
background: #F4F4F4;
`
export const WrapTitle= styled.div`
display: inline-flex;
padding: 65px 0px 12px 14px;
align-items: center;
border-bottom: 2px solid #000;
width: 100%;`

export const UserTitle= styled.div`
color: #000;
width: 80%;
font-family: "Playfair Display";
font-size: 96px;
font-style: italic;
font-weight: 700;
`
export const WrapInfo= styled.div`
display: flex;
flex-direction: row;
width: 1440px;
height: auto;
flex-shrink: 0;`;

export const BornLivesWrap = styled.div`
display: flex;
flex-direction: column;
width: 305px;
padding: 50px 0px 0px 20px;
align-items: left;`

export const BornLives = styled.div`
display: flex;
flex-direction: column;
padding: 0px 0px 16px 0px;
`

export const UserCardPar= styled.div`
color: #000;
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 0px;
`

export const UserCardContent= styled.p`
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px;
`

export const DescriptionWrap = styled.div`
display: flex;
flex-direction: column;
width: 528px;
flex-shrink: 0;`

export const DescriptionInfo = styled.div`
color: #000;
text-align: justify;
font-family: Barlow;
font-size: 16px;
font-style: normal;
font-weight: 400;
padding: 35px 12px 60px 0px;
line-height: 24px;`

export const UserImage = styled.div`
width: 400px;
height: 400px;
flex-shrink: 0;
padding: 45px 0px 0px 109px;
`

export const WrapBtn = styled.div`
width: 197px;
height: 48px;
flex-shrink: 0;
`

export const StyledLinkPreview = styled(Link)`
width: 336px;
  display: inline-block;
  color: white;
  text-decoration: none;
  background: transparent;
  margin-top: 330px;
font-family: "Playfair Display";
font-size: 40px;
font-style: italic;
font-weight: 500;
line-height: var(--Display-Medium-Line-Height, 52px); 
  cursor: pointer;

  &:hover {
    color: #D9D9D9;
  };
  align-self: center;`

export const Container = styled.div`
width: 1440px;
height: 808px;
flex-shrink: 0;
padding: 12px 0px 0px 60px;
font-family: Barlow;
background-color: #F4F4F4;
margin-left: 60px;
margin-top: 60px;
`;

export const Title = styled.div`
margin-top: 30px;
font-size: 40px;
font-weight: 400;
font-family: Barlow;
font-style: normal;
line-height: normal;
`;

export const UsersContainer = styled.div`
display: flex;
flex-direction: row;
gap: 20px;
flex-wrap: nowrap;
align-items: center;
`;

export const UserCard = styled.div`
display: flex;
margin-top: 60px;
height: 518px;
background-size: cover;
background-position: center;
justify-content: center;
align-items: center;
justify-content: center;
position: relative;
text-align: center;
`;


