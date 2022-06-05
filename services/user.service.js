import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';
import { fetchWrapper } from '../helpers';
import getConfig from 'next/config';
import { Notification } from 'rsuite'
import { UserContext } from '../pages/utilContext.js'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
  user: userSubject.asObservable(),
  get userValue () { return userSubject.value},
  login,
  logout,
  getDetails,
  register,
  admAccount,
  admCharacterst,
  admMall,
  itemsDet,
  addItemToPackage
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
}

//ADMIN - mover

function admAccount(){
  //Debe ser admin para solicitar datos
    if(userService.userValue.tokenAdmin){
      return fetchWrapper.get(`${baseUrl}/adminAccounts`)
    }else {
      Router.push('/');
    }
}

function admCharacterst(){
  //Debe ser admin para solicitar datos
    if(userService.userValue.tokenAdmin){
      return fetchWrapper.get(`${baseUrl}/adminCharacters`)
    }else {
      Router.push('/');
    }
}

function admMall(){
  //Debe ser admin para solicitar datos
    if(userService.userValue.tokenAdmin){
      return fetchWrapper.get(`${baseUrl}/adminMall`)
    }else {
      Router.push('/');
    }
}

function itemsDet(itemsRequest){
  return fetchWrapper.post(`${baseUrl}/itemsDetails`, {itemsRequest})
}

function addItemToPackage(item, reqType){
  return fetchWrapper.post(`${baseUrl}/itemsDetails`, {item, reqType})
}
