import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BornLives,
  BornLivesWrap,
  CardWrapper,
  DescriptionInfo,
  DescriptionWrap,
  PhotoWrap,
  UserCardContent,
  UserCardPar,
  UserCardWrapper,
  UserImage,
  UserTitle,
  WrapBtn,
  WrapInfo,
  WrapTitle
} from  './styles';
import { ButtonStyled } from '../Button/styles';

interface User {
  id: number;
  name: string;
  email: string;
  bornCity: string;
  liveCity: string;
  image: string;
  description: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
//   const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No token provided');
          return;
        }

        const response = await fetch(`/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`error HTTP: статус ${response.status}`);
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('User load error:', error);
      }
    };

    fetchUser();
  }, []);

  const handleEditProfileClick = () => {
  
    if (user) {
      navigate(`/users/updateUser`);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <CardWrapper>
      <UserCardWrapper>
        <WrapTitle>
          <UserTitle>{user.name}'s profile</UserTitle>
        </WrapTitle>
        <WrapInfo>
          <BornLivesWrap>
            <BornLives>
              <UserCardPar>Born:</UserCardPar>
              <UserCardContent>{user.bornCity}</UserCardContent>
            </BornLives>
            <BornLives>
              <UserCardPar>Lives:</UserCardPar>
              <UserCardContent>{user.liveCity}</UserCardContent>
            </BornLives>
          </BornLivesWrap>
          <DescriptionWrap>
            <DescriptionInfo>{user.description}</DescriptionInfo>
            <WrapBtn>
              <ButtonStyled
                              onClick={handleEditProfileClick} disabled={false} selected={false}              >
                EDIT PROFILE
              </ButtonStyled>
            </WrapBtn>
          </DescriptionWrap>
          <PhotoWrap>
            <UserImage src={user.image} alt={`${user.name}'s profile`} />
          </PhotoWrap>
        </WrapInfo>
      </UserCardWrapper>
    </CardWrapper>
  );
};

export default UserProfile;