import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextEditor from '../../../components/TextEditor'
import { Navigate } from 'react-router-dom'

const EditCourse = () => {
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        category: "",
        description: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    })

    const [previewThumbnail, setpreviewThumbnail] = useState('')

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

    }

    const handleCategoryChange = (value) => {
        setInput({ ...input, category: value })
    }

    const handleCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const reader = new FileReader;
            reader.onloadend = () => setpreviewThumbnail(reader.result)
            reader.readAsDataURL(file);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className='fs-3'>Add Detail Information Regarding Course</h1>
                        <Link className='btn btn-primary'>Go To Lecture Page</Link>
                    </div>
                    <div className="card rounded-3 p-3 shadow-none border mt-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex flex-column">
                                    <h3>Basic Information</h3>
                                    <p>Make Changes To Your Course Here.Click Save When You're Done.</p>
                                </div>
                                <div>
                                    <button className='btn btn-outline-dark'>Unpublished</button>
                                    <button className='btn btn-primary ms-2'>Remove Course</button>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className='form-label' htmlFor="">Title</label>
                                <input type="text" onChange={handleChange} value={input.courseTitle} name="courseTitle" className='form-control' id="" />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="">Subtitle</label>
                                <input type="text" onChange={handleChange} value={input.subTitle} name="subTitle" className='form-control' id="" />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="">Description</label>
                                <TextEditor input={input} setInput={setInput} />
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <div className="form-group mt-4 mb-3">
                                        <label htmlFor="category" name="category" className='form-label'>Category</label>
                                        <select name="category" onChange={handleCategoryChange} className='form-select' placeholder='Select Category'>
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
                                </div>
                                <div className="col-3">
                                    <div className="form-group mt-4 mb-3">
                                        <label htmlFor="category" name="courseLevel" className='form-label'>Course Level</label>
                                        <select name="courseLevel" onChange={handleCourseLevel} className='form-select' placeholder='Select Category'>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Advanced">Advanced</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group mt-4 mb-3">
                                        <label htmlFor="category" onChange={handleChange} className='form-label'>Price in (PKR)</label>
                                        <input type="number" className='form-control' name="coursePrice" id="" />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formFile" className="form-label">Course Thumbnail</label>
                                <input className="form-control" onChange={selectThumbnail} accept='image/*' type="file" id="formFile" />

                                {
                                    previewThumbnail && (
                                        <img src={previewThumbnail} alt="preview image" className='rounded-3' style={{ width: "120px", height: '120px' }} />
                                    )
                                }
                            </div>
                            <div>
                                <button onClick={() => navigate('/admin/courses')} className='btn btn-danger'>Cancel</button>
                                <button className='btn btn-primary ms-2'>
                                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCourse