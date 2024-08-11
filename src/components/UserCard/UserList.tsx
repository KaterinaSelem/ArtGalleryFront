import { useEffect, useState } from 'react';
import { HomePageComponent, StyledLink, StyledList } from './styles';
import { IUser } from './types';



export interface IRole {
  id: number;
  userId: IUser['id'];
  roleId: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const rolesResponse = await fetch(`/api/user-roles`);
        const rolesData: IRole[] = await rolesResponse.json();

        const filteredRoles = rolesData.filter(role => role.roleId === 3);

        const usersResponse = await fetch('/api/users');
        const usersData: IUser[] = await usersResponse.json();

        const filteredUsers = usersData.filter(user =>
          filteredRoles.some(role => role.userId === user.id)
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users or roles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRolesAndUsers();
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