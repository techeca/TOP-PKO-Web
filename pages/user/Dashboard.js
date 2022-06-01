import { React, useState, useContext } from 'react'
import styles from '../../styles/Home.module.css'
import { Panel, Container, Animation, FlexboxGrid, Col, Placeholder, Divider, Row } from 'rsuite'
import BackDash from '../../styles/backDash.jpg'
import Image from 'next/image'
import LogoTest from '../../styles/swordmanlogosimple.png'
import { UserContext } from '../utilContext.js'

export default function Dashboard(){
  const [arrChar, setArrChar] = useState([])
  const { Paragraph } = Placeholder;
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

  if(userDataMaster.charsData){
    tO = userDataMaster.charsData.length
    tV = 3 - userDataMaster.charsData.length
    if(tO > 0 && arrChar.length == 0){
      const tempArr = []

      for (var i = 0; i < userDataMaster.charsData.length; i++) {

        arrChar.push(userDataMaster.charsData[i])
      }

      for (var i = 0; i < tV; i++) {
        arrChar.push('empty'+i)
      }
      //setArrChar(tempArr)
      //console.log(arrChar)
    }
  }

  return(
    <Animation.Bounce in={true}>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24} >
      {/*Dashboard user*/}
            <Panel id='backImgDash'>
              <h2 style={{color:'white', padding:20, textShadow:'0px 0px 6px black'}}>Welcome to your Dashboard</h2>
            </Panel>

            <FlexboxGrid style={{margin:25}}>

                <FlexboxGrid.Item colspan={24}>

                  <FlexboxGrid.Item  as={Col} colspan={24} md={7}>
                    <Panel style={{marginTop:10}} bordered>

                      {userDataMaster ?
                        <Panel style={{margin:-10}} eventKey={1} id="panel1">
                          <h4>Account Details</h4>
                          <Divider style={{marginTop:10}} />
                          <div style={{display:'flex', flexDirection:'column', alignItems:'', marginTop:15, margin:10}}>
                            {lineData('Name', userDataMaster.userData.name)}
                            {/*lineData('Level Account', userData.gmLevel)*/}
                            {lineData('Email', userDataMaster.userData.email)}
                            {lineData('Last IP', userDataMaster.userData.lastLoginIp)}
                            {lineData('Last Login', userDataMaster.userData.lastLoginTime ? userDataMaster.userData.lastLoginTime.slice(0, userDataMaster.userData.lastLoginTime.length-14, '') : '')}
                          </div>
                        </Panel>
                         : <></>
                       }
                    </Panel>
                  </FlexboxGrid.Item>

                <FlexboxGrid.Item as={Col} colspan={24} md={10}>

                <Panel header='Characters' bordered style={{margin:10}}>

                {userDataMaster.charsData ? arrChar.map((char) =>

                  <Panel key={typeof char == 'string' ? char : char[0]['cha_id']} style={{marginBottom:10, margin:10}} bordered>
                    <Panel style={{margin:-15}} eventKey={1} id="panel1">
                      <div style={{display:'flex', flexDirection:'row', alignItems:'', marginTop:-5, justifyContent:'space-between'}}>
                      {typeof char == 'string' ? <Paragraph graph="square" />: <h5>{char[0]['job']}</h5>} {/*<Image style={{display:'flex'}} src={LogoTest} width='50%' height='50%'/>*/}
                        {/*console.log(char)*/}
                        <div style={{display:'flex', alignItems:'flex-end', padding:3}}>
                          <h4>{char[0]['cha_name']} <span style={{marginLeft:10}}>{char[0]['degree']}</span></h4>
                        </div>
                      </div>
                    </Panel>
                  </Panel>
                  )
                  :
                  <Panel style={{marginBottom:10}} bordered>
                    <Panel style={{margin:-15}} eventKey={1} id="panel1">
                      <div style={{display:'flex', flexDirection:'row', alignItems:'', marginTop:-10, justifyContent:'space-between'}}>

                      <Paragraph graph="square" />
                        <div style={{display:'flex', alignItems:'flex-end', padding:3}}>
                          <h4> You don't have characters<span style={{marginLeft:10}}></span></h4>
                        </div>
                      </div>
                    </Panel>
                  </Panel>
                }
                </Panel>

                </FlexboxGrid.Item>

                <FlexboxGrid.Item style={{marginTop:10}} as={Col} colspan={24} md={7}>
                <Panel bordered>

                  <Panel eventKey={1} id="panel1">
                  <h4 style={{display:'flex', justifyContent:'center', marginTop:-15}}>TOP SELL</h4>
                    <div style={{display:'flex', flexDirection:'column', alignItems:''}}>
                      <Row>
                        <Col style={{margin:5}} md={24} sm={7}>
                        <Panel  bordered >
                          <Paragraph />
                        </Panel>
                        </Col>
                        <Col style={{margin:5}} md={24} sm={7}>
                        <Panel bordered >
                          <Paragraph />
                        </Panel>
                        </Col>
                        <Col style={{margin:5}} md={24} sm={7}>
                        <Panel  bordered >
                          <Paragraph />
                        </Panel>
                        </Col>
                      </Row>
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
