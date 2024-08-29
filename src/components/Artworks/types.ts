import { IUser } from "../UserCard/types";



export interface IArtwork {
    id: number;
    title: string;
    createdAt: string;
    category_id: number;
    artStyle: number;
    comition: boolean;
    userId: IUser['id'];
    description: string;
    image: string;
  }