import { UserCardBorn, UserCardCity, UserCardDescript, UserCardExhibits, UserCardTitle, UserCardWrapper, UserImage } from "./styles";
import { UserCardProps } from "./types";

function UserCard({ userData }: UserCardProps){
    return(
        <UserCardWrapper>
            <UserCardTitle>{userData.name}</UserCardTitle>
            <UserCardBorn>{userData.born_city}</UserCardBorn>
            <UserCardCity>{userData.live_city}</UserCardCity>
            <UserCardExhibits>{userData.exhibition}</UserCardExhibits>
            <UserCardDescript>{userData.description}</UserCardDescript>
            <UserImage>{userData.image}</UserImage>
        </UserCardWrapper>
    )
}

export default UserCard;