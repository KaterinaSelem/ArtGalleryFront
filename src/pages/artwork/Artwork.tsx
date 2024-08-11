import { useEffect, useState } from "react";
import { IArtwork } from "../../components/Artworks/types";
import { useParams } from "react-router-dom";
import { IUser } from "../../components/UserCard/types";
import './styles.css';
import Button from "../../components/Button/Button";


const Artwork: React.FC = () => {
    const [artwork, setArtwork] = useState<IArtwork | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchArtwork = async () => {
            try {
                const response = await fetch(`/api/works/${id}`);
                const artworkData: IArtwork = await response.json();
                setArtwork(artworkData);
            } catch (error) {
                console.error('Error fetching artwork:', error);
            }
        };

        if (id) {
            fetchArtwork();
        }
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            if (artwork && artwork.userId) {
                try {
                    const response = await fetch(`/api/users/${artwork.userId}`);
                    const userData: IUser = await response.json();
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [artwork]);

    if (isLoading) {
        return (
            <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        );
    }

    if (!artwork || !user) {
        return <p>Artwork or User not found.</p>;
    }


    return (
        <div className="container">
        <div className="artwork-section">
            <img src={artwork.image} alt={artwork.title} className="artwork-image" />
        </div>
        <div className="details-section">
            <h1 className="artwork-title">{artwork.title}</h1>
            <h2 className="artist-name">{user.name}</h2>
            <div className="artwork-info">
                <span className="artwork-type">Painting</span>
                <span className="artwork-status">On sale</span>
            </div>
            <div className="artwork-dimensions">
                <img src="/assets/size_symbol.png" alt="Dimensions Icon" className="dimensions-icon" />
                <span>22.8in x 39.4in | 58.0cm x 100.0cm</span>
            </div>
            <div className="button-wrap">
  <Button name={"Connect Autor"}></Button>
  </div>
            <hr />
            <div className="artwork-description">
                <h3>Description:</h3>
                <p>{artwork.description}</p>
            </div>
        </div>
    </div>
    );
};

export default Artwork;