
import { useParams } from 'react-router-dom';
import { IUser } from './User';
import { BornLives, 
  BornLivesWrap, 
  CardWrapper, DescriptionInfo, DescriptionWrap, UserCardContent, UserCardPar, UserCardWrapper, UserImage, UserTitle, WrapBtn, WrapInfo, WrapTitle } from './styles';
import { ButtonStyled } from '../Button/styles';



  interface UserDetailsProps {
    users: IUser[];
  }
  
  const UserDetails: React.FC<UserDetailsProps> = ({ users }) => {
    const { id } = useParams<{ id: string }>();
    const user = users.find((user) => user.id.toString() === id);
  
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