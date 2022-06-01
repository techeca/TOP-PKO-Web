import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import MySideNav from './MySideNav.js'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content } from 'rsuite'
import Profile from './Profile.js'

export default function UserPage({handleChangeTheme}){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [user, setUser] = useState(null);
  const [charsData, setCharsData] = useState('');

  useEffect(() => {
    //Obtiene los datos guardados al iniciar cuenta
    const usrtmp = localStorage.getItem('user')
    if(usrtmp){
      setUser(usrtmp)
      userService.getDetails().then((x) => setCharsData(x))
    }
    //userService.getAll(usrtmp).then(x => setUsers(x));
  }, [setUser])

  return(
    <MySideNav handleChangeTheme={handleChangeTheme} userData={user} charsData={charsData}  />
  )

}
