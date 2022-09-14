import React, { useEffect, useState } from 'react';
import { Box, Button, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CustomTextField, Layout, Loading, Post } from '../components';
import { NavLink } from 'react-router-dom';
import { UserI, AddMessageI } from '../interfaces';
import { CityIcon } from '../assets';
import { colors } from '../styles';
import { getMyProfile, addMessage } from '../api';
import { toast } from 'react-toastify';

interface Props {
  info?: UserI;
  edit?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'auto',
    maxHeight: 250,
    overflowY: 'auto',
    marginTop: 30,
    padding: 10,
    fontSize: '16px',
    listStyle: 'none',
  },
  block: {
    overflow: 'auto',
    maxHeight: 250,
    overflowY: 'auto',
    marginTop: 30,
    marginBottom: -40,
    padding: 10,
    color: colors.RED,
    fontSize: '16px',
    listStyle: 'none',
  },
  basicInfoContainer: {
    padding: '0px 0px 40px 0px',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginTop: 100,
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  infoContainer: {
    display: 'flex',
    padding: '35px 0px 0px 35px',
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: '130px',
    height: '130px',
    borderRadius: 10,
  },
  nameContainer: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    padding: '15px 0px 0px 20px',
  },
  name: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '125%',
    margin: 0,
  },
  defaultFont: {
    fontWeight: 100,
    fontSize: 17,
    lineHeight: '25px',
    margin: '0px 0px 0px 0px',
  },
  bioContainer: {
    width: '100%',
    display: 'flex',
    fontSize: '14px',
    flexFlow: 'column',
    position: 'relative',
    padding: '15px 35px 0px',
    textAlign: 'justify',
  },
  iconBox: {
    display: 'flex',
    width: '50%',
    minWidth: '230px',
    justifyContent: 'space-between',
    marginTop: 15,
    marginLeft: 4,
  },
  iconInfo: {
    display: 'flex',
  },
  iconCaption: {
    fontSize: 16,
    margin: '0px 0px 0px 9px',
  },
  addCommentContainer: {
    display: 'flex',
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    fontSize: '13px',
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '145px',
    height: '30px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
  button2: {
    position: 'absolute',
    bottom: 15,
    right: 165,
    fontSize: '13px',
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: '145px',
    height: '30px',

    '&:hover': {
      backgroundColor: colors.BLUE,
    },
  },
}));

export const MyProfile = (props: Props) => {
  const [profile, setProfile] = useState<UserI>();
  const [content, setContent] = useState<AddMessageI>();
  // const [posts, setPosts] = useState<PostI[]>([]);


  const styles = useStyles();
  useEffect(() => {
    const getProfileFnc = async () => {
      const { data } = await getMyProfile();
      setProfile(data);
    };

    try {
      getProfileFnc();
      toast.success('Udało się pobrać profil!');
    } catch (error) {
      toast.error('Nie udało się pobrać profilu!');
    }
  }, []);

  const newMessage = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addMessage(content);
      window.location.reload();
      toast.success('Pomyślnie wysłano wiadomość!');
    } catch (error) {
      toast.error('Pojawił się problem przy wysłaniu wiadomości!');
    }
  };

  return (
    <>
      <Layout>
        {!profile ? (
          <Loading />
        ) : (
          <Box className={styles.basicInfoContainer}>
            <Box className={styles.infoContainer}>
              <Box className={styles.avatarContainer}>
                <img
                  className={styles.photo}
                  height='100'
                  width='100'
                  src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                  alt='avatar'
                />
              </Box>
              <Box className={styles.nameContainer}>
                <p className={styles.name}>{profile.name}</p>
              </Box>
            </Box>
            <Box className={styles.bioContainer}>
            <Box className={styles.nameContainer}></Box>
            <p className={styles.name}>Moja lista książek</p>
            {profile.readBooks!.map((value) => {
                    return <Post post={value} />;
                  })}
            </Box>
          </Box>
        )}
      </Layout>
    </>
  );
};
