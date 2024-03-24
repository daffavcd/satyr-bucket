import { useEffect, useState, React } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useCookies } from 'react-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRe: '',
  })

  const [cookies, setCookie, removeCookie] = useCookies(['auth'])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.passwordRe) {
      withReactContent(Swal).fire({
        title: 'Failed',
        text: `Password didn't match!`,
        confirmButtonText: 'Oke',
      })
      return false
    }
    try {
      const response = await fetch(`${process.env.SATYR_SERVER}/sign_up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`)
      }
      let responseJson = await response.json()

      // IF EMAIL HAS ALREADY EXIST
      if (responseJson.message == 'Email exist') {
        withReactContent(Swal).fire({
          title: 'Failed',
          text: 'Email has already exist',
          confirmButtonText: 'Oke',
        })
        return false
      }

      setCookie('id', responseJson.user.id)
      setCookie('name', responseJson.user.name)
      setCookie('email', responseJson.user.email)

      withReactContent(Swal)
        .fire({
          title: 'Success',
          text: 'Register was successfull',
          confirmButtonText: 'Oke',
        })
        .then((result) => {
          window.location.href = '/#/bucket'
        })
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register </h1>
                  <p className="text-body-secondary"> Create your account </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Name"
                      autoComplete="Name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      id="passwordRe"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={formData.passwordRe}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
