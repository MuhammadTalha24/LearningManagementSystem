import React from 'react'

const HeroSection = () => {
    return (
        <div className='bg-gradient-purple text-white text-center'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 py-header">
                        <h1>Find The Best Courses Near You</h1>
                        <h6>Discover,Learn,and Upskill with our wide range of Courses</h6>
                        <div className='w-100 rounded-pill bg-white overflow-hidden d-flex justify-content-between ps-4 mt-4'>
                            <input type="text" placeholder='Search Courses' className='bg-transparent border-0 w-100 shadow-none outline-none py-3' />
                            <button className='btn btn-primary py-3'>Search</button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className='btn btn-light rounded-pill mt-4 px-3 fw-bold fs-6 shadow'>Explore Courses</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection