import React from 'react'


const Dashboard = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h1 className='fs-5 text-primary fw-bold'>Total Sales</h1>
                            <h2 className='text-success fs-3'>Rs,45000</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h1 className='fs-5 text-primary fw-bold'>Total Revenue</h1>
                            <h2 className='text-success fs-3'>Rs,45000</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard