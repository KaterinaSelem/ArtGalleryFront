import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../components/UserCard/types';
import { IArtwork } from '../../components/Artworks/types';
import {
  BornLives,
  BornLivesWrap,
  CardWrapper,
  DescriptionInfo,
  DescriptionWrap,
  PhotoWrap,
  Title,
  UserCardContent,
  UserCardPar,
  UserCardWrapper,
  UserImage,
  UserTitle,
  WrapBtn,
  WrapInfo,
  WrapTitle,
} from './styles';
import { ButtonStyled } from '../../components/Button/styles';
import {
  ContainerArtworks,
  ArtworksContainer,
  ArtworkPreveiwcontainer,
  Frame,
  StyledArtLinkWorkPreview,
  ArtworkCard,
  ArtworkInfoCard,
  ArtTitle,
  Details,
  Separator,
  Status,
  StatusIndicator,
  ArtistStyled,
} from '../../components/Artworks/styles';
import Pagination from '../../components/Pagination/Pagination';
import { ICategory } from '../artwork/types';
import { API_ENDPOINTS } from '../../components/Config/apiConfig';

const Artist: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artworksPerPage] = useState<number>(4);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.GET_ARTISTS}/${id}`);
        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      fetch(API_ENDPOINTS.GET_ARTWORKS)
        .then((response) => response.json())
        .then((artwork: IArtwork[]) => {
          const filteredArtworks = artwork.filter(
            (artwork) => artwork.userId === user.id
          );
          setArtworks(filteredArtworks);
          setIsLoading(false);
          
        })
        .catch((error) => {
          console.error('Error fetching artworks:', error);
          setIsLoading(false);
        });
    }
  }, [artworks, user]);

  useEffect(() => {
    if (artworks.length > 0) {
      const fetchCategories = async () => {
        try {
          for (const artwork of artworks) {
            const response = await fetch(`${API_ENDPOINTS.GET_CATEGORY}/${artwork.categoryId}`);
            const category = await response.json();
            // Assuming you're storing multiple categories, you might want to update your state accordingly.
            setCategories((prevCategories) => [...prevCategories, category]);
          }
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      };
  
      fetchCategories();
    }
  }, [artworks]);

  if (!user) {
    return <p>User not found.</p>;
  }

  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = artworks.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork
  );

  const totalPages = Math.ceil(artworks.length / artworksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getArtistName = (userId: number) => {
    const userName = userId === user?.id ? user.name : 'Unknown Artist';
    return userName;
  }

  const getCategotyTitle = (categoryId: number) => {
    const categoryTitle = categories.find((category) => category.id === categoryId)?.title;
    return categoryTitle;
  }

  const artistImage = user?.image;

  return (
    <>
      <CardWrapper>
        <UserCardWrapper>
          <WrapTitle>
            <UserTitle>{user?.name}</UserTitle>
          </WrapTitle>
          <WrapInfo>
            <BornLivesWrap>
              <BornLives>
                <UserCardPar>Born:</UserCardPar>
                <UserCardContent>{user?.bornCity}</UserCardContent>
              </BornLives>
              <BornLives>
                <UserCardPar>Lives:</UserCardPar>
                <UserCardContent>{user?.liveCity}</UserCardContent>
              </BornLives>
              <BornLives>
                <UserCardPar>Exhibition: </UserCardPar>
                <UserCardContent> </UserCardContent>
              </BornLives>
            </BornLivesWrap>
            <DescriptionWrap>
              <DescriptionInfo>{user?.description}</DescriptionInfo>
              <WrapBtn>
                <ButtonStyled disabled={true} selected={false}>
                  CONNECT ME
                </ButtonStyled>
              </WrapBtn>
            </DescriptionWrap>
            <PhotoWrap>
              
                <UserImage src={artistImage}/>
              
            </PhotoWrap>
          </WrapInfo>
        </UserCardWrapper>
      </CardWrapper>
      <ContainerArtworks>
        <Title>My Gallery</Title>
        <ArtworksContainer>
          {currentArtworks.map((artwork: IArtwork) => (
            <ArtworkPreveiwcontainer
              key={artwork.id}
              style={{ textDecoration: 'none' }}
            >
              <Frame>
                <StyledArtLinkWorkPreview to={`${API_ENDPOINTS.GET_ARTWORKS}/${artwork.id}`}>
                  <ArtworkCard
                    style={{ backgroundImage: `url(${artwork.image})` }}
                  />
                </StyledArtLinkWorkPreview>
              </Frame>
              <ArtworkInfoCard>
                <ArtTitle>{artwork.title}</ArtTitle>
                <ArtistStyled>{getArtistName(artwork.userId)}</ArtistStyled>
                <Details>
                  <span>{getCategotyTitle(artwork.categoryId)}</span>
                  <Separator>|</Separator>
                  <ArtistStyled>On sale</ArtistStyled>
                  <Status>
                  {artwork.comition}
                  <StatusIndicator comition={artwork.comition} />
                </Status>
                </Details>
              </ArtworkInfoCard>
            </ArtworkPreveiwcontainer>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ArtworksContainer>
      </ContainerArtworks>
    </>
  );
};

export default Artist;
