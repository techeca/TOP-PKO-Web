import { React } from 'react'
import styles from '../../styles/Home.module.css'
import { Panel, Container, Animation, FlexboxGrid } from 'rsuite'
import BackDash from '../../styles/backDash.jpg'
import Image from 'next/image'

export default function Dashboard(){

  return(
    <Animation.Bounce in={true}>
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24}>
      {/*Login form*/}
            <Panel id='backImgDash'>
              <h2 style={{color:'white', padding:20, textShadow:'0px 0px 6px black'}}>Welcome to your Dashboard</h2>
            </Panel>
            <Panel id='' bordered style={{height:'38vh', margin:20}} header={'Your Dash'}>
              data.....
            </Panel>
        </FlexboxGrid.Item>
    </FlexboxGrid>
    </Animation.Bounce>

  )
}
