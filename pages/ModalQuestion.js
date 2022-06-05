import { React, useState } from 'react'
import { Panel, Button, Modal, ButtonToolbar, Container, FlexboxGrid, Form, FormGroup, Schema, Animation } from 'rsuite'
const { StringType, NumberType } = Schema.Types;
import { userService } from '@services/index'

export default function ModalQuestion({handleCloseModalQuestion, openModalQuest, packSelected}){
  const [newItemInPackage, setNewItemInPackage] = useState({package:packSelected, item:''})
  //console.log(newItemInPackage)
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
               console.log(error)
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
