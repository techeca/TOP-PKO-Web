import {React, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Container, Panel, PanelGroup, InputGroup, Input, Form, Schema, ButtonToolbar, FlexboxGrid, Animation, Button, toaster } from 'rsuite'
//import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
const { StringType, NumberType } = Schema.Types;
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rsuite/dist/rsuite.min.css'
import { userService } from '@services/index'
import { showNotification } from '../utilContext.js'

export default function Login() {
  const [userData, setUserData] = useState({usernameOrEmail:'', password:''})
  const [visible, setVisible] = useState('false')
  const router = useRouter()

  const model = Schema.Model({
    usernameOrEmail: StringType()
                  //.isEmail('Enter a valid Username or Email')
                  .isRequired('Username or Email required'),
    password: StringType().isRequired('Password required')
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
      return userService.login(userData.usernameOrEmail, userData.password)
             .then((r) => {
               //console.log(r)
               toaster.push(showNotification('You have connected correctly', 'success', 'Welcome'), 'bottomEnd')
               router.push('/user/')
             })
             .catch(error => {
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
    <Container style={{marginTop:80}}>
    <Animation.Bounce in={true}>
    <FlexboxGrid justify={'space-around'}>
      <FlexboxGrid.Item colspan={8}>
      {/*Login form*/}
      <Panel header={<h3>Login</h3>} bordered>
              <Form fluid onChange={setUserData} formValue={userData} model={model}>
                <Form.Group controlId='usernameOrEmail'>
                  <Form.ControlLabel>Username or email address</Form.ControlLabel>
                  <Form.Control name="usernameOrEmail" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button appearance="primary" type='submit' onClick={handleSubmit}>Sign in</Button>
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
