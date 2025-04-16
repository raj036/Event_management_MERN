import React from 'react'
import { useAuth } from '../context/authContext'

const EmployeeDashboard = () => {
    const {user} = useAuth()
  return (
    <div>EmployeeDashboard {user.name}</div>
  )
}

export default EmployeeDashboard