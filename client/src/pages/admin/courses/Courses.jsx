import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGetCreatorCoursesQuery } from '../../../features/api/courseApi'
const Courses = () => {
    const { data, isLoading } = useGetCreatorCoursesQuery()
    const navigate = useNavigate()

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">

                        <button className='btn btn-primary fw-bold mb-3' onClick={() => navigate(`create`)}>Create New Course</button>
                        {isLoading && <h1 className='mt-4'>Courses Loading...</h1>}
                        <table class="table table-striped table-hover border">
                            <thead>
                                <tr>

                                    <th scope="col">Title</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.map((course) => (
                                        <tr className='align-middle' key={course._id}>

                                            <td>{course?.courseTitle}</td>
                                            <td>Rs.{course?.coursePrice || 'NA'}</td>
                                            <td>
                                                <span className={course.isPublished ? 'badge bg-success' : 'badge bg-danger'}>
                                                    {course.isPublished ? "Published" : "Not Published"}
                                                </span>
                                            </td>
                                            <td><Link className='btn btn-primary' to={`${course._id}`}>Edit</Link></td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Courses