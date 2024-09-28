import { useEffect, useState } from 'react';
import { HomePageComponent, StyledLink, StyledList } from './styles';
import { IUser } from './types';
import { API_ENDPOINTS } from '../Config/apiConfig';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_ARTISTS);
        const data: IUser[] = await response.json(); 

        setUsers(data);
      } catch (error) {
        console.error('Ups!', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center'>
        <div className='spinner-border text-secondary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }


  return (
    <HomePageComponent>
      <StyledList>
        {users.length === 0 ? (
          <p>No users found with the specified role.</p>
        ) : (
          users.map((user: IUser) => (
            <p key={user.id}>
              <StyledLink to={`/users/${user.id}`}>
                {user.name}
              </StyledLink>
            </p>
          ))
        )}
      </StyledList>
    </HomePageComponent>
  );
};

export default UserList;
