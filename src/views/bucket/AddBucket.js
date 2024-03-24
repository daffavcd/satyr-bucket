import { useEffect, useState, React } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CNavLink,
  CForm,
  CFormInput,
  CFormText,
  CFormTextarea,
} from '@coreui/react'
import { NavLink } from 'react-router-dom'

import CIcon from '@coreui/icons-react'

import { cilSave, cilList } from '@coreui/icons'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCookies } from 'react-cookie'
import { put } from '@vercel/blob'

const Tables = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  const [cookiesState, setCookiesState] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    estimated_budget: '',
    description: '',
    authorId: -1,
  })

  useEffect(() => {
    const getCookies = () => {
      if (cookies.id != undefined) {
        setCookiesState({ id: cookies.id, name: cookies.name, email: cookies.email })
        setFormData((prevData) => ({
          ...prevData,
          authorId: cookies.id,
        }))
      } else {
        withReactContent(Swal)
          .fire({
            title: 'Forbidden',
            text: 'You need to sign in first to access this page',
            confirmButtonText: 'Oke',
          })
          .then((result) => {
            window.location.href = '/#/login'
          })
      }
    }
    getCookies()
  }, [])

  useEffect(() => {
    // const fetchTravels = async () => {
    //   try {
    //     // const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' })
    //     // console.log(url)
    //     console.log('wewewe')
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    // fetchTravels()
    console.log('wewewe123')
  }, [])

  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // POST IMAGES

      const { url } = await put(`images/${Math.floor(Math.random() * 1000)}_${image.name}`, image, {
        access: 'public',
      })
      formData.image = url

      const response = await fetch(`${process.env.SATYR_SERVER}/travels`, {
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

      withReactContent(Swal)
        .fire({
          title: 'Success',
          text: 'The item was inserted',
          confirmButtonText: 'Oke',
        })
        .then((result) => {
          window.location.href = '/#/bucket'
        })
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }

  const [imagePreview, setImagePreview] = useState(null)
  const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB in bytes
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the maximum limit of 3MB.')
        e.target.value = null // Clear the input field
        setImagePreview(null) // Clear the image preview
        return
      }
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <CRow>
      <CCol xs={12} className="mb-4">
        <CButton color="secondary" className="r-0">
          <CNavLink to="/bucket" as={NavLink}>
            <CIcon icon={cilList} className="me-2" />
            Travel Bucket List
          </CNavLink>
        </CButton>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            <strong>Travel Bucket List</strong>
          </CCardHeader>
          <CCardBody className="p-4">
            <CRow>
              <CForm id="input-form" onSubmit={handleSubmit}>
                <CCol>
                  <CFormInput
                    type="text"
                    id="name"
                    label="Destination Name"
                    placeholder="Wisata Ramayana"
                    className="mb-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="text"
                    id="location"
                    label="Location Name"
                    placeholder="Kota Malang"
                    className="mb-2"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="text"
                    id="estimated_budget"
                    label="Estimated Budget"
                    placeholder="5000000"
                    className="mb-2"
                    value={formData.estimated_budget}
                    onChange={handleChange}
                    required
                  />
                </CCol>
                <CCol>
                  <CFormTextarea
                    id="description"
                    label="Description"
                    placeholder="Tell them about what you'd recomend abaout this place..."
                    className="mb-2"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></CFormTextarea>
                </CCol>
                <CCol>
                  <CFormInput
                    type="file"
                    id="image"
                    label="Destination Image"
                    className="mb-2"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      height={300}
                      width={240}
                      className="mt-2"
                      style={{ objectFit: 'cover' }}
                      alt="Preview Image"
                    />
                  )}
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
