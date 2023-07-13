import React, { useEffect, useState } from 'react'
import { getOwnUser } from '../../user/api/ApiUser'
import { Client } from '../components/Client'

export const StartClient = () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    getOwnUser(token).then(
      (response) => {
        setUser(response)
      }
    )
    
  }, [])
  

  return (
    <>
      {
        user ? 
        (
          <Client user={user}/>
        )
        : 
        null
      }
    </>
  )
}
