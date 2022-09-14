export interface ProfileI {
  user: {
    id?: string;
    name?: string;
    avatar: string;
  };
  bio: string;
  age: number;
  location: string;
  avatar: string;
}

export interface UserI {
  name?: string;
  email?: string;
  password?: string;
  id?: string;
  date?: any;
  readBooks?: [
    {
      id?: string;
      title: string;
      author: string;
      genre: string;
      isbn: string;
      reviews?: [
        {
          id?: string;
          user: string;
          content: string;
          date?: string;
        }
      ];
    }
  ]
}


export interface AddMessageI {
  content: string;
}

export interface MessageI {
  user: {
    id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  date?: string;
}
