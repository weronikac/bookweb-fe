import React from 'react';
import { PostListAuthor } from '../components';
import { LayoutList } from '../components';
import { useParams } from 'react-router';

interface Params {
  author: string;
}

export const Author: React.FC = () => {
  const params: Params = useParams();

  return (
    <LayoutList>
      <PostListAuthor author={params.author} />
    </LayoutList>
  );
};
