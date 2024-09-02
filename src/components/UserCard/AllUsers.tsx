import React, { createContext, useEffect, useState } from 'react';
import { IUser } from './types';
import {
  StyledLinkPreview,
  Container,
  Title,
  UsersContainer,
  UserCard,
  UsersWrap,
} from './styles';
import Pagination from '../Pagination/Pagination';


export const UsersContext = createContext<IUser[]>([]);

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(4);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/artists');
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
        <Container>
          <Title>Our Artists</Title>
          <UsersContainer>
            {currentUsers.map((user: IUser) => (
              <UserCard
                key={user.id}
                style={{ backgroundImage: `url(${user.image})` }}
              >
                <StyledLinkPreview to={`/users/${user.id}`}>
                  {user.name}
                </StyledLinkPreview>
              </UserCard>
            ))}
          </UsersContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      </UsersWrap>
    </UsersContext.Provider>
  );
};

export default AllUsers;
