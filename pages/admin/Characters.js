import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup, Animation, Button, Input, Divider, Pagination, IconButton } from 'rsuite'
import Image from 'next/image'
import AboutImg from '../../styles/aboutimg.png'
import TechecaLogo from '../../styles/techeca.png'
import DrawCharDet from './DrawCharDet.js'
import GearIcon from '@rsuite/icons/Gear';

export default function Accounts(){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [charData, setCharData] = useState('');
  const [charSelected, setCharSelected] = useState('')
  const [openDraw, setOpenDraw] = useState(false);
  const [activePage, setActivePage] = useState(1);
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

  function handleDrawChar(x){
    setOpenDraw(true)
    setCharSelected(x)
  }

  function handleCloseDrawChar(){
    setOpenDraw(false)
    setCharSelected('')
  }

  function paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }

  function handleShowDraw(x){
    //const tradedet = accData ? accData.tradeDetails[0].filter((x) => x.accName == accSelected.name) : ''
    //accData.tradeDetails[0].map((x) => console.log(x))
    //console.log(tradedet)
    return(
      <DrawCharDet openDraw={x} charSelected={charSelected} handleCloseDrawAcc={handleCloseDrawChar} />
    )
  }

  useEffect(() => {
    //Obtiene los datos guardados al iniciar cuenta
    const usrtmp = localStorage.getItem('user')
    if(userService.userValue){
      //setUser(usrtmp)
      userService.admCharacterst().then((x) => setCharData(x))
    }
  }, [])

  //console.log(charData)

  return(
    <>
    {charData ?
      <Container style={{margin:30, maxHeight:'100vh'}}>
      <Animation.Bounce in={true}>
      <FlexboxGrid justify={'center'}>
        <FlexboxGrid.Item as={Col} colspan={24} md={20}>
        {/*Accounts pane *admin*/}
        <h2 style={{textAlign:'left'}}>Characters</h2>
        <div>
        </div>

              <Panel bordered style={{justifyContent:'center'}}>
                {/*<Image layout="responsive" src={AboutImg} />*/}
                <div style={{display:'flex', width:'60%', margin:10}}>
                <h6 style={{width:'20%', marginTop:5, marginRight:15}}>Search character</h6>
                  <Input placeholder="name" />
                  <Button style={{width:'20%', marginLeft:30}} >Find</Button>
                </div>

                  {/*Tabla de usuarios*/}
                <Panel bordered style={{margin:30, borderRadius:0, marginTop:60}}>
                <div style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                  <h6 style={{width:'15%'}}>ID Character</h6>
                  <h6 style={{width:'25%'}}>Name</h6>
                  <h6 style={{width:'20%'}}>Class</h6>
                  <h6 style={{width:'20%'}}>Level</h6>
                  <h6 style={{width:'10%'}}></h6>
                </div>
                <Divider />

                <Panel style={{margin:-21, marginTop:-30}}>
                {paginate(charData[0], 10, activePage).map((x) =>
                  <div key={x.cha_id} style={{display:'flex', justifyContent:'space-between', textAlign:'center', marginTop:10}}>
                    <p style={{width:'15%', marginTop:10}}>{x.cha_id}</p>
                    <p style={{width:'20%', marginTop:10}}>{x.cha_name}</p>
                    <p style={{width:'15%'}}>{x.job}</p>
                    <p style={{width:'20%'}}>{x.degree}</p>
                    <IconButton color='yellow' appearance='primary' onClick={() => handleDrawChar(x)} icon={<GearIcon />} />
                  {/*<Button appearance='primary' color='yellow' onClick={() => handleDrawChar(x)}>Edit</Button>*/}
                  </div>
                )}

                </Panel>

                </Panel>

                <Pagination style={{justifyContent:'center'}} total={charData[0].length} limit={10} activePage={activePage} onChangePage={setActivePage} />

              </Panel>

          </FlexboxGrid.Item>

      </FlexboxGrid>
      </Animation.Bounce>
      </Container>
      :
      <>Loading...</>
     }
     {handleShowDraw(openDraw)}
    </>
  )
}
