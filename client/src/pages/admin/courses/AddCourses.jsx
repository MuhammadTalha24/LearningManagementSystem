import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
const AddCourses = () => {
    const [courseTitle, setCourseTitle] = useState('')
    const [category, setCategory] = useState('')
    const navigate = useNavigate();

    const createCourseHandler = async () => {
        console.log(category, courseTitle)
    }

    const getSelectedCategory = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className='display-6 fw-bold'>Add New Courses</h1>

                    <div className="form-group mt-4 mb-3">
                        <label htmlFor="courseTitle" className='form-label'>Title</label>
                        <input className='form-control' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} type="text" name='courseTitle' placeholder='Course Name' />
                    </div>
                    <div className="form-group mt-4 mb-3">
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select onChange={getSelectedCategory} name="category" className='form-select' placeholder='Select Category'>
                            <option value="Next Js">Next Js</option>
                            <option value="Frontend Development">Frontend Development</option>
                            <option value="Backend Development">Backend Development</option>
                            <option value="MERN Stack">MERN Stack</option>
                            <option value="MongoDB">MongoDB</option>
                            <option value="Docker">Docker</option>
                            <option value="Laravel & Vue">Laravel & Vue</option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>
                    <div className="d-flex gap-3">
                        <button onClick={() => navigate(`/admin/courses`)} className='btn btn-outline-primary fw-medium'>Cancel</button>
                        <button className='btn btn-primary' onClick={createCourseHandler}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourses