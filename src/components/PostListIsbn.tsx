import React, { useEffect, useState } from 'react';
import { PostI } from '../interfaces';
import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import {
    getBooksByIsbn,
} from '../api';
import { Post } from './Post';
import { toast } from 'react-toastify';

interface Props {
    isbn: string;
}

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: 'flex',
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
  },
  select: {
    fontSize: 20,
    fontWeight: 400,
  },
}));

export const PostListIsbn: React.FC<Props> = ({ isbn }) => {
  const styles = useStyles();
  const [posts, setPosts] = useState<PostI[]>([]);

  const [sort, setSort] = useState<Number>(0);

  useEffect(() => {
    const getPostsFnc = async () => {
      const { data } = await getBooksByIsbn(isbn);
      setPosts(data);
    };

    try {
      getPostsFnc();
    } catch (error) {
      toast.error('Nie udało się pobrać postów!');
    }
    console.log(sort);
  }, []);

  

  return (
    <>
      <Box className={styles.teamList}>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </Box>
    </>
  );
};
