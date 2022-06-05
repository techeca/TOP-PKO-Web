import { React, useState } from 'react'
import { Panel, Button, Modal, ButtonToolbar, Container, FlexboxGrid, Form, FormGroup, Schema, Animation, toaster, SelectPicker, Toggle } from 'rsuite'
const { StringType, NumberType, BooleanType } = Schema.Types;
import { userService } from '@services/index'
import { showNotification } from './utilContext.js'

export function ModalQuestion({handleCloseModal, openModalCat, packSelected, updateMallData}){
  const [newItemInPackage, setNewItemInPackage] = useState({package:packSelected, item:''})
  //console.log(packSelected)
  const model = Schema.Model({
    username: StringType().isRequired('Username required'),
    email: StringType()
                  .isEmail('Enter a valid Username or Email')
                  .isRequired('Username required'),
    password: StringType().isRequired('Password required'),
    repassword: StringType().addRule((value, data) => {
                            if(value !== data.password){
                              return false
                            }
                            return true
                          }, 'The two passwords do not match')
                          .isRequired('This field is required')
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
      return userService.addItemToPackage(packSelected, userData.email, userData.password)
             .then((r) => {
               //console.log()
               toaster.push(showNotification(`${r}`, 'success', 'Welcome'), 'bottomEnd')
               router.push('/user/Login')
             })
             .catch(error => {
               //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
               //console.log(error)
             })
  }


  return (
      <>
      {packSelected ? <Panel >
      <div className="modal-container">
          <Modal open={openModalQuest} onClose={handleCloseModalQuestion}>
            <Modal.Header>
              {/*<Modal.Title>Add Item to <span style={{color:'purple'}}></span></Modal.Title>*/}

            </Modal.Header>
            <Modal.Body>

            <Container style={{margin:0}}>
            <Animation.Bounce in={true}>
            <FlexboxGrid justify={'space-around'}>
              <FlexboxGrid.Item colspan={22}>
              {/* New item in package */}
              <Panel header={<h4 style={{marginBottom:10}}>Add Item to <span style={{color:'purple'}}><strong>{packSelected.clsName}</strong></span> Categorie</h4>} >
                      <Form fluid onChange={setNewItemInPackage} formValue={newItemInPackage} model={model}>

                        <Form.Group style={{display:'flex', marginTop:0}} controlId='itemID'>
                          <Form.ControlLabel style={{width:'50%', paddingTop:6}}>Item ID</Form.ControlLabel>
                          <Form.Control name="username" />
                        </Form.Group>

                      <div style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel>Quantity</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                      </div>

                      <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel>Quantity</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                      </div>

                      <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel>Quantity</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                      </div>

                      <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel>Quantity</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                        <Form.Group controlId='itemNum'>
                          <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                          <Form.Control name="email" />
                        </Form.Group>
                      </div>


                      </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            </Animation.Bounce>
            </Container>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModalQuestion} appearance="primary">
                Ok
              </Button>
              <Button onClick={handleCloseModalQuestion} color='red' appearance="primary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
      </Panel>
      :
      <></>}
      </>
    )
}
export function ModalAddItemInCat({handleCloseModal, openModalItemInCat, packSelected, updateMallData}){
  const [newItemInPackage, setNewItemInPackage] = useState({itemID:0, quantity:1, flute:0, attribute1Id:0, attribute1Value:0, attribute2Id:0, attribute2Value:0, attribute3Id:0, attribute3Value:0, attribute4Id:0, attribute4Value:0, attribute5Id:0, attribute5Value:0, comID:packSelected.comID})
  //console.log(packSelected)
  const model = Schema.Model({
    itemID: NumberType().isRequired('Item ID is required'),
    quantity: NumberType().isRequired('Quantity required'),
    flute: StringType(), //.isRequired('fluter?'),
    attribute1Id: NumberType(),
    attribute1Value: NumberType(),
    attribute2Id: NumberType(),
    attribute2Value: NumberType(),
    attribute3Id: NumberType(),
    attribute3Value: NumberType(),
    attribute4Id: NumberType(),
    attribute4Value: NumberType(),
    attribute5Id: NumberType(),
    attribute5Value: NumberType()
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
      const tempNew = {...newItemInPackage, comID:packSelected.comID}
      return userService.addItemToPackage(tempNew, 'addItem')
             .then((r) => {
               //console.log()
               setNewItemInPackage({itemID:0, quantity:1, flute:0, attribute1Id:0, attribute1Value:0, attribute2Id:0, attribute2Value:0, attribute3Id:0, attribute3Value:0, attribute4Id:0, attribute4Value:0, attribute5Id:0, attribute5Value:0, comID:packSelected.comID})
               toaster.push(showNotification(`Done`, 'success', 'New Item added'), 'bottomEnd')
               updateMallData()
               handleCloseModal()
             })
             .catch(error => {
               //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
               console.log(error)
             })
      }

    const handleCose = () => {
      //handleCloseModal()
      updateMallData()
      setNewItemInPackage({itemID:0, quantity:1, flute:0, attribute1Id:0, attribute1Value:0, attribute2Id:0, attribute2Value:0, attribute3Id:0, attribute3Value:0, attribute4Id:0, attribute4Value:0, attribute5Id:0, attribute5Value:0, comID:packSelected.comID})
    }


  return (
      <>
      {openModalItemInCat ? <Panel >
      <div className="modal-container">
          <Modal open={openModalItemInCat} onClose={handleCloseModal}>
            <Modal.Header>
              {/*<Modal.Title>Add Item to <span style={{color:'purple'}}></span></Modal.Title>*/}
            </Modal.Header>

            <Modal.Body>
            <Container style={{margin:0}}>
            <Animation.Bounce in={true}>
            <FlexboxGrid justify={'space-around'}>
              <FlexboxGrid.Item colspan={22}>
              {/* New item in package */}
              <h4 style={{marginBottom:10}}>Add Item</h4>
              <h5 style={{color:'purple'}}><strong>{packSelected.clsName}</strong></h5>
              <Panel>

                    <Form fluid onChange={setNewItemInPackage} formValue={newItemInPackage} model={model}>

                        <Panel bordered width='100'>
                        <Form.Group style={{display:'flex', marginTop:0}} controlId='itemID'>
                          <Form.ControlLabel style={{width:'50%', paddingTop:6}}>Item ID</Form.ControlLabel>
                          <Form.Control name="itemID" />
                        </Form.Group>
                        </Panel>


                    {/*<h6 style={{textAlign:'center', marginTop:30}}>Attributes</h6>*/}

                      <div style={{display:'flex', justifyContent:'space-between', textAlign:'center', flexDirection:'row', marginTop:30}}>

                        <div style={{width:'45%'}}>
                          <Panel bordered width='100'>
                          <Form.Group controlId='quantity'>
                            <Form.ControlLabel>Quantity</Form.ControlLabel>
                            <Form.Control name="quantity" />
                          </Form.Group>

                          <Form.Group controlId='flute'>
                            <Form.ControlLabel style={{}}>flute?</Form.ControlLabel>
                            <Form.Control name="flute" />
                          </Form.Group>
                          </Panel>
                        </div>


                        <div style={{width:'50%',}}>
                          <Panel bordered width='100'>
                            <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                              <Form.Group controlId='attribute1Id'>
                                <Form.ControlLabel>1</Form.ControlLabel>
                                <Form.Control placeholder='ID Attr' name="attribute1Id" />
                                <Form.Control placeholder='Value'  name="attribute1Value" />
                              </Form.Group>

                              <Form.Group controlId='attribute2Id'>
                                <Form.ControlLabel>2</Form.ControlLabel>
                                <Form.Control placeholder='ID Attr' name="attribute2Id" />
                                <Form.Control placeholder='Value' name="attribute2Value" />
                              </Form.Group>

                              <Form.Group controlId='attribute3Id'>
                                <Form.ControlLabel>3</Form.ControlLabel>
                                <Form.Control placeholder='ID Attr' name="attribute3Id" />
                                <Form.Control placeholder='Value' name="attribute3Value" />
                              </Form.Group>
                             </div>

                             <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                             <Form.Group controlId='attribute1Id'>
                               <Form.ControlLabel>4</Form.ControlLabel>
                               <Form.Control placeholder='ID Attr' name="attribute4Id" />
                               <Form.Control placeholder='Value'  name="attribute4Value" />
                             </Form.Group>

                             <Form.Group controlId='attribute5Id'>
                               <Form.ControlLabel>5</Form.ControlLabel>
                               <Form.Control placeholder='ID Attr' name="attribute5Id" />
                               <Form.Control placeholder='Value' name="attribute5Value" />
                             </Form.Group>

                             {/*<Form.Group controlId='attribute1Id'>
                               <Form.ControlLabel>Attr 6</Form.ControlLabel>
                               <Form.Control placeholder='ID Attribute' name="attribute1Id" />
                               <Form.Control placeholder='Value' name="attribute1Value" />
                             </Form.Group>*/}
                             </div>
                          </Panel>
                        </div>
                      </div>


                      <div style={{display:'flex', justifyContent:'flex-end', marginTop:30}}>
                        <Button onClick={handleSubmit}  appearance="primary">
                          Save
                        </Button>
                        <div style={{marginLeft:10}}>
                        <Button onClick={handleCloseModal} color='red' appearance="primary">
                          Cancel
                        </Button>
                        </div>
                      </div>

                      </Form>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            </Animation.Bounce>
            </Container>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>
          </div>
      </Panel>
      :
      <></>}
      </>
    )
}
export function ModalAddCategorie({handleCloseModal, openModalCat, updateMallData, categoriesName}){
  const [newCategorie, setNewCategorie] = useState()
  //console.log(packSelected)
  const model = Schema.Model({
    clsName: StringType().isRequired('Name is required'),
    parentID: NumberType() //isRequired('Quantity required')
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
      const tempNew = {clsName:newCategorie.clsName, parentID:0, isDel:0, delTime:0, buildTime:0}
      return userService.addItemToPackage(tempNew, 'addCat')
             .then((r) => {
               //console.log()
               setNewCategorie({clsName:''.clsName, parentID:0})
               toaster.push(showNotification(`Done`, 'success', 'New Categorie added'), 'bottomEnd')
               updateMallData()
               handleCloseModal()
             })
             .catch(error => {
               //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
               console.log(error)
             })
      }

    const handleClose = () => {
      handleCloseModal()
      updateMallData()
      setNewCategorie({clsName:'', parentID:0})
    }


  return (
      <>
      {openModalCat ? <Panel >
      <div className="modal-container">
          <Modal open={openModalCat} onClose={handleClose}>
            <Modal.Header>
              {/*<Modal.Title>Add Item to <span style={{color:'purple'}}></span></Modal.Title>*/}
            </Modal.Header>

            <Modal.Body>
            <Container style={{margin:0}}>
            <Animation.Bounce in={true}>
            <FlexboxGrid justify={'space-around'}>
              <FlexboxGrid.Item colspan={22}>
              {/* New item in package */}
              <h4 style={{marginBottom:10}}>Add Categorie</h4>
              {/*<h5 style={{color:'purple'}}><strong>{packSelected.clsName}</strong></h5>*/}
                <Panel>

                    <Form fluid onChange={setNewCategorie} formValue={newCategorie} model={model}>

                        <Panel bordered width='100'>

                        <Form.Group style={{display:'flex', marginTop:0}} controlId='clsName'>
                          <Form.ControlLabel style={{width:'50%', paddingTop:6}}>Name</Form.ControlLabel>
                          <Form.Control name="clsName" />
                        </Form.Group>

                        <Form.Group style={{display:'flex', marginTop:0}} controlId='parentID'>
                          <Form.ControlLabel style={{width:'50%', paddingTop:6}}>Parent</Form.ControlLabel>
                          <Form.Control data={categoriesName} style={{width:'100%'}} accepter={SelectPicker} searchable={false} name="parentID" />
                        </Form.Group>

                        </Panel>
                    {/*<h6 style={{textAlign:'center', marginTop:30}}>Attributes</h6>*/}

                      <div style={{display:'flex', justifyContent:'flex-end', marginTop:30}}>
                        <Button onClick={handleSubmit} type='submit'  appearance="primary">
                          Save
                        </Button>
                        <div style={{marginLeft:10}}>
                        <Button onClick={handleClose} color='red' appearance="primary">
                          Cancel
                        </Button>
                        </div>
                      </div>

                    </Form>
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            </Animation.Bounce>
            </Container>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>
          </div>
      </Panel>
      :
      <></>}
      </>
    )
}
export function ModalAddPack({handleCloseModal, openModalPack, updateMallData, categorieSelected, categoriesName}){
  //const [newCategorie, setNewCategorie] = useState()
  const [packageForm, setPackageForm] = useState()
  //console.log(categorieSelected)
  const model = Schema.Model({
    comName: StringType().isRequired('Name is required'),
    comRemack: StringType().isRequired('Description is required'),
    comPrice: NumberType().isRequired('Price is required'),
    isHot: BooleanType()
  })

    const handleSubmit = async (e) => {
    e.preventDefault()
      const tempNew = {comName:packageForm.comName, comClass:categorieSelected.clsID, comPrice:packageForm.comPrice, comRemack:packageForm.comRemack, isHot:packageForm.isHot == 1 ? true : 0, comTime:1408594454, beginTime:1408594454, comExpire:-1, comNumber:-1, isDel:0, delTime:0}
      return userService.addItemToPackage(tempNew, 'addPackToCat')
             .then((r) => {
               //console.log()
               //setNewCategorie({clsName:''.clsName, parentID:0})
               toaster.push(showNotification(`Done`, 'success', 'New Pack added'), 'bottomEnd')
               updateMallData()
               handleCloseModal()
             })
             .catch(error => {
               //toaster.push(showNotification(`${error}`, 'error', 'User exists'), 'bottomEnd')
               console.log(error)
             })
      }

    const handleClose = () => {
      handleCloseModal()
      updateMallData()
      setPackageForm('')
    }

  return (
      <>
      {openModalPack ? <Panel >
      <div className="modal-container">
          <Modal open={openModalPack} onClose={handleClose}>
            <Modal.Header>
            </Modal.Header>

            <Modal.Body>
            <Container style={{margin:0}}>
            <Animation.Bounce in={true}>
            <FlexboxGrid justify={'space-around'}>
              <FlexboxGrid.Item colspan={22}>
              {/* New item in package */}
              <h4 style={{marginBottom:10}}>Add Pack to <span style={{color:'red'}}>{categorieSelected.clsName}</span></h4>
                <Panel>

                <Form fluid onChange={setPackageForm} formValue={packageForm} model={model}>

                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
                      <p style={{margin:10}}>Name</p>
                      <Form.Group style={{width:'50%'}} controlId='comName'>
                        {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                        <Form.Control name="comName" />
                      </Form.Group></div>
                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
                      <p style={{margin:10}}>Description</p>
                      <Form.Group style={{width:'50%', display:'flex'}} controlId='comRemack'>
                        {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                        {/*<Form.Control defaultValue={packSelected.comRemack} rows={3} accepter={Textarea} name="comRemack" />*/}
                        <Form.Control name="comRemack" />
                      </Form.Group></div>

                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
                      <p style={{margin:10}}>Price</p>
                      <Form.Group style={{width:'50%'}} controlId='comPrice'>
                        {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                        <Form.Control name="comPrice" />
                      </Form.Group></div>

                      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
                      <p style={{margin:10}}>Is HOT</p>
                      <Form.Group style={{width:'50%'}} controlId='isHot'>
                        {/*<Form.ControlLabel>ID</Form.ControlLabel>*/}
                        <Form.Control accepter={Toggle} name="isHot" />
                      </Form.Group></div>
                      {/*<div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}><p style={{margin:10}}>Crystals</p><Input value={tradedet[0] ? tradedet[0].Money : '0' } style={{width:'50%'}} /></div>*/}
                      <div style={{display:'flex', justifyContent:'flex-end', margin:15}}>
                        <Button onClick={handleSubmit} type='submit' color='green' appearance="primary">Save</Button>
                      </div>

                    {/*<h6 style={{textAlign:'center', marginTop:30}}>Attributes</h6>*/}
                    </Form>
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            </Animation.Bounce>
            </Container>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>
          </div>
      </Panel>
      :
      <></>}
      </>
    )
}
