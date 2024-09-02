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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/AuthSlice';
import { RootState } from '../../redux/Store';

const HeaderComponent: React.FC<IUser> = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [randomArtwork, setRandomArtwork] = useState<IArtwork | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [, setIsLoading] = useState<boolean>(true);
  const [, setIsLoggedIn] = useState<boolean>(false);
  

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token); 

    fetch('/api/users/artists')
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

  function getArtistName(artwork: IArtwork) {
    const matchedUser = users.find((user) => artwork.userId === user.id);
    if (matchedUser) {
      console.log('Found artist:', matchedUser.id);
    } else {
      console.warn('Artist not found for artwork:', artwork);
    }
    return matchedUser ? matchedUser.name : 'Unknown Artist';
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    dispatch(logout());
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  return (
    <HeaderWrap>
      <HeaderWrapBlck>
        <WrapUserInfo>
          <UserInfo>
            {randomArtwork && (
              <ArtLink to={`/works/${randomArtwork.id}`}>
                {randomArtwork.title}{"  |  "}{getArtistName(randomArtwork)}{"  |  "} {randomArtwork.createdAt}
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
            <NavLink to='/users/artists'>ARTISTS</NavLink>
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
            {isLoggedIn ? (
              <img
                src='/assets/exit.png'
                alt='Logout'
                onClick={handleLogout} 
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Link to='/login'>
                <IconLock src='/assets/Lock.png' alt='Login' />
              </Link>
            )}
          </WrapIcons>
        </HeaderContainer>
      </HeaderWrapWht>
    </HeaderWrap>
  );
};

export default HeaderComponent;