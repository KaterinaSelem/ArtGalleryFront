import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from './User';
import { BornLives, BornLivesWrap, CardWrapper, DescriptionInfo, DescriptionWrap, UserCardContent, UserCardPar, UserCardWrapper, UserImage, UserTitle, WrapBtn, WrapInfo, WrapTitle } from './styles';
import { ButtonStyled } from '../Button/styles';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${1}`)
      .then((response) => response.json())
      .then((data: IUser) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <div>Artist not found</div>;
  }

  return (
    <CardWrapper>
        <UserCardWrapper>
          <WrapTitle><UserTitle>{user.name}</UserTitle></WrapTitle>
          <WrapInfo>
            <BornLivesWrap>
              <BornLives>
                <UserCardPar>Born:</UserCardPar>
                <UserCardContent> {user.bornCity}</UserCardContent>
              </BornLives>  
              <BornLives>
                <UserCardPar>Lives:</UserCardPar>
                <UserCardContent>  {user.liveCity}</UserCardContent> 
              </BornLives>
              <BornLives>
                <UserCardPar>Exhibition: </UserCardPar>
                <UserCardContent>  {user.exhibition}</UserCardContent>
              </BornLives>
            </BornLivesWrap>
          <DescriptionWrap>
            <DescriptionInfo>{user.description}</DescriptionInfo>
            <WrapBtn>
            <ButtonStyled disabled={true} selected={false}>CONNECT ME</ButtonStyled>
            </WrapBtn>
          </DescriptionWrap>
          <DescriptionWrap>
            <UserImage>
     
            { <img src={user.image} alt="" className="imgHight" />}
          
            </UserImage>
          </DescriptionWrap>
         
          </WrapInfo>
        </UserCardWrapper>
        </CardWrapper>
   
  );
};

export default UserDetails;