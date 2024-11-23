import React from 'react'

const CourseCard = () => {
    return (
        <div className='col-md-4'>
            <div className="card mb-4" >
                <img src='https://imgs.search.brave.com/tIF4cvRgpb11auhldtmSudR2lABqVcn57CFnV9xvRBk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGFtZWRiYWhyYW0u/aW8vX25leHQvaW1h/Z2U_dXJsPWh0dHBz/Oi8vZmlsZXMuc3Ry/aXBlLmNvbS9saW5r/cy9NREI4WVdOamRG/OHhURXR1V0hsTWRW/QlNkbXgxZDJzMGZH/WnNYMnhwZG1WZk5H/OUpUR3BMY1c1amMw/aDBXV1ZXYUZscmJG/QmlhR2QzMDBieENl/WHFHeSZ3PTM4NDAm/cT03NQ' style={{ height: '220px' }} className="card-img-top object-fit-cover" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-truncate">Next JS Course </h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h6 className='fs-5 fw-bold'>Rs.1200</h6>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex gap-2 align-items-center">
                            <div className='user-icon rounded-circle bg-primary'>
                                <img src="" alt="" />
                            </div>
                            <h1 className='fs-6 fw-medium'>Muhammad Talha</h1>
                        </div>
                        <span class="badge rounded-pill text-bg-primary">Begineer</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CourseCard