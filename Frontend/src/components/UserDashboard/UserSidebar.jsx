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

const UserSidebar = () => {
  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/employee-dashboard' },
    // { label: 'Employee', icon: <FaUsers />, path: '/admin-dashboard/employees' },
    // { label: 'Department', icon: <FaBuilding />, path: '/admin-dashboard/departments' },
    // { label: 'Leave', icon: <FaCalendarAlt />, path: '/admin-dashboard' },
    // { label: 'Salary', icon: <FaMoneyBillWave />, path: '/admin-dashboard' },
    // { label: 'Settings', icon: <FaCog />, path: '/admin-dashboard' },
  ]

  return (
    <div className="w-64 h-screen bg-gray-700 text-white flex flex-col">
      <div className="p-[8px] text-[20px] text-center font-bold border-b border-gray-700 bg-teal-600">
        Saral Mandal
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            end={item.path === '/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-teal-600 transition-colors ${isActive ? 'bg-teal-600 font-semibold' : ''
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

export default UserSidebar
