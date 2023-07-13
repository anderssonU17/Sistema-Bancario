import React, { useState } from 'react'
import { Dashboard } from '../../components/Dashboard'
import { InputBeneficiary } from '../components/InputBeneficiary '

export const Deposits = () => {

  const [deposito, setDeposito] = useState({})

  return (
    <div style={{marginLeft: '80px'}} >
        <div>
          <Dashboard/>
        </div>
        <div>
          <InputBeneficiary setDeposito={setDeposito} action={'deposito'} />
        </div>
      </div>
  )
}
