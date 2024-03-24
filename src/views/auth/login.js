import { useEffect, useState, React } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const [cookies, setCookie, removeCookie] = useCookies(['auth'])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.password) {
      withReactContent(Swal).fire({
        title: 'Failed',
        text: `Password didn't match!`,
        confirmButtonText: 'Oke',
      })
      return false
    }

    try {
      const response = await fetch(`${process.env.SATYR_SERVER}/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`)
      }
      console.log('Data posted successfully')
      let responseJson = await response.json()

      // IF EMAIL HAS ALREADY EXIST
      if (responseJson.message == `Account doesn't exist`) {
        withReactContent(Swal).fire({
          title: 'Failed',
          text: `Account doesn't exist`,
          confirmButtonText: 'Oke',
        })
        return false
      }

      if (responseJson.message == `Wrong password`) {
        setFormData({
          ...formData,
          password: '',
        })
        withReactContent(Swal).fire({
          title: 'Failed',
          text: `Wrong Password!`,
          confirmButtonText: 'Oke',
        })
        return false
      }
      console.log(responseJson)

      setCookie('id', responseJson.user.id)
      setCookie('name', responseJson.user.name)
      setCookie('email', responseJson.user.email)

      withReactContent(Swal)
        .fire({
          title: 'Success',
          text: 'Login was successfull',
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        id="email"
                        value={formData.email}
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
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Ready to get started? Sign up now and unlock access to exclusive features!
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-0" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
