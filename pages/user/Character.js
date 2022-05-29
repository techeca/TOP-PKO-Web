import { React } from 'react'
import { FlexboxGrid, Col, Content, Panel, Badge, Divider  } from 'rsuite'
import Image from 'next/image'
import LogoTest from '../../styles/swordmanlogosimple.png'
import Lance from '../../styles/lance_newbie.png'
//import LogoTest from '../../styles/swordmanLogo.png'
//import Carsise from '../styles/carsise'
//import Phyllips from '../styles/phyllips'
//import Amy from '../styles/amy'

export default function Character({cData}){
  const chatDet = cData[0]
  //console.log(cData)

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
    <Content>
    <Panel id='backImgCharacter'>
      <h2 style={{color:'white', paddingLeft:20, textShadow:'0px 0px 6px black'}}>Character details - <span style={{color:'yellow'}}>{chatDet.cha_name}</span> <span style={{color:'red'}}>Lv{chatDet.degree}</span></h2>
    </Panel>

    <FlexboxGrid justify="space-around" style={{margin:50}}>
      <FlexboxGrid.Item as={Col} colspan={24} lg={8} md={8}>
      <Panel bordered>
        <Panel style={{display:'flex', justifyContent:'center', margin:-15}}>
          <Image style={{borderRadius: 3}} src={Lance} responsive />
        </Panel>
        <Divider />
        <Panel style={{margin:-10}}>
        <h4 style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', color:'orange'}}>{chatDet.cha_name}<h6 style={{color:'white'}}>Lv<span style={{color:'red', margin:5, paddingTop:5}}>{chatDet.degree}</span></h6></h4>

        {LineData('Class', chatDet.job)}
        <>

        <span><Image src={LogoTest} width='50%' height='50%' responsive /></span>
        </>

        </Panel>
      </Panel>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} lg={7} md={8}>

      <Panel style={{}} collapsible header=<h4 style={{color:'orange'}}>Stats</h4> bordered>


        {LineData('HP', chatDet.hp)}
        {LineData('SP', chatDet.sp)}
        {LineData('Stamina', chatDet.sta)}


        {LineDataWithPoint('Strength', chatDet.str, 'red')}
        {LineDataWithPoint('Dextery', chatDet.dex, 'blue')}
        {LineDataWithPoint('Agility', chatDet.agi, 'green')}
        {LineDataWithPoint('Constitution', chatDet.con, 'yellow')}
        {LineData('Exp', chatDet.exp)}
        {LineData('Luck', chatDet.luk)}

        {LineData('AP?', chatDet.ap)}
        {LineData('TP?', chatDet.tp)}

      </Panel>

      </FlexboxGrid.Item>
      <FlexboxGrid.Item as={Col} colspan={24} lg={6} md={8}>
      <Panel style={{marginBottom:20}} header=<h4 style={{color:'orange'}}>Details</h4> collapsible bordered>
        {LineData('Gold', chatDet.gd)}
        {LineData('Credit?', chatDet.credit)}
        {LineData('Bag Capacity', chatDet.kb_capacity)}
        {LineData('Map', chatDet.map.toUpperCase())}
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
    </Content>
  )
}
