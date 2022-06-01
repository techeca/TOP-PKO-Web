import {React, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Container, Panel, PanelGroup, InputGroup, Input, Form, Schema, ButtonToolbar, FlexboxGrid, Animation, Button } from 'rsuite'
//import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
const { StringType, NumberType } = Schema.Types;
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rsuite/dist/rsuite.min.css'
import { userService } from '@services/index'

export default function ChangeHonorForCredits() {
  const [userData, setUserData] = useState({username:'', email:'', password:'', repassword:''})
  const [visible, setVisible] = useState('false')
  const router = useRouter()

  const model = Schema.Model({
    username: StringType().isRequired('Username required'),
    email: StringType()
                  .isEmail('Enter a valid Username or Email')
                  .isRequired('Username required'),
    password: StringType().isRequired('Password required')
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
      return userService.login(userData.usernameOrEmail, userData.password)
             .then((r) => {
               console.log(r)
             })
             .catch(error => {
               console.log(error)
             })
  }

  return (


      <Panel header={<h4>Exchange Honor</h4>} bordered>
              <Form fluid onChange={setUserData} formValue={userData} model={model}>

                <Form.Group>
                  <Form.ControlLabel>Your Honor</Form.ControlLabel>
                  <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Credits to obtain</Form.ControlLabel>
                  <Form.Control name="repassword" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" type='submit' onClick={handleSubmit}>Exchange</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>


  )
}
