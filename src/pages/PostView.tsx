import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router";
import { CustomTextField, Layout, Loading } from "../components";
import { NavLink, useLocation } from "react-router-dom";
import { PostI, AddCommentI, UserI, AddMessageI } from "../interfaces";
import { colors } from "../styles";
import {
  getPost,
  addComment,
  addToList,
  getMyProfile,
  removeFromList,
  addMessage,
  deleteComment,
} from "../api";
import { toast } from "react-toastify";

interface Props {
  info?: PostI;
  edit?: boolean;
}

const useStyles = makeStyles((theme) => ({
  basicInfoContainer: {
    padding: "30px 30px 30px 30px",
    backgroundColor: colors.WHITE,
    borderBottom: `1px solid ${colors.RED}`,
    borderRadius: 5,
    marginTop: 100,
    marginBottom: 100,
    width: "100%",
    display: "flex",
  },
  comContainer: {
    padding: "20px 10px 10px 10px",
    backgroundColor: colors.WHITE,
    borderBottom: `1px solid ${colors.BLUE}`,
    borderLeft: `1px solid ${colors.BLUE}`,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    display: "flex",
  },
  avatarContainer: {
    paddingRight: 20,
  },
  photo: {
    width: "60px",
    height: "60px",
  },
  photocom: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "column",
    position: "relative",
  },
  contentContainer2: {
    width: "100%",
    display: "flex",

    position: "relative",
  },
  userName: {
    fontWeight: 100,
    fontSize: 15,
    lineHeight: "22px",
    margin: 0,
  },
  date: {
    position: "absolute",
    right: 0,
    top: -15,
    fontWeight: 100,
    fontSize: 14,
    lineHeight: "22px",
    margin: 0,
  },
  postTitle: {
    fontWeight: 600,
    fontSize: "18px",
    lineHeight: "125%",
    margin: 0,
  },
  infoBox: {
    display: "flex",
    fontSize: "15px",
    margin: "0px 0px 0px 0px",
  },
  content: {
    fontSize: 14,
    margin: "10px 0px 0px 0px",
  },
  tag: {
    fontSize: 15,
    fontWeight: 300,
    color: colors.INFO_BLUE,
    margin: "0px 0px 0px 10px",
  },
  minorInfo: {
    fontSize: 14,
    display: "flex",
    flexFlow: "row",
    margin: "10px 0px 0px 0px",
  },
  category: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: "30%",
    fontWeight: 600,
    color: colors.BLUE,
    // margin: '0px 10px 0px 0px',
  },
  comName: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "22px",
    margin: 0,
  },
  comInfo: {
    fontSize: 15,
    margin: "0px 0px 0px 7px",
  },
  button: {
    left: 30,
    bottom: -35,
    backgroundColor: colors.BLUE,
    color: colors.WHITE,
    width: "120px",
    height: "40px",

    "&:hover": {
      backgroundColor: colors.RED,
    },
  },
  buttonZ: {
    position: "absolute",
    top: 5,
    right: 0,
    fontSize: "13px",
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.WHITE,
    width: "155px",
    height: "25px",

    "&:hover": {
      backgroundColor: colors.BLUE,
    },
  },
  buttonZ3: {
    position: "absolute",
    top: 5,
    right: 85,
    fontSize: "13px",
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: "75px",
    height: "25px",

    "&:hover": {
      backgroundColor: colors.BLUE,
    },
  },
  buttonZ2: {
    position: "absolute",
    top: -5,
    right: 0,
    lineHeight: "13px",
    margin: 0,
    backgroundColor: colors.RED,
    color: colors.BLACK,
    width: "80px",
    height: "25px",

    "&:hover": {
      backgroundColor: colors.BLUE,
    },
  },
  addCommentContainer: {
    marginTop: 20,

    display: "flex",
  },
  container: {
    marginTop: 40,
  },
  commentsContainer: {
    marginTop: 20,
    fontSize: "20px",
    borderTop: `1px solid ${colors.RED}`,
  },
  thumb: {
    cursor: "pointer",
    "&:hover": {
      color: "colors.SECONDARY",
    },
  },
  list: {
    cursor: "pointer",
  },
}));

interface Params {
  id: string;
}

