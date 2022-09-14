import React from 'react';
import { PostListTitle } from '../components';
import { LayoutList } from '../components';
import { useParams } from 'react-router';

interface Params {
  title: string;
}

export const Title: React.FC = () => {
  const params: Params = useParams();

  return (
    <LayoutList>
      <PostListTitle title={params.title} />
    </LayoutList>
  );
};
