import React from 'react'
import CourseCard from './CourseCard'
import { useUserProfileQuery } from '../../features/api/authApi.js'



const Profile = () => {
    const enrollerCourses = [1, 2]
    const { data, isLoading, isError } = useUserProfileQuery()
    console.log(data);

    return (
        <>
            <div className="container">
                <div className="row pt-4 justify-content-center">
                    <div className="col-md-12">
                        <h1 className='fs-2 fw-bold'>PROFILE</h1>
                        <div className="card mt-3">
                            <div className="card-body py-3">
                                <div className="d-flex align-items-start gap-3">
                                    <div className='rounded-circle bg-primary' style={{ width: "100px", height: "100px" }}>
                                        <img src="" className='img-fluid object-fit-cover' alt="" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <h1 className='fs-6'>Name:<span className='fw-medium'>Muhammad Talha</span></h1>
                                        <h1 className='fs-6'>Email:<span>talhaji880@gmail.com</span></h1>
                                        <h1 className='fs-6'>Role:<span>Instructor</span></h1>
                                        <button className='btn btn-primary w-50 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className='fs-2 fw-bold mt-3'>Courses You Are Enrolled In</h1>
                        <div className="row px-0 pt-3">
                            {
                                enrollerCourses.map((index) => (
                                    <CourseCard />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header align-items-center border-0">
                            <div className="d-flex flex-column">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                                <p className='mb-0'>Make Changes To Your Profile Here</p>
                            </div>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="d-flex align-items-center mb-3 justify-content-between">

                                <label className='w-25' htmlFor="name">Name</label>
                                <input type="text" className='form-control' />
                            </div>
                            <div className="d-flex align-items-center mb-3 justify-content-between">

                                <label className='w-25' htmlFor="profile">Profile</label>
                                <input type="file" accept='image/*' className='form-control' />
                            </div>
                        </div>
                        <div class="modal-footer">

                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile