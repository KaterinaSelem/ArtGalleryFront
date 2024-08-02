import { Component } from "react";
import { BornLives, BornLivesWrap, CardWrapper, DescriptionInfo, DescriptionWrap, UserCardContent, UserCardPar, UserCardWrapper, UserImage, UserTitle, WrapBtn, WrapInfo, WrapTitle } from "./styles";
import './styles.css';
import { ButtonStyled } from "../Button/styles";

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    userRole: number;
    bornCity: string;
    liveCity: string;
    exhibition: string[];
    description: string;
    image: string;
}

interface IUserProps{
    user: IUser;
  }

  export class User extends Component<IUserProps> {
    render() {
      const {name, bornCity, liveCity, exhibition, description, image } = this.props.user;
      return (
        <CardWrapper>
        <UserCardWrapper>
          <WrapTitle><UserTitle>{name}</UserTitle></WrapTitle>
          <WrapInfo>
            <BornLivesWrap>
              <BornLives>
                <UserCardPar>Born:</UserCardPar>
                <UserCardContent> {bornCity}</UserCardContent>
              </BornLives>  
              <BornLives>
                <UserCardPar>Lives:</UserCardPar>
                <UserCardContent>  {liveCity}</UserCardContent> 
              </BornLives>
              <BornLives>
                <UserCardPar>Exhibition: </UserCardPar>
                <UserCardContent>  {exhibition}</UserCardContent>
              </BornLives>
            </BornLivesWrap>
          <DescriptionWrap>
            <DescriptionInfo>{description}</DescriptionInfo>
            <WrapBtn>
            <ButtonStyled disabled={true} selected={false}>CONNECT ME</ButtonStyled>
            </WrapBtn>
          </DescriptionWrap>
          <DescriptionWrap>
            <UserImage>
     
            { <img src={image} alt="" className="imgHight" />}
          
            </UserImage>
          </DescriptionWrap>
         
          </WrapInfo>
        </UserCardWrapper>
        </CardWrapper>
      );
    }
  }
  
  export default User;
  





