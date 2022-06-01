import { React, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import MySideNav from './MySideNav.js'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content } from 'rsuite'
import Profile from './Profile.js'

export default function UserPage(){
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [charsData, setCharsData] = useState('');

  useEffect(() => {
    //Obtiene los datos guardados al iniciar cuenta
    const usrtmp = localStorage.getItem('user')
    if(usrtmp){
      setUser(usrtmp)
      userService.getDetails().then((x) => setCharsData(x))
    }
  }, [])

  //console.log(charsData)

  return(
    <MySideNav charsData={charsData} />
  )

}
