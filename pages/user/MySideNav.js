import { React, forwardRef, useEffect, useState, useContext } from 'react'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Footer, Badge, Affix, Icon } from 'rsuite'
import { Gear, AddOutline } from '@rsuite/icons';
import DashboardIcon from '@rsuite/icons/Dashboard'
import UserInfoIcon from '@rsuite/icons/UserInfo'
import PeoplesIcon from '@rsuite/icons/Peoples'
import SettingIcon from '@rsuite/icons/Setting'
import InfoOutlineIcon from '@rsuite/icons/InfoOutline'
import { useRouter } from 'next/router'
//import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Link from 'next/link';
import {userService} from '@services/index'
import Profile from './Profile'
import Characters from './Characters'
import Dashboard from './Dashboard'
import Character from './Character'
import About from '../About'
import { ThemeContext, UserContext } from '../utilContext.js'

export default function MySideNav(){
  const router = useRouter()
  const [active, setActive] = useState('dashboard')
  const {theme, setTheme} = useContext(ThemeContext)
  const [expanded, setExpanded] = useState(true)
  const {userDataMaster, setUserDataMaster} = useContext(UserContext)

  function handleContentCPanel (p){
    //Si seleccionar un personaje obtiene id del pj
    let dataChar = []
    if(!isNaN(p)){
      //busca el personaje seleccionado
      dataChar = userDataMaster.charsData[0].filter((x) => {
        p = active
        return x.cha_id == p
      })
      //Go a la pagina character con el personaje seleccionado
      p = 'character'
      //console.log(dataChar)
    }

    switch (p) {
      case 'characters':
        return (<Characters />)   //No funciona
      case 'dashboard':
        return (<Dashboard />)
      case 'profile':
        return (<Profile />)
      case 'character':
        return (<Character cData={dataChar} />)
      case 'about':
        return (<About />)
      default:
        return (<Dashboard />)
    }
}

  const handleChangeThemeBox = () => {
    const temp = localStorage.getItem('themeUser')
    if(temp !== null){
      if(localStorage.getItem('themeUser') === 'dark'){
        localStorage.setItem('themeUser', 'light')
        setTheme('light')
      }else {
        localStorage.setItem('themeUser', 'dark')
        setTheme('dark')
      }
    }else {
      localStorage.setItem('themeUser', 'dark')
    }
    setActive(active)
  }

  const CustomNav = ({ active, onSelect, onOpen,...props }) => {
    return (
      <Nav  {...props} activeKey={active} onSelect={onSelect} style={{}} >
        <Nav.Item eventKey="dashboard" style={{color:`${active == 'dashboard' ? 'darkorange' : ''}`}} icon={<DashboardIcon />}>Dashboard</Nav.Item >
        <Nav.Item eventKey="profile" style={{color:`${active == 'profile' ? 'darkorange' : ''}`}} icon={<UserInfoIcon />}>Profile</Nav.Item>

            {!userDataMaster.charsData ? <></> : (userDataMaster.charsData[0].map((x) =>
              <Nav.Menu key={'4'} eventKey='characters' icon={<PeoplesIcon style={{color:`${active == x.cha_id ? 'darkorange' : ''}`}} />} title="Characters" onToggle={() => setActive(active)} >
              <Nav.Item key={x.cha_id} style={{color:`${active == x.cha_id ? 'darkorange' : ''}`}} eventKey={x.cha_id}>{x.cha_name} {x.motto} <Badge style={{marginLeft:5}} color="red" content={<p><strong>Lv:{x.degree}</strong></p>} /></Nav.Item>
              </Nav.Menu>
            ))}

          <Nav.Menu eventKey='settings' icon={<SettingIcon />} title="Settings"  onToggle={() => setActive(active)}>
            <Nav.Item  onClick={handleChangeThemeBox}>Change Theme</Nav.Item>
          </Nav.Menu>
        <Nav.Item eventKey="about" style={{color:`${active == 'about'? 'darkorange' : ''}`}} icon={<InfoOutlineIcon />}>About</Nav.Item>
      </Nav>
    );
  };

  return(
    <Container style={{height:'100%'}}>

       <Sidebar style={{display:'flex'}} width={expanded ? 260 : 56} collapsible>
         <Sidenav expanded={expanded}  appearance={'default'} defaultOpenKeys={['characters', 'settings']}>
           <Sidenav.Body style={{}} >
           <CustomNav active={active} onOpen={setActive} onSelect={setActive} />
           </Sidenav.Body>
           <Sidenav.Toggle appearance={'default'} style={{display:'flex', justifyContent:'flex-end', padding:10, bottom:'0'}} expanded={!expanded} onToggle={expanded => setExpanded(!expanded)} />
         </Sidenav>
       </Sidebar>

       <Content style={{}}>
       {handleContentCPanel(active)}
       </Content>

    </Container>
  )
}
