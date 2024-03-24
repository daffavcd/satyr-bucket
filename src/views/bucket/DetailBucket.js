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
import { NavLink, useParams } from 'react-router-dom'

import CIcon from '@coreui/icons-react'

import { cilSave, cilList } from '@coreui/icons'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCookies } from 'react-cookie'
import { put } from '@vercel/blob'

const DetailBucket = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  const [cookiesState, setCookiesState] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    estimated_budget: '',
    description: '',
    authorId: -1,
  })

  const { id } = useParams()
  const [imageVercel, setImageVercel] = useState(null)

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const response = await fetch(`${process.env.SATYR_SERVER}/travels/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        console.log(response)
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`)
        }
        let responseJson = await response.json()
        setFormData((prevData) => ({
          ...prevData,
          name: responseJson.name,
          location: responseJson.location,
          estimated_budget: responseJson.estimated_budget,
          description: responseJson.description,
          authorId: responseJson.authorId,
        }))
        setImageVercel(responseJson.image)
        console.log(responseJson)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTravels()
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
      if (imagePreview != null) {
        const { url } = await put(
          `images/${Math.floor(Math.random() * 1000)}_${image.name}`,
          image,
          {
            access: 'public',
          },
        )
        formData.image = url
      }

      const response = await fetch(`${process.env.SATYR_SERVER}/travels/${id}`, {
        method: 'PUT',
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
      setImageVercel(null)
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
            <strong>Detail Travel Bucket</strong>
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
                    readOnly
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
                    readOnly
                    required
                  />
                </CCol>
                <CCol>
                  <CFormInput
                    type="number"
                    id="estimated_budget"
                    label="Estimated Budget"
                    placeholder="5000000"
                    className="mb-2"
                    value={formData.estimated_budget}
                    onChange={handleChange}
                    readOnly
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
                    readOnly
                    required
                  ></CFormTextarea>
                </CCol>
                <CCol>
                  {imageVercel && (
                    <img
                      src={imageVercel}
                      height={300}
                      className="mt-2"
                      style={{ objectFit: 'cover' }}
                      alt="Preview Image"
                    />
                  )}
                </CCol>
              </CForm>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DetailBucket
