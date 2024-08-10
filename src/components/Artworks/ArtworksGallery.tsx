import { useState, useEffect } from 'react';
import { IArtwork } from './types';
import {
  ArtworksContainer,
  ArtworkCard,
  ArtworkInfoCard,
  ArtTitle,
  ArtworkPreveiwcontainer,
  ContainerArtworksGallery,
  Details,
  Frame,
  Title,
  StyledArtLinkWorkPreview,
  Separator,
  Status,
  StatusIndicator,
  ArtistStyled,
} from './styles';
import Pagination from '../Pagination/Pagination';
import { IUser } from '../UserCard/types';



const ArtworksGalleryPrew: React.FC<IUser> = () => {

  
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artworksPerPage] = useState<number>(16);

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
    fetch('/api/works')
      .then((response) => response.json())
      .then((data: IArtwork[]) => {
        setArtworks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching artworks:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
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
    const matchedUser = users.find((user) => userId == user.id);
    console.log(matchedUser);
    return matchedUser ? matchedUser.name : 'Unknown Artist';
  };

  return (
    <ContainerArtworksGallery>
      <Title>Gallery</Title>
      <ArtworksContainer>
        {currentArtworks.map((artwork: IArtwork) => (
          <ArtworkPreveiwcontainer
            key={artwork.id}
            style={{ textDecoration: 'none' }}
          >
            <Frame>
              <StyledArtLinkWorkPreview to={`/works/${artwork.id}`}>
                <ArtworkCard
                  style={{ backgroundImage: `url(${artwork.image})` }}
                />
              </StyledArtLinkWorkPreview>
            </Frame>
            <ArtworkInfoCard>
              <ArtTitle>{artwork.title}</ArtTitle>
              <ArtistStyled>{getArtistName(artwork.userId)}</ArtistStyled>
              <Details>
                <span>{artwork.categoryId}</span>
                <Separator>|</Separator>
                <ArtistStyled>On sale</ArtistStyled>
                <Status>
                  {artwork.comition}
                  <StatusIndicator />
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
    </ContainerArtworksGallery>
  );
};

export default ArtworksGalleryPrew;
