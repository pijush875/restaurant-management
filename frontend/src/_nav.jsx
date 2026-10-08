import React from 'react'

import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilUser,
  cilBasket,
  cilList,
  cilBuilding,
  cilCalendar,
  cilCart,
  cilNotes,
  cilCreditCard,
  cilChart,
  cilChartLine,
  cilClipboard,
  cilSettings,
} from '@coreui/icons'

import { CNavItem, CNavGroup } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Master',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User',
        to: '/master/user',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Employee',
        to: '/master/employee',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Customer',
        to: '/master/customer',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Food Category',
        to: '/master/food-category',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Food',
        to: '/master/food-item',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Restaurant Table',
        to: '/master/restaurant-table',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Tax',
        to: '/master/tax',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Payment Method',
        to: '/master/payment-method',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Transaction',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Table Booking',
        to: '/transaction/table-booking',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Food Order',
        to: '/transaction/food-order',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Invoice',
        to: '/transaction/invoice',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Payment',
        to: '/transaction/payment',
        icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Reports',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sales Report',
        to: '/reports/sales',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Food Sales',
        to: '/reports/food-sales',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Booking Report',
        to: '/reports/booking',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Employee Activity',
        to: '/reports/employee-activity',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav

