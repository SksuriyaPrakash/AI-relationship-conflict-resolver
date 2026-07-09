import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeToast } from '../../redux/notificationSlice'

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
          <div key={`toast-${toast.id}`} className="toast show align-items-center text-white border-0 mb-2" style={{ backgroundColor: toast.type === 'success' ? '#28a745' : 'var(--p1-color)' }} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body d-flex flex-column">
                <strong className="me-auto fs-eight">{toast.title}</strong>
                <span className="fs-nine mt-1">{toast.message}</span>
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => dispatch(removeToast(toast.id))} aria-label="Close"></button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Layout
