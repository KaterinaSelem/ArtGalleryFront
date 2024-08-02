import  { useEffect, useState } from "react";
import { IUser } from "../../components/UserCard/User";
import { HomePageComponent, StyledLink, StyledList } from "./styles";



function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data: IUser[]) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <HomePageComponent>
      <StyledList>
      {users.map((user) => (
        <p key={user.id}>
          <StyledLink to={`/user/${user.id}`}>{user.name}</StyledLink>
        </p>
      ))}
      </StyledList>
    </HomePageComponent>
  );
}

export default Home;