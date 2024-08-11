import React, { createContext, useEffect, useState } from 'react';
import { IUser } from '../../components/UserCard/types';
import {
  StyledLinkPreview,
  Title,
  UsersContainer,
  ContainerArtists,
  UsersWrap,
} from './styles';
import Pagination from '../../components/Pagination/Pagination';
import { IRole } from '../../components/UserCard/UserList';
import { UserCardWrap } from './styles';

export const UsersContext = createContext<IUser[]>([]);

const Artists: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(12);

  useEffect(() => {
    const fetchRolesAndUsers = async () => {
      try {
        const rolesResponse = await fetch(`/api/user-roles`);
        const rolesData: IRole[] = await rolesResponse.json();

        const filteredRoles = rolesData.filter((role) => role.roleId === 3);

        const usersResponse = await fetch('/api/users');
        const usersData: IUser[] = await usersResponse.json();

        const filteredUsers = usersData.filter((user) =>
          filteredRoles.some((role) => role.userId === user.id)
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <UsersContext.Provider value={users}>
      <UsersWrap>
        <ContainerArtists>
          <Title>Our Artists</Title>
          <UsersContainer>
            {currentUsers.map((user: IUser) => (
              <UserCardWrap
                key={user.id}
                style={{ backgroundImage: `url(${user.image})` }}
              >
                <StyledLinkPreview to={`/users/${user.id}`}>
                  {user.name}
                </StyledLinkPreview>
              </UserCardWrap>
            ))}
          </UsersContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ContainerArtists>
      </UsersWrap>
    </UsersContext.Provider>
  );
};

export default Artists;
