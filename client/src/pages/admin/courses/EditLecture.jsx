import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const EditLecture = () => {
    const params = useParams()
    const courseid = params.courseId;

    const [title, setTitle] = useState('')
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isPreviewFree, setIsPreviewFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true)

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file)
            setMediaProgress(true)
            try {
                const res = await axios.post('http://localhost:4000/api/media//media-upload', formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total))
                    }
                })
                if (res.data.success) {
                    console.log(res)
                    setUploadVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id })
                    setBtnDisable(false)
                    toast.success("File Uploaded")
                }
            } catch (error) {
                console.log(error)
                toast.error(error)
            } finally {
                setMediaProgress(false)
            }
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex  gap-3 flex-column">
                        <Link to={`/admin/courses/${courseid}/lecture`} className='fs-2 fw-bold'>Back</Link>
                        <h1>Edit Lecture</h1>

                        <div className="card mt-3">
                            <div className="card-body">
                                <button className='btn btn-danger mb-3'>Remove Lecture</button>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Title</label>
                                    <input type="text" name="" id="" className='form-control' />
                                </div>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label class="form-check-label" for="flexSwitchCheckDefault">is this lecture is free?</label>
                                </div>
                                <div className='mt-3'>
                                    <input type="file" onChange={fileChangeHandler} accept='video/*' className='form-control' name="" id="" />
                                </div>
                                {
                                    mediaProgress && (
                                        <div className="mt-3 d-flex flex-column">
                                            <div
                                                className="progress"
                                                role="progressbar"
                                                aria-label="Upload Progress"
                                            >
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: `${uploadProgress}%` }}
                                                >

                                                </div>
                                            </div>
                                            <p>{uploadProgress}% Uploaded</p>
                                        </div>
                                    )
                                }

                                <button className='mt-3 btn btn-primary'>Update Lecture</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLecture