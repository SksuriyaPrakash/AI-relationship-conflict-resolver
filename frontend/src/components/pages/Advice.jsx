import React from 'react'

function Advice() {
  return (
    <>
          {/* Discussion Starts */}
    <section className="advice_area pt-md-20 pb-20 mb-md-80">
        <div className="container mt-12">
            <div className="row">
                <nav className="advice_area__breadcrumb mb-6 mb-md-8">
                    <ul className="d-flex align-items-center gap-3 gap-md-4">
                        <li className="d-center gap-2 gap-lg-3">
                            <i className="ti ti-home fs-six"></i>
                            <a href="index-three.html" className="fs-seven">Home</a>
                        </li>
                        <li className="d-center">
                            <i className="ti ti-chevron-right"></i>
                        </li>
                        <li className="d-center gap-2 gap-lg-3">
                            <i className="material-symbols-outlined fs-six cpoint">
                                widgets
                            </i>
                            <span className="fw-bold fs-six cpoint">Advice</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="row align-items-center justify-content-center">
                <div className="col-12">
                    <h2 className="text-center mb-7 md-md-10">Our Advisors</h2>
                </div>
                <div className="col-lg-8 col-xxl-6">
                    <div className="advice_area__search">
                        <div
                            className="border-bg1 p2-bg d-flex align-items-center justify-content-between px-2 px-md-5 py-1 py-md-3 mb-2 rounded-4">
                            <div className="hero_area__categorytwo d-none d-sm-block">
                                <select>
                                    <option data-display="Categories">Nothing</option>
                                    <option value="1">option one</option>
                                    <option value="2">Another Two</option>
                                </select>
                            </div>
                            <span className="v-line sm mb-7 d-none d-md-block ms-7"></span>
                            <form className="hero_two__searchap d-flex align-items-center justify-content-between">
                                <input type="text" name="q" placeholder="Search" className="w-100" />
                                <button type="submit" className="cmn-btn ps-4 pe-7 py-3 rounded-4">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Discussion Ends */}
    {/* Card Group area Starts */}
    <section className="card_group pb-120">
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/jane-cooper123.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Jane Cooper</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/prantika.png" className="top_monthx__pid rounded-item" alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Arlene McCoy</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/savannah-nguyen123.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Savannah Nguyen</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/leslie-alexander123.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Leslie Alexander</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/darrell-stewardkghdsi.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Darrell Steward</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/courtney-henry.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Courtney Henry</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/cody-fishersfd.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Cody Fisher</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="coping_divorce__idcard top_monthx__item py-8 mx-auto rounded-3">
                        <div className="coping_divorce__idcard-thumb mb-7 mb-md-10 position-relative text-center">
                            <img src="src/assets/images/jacob-joness.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right exhvr s4-bg fs-four rounded-item border-3 border-white cpoint d-inline-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>Jacob Jones</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">$24</span>
                                    <span className="fs-ten">/hour</span>
                                </div>
                            </div>
                            <div className="balancing_work__review-icon">
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                <i className="ti ti-star-filled fs-six p9-color"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div
                        className="discussion_area__paganition d-flex align-items-center justify-content-center mt-7 mt-md-10">
                        <div className="pagination d-flex align-items-center rounded-5 overflow-hidden">
                            <a href="javascript:void(0)" className="rond fw_500"><i
                                    className="ti ti-chevron-left fs-six"></i></a>
                            <a href="javascript:void(0)" className="jbor fw_500">1</a>
                            <a className="active jbor fw_500" href="javascript:void(0)">2</a>
                            <a href="javascript:void(0)" className="jbor fw_500">3</a>
                            <a href="javascript:void(0)" className="jbor fw_500 d-none d-sm-block">4</a>
                            <a href="javascript:void(0)" className="jbor fw_500">...</a>
                            <a href="javascript:void(0)" className="jbor fw_500">10</a>
                            <a href="javascript:void(0)" className="rond fw_500"><i
                                    className="ti ti-chevron-right fs-six"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Card Ends area Starts */}
    {/* Newsletter section starts */}
    <section className="news_letter3 bg1-color rounded-5 mx-xxl-11 position-relative">
        <div className="container position-relative cus-z2">
            <div className="row align-items-center justify-content-between gy-6">
                <div className="col-lg-6 col-xl-5 col-xxl-4">
                    <div className="news_letter__content news_letter3__content2 cus-z2">
                        <h2 className="mb-3 mb-md-4">Join our newsletter</h2>
                        <p className="fs-ten mb-4 mb-md-5 mb-lg-6">Read and share new perspectives on just
                            about any topic.
                            Everyone’s welcome</p>
                        <div className="news_letter3__point mb-7 mb-md-8 mb-lg-10">
                            <ul>
                                <li className="d-flex align-items-center gap-3 mb-4 mb-md-5">
                                    <i className="ti ti-circle-dot-filled s2-color s2-bg rounded-5"></i>
                                    <span className="fs-ten">Get more Discussion</span>
                                </li>
                                <li className="d-flex align-items-center gap-3">
                                    <i className="ti ti-circle-dot-filled s2-color s2-bg rounded-5"></i>
                                    <span className="fs-ten">Get more Information</span>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="news_letter__content-search d-flex align-items-center  border-color3 rounded-5 py-0 py-md-1 pe-0 pe-md-1">
                            <input type="text" name="q" placeholder="Enter your email" />
                            <button className="news_letter__content-btn d-center cmn-btn rounded-5">
                                <i className="ti ti-arrow-up-right fs-four"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xl-7 col-xxl-7">
                    <div className="news_letter3__item">
                        <img src="src/assets/images/news-shapes.png" className="max-un d-none d-lg-block" alt="Images" />
                        <img src="src/assets/images/news-shapes2.png" className="d-block d-lg-none" alt="Images" />
                    </div>
                </div>
            </div>
        </div>
        <div className="auth_month__animation position-absolute top-0 start-0 cus-z0">
            <img src="src/assets/images/top-authors-of.png" className="rotated_bigsmall cus-z0" alt="Shape" />
        </div>
    </section>
    {/* Newsletter section ends */}
    </>
  )
}

export default Advice
