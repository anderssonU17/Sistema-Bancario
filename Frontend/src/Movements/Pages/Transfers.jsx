import React from 'react'
import { Dashboard } from '../../components/Dashboard'
import { InputBeneficiary } from '../components/InputBeneficiary '

import '../../assets/css/inputBeneficiary.css'

export const Transfers = () => {
  return (
    <>
      <div style={{marginLeft: '80px'}} >
        <div>
          <Dashboard/>
        </div>
        <div>
          <InputBeneficiary action={'transferencia'} />
        </div>
      </div>
    </>
  )
}
