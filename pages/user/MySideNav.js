import { React, forwardRef, useEffect, useState, useContext } from 'react'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Footer, Badge, Affix } from 'rsuite'
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
import { ThemeContext } from './utilContext.js'

export default function MySideNav({userData, charsData}){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [active, setActive] = useState('dashboard');
  const uData = userData
  const cData = charsData
  const {theme, setTheme} = useContext(ThemeContext);
  const [expanded, setExpanded] = useState(true);

  //if(themeUser === 'dark'){
  //  color = '#1a1d24'
  //}else {
  //  color = '#f7f7fa'
//  }

  function handleContentCPanel (p){
    console.log(cData[0])
    let dataChar = []
    if(!isNaN(p) && cData){
      dataChar = cData[0].filter((x) => {
        return x.cha_id == p
      })
      p = 'character'
      //console.log(dataChar)
    }

    switch (p) {
      case 'characters':
        return (<Characters />)
      case 'dashboard':
        return (<Dashboard />)
      case 'profile':
        return (<Profile uData={uData} />)
      case 'character':
        return (<Character cData={dataChar} />)
      case 'about':
        return (<About />)
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
    console.log(temp)
  }

  function getColorLink(page, pageSelected){
    const ps = page == pageSelected
    return ps
  }

//console.log(cData)

const CustomNav = ({ active, onSelect, onOpen,...props }) => {
  return (
    <Nav  {...props} activeKey={active} onSelect={onSelect} style={{}} >
      <Nav.Item eventKey="dashboard" style={{color:`${active == 'dashboard' ? 'darkorange' : ''}`}} icon={<DashboardIcon />}>Dashboard</Nav.Item >
      <Nav.Item eventKey="profile" style={{color:`${active == 'profile' ? 'darkorange' : ''}`}} icon={<UserInfoIcon />}>Profile</Nav.Item>
      <Nav.Menu eventKey="characters" style={{color:`${active == 'characters' ? 'darkorange' : ''}`}} onOpen={() => setActive('')} icon={<PeoplesIcon />} title="Characters">
        {!cData ? <></> : (cData[0].map((x) =>
          <Nav.Item key={x.cha_id} style={{color:`${active == x.cha_id ? 'darkorange' : ''}`}} eventKey={x.cha_id}>{x.cha_name} {x.motto} <Badge style={{marginLeft:5}} color="red" content={<p><strong>Lv:{x.degree}</strong></p>} /></Nav.Item>
        ))}
      </Nav.Menu>
      <Nav.Menu eventKey="products" icon={<SettingIcon />} title="Settings">
        <Nav.Item eventKey="" onClick={handleChangeThemeBox}>Change Theme</Nav.Item>
      </Nav.Menu>
      <Nav.Item eventKey="about" style={{color:`${active == 'about'? 'darkorange' : ''}`}} icon={<InfoOutlineIcon />}>About</Nav.Item>
    </Nav>
  );
};

  return(
    <Container style={{height:'100%'}}>

       <Sidebar style={{display:'flex'}} width={expanded ? 260 : 56} collapsible>
         <Sidenav expanded={expanded}  appearance={'default'} defaultOpenKeys={['3', '4']}>
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
