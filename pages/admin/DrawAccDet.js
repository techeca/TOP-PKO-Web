import {react, useState} from 'react'
import { Drawer, Button, Container, Panel, PanelGroup, Input, Toggle } from 'rsuite'

export default function DrawAccDet({openDraw, accSelected, handleCloseDrawAcc, tradedet}){
  //const [aD, setAD] = useState(accSelected)

  //console.log(accSelected)

  return(
    <Container>
    <Drawer open={openDraw} onClose={handleCloseDrawAcc}>
      <Drawer.Body>

      </Drawer.Body>
    </Drawer>

    <Drawer open={openDraw} onClose={handleCloseDrawAcc}>
      <Drawer.Header>
        <Drawer.Title>{accSelected.name}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={handleCloseDrawAcc} appearance='primary' color='red'>BAN</Button>
          <Button onClick={handleCloseDrawAcc} appearance="primary">Confirm</Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body style={{margin:-20}}>
        <PanelGroup>
          <Panel header="Details">
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>ID</p><Input disabled value={accSelected ? accSelected.id : '' } style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Name</p><Input value={accSelected ? accSelected.name : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Password</p><Input type='password' value={accSelected ? accSelected.password : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Email</p><Input value={accSelected.email ? accSelected.email : ''} style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Crystals</p><Input value={tradedet[0] ? tradedet[0].Money : '0' } style={{width:'50%'}} /></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Ban</p><Toggle checked={accSelected.ban ? true : false} size="lg" /></div>
          </Panel>
          <Panel header="Logs">
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Last Login IP</p><p>{accSelected.last_login_ip}</p></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Last MAC</p><p>{accSelected.last_login_mac}</p></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Last Login Time</p><p>{accSelected.last_login_time}</p></div>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Status</p><p><strong>{accSelected.login_status == 0 ? <span style={{color:'red'}}>OFFLINE</span> : <span style={{color:'green'}}>ONLINE</span>}</strong></p></div>
          </Panel>
        </PanelGroup>
      </Drawer.Body>
    </Drawer>
    </Container>
  )
}
