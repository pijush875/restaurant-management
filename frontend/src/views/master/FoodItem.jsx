import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSwitch,
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


const FoodItem = () => {

  const navigate = useNavigate()
  const location = useLocation()


  // =========================
  // State
  // =========================

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || '',
  )


  // =========================
  // Fetch Food Items
  // =========================

  useEffect(() => {

    fetchItems()

  }, [])


  const fetchItems = async () => {

    try {

      setLoading(true)
      setError('')

      const response = await fetch(
        'http://localhost:5000/api/food-items'
      )


      if (!response.ok) {

        throw new Error(
          'Failed to fetch food items'
        )

      }


      const result = await response.json()


      console.log(
        'Food Item List Response:',
        result
      )


      if (result.success) {

        setItems(result.data || [])

      } else {

        setError(
          result.message ||
          'Failed to fetch food items'
        )

      }

    } catch (err) {

      console.error(
        'Food Item Fetch Error:',
        err
      )

      setError(
        err.message ||
        'Unable to load food items'
      )

    } finally {

      setLoading(false)

    }

  }


  // =========================
  // Search Filter
  // =========================

  const filteredItems = useMemo(() => {

    const searchText =
      search.toLowerCase().trim()


    if (!searchText) {

      return items

    }


    return items.filter(
      (item) =>

        item.name
          ?.toLowerCase()
          .includes(searchText) ||

        item.description
          ?.toLowerCase()
          .includes(searchText) ||

        String(item.category_id)
          .includes(searchText) ||

        String(item.price)
          .includes(searchText) ||

        (
          Number(item.status) === 1
            ? 'active'
            : 'inactive'
        ).includes(searchText)
    )

  }, [items, search])


  // =========================
  // Delete Food Item
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this food item?'
    )


    if (!confirmDelete) {

      return

    }


    try {

      setError('')


      const response = await fetch(
        `http://localhost:5000/api/food-items/${id}`,
        {
          method: 'DELETE',
        }
      )


      const responseText =
        await response.text()


      console.log(
        'Delete Status:',
        response.status
      )

      console.log(
        'Delete Response:',
        responseText
      )


      let data


      try {

        data = JSON.parse(
          responseText
        )

      } catch (jsonError) {

        console.error(
          'JSON Parse Error:',
          jsonError
        )

        throw new Error(
          `Backend JSON response দেয়নি: ${responseText}`
        )

      }


      if (!response.ok || !data.success) {

        throw new Error(
          data.message ||
          'Failed to delete food item'
        )

      }


      // =========================
      // Remove From List
      // =========================

      setItems(
        (previousItems) =>
          previousItems.filter(
            (item) =>
              item.id !== id
          )
      )


      // =========================
      // Success Message
      // =========================

      setSuccessMessage(
        data.message ||
        'Food item deleted successfully'
      )


    } catch (err) {

      console.error(
        'Delete Error:',
        err
      )

      setError(
        err.message ||
        'Unable to delete food item'
      )

    }

  }


  // =========================
  // Toggle Food Item Status
  // =========================

  const handleStatusToggle = async (
    id,
    currentStatus
  ) => {

    const newStatus =
      Number(currentStatus) === 1
        ? 0
        : 1


    try {

      setError('')


      const response = await fetch(
        `http://localhost:5000/api/food-items/${id}/status`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )


      const responseText =
        await response.text()


      console.log(
        'Status Update Status:',
        response.status
      )

      console.log(
        'Status Update Response:',
        responseText
      )


      let data


      try {

        data = JSON.parse(
          responseText
        )

      } catch (jsonError) {

        console.error(
          'JSON Parse Error:',
          jsonError
        )

        throw new Error(
          `Backend JSON response দেয়নি: ${responseText}`
        )

      }


      if (!response.ok || !data.success) {

        throw new Error(
          data.message ||
          'Failed to update food item status'
        )

      }


      // =========================
      // Update List
      // =========================

      setItems(
        (previousItems) =>
          previousItems.map(
            (item) =>

              item.id === id
                ? {
                    ...item,
                    status: newStatus,
                  }
                : item
          )
      )


      // =========================
      // Success Message
      // =========================

      setSuccessMessage(
        data.message ||
        'Food item status updated successfully'
      )


    } catch (err) {

      console.error(
        'Status Update Error:',
        err
      )

      setError(
        err.message ||
        'Unable to update food item status'
      )

    }

  }


  // =========================
  // Edit Food Item
  // =========================

  const handleEdit = (id) => {

    navigate(
      `/master/food-item/edit/${id}`
    )

  }


  // =========================
  // Food Item Counts
  // =========================

  const activeCount =
    items.filter(
      (item) =>
        Number(item.status) === 1
    ).length


  const inactiveCount =
    items.filter(
      (item) =>
        Number(item.status) === 0
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
          onClose={() =>
            setSuccessMessage('')
          }
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
                Food Item
              </h4>

              <div className="text-body-secondary">

                Manage your restaurant food
                items

              </div>

            </div>


            <CButton
              color="primary"
              onClick={() =>
                navigate(
                  '/master/food-item/create'
                )
              }
            >

              <CIcon
                icon={cilPlus}
                className="me-1"
              />

              Add Food Item

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

                Total Food Items

              </div>

              <h3 className="mb-0">

                {items.length}

              </h3>

            </CCardBody>

          </CCard>

        </CCol>


        {/* Active */}

        <CCol sm={6} lg={4}>

          <CCard className="h-100">

            <CCardBody>

              <div className="text-body-secondary mb-1">

                Active Food Items

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

                Inactive Food Items

              </div>

              <h3 className="mb-0 text-secondary">

                {inactiveCount}

              </h3>

            </CCardBody>

          </CCard>

        </CCol>

      </CRow>


      {/* =========================
          Food Item List
      ========================= */}

      <CRow>

        <CCol xs={12}>

          <CCard>


            {/* Card Header */}

            <CCardHeader>

              <div className="d-flex justify-content-between align-items-center">

                <strong>
                  Food Item List
                </strong>

                <span className="text-body-secondary small">

                  {filteredItems.length}
                  {' '}
                  record(s)

                </span>

              </div>

            </CCardHeader>


            <CCardBody>


              {/* =========================
                  Loading
              ========================= */}

              {loading && (

                <div className="text-center py-4">

                  Loading food items...

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

              {!loading &&
              !error && (

                <CRow className="mb-3">

                  <CCol
                    md={6}
                    lg={4}
                  >

                    <CInputGroup>

                      <CInputGroupText>

                        <CIcon
                          icon={cilSearch}
                        />

                      </CInputGroupText>


                      <CFormInput
                        placeholder="Search food item..."
                        value={search}
                        onChange={(e) =>
                          setSearch(
                            e.target.value
                          )
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
              filteredItems.length > 0 ? (

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

                        Category ID

                      </CTableHeaderCell>


                      <CTableHeaderCell>

                        Description

                      </CTableHeaderCell>


                      <CTableHeaderCell>

                        Price

                      </CTableHeaderCell>


                      <CTableHeaderCell width="140">

                        Status

                      </CTableHeaderCell>


                      <CTableHeaderCell width="180">

                        Action

                      </CTableHeaderCell>

                    </CTableRow>

                  </CTableHead>


                  <CTableBody>

                    {filteredItems.map(
                      (item, index) => (

                        <CTableRow
                          key={item.id}
                        >


                          {/* Number */}

                          <CTableDataCell>

                            {index + 1}

                          </CTableDataCell>


                          {/* Name */}

                          <CTableDataCell>

                            <strong>

                              {item.name}

                            </strong>

                          </CTableDataCell>


                          {/* Category ID */}

                          <CTableDataCell>

                            {item.category_id}

                          </CTableDataCell>


                          {/* Description */}

                          <CTableDataCell>

                            <span className="text-body-secondary">

                              {item.description ||
                                '-'}

                            </span>

                          </CTableDataCell>


                          {/* Price */}

                          <CTableDataCell>

                            ₹{item.price}

                          </CTableDataCell>


                          {/* Status Toggle */}

                          <CTableDataCell>

                            <div className="d-flex align-items-center">

                              <CFormSwitch
                                size="lg"
                                checked={
                                  Number(
                                    item.status
                                  ) === 1
                                }
                                onChange={() =>
                                  handleStatusToggle(
                                    item.id,
                                    Number(
                                      item.status
                                    )
                                  )
                                }
                              />


                              <span
                                className={
                                  Number(
                                    item.status
                                  ) === 1
                                    ? 'text-success ms-2'
                                    : 'text-secondary ms-2'
                                }
                              >

                                {Number(
                                  item.status
                                ) === 1
                                  ? 'Active'
                                  : 'Inactive'}

                              </span>

                            </div>

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
                                handleEdit(
                                  item.id
                                )
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
                                handleDelete(
                                  item.id
                                )
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

                    No food item found.

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


export default FoodItem
