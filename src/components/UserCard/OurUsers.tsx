import  { useEffect, useState } from "react";
import { IUser } from "../../components/UserCard/User";
import { Link } from "react-router-dom";




function OurUsers() {
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
    <div>
      <div>
      {users.map((user) => (
        <p key={user.id}>
          <Link to={`/user/${user.id}`}>{user.name}</Link>
          <div>
     
            { <img src={user.image} alt="" className="imgHight" />}
          
            </div>
        </p>
      ))}
      </div>
    </div>
  );
}

export default OurUsers;