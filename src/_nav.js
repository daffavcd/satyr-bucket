import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilPaperPlane,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Travel Bucket',
    to: '/bucket',
    icon: <CIcon icon={cilPaperPlane} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Travel Bucket List',
        to: '/bucket',
      },
      {
        component: CNavItem,
        name: 'Travel Bucket Add',
        to: '/add_bucket',
      },
    ],
  },
]

export default _nav
