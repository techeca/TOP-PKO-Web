import {useState} from 'react'
import Head from 'next/head'
//import styles from '../styles/Home.module.css'
import MyNav from './MyNav.js'
import {Container, Content, Footer, Header, Button, FlexboxGrid, Col, Panel, List, Nav} from 'rsuite'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Intro from './index.js'
import { useRouter  } from 'next/router'

export default function Home() {
  const [active, setActive] = useState('home')

  const CustomNav = ({ active, onSelect, ...props }) => {
  return (
      <Nav {...props} activeKey={active} onSelect={onSelect} style={{fontWeight:'bold', display:'flex', justifyContent:'center', padding:10}} >
      <Nav.Item style={{color:'white'}} eventKey="home">GAME INFORMATION</Nav.Item>
      <Nav.Item style={{color:'white'}} eventKey="lance">LANCE</Nav.Item>
      <Nav.Item style={{color:'white'}} eventKey="carsise">CARSISE</Nav.Item>
      <Nav.Item style={{color:'white'}} eventKey="phyllis">PHYLLIS</Nav.Item>
      <Nav.Item style={{color:'white'}} eventKey="ami">AMI</Nav.Item>
    </Nav>
  );
};


  return (
    <Container style={{backgroundColor:'black', minWidth:'80%'}}>
        <div id='firstContent' style={{display:'flex', minWidth:'100%'}}>
            <div className='logostart' style={{width:'100%', marginTop:'3%'}}>
                <div className='sublogo' style={{marginTop:'35%'}}/>
            </div>
            <div style={{display:'flex', marginTop:'30%'}}>

                <Button color="orange" onClick={() => showPanel()} appearance="primary" size='lg' style={{height:70, width:250}}><h3>PLAY NOW</h3></Button>
            </div>
        <div className='character' style={{width:'100%'}}/>

        </div>

            <div style={{width:'100%', height:'auto'}} className='secondContent'>
                <h2 style={{textAlign:'center', marginTop:50, marginBottom:10}}>NEWS</h2>
                <div style={{display:'flex', justifyContent:'center'}}>

                </div>
            </div>

            <div style={{backgroundColor:'white', padding:40}}>
              <h2 style={{textAlign:'center', color:'black'}}>SERVER TIME <span style={{color:'darkorange'}}>04:20</span> AM - <span>USERS ONLINE</span><span style={{color:'darkorange'}}> 9999</span></h2>
            </div>

            <div style={{width:'100%', height:'auto'}} className='thirdContent'>
              <h2 style={{textAlign:'center', margin:20}}>FEATURED ITEMS</h2>
              <div>
              items
              </div>
            </div>

            <div style={{backgroundColor:'white', padding:30, flex:'center', justifyContent:'center'}}>
              <h2 style={{textAlign:'center', color:'black'}}>RANKING</h2>

              <div style={{display:'flex', width:'100%', justifyContent:'center'}}>
              <FlexboxGrid>
                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                  <Panel header={<span style={{fontWeight:'bold',color:'black'}}>LEVEL RANKING</span>} shaded style={{width:'100%', minWidth:190, margin:20}}>
                    <List  bordered>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                    </List>
                  </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                  <Panel header={<h6 style={{fontWeight:'bold',color:'black'}}>GOLD RANKING</h6>} shaded style={{width:'100%', minWidth:190, margin:20}}>
                    <List  bordered>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                    </List>
                  </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                  <Panel header={<h6 style={{fontWeight:'bold',color:'black'}}>GUILD RANKING</h6>} shaded style={{width:'100%', minWidth:190, margin:20}}>
                    <List  bordered>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                    </List>
                  </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={24} md={6}>
                  <Panel header={<h6 style={{fontWeight:'bold',color:'black'}}>PK RANKING</h6>} shaded style={{width:'100%', minWidth:190, margin:20}}>
                    <List  bordered>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                      <List.Item style={{color:'white', fontWeight:'bold'}}>USERADMIN<span style={{textAlign:'right'}}>100</span></List.Item>
                    </List>
                  </Panel>
                </FlexboxGrid.Item>
              </FlexboxGrid>

              </div>
            </div>

            <div className='fourthContent' style={{display:'flex'}}>
              <div className='bg' style={{ flexDirection:'row', display:'flex'}}>
                  <div style={{display:'flex', margin:80, flexDirection:'column', width:'70%'}}>
                    <CustomNav appearance="subtle" active={active} onSelect={setActive}/>
                    <div>
                    <h4 style={{color:'white', margin:5}}>Tales of Pirates</h4>
                      <p>was a 3D massively multiplayer online role-playing video game developed by the Chinese company MOLI (Chinese: 摩力游) and published by IGG. The game takes place in a pirate-like environment with a top-view camera and takes inspiration cues from manga series like One Piece. In 2011, IGG released a direct sequel called Tales of Pirates 2, letting users migrate their characters from the previous game.[1][2] Tales of Pirates 2 subsequently closed on February 29, 2016.</p>
                    </div>

                    <div style={{marginTop:20, marginBottom:-10}}>
                    <Button style={{color:'white', borderColor:'gray'}} appearance='ghost'>Read More</Button>
                    </div>
                  </div>

                  <div style={{ width:'30%'}}>
                    <div className='character2' style={{marginTop:-30 ,display:'flex', flexwrap:'nowrap'}}/>
                  </div>


               </div>

            </div>

    </Container>

  )
}
