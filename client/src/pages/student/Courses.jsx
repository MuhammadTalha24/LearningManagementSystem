import React from 'react'
import CourseCardSkeleton from './skeletons/CourseCardSkeleton'
import CourseCard from './CourseCard'

const Courses = () => {
    const isLoading = false
    const courses = [1, 2, 3, 4, 5, 6]
    return (
        <div className='bg-body-tertiary'>
            <h1 className='display-6 text-primary fw-bold text-center py-5'>Our Courses</h1>
            <div className="container">
                <div className="row">
                    {
                        isLoading ? Array.from({ length: 6 }).map((_, index) => (
                            <CourseCardSkeleton key={index} />
                        )) : courses.map((index) => (
                            <CourseCard key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses