import React from 'react'
import { useNavigate } from 'react-router-dom'
const Courses = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <button className='btn btn-primary fw-bold mb-3' onClick={() => navigate(`create`)}>Create New Course</button>
                    <table class="table table-striped table-hover border">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john.doe@example.com</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jane</td>
                                <td>Smith</td>
                                <td>jane.smith@example.com</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Sam</td>
                                <td>Wilson</td>
                                <td>sam.wilson@example.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Courses