import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextEditor from '../../../components/TextEditor'
import { useEditCourseMutation, useGetSingleCourseQuery } from '../../../features/api/courseApi'
import { toast } from 'react-toastify'


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

    const params = useParams()
    const courseId = params.courseId
    const [previewThumbnail, setpreviewThumbnail] = useState('')

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

    }

    const handleCategoryChange = (e) => {
        setInput({ ...input, category: e.target.value });
    };

    const handleCourseLevel = (e) => {
        setInput({ ...input, courseLevel: e.target.value });
    };


    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const reader = new FileReader;
            reader.onloadend = () => setpreviewThumbnail(reader.result)
            reader.readAsDataURL(file);
        }
    }

    const [editCourse, { data, error, isLoading, isSuccess }] = useEditCourseMutation()
    const { data: courseByIdData } = useGetSingleCourseQuery(courseId, { refetchOnMountOrArgChange: true })

    const submitEditForm = async () => {
        const formData = new FormData();

        formData.append('courseTitle', input.courseTitle)
        formData.append('subTitle', input.subTitle)
        formData.append('category', input.category)
        formData.append('courseLevel', input.courseLevel)
        formData.append('coursePrice', input.coursePrice)
        formData.append('description', input.description)
        formData.append('courseThumbnail', input.courseThumbnail)

        await editCourse({ formData, courseId })
    }


    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                category: course.category,
                description: course.description,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: '',
            });
        }
    }, [courseByIdData]);


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.messasge || 'Course Updated')
            navigate('/admin/courses')
        }
        if (error) {
            toast.error(error.data.messasge || "Error")
        }

    }, [isSuccess, error])


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className='fs-3'>Add Detail Information Regarding Course</h1>
                        <Link className='btn btn-primary' to={`/admin/courses/${courseId}/lecture`}>Go To Lecture Page</Link>
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
                                        <select name="category" value={input.category} onChange={handleCategoryChange} className='form-select' placeholder='Select Category'>
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
                                        <select name="courseLevel" value={input.courseLevel} onChange={handleCourseLevel} className='form-select' placeholder='Select Category'>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Advanced">Advanced</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="form-group mt-4 mb-3">
                                        <label htmlFor="category" className='form-label'>Price in (PKR)</label>
                                        <input type="number" onChange={handleChange} value={input.coursePrice} className='form-control' name="coursePrice" id="" />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="formFile" className="form-label">Course Thumbnail</label>
                                <input className="form-control" onChange={selectThumbnail} accept='image/*' type="file" id="formFile" />

                                {
                                    previewThumbnail && (
                                        <img src={previewThumbnail} alt="preview image" className='rounded-3 mt-4' style={{ width: "300px", height: '200px' }} />
                                    )
                                }
                            </div>
                            <div>
                                <button onClick={() => navigate('/admin/courses')} className='btn btn-danger'>Cancel</button>
                                <button onClick={submitEditForm} className='btn btn-primary ms-2'>
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status" className="ms-2">Saving...</span>
                                        </>
                                    ) : (
                                        "Save"
                                    )}
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