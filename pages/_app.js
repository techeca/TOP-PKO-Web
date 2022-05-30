import 'rsuite/dist/rsuite.min.css'
import '../styles/globals.css'


import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import { userService } from '../services'
import MyNav from './MyNav.js'
import MyFooter from './MyFooter.js'
import { Footer, Container, Content, Panel, Header, CustomProvider, Notification } from 'rsuite'
import { ThemeContext } from './user/utilContext.js'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [themeUser, setThemeUser] = useState('')
  //const ThemeContext = createContext(null)
  const [theme, setTheme] = useState('dark');

  const authCheck = useCallback((url) => {
  //Paths permitidos para usuario no logeados //pages
   const publicPaths = ['/', '/user/Login', '/Register']
   const path = url.split('?')[0]
   if(!userService.userValue && !publicPaths.includes(path)){   //si no está logeado y no está en ruta publica
           setAuthorized(false)
           router.push({
             pathname: '/',
             query: { returnUrl: router.asPath}
           })
   } else {
     setAuthorized(true)
   }
}, [router])


useEffect(() => {
  //setThemeUser(localStorage.getItem('themeUser'))
  //console.log(localTheme)
  //localTheme = localStorage.getItem('themeUser')
  if(localStorage.getItem('themeUser')){
    setTheme(localStorage.getItem('themeUser'))
  }else{
    setTheme('ligth')
    localStorage.setItem('themeUser', 'ligth')
  }
  authCheck(router.asPath);
  const hideContent = () => setAuthorized(false);
  router.events.on('routeChangeStart', hideContent);
  router.events.on('routeChangeComplete', authCheck);

  return () => {
    router.events.off('routeChangeStart', hideContent);
    router.events.off('routeChangeComplete', authCheck);
  }
}, [router, authCheck]);

  return(
  <ThemeContext.Provider value={{theme, setTheme}}>
  {authorized &&
    <CustomProvider theme={theme}>
    <Container style={{height:'100vh'}}>
      <Header style={{}}>
        <MyNav />
      </Header>
    <Content >
      <Component { ...pageProps} />
    </Content>
      <Footer style={{borderRadius:'0', position:'relative', bottom:0, width:'100%'}}>
        <MyFooter />
      </Footer>
    </Container>
    </CustomProvider>
  }
  </ThemeContext.Provider>
  )
}

export default MyApp
