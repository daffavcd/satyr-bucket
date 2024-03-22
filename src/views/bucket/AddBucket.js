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
  CForm,
  CFormInput,
  CFormText,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'

import CIcon from '@coreui/icons-react'

import { cilSave, cilMagnifyingGlass, cilPencil, cilTrash, cilList } from '@coreui/icons'

const Tables = () => {
  return (
    <CRow>
      <CCol xs={12} className="mb-4">
        <CNavLink to="/bucket" as={NavLink}>
          <CButton color="secondary" className="r-0">
            <CIcon icon={cilList} className="me-2" />
            Travel Bucket List
          </CButton>
        </CNavLink>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            <strong>Travel Bucket List</strong>
          </CCardHeader>
          <CCardBody className="p-4">
            <CRow>
              <CForm>
                <CCol>
                  <CFormInput
                    type="text"
                    label="Destination Name"
                    placeholder="Wisata Ramayana"
                    className="mb-2"
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="text"
                    label="Location Name"
                    placeholder="Kota Malang"
                    className="mb-2"
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="text"
                    label="Estimated Budget"
                    placeholder="5000000"
                    className="mb-2"
                  />
                </CCol>
                <CCol>
                  <CFormText
                    type="text"
                    label="Description"
                    placeholder="Tell them about what you'd recomend abaout this place..."
                    className="mb-2"
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="text"
                    label="Destination Link"
                    placeholder="Location Link"
                    aria-describedby="https://www.google.com/maps/search/?api=1&query=47.5951518%2C-122.3316393&query_place_id=ChIJKxjxuaNqkFQR3CK6O1HNNqY"
                    className="mb-2"
                  />
                </CCol>
                <CCol>
                  <CFormInput type="file" label="Destination Image" className="mb-2" />
                </CCol>
                <CCol style={{ textAlign: 'right' }}>
                  <CButton color="primary" size="lg" type="submit" className="mt-4">
                    <CIcon icon={cilSave} className="me-2" />
                    Save
                  </CButton>
                </CCol>
              </CForm>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
