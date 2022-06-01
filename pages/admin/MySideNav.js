import { React, forwardRef, useEffect, useState, useContext } from 'react'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Footer, Badge, Affix } from 'rsuite'
import DashboardIcon from '@rsuite/icons/Dashboard'
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
import { ThemeContext } from '../utilContext.js'

export default function MySideNav({userData, charsData}){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [active, setActive] = useState('dashboard');
  const uData = userData
  const cData = charsData
  const {theme, setTheme} = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(true);

  function handleContentCPanel (p){
    //console.log(cData[0])
    let dataChar = []
    if(!isNaN(p) && cData){
      dataChar = cData[0].filter((x) => {
        p = active
        return x.cha_id == p
      })
      p = 'character'
      //console.log(dataChar)
    }

    switch (p) {
      case 'characters':
        return (<Characters />)
      case 'dashboard':
        return (<Dashboard uData={uData} cData={charsData} />)
      case 'about':
        return (<About />)
      case 'accounts':
        return (<Accounts />)
      case 'guilds':
        return (<Characters />)
      default:
        return (<Dashboard />)
    }
}

//cData[0].map((x) => console.log(x.cha_name))

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

console.log(active+' admin')

const CustomNav = ({ active, onSelect, onOpen,...props }) => {
  return (
    <Nav  {...props} activeKey={active} onSelect={onSelect} style={{}} >
      <Nav.Item eventKey="dashboard" style={{color:`${active == 'dashboard' ? 'darkorange' : ''}`}} icon={<DashboardIcon />}>Dashboard</Nav.Item >
      <Nav.Item eventKey="accounts" style={{color:`${active == 'accounts' ? 'darkorange' : ''}`}} icon={<UserBadgeIcon />}>Accounts</Nav.Item>
      <Nav.Item eventKey="characters" style={{color:`${active == 'characters' ? 'darkorange' : ''}`}} icon={<UserInfoIcon />}>Characters</Nav.Item>
      <Nav.Item eventKey="guilds" style={{color:`${active == 'guilds' ? 'darkorange' : ''}`}} icon={<PeoplesIcon />}>Guilds</Nav.Item>

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
