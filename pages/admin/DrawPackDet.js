import {react, useState, forwardRef} from 'react'
import { Drawer, Button, Container, Panel, PanelGroup, Input, Toggle, IconButton, Divider, toaster, Schema, Form, SelectPicker } from 'rsuite'
const { StringType, NumberType } = Schema.Types;
import TrashIcon from '@rsuite/icons/Trash';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import Image from 'next/image'
import { ModalAddCategorie } from '../ModalsAdd.js'
import { userService } from '@services/index'
import { showNotification } from '../utilContext.js'

export default function DrawPackDet({openDraw, packSelected, handleCloseDrawPack, itemsData, handleModal, updateMallData, categoriesName}){
  const [packageEdit, setPackageEdit] = useState({comID:packSelected.comID, comName:packSelected.comName, comRemack:packSelected.comRemack, comPrice:packSelected.comPrice, comClass:packSelected.comClass, isHot:packSelected.isHot})
  const [packageForm, setPackageForm] = useState({comID:packSelected.comID, comName:packSelected.comName, comRemack:packSelected.comRemack, comPrice:packSelected.comPrice, comClass:packSelected.comClass, isHot:packSelected.isHot})
  //const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);
  //const cats = {label:mallData., value:''}
  //console.log(categoriesName)
  const imgUrl = 'https://antimonarchical-ram.000webhostapp.com/top/icons/'
  const myLoader = ({ src, width, quality }) => {
  return `${imgUrl}${src}?w=${width}&q=${quality || 80}`}
  //const [openModal, setOpenModal] = useState(false)
  const model = Schema.Model({
    comName: StringType().isRequired('Name is required'),
    comRemack: StringType().isRequired('Description is required'),
    comPrice: NumberType().isRequired('Price is required'),
    comClass: NumberType().isRequired('Categorie is required')
    //isHot: NumberType()
  })

  const handleDeleteItem = async (e) => {
      //const tempNew = {...newItemInPackage, packageID:packSelected.clsID}
      return userService.addItemToPackage({itemID:e.itemID, packageID:packSelected.comID}, 'delete')
             .then((r) => {
               //console.log()
               //setNewItemInPackage({itemID:e.itemID, packageID:packSelected.comID})
               toaster.push(showNotification(`Done`, 'success', 'Item deleted'), 'bottomEnd')
               updateMallData()
               //handleCloseDrawPack()
               //router.push('/user/Login')
             })
             .catch(error => {
               //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
               console.log(error)
             })
      }
  const handleSubmit = async (e) => {
        e.preventDefault()

          const tempNew = {comID:packSelected.comID , comName:packageForm.comName ? packageForm.comName : packSelected.comName, comRemack:packageForm.comRemack ? packageForm.comRemack : packSelected.comRemack, comPrice:packageForm.comPrice ? packageForm.comPrice : packSelected.comPrice, comClass:packSelected.comClass, isHot:packageForm.isHot ? packageForm.isHot : packSelected.isHot}
          console.log(tempNew)
          return userService.addItemToPackage(tempNew, 'updatePackage')
                 .then((r) => {
                   //console.log()
                   //setPackageForm({comID:packSelected.comID, comName:packSelected.comName, comRemack:packSelected.comRemack, comPrice:packSelected.comPrice, comClass:packSelected.comClass, isHot:packSelected.isHot})
                   toaster.push(showNotification(`Done`, 'success', 'Package updated'), 'bottomEnd')
                   updateMallData()
                   //handleCloseDrawPack()
                 })
                 .catch(error => {
                   //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
                   console.log(error)
                 })
          }
  //console.log(packSelected)
  const handleClose = () => {
    //updateMallData()
    //setPackageEdit('')
    handleCloseDrawPack()
  }

  return(
    <>
    {packSelected ?
      <Container>
      <Drawer backdrop={'static'}  open={openDraw} onClose={handleClose}>
        <Drawer.Header>
          <Drawer.Title>{packSelected.comName}</Drawer.Title>
          <Drawer.Actions>
            {/*<IconButton onClick={() => handleModal('itemInPack')} appearance='primary' color='green' icon={<PlusIcon />} />*/}
            <Button onClick={() => handleModal('itemInPack')} appearance='primary' color='green'>New Item</Button>
            {/*<IconButton color='red' appearance='primary' icon={<TrashIcon />} />*/}

          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body style={{margin:0}}>
          <PanelGroup>
            <Panel style={{margin:-20}} header={<h5>Package Details</h5>}>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>ID</p><Input disabled value={packSelected.comID} style={{width:'50%'}} /></div>

        <Form fluid onChange={setPackageForm} formValue={packageForm} model={model}>

              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <p style={{margin:10}}>Name</p>
              <Form.Group style={{width:'50%'}} controlId='comName'>
                {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                <Form.Control defaultValue={packSelected.comName} name="comName" />
              </Form.Group></div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <p style={{margin:10}}>Description</p>
              <Form.Group style={{width:'50%', display:'flex'}} controlId='comRemack'>
                {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                {/*<Form.Control defaultValue={packSelected.comRemack} rows={3} accepter={Textarea} name="comRemack" />*/}
                <Form.Control defaultValue={packSelected.comRemack} name="comRemack" />
              </Form.Group></div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <p style={{margin:10}}>Categorie</p>
              <Form.Group style={{width:'50%'}} controlId='comClass'>
                {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                <Form.Control defaultValue={packSelected.comClass} data={categoriesName} accepter={SelectPicker} searchable={false} name="comClass" />
              </Form.Group></div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <p style={{margin:10}}>Price</p>
              <Form.Group style={{width:'50%'}} controlId='comPrice'>
                {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                <Form.Control defaultValue={parseInt(packSelected.comPrice)} name="comPrice" />
              </Form.Group></div>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <p style={{margin:10}}>Is HOT</p>
              <Form.Group style={{width:'50%'}} controlId='isHot'>
                {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                <Form.Control checked={packSelected.isHot == 1} accepter={Toggle} name="isHot" />
              </Form.Group></div>
              {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Crystals</p><Input value={tradedet[0] ? tradedet[0].Money : '0' } style={{width:'50%'}} /></div>*/}
              <div style={{display:'flex', justifyContent:'flex-end', margin:15}}>
                <Button onClick={handleSubmit} type='submit' color='green' appearance="primary">Save</Button>
              </div>

            {/*<h6 style={{textAlign:'center', marginTop:30}}>Attributes</h6>*/}
            </Form>

            </Panel>
            <Panel style={{marginTop:20, margin:-20}} header={<h5 style={{ marginTop:15}}>Package Details</h5>}>

              <Panel bordered style={{justifyContent:'center', marginTop:10}}>
                {/*<Image layout="responsive" src={AboutImg} />*/}

                  {/*Tabla de usuarios*/}
                  <Panel style={{margin:10, borderRadius:0, marginTop:0}}>
                  <div style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                    <h6 style={{width:'5%'}}>ID</h6>
                    <h6 style={{width:'20%'}}></h6>
                    <h6 style={{width:'20%'}}>Name</h6>
                    <h6 style={{width:'40%'}}>Quantity</h6>
                    <h6 style={{width:'20%'}}></h6>
                  </div>
                    <Divider />

                    <Panel style={{margin:-30, marginTop:-30}}>
                    {itemsData.map((x) =>
                      <div key={x.cha_id} style={{display:'flex', justifyContent:'space-between', textAlign:'center', marginTop:10}}>
                        <p style={{marginTop:10}}>{x.item_id}</p>
                        <Image layout="fixed" style={{width:''}} loader={myLoader} src={x.icon+'.png'} width={32} height={32}  />
                        <p style={{marginTop:0, width:'30%'}}>{x.name}</p>
                        <p style={{width:'15%'}}>{x.itemNum}</p>
                        <p style={{}}>{x.degree}</p>
                        {/*<IconButton color='green' appearance='primary' icon={<PlusIcon />} />*/}
                        <IconButton color='red' onClick={() => handleDeleteItem(x)} appearance='primary' icon={<TrashIcon />} />
                        {/*<Button appearance='primary' color='green' onClick={() => handleDrawChar(x)}>Edit</Button>*/}
                      </div>
                    )}

                    </Panel>
                  </Panel>
              </Panel>

              <Panel style={{marginTop:20}} header='Delete Package' bordered>
              <i>Write Delete</i>
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>

                <Input placeholder={''}  style={{width:'50%'}} />
                <Button appearance='primary' color='red'>DELETE</Button>
              </div>
              </Panel>

            </Panel>

          </PanelGroup>
        </Drawer.Body>
      </Drawer>
      </Container>
       : <>Loading...</>}
  </>
  )
}
