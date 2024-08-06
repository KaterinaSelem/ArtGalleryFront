import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtworkPrew from '../../components/Artworks/ArtworkPrew';
import { IUser } from '../../components/UserCard/types';
import User from '../../components/UserCard/User';


const Artist: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const {id} = useParams<{id: string}>();
  const fetchUser = async () => {
    try {
      console.log('fetching user');
      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  useEffect(() => {
  

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <User user={user}  />
      <ArtworkPrew users={[]}/>
    </>
  );
};

export default Artist;