import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup, Animation, Button, Input, Divider, Pagination, IconButton } from 'rsuite'
import Image from 'next/image'
import AboutImg from '../../styles/aboutimg.png'
import TechecaLogo from '../../styles/techeca.png'
import DrawAccDet from './DrawAccDet.js'
import TrashIcon from '@rsuite/icons/Trash';
import GearIcon from '@rsuite/icons/Gear';

export default function Accounts(){
  const router = useRouter()
  const [pageSelected, setPageSelected] = useState('');
  const [accData, setAccData] = useState('');
  const [openDraw, setOpenDraw] = useState(false);
  const [accSelected, setAccSelected] = useState('')
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

  function handleDrawAcc(x){
    setOpenDraw(true)
    setAccSelected(x)
  }

  function handleCloseDrawAcc(){
    setOpenDraw(false)
    setAccSelected('')
  }

  function handleShowDraw(openDraw){
    const tradedet = accData ? accData.tradeDetails[0].filter((x) => x.accName == accSelected.name) : ''
    //accData.tradeDetails[0].map((x) => console.log(x))
    //console.log(tradedet)
    return(
      <DrawAccDet openDraw={openDraw} accSelected={accSelected} tradedet={tradedet} handleCloseDrawAcc={handleCloseDrawAcc} />
    )
  }

  //Paginación
  function paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }

  useEffect(() => {
    //Obtiene los datos guardados al iniciar cuenta
    const usrtmp = localStorage.getItem('user')
    if(userService.userValue){
      //setUser(usrtmp)
      userService.admAccount().then((x) => setAccData(x))
    }
  }, [])

  //console.log(accData.accDetails[0].length)

  return(
    <>
    {accData.accDetails ?
      <Container style={{margin:30}}>
      <Animation.Bounce in={true}>
      <FlexboxGrid justify={'center'}>
        <FlexboxGrid.Item as={Col} colspan={24} md={20}>
        {/*Accounts pane *admin*/}
        <h2 style={{textAlign:'left'}}>Accounts</h2>
        <div>
        </div>

              <Panel bordered style={{justifyContent:'center', marginTop:20}}>
                {/*<Image layout="responsive" src={AboutImg} />*/}
                <div style={{display:'flex', width:'60%', margin:10}}>
                <h6 style={{width:'20%', marginTop:5, marginRight:15}}>Search user</h6>
                  <Input placeholder="account name" />
                  <Button style={{width:'20%', marginLeft:30}} >Find</Button>
                </div>

                  {/*Tabla de usuarios*/}
                <Panel bordered style={{margin:30, borderRadius:0, marginTop:40}}>
                  <div style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                    <h6 style={{width:'15%'}}>ID Account</h6>
                    <h6 style={{width:'25%'}}>Name User</h6>
                    <h6 style={{width:'25%'}}>Email</h6>
                    <h6 style={{width:'25%'}}>IP</h6>
                    <h6 style={{width:'10%'}}></h6>
                  </div>
                  <Divider />

                  <Panel style={{margin:-21}}>
                  {paginate(accData.accDetails[0], 10, activePage).map((x) =>
                    <div key={x.id} style={{display:'flex', justifyContent:'space-between', textAlign:'center', marginTop:10}}>
                      <p  style={{width:'15%', marginTop:10}}>{x.id}</p>
                      <p style={{width:'25%', marginTop:10}}>{x.name}</p>
                      <p style={{width:'25%'}}>{x.email}</p>
                      <p style={{width:'30%'}}>{x.last_login_ip}</p>
                      <IconButton color='yellow' appearance='primary' onClick={() => handleDrawAcc(x)} icon={<GearIcon />} />
                    { /*<Button appearance='primary' color='yellow' onClick={() => handleDrawAcc(x)}>Edit</Button>*/}
                    </div>
                   )}
                  </Panel>

                </Panel>

                <Pagination style={{justifyContent:'center'}} total={accData.accDetails[0].length} limit={10} activePage={activePage} onChangePage={setActivePage} />

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
