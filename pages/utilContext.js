import { createContext } from 'react';
import { Notification } from 'rsuite'

export const ThemeContext = createContext('');
export const NotisContext = createContext('succes')
export const UserContext = createContext({userData:'', charsData:''})

export function showNotification(message, typeNoti, headNoti){
  return(
    <Notification closable type={typeNoti} header={headNoti}>
      <p>{message}</p>
    </Notification>
  )
}
