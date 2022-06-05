import { React, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import MySideNav from './MySideNav.js'
import ChangePassword from './ChangePassword.js'
import ChangeHonorForCredits from './ChangeHonorForCredits.js'
import ChangeEmail from './ChangeEmail.js'
import {FlexboxGrid, Col, Dropdown, Container, Content, Panel, PanelGroup, Animation, Divider } from 'rsuite'
import { UserContext } from '../utilContext.js'

export default function Profile(){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const {userDataMaster, setUserDataMaster} = useContext(UserContext);

  function lineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:3}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }

  //userDataMaster.charsData[0].reduce((a, b) => console.log(a + b, 0))
  //console.log(userDataMaster)

  return(
    <>
    {userDataMaster.userData ?
      <Animation.Bounce in={true}>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={24} >
        {/*Profile user*/}
              <Panel id='backImgProfile'>
                  <h2 style={{color:'white', paddingLeft:20, textShadow:'0px 0px 4px black'}}>Profile</h2>
                  <div style={{color:'orange', paddingLeft:20, textShadow:'0px 0px 2px black'}}>
                  <h3>{userDataMaster.userData.name}</h3>
                  </div>
              </Panel>

              <FlexboxGrid style={{margin:25}}>
                <FlexboxGrid.Item colspan={24}>
                  <FlexboxGrid.Item  as={Col} colspan={24} md={8}>
                  <Panel header={<h4>User Details</h4>} eventKey={1} id="panel1">
                    <div style={{display:'flex', flexDirection:'column', marginTop:-10}}>
                      {lineData('Name', userDataMaster.userData.name)}
                      {/*lineData('Level Account', userData.gmLevel)*/}
                      {lineData('Email', userDataMaster.userData.email)}
                      {lineData('Crystals', userDataMaster.userData.crystals)}
                      {lineData('Total Reputation', userDataMaster.charsData.honor)}
                      <Divider />
                      {lineData('Last Login IP', userDataMaster.userData.lastLoginIp)}
                      {lineData('Last Login Time', userDataMaster.userData.lastLoginTime)}
                    </div>
                  </Panel>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item  as={Col} colspan={24} md={8}>

                    <PanelGroup accordion style={{marginBottom:-20}}>
                      <Panel defaultExpanded>
                        <ChangePassword eventKey={1}  />
                      </Panel>
                    </PanelGroup>

                    <PanelGroup accordion >
                      <Panel defaultExpanded>
                        <ChangeHonorForCredits charsData={userDataMaster.charsData ? userDataMaster.charsData : false} eventKey={1}  />
                      </Panel>
                    </PanelGroup>

                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item style={{marginTop:10}} as={Col} colspan={24} md={8}>
                    <Panel bordered>
                      <Panel header={<h5>Last buys</h5>} eventKey={3} id="panel3">

                      </Panel>
                    </Panel>
                  </FlexboxGrid.Item>
                </FlexboxGrid.Item>

              </FlexboxGrid>

          </FlexboxGrid.Item>
      </FlexboxGrid>
      </Animation.Bounce>


    : <>Loading...</>}
    </>
  )
}
