import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEditLectureMutation, useRemoveLectureMutation } from '../../../features/api/courseApi'
const EditLecture = () => {
    const params = useParams()
    const courseid = params.courseId;
    const { lectureId } = params


    const [lectureTitle, setLectureTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState(null)
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

                    setVideoInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id })
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

    const [editLecture, { data, isSuccess, error, isLoading }] = useEditLectureMutation()
    const [removeLecture, { data: removeData, isSuccess: removeSuccess, error: removeError }] = useRemoveLectureMutation();


    const updateLecture = async () => {
        await editLecture({ lectureTitle, isPreviewFree, videoInfo, lectureId })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || 'Lecture Created')
        }
        if (error) {
            toast.error(error.data.message || "Error In Editing")
        }
    }, [isSuccess, error])


    const removeLectureHandler = async () => {
        await removeLecture(lectureId)
    }

    useEffect(() => {
        if (removeSuccess) {
            toast.success(removeData.message || "Lecture Deleted")
        }
        if (removeError) {
            toast.error(removeError.data.message || "Error In Deletion")
        }
    }, [removeSuccess, removeError])



    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex  gap-3 flex-column">
                        <Link to={`/admin/courses/${courseid}/lecture`} className='fs-2 fw-bold'>Back</Link>
                        <h1>Edit Lecture</h1>

                        <div className="card mt-3">
                            <div className="card-body">
                                <button className='btn btn-danger mb-3' onClick={removeLectureHandler}>Remove Lecture</button>
                                <div className="mb-3">
                                    <label htmlFor="" className='form-label'>Title</label>
                                    <input onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} type="text" name="" id="" className='form-control' />
                                </div>
                                <div class="form-check form-switch">
                                    <input value={isPreviewFree} onChange={(e) => setIsPreviewFree(e.target.checked)} class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
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

                                <button className='mt-3 btn btn-primary' onClick={updateLecture}>Update Lecture</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditLecture