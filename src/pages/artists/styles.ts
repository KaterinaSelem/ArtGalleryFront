import styled from "@emotion/styled";
import { Link } from 'react-router-dom';

export const UsersWrap = styled.div`
  display: flex;
  background-color: #F4F4F4;
  height: fit-content;`

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

export const Title = styled.div`
font-size: 40px;
font-weight: 400;
font-family: Barlow;
font-style: normal;
line-height: normal;
`;

export const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
  gap: 20px; /* Space between cards */
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
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



export const HomePageComponent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-image: url('/assets/backgroundHome.jpg');
  background-size: cover;
  height: 800px;
  padding: 20px;
  box-sizing: border-box;
  padding-bottom: 80px;
  padding-left: 150px;
  
`;

export const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
  max-height: 900px;
  overflow-y: auto; /* Scroll if content overflows */
  color: #FFF;
  font-family: Barlow;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 60px;
  margin-top: 20px;
  box-sizing: border-box;
`;


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
`;

export const UserCardWrap = styled.div`
  display: flex;
  height: 518px;
  background-size: cover;
  background-position: center;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  width: 100%; /* Make sure the card takes up the full grid cell */
`;

export const ContainerArtists = styled.div`
  width: 100%;
  max-width: 1440px;
  height: fit-content;
  flex-shrink: 0;
  padding: 12px 60px 0 60px;
  font-family: Barlow;
  background-color: #F4F4F4;
  margin-top: 60px;
  margin-bottom: 60px;
  margin-left: 60px;
`;