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
import { ICategory } from '../../pages/artwork/types';

const ArtworksGalleryPrew: React.FC<IUser> = () => {
  const [artworks, setArtworks] = useState<IArtwork[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [artworksPerPage] = useState<number>(16);

  useEffect(() => {
    fetch('/api/users/artists')
      .then((response) => response.json())
      .then((user: IUser[]) => {
        setUsers(user);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching artist:', error);
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

  useEffect(() => {
    if (artworks.length > 0) {
      const fetchCategories = async () => {
        try {
          for (const artwork of artworks) {
            const response = await fetch(`/api/categories/${artwork.categoryId}`);
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


  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border text-secondary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
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

  const getArtistName = (artwork: IArtwork) => {
    const matchedUser = users.find((user) => artwork.userId === user.id);
    console.log(matchedUser);
    return matchedUser ? matchedUser.name : 'Unknown Artist';
  };

  const getCategotyTitle = (categoryId: number) => {
    const categoryTitle = categories.find((category) => category.id === categoryId)?.title;
    return categoryTitle;
  }

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
              <ArtistStyled>{getArtistName(artwork)}</ArtistStyled>
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
    </ContainerArtworksGallery>
  );
};

export default ArtworksGalleryPrew;
