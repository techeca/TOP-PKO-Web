import { React, useState } from 'react'
import { FlexboxGrid, Col, Content, Panel, Badge, Divider, Animation, Container, Progress } from 'rsuite'
import Image from 'next/image'
import LogoTest from '../../styles/swordmanlogosimple.png'
import Lance from '../../styles/lance_newbie.png'
//import LogoTest from '../../styles/swordmanLogo.png'
//import Carsise from '../styles/carsise'
//import Phyllips from '../styles/phyllips'
//import Amy from '../styles/amy'

export default function Character({cData}){
  const [chatDet, setChatDet] = useState(cData[0])
  const imgUrl = 'https://antimonarchical-ram.000webhostapp.com/top/monsters/'
  console.log(chatDet)

  const myLoader = ({ src, width, quality }) => {
  return `${imgUrl}${src}?w=${width}&q=${quality || 75}`
  }

  function LineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }

  function LineDataWithPoint(nomdato, dato, color){
    return(
      <div style={{flexWrap:'wrap'}}>
      <div style={{display:'flex'}}>
        <div style={{display:'flex', marginBottom:-12, marginTop:12}}>
        <Badge color={color}></Badge>
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'space-between',alignItems:'flex-end', marginLeft:20, marginTop:-10}}>

      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
      </div>
    )
  }

  return(
    <>
    {!chatDet ? <>Loading...</> : <>
    <Content>
    <Animation.Bounce in={true}>
      <FlexboxGrid justify={'space-around'}>
      <FlexboxGrid.Item colspan={24}>
    <Panel id='backImgCharacter'>
      <h2 style={{color:'white', paddingLeft:20, textShadow:'0px 0px 6px black'}}>Character Details - <span style={{color:'orange'}}>{chatDet.cha_name}</span> <span style={{color:'red'}}>Lv{chatDet.degree}</span></h2>
    </Panel>

    <FlexboxGrid justify="space-around" style={{margin:30}}>
      <FlexboxGrid.Item as={Col} colspan={24} lg={8} md={8}>
      <Panel style={{display:'flex', justifyContent:'center', marginTop:10}} bordered>
        <h4 style={{display:'flex', justifyContent:'center', marginBottom:-15}}>{chatDet.cha_name}</h4>
        <Divider style={{marginBottom:10}} />
        <Panel style={{display:'flex', margin:-15}}>
          <Image style={{borderRadius: 3}} loader={myLoader} src={chatDet.icon+'.jpg'} width={150} height={200} />
        </Panel>
        <Divider style={{marginTop:10}} />
        <Panel style={{marginTop:-30}}>
        <h4 style={{display:'flex', justifyContent:'center', color:'orange'}}>{chatDet.job}</h4>

        </Panel>
      </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} lg={7} md={8}>

      <Panel style={{marginTop:10}} collapsible header=<h4 style={{color:'orange'}}>Stats</h4> bordered>

        {LineData('Level', chatDet.degree)}
        {LineData('HP', chatDet.hp)}
        {LineData('SP', chatDet.sp)}

        {LineDataWithPoint('Strength', chatDet.str, 'red')}
        {LineDataWithPoint('Dextery', chatDet.dex, 'blue')}
        {LineDataWithPoint('Agility', chatDet.agi, 'green')}
        {LineDataWithPoint('Constitution', chatDet.con, 'yellow')}
        {LineData('Exp', chatDet.exp)}
        {LineData('Stamina', chatDet.sta)}
        {LineData('Luck', chatDet.luk)}
        {LineData('Stat Points', chatDet.ap)}
        {LineData('Skill Points', chatDet.tp)}

      </Panel>

      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} lg={6} md={8}>
      <Panel style={{marginBottom:10, marginTop:10}} header=<h4 style={{color:'orange'}}>Details</h4> collapsible bordered>
        {LineData('Gold', chatDet.gd)}
        {LineData('Reputation', chatDet.credit)}
        {LineData('Bag Capacity', chatDet.kb_capacity)}
        {/*LineData('Map', chatDet.map.toUpperCase())*/}
        {LineData('Birth Map', chatDet.birth)}
      </Panel>
        <Panel style={{}} header=<h4 style={{color:'orange'}}>Skill Live & Sail</h4> collapsible bordered>
          {LineData('Sail Lv', chatDet.sail_lv)}
          {LineData('Sail Exp', chatDet.sail_exp)}
          {LineData('Live Lv', chatDet.live_lv)}
          {LineData('Live Exp', chatDet.live_exp)}
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>

    </FlexboxGrid.Item>
    </FlexboxGrid>
    </Animation.Bounce>
    </Content>
    </>
  }
  </>
  )
}
