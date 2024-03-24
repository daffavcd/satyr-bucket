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

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCookies } from 'react-cookie'

const Buckets = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  const [cookiesState, setCookiesState] = useState(null)
  useEffect(() => {
    const getCookies = () => {
      if (cookies.id != undefined) {
        setCookiesState({ id: cookies.id, name: cookies.name, email: cookies.email })
      }
    }
    getCookies()
  }, [])

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
  const deleteTravel = (key) => {
    withReactContent(Swal)
      .fire({
        title: 'Are you sure?',
        text: 'The deleted item is irreversible',
        confirmButtonColor: 'red',
        confirmButtonText: 'Yes, delete it!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const deleteTravels = async () => {
            try {
              const responseDelete = await fetch(`${process.env.SATYR_SERVER}/travels/${key}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
              })
              console.log(responseDelete)
              if (!responseDelete.ok) {
                throw new Error(`HTTP error: Status ${response.status}`)
              }
              let responseDeleteJson = await responseDelete.json()
              console.log(responseDeleteJson)

              // GET TRAVELS
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
              Swal.fire({
                title: 'Deleted!',
                text: 'Your item has been deleted.',
                icon: 'success',
              })
            } catch (err) {
              console.log(err)
            }
          }
          deleteTravels()
        }
      })
  }

  return (
    <>
      <CRow>
        <CCol xs={12} className="mb-4">
          <CButton color="primary" className="r-0">
            <CNavLink to="/add_bucket" as={NavLink}>
              <CIcon icon={cilPlus} className="me-2" />
              Add Travel Bucket
            </CNavLink>
          </CButton>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex">
              <strong>Travel Bucket List</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                All data are displayed in the table bellow
              </p>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {travels && travels.length > 0 ? (
                  <CTableBody>
                    {travels.map((travel, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell
                          scope="row"
                          style={
                            cookiesState.id == travel.authorId
                              ? { backgroundColor: 'aliceblue' }
                              : {}
                          }
                        >
                          {index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell
                          style={
                            cookiesState.id == travel.authorId
                              ? { backgroundColor: 'aliceblue' }
                              : {}
                          }
                        >
                          {travel.name}
                        </CTableDataCell>
                        <CTableDataCell
                          style={
                            cookiesState.id == travel.authorId
                              ? { backgroundColor: 'aliceblue' }
                              : {}
                          }
                        >
                          {travel.location}
                        </CTableDataCell>
                        <CTableDataCell
                          style={
                            cookiesState.id == travel.authorId
                              ? { backgroundColor: 'aliceblue' }
                              : {}
                          }
                        >
                          <CButton color="info" className="me-2">
                            <CIcon icon={cilMagnifyingGlass} />
                          </CButton>

                          {cookiesState.id == travel.authorId && (
                            <>
                              <CButton color="warning" className="me-2">
                                <CIcon icon={cilPencil} />
                              </CButton>
                              <CButton
                                color="danger"
                                onClick={() => {
                                  deleteTravel(travel.id)
                                }}
                                className="me-2"
                              >
                                <CIcon icon={cilTrash} />
                              </CButton>
                            </>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                ) : (
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell colSpan="4" className="text-center">
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
    </>
  )
}

export default Buckets
