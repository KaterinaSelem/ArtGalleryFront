interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    userRole: number,
    born_city: string,
    live_city: string,
    exhibition: string[],
    description: string,
    image: string
  }
  
  export interface UserCardProps {
    userData: User
  }
  