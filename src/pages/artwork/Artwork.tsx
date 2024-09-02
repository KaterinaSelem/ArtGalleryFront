import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import Button from '../../components/Button/Button';
import { Status, StatusIndicator } from './styles';
import { ICategory } from './types';
import { IUser } from '../../components/UserCard/types';
import { IArtwork } from '../../components/Artworks/types';

const Artwork: React.FC = () => {
  const [artwork, setArtwork] = useState<IArtwork | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const artworkResponse = await fetch(`/api/works/${id}`);
        const artworkData: IArtwork = await artworkResponse.json();
        setArtwork(artworkData);

        if (artworkData.userId) {
          const userResponse = await fetch(`/api/users/artists/${artworkData.userId}`);
          const userData: IUser = await userResponse.json();
          setUser(userData);
        }

        if (artworkData.categoryId) {
          const categoryResponse = await fetch(`/api/categories/${artworkData.categoryId}`);
          const categoryData: ICategory = await categoryResponse.json();
          setCategory(categoryData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchArtworkData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border text-secondary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (!artwork || !user || !category) {
    return <p>Artwork, User, or Category not found.</p>;
  }

  return (
    <div className='container'>
      <div className='artwork-section'>
        <img
          src={artwork.image}
          alt={artwork.title}
          className='artwork-image'
        />
      </div>
      <div className='details-section'>
        <h1 className='artwork-title'>{artwork.title}</h1>
        <h2 className='artist-name'>{user.name}</h2>
        <div className='artwork-info'>
          <div className='artwork-type'>{category.title}</div>
          <span className='artwork-type'>
            On sale
            <Status>
              {artwork.comition}
              <StatusIndicator comition={artwork.comition} />
            </Status>
          </span>
        </div>
        <div className='artwork-dimensions'>
          <img
            src='/assets/size_symbol.png'
            alt='Dimensions Icon'
            className='dimensions-icon'
          />
          <span>22.8in x 39.4in | 58.0cm x 100.0cm</span>
        </div>
        <div className='button-wrap'>
          <Button name={'Connect Autor'}></Button>
        </div>
        <hr />
        <div className='artwork-description'>
          <h3>Description:</h3>
          <div className='description'>{artwork.description}</div>
        </div>
      </div>
    </div>
  );
};

export default Artwork;
