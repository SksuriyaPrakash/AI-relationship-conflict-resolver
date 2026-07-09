import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeToast } from '../../redux/notificationSlice'

const ToastItem = ({ toast }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, 5000); // Clear after 5 seconds
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <div className="toast show align-items-center text-white border-0 mb-2" style={{ backgroundColor: toast.type === 'success' ? '#28a745' : toast.type === 'error' ? '#dc3545' : '#190F47' }} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body d-flex flex-column">
          <strong className="me-auto fs-eight">{toast.title}</strong>
          <span className="fs-nine mt-1">{toast.message}</span>
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => dispatch(removeToast(toast.id))} aria-label="Close"></button>
      </div>
    </div>
  );
};

function Layout() {
  const dispatch = useDispatch();
  const { toasts } = useSelector((state) => state.notifications || { toasts: [] });

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      
      {/* Toast Container */}
      <div className="toast-container position-fixed top-0 end-0 p-3 mt-5" style={{ zIndex: 9999 }}>
        {toasts.map(toast => (
          <ToastItem key={`toast-${toast.id}`} toast={toast} />
        ))}
      </div>
    </>
  )
}

export default Layout
