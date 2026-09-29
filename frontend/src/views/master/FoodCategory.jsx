import React, { useMemo, useState } from 'react'
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
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Biryani',
      description: 'Rice based food items',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Drinks',
      description: 'Cold and hot drinks',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Starters',
      description: 'Starter and appetizer items',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Desserts',
      description: 'Sweet and dessert items',
      status: 'Inactive',
    },
  ])

  const [search, setSearch] = useState('')

  // Search filter
  const filteredCategories = useMemo(() => {
    const searchText = search.toLowerCase().trim()

    if (!searchText) {
      return categories
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchText) ||
        category.description.toLowerCase().includes(searchText) ||
        category.status.toLowerCase().includes(searchText),
    )
  }, [categories, search])

  // Delete category
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this food category?',
    )

    if (!confirmDelete) {
      return
    }

    setCategories(
      categories.filter((category) => category.id !== id),
    )
  }

  // Add page - temporarily
  const handleAdd = () => {
    alert('Add Food Category page will be created next.')
  }

  // Edit page - temporarily
  const handleEdit = (id) => {
    alert(`Edit Food Category ID: ${id}`)
  }

  const activeCount = categories.filter(
    (category) => category.status === 'Active',
  ).length

  const inactiveCount = categories.filter(
    (category) => category.status === 'Inactive',
  ).length

  return (
    <>
      {/* Page Header */}

      <CRow className="mb-3">
        <CCol xs={12}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">Food Category</h4>
              <div className="text-body-secondary">
                Manage your restaurant food categories
              </div>
            </div>

            <CButton color="primary" onClick={handleAdd}>
              <CIcon icon={cilPlus} className="me-1" />
              Add Food Category
            </CButton>
          </div>
        </CCol>
      </CRow>

      {/* Summary Cards */}

      <CRow className="mb-4">
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

      {/* Category List */}

      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between align-items-center">
                <strong>Category List</strong>

                <span className="text-body-secondary small">
                  {filteredCategories.length} record(s)
                </span>
              </div>
            </CCardHeader>

            <CCardBody>
              {/* Search */}

              <CRow className="mb-3">
                <CCol md={6} lg={4}>
                  <CInputGroup>
                    <CInputGroupText>
                      <CIcon icon={cilSearch} />
                    </CInputGroupText>

                    <CFormInput
                      placeholder="Search category..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>

              {/* Table */}

              {filteredCategories.length > 0 ? (
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
                        <CTableRow key={category.id}>
                          <CTableDataCell>
                            {index + 1}
                          </CTableDataCell>

                          <CTableDataCell>
                            <strong>
                              {category.name}
                            </strong>
                          </CTableDataCell>

                          <CTableDataCell>
                            <span className="text-body-secondary">
                              {category.description}
                            </span>
                          </CTableDataCell>

                          <CTableDataCell>
                            {category.status === 'Active' ? (
                              <CBadge color="success">
                                Active
                              </CBadge>
                            ) : (
                              <CBadge color="secondary">
                                Inactive
                              </CBadge>
                            )}
                          </CTableDataCell>

                          <CTableDataCell>
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
                <CAlert color="warning" className="mb-0">
                  No food category found.
                </CAlert>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default FoodCategory