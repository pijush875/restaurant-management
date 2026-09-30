import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import {
  cilPencil,
  cilPlus,
  cilSearch,
  cilTrash,
} from '@coreui/icons'


const FoodCategory = () => {

  const navigate = useNavigate()
  const location = useLocation()


  // =========================
  // State
  // =========================

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || '',
  )


  // =========================
  // Fetch Categories
  // =========================

  useEffect(() => {

    fetch('http://localhost:5000/api/food-categories')

      .then((response) => {

        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }

        return response.json()
      })

      .then((result) => {

        if (result.success) {

          setCategories(result.data)

        } else {

          setError(
            result.message || 'Failed to fetch categories',
          )
        }
      })

      .catch((err) => {

        console.error(err)

        setError('Unable to load food categories')
      })

      .finally(() => {

        setLoading(false)
      })

  }, [])


  // =========================
  // Search Filter
  // =========================

  const filteredCategories = useMemo(() => {

    const searchText = search.toLowerCase().trim()

    if (!searchText) {
      return categories
    }

    return categories.filter(
      (category) =>
        category.name
          ?.toLowerCase()
          .includes(searchText) ||

        category.description
          ?.toLowerCase()
          .includes(searchText) ||

        String(category.status)
          .toLowerCase()
          .includes(searchText),
    )

  }, [categories, search])


  // =========================
  // Delete Category
  // Temporary
  // =========================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this food category?',
    )

    if (!confirmDelete) {
      return
    }

    setCategories(
      categories.filter(
        (category) => category.id !== id,
      ),
    )
  }


  // =========================
  // Edit Category
  // Temporary
  // =========================

  const handleEdit = (id) => {

    alert(`Edit Food Category ID: ${id}`)
  }


  // =========================
  // Category Counts
  // =========================

  const activeCount = categories.filter(
    (category) => category.status === 1,
  ).length


  const inactiveCount = categories.filter(
    (category) => category.status === 0,
  ).length


  // =========================
  // UI
  // =========================

  return (
    <>

      {/* =========================
          Success Message
      ========================= */}

      {successMessage && (
        <CAlert
          color="success"
          dismissible
          onClose={() => setSuccessMessage('')}
        >
          {successMessage}
        </CAlert>
      )}


      {/* =========================
          Page Header
      ========================= */}

      <CRow className="mb-3">

        <CCol xs={12}>

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h4 className="mb-1">
                Food Category
              </h4>

              <div className="text-body-secondary">
                Manage your restaurant food categories
              </div>

            </div>


            <CButton
              color="primary"
              onClick={() =>
                navigate('/master/food-category/create')
              }
            >

              <CIcon
                icon={cilPlus}
                className="me-1"
              />

              Add Food Category

            </CButton>

          </div>

        </CCol>

      </CRow>


      {/* =========================
          Summary Cards
      ========================= */}

      <CRow className="mb-4">


        {/* Total */}

        <CCol sm={6} lg={4}>

          <CCard className="h-100">

            <CCardBody>

              <div className="text-body-secondary mb-1">
                Total Categories
              </div>

              <h3 className="mb-0">
                {categories.length}
              </h3>

            </CCardBody>

          </CCard>

        </CCol>


        {/* Active */}

        <CCol sm={6} lg={4}>

          <CCard className="h-100">

            <CCardBody>

              <div className="text-body-secondary mb-1">
                Active Categories
              </div>

              <h3 className="mb-0 text-success">
                {activeCount}
              </h3>

            </CCardBody>

          </CCard>

        </CCol>


        {/* Inactive */}

        <CCol sm={6} lg={4}>

          <CCard className="h-100">

            <CCardBody>

              <div className="text-body-secondary mb-1">
                Inactive Categories
              </div>

              <h3 className="mb-0 text-secondary">
                {inactiveCount}
              </h3>

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>


      {/* =========================
          Category List
      ========================= */}

      <CRow>

        <CCol xs={12}>

          <CCard>

            {/* Card Header */}

            <CCardHeader>

              <div className="d-flex justify-content-between align-items-center">

                <strong>
                  Category List
                </strong>

                <span className="text-body-secondary small">
                  {filteredCategories.length} record(s)
                </span>

              </div>

            </CCardHeader>


            <CCardBody>


              {/* =========================
                  Loading
              ========================= */}

              {loading && (
                <div className="text-center py-4">
                  Loading categories...
                </div>
              )}


              {/* =========================
                  Error
              ========================= */}

              {error && (
                <CAlert
                  color="danger"
                  className="mb-3"
                >
                  {error}
                </CAlert>
              )}


              {/* =========================
                  Search
              ========================= */}

              {!loading && !error && (

                <CRow className="mb-3">

                  <CCol md={6} lg={4}>

                    <CInputGroup>

                      <CInputGroupText>

                        <CIcon
                          icon={cilSearch}
                        />

                      </CInputGroupText>


                      <CFormInput
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />

                    </CInputGroup>

                  </CCol>

                </CRow>

              )}


              {/* =========================
                  Table
              ========================= */}

              {!loading &&
              !error &&
              filteredCategories.length > 0 ? (

                <CTable
                  hover
                  responsive
                  bordered
                  align="middle"
                  className="mb-0"
                >

                  <CTableHead>

                    <CTableRow>

                      <CTableHeaderCell width="70">
                        #
                      </CTableHeaderCell>

                      <CTableHeaderCell>
                        Name
                      </CTableHeaderCell>

                      <CTableHeaderCell>
                        Description
                      </CTableHeaderCell>

                      <CTableHeaderCell width="120">
                        Status
                      </CTableHeaderCell>

                      <CTableHeaderCell width="180">
                        Action
                      </CTableHeaderCell>

                    </CTableRow>

                  </CTableHead>


                  <CTableBody>

                    {filteredCategories.map(
                      (category, index) => (

                        <CTableRow
                          key={category.id}
                        >


                          {/* Number */}

                          <CTableDataCell>
                            {index + 1}
                          </CTableDataCell>


                          {/* Name */}

                          <CTableDataCell>

                            <strong>
                              {category.name}
                            </strong>

                          </CTableDataCell>


                          {/* Description */}

                          <CTableDataCell>

                            <span className="text-body-secondary">

                              {category.description || '-'}

                            </span>

                          </CTableDataCell>


                          {/* Status */}

                          <CTableDataCell>

                            {category.status === 1 ? (

                              <CBadge color="success">
                                Active
                              </CBadge>

                            ) : (

                              <CBadge color="secondary">
                                Inactive
                              </CBadge>

                            )}

                          </CTableDataCell>


                          {/* Actions */}

                          <CTableDataCell>


                            {/* Edit */}

                            <CButton
                              color="info"
                              variant="outline"
                              size="sm"
                              className="me-2"
                              onClick={() =>
                                handleEdit(category.id)
                              }
                            >

                              <CIcon
                                icon={cilPencil}
                                className="me-1"
                              />

                              Edit

                            </CButton>


                            {/* Delete */}

                            <CButton
                              color="danger"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDelete(category.id)
                              }
                            >

                              <CIcon
                                icon={cilTrash}
                                className="me-1"
                              />

                              Delete

                            </CButton>

                          </CTableDataCell>

                        </CTableRow>

                      ),
                    )}

                  </CTableBody>

                </CTable>

              ) : (

                !loading &&
                !error && (

                  <CAlert
                    color="warning"
                    className="mb-0"
                  >
                    No food category found.
                  </CAlert>

                )

              )}

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>

    </>
  )
}


export default FoodCategory