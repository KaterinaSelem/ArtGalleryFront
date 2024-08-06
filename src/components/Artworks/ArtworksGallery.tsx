import { useState, useEffect } from 'react';
import { IArtwork } from './types';
import {
  ArtworksContainer,
  ArtworkCard,
  ArtworkInfoCard,
  ArtTitle,
  Artist,
  ArtworkPreveiwcontainer,
  ContainerArtworksGallery,
  Details,
  Frame,
  Title,
  StyledArtLinkWorkPreview,
  Separator,
  Status,
  StatusIndicator,
  
} from './styles';
import Pagination from '../Pagination/Pagination';
import { IUser } from '../UserCard/User';



export interface ArtworkProps {
  users: IUser[];
}

const ArtworkPrew: React.FC<ArtworkProps> = ({ users }) => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artworksPerPage] = useState<number>(16);

  useEffect(() => { 
    fetch('http://localhost:8080/api/works')
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
              <StyledArtLinkWorkPreview to={`/artwork/${artwork.id}`}>
                <ArtworkCard
                  style={{ backgroundImage: `url(${artwork.image})` }}
                />
              </StyledArtLinkWorkPreview>
            </Frame>
            <ArtworkInfoCard>
              <ArtTitle>{artwork.title}</ArtTitle>
              <Artist>{getArtistName(artwork.userId)}</Artist>
              <Details>
                <span>{artwork.categoryId}</span>
                <Separator>|</Separator>
                <Artist>On sale</Artist>
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

export default ArtworkPrew;
