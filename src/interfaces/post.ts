export interface PostI {
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

export interface CreatePostI {
  title: string;
  content: string;
}

export interface AddCommentI {
  content: string;
}

export interface CommentI {
  user: {
    id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  date?: string;
}
