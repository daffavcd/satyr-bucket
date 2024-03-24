import { useEffect, useState, React } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CButton,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNavLink,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'

import CIcon from '@coreui/icons-react'

import { cilPlus, cilMagnifyingGlass, cilPencil, cilTrash } from '@coreui/icons'

const Buckets = () => {
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

  return (
    <CRow>
      <CCol xs={12} className="mb-4">
        <CNavLink to="/add_bucket" as={NavLink}>
          <CButton color="primary" className="r-0">
            <CIcon icon={cilPlus} className="me-2" />
            Add Travel Bucket
          </CButton>
        </CNavLink>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            <strong>Travel Bucket List</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">All data are displayed in the table bellow</p>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {travels ? (
                <CTableBody>
                  {travels.map((travel, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">1</CTableHeaderCell>
                      <CTableDataCell>{travel.name}</CTableDataCell>
                      <CTableDataCell>{travel.location}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2">
                          <CIcon icon={cilMagnifyingGlass} />
                        </CButton>
                        <CButton color="warning" className="me-2">
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" className="me-2">
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              ) : (
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell colspan="4" className="text-center">
                      No data available.
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              )}
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Buckets
