import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { userService } from '@services/index'
import { Navbar, Nav, FlexboxGrid, Col, Sidenav, Dropdown, Container, Sidebar, Content, Panel, PanelGroup, Animation, Button, Input, Divider, Pagination, IconButton, toaster } from 'rsuite'
import PlusIcon from '@rsuite/icons/Plus';
import TrashIcon from '@rsuite/icons/Trash';
import Image from 'next/image'
import AboutImg from '../../styles/aboutimg.png'
import TechecaLogo from '../../styles/techeca.png'
import DrawPackDet from './DrawPackDet.js'
import GearIcon from '@rsuite/icons/Gear'
import { showNotification } from '../utilContext.js'
import { ModalQuestion, ModalAddCategorie, ModalAddItemInCat, ModalAddPack } from '../ModalsAdd.js'

export default function Mall(){
  const router = useRouter()
  const [mallData, setMallData] = useState('');
  const [openDraw, setOpenDraw] = useState(false);
  const [openModalCat, setOpenModalCat] = useState(false)
  const [openModalPack, setOpenModalPack] = useState(false)
  const [openModalItemInCat, setOpenModalItemInCat] = useState(false)
  const [categorieSelected, setCategorieSelected] = useState('')
  const [packSelected, setPackSelected] = useState('')
  const [activePage, setActivePage] = useState('');
  const imgUrl = 'https://antimonarchical-ram.000webhostapp.com/top/icons/'

  const myLoader = ({ src, width, quality }) => {
  return `${imgUrl}${src}?w=${width}&q=${quality || 75}`
  }
  //const [user, setUser] = useState({uData});
  //const [userProfile, setUserProfile] = useState({name:'', gmLevel:'', password:'', lastLoginIp:'', lastLoginTime:''})
  //const userData = JSON.parse(uData)
  //console.log(mallData)

  function lineData(nomdato, dato){
    return(
      <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:3}}>
      <p><strong>{nomdato}</strong>:</p><p style={{}}>{dato}</p>
      </div>
    )
  }
  function updateMallData(){
    userService.admMall().then((x) => setMallData(x))
  }

  function handleModal(typeModal, m){
    console.log(typeModal)

    console.log(typeModal)
    if(typeModal == 'newCat'){
      //setCategorieSelected(m)
      setOpenModalCat(true)
    }else if (typeModal == 'itemInPack') {
      //console.log('item pack')
      setPackSelected(m)
      setOpenModalItemInCat(true)
    }else if (typeModal == 'newPack') {
      setCategorieSelected(m)
      setOpenModalPack(true)
    }
  }

  function handleShowModalNewItemInCat(openModalItemInCat){

    return (
      <ModalAddItemInCat handleCloseModal={handleCloseModal} openModalItemInCat={openModalItemInCat} packSelected={packSelected} updateMallData={updateMallData} />
    )
  }
  function handleShowModalNewCat(openModalItemInCat){
    //console.log(mallData.categories)
    const categoriesName = mallData ? mallData.categories.map((c) => ({label:c.clsName, value:c.clsID})) : ''
    return (
      <ModalAddCategorie handleCloseModal={handleCloseModal} openModalCat={openModalCat} updateMallData={updateMallData} categoriesName={categoriesName} />
    )
  }
  function handleShowModalNewPack(openModalPack){
    //console.log(mallData.categories)
    const categoriesName = mallData ? mallData.categories.map((c) => ({label:c.clsName, value:c.clsID})) : ''
    return (
      <ModalAddPack handleCloseModal={handleCloseModal} openModalPack={openModalPack} updateMallData={updateMallData} categoriesName={categoriesName} categorieSelected={categorieSelected}/>
    )
  }

  function handleCloseModal(){
    setOpenModalCat(false)
    setOpenModalItemInCat(false)
    setOpenModalPack(false)
  }

  function handleShowDraw(openDraw){
    const itemsData = packSelected ? mallData.items.filter((x) => x.comID == packSelected.comID) : ''
    const categoriesName = packSelected ? mallData.categories.map((c) => ({label:c.clsName, value:c.clsID})) : ''

    //const itemsDB = packSelected ? userService.itemsDet().then((x) => x.itemsDetails.filter((df) => df.item_id == '1')) : false
    //accData.tradeDetails[0].map((x) => console.log(x))
    //console.log(packSelected)

    return(
      <DrawPackDet openDraw={openDraw} packSelected={packSelected} itemsData={itemsData} handleCloseDrawPack={handleCloseDrawPack} handleModal={handleModal} updateMallData={updateMallData} categoriesName={categoriesName} />
    )
  }
  function handleDrawPack(x){
    setPackSelected(x)
    setOpenDraw(true)
  }
  function handleCloseDrawPack(){
    setOpenDraw(false)
    setPackSelected('')
  }

  function handleDeleteCat(c){
    console.log(c)
    return userService.addItemToPackage({clsID:c.clsID}, 'delCat')
           .then((r) => {
             //console.log()
             //setNewCategorie({clsID:''})
             toaster.push(showNotification(`Done`, 'success', 'Categorie deleted'), 'bottomEnd')
             updateMallData()
             //handleCloseModal()
           })
           .catch(error => {
             //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
             console.log(error)
           })
  }
  function handleDeletePack(p){
    console.log(p)
    return userService.addItemToPackage({comID:p.comID}, 'delPack')
           .then((r) => {
             //console.log()
             //setNewCategorie({clsID:''})
             toaster.push(showNotification(`Done`, 'success', 'Package deleted'), 'bottomEnd')
             updateMallData()
             //handleCloseModal()
           })
           .catch(error => {
             //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
             console.log(error)
           })
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
      let tempDetailsItems = ''
      let tempMaster = ''
      userService.admMall().then((x) => setMallData(x))
    }
  }, [])
  //console.log(mallData ? mallData.items.map((i) => i.itemID) : '')
  //console.log(mallData)

  return(
    <>
    {mallData.categories ?
      <Container style={{margin:30}}>
      <Animation.Bounce in={true}>
      <FlexboxGrid justify={'center'}>
        <FlexboxGrid.Item as={Col} colspan={24} md={20}>
        {/*Accounts pane *admin*/}
        <h2 style={{textAlign:'left'}}>Mall</h2>
        <div>
        </div>
              <Panel bordered style={{justifyContent:'center', marginTop:20}}>
                {/*<Image layout="responsive" src={AboutImg} />*/}
                {/*<div style={{display:'flex', width:'60%', margin:10}}>
                <h6 style={{width:'20%', marginTop:5, marginRight:15}}>Search user</h6>
                  <Input placeholder="account name" />
                  <Button style={{width:'20%', marginLeft:30}} >Find</Button>
                </div>*/}
                <div style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                  <h6 style={{width:'5%'}}>Cat.</h6>
                  <h6 style={{width:'0%'}}>ID</h6>
                  <h6 style={{width:'25%'}}>Name</h6>
                  <h6 style={{width:'40%'}}>Descripcion</h6>
                  <h6 style={{width:'10%'}}>Price</h6>
                  <div style={{width:'30%'}}>
                  <Button onClick={() => handleModal('newCat')} appearance='primary' color='green'  >New Categorie</Button>

                    {/*<Button appearance='primary' color='red' style={{marginLeft:5, margin:0}}>-</Button>*/}
                  </div>
                </div>
                <Divider />

                <PanelGroup accordion bordered style={{ marginBottom:10, borderRadius:0}}>
                  {mallData ? mallData.categories.map((c) =>
                    <Panel key={c.clsID} header={<div style={{justifyContent:'space-between', display:'flex'}}><strong>{c.clsName}</strong>
                    <div>
                    <Button style={{marginRight:10}} onClick={() => handleModal('newPack', c)} appearance='primary' color='green'  >Add Pack</Button>
                    <IconButton onClick={() => handleDeleteCat(c)} appearance='primary' color='red'  icon={<TrashIcon />}/></div></div>}>
                    {/*<div style={{display:'flex', justifyContent:'flex-end', margin:10}}>
                    <Button onClick={() => handleModal('newPack')} appearance='primary' color='green'  >New Pack</Button>
                    </div>*/}
                      {mallData.package.filter((p) => c.clsID == p.comClass).map((np) =>

                        <div key={np.comID} style={{display:'flex', justifyContent:'space-between', textAlign:'center', marginTop:10}}>
                          <p style={{width:'5%', marginTop:10}}>{np.comID}</p>
                          <p style={{width:'20%', marginTop:10}}>{np.comName}</p>
                          <p style={{width:'40%'}}>{np.comRemack}</p>
                          <p style={{width:'10%'}}>{np.comPrice}</p>
                          <div style={{width:'20%'}}>
                            <IconButton onClick={() => handleDrawPack(np)} color='yellow' appearance='primary' icon={<GearIcon />} />
                            <IconButton style={{marginLeft:9}} onClick={() => handleDeletePack(np)} color='red' appearance='primary' icon={<TrashIcon />} />
                            {/*<Button appearance='primary' color='red' style={{marginLeft:5, margin:3}}>Delete</Button>*/}
                          </div>
                        </div>
                        )}
                    </Panel>

                  ):
                  <>Loading ...</>}

                </PanelGroup>

              </Panel>

          </FlexboxGrid.Item>

      </FlexboxGrid>

      </Animation.Bounce>
      </Container>
      :
      <>Loading...</>
     }
     {handleShowDraw(openDraw)}
     {handleShowModalNewItemInCat(openModalItemInCat)}
     {handleShowModalNewCat(openModalItemInCat)}
     {handleShowModalNewPack(openModalPack)}
    </>

  )
}
