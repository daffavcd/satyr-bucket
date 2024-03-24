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

const Tables = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    estimated_budget: '',
    description: '',
    authorId: 1,
  })

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
      // UPLOAD IMAGE
      // const formData = new FormData()
      // formData.append('image', image)

      // const responseImage = await fetch('/public/images/travels', {
      //   method: 'POST',
      //   body: formData,
      // })

      // if (!responseImage.ok) {
      //   throw new Error('Failed to upload image')
      // }

      // console.log('Image uploaded successfully')

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
      setFormData({
        name: '',
        location: '',
        estimated_budget: '',
        description: '',
        image: '',
        authorId: 1,
      })

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
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
