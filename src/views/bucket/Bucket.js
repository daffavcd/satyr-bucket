import React from 'react'
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

const Tables = () => {
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
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  <CTableDataCell>Mark</CTableDataCell>
                  <CTableDataCell>Otto</CTableDataCell>
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
                <CTableRow>
                  <CTableHeaderCell scope="row">2</CTableHeaderCell>
                  <CTableDataCell>Jacob</CTableDataCell>
                  <CTableDataCell>Thornton</CTableDataCell>
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
                <CTableRow>
                  <CTableHeaderCell scope="row">3</CTableHeaderCell>
                  <CTableDataCell>@fat</CTableDataCell>
                  <CTableDataCell>@fat</CTableDataCell>
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
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
