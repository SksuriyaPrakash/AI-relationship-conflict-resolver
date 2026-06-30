import React from 'react'

const Discussion = () => {
  return (
    <>
        {/*   Discussion Starts */}
    <section className="discussion_area pt-15 pt-md-20 pb-120">
        <div className="container mt-12">
            <div className="row">
                <nav className="breadcrumb_area mb-7 mb-md-10">
                    <ul className="d-flex align-items-center gap-3 gap-md-4">
                        <li className="d-center gap-2 gap-lg-3">
                            <i className="ti ti-home fs-six"></i>
                            <a href="index-three.html" className="fs-seven">Home</a>
                        </li>
                        <li className="d-center">
                            <i className="ti ti-chevron-right"></i>
                        </li>
                        <li>
                            <span className="fw-bold fs-seven">Discussion</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="row gy-15">
                <div className="col-xl-8">
                    <div className="discussion_area__aside">
                        <div className="discussion_area__post rounded-4 p-4 p-md-5 mb-8 mb-md-10">
                            <form action="#">
                                <div className="discussion_area__post-textarea rounded-3 mb-3">
                                    <textarea rows="4" cols="50" placeholder="Write something to Lerio.."></textarea>
                                </div>
                                <div
                                    className="discussion_area__post-filezoom d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <ul className="d-flex align-items-center gap-2">
                                        <li>
                                            <img src="src/assets/images/discussion-samon.png" alt="Image" />
                                        </li>
                                        <li className="discussion_area__post-file file d-center">
                                            <label htmlFor="file" className="label cpoint">
                                                <i className="fa-regular fa-image fs-three p-2 p-md-3 rounded-3"></i>
                                            </label>
                                            <input type="file" id="file" className="d-none" />
                                        </li>
                                        <li>
                                            <span className="cpoint"><i
                                                    className="ti ti-mood-happy fs-three p-3 rounded-3"></i></span>
                                        </li>
                                        <li>
                                            <span className="cpoint"><i
                                                    className="ti ti-brand-zoom fs-three p-3 rounded-3"></i></span>
                                        </li>
                                    </ul>
                                    <div className="discussion_area__post-btn">
                                        <button className="cmn-btn px-3 px-md-4 py-2 py-md-3 rounded-3 d-cneter gap-2"><i
                                                className="ti ti-pencil"></i> Post</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="discussion_area__content bgx-11 border-bg5 rounded-4 p-5 p-md-7 mb-8 mb-md-10">
                            <div className="balancing_work__item">
                                <div
                                    className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-8 mb-md-10">
                                    <div className="balancing_work__item-one d-flex flex-wrap align-items-center gap-2">
                                        <a href="javascript:void(0)"><img src="src/assets/images/avatar-small.png"
                                                alt="Images" /></a>
                                        <a href="javascript:void(0)" className="fw-semibold s3-color s2-hvcr">SAMON@A</a>
                                        <i className="ti ti-point-filled s3-color"></i>
                                        <span className="p4-color">4day ago</span>
                                    </div>
                                    <div className="balancing_work__item-two  gap-2">
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">love</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Query</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Intimacy</a>
                                    </div>
                                </div>
                                <h2 className="mb-4 mb-md-5">Religious Acceptance in Relationships</h2>
                                <p className="fs-ten mb-6 mb-md-8">In today's fast-paced world, finding the right
                                    equilibrium between work and love life can be a challenging task. The demands of a
                                    career, personal goals, and family can often pull us in different directions,
                                    leaving little time and energy for our relationships. However, striking a balance is
                                    crucial for maintaining a healthy, fulfilling partnership. In this article, we'll
                                    explore the importance of balancing work and love life and provide practical tips to
                                    help you achieve it.
                                </p>
                                <div className="discussion_area__aside__content-thumb mb-8 mb-md-10">
                                    <img src="src/assets/images/religious-acceptance.png" className="rounded-4 " alt="Images" />
                                </div>
                                <h4 className="fw_500 mb-4 mb-md-5">Expert Opinion</h4>
                                <div
                                    className="balancing_work__review border-bg5 d-inline-flex flex-wrap align-items-center gap-5 gap-md-8 gap-lg-10 p-3 p-sm-4 p-lg-5 rounded-4 mb-8 mb-md-10">
                                    <div className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
                                        <div className="balancing_work__review-profile">
                                            <img src="src/assets/images/avatar2.png" className="rounded-5" alt="Images" />
                                        </div>
                                        <div className="balancing_work__review-star">
                                            <span className="p8-color">80 Solution</span>
                                            <a href="javascript:void(0)">
                                                <h5 className="mb-1">Cameron William</h5>
                                            </a>
                                            <div className="balancing_work__review-icon">
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p9-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)">
                                        <h5 className="s2-color border-btom pb-2 cpoint">Ask the expert</h5>
                                    </a>
                                </div>
                                <h4 className="fw_500 mb-8 mb-md-10">Why Balance Matters</h4>
                                <p className="fs-ten mb-8 mb-md-10">Balancing work and love life is essential for several
                                    reasons:
                                    Strengthening the Relationship: Quality time spent together is the cornerstone of a
                                    healthy relationship. When you achieve a balance, you can nurture your connection
                                    and intimacy.
                                    Reducing Stress: Overcommitting to work at the expense of your personal life can
                                    lead to burnout and increased stress levels. A balanced life allows for relaxation
                                    and rejuvenation.
                                    Fulfillment: Achieving your career goals is essential, but so is pursuing personal
                                    happiness and fulfillment. Balancing both aspects ensures a well-rounded
                                    life.Practical Tips for Balancing Work and Love Life
                                    Set Clear Boundaries: Establish clear boundaries between your work and personal
                                    life. Avoid checking work emails or taking business calls during your quality time
                                    with your.
                                </p>
                                <div
                                    className="discussion_area__likecommnet mb-4 mb-md-5 d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="discussion_area__likecommnet-gimage d-flex align-items-center">
                                        <img src="src/assets/images/des1.png" alt="Images" />
                                        <img src="src/assets/images/des2.png" alt="Images" />
                                        <img src="src/assets/images/des3.png" alt="Images" />
                                        <img src="src/assets/images/des4.png" alt="Images" />
                                    </div>
                                    <div
                                        className="discussion_area__likecommnet-comment d-flex align-items-center gap-4 gap-md-5">
                                        <span>4 Commnets</span>
                                        <span>1 Share</span>
                                    </div>
                                </div>
                                <div
                                    className="discussion_area__likecmnsr py-4 py-md-5 d-flex align-items-center justify-content-between">
                                    <div
                                        className="discussion_area__likecmnsr-like d-flex align-items-center gap-1 gap-md-2">
                                        <i className="ti ti-heart s2-color"></i>
                                        <span className="s2-color">Like</span>
                                    </div>
                                    <div
                                        className="discussion_area__likecmnsr-cmn d-flex align-items-center gap-1 gap-md-2">
                                        <i className="ti ti-message-2"></i>
                                        <span>Comments</span>
                                    </div>
                                    <div
                                        className="discussion_area__likecmnsr-cmn d-flex align-items-center gap-1 gap-md-2">
                                        <i className="ti ti-brand-stackshare"></i>
                                        <span>Share</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="discussion_area__comment d-flex align-items-center justify-content-between gap-2 mt-5 mt-md-7 flex-wrap flex-md-nowrap mb-8 mb-md-10">
                                <div className="discussion_area__comment-ppic">
                                    <img src="src/assets/images/comment-profile.png" className="rounded-3" alt="Images" />
                                </div>
                                <form
                                    className="d-flex align-items-center justify-content-between w-100 gap-2 flex-wrap flex-md-nowrap">
                                    <div
                                        className="discussion_area__comment-inputarea d-flex justify-content-between align-content-center flex-wrap flex-sm-nowrap p2-bg rounded-3 w-100">
                                        <div className="w-100">
                                            <input type="text" placeholder="Write a comment..." />
                                        </div>
                                        <div className="icon-group d-flex align-items-center">
                                            <div className="discussion_area__comment-gif">
                                                <span className="cpoint">
                                                    <i className="material-symbols-outlined fs-four p-3 rounded-3">
                                                        gif_box
                                                    </i>
                                                </span>
                                            </div>
                                            <div className="discussion_area__comment-img">
                                                <label htmlFor="imge" className="label cpoint">
                                                    <i className="fa-regular fa-image fs-four p-3 rounded-3"></i>
                                                </label>
                                                <input type="file" id="imge" className="d-none" />
                                            </div>
                                            <div>
                                                <span className="cpoint d-center">
                                                    <i className="ti ti-mood-happy fs-four p-3 rounded-3"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="discussion_area__comment-btn">
                                        <div>
                                            <button className="cmn-btn py-2 py-md-3 px-6 px-md-8"><i
                                                    className="ti ti-send fs-three"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="discussion_area__ccontent ms-0 ms-md-20 ">
                                <div
                                    className="discussion_area__ccontent-josefs d-flex flex-wrap flex-sm-nowrap gap-4 gap-md-5 pb-6 pb-md-8">
                                    <div className="discussion_area__ccontent-thumb">
                                        <img src="src/assets/images/josef22.png" alt="Images" />
                                    </div>
                                    <div className="discussion_area__ccontent-body">
                                        <div className="rounded-3 p-3 p-md-4 py-2 py-md-3 bg1-color mb-2  mb-md-3">
                                            <div
                                                className="discussion_area__ccontent-head d-flex align-items-center justify-content-between pb-2 pb-md-3">
                                                <span className="fs-ten fw_500">Josef</span>
                                                <a href="javascript:void(0)" className="d-center">
                                                    <i className="ti ti-dots fs-four"></i>
                                                </a>
                                            </div>
                                            <p>The only way to solve the problem is to code for the hardware directly
                                            </p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fs-seven cpoint">Like</span>
                                            <i className="ti ti-point-filled"></i>
                                            <button className="comment_replys" type="button">
                                                <span className="fs-seven cpoint">Reply</span>
                                            </button>

                                        </div>
                                        <div className="comment_replysshow">
                                            <div
                                                className="discussion_area__ccontent-showhide d-flex align-items-center justify-content-between gap-2 flex-wrap flex-md-nowrap pt-5">
                                                <div className="discussion_area__comment-ppic">
                                                    <img src="src/assets/images/comment-profile.png" className="rounded-3"
                                                        alt="Images" />
                                                </div>
                                                <form
                                                    className="d-flex align-items-center justify-content-between w-100 gap-2 flex-wrap flex-md-nowrap">
                                                    <div
                                                        className="discussion_area__comment-inputarea d-flex justify-content-between align-content-center flex-wrap flex-sm-nowrap p2-bg rounded-3 w-100">
                                                        <div className="w-100">
                                                            <input type="text" placeholder="Write a comment..." />
                                                        </div>
                                                        <div className="icon-group d-flex align-items-center">
                                                            <div className="discussion_area__comment-gif">
                                                                <span className="cpoint">
                                                                    <i
                                                                        className="material-symbols-outlined fs-four p-3 rounded-3">
                                                                        gif_box
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <div className="discussion_area__comment-img">
                                                                <label htmlFor="imge" className="label cpoint">
                                                                    <i
                                                                        className="fa-regular fa-image fs-four p-3 rounded-3"></i>
                                                                </label>
                                                                <input type="file" id="imagess" className="d-none" />
                                                            </div>
                                                            <div>
                                                                <span className="cpoint d-center">
                                                                    <i
                                                                        className="ti ti-mood-happy fs-four p-3 rounded-3"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="discussion_area__comment-btn">
                                                        <div>
                                                            <button className="cmn-btn py-2 px-4 px-sm-7 "><i
                                                                className="ti ti-send fs-four"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="discussion_area__ccontent-josefx d-flex flex-wrap flex-sm-nowrap gap-4 gap-md-5 ms-3 ms-sm-18 mb-6 mb-md-8">
                                    <div className="discussion_area__ccontent-thumb">
                                        <img src="src/assets/images/alex22.png" alt="Images" />
                                    </div>
                                    <div className="discussion_area__ccontent-body">
                                        <div className="rounded-3 p-3 p-md-4 py-2 py-md-3 bg1-color mb-2  mb-md-3">
                                            <div
                                                className="discussion_area__ccontent-head d-flex align-items-center justify-content-between mb-2 mb-md-3">
                                                <span className="fs-ten fw_500">Alex</span>
                                                <a href="javascript:void(0)" className="d-center">
                                                    <i className="ti ti-dots fs-four"></i>
                                                </a>
                                            </div>
                                            <p>The only way to solve the</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fs-seven cpoint">Like</span>
                                            <i className="ti ti-point-filled"></i>
                                            <button className="comment_replys" type="button">
                                                <span className="fs-seven cpoint">Reply</span>
                                            </button>
                                        </div>
                                        <div className="comment_replysshow">
                                            <div
                                                className="discussion_area__ccontent-showhide d-flex align-items-center justify-content-between gap-2 flex-wrap flex-md-nowrap pt-5">
                                                <div className="discussion_area__comment-ppic">
                                                    <img src="src/assets/images/comment-profile.png" className="rounded-3"
                                                        alt="Images" />
                                                </div>
                                                <form
                                                    className="d-flex align-items-center justify-content-between w-100 gap-2 flex-wrap flex-md-nowrap">
                                                    <div
                                                        className="discussion_area__comment-inputarea d-flex justify-content-between align-content-center flex-wrap flex-sm-nowrap p2-bg rounded-3 w-100">
                                                        <div className="w-100">
                                                            <input type="text" placeholder="Write a comment..." />
                                                        </div>
                                                        <div className="icon-group d-flex align-items-center">
                                                            <div className="discussion_area__comment-gif">
                                                                <span className="cpoint">
                                                                    <i
                                                                        className="material-symbols-outlined fs-four p-3 rounded-3">
                                                                        gif_box
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <div className="discussion_area__comment-img">
                                                                <label htmlFor="imge" className="label cpoint">
                                                                    <i
                                                                        className="fa-regular fa-image fs-four p-3 rounded-3"></i>
                                                                </label>
                                                                <input type="file" id="imagestwo" className="d-none" />
                                                            </div>
                                                            <div>
                                                                <span className="cpoint d-center">
                                                                    <i
                                                                        className="ti ti-mood-happy fs-four p-3 rounded-3"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="discussion_area__comment-btn">
                                                        <div>
                                                            <button className="cmn-btn py-2 px-4 px-sm-7 "><i
                                                                className="ti ti-send fs-four"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="discussion_area__ccontent-josef d-flex flex-wrap flex-sm-nowrap gap-4 gap-md-5 ms-3 ms-sm-18">
                                    <div className="discussion_area__ccontent-thumb">
                                        <img src="src/assets/images/haplika22.png" alt="Images" />
                                    </div>
                                    <div className="discussion_area__ccontent-body">
                                        <div className="rounded-3 p-3 p-md-4 py-2 py-md-3 bg1-color mb-2  mb-md-3">
                                            <div
                                                className="discussion_area__ccontent-head d-flex align-items-center justify-content-between mb-2 mb-md-3">
                                                <span className="fs-ten fw_500">Haplika</span>
                                                <a href="javascript:void(0)" className="d-center">
                                                    <i className="ti ti-dots fs-four"></i>
                                                </a>
                                            </div>
                                            <p>The only way to solve the</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fs-seven cpoint">Like</span>
                                            <i className="ti ti-point-filled"></i>
                                            <button className="comment_replys" type="button">
                                                <span className="fs-seven cpoint">Reply</span>
                                            </button>
                                        </div>
                                        <div className="comment_replysshow">
                                            <div
                                                className="discussion_area__ccontent-showhide d-flex align-items-center justify-content-between gap-2 flex-wrap flex-md-nowrap pt-5">
                                                <div className="discussion_area__comment-ppic">
                                                    <img src="src/assets/images/comment-profile.png" className="rounded-3"
                                                        alt="Images" />
                                                </div>
                                                <form
                                                    className="d-flex align-items-center justify-content-between w-100 gap-2 flex-wrap flex-md-nowrap">
                                                    <div
                                                        className="discussion_area__comment-inputarea d-flex justify-content-between align-content-center flex-wrap flex-sm-nowrap p2-bg rounded-3 w-100">
                                                        <div className="w-100">
                                                            <input type="text" placeholder="Write a comment..." />
                                                        </div>
                                                        <div className="icon-group d-flex align-items-center">
                                                            <div className="discussion_area__comment-gif">
                                                                <span className="cpoint">
                                                                    <i
                                                                        className="material-symbols-outlined fs-four p-3 rounded-3">
                                                                        gif_box
                                                                    </i>
                                                                </span>
                                                            </div>
                                                            <div className="discussion_area__comment-img">
                                                                <label htmlFor="imge" className="label cpoint">
                                                                    <i
                                                                        className="fa-regular fa-image fs-four p-3 rounded-3"></i>
                                                                </label>
                                                                <input type="file" id="imgeses" className="d-none" />
                                                            </div>
                                                            <div>
                                                                <span className="cpoint d-center">
                                                                    <i
                                                                        className="ti ti-mood-happy fs-four p-3 rounded-3"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="discussion_area__comment-btn">
                                                        <div>
                                                            <button className="cmn-btn py-2 px-4 px-sm-7 "><i
                                                                className="ti ti-send fs-four"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="coping_divorce__fitem discussion_area__card d-flex align-items-center gap-3 gap-md-5 border-bg5 py-4 py-sm-7 py-lg-10 py-xxl-12 px-4 px-sm-6 px-lg-7 rounded-3 position-relative overflow-hidden mb-8 mb-md-10">
                            <div className="balancing_work__item-thumb active-slidimg d-none">
                                <img src="src/assets/images/balancing-work.png" className="rounded-4 max-un" alt="Images" />
                            </div>
                            <div className="balancing_work__item">
                                <div
                                    className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5 mb-md-6">
                                    <div className="balancing_work__item-one d-flex flex-wrap align-items-center gap-2">
                                        <a href="javascript:void(0)"><img src="src/assets/images/camsam1.png"
                                                alt="Images" /></a>
                                        <a href="javascript:void(0)" className="fw-semibold s3-color s2-hvcr">SAMON@A</a>
                                        <i className="ti ti-point-filled s3-color"></i>
                                        <span className="p4-color">4day ago</span>
                                    </div>
                                    <div className="balancing_work__item-two  gap-2">
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">love</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Query</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Intimacy</a>
                                    </div>
                                </div>
                                <h2 className="mb-4 mb-md-5">Coping with a breakup or divorce?</h2>
                                <p className="fs-ten mb-5 mb-md-6">Discover effective communication strategies
                                    to deepen your connection <br/> and resolve conflicts in your relationship.
                                </p>
                                <div
                                    className="balancing_work__review d-inline-flex flex-wrap align-items-center gap-5 gap-md-8 gap-lg-10 p-3 p-sm-4 p-lg-5 p2-bg rounded-20 mb-5 mb-md-6 border-bg5">
                                    <div className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
                                        <div className="balancing_work__review-profile">
                                            <img src="src/assets/images/camsam2.png" className="rounded-5" alt="Images" />
                                        </div>
                                        <div className="balancing_work__review-star">
                                            <span className="p8-color">80 Solution</span>
                                            <a href="javascript:void(0)">
                                                <h5 className="mb-1">Cameron William</h5>
                                            </a>
                                            <div className="balancing_work__review-icon">
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p9-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)">
                                        <h5 className="s2-color border-btom pb-2 cpoint">Ask the expert</h5>
                                    </a>
                                </div>
                                <div className="balancing_work__footer d-flex align-items-center gap-5 gap-md-6">
                                    <div className="balancing_work__footer-share d-flex align-items-center gap-2">
                                        <i className="ti ti-bookmarks fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                        <i
                                            className="ti ti-brand-stackshare fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                    </div>
                                    <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-thumb-up fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">120</span>
                                        </div>
                                        <span className="v-line lg mb-3"></span>
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-message fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src="src/assets/images/coping-footer-shape.png"
                                className="coping_divorce__fitem-shape position-absolute end-0 bottom-0 rotated_bigsmall"
                                alt="Shape" />
                        </div>
                        <div
                            className="coping_divorce__fitem discussion_area__card d-flex align-items-center gap-3 gap-md-5 border-bg5 py-4 py-sm-7 py-lg-10 py-xxl-12 px-4 px-sm-6 px-lg-7 rounded-3 position-relative overflow-hidden mb-8 mb-md-10">
                            <div className="balancing_work__item-thumb active-slidimg d-none">
                                <img src="src/assets/images/fareel-kurniawan.png" className="rounded-4 max-un" alt="Images" />
                            </div>
                            <div className="balancing_work__item">
                                <div
                                    className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5 mb-md-6">
                                    <div className="balancing_work__item-one d-flex flex-wrap align-items-center gap-2">
                                        <a href="javascript:void(0)"><img src="src/assets/images/whatname-3.png"
                                                alt="Images" /></a>
                                        <a href="javascript:void(0)" className="fw-semibold s3-color s2-hvcr">SAMON@A</a>
                                        <i className="ti ti-point-filled s3-color"></i>
                                        <span className="p4-color">4day ago</span>
                                    </div>
                                    <div className="balancing_work__item-two  gap-2">
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">love</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Query</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Intimacy</a>
                                    </div>
                                </div>
                                <h2 className="mb-4 mb-md-5">What precautions I take when dating</h2>
                                <p className="fs-ten mb-5 mb-md-6">Discover effective communication strategies
                                    to deepen your connection <br/> and resolve conflicts in your relationship.
                                </p>
                                <div
                                    className="balancing_work__review d-inline-flex flex-wrap align-items-center gap-5 gap-md-8 gap-lg-10 p-3 p-sm-4 p-lg-5 p2-bg rounded-20 mb-5 mb-md-6 border-bg5">
                                    <div className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
                                        <div className="balancing_work__review-profile">
                                            <img src="src/assets/images/whatname-2.png" className="rounded-5" alt="Images" />
                                        </div>
                                        <div className="balancing_work__review-star">
                                            <span className="p8-color">80 Solution</span>
                                            <a href="javascript:void(0)">
                                                <h5 className="mb-1">Cameron William</h5>
                                            </a>
                                            <div className="balancing_work__review-icon">
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p9-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)">
                                        <h5 className="s2-color border-btom pb-2 cpoint">Ask the expert</h5>
                                    </a>
                                </div>
                                <div className="balancing_work__footer d-flex align-items-center gap-5 gap-md-6">
                                    <div className="balancing_work__footer-share d-flex align-items-center gap-2">
                                        <i className="ti ti-bookmarks fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                        <i
                                            className="ti ti-brand-stackshare fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                    </div>
                                    <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-thumb-up fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">120</span>
                                        </div>
                                        <span className="v-line lg mb-3"></span>
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-message fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src="src/assets/images/coping-footer-shape.png"
                                className="coping_divorce__fitem-shape position-absolute end-0 bottom-0 rotated_bigsmall"
                                alt="Shape" />
                        </div>
                        <div
                            className="coping_divorce__fitem discussion_area__card d-flex align-items-center gap-3 gap-md-5 border-bg5 py-4 py-sm-7 py-lg-10 py-xxl-12 px-4 px-sm-6 px-lg-7 rounded-3 position-relative overflow-hidden mb-10 mb-md-15">
                            <div className="balancing_work__item-thumb active-slidimg d-none">
                                <img src="src/assets/images/fareel-kurniawan.png" className="rounded-4 max-un" alt="Images" />
                            </div>
                            <div className="balancing_work__item">
                                <div
                                    className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5 mb-md-6">
                                    <div className="balancing_work__item-one d-flex flex-wrap align-items-center gap-2">
                                        <a href="javascript:void(0)"><img src="src/assets/images/loved-women.png"
                                                alt="Images" /></a>
                                        <a href="javascript:void(0)" className="fw-semibold s3-color s2-hvcr">SAMON@A</a>
                                        <i className="ti ti-point-filled s3-color"></i>
                                        <span className="p4-color">4day ago</span>
                                    </div>
                                    <div className="balancing_work__item-two  gap-2">
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">love</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Query</a>
                                        <a href="javascript:void(0)" className="py-1 px-3 bg5-color rounded-5 ">Intimacy</a>
                                    </div>
                                </div>
                                <h2 className="mb-4 mb-md-5">What precautions I take when dating</h2>
                                <p className="fs-ten mb-5 mb-md-6">Discover effective communication strategies
                                    to deepen your connection <br/> and resolve conflicts in your relationship.
                                </p>
                                <div
                                    className="balancing_work__review d-inline-flex flex-wrap align-items-center gap-5 gap-md-8 gap-lg-10 p-3 p-sm-4 p-lg-5 p2-bg rounded-20 mb-5 mb-md-6 border-bg5">
                                    <div className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
                                        <div className="balancing_work__review-profile">
                                            <img src="src/assets/images/loved-men.png" className="rounded-5" alt="Images" />
                                        </div>
                                        <div className="balancing_work__review-star">
                                            <span className="p8-color">80 Solution</span>
                                            <a href="javascript:void(0)">
                                                <h5 className="mb-1">Cameron William</h5>
                                            </a>
                                            <div className="balancing_work__review-icon">
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p8-color"></i>
                                                <i className="ti ti-star-filled fs-six p9-color"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:void(0)">
                                        <h5 className="s2-color border-btom pb-2 cpoint">Ask the expert</h5>
                                    </a>
                                </div>
                                <div className="balancing_work__footer d-flex align-items-center gap-5 gap-md-6">
                                    <div className="balancing_work__footer-share d-flex align-items-center gap-2">
                                        <i className="ti ti-bookmarks fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                        <i
                                            className="ti ti-brand-stackshare fs-five s2-color bg5-color p-2 rounded-2 cpoint"></i>
                                    </div>
                                    <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-thumb-up fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">120</span>
                                        </div>
                                        <span className="v-line lg mb-3"></span>
                                        <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                            <i className="ti ti-message fs-four s2-color cpoint"></i>
                                            <span className="fs-ten">20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src="src/assets/images/coping-footer-shape.png"
                                className="coping_divorce__fitem-shape position-absolute end-0 bottom-0 rotated_bigsmall"
                                alt="Shape" />
                        </div>
                        <div className="discussion_area__paganition d-flex align-items-center justify-content-center">
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
                <div className="col-xl-4 position-relative">
                    <div className="discussion_area__sidebar">
                        <div className="discussion_area__sidetop rounded-4 p-4 p-md-5 mb-6 mb-md-7">
                            <div className="discussion_area__sidetop-tag mb-7 mb-md-9">
                                <h4 className="mb-5 mb-md-6">Top Stories</h4>
                                <div className="latest_articles__tag">
                                    <ul className="d-flex flex-wrap align-items-center gap-5">
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">All</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Love</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Dating</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Locality</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Backup</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Love
                                                Stories</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Personal</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Long
                                                stories</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className="b2-bg hvr px-4 py-2 rou rounded-4">Legal</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)"
                                                className=" border-color6 hv px-4 py-2 rou rounded-4">More...</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div
                                className="discussion_area__tcard d-flex align-items-center gap-6 gap-xxl-8 border-s2 p-4 p-md-5 rounded-4 mb-4 mb-md-5">
                                <div className="discussion_area__tcard-thumb">
                                    <img src="src/assets/images/how-cani.png" className="rounded-5 max-un" alt="Images" />
                                </div>
                                <div className="discussion_area__tcard-content">
                                    <span
                                        className="mb-2 fw-bold fs-eight px-2 py-1 rounded-4 s7-bg p2-color">Intimacy</span>
                                    <p className="fs-ten">How can I be an ally to underre presented groups?</p>
                                </div>
                            </div>
                            <div
                                className="discussion_area__tcard d-flex align-items-center gap-6 gap-xxl-8 border-s2 p-4 p-md-5 rounded-4 mb-4 mb-md-5">
                                <div className="discussion_area__tcard-thumb">
                                    <img src="src/assets/images/how-cani2.png" className="rounded-5 max-un" alt="Images" />
                                </div>
                                <div className="discussion_area__tcard-content">
                                    <span
                                        className="mb-2 fw-bold fs-eight px-2 py-1 rounded-4 s7-bg p2-color">Intimacy</span>
                                    <p className="fs-ten">How can I be an ally to underre presented groups?</p>
                                </div>
                            </div>
                            <div
                                className="discussion_area__tcard d-flex align-items-center gap-6 gap-xxl-8 border-s2 p-4 p-md-5 rounded-4 mb-4 mb-md-5">
                                <div className="discussion_area__tcard-thumb">
                                    <img src="src/assets/images/how-cani3.png" className="rounded-5 max-un" alt="Images" />
                                </div>
                                <div className="discussion_area__tcard-content">
                                    <span
                                        className="mb-2 fw-bold fs-eight px-2 py-1 rounded-4 s7-bg p2-color">Intimacy</span>
                                    <p className="fs-ten">How can I be an ally to underre presented groups?</p>
                                </div>
                            </div>
                            <div
                                className="discussion_area__tcard d-flex align-items-center gap-6 gap-xxl-8 border-s2 p-4 p-md-5 rounded-4 mb-4 mb-md-5">
                                <div className="discussion_area__tcard-thumb">
                                    <img src="src/assets/images/how-cani2.png" className="rounded-5 max-un" alt="Images" />
                                </div>
                                <div className="discussion_area__tcard-content">
                                    <span
                                        className="mb-2 fw-bold fs-eight px-2 py-1 rounded-4 s7-bg p2-color">Intimacy</span>
                                    <p className="fs-ten">How can I be an ally to underre presented groups?</p>
                                </div>
                            </div>
                        </div>
                        <div className="discussion_area__sidebottom rounded-4 p-4 p-md-5">
                            <h4 className="mb-5 mb-md-6">Top Advisor</h4>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-5 mb-md-6">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/jenny-wilson-88.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <h5 className="mb-1">Jenny Wilson</h5>
                                    <div className="balancing_work__review-icon">
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p9-color"></i>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-5 mb-md-6">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/eleanor-pena-88.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <h5 className="mb-1">Eleanor Pena</h5>
                                    <div className="balancing_work__review-icon">
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p9-color"></i>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-5 mb-md-6">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/jane-cooper-88.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <h5 className="mb-1">Jane Cooper</h5>
                                    <div className="balancing_work__review-icon">
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p9-color"></i>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-5 mb-md-6">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/dianne-russell-88.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <h5 className="mb-1">Dianne Russell</h5>
                                    <div className="balancing_work__review-icon">
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p8-color"></i>
                                        <i className="ti ti-star-filled fs-six p9-color"></i>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-5 mb-md-6">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/marvin-mckinnery88.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <h5 className="mb-1">Marvin McKinney</h5>
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
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*   Discussion Ends */}
    {/*   Newsletter section starts */}
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
                        {/*  */}
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
    {/*   Newsletter section ends */}

    </>
  )
}

export default Discussion
