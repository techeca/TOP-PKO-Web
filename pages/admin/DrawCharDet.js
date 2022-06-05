import {react, useState} from 'react'
import { Drawer, Button, Container, Panel, PanelGroup, Input, Toggle, InputNumber, SelectPicker } from 'rsuite'
import { jobs, bags } from '../utilData.js'
import GearIcon from '@rsuite/icons/Gear';

export default function DrawCharDet({openDraw, charSelected, handleCloseDrawAcc}){
  console.log(charSelected)
  return(
    <Container>
    <Drawer open={openDraw} onClose={handleCloseDrawAcc}>
      <Drawer.Body>

      </Drawer.Body>
    </Drawer>

    <Drawer style={{display:'flex', flexWrap:'wrap'}} open={openDraw} onClose={handleCloseDrawAcc}>
      <Drawer.Header>
        <Drawer.Title>{<h3 style={{marginTop:10}}>{charSelected.cha_name} <span style={{color:'lightblue'}}>{charSelected.motto}</span></h3>}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleCloseDrawAcc} appearance='primary' color='red'>BAN</Button>
          <Button onClick={handleCloseDrawAcc} appearance="primary">Confirm</Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body >
        <PanelGroup style={{margin:-15}}>
          <Panel header={<h4>Details</h4>}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>ID</p><Input disabled value={charSelected ? charSelected.cha_id : '' } style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Name</p><Input value={charSelected ? charSelected.cha_name : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Level</p><InputNumber max={150} min={0} value={charSelected ? charSelected.degree : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Exp</p><InputNumber max={10000000} min={0} type='number' value={charSelected.exp ? charSelected.exp : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Money</p><InputNumber prefix="$" max={1000000000} min={0} value={charSelected ? charSelected.gd : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Reputation</p><InputNumber max={1000000} min={0} value={charSelected ? charSelected.credit : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Class</p><SelectPicker data={jobs} defaultValue={charSelected.job ? charSelected.job : 'none'} searchable={false} style={{ width: 224 }} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Bag Capacity</p><SelectPicker data={bags} defaultValue={charSelected ? charSelected.kb_capacity : 'none'} searchable={false} style={{ width: 224 }} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Guild</p><Input disabled value={charSelected.guild_id ? charSelected.guild_id : ''} style={{width:'50%'}} /></div>
          {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Crystals</p><Input value={tradedet[0] ? tradedet[0].Money : '0' } style={{width:'50%'}} /></div>*/}
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Ban</p><Toggle checked={charSelected.ban ? true : false} size="lg" /></div>
          </Panel>
          <Panel header={<h4>Stats</h4>}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>HP</p><InputNumber min={0} value={charSelected ? charSelected.hp : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>SP</p><InputNumber min={0} value={charSelected ? charSelected.sp : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>STR</p><InputNumber max={300} min={0} value={charSelected ? charSelected.str : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>DEX</p><InputNumber max={300} min={0} value={charSelected ? charSelected.dex : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>AGI</p><InputNumber max={300} min={0} value={charSelected ? charSelected.agi : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>CON</p><InputNumber max={300} min={0} value={charSelected ? charSelected.con : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>STA</p><InputNumber min={0} value={charSelected ? charSelected.sta : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>LUK</p><InputNumber min={0} value={charSelected ? charSelected.luk : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Stats Points</p><InputNumber min={0} value={charSelected ? charSelected.ap : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Skill Points</p><InputNumber min={0} value={charSelected ? charSelected.tp : ''} style={{width:'50%'}} /></div>
          </Panel>
          <Panel header={<h4>Sail & Live details</h4>}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Sail Level</p><InputNumber max={100} min={0} value={charSelected ? charSelected.sail_lv : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Sail Exp</p><InputNumber max={1000000000} min={0} value={charSelected ? charSelected.sail_exp : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Live Level</p><InputNumber max={1000000000000} min={0} value={charSelected ? charSelected.live_lv : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Live Exp</p><InputNumber max={300} min={0} value={charSelected ? charSelected.live_exp : ''} style={{width:'50%'}} /></div>
          </Panel>
          <Panel header={<h4>Map</h4>}>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Actual Map</p><InputNumber max={100} min={0} value={charSelected ? charSelected.sail_lv : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Max X</p><InputNumber max={1000000000} min={0} value={charSelected ? charSelected.sail_exp : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Map Y</p><InputNumber max={1000000000000} min={0} value={charSelected ? charSelected.live_lv : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Birth Map</p><Input value={charSelected ? charSelected.birth: ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:5}}><p style={{margin:5}}>Main Map</p><Input value={charSelected ? charSelected.main_map : ''} style={{width:'50%'}} /></div>
          </Panel>
        </PanelGroup>
      </Drawer.Body>
    </Drawer>
    </Container>
  )
}
