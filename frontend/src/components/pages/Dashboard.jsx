import React, { useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, fetchUserProfile, updateUserProfile } from '../../redux/authSlice';
import axios from 'axios';
import { Base_Url } from '../../redux/data';
import ChatSection from '../ChatSection';


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let pollInterval;
    // If not authenticated, redirect to login page
    if (!token && !loggingOut) {
      navigate('/login');
    } else if (token) {
      dispatch(fetchUserProfile());
      
      // Poll for partner connection if not yet connected
      if (user && !user.is_partner_added) {
        pollInterval = setInterval(() => {
          dispatch(fetchUserProfile());
        }, 3000); // Check every 3 seconds
      }
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [token, navigate, dispatch, loggingOut, user?.is_partner_added]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setLoggingOut(true);
    setShowLogoutModal(false);
    dispatch(logout());
    navigate('/login', { state: { successMessage: 'account logout successfully..!' } });
  };


  // Chat state variables
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const lastSentMessage = useRef('');
  const [role, setRole] = useState('partner_1');



  // WebSocket message receiver setup helper
  const setupSocketListeners = (ws) => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'connection_established') {
        setRole(data.role);
        setMessages(data.history || []);
        setIsAnalyzing(data.session_status === 'analyzing');
      } else if (data.type === 'message.sent') {
        setMessages((prev) => {
          if (prev.some((m) => m.id === data.message.id)) {
            return prev;
          }
          return [...prev, data.message];
        });
        if (data.message.is_ai) {
          setIsAnalyzing(false);
        }
      } else if (data.type === 'error') {
        setIsAnalyzing(false);
        if (data.action === 'restore_input') {
          setMessageInput(lastSentMessage.current);
          setMessages(prev => {
            const newMsgs = [...prev];
            for (let i = newMsgs.length - 1; i >= 0; i--) {
              if (newMsgs[i].sender_name === (user?.username || 'You') && !newMsgs[i].is_ai) {
                newMsgs.splice(i, 1);
                break;
              }
            }
            return newMsgs;
          });
          dispatch({
            type: 'notifications/addNotification',
            payload: {
              title: 'AI Engine Error',
              message: data.message + ' Please try sending again.',
              type: 'error'
            }
          });
        } else {
          setMessages(prev => [...prev, {
            id: `sys-error-${Date.now()}`,
            message: `⚠️ Error: ${data.message}`,
            is_ai: true,
            isSystem: true,
            timestamp: new Date().toISOString()
          }]);
        }
      } else if (data.type === 'session.status.update') {
        setCurrentSession(prev => prev ? { ...prev, status: data.status } : null);
        setIsAnalyzing(data.status === 'analyzing');
        setMessages(prev => [...prev, {
          id: `sys-${Date.now()}`,
          message: data.system_message || `Session status updated to ${data.status}`,
          is_ai: true,
          isSystem: true,
          timestamp: new Date().toISOString()
        }]);
      } else if (data.type === 'ai.analyzing') {
        setIsAnalyzing(true);
      } else if (data.type === 'ai.response.ready') {
        setIsAnalyzing(false);
        setMessages(prev => [...prev, {
          id: `sys-ready-${Date.now()}`,
          message: `AI analysis complete! Resolution: ${data.analysis.resolution}`,
          is_ai: true,
          timestamp: new Date().toISOString()
        }]);
        setCurrentSession(prev => prev ? { ...prev, status: 'resolved' } : null);
      } else if (data.type === 'partner.typing') {
        setPartnerTyping(data.typing);
      } else if (data.type === 'partner.replied') {
        dispatch({
          type: 'notifications/addNotification',
          payload: {
            title: 'Partner Replied',
            message: 'Your partner just submitted their message.',
            type: 'info'
          }
        });
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };
  };

  const connectWebSocket = (sessionId) => {
    if (socket) {
      socket.close();
    }

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = Base_Url.replace(/^https?:\/\//, '');
    const wsUrl = `${wsProtocol}//${wsHost}/ws/conflict/${sessionId}/?token=${token}`;

    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      setIsConnected(true);
    };
    setupSocketListeners(ws);
    setSocket(ws);
  };

  // Fetch conflict sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/conflicts/sessions/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.length > 0) {
          setSessions(res.data);
          const latest = res.data[0];
          setCurrentSession(latest);
          setIsAnalyzing(latest.status === 'analyzing');
          connectWebSocket(latest.id);
        }
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
      }
    };

    if (token) {
      fetchSessions();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [token]);

  // Poll for partner join status if not yet added
  useEffect(() => {
    let interval;
    if (user && !user.is_partner_added) {
      interval = setInterval(() => {
        dispatch(fetchUserProfile());
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [user?.is_partner_added, dispatch]);

  // Use a ref to track previous partner added state to trigger notification only once
  const prevPartnerAdded = useRef(user?.is_partner_added);
  useEffect(() => {
    if (!prevPartnerAdded.current && user?.is_partner_added) {
      dispatch({
        type: 'notifications/addNotification',
        payload: {
          title: 'Partner Joined!',
          message: 'Your partner has successfully created an account and linked with you.',
          type: 'success'
        }
      });
      prevPartnerAdded.current = true;
    }
  }, [user?.is_partner_added, dispatch]);

  const reconnectAndSend = (sessionId, messageText) => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = Base_Url.replace(/^https?:\/\//, '');
    const wsUrl = `${wsProtocol}//${wsHost}/ws/conflict/${sessionId}/?token=${token}`;

    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'message.sent',
        message: messageText
      }));
    };
    setupSocketListeners(ws);
    setSocket(ws);
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const text = messageInput.trim();
    lastSentMessage.current = text;

    // Optimistically add user's message to list
    const userMsg = {
      id: `user-${Date.now()}`,
      message: text,
      is_ai: false,
      sender_name: user?.username || 'You',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setMessageInput('');

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'message.sent',
        message: text
      }));
    } else if (currentSession) {
      reconnectAndSend(currentSession.id, text);
    } else {
      handleStartSessionAndSend(text);
    }
  };

  const handleStartSessionAndSend = async (initialMessage) => {
    try {
      const res = await axios.post(`${Base_Url}/api/conflicts/sessions/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newSession = res.data;
      setSessions(prev => [newSession, ...prev]);
      setCurrentSession(newSession);
      setIsAnalyzing(newSession.status === 'analyzing');

      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsHost = Base_Url.replace(/^https?:\/\//, '');
      const wsUrl = `${wsProtocol}//${wsHost}/ws/conflict/${newSession.id}/?token=${token}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        ws.send(JSON.stringify({
          type: 'message.sent',
          message: initialMessage
        }));
      };
      setupSocketListeners(ws);
      setSocket(ws);
    } catch (err) {
      console.error("Failed to start session:", err);
      const errorMsg = err.response?.data?.detail || "Failed to start session.";
      setToastMessage(errorMsg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSubmitPerspective = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'submit_individual_side'
      }));

      setToastMessage("Perspective submitted successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  const handleCreateNewSession = async () => {
    try {
      const res = await axios.post(`${Base_Url}/api/conflicts/sessions/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newSession = res.data;
      setSessions(prev => [newSession, ...prev]);
      setCurrentSession(newSession);
      setMessages([]);
      connectWebSocket(newSession.id);
      setToastMessage("New conflict session started!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to create new session.";
      setToastMessage(errorMsg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editOccupation, setEditOccupation] = useState('');
  const [editGender, setEditGender] = useState('male');
  const [editProfilePic, setEditProfilePic] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) {
      setEditUsername(user.username || '');
      setEditEmail(user.email || '');
      setEditPhone(user.phone || '');
      setEditOccupation(user.occupation || '');
      setEditGender(user.gender || 'male');
    }
  }, [user, isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    setFormSuccess('');
    setFormError('');

    const formData = new FormData();
    formData.append('username', editUsername);
    formData.append('email', editEmail);
    formData.append('phone', editPhone);
    formData.append('occupation', editOccupation);
    formData.append('gender', editGender);
    if (editProfilePic) {
      formData.append('profile_pic', editProfilePic);
    }

    dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        setFormSuccess('Profile updated successfully!');
        setUpdating(false);
        setTimeout(() => {
          setIsEditing(false);
          setFormSuccess('');
        }, 1500);
      })
      .catch((err) => {
        setFormError(err || 'Failed to update profile.');
        setUpdating(false);
      });
  };

  const handleCopyLink = () => {
    if (!user?.invite_token) {
      setToastMessage("Invite token not found. Please refresh.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }
    const inviteUrl = `${window.location.origin}/register?invite_code=${user.invite_token}`;
    navigator.clipboard.writeText(inviteUrl)
      .then(() => {
        setToastMessage("Link copied!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
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
                {user?.is_partner_added ? (
                  <>
                    <h2 className="display-six s2-color mt-2">Linked</h2>
                    <p className="fs-nine text-muted mt-2">Your profile is connected. Share advice cards and resolution results instantly.</p>
                  </>
                ) : (
                  <>
                    <h2 className="display-six text-danger mt-2">Pending</h2>
                    <p className="fs-nine text-muted mt-2">Partner has not created their account yet. Share the invite link to connect.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Dashboard Actions & Info */}
          <div className="row gy-5">
            {/* Left Main Pane */}
            <div className="col-lg-8">


              {/* Recent Suggestions */}
              <ChatSection
                user={user}
                currentSession={currentSession}
                messages={messages}
                messageInput={messageInput}
                setMessageInput={setMessageInput}
                isAnalyzing={isAnalyzing}
                partnerTyping={partnerTyping}
                socket={socket}
                handleSendMessage={handleSendMessage}
                handleSubmitPerspective={handleSubmitPerspective}
                handleCreateNewSession={handleCreateNewSession}
              />
            </div>

            {/* Right Pane / Profile Details */}
            <div className="col-lg-4">
              <div className="coping_divorce__fitem bgx-color border-bgx p-5 p-md-6 rounded-3 bg-white">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="mb-0">Your Profile Details</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="border-0 bg-transparent text-primary p-0"
                      title="Edit Profile"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="ti ti-edit" style={{ fontSize: '20px', color: 'var(--p1-color)' }}></i>
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleEditSubmit} className="d-flex flex-column gap-3 text-start">
                    {formError && (
                      <div className="alert alert-danger py-2 px-3 rounded-3" role="alert" style={{ fontSize: '13px' }}>
                        {formError}
                      </div>
                    )}
                    {formSuccess && (
                      <div className="alert alert-success py-2 px-3 rounded-3" role="alert" style={{ fontSize: '13px' }}>
                        {formSuccess}
                      </div>
                    )}

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-0" htmlFor="editUsername" style={{ color: '#190F47' }}>Username</label>
                      <input
                        id="editUsername"
                        type="text"
                        className="form-control py-3 px-4 rounded-3 fs-seven"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-0" htmlFor="editEmail" style={{ color: '#190F47' }}>Email</label>
                      <input
                        id="editEmail"
                        type="email"
                        className="form-control py-3 px-4 rounded-3 fs-seven"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-0" htmlFor="editPhone" style={{ color: '#190F47' }}>Phone Number</label>
                      <input
                        id="editPhone"
                        type="text"
                        className="form-control py-3 px-4 rounded-3 fs-seven"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-0" htmlFor="editOccupation" style={{ color: '#190F47' }}>Occupation</label>
                      <input
                        id="editOccupation"
                        type="text"
                        className="form-control py-3 px-4 rounded-3 fs-seven"
                        value={editOccupation}
                        onChange={(e) => setEditOccupation(e.target.value)}
                      />
                    </div>

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-1" style={{ color: '#190F47' }}>Gender</label>
                      <div className="d-flex align-items-center gap-4 mt-1">
                        <div className="form-check d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="editGender"
                            id="editGenderMale"
                            value="male"
                            checked={editGender === 'male'}
                            onChange={(e) => setEditGender(e.target.value)}
                            style={{ width: '14px', height: '14px', cursor: 'pointer', margin: 0 }}
                          />
                          <label className="form-check-label mb-0 fs-seven" htmlFor="editGenderMale" style={{ cursor: 'pointer' }}>
                            Male
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="editGender"
                            id="editGenderFemale"
                            value="female"
                            checked={editGender === 'female'}
                            onChange={(e) => setEditGender(e.target.value)}
                            style={{ width: '14px', height: '14px', cursor: 'pointer', margin: 0 }}
                          />
                          <label className="form-check-label mb-0 fs-seven" htmlFor="editGenderFemale" style={{ cursor: 'pointer' }}>
                            Female
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-flex flex-column gap-1">
                      <label className="fw_500 fs-seven mb-0" htmlFor="editProfilePic" style={{ color: '#190F47' }}>Profile Picture</label>
                      <input
                        id="editProfilePic"
                        type="file"
                        className="form-control py-2 px-3 rounded-3 fs-seven"
                        accept="image/*"
                        onChange={(e) => setEditProfilePic(e.target.files[0])}
                      />
                    </div>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary py-2 px-4 rounded-3 fs-seven w-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={updating}
                        className="cmn-btn border-0 py-2 px-4 rounded-3 fs-seven w-50 d-flex align-items-center gap-2 justify-content-center"
                      >
                        {updating ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={user?.profile_pic || "src/assets/images/avatar2.png"}
                          className="rounded-5 border border-2 border-primary"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                          alt="Profile"
                        />
                        <div>
                          <h5 className="mb-0">{user?.username || 'User'}</h5>
                          <span className="text-muted fs-nine">Member ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleCopyLink}
                        className="cmn-btn border-0 py-2 px-3 rounded-3 d-flex align-items-center gap-1"
                        style={{ fontSize: '12px' }}
                      >
                        <i className="ti ti-copy"></i>
                        Copy Link
                      </button>
                    </div>

                    <hr className="my-1" />

                    <div className="d-flex flex-column gap-2 fs-nine">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">User Name:</span>
                        <span>{user?.username}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Email:</span>
                        <span>{user?.email}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Phone:</span>
                        <span>{user?.phone || 'Not set'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Gender:</span>
                        <span className="text-capitalize">{user?.gender || 'Not set'}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Occupation:</span>
                        <span>{user?.occupation || 'Not set'}</span>
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Area Ends */}
      {showToast && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 py-2 px-4 rounded-3 shadow-lg d-flex align-items-center gap-2"
          style={{
            backgroundColor: '#190F47',
            color: '#ffffff',
            zIndex: 1050,
            fontSize: '14px',
            animation: 'fadeInUp 0.3s ease-out',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <i className="ti ti-circle-check-filled" style={{ color: '#28a745', fontSize: '18px' }}></i>
          <span style={{ color: '#ffffff' }}>{toastMessage}</span>
        </div>
      )}

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
  );
}

export default Dashboard;
