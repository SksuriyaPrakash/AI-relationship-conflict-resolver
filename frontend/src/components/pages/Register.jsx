import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, clearError, resetRegistrationStatus } from '../../redux/authSlice'

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const inviteCode = searchParams.get('invite_code') || '';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [occupation, setOccupation] = useState('');
    const [gender, setGender] = useState('male');
    const [showPassword, setShowPassword] = useState(false);

    const { loading, error, registrationSuccess } = useSelector((state) => state.auth);
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        if (registrationSuccess) {
            dispatch(resetRegistrationStatus());
            navigate('/login', { state: { successMessage: 'Account created successfully. Please login!' } });
        }
    }, [registrationSuccess, navigate, dispatch]);

    useEffect(() => {
        if (error) {
            setLocalError(error);
            const timer = setTimeout(() => {
                setLocalError(null);
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            setLocalError(null);
        }
    }, [error, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ 
            username, 
            email, 
            password, 
            phone, 
            occupation, 
            gender, 
            invite_code: inviteCode 
        }));
    };

    return (
        <>
            <section className="create_account pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-md-7 col-xl-6">
                            <div className="create_account__form text-center rounded-20 py-7 py-md-10 px-4 px-md-5">
                                <h2>Create an account</h2>
                                <div className="d-flex align-items-center justify-content-center gap-2 mb-6 mb-md-8">
                                    <span>Already have an ccount?</span>
                                    <Link to="/login" className="p1-color">Login</Link>
                                </div>

                                {localError && (
                                    <div className="alert alert-danger py-2 px-3 rounded-3 mb-4 text-start" role="alert" style={{ fontSize: '14px' }}>
                                        {localError}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="d-flex flex-column gap-5 gap-md-6">
                                    <div className="input-group">
                                        <label htmlFor="username" className="fw_500 mb-1">User name</label>
                                        <input
                                            className="rounded-4"
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label htmlFor="email" className="fw_500 mb-1">Email address</label>
                                                <input
                                                    className="rounded-4"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label htmlFor="phone" className="fw_500 mb-1">Phone Number</label>
                                                <input
                                                    className="rounded-4"
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label htmlFor="occupation" className="fw_500 mb-1">Occupation</label>
                                                <input
                                                    className="rounded-4"
                                                    type="text"
                                                    name="occupation"
                                                    id="occupation"
                                                    value={occupation}
                                                    onChange={(e) => setOccupation(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label className="fw_500 mb-2">Gender</label>
                                                <div className="d-flex align-items-center gap-3 w-100">
                                                    <label 
                                                        className="d-flex align-items-center justify-content-center gap-2 rounded-3" 
                                                        style={{ 
                                                            cursor: 'pointer', 
                                                            padding: '10px 16px', 
                                                            border: gender === 'male' ? '2px solid var(--p1-color, #0d6efd)' : '2px solid #e5e7eb', 
                                                            backgroundColor: gender === 'male' ? '#f8f9fa' : 'transparent',
                                                            flex: 1, 
                                                            transition: 'all 0.2s ease-in-out' 
                                                        }}
                                                    >
                                                        <input 
                                                            type="radio" 
                                                            name="gender" 
                                                            value="male"
                                                            checked={gender === 'male'}
                                                            onChange={(e) => setGender(e.target.value)}
                                                            style={{ width: '18px', height: '18px', cursor: 'pointer', margin: 0, accentColor: 'var(--p1-color, #0d6efd)' }}
                                                            required 
                                                        />
                                                        <span className="fw_500" style={{ color: gender === 'male' ? 'var(--p1-color, #0d6efd)' : '#6b7280' }}>Male</span>
                                                    </label>
                                                    
                                                    <label 
                                                        className="d-flex align-items-center justify-content-center gap-2 rounded-3" 
                                                        style={{ 
                                                            cursor: 'pointer', 
                                                            padding: '10px 16px', 
                                                            border: gender === 'female' ? '2px solid var(--p1-color, #0d6efd)' : '2px solid #e5e7eb', 
                                                            backgroundColor: gender === 'female' ? '#f8f9fa' : 'transparent',
                                                            flex: 1, 
                                                            transition: 'all 0.2s ease-in-out' 
                                                        }}
                                                    >
                                                        <input 
                                                            type="radio" 
                                                            name="gender" 
                                                            value="female"
                                                            checked={gender === 'female'}
                                                            onChange={(e) => setGender(e.target.value)}
                                                            style={{ width: '18px', height: '18px', cursor: 'pointer', margin: 0, accentColor: 'var(--p1-color, #0d6efd)' }}
                                                            required 
                                                        />
                                                        <span className="fw_500" style={{ color: gender === 'female' ? 'var(--p1-color, #0d6efd)' : '#6b7280' }}>Female</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="password" className="fw_500 mb-1">Password</label>
                                        <div className="position-relative w-100">
                                            <input
                                                className="rounded-4 mb-1 w-100"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                style={{ paddingRight: '60px' }}
                                            />
                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="position-absolute end-0 top-50 translate-middle-y me-3 cpoint d-flex align-items-center gap-2"
                                                style={{ cursor: 'pointer', zIndex: 10, color: 'var(--p1-color)' }}
                                            >
                                                <i className={showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </span>
                                        </div>
                                        <span className="fs-seven">Use 8 or more characters with a mix of letters, numbers &
                                            symbols</span>
                                    </div>

                                    <button type="submit" disabled={loading} className="cmn-btn second-alt py-3 py-sm-4">
                                        {loading ? 'Signing up...' : 'Sign Up'}
                                    </button>
                                    <div className="hr-stl d-flex align-items-center gap-3 gap-md-5">
                                        <hr className="w-100" />
                                        <p>Or</p>
                                        <hr className="w-100" />
                                    </div>
                                    <div className="social-buttons">
                                        <a href="javascript:void(0)"
                                            className="d-block py-3 px-2 cmn-btn six-alt mb-4 d-flex align-items-center justify-content-center gap-4"><img
                                                src="src/assets/images/google.png" alt="Icon" /> Sign in with Google</a>

                                        <a href="javascript:void(0)"
                                            className="d-block py-3 px-2 cmn-btn six-alt d-flex align-items-center justify-content-center gap-4"><img
                                                src="src/assets/images/facebook.png" alt="Icon" /> Sign in with Facebook</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-5 col-xl-5">
                            <div className="create_account__rthumb d-none d-md-block">
                                <img src="src/assets/images/account-thumb.png" className="rounded-4" alt="Images" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
