import React, { useEffect, useState } from 'react'
import { checkRolAdmin } from '../helper/checkAdmin'
import { ActiveAccounts } from './ActiveAccounts'
import { Navigate } from 'react-router'

export const Stadistics = () => {

    const [admin, setAdmin] = useState(false)

    useEffect(() => {
      
        const admin = async () => {
            try {
                
                const verfied = await checkRolAdmin()
                setAdmin(verfied)
                if(!verfied) {
                    window.location.href = '/start'
                }

            } catch (error) {
                console.error(error)
            }
        }

        admin()

    }, [])
    
  return (
    <>
        {
        admin && 
        <ActiveAccounts/>
        }
    </>
  )
}
