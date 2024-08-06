import { useEffect, useState } from 'react';

import { HomePageComponent, StyledLink, StyledList } from './styles';
import { IUser } from '../../components/UserCard/User';


const Hero: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data: IUser[] = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  return (
    <HomePageComponent>
      <StyledList>
        {users.map((user) => (
          <p key={user.id}>
            <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
          </p>
        ))}
      </StyledList>
    </HomePageComponent>
  );
};

export default Hero;
