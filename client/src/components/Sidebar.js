import React from 'react'
import {Link,useLocation} from 'react-router-dom'

function Sidebar() {
    let location=useLocation();
    return (
        <div className="sidebar bg-dark">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width:"280px"}}>
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-4 ">Food Ordering System</span>
                </Link>
                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className={`nav-link ${location.pathname==="/dashboard" ? "active" : "text-white"}`} aria-current="page">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" className={`nav-link ${location.pathname==="/orders" ? "active" : "text-white"}`}>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/foodmenu" className={`nav-link ${location.pathname==="/foodmenu" ? "active" : "text-white"}`}>
                            Food Menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav-link text-white">
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav-link text-white">
                            Reports
                        </Link>
                    </li>
                </ul>
                <hr/>
                <div className="dropdown ">
                    <Link to="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <strong className="mx-3">Bhavin Babariya</strong>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><Link className="dropdown-item" to="/">Add New Admin</Link></li>
                        <li><Link className="dropdown-item" to="/">Settings</Link></li>
                        <li><Link className="dropdown-item" to="/">Profile</Link></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><Link className="dropdown-item" to="/">Sign out</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar
