import React from 'react'
import CourseCardSkeleton from './skeletons/CourseCardSkeleton'
import CourseCard from './CourseCard'

const MyLearning = () => {
    const isLoading = false
    const myCourses = [1, 2, 3]
    return (
        <div className="container">
            <div className="row py-5">

                <h1 className='mb-5'>My Learings</h1>
                {
                    isLoading ? Array.from({ length: 3 }).map((_, index) => (
                        <CourseCardSkeleton />
                    )) : myCourses.map((index) => (
                        <CourseCard />
                    ))
                }


            </div>
        </div>
    )
}

export default MyLearning