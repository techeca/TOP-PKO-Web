import { createContext } from 'react';
import { Notification } from 'rsuite'

export const ThemeContext = createContext('light');
export const NotisContext = createContext('succes')

export function showNotification(message, typeNoti, headNoti){
  return(
    <Notification closable type={typeNoti} header={headNoti}>
      <p>{message}</p>
    </Notification>
  )
}
