import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CNavItem,
    CNavTitle
} from "@coreui/react";

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import FoodCategory from "./pages/FoodCategory";


function App() {

    return (
        <BrowserRouter>

            <CSidebar visible>

                <CSidebarBrand>
                    🍽 Restaurant Management
                </CSidebarBrand>

                <CSidebarNav>

                    <CNavItem>
                        <Link to="/">
                            🏠 Dashboard
                        </Link>
                    </CNavItem>


                    <CNavTitle>
                        Master
                    </CNavTitle>

                    <CNavItem>
                        <Link to="/food-category">
                            🍔 Food Category
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            🍗 Food
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            👤 Customer
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            👨‍💼 Employee
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            🪑 Restaurant Table
                        </Link>
                    </CNavItem>


                    <CNavTitle>
                        Transaction
                    </CNavTitle>

                    <CNavItem>
                        <Link to="#">
                            📅 Table Booking
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            🍽 Food Order
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            🧾 Invoice
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            💳 Payment
                        </Link>
                    </CNavItem>


                    <CNavTitle>
                        Reports
                    </CNavTitle>

                    <CNavItem>
                        <Link to="#">
                            📊 Sales Report
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            📈 Food Sales
                        </Link>
                    </CNavItem>

                    <CNavItem>
                        <Link to="#">
                            📋 Booking Report
                        </Link>
                    </CNavItem>

                </CSidebarNav>

            </CSidebar>


            <div>

                <CHeader>
                    <CContainer fluid>

                        <CHeaderBrand>
                            Restaurant Management
                        </CHeaderBrand>

                    </CContainer>
                </CHeader>


                <CContainer className="p-4">

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/food-category"
                            element={<FoodCategory />}
                        />

                    </Routes>

                </CContainer>

            </div>

        </BrowserRouter>
    );
}

export default App;
