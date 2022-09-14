import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import { register } from '../api';
import { paths } from '../routing';
import { useLocalStorage } from '../hooks';
import { Layout } from '../components';
import { RegisterRequestI } from '../interfaces';
import {
  CustomButton,
  CustomTextField,
  FormWrapper,
  useFormStyles,
} from '../components';

export const Register: React.FC = () => {
  const history = useHistory();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const styles = useFormStyles();

  // useEffect(() => {
  //   if (token) {
  //     history.push('/');
  //   }
  // }, [token]);

  const registerUser = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: RegisterRequestI = {
      name,
      email,
      password,
      avatar,
    };

    try {
      history.push('/login');
      
    } catch (error) {
      toast.error('Pojawił się problem przy rejestracji!');
    }
  };

  return (
    <>
      <Layout>
        <FormWrapper title='Zarejestruj się!'>
          <form onSubmit={registerUser} className={styles.form}>
            <CustomTextField
              label='Username'
              variant='standard'
              color='secondary'
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={name}
            />
            <CustomTextField
              label='Email'
              variant='standard'
              color='secondary'
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <CustomTextField
              label='Hasło'
              variant='standard'
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CustomButton
              type='submit'
              color='secondary'
              variant='contained'
              className={styles.button}
            >
              <Typography variant='button'>Zarejestruj</Typography>
            </CustomButton>
          </form>
          <Link to={paths.LOGIN} className={styles.formLinkDisclaimer}>
            Masz już konto? <span>Zaloguj się!</span>
          </Link>
        </FormWrapper>
      </Layout>
    </>
  );
};
