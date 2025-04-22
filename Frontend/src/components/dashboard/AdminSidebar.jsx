import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaBuilding, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaCog 
} from 'react-icons/fa'

const AdminSidebar = () => {
  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin-dashboard' },
    { label: 'Employee', icon: <FaUsers />, path: '/admin-dashboard/employees' },
    { label: 'Department', icon: <FaBuilding />, path: '/admin-dashboard/departments' },
    { label: 'Leave', icon: <FaCalendarAlt />, path: '/admin-dashboard' },
    { label: 'Salary', icon: <FaMoneyBillWave />, path: '/admin-dashboard' },
    { label: 'Settings', icon: <FaCog />, path: '/admin-dashboard' },
  ]

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Employee MS
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink 
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                isActive ? 'bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default AdminSidebar
