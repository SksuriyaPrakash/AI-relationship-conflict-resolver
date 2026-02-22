import React from 'react'
import { Link } from 'react-router-dom'
function Register() {
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
                        <form className="d-flex flex-column gap-5 gap-md-6">
                            <div className="input-group">
                                <label for="username" className="fw_500 mb-1">User name</label>
                                <input className="rounded-4" type="text" name="username" id="username" required />
                            </div>

                            <div className="input-group">
                                <label for="email" className="fw_500 mb-1">Email address</label>
                                <input className="rounded-4" type="email" name="email" id="email" required />
                            </div>

                            <div className="input-group">
                                <div className="d-flex align-items-center justify-content-between gap-5 w-100">
                                    <label for="password" className="fw_500 mb-1">Password</label>
                                    <span className="d-center gap-2 cpoint"><i className="fa-solid fa-eye-slash"></i>
                                        Hide</span>
                                </div>
                                <input className="rounded-4 mb-1" type="password" name="password" id="password" required />
                                <span className="fs-seven">Use 8 or more characters with a mix of letters, numbers &
                                    symbols</span>
                            </div>

                            <button type="submit" className="cmn-btn second-alt py-3 py-sm-4">Sign Up</button>
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
