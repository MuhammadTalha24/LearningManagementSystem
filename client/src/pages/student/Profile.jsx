import { useEffect, useState } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../features/api/authApi";
import { toast } from "react-toastify";

const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const { data, isLoading, refetch } = useGetProfileQuery(); // Always call hooks at the top
    const [updateProfile, { data: updateProfileData, isLoading: updateProfileisLoading, isSuccess: updateProfileisSuccess, isError }] =
        useUpdateProfileMutation();

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePhoto(file);
    };

    const updateProfileHandler = async () => {
        const formdata = new FormData();
        formdata.append('name', name),
            formdata.append('profilePhoto', profilePhoto)
        await updateProfile(formdata);
    };


    useEffect(() => {
        refetch();
    }, [])
    useEffect(() => {
        if (updateProfileisSuccess) {
            refetch()
            toast.success(updateProfileData?.message || "Profile Updated Successfully");

        }
        if (isError) {
            toast.error("Failed To Update Profile");
        }
    }, [isError, updateProfileData, updateProfileisSuccess]);

    // Handle loading and error states
    if (isLoading) {
        return <h1 className="text-center py-5">Profile Loading...</h1>;
    }

    if (!data || !data.user) {
        return <p className="text-center py-5">No data available.</p>;
    }

    const user = data.user;

    return (
        <>
            <div className="container">
                <div className="row pt-4 justify-content-center">
                    <div className="col-md-12">
                        <h1 className="fs-2 fw-bold">PROFILE</h1>

                        <div className="card mt-3">
                            <div className="card-body py-3">
                                <div className="d-flex align-items-start gap-3">
                                    <div className="rounded-circle overflow-hidden" style={{ width: "100px", height: "100px" }}>
                                        <img src={user.profile_image || ""} className="img-fluid object-fit-cover" alt="Profile" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <h1 className="fs-6">
                                            Name:<span className="fw-medium ms-2">{user.name}</span>
                                        </h1>
                                        <h1 className="fs-6">
                                            Email:<span className="fw-medium ms-2">{user.email}</span>
                                        </h1>
                                        <h1 className="fs-6">
                                            Role:<span className="fw-medium ms-2">{user.role.toUpperCase()}</span>
                                        </h1>
                                        <button className="btn btn-primary w-50 mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="fs-2 fw-bold mt-3">Courses You Are Enrolled In</h1>
                        <div className="row px-0 pt-3">
                            {user.enrolled_courses && user.enrolled_courses.length > 0 ? (
                                user.enrolled_courses.map((course) => <CourseCard course={course} key={course._id} />)
                            ) : (
                                <h1 className="fs-5">You Have No Course Enrolled</h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header align-items-center border-0">
                            <div className="d-flex flex-column">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">
                                    Edit Profile
                                </h1>
                                <p className="mb-0">Make Changes To Your Profile Here</p>
                            </div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                <label className="w-25" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex align-items-center mb-3 justify-content-between">
                                <label className="w-25" htmlFor="profile">
                                    Profile
                                </label>
                                <input type="file" onChange={onChangeHandler} accept="image/*" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button onClick={updateProfileHandler}
                                disabled={updateProfileisLoading} class="btn btn-primary" type="button">
                                {
                                    updateProfileisLoading ? <><span class="spinner-border spinner-border-sm" aria-hidden="true"></span>  <span role="status">Save Changes</span></> : <span role="status">Save Changes</span>
                                }

                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
