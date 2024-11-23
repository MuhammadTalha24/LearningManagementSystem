import React from 'react'
import { FaSchool } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-white border border-botom">
            <div class="container">
                <Link to={'/'} class="navbar-brand d-flex align-items-center gap-3" href="#"><FaSchool className='display-6' />E-Learing</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse pe-lg-5" id="navbarSupportedContent">
                    <div class="dropdown dropdown-center ms-auto">
                        <button
                            class="rounded-circle bg-primary border-0 "
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ width: "50px", height: "50px" }}>
                            <img src="" alt="" class="w-100 h-100 rounded-circle" />
                        </button>
                        <ul class="dropdown-menu mt-2">
                            <li><Link class="dropdown-item" to={'/my-learning'}>My Learning</Link></li>
                            <li><Link class="dropdown-item" to={'/profile'}>Edit Profile</Link></li>
                            <li><Link class="dropdown-item" href="#">Logout</Link></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li className='mx-2'><Link className='btn btn-primary w-100'>Dashboard</Link></li>
                        </ul>
                    </div>




                </div>
            </div>
        </nav>
    )
}

export default Navbar