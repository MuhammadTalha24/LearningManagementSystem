import React, { useEffect, useState } from 'react';
import { useLoginUserMutation, useRegisterUserMutation } from '../features/api/authApi.js';
import { toast } from 'react-toastify';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    // RTK Query Hooks
    const [registerUser, { data: registerData, error: registerError, isSuccess: registerSuccess, isLoading: registerLoading }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isSuccess: loginSuccess, isLoading: loginLoading }] = useLoginUserMutation();

    const handleChange = (e, type) => {
        const { id, value } = e.target;
        if (type === 'signup') {
            setRegisterForm((prev) => ({ ...prev, [id]: value }));
        } else if (type === 'login') {
            setLoginForm((prev) => ({ ...prev, [id]: value }));
        }
    };

    const formSubmit = (type) => {
        const formData = type === 'signup' ? registerForm : loginForm;
        const action = type === 'signup' ? registerUser : loginUser;
        action(formData);
    };

    // Handle Notifications
    useEffect(() => {
        if (loginError) {
            toast.error(loginError?.data?.message || 'Login Failed');
        }
        if (loginSuccess) {
            toast.success(loginData?.message || 'Login Successfully');
        }
    }, [loginError, loginData, loginSuccess]);

    useEffect(() => {
        if (registerError) {
            toast.error(registerError?.data?.message || 'Registration Failed');
        }
        if (registerSuccess) {
            toast.success(registerData?.message || 'Registered Successfully');
        }
    }, [registerError, registerData, registerSuccess]);

    return (
        <div className="container">
            <div className="row justify-content-center vh-100 align-items-center">
                <div className="col-md-6">
                    <div className="card rounded-4">
                        <div className="card-body">
                            <ul className="nav nav-pills nav-fill gap-2" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active text-center border rounded-3" id="pills-signup-tab" data-bs-toggle="pill" data-bs-target="#pills-signup" type="button" role="tab" aria-controls="pills-signup" aria-selected="true">Signup</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link text-center border rounded-3" id="pills-login-tab" data-bs-toggle="pill" data-bs-target="#pills-login" type="button" role="tab" aria-controls="pills-login" aria-selected="false">Login</button>
                                </li>
                            </ul>
                            <div className="tab-content py-3" id="myTabContent">
                                {/* Signup Form */}
                                <div className="tab-pane fade show active" id="pills-signup" role="tabpanel" aria-labelledby="pills-signup-tab" tabIndex="0">
                                    <h1 className="fs-4 text-center">Signup Your Account</h1>
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input type="text" id="name" value={registerForm.name} onChange={(e) => handleChange(e, 'signup')} className="form-control" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="signupEmail" className="form-label">Email</label>
                                            <input type="email" id="email" value={registerForm.email} onChange={(e) => handleChange(e, 'signup')} className="form-control" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="signupPassword" className="form-label">Password</label>
                                            <input type="password" id="password" value={registerForm.password} onChange={(e) => handleChange(e, 'signup')} className="form-control" />
                                        </div>
                                        <div className="col-12">
                                            <button onClick={() => formSubmit('signup')} className="btn btn-primary" type="button" disabled={registerLoading}>
                                                {registerLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                        <span role="status">Loading...</span>
                                                    </>
                                                ) : (
                                                    'Signup'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Login Form */}
                                <div className="tab-pane fade" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab" tabIndex="0">
                                    <h1 className="fs-4 text-center">Login Your Account</h1>
                                    <div className="row g-3">
                                        <div className="col-md-12">
                                            <label htmlFor="loginEmail" className="form-label">Email</label>
                                            <input type="email" id="email" value={loginForm.email} onChange={(e) => handleChange(e, 'login')} className="form-control" />
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="loginPassword" className="form-label">Password</label>
                                            <input type="password" id="password" value={loginForm.password} onChange={(e) => handleChange(e, 'login')} className="form-control" />
                                        </div>
                                        <div className="col-12">
                                            <button onClick={() => formSubmit('login')} className="btn btn-primary" type="button" disabled={loginLoading}>
                                                {loginLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                        <span role="status">Loading...</span>
                                                    </>
                                                ) : (
                                                    'Login'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
