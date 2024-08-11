import { useEffect, useState } from 'react';
import { IArtwork } from '../../components/Artworks/types';
import {
  ArtLink,
  ButtonDiv,
  HeaderContainer,
  HeaderWrap,
  HeaderWrapBlck,
  HeaderWrapWht,
  IconLock,
  IconUser,
  Logo,
  Nav,
  NavLink,
  UserInfo,
  WrapIcons,
  WrapUserInfo,
} from './styles';
import { IUser } from '../../components/UserCard/types';
import { Link } from 'react-router-dom';



const HeaderComponent: React.FC<IUser> = () => {
  const [randomArtwork, setRandomArtwork] = useState<IArtwork | null>(null);

  const [users, setUsers] = useState<IUser[]>([]);
  const [, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((user: IUser[]) => {
        setUsers(user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching artworks:', error);
        setIsLoading(false);
      });
  }, []);


  useEffect(() => {
    const fetchRandomArtwork = async () => {
      try {
        const response = await fetch('/api/works');
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
              <ArtLink to={`/works/${randomArtwork.id}`}>
                {randomArtwork.title} | {getArtistName(randomArtwork.userId)} |
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
            <NavLink to='/users'>ARTISTS</NavLink>
            <NavLink to='/works'>GALLERY</NavLink>
          </Nav>
          <Link to='/'>
            <Logo>
              <img src='/assets/logo.svg' alt='HomePage'></img>
            </Logo>
          </Link>
          <WrapIcons>
          <Link to='/users/profile/'>
            <IconUser src='/assets/user_active.gif' alt='User' />
            </Link>
            <Link to='/login'>
              <IconLock src='/assets/Lock.png' alt='Login' />
            </Link>
          </WrapIcons>
        </HeaderContainer>
      </HeaderWrapWht>
    </HeaderWrap>
  );
};

export default HeaderComponent;
