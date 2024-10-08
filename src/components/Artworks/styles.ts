
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';


export const Title = styled.div`
font-size: 40px;
font-weight: 400;
font-family: Barlow;
font-style: normal;
line-height: normal;
margin-top: 56px;
margin-bottom: 24px;
margin-left: 60px;
`;

export const ContainerArtworks = styled.div`
display: flex;
flex-direction: column;
align-items: left;
gap: 20px;
height: 746px;
margin-left: 60px;
`;

export const ContainerArtworksGallery = styled.div`
display: flex;
flex-direction: column;
align-items: left;
gap: 20px;
height: fit-content;
margin-left: 60px;
margin-bottom: 40px;
`;

export const ArtworksContainer = styled.div`
display: flex;
flex-wrap: wrap;
height:fit-content;
width: 100%;
max-width: 1440px;
gap: 30px;
margin-left: 60px;

`;

export const ArtworkPreveiwcontainer = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`

export const StyledArtLinkWorkPreview = styled(Link)`
  font-size: 20px;
  font-weight: 400;
  font-family: Barlow;
  font-style: normal;
  line-height: normal;
  color: white;
  text-decoration: none;
`;

export const Frame = styled.div`
  display: flex;
  height: 320px;
  width: 320px;
  background-size: cover;
  background-color: #cecdcd;
  justify-content: center;
  align-items: center;
  `
  

  export const ArtworkCard = styled.div`
  display: flex;
  height: 220px;
  width: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease; 
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
 

export const ArtworkInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Barlow', sans-serif;
`;

export const ArtTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-top: 16px;
  color: #000;
  width: 319px;
  margin-bottom: 16px;
`;

export const ArtistStyled = styled.h2`
  font-size: 16px;
  font-weight: 400;
  color: #707070;

`;

export const Details = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #707070;
  margin-top: 12px;
`;

export const Separator = styled.span`
  margin: 0 8px;
`;

export const Status = styled.span`
  display: flex;
  align-items: center;
`;

export const StatusIndicator = styled.span<{ comition: boolean }>`
  width: 8px;
  height: 8px;
  background-color: ${({ comition }) => (comition ? 'green' : '#bcbcbc')};
  border-radius: 50%;
  margin-left: 4px;
`;
