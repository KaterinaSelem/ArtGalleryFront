import { useEffect, useState } from 'react';
import { IArtwork } from '../../components/Artworks/types';
import {
  ArtLink,
  ButtonDiv,
  HeaderContainer,
  HeaderWrap,
  HeaderWrapBlck,
  HeaderWrapWht,
  Icon,
  Logo,
  Nav,
  NavLink,
  UserInfo,
  WrapIcons,
  WrapUserInfo,
} from './styles';
import { ArtworkPrewProps } from '../../components/Artworks/artworkPrew';

const Header: React.FC<ArtworkPrewProps> = ({ users }) => {
  const [randomArtwork, setRandomArtwork] = useState<IArtwork | null>(null);

  useEffect(() => {
    const fetchRandomArtwork = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/works');
        const data = await response.json();

        if (Array.isArray(data)) {
          const userArtworks = data.filter(
            (artwork) => artwork.userId === artwork.userId
          );
          if (userArtworks.length > 0) {
            const randomIndex = Math.floor(Math.random() * userArtworks.length);
            setRandomArtwork(userArtworks[randomIndex]);
          } else {
            console.warn('No artworks found for user with', data);
          }
        } else {
          console.error('Fetched data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchRandomArtwork();
  }, []);

  const getArtistName = (userId: number) => {
    if (!users) return ['Unknown Artist'];
    const matchedUsers = users.filter((user) => userId === user.id);
    return matchedUsers.length > 0
      ? matchedUsers.map((user) => user.name)
      : ['Unknown Artist'];
  };

  return (
    <HeaderWrap>
      <HeaderWrapBlck>
        <WrapUserInfo>
          <UserInfo>
            {randomArtwork && (
              <ArtLink to={`/artwork/${randomArtwork.id}`}>
                {randomArtwork.title}  |  {getArtistName(randomArtwork.userId)}  |
                 2004
              </ArtLink>
            )}
          </UserInfo>
          <ButtonDiv>
            <button
              style={{
                color: 'white',
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
              }}
            >
              ENG
            </button>
          </ButtonDiv>
        </WrapUserInfo>
      </HeaderWrapBlck>
      <HeaderWrapWht>
        <HeaderContainer>
          <Nav>
            <NavLink to='/artists'>ARTISTS</NavLink>
            <NavLink to='/galleries'>GALLERIES</NavLink>
          </Nav>
          <Logo>
            <img src='src/assets/logo.svg' alt='Favorites'></img>
          </Logo>
          <WrapIcons>
            <Icon src='src/assets/Heart.png' alt='Favorites' />
            <Icon src='src/assets/Lock.png' alt='Login' />
          </WrapIcons>
        </HeaderContainer>
      </HeaderWrapWht>
    </HeaderWrap>
  );
};

export default Header;
