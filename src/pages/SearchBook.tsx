import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Typography,
  Box,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import { PostI } from "../interfaces";
import { UserI } from "../interfaces";
import { addPost, getMyProfile } from "../api";
import {
  CustomTextField,
  FormWrapper,
  Layout,
  useFormStyles,
} from "../components";
import { colors } from "../styles";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    height: "100vh",
    margin: "auto",
    width: "100%",
    minWidth: "900px",
    minHeight: "650px",
  },
  searchbar: {
    width: "250px",
    "& .MuiInputBase-root": {
      fontSize: 15,
    },
  },
  logoContainer: {
    width: "25%",
    display: "flex",
    justifyContent: "right",
    flexDirection: "column",
  },
  logo: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    flexDirection: "column",
  },
  rightContainer: { width: "25%" },
  navigationContainer: {
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    position: "absolute",
    top: "0",
    width: "100%",
    height: "60px",
  },
  mainContainer: {
    width: "50%",
  },
  profileNavigation: {
    display: "flex",
    justifyContent: "left",
    marginTop: "10px",
    marginLeft: "5px",
    padding: "10px",
    "& .hover": {
      cursor: "pointer",
      color: "#ffb800",
    },
  },
  middleContainer: {
    display: "flex",
    justifyContent: "right",
  },
}));

export const SearchBook: React.FC = () => {
  const styles = useStyles();
  const history = useHistory();

  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");

  const searchHandlerT = (title?: string) => {
    history.push("/books/title/" + title);
    window.location.reload();
  };

  const keyPressT = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13) {
      searchHandlerT(title);
    }
  };

  const searchHandlerA = (author?: string) => {
    history.push("/books/author/" + author);
    window.location.reload();
  };

  const keyPressA = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13) {
      searchHandlerA(author);
    }
  };

  const searchHandlerI = (isbn?: string) => {
    history.push("/books/isbn/" + isbn);
    window.location.reload();
  };

  const keyPressI = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode == 13) {
      searchHandlerI(isbn);
    }
  };

  return (
    <>
      <Layout>
        <FormWrapper title="Szukaj książek!">
          <CustomTextField
            className={styles.searchbar}
            placeholder="Szukaj według tytułu..."
            onChange={(e) => setTitle(e.currentTarget.value)}
            onKeyDown={(e) => keyPressT(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      console.log(title);
                      searchHandlerT(title);
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomTextField
            className={styles.searchbar}
            placeholder="Szukaj według autora..."
            onChange={(e) => setAuthor(e.currentTarget.value)}
            onKeyDown={(e) => keyPressA(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      console.log(author);
                      searchHandlerA(author);
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <CustomTextField
            className={styles.searchbar}
            placeholder="Szukaj według numeru ISBN..."
            onChange={(e) => setIsbn(e.currentTarget.value)}
            onKeyDown={(e) => keyPressI(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      console.log(isbn);
                      searchHandlerI(isbn);
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormWrapper>
      </Layout>
    </>
  );
};
