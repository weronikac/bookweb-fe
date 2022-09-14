import { RouteProps } from 'react-router-dom';
import {
  Login,
  Register,
  MyProfile,
  PostView,
  SearchBook,
  PostViewAuth,
  Title,
  Author,
  Isbn,
  Profile,
} from '../pages';
import { paths } from './paths';

export const routes: RouteProps[] = [
  {
    path: paths.LOGIN,
    component: Login,
  },
  {
    path: paths.REGISTER,
    component: Register,
  },
  {
    path: paths.MYPROFILE,
    component: MyProfile,
  },
  {
    path: paths.SEARCH,
    component: SearchBook,
  },
  {
    path: paths.POSTVIEW,
    component: PostView,
  },
  {
    path: paths.POSTAUTHVIEW,
    component: PostViewAuth,
  },
  {
    path: paths.TITLE,
    component: Title,
  },
  {
    path: paths.AUTHOR  ,
    component: Author,
  },
  {
    path: paths.ISBN,
    component: Isbn,
  },
  {
    path: paths.PROFILE,
    component: Profile,
  },
];
