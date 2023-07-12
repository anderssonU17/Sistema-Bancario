import React, { createContext, useEffect, useState } from 'react'
import { getAllUser } from '../api/startAdmin'

import '../../assets/css/startAdmin.css'
import { UserCard } from '../components/userCard'

export const StartAdmin = () => {
    
    const [token, setToken] = useState(localStorage.getItem('token'))

    const [users, setUsers] = useState(null)

    useEffect(() => {
      
        getAllUser(token).then(
            (responseUsers) => {
                setUsers(responseUsers)
                console.log(responseUsers);
            }
        )

    }, [])
    

  return (
    <>
            <div className='start-cards-container' >
        {   
            users && 
                users.map(
                    (user) => (
                        <UserCard key = {user._id} user = {user} setUsers ={setUsers}/>
                    )
                )
        }
            </div>
    </>
  )
}
