import { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const FoodCategoryCreate = () => {
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('1')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Category Name:', categoryName)
    console.log('Description:', description)
    console.log('Status:', status)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Food Category</strong>
          </CCardHeader>

          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6} className="mb-3">
                  <CFormLabel>Category Name</CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </CCol>

                <CCol md={6} className="mb-3">
                  <CFormLabel>Status</CFormLabel>

                  <CFormSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CFormSelect>
                </CCol>

                <CCol xs={12} className="mb-3">
                  <CFormLabel>Description</CFormLabel>

                  <CFormTextarea
                    rows={4}
                    placeholder="Enter category description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </CCol>
              </CRow>

              <div className="d-flex gap-2">
                <CButton color="primary" type="submit">
                  Save
                </CButton>

                <CButton color="secondary" type="button">
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FoodCategoryCreate