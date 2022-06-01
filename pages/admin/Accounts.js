import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup, Animation, Button, Input } from 'rsuite'
import Image from 'next/image'
import AboutImg from '../../styles/aboutimg.png'
import TechecaLogo from '../../styles/techeca.png'

export default function Accounts(){
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
      <FlexboxGrid.Item as={Col} colspan={24} md={20}>
      {/*Accounts pane *admin*/}
      <h2 style={{textAlign:'left'}}>Accounts</h2>
      <div>
      </div>

            <Panel bordered style={{justifyContent:'center'}}>
              {/*<Image layout="responsive" src={AboutImg} />*/}
              <div style={{display:'flex', width:'60%', margin:10}}>
              <h6 style={{width:'30%', marginTop:5}}>Search user</h6>
                <Input placeholder="account name" />
                <Button style={{width:'20%', marginLeft:30}} >Find</Button>
              </div>

              <Panel bordered style={{margin:30, borderRadius:0}}>

              </Panel>

            </Panel>

        </FlexboxGrid.Item>

    </FlexboxGrid>
    </Animation.Bounce>
    </Container>
  )
}
