import { React, useState, useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { Panel, Container, Animation, FlexboxGrid, Col, Placeholder, Divider, Row } from 'rsuite'
import BackDash from '../../styles/backDash.jpg'
import Image from 'next/image'
import LogoTest from '../../styles/swordmanlogosimple.png'
import { UserContext } from '../utilContext.js'

export default function Dashboard(){
  const [arrChar, setArrChar] = useState([])
  const {userDataMaster, setUserDataMaster} = useContext(UserContext);
  let tO = 0
  let tV = 0

  function lineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:3}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }

  return(
    <Animation.Bounce in={true}>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24} >
      {/*Login form*/}
            <Panel >
              <h2 style={{color:'white', padding:20, textShadow:'0px 0px 6px black'}}>Control Panel</h2>
            </Panel>

            <FlexboxGrid style={{margin:25}}>

              <FlexboxGrid.Item colspan={24}>

                <FlexboxGrid.Item  as={Col} colspan={24} md={8}>
                  <Panel style={{marginTop:10}} bordered>

                    {userDataMaster ?
                      <Panel style={{margin:-10}} eventKey={1} id="panel1">
                        <h4>Server Stats</h4>
                        <Divider style={{marginTop:10}} />
                        <div style={{display:'flex', flexDirection:'column', alignItems:'', marginTop:15, margin:10}}>
                          {lineData('Server Status', userDataMaster.userData.name)}
                          {/*lineData('Level Account', userData.gmLevel)*/}
                          {lineData('Total Accounts', userDataMaster.userData.email)}
                          {lineData('Total Characters', userDataMaster.userData.lastLoginIp)}
                          {lineData('Total Guilds', userDataMaster.userData.lastLoginTime ? userDataMaster.userData.lastLoginTime.slice(0, userDataMaster.userData.lastLoginTime.length-14, '') : '')}
                        </div>
                      </Panel>
                       : <></>
                     }
                  </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={24} md={8}>

                <Panel header='empty' bordered style={{margin:10}}>

                </Panel>

                </FlexboxGrid.Item>

                <FlexboxGrid.Item style={{marginTop:10}} as={Col} colspan={24} md={8}>
                <Panel bordered>

                  <Panel eventKey={1} id="panel1">
                  <h4 style={{display:'flex', justifyContent:'center', marginTop:-15}}>empty</h4>
                    <div style={{display:'flex', flexDirection:'column', alignItems:''}}>

                    </div>
                  </Panel>

                </Panel>
                </FlexboxGrid.Item>

              </FlexboxGrid.Item>

            </FlexboxGrid>

        </FlexboxGrid.Item>
    </FlexboxGrid>
    </Animation.Bounce>

  )
}
