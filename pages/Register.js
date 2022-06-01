import {React, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Container, Panel, PanelGroup, InputGroup, Input, Form, Schema, ButtonToolbar, FlexboxGrid, Animation, Button, toaster } from 'rsuite'
//import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
const { StringType, NumberType } = Schema.Types;
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rsuite/dist/rsuite.min.css'
import { userService } from '@services/index'
import { showNotification } from './utilContext.js'

export default function Register() {
  const [userData, setUserData] = useState({username:'', email:'', password:'', repassword:''})
  const [visible, setVisible] = useState('false')
  const router = useRouter()

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
      return userService.register(userData.username, userData.email, userData.password)
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

  useEffect(() => {
    if(userService.userValue){
      router.push('/')
    }else {
      console.log('hola')
    }
  }, [router])

  return (
    <Container style={{margin:50}}>
    <Animation.Bounce in={true}>
    <FlexboxGrid justify={'space-around'}>
      <FlexboxGrid.Item colspan={18}>
      {/*Login form*/}
      <Panel header={<h3>Register</h3>} bordered>
              <Form fluid onChange={setUserData} formValue={userData} model={model}>
                <Form.Group controlId='username'>
                  <Form.ControlLabel>Username</Form.ControlLabel>
                  <Form.Control name="username" />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.ControlLabel>Email</Form.ControlLabel>
                  <Form.Control name="email" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Re-Password</Form.ControlLabel>
                  <Form.Control name="repassword" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" type='submit' onClick={handleSubmit}>Sign up</Button>
                    <Button appearance="link">Forgot password?</Button>
                  </ButtonToolbar>
                </Form.Group>
              </Form>
            </Panel>
        </FlexboxGrid.Item>
    </FlexboxGrid>
    </Animation.Bounce>
    </Container>
  )
}
