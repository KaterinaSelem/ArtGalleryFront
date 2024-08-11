

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  bornCity: string;
  liveCity: string;
  description: string;
  image: string;
}

export interface ICategory {
  id: number;
  user_id: IUser['id'];
  role_id: number;
}



