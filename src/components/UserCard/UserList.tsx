import { Component } from "react";
import User, { IUser } from "./User";

interface IUserListState{
  users: IUser[];
  isLoading: boolean;
}

export class UserList extends Component<Record<string, never>, IUserListState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, isLoading: true });
    fetch("http://localhost:8080/api/users")
      .then((response) => response.json())
      .then((data: IUser[]) => {
        this.setState({ users: data, isLoading: false });
      });

    }
 
  render() {
    const { users, isLoading } = this.state;

return isLoading ? (
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

) : (
  <div>
    {users.map((user) => (
      <User key={user.id} user={user} />
 
    ))}
  </div>
);
}
}

export default UserList;
