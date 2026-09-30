import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('1')

const handleSubmit = async (e) => {
  e.preventDefault()

  const response = await fetch(
    'http://localhost:5000/api/food-categories',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: categoryName,
        description: description,
        status: status,
      }),
    },
  )

  const result = await response.json()

  console.log(result)
  if (result.success) {
  navigate('/master/food-category')
}
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
                  <CFormLabel>
  Category Name <span className="text-danger">*</span>
</CFormLabel>

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
                  <CFormLabel>Description<span className="text-danger">*</span></CFormLabel>

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