export const PostView = (props: Props) => {
  const [post, setPost] = useState<PostI>();
  const styles = useStyles();
  const params: Params = useParams();
  const [content, setContent] = useState<AddCommentI>();
  const [message, setMessage] = useState<AddMessageI>();
  const token = localStorage.getItem("token");
  const [likes, setLikes] = useState<number>();

  const [profile, setProfile] = useState<UserI>();

  const { state }: any = useLocation();

  useEffect(() => {
    const getPostFnc = async () => {
      const { data } = await getPost(params.id);
      setPost(data);
    };

    const getProfileFnc = async () => {
      if (token) {
        const { data } = await getMyProfile();
        setProfile(data);
      }
    };

    getProfileFnc();
    getPostFnc();
  }, []);

  const newComment = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addComment(post!.id, content);
      window.location.reload();
      toast.success("Pomyślnie dodano komentarz!");
    } catch (error) {
      toast.error("Pojawił się problem przy dodawaniu komentarza!");
    }
  };

  const addtoList = async () => {
    try {
      const { data } = await addToList(post!.id);
      window.location.assign("/myprofile");
      toast.success('Pomyślnie wysłano wiadomość!');
    } catch (error) {
      console.log(error);
      toast.error('Pojawił się problem przy wysłaniu wiadomości!');
    }
  };

  const removefromList = async () => {
    try {
      const { data } = await removeFromList(post!.id);
      window.location.assign("/myprofile");
      toast.success('Pomyślnie wysłano wiadomość!');
    } catch (error) {
      console.log(error);
      toast.error('Pojawił się problem przy wysłaniu wiadomości!');
    }
  };

  const visitProfile = async (name: string) => {
    window.location.assign("/profile/" + name);
  };

  const deleteCom = async (id?: string) => {
    try {
      await deleteComment(post?.id, id);
      console.log(post?.id, id);
      window.location.reload();
      toast.success("Komentarz został usunięty!");
    } catch (e) {
      toast.error("Nie udało się usunąć komentarza!");
    }
  };
  
  let found = profile?.readBooks!.filter(function(item) { return item.id === post?.id; });
  console.log(found?.length);

  return (
    <>
      <Layout>
        {!post ? (
          <Loading />
        ) : (
          [
            <Box className={styles.basicInfoContainer}>
              <Box className={styles.avatarContainer}>
                <img
                  className={styles.photo}
                  height="100"
                  width="100"
                  src="https://vectorified.com/image/old-book-cover-vector-10.gif"
                  alt="avatar"
                />
              </Box>
              <Box className={styles.contentContainer}>
                
                  <p className={styles.userName}>{post.author}</p>
                  <p className={styles.date}>{post.genre}</p>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.minorInfo}>ISBN: {post.isbn}</p>
                  <Box className={styles.contentContainer2}>
                  {token && found!.length === 0 &&(
                      <Button
                        type='submit'
                        onClick={() => addtoList()}
                        className={styles.buttonZ}
                      >
                        Dodaj do listy
                      </Button>
                    )}
                    {token && found!.length === 1 &&(
                      <Button
                        type='submit'
                        onClick={() => removefromList()}
                        className={styles.buttonZ}
                      >
                        Usuń z listy
                      </Button>
                    )}
                  <Box className={styles.container}></Box>
                </Box>
                <Box className={styles.commentsContainer}>
                  Recenzje:
                  {post.reviews!.map((value) => {
                    return (
                      <Box className={styles.comContainer}>
                        <div
                          className={styles.list}
                          onClick={() => visitProfile(value.user)}
                        >
                          <Box className={styles.avatarContainer}>
                            <img
                              className={styles.photocom}
                              height="50"
                              width="50"
                              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                              alt="avatar"
                            />
                          </Box>
                        </div>
                        <Box className={styles.contentContainer}>
                          <Box className={styles.contentContainer2}>
                            <div
                              className={styles.list}
                              onClick={() => visitProfile(value.user)}
                            >
                              <p className={styles.comName}>{value.user}</p>
                            </div>
                          </Box>

                          <p className={styles.comInfo}>{value.content}</p>
                        </Box>
                      </Box>
                    );
                  })}
                  {token && (
                    <form onSubmit={newComment}>
                      <Box className={styles.addCommentContainer}>
                        <CustomTextField
                          label="Dodaj recenzję"
                          variant="standard"
                          color="secondary"
                          multiline
                          style={{ width: "70%" }}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              content: e.currentTarget.value,
                            })
                          }
                        />
                        <Button type="submit" className={styles.button}>
                          Dodaj
                        </Button>
                      </Box>
                    </form>
                  )}
                </Box>
              </Box>
            </Box>,
          ]
        )}
      </Layout>
    </>
  );
};
