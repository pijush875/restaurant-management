import React from 'react'
import MainChart from './MainChart'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
  cilCart,
  cilCalendar,
  cilDollar,
  cilBuilding,
} from '@coreui/icons'

const Dashboard = () => {
  return (
    <>
      {/* Dashboard Cards */}
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <CCard className="border-start border-start-4 border-start-info">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-body-secondary">Today's Sales</div>
                  <div className="fs-4 fw-semibold">₹12,450</div>
                </div>

                <CIcon icon={cilDollar} size="xl" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-start border-start-4 border-start-success">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-body-secondary">Today's Orders</div>
                  <div className="fs-4 fw-semibold">48</div>
                </div>

                <CIcon icon={cilCart} size="xl" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-start border-start-4 border-start-warning">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-body-secondary">Today's Bookings</div>
                  <div className="fs-4 fw-semibold">12</div>
                </div>

                <CIcon icon={cilCalendar} size="xl" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="border-start border-start-4 border-start-primary">
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-body-secondary">Available Tables</div>
                  <div className="fs-4 fw-semibold">8 / 15</div>
                </div>

                <CIcon icon={cilBuilding} size="xl" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Sales Overview */}
      <CRow className="mb-4">
        <CCol lg={8}>
          <CCard>
            <CCardHeader>
              <strong>Sales Overview</strong>
            </CCardHeader>

            <CCardBody>
              <MainChart />
              <div className="d-flex justify-content-between mb-3">
                <span>Today's Sales</span>
                <strong>₹12,450</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>This Week</span>
                <strong>₹78,650</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>This Month</span>
                <strong>₹2,45,800</strong>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard>
            <CCardHeader>
              <strong>Top Selling Food</strong>
            </CCardHeader>

            <CCardBody>
              <div className="d-flex justify-content-between mb-3">
                <span>Chicken Biryani</span>
                <strong>35</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Chicken Tikka</span>
                <strong>28</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Butter Naan</span>
                <strong>24</strong>
              </div>

              <div className="d-flex justify-content-between">
                <span>Paneer Butter Masala</span>
                <strong>18</strong>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Recent Orders */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Recent Orders</strong>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Order ID</CTableHeaderCell>
                    <CTableHeaderCell>Customer</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>#ORD001</CTableDataCell>
                    <CTableDataCell>Rahul Das</CTableDataCell>
                    <CTableDataCell>DINE IN</CTableDataCell>
                    <CTableDataCell>₹850</CTableDataCell>
                    <CTableDataCell>
  <span className="badge bg-success">Completed</span>
</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell>#ORD002</CTableDataCell>
                    <CTableDataCell>Priya Roy</CTableDataCell>
                    <CTableDataCell>PARCEL</CTableDataCell>
                    <CTableDataCell>₹520</CTableDataCell>
                    <CTableDataCell>
  <span className="badge bg-warning text-dark">Pending</span>
</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell>#ORD003</CTableDataCell>
                    <CTableDataCell>Amit Ghosh</CTableDataCell>
                    <CTableDataCell>DINE IN</CTableDataCell>
                    <CTableDataCell>₹1,250</CTableDataCell>
                    <CTableDataCell>
  <span className="badge bg-info text-dark">Preparing</span>
</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Recent Bookings */}
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Recent Table Bookings</strong>
            </CCardHeader>

            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Booking ID</CTableHeaderCell>
                    <CTableHeaderCell>Customer</CTableHeaderCell>
                    <CTableHeaderCell>Table</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Time</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>#BK001</CTableDataCell>
                    <CTableDataCell>Rahul Das</CTableDataCell>
                    <CTableDataCell>Table 05</CTableDataCell>
                    <CTableDataCell>28 Sep 2026</CTableDataCell>
                    <CTableDataCell>7:30 PM</CTableDataCell>
                    <CTableDataCell>
  <span className="badge bg-success">Confirmed</span>
</CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell>#BK002</CTableDataCell>
                    <CTableDataCell>Priya Roy</CTableDataCell>
                    <CTableDataCell>Table 03</CTableDataCell>
                    <CTableDataCell>28 Sep 2026</CTableDataCell>
                    <CTableDataCell>8:00 PM</CTableDataCell>
                    <CTableDataCell>
  <span className="badge bg-warning text-dark">Pending</span>
</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard