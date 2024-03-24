import classNames from 'classnames'
import { useEffect, useState, React } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const [travels, setTravels] = useState(null)
  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await fetch(`${process.env.SATYR_SERVER}/travels`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`)
        }
        let responseJson = await response.json()
        console.log(responseJson)
        setTravels(responseJson)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTravels()
  }, [])

  const [users, setUsers] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.SATYR_SERVER}/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`)
        }
        let responseJson = await response.json()
        console.log(responseJson)
        setUsers(responseJson)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUsers()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Total Travel Destinations Posted
                        </div>
                        <div className="fs-5 fw-semibold">{travels ? travels.length : '0'}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Total Users</div>
                        <div className="fs-5 fw-semibold">{users ? users.length : '0'}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <hr className="mt-0" />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
