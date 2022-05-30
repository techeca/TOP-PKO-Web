import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';
import getConfig from 'next/config';
import { Notification } from 'rsuite'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value},
  login,
  logout,
  getDetails,
  register
};

function login(username, password) {
  return fetchWrapper.postSn(`${baseUrl}/authenticate`, {username, password})
    .then(user => {
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function getDetails(){
  return fetchWrapper.get(`${baseUrl}/profile`)
}

function logout(){
  localStorage.removeItem('user');
  userSubject.next(null);
}

function register(name, email, password){
  return fetchWrapper.postSn(`${baseUrl}/register`, {name, email, password})
    .then(user => {
      userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}
