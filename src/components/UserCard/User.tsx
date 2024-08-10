import './styles.css';
import {
  BornLives,
  BornLivesWrap,
  CardWrapper,
  DescriptionInfo,
  DescriptionWrap,
  UserCardContent,
  UserCardPar,
  UserCardWrapper,
  UserImage,
  UserTitle,
  WrapBtn,
  WrapInfo,
  WrapTitle,
} from './styles';
import { ButtonStyled } from '../Button/styles';
import React from 'react';
import { IUser } from './types';

interface IUserProps {
  user: IUser;
}

const User: React.FC<IUserProps> = ({ user }) => {
  const {name, bornCity, liveCity, description, image } = user;

  return (
    <CardWrapper>
      <UserCardWrapper>
        <WrapTitle>
          <UserTitle>{name}</UserTitle>
        </WrapTitle>
        <WrapInfo>
          <BornLivesWrap>
            <BornLives>
              <UserCardPar>Born:</UserCardPar>
              <UserCardContent> {bornCity}</UserCardContent>
            </BornLives>
            <BornLives>
              <UserCardPar>Lives:</UserCardPar>
              <UserCardContent> {liveCity}</UserCardContent>
            </BornLives>
            <BornLives>
              <UserCardPar>Exhibition: </UserCardPar>
              
            </BornLives>
          </BornLivesWrap>
          <DescriptionWrap>
            <DescriptionInfo>{description}</DescriptionInfo>
            <WrapBtn>
              <ButtonStyled disabled={true} selected={false}>
                CONNECT ME
              </ButtonStyled>
            </WrapBtn>
          </DescriptionWrap>
          <DescriptionWrap>
            <UserImage>
              {<img src={image} alt='' className='imgHight' />}
            </UserImage>
          </DescriptionWrap>
        </WrapInfo>
      </UserCardWrapper>
    </CardWrapper>
  );
};

export default User;
