import React, { useEffect, useState } from 'react';
import { PostI } from '../interfaces';
import { Box, makeStyles, MenuItem, Select } from '@material-ui/core';
import { getPosts, getPostsByLikes, getPostsByComments } from '../api';
import { Post } from './Post';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
interface Props {}

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

export const PostList = (props: Props) => {
  const styles = useStyles();
  const [posts, setPosts] = useState<PostI[]>([]);


  useEffect(() => {
    const getPostsFnc = async () => {
      const { data } = await getPosts();
      setPosts(data);
    };

    try {
      getPostsFnc();
    } catch (error) {
      // toast.error('Nie udało się pobrać postów!');
    }
  }, []);

  // const handleChange = (event: any) => {
  //   if (event.target.value == 0) {
  //     const getPostsFnc = async () => {
  //       const { data } = await getPosts();
  //       setPosts(data);
  //     };

  //     try {
  //       getPostsFnc();
  //     } catch (error) {
  //       toast.error('Nie udało się pobrać postów!');
  //     }
  //   }
  //   if (event.target.value == 1) {
  //     const getPostsFnc = async () => {
  //       const { data } = await getPostsByLikes();
  //       setPosts(data);
  //     };

  //     try {
  //       getPostsFnc();
  //     } catch (error) {
  //       toast.error('Nie udało się pobrać postów!');
  //     }
  //   }
  //   if (event.target.value == 2) {
  //     const getPostsFnc = async () => {
  //       const { data } = await getPostsByComments();
  //       setPosts(data);
  //     };

  //     try {
  //       getPostsFnc();
  //     } catch (error) {
  //       toast.error('Nie udało się pobrać postów!');
  //     }
  //   }
  // };

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(25);




  return (
    <>
      <Box className={styles.teamList}>
       {' '}
        {posts.slice(page + offset - 1, page * perPage).map((post) => (
          <Post post={post} />
        ))}
      </Box>
    </>
  );
};
