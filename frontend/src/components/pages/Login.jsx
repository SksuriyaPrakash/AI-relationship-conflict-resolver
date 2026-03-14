import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../../redux/authSlice'

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If token exists, redirect to dashboard page
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMsg(location.state.successMessage);
      // Clear location state so that refreshing doesn't re-show the alert
      navigate(location.pathname, { replace: true, state: {} });
      const timer = setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

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
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <section className="create_account pt-120 pb-120">
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-7 col-xl-6">
                    <div className="create_account__form text-center rounded-20 py-7 py-md-10 px-4 px-md-5">
                        <h2>Login your account</h2>
                        <div className="d-flex align-items-center justify-content-center gap-2 mb-6 mb-md-8">
                            <span>Have no account?</span>
                            <Link to="/register" className="p1-color">Create Account</Link>
                        </div>

                        {successMsg && (
                            <div className="alert alert-success py-2 px-3 rounded-3 mb-4 text-start" role="alert" style={{ fontSize: '14px' }}>
                                {successMsg}
                            </div>
                        )}

                        {localError && (
                            <div className="alert alert-danger py-2 px-3 rounded-3 mb-4 text-start" role="alert" style={{ fontSize: '14px' }}>
                                {localError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-5 gap-md-6">
                            <div className="input-group">
                                <label htmlFor="username" className="fw_500 mb-1">User name or Email</label>
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
                                {loading ? 'Logging in...' : 'Login'}
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

export default Login
