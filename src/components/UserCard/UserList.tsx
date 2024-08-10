import { useEffect, useState } from 'react';
import { HomePageComponent, StyledLink, StyledList } from './styles';
import { IUser } from '../../components/UserCard/types';
import { ICategory } from './AllUsers';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        // Fetching users and roles
        const usersResponse = await fetch('/api/users');
        const rolesResponse = await fetch('/api/roles');

        const usersData: IUser[] = await usersResponse.json();
        const rolesData: ICategory[] = await rolesResponse.json();

        // Filter roles by role_id === 3
        const filteredRoles = rolesData.filter(role => role.role_id === 3);

        // Get only the users whose IDs are in the filtered roles
        const filteredUsers = usersData.filter(user => 
          filteredRoles.filter(role => role.user_id === user.id)
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users or roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersAndRoles();
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
        {users.length === 0 ? (
          <p>No users found with the specified role.</p>
        ) : (
          users.map((user: IUser) => (
            <p key={user.id}>
              <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
            </p>
          ))
        )}
      </StyledList>
    </HomePageComponent>
  );
};

export default UserList;