import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../redux/authSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If not authenticated, redirect to login page
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!token) {
    return null; // or loading spinner
  }

  return (
    <>
      {/* Dashboard Area Starts */}
      <section className="dashboard_area pt-120 pb-120 bg1-color min-vh-100">
        <div className="container">
          {/* Welcome Header */}
          <div className="row mb-8 mb-md-10">
            <div className="col-12 d-flex flex-wrap justify-content-between align-items-center gap-4">
              <div>
                <span className="fs-eight s2-color fw-semibold text-uppercase d-block mb-2">Relationship Portal</span>
                <h1 className="display-five text-uppercase">Welcome Back, <span className="s2-color">{user?.username || 'User'}</span></h1>
                <p className="fs-ten text-muted">Here is the latest overview of your relationship harmony and analysis.</p>
              </div>
              <div>
                <button onClick={handleLogoutClick} className="cmn-btn border-0 px-6 py-3 rounded-4">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="row gy-4 mb-10">
            <div className="col-md-4">
              <div className="categories_three__item p-5 rounded-4 border-color3 bg-white text-center h-100">
                <div className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-3">
                  <i className="ti ti-heart-filled fs-one s2-color"></i>
                </div>
                <h3>Harmony Score</h3>
                <h2 className="display-six s2-color mt-2">84%</h2>
                <p className="fs-nine text-muted mt-2">Your relationship conflict level is currently very low. Great job communicating!</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="categories_three__item p-5 rounded-4 border-color3 bg-white text-center h-100">
                <div className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-3">
                  <i className="ti ti-activity-heartbeat fs-one s2-color"></i>
                </div>
                <h3>Active Analyses</h3>
                <h2 className="display-six s2-color mt-2">1 Active</h2>
                <p className="fs-nine text-muted mt-2">AI is currently analyzing 1 chat/transcript pattern from your couple logs.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="categories_three__item p-5 rounded-4 border-color3 bg-white text-center h-100">
                <div className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-3">
                  <i className="ti ti-device-heart-monitor fs-one s2-color"></i>
                </div>
                <h3>Partner Connected</h3>
                <h2 className="display-six s2-color mt-2">Linked</h2>
                <p className="fs-nine text-muted mt-2">Your profile is connected. Share advice cards and resolution results instantly.</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Actions & Info */}
          <div className="row gy-5">
            {/* Left Main Pane */}
            <div className="col-lg-8">
              <div className="coping_divorce__fitem border-color5 p-5 p-md-7 rounded-3 position-relative overflow-hidden bg-white mb-6">
                <div className="balancing_work__item">
                  <div className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5">
                    <span className="py-1 px-3 bg5-color rounded-5">AI Agent</span>
                    <span className="p4-color">Last updated: Just now</span>
                  </div>
                  <h2 className="mb-4">Analyze a Conflict Session</h2>
                  <p className="fs-ten mb-5">
                    Upload chat logs, couples dialogue, or a brief description of a recent conflict. 
                    Our LangGraph AI pipeline will perform semantic analysis to identify cognitive distortions, emotional triggers, and construct healthy talking points.
                  </p>
                  <div className="d-flex flex-wrap gap-4 align-items-center">
                    <Link to="/discussion" className="cmn-btn p-4 d-center">
                      Launch Resolution Session <i className="ti ti-arrow-badge-right fs-four ms-2"></i>
                    </Link>
                    <Link to="/advice" className="s2-color border-btom pb-1 fw-bold">
                      Read Relationship Tips
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Suggestions */}
              <div className="stories_podcast__card border-color3 p-5 rounded-4 bg-white">
                <h3 className="mb-4">Suggested Actions For This Week</h3>
                <ul className="d-flex flex-column gap-3">
                  <li className="d-flex align-items-start gap-3 p-3 bg1-color rounded-3">
                    <i className="ti ti-circle-check-filled s2-color fs-four mt-1"></i>
                    <div>
                      <h5 className="mb-1">Schedule a 15-minute Check-in</h5>
                      <p className="fs-nine text-muted">A short unstructured dialogue about daily stresses helps align expectations before arguments arise.</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-start gap-3 p-3 bg1-color rounded-3">
                    <i className="ti ti-circle-check-filled s2-color fs-four mt-1"></i>
                    <div>
                      <h5 className="mb-1">Try the "Active Listening" Exercise</h5>
                      <p className="fs-nine text-muted">Read advice on how to repeat back your partner's statement to confirm alignment before replying.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Pane / Profile Details */}
            <div className="col-lg-4">
              <div className="coping_divorce__fitem bgx-color border-bgx p-5 p-md-6 rounded-3 bg-white">
                <h3 className="mb-4">Your Profile Details</h3>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex align-items-center gap-3">
                    <img src="src/assets/images/avatar2.png" className="rounded-5 border border-2 border-primary" style={{ width: '60px' }} alt="Profile" />
                    <div>
                      <h5 className="mb-0">{user?.username || 'User'}</h5>
                      <span className="text-muted fs-nine">Member ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>
                  
                  <hr className="my-1" />

                  <div className="d-flex flex-column gap-2 fs-nine">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">User Name:</span>
                      <span>{user?.username}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Account Status:</span>
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                  
                  <Link to="/advice" className="cmn-btn second-alt py-3 w-100 text-center rounded-4">
                    Browse Advisors
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Area Ends */}
    </>
  );
}

export default Dashboard;
