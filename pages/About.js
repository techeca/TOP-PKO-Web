import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup, Animation } from 'rsuite'
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
    <Container style={{margin:30, maxHeight:'100vh'}}>
    <Animation.Bounce in={true}>
    <FlexboxGrid justify={'center'}>
      <FlexboxGrid.Item as={Col} colspan={24} lg={10} md={14} sm={22}>

      <h2 style={{textAlign:'center'}}>About</h2>
      <div>
      </div>


            <Panel bordered style={{display:'flex', justifyContent:'center'}}>
              <Image layout="responsive" src={AboutImg} />
              <Panel style={{display:'flex', justifyContent:'center'}}>
                <Image src={TechecaLogo} />
              </Panel>
              <p style={{display:'flex', justifyContent:'center'}}>
                <small style={{display:'flex', flexDirection:'column'}}>
                  Links to resources used in this project:
                </small>
              </p>
              <ul>
                <li><a href="https://github.com/techeca/TOP-PKO-Web">Github</a></li>
              </ul>
            </Panel>

        </FlexboxGrid.Item>

    </FlexboxGrid>
    </Animation.Bounce>
    </Container>
  )
}
