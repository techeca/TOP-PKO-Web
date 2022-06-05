import { React, forwardRef, useEffect, useState, useContext } from 'react'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Footer, Badge, Affix } from 'rsuite'
import DashboardIcon from '@rsuite/icons/Dashboard'
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import UserInfoIcon from '@rsuite/icons/UserInfo'
import PeoplesIcon from '@rsuite/icons/Peoples'
import SettingIcon from '@rsuite/icons/Setting'
import InfoOutlineIcon from '@rsuite/icons/InfoOutline'
import UserBadgeIcon from '@rsuite/icons/UserBadge'
import { useRouter } from 'next/router'
//import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Link from 'next/link';
import {userService} from '@services/index'
import Profile from './Profile'
import Characters from './Characters'
import Dashboard from './Dashboard'
import Accounts from './Accounts'
import About from '../About'
import Mall from './Mall'
import { ThemeContext } from '../utilContext.js'

export default function MySideNav(){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [active, setActive] = useState('dashboard');
  const {theme, setTheme} = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(true);

  function handleContentCPanel (p){
    switch (p) {
      case 'characters':
        return (<Characters />)
      case 'dashboard':
        return (<Dashboard />)
      case 'about':
        return (<About />)
      case 'accounts':
        return (<Accounts />)
      case 'guilds':
        return (<Characters />)
      case 'mall':
        return (<Mall />)
      default:
        return (<Dashboard />)
    }
}

  function handleSelect(pageSel){
    setPageSelected(pageSel)
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
      localStorage.setItem('themeUser', 'light')
    }
    //console.log(temp)
    setActive(active)
  }

  function getColorLink(page, pageSelected){
    const ps = page == pageSelected
    return ps
  }

//console.log(active+' admin')

const CustomNav = ({ active, onSelect, onOpen,...props }) => {
  return (
    <Nav  {...props} activeKey={active} onSelect={onSelect}>
      <Nav.Item eventKey="dashboard" icon={<DashboardIcon />}>Dashboard</Nav.Item >
      <Nav.Item eventKey="accounts" icon={<UserBadgeIcon />}>Accounts</Nav.Item>
      <Nav.Item eventKey="characters" icon={<UserInfoIcon />}>Characters</Nav.Item>
      <Nav.Item eventKey="guilds" icon={<PeoplesIcon />}>Guilds</Nav.Item>
      <Nav.Item eventKey="mall" icon={<CreditCardPlusIcon />}>Mall</Nav.Item>
        <Nav.Menu eventKey='settings' icon={<SettingIcon />} title="Settings"  onToggle={() => setActive(active)}>
          <Nav.Item onClick={handleChangeThemeBox}>Change Theme</Nav.Item>
        </Nav.Menu>
      <Nav.Item eventKey="about" icon={<InfoOutlineIcon />}>About</Nav.Item>
    </Nav>
  );
};

  return(
    <Container style={{height:'100%'}}>

       <Sidebar style={{display:'flex'}} width={expanded ? 260 : 56} collapsible>

         <Sidenav expanded={expanded}  appearance={'default'} defaultOpenKeys={['settings']}>
         <Affix>
           <Sidenav.Body style={{}} >
           <CustomNav active={active} onOpen={setActive} onSelect={setActive} />
           </Sidenav.Body>
           <Sidenav.Toggle appearance={'default'} style={{display:'flex', justifyContent:'flex-end', padding:10, bottom:'0'}} expanded={!expanded} onToggle={expanded => setExpanded(!expanded)} />
           </Affix>
         </Sidenav>

       </Sidebar>

       <Content style={{}}>
       {handleContentCPanel(active)}
       </Content>

    </Container>
  )
}
