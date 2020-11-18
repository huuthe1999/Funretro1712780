import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from './components/LogIn/SignIn';
import SignUp from './components/LogIn/SignUp';
import Dashboard from './components/DardBoard/Dashboard';
import ActiveSignUp from './components/LogIn/ActiveSignUp';
import FogotPassWord from './components/LogIn/FogotPassWord';
import ResetPassWord from './components/LogIn/ResetPassWord';
import HomePage from './components/Home/HomePage';
import ProfileUserRoute from './routes/ProfileUser';
import Profile from './components/User/Profile';
import BoardDetail from './components/BoardDetail/BoardDetail';

const rootElement = document.getElementById('root');
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/dashboard" exact component={Dashboard}></Route>
      <Route path="/board/:idUser/:idBoard" exact component={BoardDetail}></Route>
      <Route path="/login" exact component={SignIn}></Route>
      <Route path="/register" exact component={SignUp}></Route>
      <Route path="/user/password/forgot" exact component={FogotPassWord}></Route>
      <Route path="/user/password/reset/:token" exact component={ResetPassWord}></Route>
      <Route path="/user/active/:token" exact component={ActiveSignUp}></Route>
      <ProfileUserRoute path="/user/profile" exact component={Profile} />
    </Switch>
  </BrowserRouter>
)
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<Routes />, rootElement);
} else {
  ReactDOM.render(
    <Routes />, rootElement);
}

