import { useEffect, useState } from "react";
import { IUser } from "../../components/UserCard/types";

function UsersPage() {
const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(`/api/users`, {headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}); //TODO: add token
            const usersRes = await response.json();
            console.log(usersRes);
            setUsers(usersRes);
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchUser();
       
      }, []);



      
  return (
    <div>
      <h1>Users Page</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}

    </div>
  );
}

export default UsersPage;