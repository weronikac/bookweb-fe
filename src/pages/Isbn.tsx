import React from 'react';
import { PostListIsbn } from '../components';
import { LayoutList } from '../components';
import { useParams } from 'react-router';

interface Params {
  isbn: string;
}

export const Isbn: React.FC = () => {
  const params: Params = useParams();

  return (
    <LayoutList>
      <PostListIsbn isbn={params.isbn} />
    </LayoutList>
  );
};
