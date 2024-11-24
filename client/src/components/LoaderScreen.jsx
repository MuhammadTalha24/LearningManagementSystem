import React from 'react'

const LoaderScreen = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
            style={{ zIndex: 1050 }}
        >
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-center">Loading, please wait...</p>
            </div>
        </div>
    )
}

export default LoaderScreen