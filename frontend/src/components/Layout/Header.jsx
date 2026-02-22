import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <>
          {/*  header-section start */}
    <header className="header-section header-menu w-100">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg position-relative py-md-3 py-lg-6 workready">
                        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                            <img src="src/assets/images/logo.png" className="logo" alt="logo" />
                            <img src="src/assets/images/logo-text.png"
                                className="logo-text d-none d-sm-block d-lg-none d-xxl-block" alt="logo-text"/>
                        </Link>

                        <div className="collapse navbar-collapse justify-content-between" id="navbar-content">
                            <ul
                                className="navbar-nav d-flex align-items-lg-center gap-4 gap-sm-5 gap-lg-7 py-2 py-lg-0 ms-0 ms-xl-20 align-self-center">
                                <li className="dropdown show-dropdown">
                                    <Link to="/" className="dropdown-nav d-flex align-items-center fs-ten">Home</Link>
                                </li>
                                <li className="dropdown show-dropdown">
                                    <Link to="/discussion" className="dropdown-nav d-flex align-items-center fs-ten">Discussion</Link>
                                </li>
                                <li className="dropdown show-dropdown">
                                    <Link to="/advice" className="dropdown-nav d-flex align-items-center fs-ten">Advice</Link>
                                </li>
                                <li className="dropdown show-dropdown">
                                    <Link to="/login" className="dropdown-nav d-flex align-items-center fs-ten">Login</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-2 align-items-center">
                            <div className="single-item cart-area search-area">
                                <div className="cmn-head">
                                    <button type="button" aria-label="Shopping Button"
                                        className="common_toggles2 icon-area p-0 box-second d-center position-relative">
                                        <i className="slide-toggle2 ti ti-message-2 fs-three"></i>
                                        <span
                                            className="notif-al fs-nine s2-bg px-1 position-absolute rounded-5 p2-color">4</span>
                                    </button>
                                    <div className="msg_area common_area2 p2-bg p-5 rounded-2">
                                        <h5 className="mb-7 mb-md-8">Messages</h5>
                                        <div className="msg_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/head-msg-1.png" className="rounded-4 max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content">
                                                <div className="msg_item-name d-flex align-items-center gap-2">
                                                    <span>Piter Maio</span>
                                                    <span
                                                        className="s2-bg p2-color fw_500 px-1 rounded-20 fs-eight">3</span>
                                                </div>
                                                <p className="p1-color">Amet minim mollit non....</p>
                                            </div>
                                        </div>
                                        <div className="msg_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/head-msg-2.png" className="rounded-4 max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content">
                                                <span>Annette Black</span>
                                                <p className="s9-color">You: consequat sunt</p>
                                            </div>
                                        </div>
                                        <div className="msg_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/head-msg-3.png" className="rounded-4 max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content">
                                                <span>Ralph Edwards</span>
                                                <p className="p1-color">Amet minim mollit non....</p>
                                            </div>
                                        </div>
                                        <div className="msg_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/head-msg-4.png" className="rounded-4 max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content">
                                                <span>Darrell Steward</span>
                                                <p className="s9-color">You: consequat sunt</p>
                                            </div>
                                        </div>
                                        <div className="msg_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/head-msg-5.png" className="rounded-4 max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content">
                                                <span>Wade Warren</span>
                                                <p className="s9-color">You: consequat sunt</p>
                                            </div>
                                        </div>
                                        <a href="chat.html" className="p1-color fw_500">See all inbox</a>
                                    </div>
                                </div>
                            </div>
                            <div className="single-item cart-area search-area">
                                <div className="cmn-head">
                                    <button type="button" aria-label="Shopping Button"
                                        className="icon-area common_toggles3 p-0  d-center position-relative">
                                        <i className="ti ti-bell fs-three"></i>
                                        <span
                                            className="notif-al fs-nine s2-bg px-1 position-absolute rounded-5 p2-color">3</span>
                                    </button>
                                    <div className="noti-area common_area3 p2-bg p-5 rounded-3">
                                        <h5 className="mb-7 mb-md-8">Notification</h5>
                                        <div className="noti_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/notification-chat-1.png" className="max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content w-100 ">
                                                <div
                                                    className="msg_item-name d-flex align-items-center justify-content-between gap-2">
                                                    <span>Piter Maio</span>
                                                    <span className="s9-color">Just now</span>
                                                </div>
                                                <p className="s9-color">Comment on your post</p>
                                            </div>
                                        </div>
                                        <div className="noti_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/notification-chat-3.png" className="max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content w-100">
                                                <div
                                                    className="msg_item-name d-flex align-items-center justify-content-between gap-2">
                                                    <span>Jacob Jones</span>
                                                    <span className="s9-color">1hr</span>
                                                </div>
                                                <p className="s9-color">Sent you a request</p>
                                            </div>
                                        </div>
                                        <div className="noti_item mb-7">
                                            <div
                                                className="notis-content d-flex align-items-center justify-content-between gap-2 mb-4">
                                                <div className="msg_item_thumb">
                                                    <img src="src/assets/images/notification-chat-2.png" className="max-un"
                                                        alt="Images" />
                                                </div>
                                                <div className="msg_item-content w-100">
                                                    <div
                                                        className="msg_item-name d-flex align-items-center justify-content-between gap-2">
                                                        <span>Kathryn Murphy</span>
                                                        <span className="s9-color">2min</span>
                                                    </div>
                                                    <p className="s9-color">Like your photo</p>
                                                </div>
                                            </div>
                                            <div className="noti_item-group d-flex align-items-center gap-3">
                                                <button type="button"
                                                    className="noti_item-btn p2-color fs-seven">Accept</button>
                                                <button type="button"
                                                    className="noti_item-btn2 s2-color fs-seven">Delete</button>
                                            </div>
                                        </div>
                                        <div className="noti_item d-flex align-items-center gap-2 mb-7">
                                            <div className="msg_item_thumb">
                                                <img src="src/assets/images/notification-chat-4.png" className="max-un"
                                                    alt="Images" />
                                            </div>
                                            <div className="msg_item-content w-100">
                                                <div
                                                    className="msg_item-name d-flex align-items-center justify-content-between gap-2">
                                                    <span>Jacob Jones</span>
                                                    <span className="s9-color">1hr</span>
                                                </div>
                                                <p className="s9-color pe-sm-2"> officia consequat duis enim velit mollit.
                                                    Exercitatio</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0)" className="n2-color fw_500">See all notification</a>
                                    </div>
                                </div>
                            </div>
                            <div className="single-item cart-area position-relative">
                                <div className="cmn-head common_toggles">
                                    <button type="button" aria-label="Shopping Button"
                                        className="icon-area p-0 box-style box-second d-center position-relative">
                                        <img src="src/assets/images/jesifafan-icons.png" className="rounded-5" alt="Icons" />
                                        <span className="abs-area position-absolute fs-nine s6-bg"></span>
                                    </button>
                                </div>
                                <div className="profile_area common_area p-4 p-md-5 rounded-20 border-s5 p2-bg">
                                    <a href="my-feed.html" className="d-block mb-3">My Feed</a>
                                    <a href="my-feed.html" className="d-block mb-3">My Profile</a>
                                    <a href="javascript:void(0)" className="d-block">Logout</a>
                                </div>
                            </div>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            aria-label="Navbar Toggler" data-bs-target="#navbar-content" aria-expanded="true"
                            id="nav-icon3">
                            <span></span><span></span><span></span><span></span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    {/*  header-section end */}
    </>
  )
}

export default Header
