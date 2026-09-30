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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    // Frontend validation
    if (!categoryName.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        'http://localhost:5000/api/food-categories',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: categoryName.trim(),
            description: description.trim(),
            status: Number(status),
          }),
        },
      )

      const result = await response.json()

      console.log(result)

      if (!response.ok || !result.success) {
        setError(result.message || 'Category insert failed')
        return
      }

      // Success
      navigate('/master/food-category', {
        state: {
          successMessage: result.message,
        },
      })
    } catch (err) {
      console.error(err)
      setError('Category insert failed')
    } finally {
      setLoading(false)
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

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <CForm onSubmit={handleSubmit}>
              <CRow>

                {/* Category Name */}
                <CCol md={6} className="mb-3">
                  <CFormLabel>
                    Category Name{' '}
                    <span className="text-danger">*</span>
                  </CFormLabel>

                  <CFormInput
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) =>
                      setCategoryName(e.target.value)
                    }
                  />
                </CCol>

                {/* Status */}
                <CCol md={6} className="mb-3">
                  <CFormLabel>
                    Status
                  </CFormLabel>

                  <CFormSelect
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </CFormSelect>
                </CCol>

                {/* Description */}
                <CCol xs={12} className="mb-3">
                  <CFormLabel>
                    Description
                  </CFormLabel>

                  <CFormTextarea
                    rows={4}
                    placeholder="Enter category description"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                  />
                </CCol>

              </CRow>

              {/* Buttons */}
              <div className="d-flex gap-2">

                <CButton
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </CButton>

                <CButton
                  color="secondary"
                  type="button"
                  onClick={() =>
                    navigate('/master/food-category')
                  }
                >
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