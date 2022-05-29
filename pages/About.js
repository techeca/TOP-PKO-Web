import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup } from 'rsuite'
import Image from 'next/image'
import AboutImg from '../styles/aboutimg.png'
import TechecaLogo from '../styles/techeca.png'

export default function Profile(){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  //const [user, setUser] = useState({uData});
  //const [userProfile, setUserProfile] = useState({name:'', gmLevel:'', password:'', lastLoginIp:'', lastLoginTime:''})
  //const userData = JSON.parse(uData)

  function lineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:3}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }

  return(
    <Panel style={{textAlign:'center'}}>

    <h2>About</h2>
    <div style={{color:'red'}}>
    </div>

    <FlexboxGrid justify="space-around" style={{margin:40}}>
      <FlexboxGrid.Item as={Col} colspan={24} xl={8} lg={8} md={14} sm={18}>

          <Panel bordered eventKey={1}>
            <Image responsive src={AboutImg} />
            <Panel >
              <p>
                <small>
                  Project created by me.
                </small>
              </p>
              <Image responsive src={TechecaLogo} />
            </Panel>
          </Panel>

      </FlexboxGrid.Item>
    </FlexboxGrid>
    </Panel>
  )
}
