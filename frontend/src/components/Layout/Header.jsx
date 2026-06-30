import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const isAuthenticated = !!token;

  const [activeDropdown, setActiveDropdown] = useState(null);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.single-item')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);


  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logout());
    navigate('/login', { state: { successMessage: 'account logout successfully..!' } });
  };

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
                               
                            </ul>
                        </div>

                        <div className="right-area custom-pos position-relative d-flex gap-0 gap-lg-2 align-items-center">
                            {isAuthenticated ? (
                                <>
                                    <div className={`single-item cart-area search-area ${activeDropdown === 'messages' ? 'show' : ''}`}>
                                        <div className="cmn-head">
                                            <button type="button" aria-label="Shopping Button"
                                                onClick={() => setActiveDropdown(activeDropdown === 'messages' ? null : 'messages')}
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
                                    <div className={`single-item cart-area search-area ${activeDropdown === 'notifications' ? 'show' : ''}`}>
                                        <div className="cmn-head">
                                            <button type="button" aria-label="Shopping Button"
                                                onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
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
                                         <div className="cmn-head">
                                             <Link to="/dashboard" className="icon-area p-0 box-style box-second d-center position-relative" style={{ display: 'flex' }}>
                                                 <img src={user?.profile_pic || "src/assets/images/jesifafan-icons.png"} className="rounded-5" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Profile Icon" />
                                                 <span className="abs-area position-absolute fs-nine s6-bg"></span>
                                             </Link>
                                         </div>
                                    </div>
                                </>
                            ) : (
                                <Link to="/login" className="cmn-btn py-2 px-5 fs-seven rounded-4 text-nowrap">Login</Link>
                            )}
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
    
    {showLogoutModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)', 
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
            transition: 'all 0.3s ease'
          }}
        >
          <div 
            className="p-5 rounded-20 bg-white shadow-lg text-center" 
            style={{ 
              maxWidth: '400px', 
              width: '90%',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-4" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(236, 96, 79, 0.1)' }}>
              <i className="ti ti-logout" style={{ fontSize: '30px', color: '#EC604F' }}></i>
            </div>
            <h3 className="mb-2" style={{ color: '#190F47' }}>Logout</h3>
            <p className="text-muted mb-4 fs-nine">Are you sure you want to logout from your account?</p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className="cmn-btn border-0 py-2 px-4 rounded-3 text-white"
                style={{ backgroundColor: '#6c757d', minWidth: '100px' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmLogout} 
                className="cmn-btn border-0 py-2 px-4 rounded-3 text-white"
                style={{ backgroundColor: '#EC604F', minWidth: '100px' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
