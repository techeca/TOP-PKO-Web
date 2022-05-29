import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import MySideNav from './MySideNav.js'
import ChangePassword from './ChangePassword.js'
import ChangeEmail from './ChangeEmail.js'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup } from 'rsuite'


export default function Profile({uData}){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  //const [user, setUser] = useState({uData});
  //const [userProfile, setUserProfile] = useState({name:'', gmLevel:'', password:'', lastLoginIp:'', lastLoginTime:''})
  const userData = JSON.parse(uData)

  function lineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:3}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }

  return(
    <>
    {userData ?
      <>
      <Panel id='backImgProfile'>
        <h2 style={{color:'white', paddingLeft:20, textShadow:'0px 0px 4px black'}}>Profile</h2>
        <div style={{color:'orange', paddingLeft:20, textShadow:'0px 0px 2px black'}}>
        <h3>{userData.name}</h3>
        </div>
      </Panel>
    <Panel>

    <FlexboxGrid justify="space-around" style={{margin:40}}>
      <FlexboxGrid.Item as={Col} colspan={24} md={16} lg={14}>
        <PanelGroup accordion defaultActiveKey={1} bordered>
          <Panel header={<h4>Account Details</h4>} eventKey={1} id="panel1">
            <div style={{display:'flex', flexDirection:'column', alignItems:'', marginTop:-10}}>
              {lineData('Name', userData.name)}
              {lineData('Level Account', userData.gmLevel)}
              {lineData('Last Login IP', userData.lastLoginIp)}
              {lineData('Last Login Time', userData.lastLoginTime)}
            </div>
          </Panel>
          <ChangePassword eventKey={2} id="panel2" />
          <ChangeEmail disabled eventKey={3} id="panel3"/>
          <Panel header={<h4>idk</h4>} eventKey={4} id="panel4">
          idk
          </Panel>
        </PanelGroup>
      </FlexboxGrid.Item>
    </FlexboxGrid>
    </Panel></> : <>Loading...</>}
    </>
  )
}
