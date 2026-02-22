import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
          {/*  Footer Section Starts */}
    <footer className="footer pt-120">
        <div className="container">
            <div className="row g-5 pb-120 justify-content-between">
                <div className="col-sm-6 col-md-3 col-lg-4 col-xxl-3">
                    <div className="footer__decs">
                        <Link to="/"
                            className="footer__decs-logo d-flex align-items-center gap-1 gap-md-2 mb-5 mb-md-6">
                            <img src="src/assets/images/logo.png" alt="logo" />
                            <img src="src/assets/images/logo-text.png" alt="logo" />
                        </Link>
                        <p className="fs-ten">People have various relationship issues love, family, marriage,
                            divorce etc. and they get advices from in our website. We also spice up with nice stories
                            and articles by various authors in our website.</p>
                    </div>
                </div>
                <div className="col-6 col-sm-3 col-md-2 col-lg-2 col-xxl-2">
                    <div className="footer__discover">
                        <h4 className="mb-4 mb-sm-5 mb-md-6 s2-color">Discover</h4>
                        <div className="footer__discover-nav">
                            <ul className="d-flex flex-column gap-4 gap-md-5">
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="discussion.html" className="fs-ten">Discussion</a>
                                </li>
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="advice.html" className="fs-ten">Advisors</a>
                                </li>
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="stories.html" className="fs-ten">Stories</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-3 col-md-2 col-lg-2 col-xxl-2">
                    <div className="footer__community">
                        <h4 className="mb-4 mb-sm-5 mb-md-6 s2-color">Like</h4>
                        <div className="footer__community-item">
                            <ul className="d-flex flex-column gap-4 gap-md-5">
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="podcast.html" className="fs-ten">Podcasts</a>
                                </li>
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="javascript:void(0)" className="fs-ten">Blog</a>
                                </li>
                                <li className="dropdown d-flex align-items-center">
                                    <i className="ti ti-arrow-badge-right fs-ten s2-color"></i>
                                    <a href="javascript:void(0)" className="fs-ten">Help center</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-5 col-lg-4 col-xxl-4">
                    <div className="footer__tag">
                        <h4 className="mb-4 mb-sm-5 mb-md-6 s2-color">Community</h4>
                        <div className="latest_articles__tag">
                            <ul className="d-flex flex-wrap align-items-center gap-2">
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">All</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Love</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Dating</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Locality</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Backup</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Love
                                        Stories</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Personal</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Long
                                        stories</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Legal</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"
                                        className=" border-color6 hv px-4 py-2 rou rounded-4">More...</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="footer__hr border-btom mx-auto p-0 w-100 " />
            <div className="row align-items-center justify-content-between py-3">
                <div className="col-sm-6 col-md-5 order-2 order-sm-1">
                    <div className="footer__copyright text-center text-sm-start">
                        <span>Copyright © 2024 <a href="javascript:void(0)" className="s2-color">Pairup</a>. All rights
                            reserved</span>
                    </div>
                </div>
                <div className="col-sm-6 col-md-5 order-1">
                    <div
                        className="footer__social d-flex align-items-center justify-content-center justify-content-sm-end gap-1">
                        <a href="javascript:void(0)"><i className="fa-brands fa-facebook fs-four p-2"></i></a>
                        <a href="javascript:void(0)"><i className="fa-brands fa-instagram fs-four p-2"></i></a>
                        <a href="javascript:void(0)"><i className="fa-brands fa-telegram fs-four p-2"></i></a>
                        <a href="javascript:void(0)"><i className="fa-brands fa-twitter fs-four p-2"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    {/*  Footer Section Ends */}
    </>
  )
}

export default Footer
