import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { PiBookmarkSimple, PiBooksBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-primary text-white ps-2 p-3 vh-100" style={{ width: '250px' }}>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center gap-3" to={'/admin/dashboard'}><RxDashboard fontSize={25} />Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white d-flex align-items-center gap-3" to={'/admin/courses'}><PiBookmarkSimple fontSize={25} />Courses</Link>
                    </li>


                </ul>
            </div>
            {/* Main Content */}
            <div className="flex-grow-1 p-3">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
