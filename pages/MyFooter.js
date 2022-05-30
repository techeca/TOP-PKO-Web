import {React, useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container, Panel, PanelGroup, InputGroup, Input, Form, Schema, ButtonToolbar, FlexboxGrid, Animation, Button, Col, IconButton, ButtonGroup } from 'rsuite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faYoutube, faInstagramSquare, faTwitch} from '@fortawesome/free-brands-svg-icons';
//import { Button, Pane, Text, TextInput, Card, Strong, toaster, Spinner, IconButton } from 'evergreen-ui'
const { StringType, NumberType } = Schema.Types;
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'rsuite/dist/rsuite.min.css'
import { userService } from '@services/index'

export default function MyFooter() {
  const router = useRouter()

  return (
    <Panel bordered style={{borderRadius:0}}>
    <Animation.Bounce in={true}>

    <FlexboxGrid justify={'space-around'}>
    <FlexboxGrid.Item colspan={24}>
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item as={Col} colspan={4} lg={2} md={4} smHidden xsHidden >
          <h4>LOGO</h4>
          <p>© techeca</p>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item style={{display:'flex', flexDirection:'row', justifyContent:'center'}} as={Col} colspan={4} lg={4} md={4} sm={6} xs={10}>
            <ButtonToolbar>
              <IconButton color='violet' style={{margin:10}} size='lg' appearance="primary" icon={<FontAwesomeIcon icon={faTwitch}/>} circle/>
            </ButtonToolbar>
              <ButtonToolbar>
              <IconButton color='blue' style={{margin:10}} size='lg' appearance="primary" icon={<FontAwesomeIcon icon={faFacebook}/>} circle/>
              </ButtonToolbar>
              <ButtonToolbar>
              <IconButton color='red' style={{margin:10}} size='lg' appearance="primary" icon={<FontAwesomeIcon icon={faYoutube}/>} circle/>
              </ButtonToolbar>
              <ButtonToolbar>
              <IconButton color='cyan' style={{margin:10}} size='lg' appearance="primary" icon={<FontAwesomeIcon style={{margin:2}} icon={faInstagramSquare}/>} circle/>
              </ButtonToolbar>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item style={{display:'flex', flexDirection:'column'}} as={Col} colspan={4} lg={2} md={4} sm={4} xs={1}>
          <Link href="/"><a style={{color:'darkorange'}}><strong>Home</strong></a></Link>
          <Link href="/"><a style={{color:'darkorange'}}><strong>News</strong></a></Link>
          <Link href="/"><a style={{color:'darkorange'}}><strong>Forum</strong></a></Link>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item style={{display:'flex', flexDirection:'column'}} as={Col} colspan={4} lg={2} md={4} sm={4} xs={1}>
          <Link href="/Register"><a style={{color:'darkorange'}}><strong>Register</strong></a></Link>
          <Link href="/user/Login"><a style={{color:'darkorange'}}><strong>Login</strong></a></Link>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <span></span>
      </FlexboxGrid.Item>
      </FlexboxGrid>
      </Animation.Bounce>
    </Panel>
  )
}
