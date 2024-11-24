import React, { useEffect } from 'react'
import { FaSchool } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../features/api/authApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const [logoutUser, { isSuccess, data }] = useLogoutUserMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logoutUser();
    }


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || 'User Logout')
            navigate('/login')
        }
    }, [isSuccess])
    return (
        <nav class="navbar navbar-expand-lg bg-white border border-botom">
            <div class="container">
                <Link to={'/'} class="navbar-brand d-flex align-items-center gap-3" href="#"><FaSchool className='display-6' />E-Learing</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse pe-lg-5" id="navbarSupportedContent">
                    {
                        isAuthenticated ? <div class="dropdown dropdown-center ms-auto">
                            <div
                                class="rounded-circle  overflow-hidden"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ width: "50px", height: "50px", cursor: "pointer" }}>
                                <img src={user?.profile_image} alt="" class="img-fluid object-fit-cover" />
                            </div>
                            <ul class="dropdown-menu mt-2">
                                <li><Link class="dropdown-item" to={'/my-learning'}>My Learning</Link></li>
                                <li><Link class="dropdown-item" to={'/profile'}>Edit Profile</Link></li>
                                <li onClick={handleLogout}><Link class="dropdown-item" href="#">Logout</Link></li>

                                {
                                    user?.role === "instructor" && (
                                        <>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="mx-2">
                                                <Link className="btn btn-primary w-100">Dashboard</Link>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div> :
                            <Link to={'/login'} className='btn btn-primary rounded-3 fw-bold ms-auto'>Login</Link>

                    }




                </div>
            </div>
        </nav>
    )
}

export default Navbar