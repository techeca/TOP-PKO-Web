import { React, forwardRef, useEffect, useState, useContext } from 'react'
import { Navbar, Nav, FlexboxGrid, Col, CustomProvider, toaster, Notification } from 'rsuite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { showNotification, UserContext } from './utilContext.js'
//import { Routes, Route, BrowserRouter } from 'react-router-dom'
import {userService} from '@services/index'

export default function MyNav(){
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)
  const [type, setType] = useState('info');
  const [active, setActive] = useState('home')
  const [activec, setActivec] = useState('')
  const {userDataMaster, setUserDataMaster} = useContext(UserContext)

  const NavCenter = ({ activec, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={activec} onSelect={onSelect}>
        <Nav.Item eventKey="home" onClick={() => router.push('/')}>HOME</Nav.Item>
        <Nav.Item eventKey="news">News</Nav.Item>
        <Nav.Item disabled eventKey="itemMall" disabled>Item Mall</Nav.Item>
        <Nav.Item eventKey="about">About</Nav.Item>
      </Nav>
    );
  };

  const NavUserLog = ({ active, onSelect, ...props }) => {
    //console.log(userService.userValue.tokenAdmin)
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect}>
        <div style={{}}>
        <h6 style={{margin:10}}>Welcome <span style={{color:'orange'}}>{userService.userValue.name}</span></h6>
        <Nav.Item eventKey="profile" onClick={() => router.push('/user/')}><FontAwesomeIcon  icon={faUser}/><span style={{marginLeft:10}}>Profile</span></Nav.Item>
        <Nav.Item eventKey="logout" onClick={() => handleLogout()} >Log Out</Nav.Item>
        {userService.userValue.tokenAdmin ? <Nav.Item eventKey="logout" onClick={() => router.push('/admin/')} >CPanel</Nav.Item> : <></>}
        </div>

      </Nav>
    );
  };

  const NavUserNotLog = ({ active, onSelect, ...props }) => {
    return (
      <Nav style={{margin:10}} {...props} activeKey={active} onSelect={onSelect}>
        <Nav.Item eventKey="login" onClick={() => router.push('/user/Login')}>Login</Nav.Item>
        <Nav.Item eventKey="register" onClick={() => router.push('/Register')}>Register</Nav.Item>
      </Nav>
    );
  };

  function handleLogout(){
    setIsLogged(false)
    const newdata = {userData:'', charsData:''}
    setUserDataMaster(newdata)
    router.push('/')
    userService.logout()
    toaster.push(showNotification('You have logged out successfully', 'info', 'Disconnected'), 'bottomEnd')
  }

    useEffect(() => {
      if(userService.userValue){
        setIsLogged(true)
        //console.log(userService.userValue)
      }else {
        //console.log(isLogged)
        setIsLogged(false)
      }
    }, [router, active, isLogged])

  return(
    <>
    <Navbar >

    <FlexboxGrid justify="space-around">

      <FlexboxGrid.Item as={Col} colspan={2} md={6} sm={2} xsHidden>
        <Navbar.Brand style={{marginTop:-5}} href="/"><h4>LOGO</h4></Navbar.Brand>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item as={Col} colspan={22} md={12} sm={18} style={{display:'flex', justifyContent:'center'}}>
        <NavCenter appearance="subtle" active={activec} onSelect={setActivec} />
      </FlexboxGrid.Item>

      <FlexboxGrid.Item as={Col} colspan={2} md={6} sm={2} xsHidden>
      <Nav pullRight>
        <div style={{}}>
        <Nav.Menu title={<h6 style={{display:'flex', marginLeft:isLogged ? 50 : 0}}>Account</h6>}>
        {!isLogged ?
          <NavUserNotLog appearance="subtle" active={active} onSelect={setActive} />
          :
          <NavUserLog appearance="subtle" active={active} onSelect={setActive} />
         }
          <Nav.Item href="/" onClick={() => toaster.push(showNotification('test', 'info', 'titletest'), 'bottomEnd')}>Settings</Nav.Item>
        </Nav.Menu>
        </div>
      </Nav>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    </Navbar>

    </>
  )
}
