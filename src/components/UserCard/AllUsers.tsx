import React, { useEffect, useState } from 'react';
import { IUser } from './User';
import {
  StyledLinkPreview,
  Container,
  Title,
  UsersContainer,
  UserCard,
  UsersWrap,
} from './styles';
import Pagination from '../Pagination/Pagination';
//list of all users
const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(4); 
  
  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data: IUser[]) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      });
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
    <UsersWrap>
    <Container>
      <Title>Our Artists</Title>
      <UsersContainer>
        {currentUsers.map((user: IUser) => (
          <UserCard
            key={user.id}
            style={{ backgroundImage: `url(${user.image})` }}
          >
            <StyledLinkPreview to={`/user/${user.id}`}>
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
  );
};

export default AllUsers;
