import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLectureMutation } from '../../../features/api/courseApi';
import { toast } from 'react-toastify'
const AddLectures = () => {
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState('');
    const params = useParams()
    const id = params.courseId


    const [createLecture, { data, isSuccess, error, isLoading }] = useCreateLectureMutation();

    const submitHandler = async () => {
        await createLecture({ lectureTitle, id })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture Created")
            setLectureTitle('')
        }
        if (error) {
            toast.error(error.data.message || 'Error in Lecture Creation')
        }
    }, [data, isSuccess, error])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Add New Lectures</h1>
                    <div className="form-group">
                        <label className='form-label' htmlFor="">Lecture Title</label>
                        <input className='form-control' placeholder='Lecture Title Here' type="text" name="lectureTitle" id="" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} />
                    </div>
                    <div className="d-flex gap-2 mt-3">
                        <button className='btn btn-secondary' onClick={() => navigate(`/admin/courses/${courseId}`)}>Back To Course</button>
                        <button className='btn btn-primary ' onClick={submitHandler}>Add Lecture</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLectures