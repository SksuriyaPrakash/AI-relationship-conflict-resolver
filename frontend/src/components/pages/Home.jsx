import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
function Home() {
  useEffect(() => {
    // 1. Initialize niceSelect
    if (window.jQuery && window.jQuery.fn.niceSelect) {
      window.jQuery('select').niceSelect();
    }

    // 2. Initialize Odometer
    if (window.jQuery) {
      window.jQuery(".odometer").each(function () {
        const finalVal = window.jQuery(this).attr("data-odometer-final");
        if (finalVal) {
          window.jQuery(this).html(finalVal);
        }
      });
    }

    // 3. Initialize Swipers
    let swiperInstances = [];

    if (window.Swiper) {
      // Categories Top Swiper
      const categoriesCarousel = document.querySelector('.categories_top');
      const categoriesBtn = document.querySelector('.categories_top_btn');
      if (categoriesCarousel) {
        try {
          const swiper1 = new window.Swiper(categoriesCarousel, {
            loop: true,
            autoplay: {
              delay: 2000,
              disableOnInteraction: false,
            },
            spaceBetween: 24,
            slidesPerView: 1,
            paginationClickable: true,
            navigation: categoriesBtn ? {
              nextEl: categoriesBtn.querySelector('.ara-next'),
              prevEl: categoriesBtn.querySelector('.ara-prev'),
            } : {},
            breakpoints: {
              1400: { slidesPerView: 6 },
              1200: { slidesPerView: 4 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              578: { slidesPerView: 3 },
              375: { slidesPerView: 2 },
            }
          });
          swiperInstances.push(swiper1);
        } catch (e) {
          console.error("Error initializing categories Swiper:", e);
        }
      }

      // consul_month2 Swiper
      const consulMonthCarousel2 = document.querySelector('.consul_month2');
      if (consulMonthCarousel2) {
        try {
          const swiper2 = new window.Swiper(consulMonthCarousel2, {
            loop: true,
            speed: 5000,
            autoplay: {
              delay: false,
              disableOnInteraction: false,
            },
            spaceBetween: 24,
            slidesPerView: 1,
            paginationClickable: true,
            breakpoints: {
              1799: { slidesPerView: 5 },
              1499: { slidesPerView: 4 },
              991: { slidesPerView: 3 },
              575: { slidesPerView: 2 },
              375: { slidesPerView: 1 },
            }
          });
          swiperInstances.push(swiper2);
        } catch (e) {
          console.error("Error initializing consul_month2 Swiper:", e);
        }
      }

      // consul_month3 Swiper
      const consulMonthCarousel3 = document.querySelector('.consul_month3');
      if (consulMonthCarousel3) {
        try {
          const swiper3 = new window.Swiper(consulMonthCarousel3, {
            loop: true,
            speed: 5000,
            autoplay: {
              delay: false,
              disableOnInteraction: false,
              reverseDirection: true,
            },
            spaceBetween: 24,
            slidesPerView: 1,
            paginationClickable: true,
            breakpoints: {
              1799: { slidesPerView: 5 },
              1499: { slidesPerView: 4 },
              991: { slidesPerView: 3 },
              575: { slidesPerView: 2 },
              375: { slidesPerView: 1 },
            }
          });
          swiperInstances.push(swiper3);
        } catch (e) {
          console.error("Error initializing consul_month3 Swiper:", e);
        }
      }
    }

    return () => {
      swiperInstances.forEach(swiper => {
        if (swiper && typeof swiper.destroy === 'function') {
          swiper.destroy(true, true);
        }
      });
    };
  }, []);

  return (
    <>

    {/*  Hero Section Starts */}
    <section className="hero_three bg1-color">
        <div className="container">
            <div className="row justify-content-between align-items-center">
                <div className="col-lg-6 col-xxl-6">
                    <div className="hero_area__content hero_three__content">
                        <h1 className="display-zero text-uppercase">Affection <span
                                className="d-block hero_area__toptext">Adventures</span></h1>
                        <div className="hero_area__checkbox  mt-3 mt-md-5 mb-7 mb-md-10">
                            <div className="d-flex align-items-center flex-wrap gap-3  gap-md-5">
                                <div className="single-check d-center gap-1">
                                    <i className="ti ti-square-check-filled fs-five s2-color"></i>
                                    <span> Marriage, Diversity</span>
                                </div>
                                <div className="single-check d-center gap-1">
                                    <i className="ti ti-square-check-filled fs-five s2-color"></i>
                                    <span> Family Harmony Seeker</span>
                                </div>
                                <div className="single-check d-center gap-1">
                                    <i className="ti ti-square-check-filled fs-five s2-color"></i>
                                    <span> Relationships, Depression</span>
                                </div>
                            </div>
                        </div>
       
                        <div className="bio_contact__content">
                            <div className="singletab">
                                <ul className="tablinks d-flex align-items-center border-0 gap-6 gap-md-10 mb-4">
                                    <li className="nav-links active">
                                        <button className="tablink active fs-ten">Advisors</button>
                                    </li>
                                    <li className="nav-links">
                                        <button className="tablink fs-ten">Stories</button>
                                    </li>
                                    <li className="nav-links">
                                        <button className="tablink fs-ten">Podcast</button>
                                    </li>
                                </ul>
                                <div className="tabcontents hero_three__tabright">
                                    <div className="tabitem active bio_contact__about">
                                        <div
                                            className="border-color3 p2-bg d-flex align-items-center justify-content-between px-2 px-md-5 py-1 py-md-3 rounded-4 mb-md-10">
                                            <div className="hero_area__categorytwo d-none d-sm-block">
                                                <select>
                                                    <option data-display="Categories"> Categories</option>
                                                    <option value="1">Depression</option>
                                                    <option value="1">Stress</option>
                                                    <option value="2">Locality</option>
                                                    <option value="3">Love Stories</option>
                                                </select>
                                            </div>
                                            <span className="v-line sm mb-7 ms-7 d-none d-md-block"></span>
                                            <form
                                                className="hero_two__searchap d-flex align-items-center justify-content-between">
                                                <input type="text" name="q" placeholder="Search" className="w-100" />
                                                <button type="submit"
                                                    className="cmn-btn ps-4 pe-8 py-3 rounded-4">Search</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="tabitem">
                                        <div
                                            className="border-color3 p2-bg d-flex align-items-center justify-content-between px-2 px-md-5 py-1 py-md-3 rounded-4 mb-md-10">
                                            <div className="hero_area__categorytwo d-none d-sm-block">
                                                <select>
                                                    <option data-display="Categories">Categories</option>
                                                    <option value="1">Dating</option>
                                                    <option value="2">Locality</option>
                                                    <option value="3">Love Stories</option>
                                                </select>
                                            </div>
                                            <span className="v-line sm mb-7 ms-7 d-none d-md-block"></span>
                                            <form
                                                className="hero_two__searchap d-flex align-items-center justify-content-between">
                                                <input type="text" name="q" placeholder="Search" className="w-100" />
                                                <button type="submit"
                                                    className="cmn-btn ps-4 pe-8 py-3 rounded-4">Search</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="tabitem">
                                        <div
                                            className="border-color3 p2-bg d-flex align-items-center justify-content-between px-2 px-md-5 py-1 py-md-3 rounded-4 mb-md-10">
                                            <div className="hero_area__categorytwo d-none d-sm-block">
                                                <select>
                                                    <option data-display="Categories">Categories</option>
                                                    <option value="1">Dating</option>
                                                    <option value="2">Locality</option>
                                                    <option value="3">Love Stories</option>
                                                </select>
                                            </div>
                                            <span className="v-line sm mb-7 ms-7 d-none d-md-block"></span>
                                            <form
                                                className="hero_two__searchap d-flex align-items-center justify-content-between">
                                                <input type="text" name="q" placeholder="Search" className="w-100" />
                                                <button type="submit"
                                                    className="cmn-btn ps-4 pe-8 py-3 rounded-4">Search</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero_area__review d-flex align-items-center flex-wrap flex-sm-nowrap  gap-3 gap-md-5 pb-120 mb-5">
                            <div className="hero_area__review-img d-flex align-items-center">
                                <img src="src/assets/images/momotaj.png" alt="Images" />
                                <img src="src/assets/images/laili.png" alt="Images" />
                                <img src="src/assets/images/shanta.png" alt="Images" />
                                <img src="src/assets/images/plus-rounded.png" className="cpoint" alt="Images" />
                            </div>
                            <div className="hero_area__review-item">
                                <div className="hero_area__review-star d-flex align-items-center gap-2 mb-1">
                                    <span className="fs-five fw-bolder">4.5/5</span>
                                    <div className="star-icon">
                                        <i className="fa-solid fa-star fs-five s2-color"></i>
                                        <i className="fa-solid fa-star fs-five s2-color"></i>
                                        <i className="fa-solid fa-star fs-five s2-color"></i>
                                        <i className="fa-solid fa-star fs-five s2-color"></i>
                                        <i className="fa-solid fa-star fs-five s2-color"></i>
                                    </div>
                                </div>
                                <div className="hero_area__review-text">
                                    <span className="fs-five">Review this community</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="hero_area__counter d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-between gap-3 ">
                            <div className="d-flex  justify-content-start flex-column">
                                <div
                                    className="hero_area__countdown counters d-flex align-items-center justify-content-start">
                                    <span className="odometer hero_area__countdown-number fs-two fw-bolder s2-color"
                                        data-odometer-final="35"></span>
                                    <span className="fs-two fw-bolder s2-color">K</span>
                                    <a href="javascript:void(0)"><i className="ti ti-arrow-up-right fs-two"></i></a>
                                </div>
                                <span className="fs-ten">Community <br /> Member</span>
                            </div>
                            <span className="v-line d-none d-sm-block"></span>
                            <div className="d-flex  justify-content-start flex-column">
                                <div
                                    className="hero_area__countdown counters d-flex align-items-center justify-content-start">
                                    <span className="odometer hero_area__countdown-number fs-two fw-bolder s2-color"
                                        data-odometer-final="15"></span>
                                    <span className="fs-two fw-bolder s2-color">K</span>
                                    <a href="javascript:void(0)"><i className="ti ti-arrow-up-right fs-two"></i></a>
                                </div>
                                <span className="fs-ten">Blog Post <br /> Completed</span>
                            </div>
                            <span className="v-line d-none d-sm-block"></span>
                            <div className="d-flex  justify-content-start flex-column">
                                <div
                                    className="hero_area__countdown counters d-flex align-items-center justify-content-start">
                                    <span className="odometer hero_area__countdown-number fs-two fw-bolder s2-color"
                                        data-odometer-final="12"></span>
                                    <span className="fs-two fw-bolder s2-color">+</span>
                                    <a href="javascript:void(0)"><i className="ti ti-arrow-up-right fs-two"></i></a>
                                </div>
                                <span className="fs-ten">Community <br /> Active</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-xxl-5 p-0">
                    <div className="hero_three__thumb position-relative">
                        <div className="hero_three__thumb-banner position-relative cus-z2">
                            <img src="src/assets/images/home-three-banner-imge.png"
                                className="rounded max-un d-rtl d-none d-lg-block" alt="Image" />
                            <img src="src/assets/images/home-three-banner-mobile.png"
                                className="rounded w-100 d-block  d-lg-none" alt="Image" />
                        </div>
                        <div className="hero_three__thumb-animation position-absolute top-0 start-0 cus-z1">
                            <img src="src/assets/images/home-three-banner-shape.png" className="rounded d-rtl rotated_bigsmall2"
                                alt="Image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Hero Section Ends */}

    {/*  Top categories Section starts */}
    <section className="categories categories_three pt-120 pb-120">
        <div className="container">
            <div className="row categories__header mb-8 mb-sm-10 mb-lg-15">
                <div className="col-xl-7 col-lg-8 col-sm-8">
                    <div className="categories__title">
                        <h2 className="mb-3 mb-md-4">Top Categories</h2>
                        <a href="javascript:void(0)"><span className="fs-ten">Discover 233 topics</span></a>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-4 col-sm-4 categories_top_btn mt-6 mt-sm-0">
                    <div className="slider-btn d-center justify-content-start justify-content-sm-end gap-4">
                        <button type="button" aria-label="Slide Prev" className="ara-prev slide-button box-style d-center">
                            <i className="material-symbols-outlined">east</i>
                        </button>
                        <button type="button" aria-label="Slide Next" className="ara-next slide-button box-style d-center">
                            <i className="material-symbols-outlined">east</i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="swiper categories_top">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/top-categories-33.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/true_love.png" className="w-75" alt="Icon" />
                                    </div>

                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Love</h4><span>(24)</span>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/breackup-thumb1.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/breackeup.png" className="w-75" alt="Icon" />
                                    </div>
                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Breakeup</h4><span>(24)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/relation60.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/relation.png" className="w-75" alt="Icon" />
                                    </div>
                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Relation</h4><span>(60)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/addiction45.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/addiction.png" className="w-75" alt="Icon" />
                                    </div>
                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Addiction</h4><span>(45)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/stress12.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/stress.png" className="w-75" alt="Icon" />
                                    </div>
                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Stress</h4><span>(12)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="items-wrapper">
                                <div className="categories_three__item p-3 text-center rounded-4">
                                    <div className="categories_three__item-thumb">
                                        <img src="src/assets/images/depression16.png" alt="Icon" />
                                    </div>
                                    <div
                                        className="categories_two__thumb categories_three__item-round d-center bg1-color rounded-item d-inline-flex py-3 px-2 mb-2 mb-md-3">
                                        <img src="src/assets/images/icon/depression.png" className="w-75" alt="Icon" />
                                    </div>
                                    <a href="javascript:void(0)"
                                        className="d-center gap-1 mt-2 mt-md-3 pb-2 pb-md-3">
                                        <h4>Stress</h4><span>(16)</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Top categories Section ends */}
    {/*  Coping Section Starts */}
    <section className="coping_divorce coping_divorce3 pt-120 pb-120 rounded-5">
        <div className="container">
            <div className="row">
                <div
                    className="read_advice__title d-flex flex-wrap justify-content-between align-items-center gap-3 mb-8 mb-sm-10 mb-lg-15">
                    <div className="read_advice__title-content">
                        <h2 className="mb-3 mb-md-4">Balancing work and love life? </h2>
                        <p className="fs-ten">Strengthen your bond and resolve conflicts.</p>
                    </div>
                    <div className="read_advice__title-btn">
                        <div className="home-btn d-inline-block">
                            <Link to='/discussion' className="cmn-btn p-4 d-center mb-10">See More<i
                                    className="ti ti-arrow-badge-right fs-four"></i> </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row align-items-center gap-5 gap-lg-0">
                <div className="col-lg-8">
                    <div
                        className="coping_divorce__fitem d-flex align-items-center gap-3 gap-md-5 border-color5 py-4 py-sm-7 py-lg-10 py-xxl-12 px-4 px-sm-6 px-lg-7 rounded-3 position-relative overflow-hidden">
                        <div className="balancing_work__item-thumb active-slidimg d-none">
                            <img src="src/assets/images/balancing-work.png" className="rounded-4 max-un" alt="Images" />
                        </div>
                        <div className="balancing_work__item">
                            <div
                                className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5 mb-md-6">
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
                            <h2 className="mb-4 mb-md-5">Coping with a breakup or divorce?</h2>
                            <p className="fs-ten mb-5 mb-md-6">Discover effective communication strategies
                                to deepen your connection <br /> and resolve conflicts in your relationship.
                            </p>
                            <div
                                className="balancing_work__review d-inline-flex flex-wrap align-items-center gap-5 gap-md-8 gap-lg-10 p-3 p-sm-4 p-lg-5 p2-bg rounded-3 mb-5 mb-md-6">
                                <div
                                    className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
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
                                    <span className="v-line lg mb-3 px-bg"></span>
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
                </div>
                <div className="col-md-8  col-lg-4">
                    <div
                        className="coping_divorce__fitem d-flex align-items-center bgx-color border-bgx gap-3 gap-md-5 p-5 p-md-7 rounded-3 position-relative overflow-hidden">
                        <div className="balancing_work__item-thumb active-slidimg d-none">
                            <img src="src/assets/images/balancing-work.png" className="rounded-4 max-un" alt="Images" />
                        </div>
                        <div className="balancing_work__item">
                            <div
                                className="balancing_work__part d-flex flex-wrap align-items-center justify-content-between mb-4 mb-md-5">
                                <div className="balancing_work__item-two  gap-2 mb-4 mb-md-5">
                                    <a href="javascript:void(0)" className="py-1 px-3 p2-bg rounded-5 ">love</a>
                                    <a href="javascript:void(0)" className="py-1 px-3 p2-bg rounded-5 ">Query</a>
                                    <a href="javascript:void(0)" className="py-1 px-3 p2-bg rounded-5 ">Intimacy</a>
                                </div>
                                <div
                                    className="balancing_work__item-one d-flex flex-wrap align-items-center gap-2">
                                    <a href="javascript:void(0)"><img src="src/assets/images/avatar-small.png"
                                            alt="Images" /></a>
                                    <a href="javascript:void(0)" className="fw-semibold s3-color s2-hvcr">SAMON@A</a>
                                    <i className="ti ti-point-filled s3-color"></i>
                                    <span className="p4-color">4day ago</span>
                                </div>
                            </div>
                            <h3 className="mb-4 mb-md-5">How do I navigate in my relationship?</h3>
                            <p className="mb-4 mb-md-5">Discover effective communication strategies to deepen
                                your
                                connection and resolve conflicts in your relationship.
                            </p>
                            <div
                                className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3 mb-4 mb-md-5">
                                <div className="balancing_work__review-profile">
                                    <img src="src/assets/images/camsol.png" className="rounded-5" alt="Images" />
                                </div>
                                <div className="balancing_work__review-star">
                                    <span className="p8-color">80 Solution</span>
                                    <a href="javascript:void(0)">
                                        <h5>Cameron William</h5>
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
                            <div
                                className="balancing_work__footer d-flex align-items-center justify-content-between gap-2">
                                <div className="balancing_work__footer-share d-flex align-items-center gap-2">
                                    <i className="ti ti-bookmarks fs-five bgx2-color px-color p-2 rounded-2 cpoint"></i>
                                    <i
                                        className="ti ti-brand-stackshare fs-five bgx2-color px-color p-2 rounded-2 cpoint"></i>
                                </div>
                                <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                    <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                        <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                        <span className="fs-ten p7-color">120</span>
                                    </div>
                                    <span className="v-line lg2 mb-3"></span>
                                    <div className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                        <i className="ti ti-message fs-four p7-color cpoint"></i>
                                        <span className="fs-ten p7-color">20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src="src/assets/images/coping-footer-shape2.png"
                            className="coping_divorce__fitem-shape position-absolute end-0 top-0 rotated_bigsmall"
                            alt="Shape" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Coping Section Ends */}
    {/*  Top Stories Podcast Starts */}
    <section className="stories_podcast pt-120 pb-120">
        <div className="container">
            <div className="row">
                <div className="col-12 text-center mb-7 mb-md-10 mb-lg-15">
                    <h2 className="mb-4 mb-md-5 mb-lg-6">Top Stories Podcast</h2>
                    <p className="fs-ten">Long stories user podcast</p>
                </div>
            </div>
            <div className="row justify-content-start justify-content-xxl-center gy-4">
                <div className="col-12">
                    <div className="stories_podcast__relation rounded-4 p-6 p-md-9">
                        <div className="stories_podcast__relation-title mb-4 mb-md-5 d-flex justify-content-between ">
                            <h2 className="p2-color">Long Distance <br /> relation</h2>
                            <div>
                                <span className="px-3 py-1 bg5-color rounded-4 d-block cpoint">Intimacy</span>
                            </div>
                        </div>
                        <div className="balancing_work__review-item d-flex flex-wrap align-items-center gap-3">
                            <div className="balancing_work__review-profile">
                                <img src="src/assets/images/avatar2.png" className="rounded-5" alt="Images" />
                            </div>
                            <div className="balancing_work__review-star">
                                <span className="p2-color">80 Solution</span>
                                <a > <span className="p2-color fw_500 fs_five d-block">Cameron
                                        William</span></a>
                            </div>
                        </div>
                        <div className="stories_podcast__relation-shape d-flex justify-content-between">
                            <img src="src/assets/images/long-mic.png" alt="Icons" />
                            <a href="javascript:void(0)" className="px-4 py-3 p-md-7 p2-bg rounded-item play_song">
                                <i className="ti ti-player-play-filled fs-two"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-8">
                    <div
                        className="stories_podcast__card border-color3 d-flex flex-wrap flex-md-nowrap gap-3 p-4 p-md-5 p-lg-6 rounded-4 bg1-color">
                        <div className="stories_podcast__card-left">
                            <div
                                className="hero_area__review d-flex align-items-center flex-wrap  gap-3 gap-md-5">
                                <div className="hero_area__review-img d-flex align-items-center">
                                    <img src="src/assets/images/momotaj.png" alt="Images" />
                                    <img src="src/assets/images/laili.png" alt="Images" />
                                    <img src="src/assets/images/shanta.png" alt="Images" />
                                    <img src="src/assets/images/plus-rounded.png" className="cpoint" alt="Images" />
                                </div>
                                <div className="hero_area__review-item">
                                    <div className="hero_area__review-star d-flex align-items-center gap-2 mb-1">
                                        <span className="fs-five fw-bolder">20K +</span>
                                        <div className="star-icon">
                                            <span className="fs-ten">Join our</span>
                                        </div>
                                    </div>
                                    <div className="hero_area__review-text">
                                        <span className="fs-ten">Review this community</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="mt-4 mt-md-5 mt-lg-7 mb-7 mb-sm-9 mb-lg-11">Schedule regular date
                                nights to keep
                                the romance alive.</h3>
                            <div
                                className="stories_podcast__voice d-flex flex-wrap align-items-center gap-4 gap-lg-6">
                                <div className="stories_podcast__voice-part d-flex align-items-center gap-3 gap-lg-5">
                                    <img src="src/assets/images/icon/voice.png" alt="Icons" />
                                    <span className="fs-ten">Long Stories <br /> Podcast</span>
                                </div>
                                <span className="v-line sm mb-7 d-none d-sm-block"></span>
                                <div className="stories_podcast__voice-part d-flex align-items-center gap-3 gap-lg-5">
                                    <img src="src/assets/images/icon/voice.png" alt="Icons" />
                                    <span className="fs-ten">Long Stories <br /> Podcast</span>
                                </div>
                            </div>
                        </div>
                        <div className="stories_podcast__card-right mx-auto position-relative">
                            <img src="src/assets/images/podcast.png" className="max-un rounded-4" alt="Icons" />
                            <div className="stories_podcast__play position-absolute">
                                <img src="src/assets/images/icon/shape-group.png" className="rotated_animat" alt="Shpae" />
                                <a >
                                    <i
                                        className="ti ti-player-skip-forward-filled text-white position-absolute fs-three"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4">
                    <div
                        className="stories_podcast__more text-center h-100 rounded-5 d-center flex-column position-relative">
                        <img src="src/assets/images/podcast-more.png" className="rounded-5 max-un" alt="Image" />
                        <div className="stories_podcast__more-content position-absolute">
                            <a > <i
                                    className="ti ti-circle-arrow-up-right fs-one fw-500"></i></a>
                            <a >
                                <h4 className="mt-2 mt-md-3 p2-color">See more</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Top Stories Podcast Ends */}

    {/*  Top Authors Of Month Starts */}
    <section className="auth_month pt-120 pb-120 mx-xxl-10 rounded-4 position-relative">
        <div className="container position-relative cus-z2">
            <div className="row">
                <div className="auth_month__title mb-7 mb-md-10 mb-lg-15 text-center">
                    <h2 className="mb-4 mb-md-5">Top Member Of Month</h2>
                    <p className="fs-ten">Say hello to future creator potentials</p>
                </div>
            </div>
            <div className="row gy-5 gy-sm-6">
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/jenny-wilson121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/jenny-wilson122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Jenny Wilson</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/asliko-mo121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/asliko-mo122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Asliko Mo</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/robert-fox121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/robert-fox122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Robert Fox</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/arlene-mccoy121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/arlene-mccoy122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Arlene McCoy</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/devon-lane121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/devon-lane122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Devon Lane</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="col-6 col-sm-4 col-md-3 col-xl-2">
                    <div className="auth_month__item pb-3 mb-md-4 text-center rounded-4 cus-z2">
                        <div className="categories_three__item-thumb position-relative">
                            <img src="src/assets/images/dianne-russell121.png" alt="Icon" />
                            <a href="javascript:void(0)"
                                className="auth_month__item-over d-flex align-items-center position-absolute rounded-4 py-1 px-2 gap-1 overflow-hidden">
                                <span className="auth_month__item-hs">Articles</span>
                                <span className="fs-seven">40</span>
                                <i className="ti ti-arrow-narrow-right fs-five"></i>
                            </a>
                        </div>
                        <div className="mb-2 mb-md-3 position-relative">
                            <img src="src/assets/images/dianne-russell122.png"
                                className="categories_two__thumb auth_month__item-round bg1-color rounded-item" alt="Icon" />
                        </div>
                        <a href="javascript:void(0)" className="pb-2 pb-md-3">
                            <h4>Dianne Russell</h4>
                        </a>
                        <a href="javascript:void(0)"><span className="fw_500">@askome</span></a>
                    </div>
                </div>
                <div className="d-center">
                    <div className="home-btn d-inline-block">
                        <a  className="cmn-btn p-4 d-center mb-10">Become an member <i
                                className="ti ti-arrow-badge-right fs-four"></i> </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="auth_month__animation position-absolute top-0 start-0 cus-z0 h-100">
            <img src="src/assets/images/top-authors-of.png" className="rotated_bigsmall cus-z0 h-100 " alt="Shape" />
        </div>
    </section>
    {/*  Top Authors Of Month Ends */}

    {/*  Latest Articles Starts */}
    <section className="article_latest article_three pt-120 pb-120 p2-bg">
        <div className="container">
            <div className="row gy-5 gy-sm-6">
                <div className="col-lg-4">
                    <div className="article_latest__right article_three__aside">
                        <h2 className="mb-4 mb-md-5">Latest Articles</h2>
                        <p className="mb-8 mb-sm-10 mb-lg-15">Say hello to future creator potentials</p>
                        <div
                            className="article_latest__right-tag article_three__tag p-4 p-md-5 mb-5 mb-md-6 p2-bg rounded-5">
                            <h4 className="mb-4 mb-md-5">More Tag</h4>
                            <hr className="article_latest__right-hr mb-4 mb-md-5" />
                            <div className="latest_articles__tag">
                                <ul className="d-flex flex-wrap align-items-center gap-5">
                                    <li>
                                        <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">All</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Love</a>
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
                                        <a href="javascript:void(0)" className="b2-bg hvr px-4 py-2 rou rounded-4">Legal</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"
                                            className=" border-color6 hv px-4 py-2 rou rounded-4">More...</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="article_latest__right-trendy article_three__trendy p-4 p-md-5 p2-bg rounded-5">
                            <h4 className="mb-4 mb-md-5">Trendy Topic</h4>
                            <hr className="article_latest__right-hr mb-4 mb-md-5" />
                            <div className="article_latest__right-topic">
                                <div className="article_latest__right-item d-flex align-items-center gap-4 mb-5 mb-md-6">
                                    <img src="src/assets/images/Love504.png" alt="Image" />
                                    <div>
                                        <a href="javascript:void(0)">
                                            <h5 className="mb-1 fw_500">Love</h5>
                                        </a>
                                        <span className="fs-ten">(25)</span>
                                    </div>
                                </div>
                                <div className="article_latest__right-item d-flex align-items-center gap-4 mb-5 mb-md-6">
                                    <img src="src/assets/images/long-stories504.png" alt="Image" />
                                    <div>
                                        <a href="javascript:void(0)">
                                            <h5 className="mb-1 fw_500">Long Stories</h5>
                                        </a>
                                        <span className="fs-ten">(25)</span>
                                    </div>
                                </div>
                                <div className="article_latest__right-item d-flex align-items-center gap-4 mb-5 mb-md-6">
                                    <img src="src/assets/images/consultation504.png" alt="Image" />
                                    <div>
                                        <a href="javascript:void(0)">
                                            <h5 className="mb-1 fw_500">Consultation</h5>
                                        </a>
                                        <span className="fs-ten">(25)</span>
                                    </div>
                                </div>
                                <div className="article_latest__right-item d-flex align-items-center gap-4 mb-5 mb-md-6">
                                    <img src="src/assets/images/personal504.png" alt="Image" />
                                    <div>
                                        <a href="javascript:void(0)">
                                            <h5 className="mb-1 fw_500">Personal</h5>
                                        </a>
                                        <span className="fs-ten">(25)</span>
                                    </div>
                                </div>
                                <div className="article_latest__right-item d-flex align-items-center gap-4">
                                    <img src="src/assets/images/breackup504.png" alt="Image" />
                                    <div>
                                        <a href="javascript:void(0)">
                                            <h5 className="mb-1 fw_500">Breakup</h5>
                                        </a>
                                        <span className="fs-ten">(25)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="article_latest__left">
                        <div className="row gy-4 gy-md-6 justify-content-center">
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts.png" className="rounded-5 w-100"
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/theresa-webb.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Theresa Webb</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts2hd.png" className="rounded-5 w-100 "
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/cody-fisher.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Cody Fisher</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts35.png" className="rounded-5 w-100 "
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/brooklyns-simmon.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Brooklyn Simmons</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts4s.png" className="rounded-5 w-100 "
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/kathryn-murphy55.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Kathryn Murphy</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts5f.png" className="rounded-5 w-100 "
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/eleanor-pena.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Eleanor Pena</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="article_latest__item position-relative">
                                    <div className="article_latest__item-thumb position-relative">
                                        <img src="src/assets/images/handle-conflicts6sf.png" className="rounded-5 w-100 "
                                            alt="Icons" />
                                        <span
                                            className="fs-ten py-2 px-3 b2-bg position-absolute rounded-5 cpoint">Locality</span>
                                    </div>
                                    <div
                                        className="article_latest__item-content position-absolute pb-4 pb-md-5 px-4 px-md-5">
                                        <a href="javascript:void(0)">
                                            <h4 className="mb-3 mb-md-4 p2-color">How do I handle conflicts with my partner?
                                            </h4>
                                        </a>
                                        <div
                                            className="article_latest__item-id d-flex align-items-center gap-2 py-2 px-4 px-md-5 rounded-5">
                                            <img src="src/assets/images/jenny-wilsons.png" alt="Image" />
                                            <a href="javascript:void(0)">
                                                <span className="p2-color fw-bold">Jenny Wilson</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 d-center">
                                <div className="home-btn d-inline-block">
                                    <a  className="cmn-btn p-4 d-center mt-10">View More
                                        <i className="ti ti-arrow-badge-right fs-four"></i> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Latest Articles Ends */}
    {/*  Top Consultant Of Month Starts */}
    <section className="top_monthx pt-120 pb-120">
        <div className="container">
            <div className="row">
                <div className="text-center mb-7 mb-md-10 mb-lg-15">
                    <h2 className="mb-4 mb-md-5">Top Consultant Of Month</h2>
                    <p className="fs-ten">Say hello to future creator potentials</p>
                </div>
            </div>
            <div className="row">
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
                                    className="ti ti-arrow-up-right s4-bg fs-four rounded-item border-3 border-white cpoint d-lg-block">
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
                                    <span className="fs-four fw_500">₹ 1000</span>
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
                            <img src="src/assets/images/jane-cooper123.png" className="top_monthx__pid rounded-item"
                                alt="Images" />
                            <div className="circle-areas top_monthx__shapx position-absolute d-none d-sm-block">
                                <img src="src/assets/images/three-shape-for-shape.png" className="coping_divorce__idcard-shape"
                                    alt="Shape" />
                            </div>

                            <a href="javascript:void(0)" className="top_monthx__shaps position-absolute d-none d-lg-block">
                                <i
                                    className="ti ti-arrow-up-right s4-bg fs-four rounded-item border-3 border-white cpoint d-block">
                                </i>
                            </a>
                        </div>
                        <div className="advice_month__idcard-content text-center">
                            <a href="javascript:void(0)">
                                <span className="s2-color">80 Solution</span></a>
                            <a href="javascript:void(0)">
                                <h4>SaJane Cooper</h4>
                            </a>
                            <div
                                className="coping_divorce__calltime d-flex align-items-center justify-content-center gap-2 mb-2 mt-2">
                                <div className="s2-bg py-1 px-2 d-inline-block rounded-item">
                                    <i className="ti ti-phone-call fs-five p2-color"></i>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <span className="fs-four fw_500">₹ 1000</span>
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
                                    className="ti ti-arrow-up-right s4-bg fs-four rounded-item border-3 border-white cpoint d-block">
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
                                    <span className="fs-four fw_500">₹ 1000</span>
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
                                    className="ti ti-arrow-up-right s4-bg fs-four rounded-item border-3 border-white cpoint d-block">
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
                                    <span className="fs-four fw_500">₹ 1000</span>
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
                <div className="d-center">
                    <div className="home-btn d-inline-block">
                        <a  className="cmn-btn p-4 d-center">See all advisors<i
                                className="ti ti-arrow-badge-right fs-four"></i> </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Top Consultant Of Month Ends */}
    {/*  Navigating Love and Family Starts */}
    <section className="navi_love pt-120 pb-120">
        <div className="container">
            <div className="row gy-4 gy-sm-5">
                <div className="col-xl-7">
                    <div
                        className="navi_love__item db-bg d-flex justify-content-between py-5 py-sm-8 py-lg-10 ps-5 ps-sm-8 ps-lg-10 ps-lg-10 rounded-20 overflow-hidden">
                        <div className="navi_love__item-content">
                            <span className="p2-color mb-3 mb-md-4">Navigating Love & Family</span>
                            <h2 className="p2-color mb-5 mb-md-6">Community Discussion</h2>
                            <p className="p2-color mb-7 mb-md-10 pe-0 pe-xxl-10">Our vibrant community is a
                                safe and
                                welcoming space where
                                individuals from all walks of life come together to discuss</p>
                            <div className="comn_discus__item-btn">
                                <a className="cmn-btn second-alt p-3 p-md-4" href="javascript:void(0)">Join the
                                    community</a>
                            </div>
                        </div>
                        <div className="navi_love__item-thumb">
                            <img src="src/assets/images/navigating-love.png" className="max-un" alt="Icons" />
                        </div>
                    </div>
                </div>
                <div className="col-xl-5">
                    <div
                        className="navi_love__item2 rounded-20 bg1-color d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap p-5 p-md-7 p-xl-8 mb-5 mb-md-6">
                        <div className="navi_love__item2-content">
                            <h4 className="s2-color mb-3 mb-md-4">Break-up Stories</h4>
                            <p>More that 10000 people share stories in pirup </p>
                        </div>
                        <div className="navi_love__item2-btn">
                            <a className="cmn-btn second-alt p-3 p-md-4 text-nowrap" href="javascript:void(0)">See all
                                Stories</a>
                        </div>
                    </div>
                    <div className="navi_love__item3 db-bg rounded-20 py-5 py-md-8 ps-5 ps-md-8 pe-3">
                        <h4 className="p2-color mb-7 mb-md-9 pe-xxl-20">Share your story with us and get expert
                            help</h4>
                        <div className="navi_love__item3-footer d-flex align-items-center justify-content-between gap-5">
                            <div className="navi_love__item3-btn">
                                <a className="cmn-btn third-alt p-3 p-md-4 text-nowrap" href="javascript:void(0)">Get
                                    involve</a>
                            </div>
                            <div className="navi_love__item3-fthumb">
                                <img src="src/assets/images/icon/chat-share-expert.png" className="rotated_bigsmall"
                                    alt="Icons" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Navigating Love and Family Ends */}
    {/*  Most read advice for thsi week starts */}
    <section className="read_advice read_advice3 pb-120 pt-120 bg1-color">
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <div
                        className="read_advice__title d-flex flex-wrap justify-content-between align-items-end gap-3 mb-8 mb-sm-10 mb-lg-15">
                        <div className="read_advice__title-content">
                            <h2 className="mb-3 mb-md-4">Most read advice for this week </h2>
                            <p className="fs-ten">Become the best you</p>
                        </div>
                        <div className="read_advice__title-btn">
                            <div className="home-btn d-inline-block">
                                <a  className="cmn-btn p-4 d-center mb-10">Get Advisor<i
                                        className="ti ti-arrow-badge-right fs-four"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row gy-4 gy-md-6">
                <div className="col-12">
                    <div className="swiper consul_month2">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/beth-davies.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Beth
                                                        Davies</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/bryan-wright11.png" className="rounded-5"
                                                    alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Bryan
                                                        Wright</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/aadi-t11.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Aadi
                                                        T</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/bryan-wright11.png" className="rounded-5"
                                                    alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Bryan
                                                        Wright</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/aadi-t11.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Aadi
                                                        T</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="swiper consul_month3">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/kadji-bell11.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Kadji
                                                        Bell</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/rany-tanaka11.png" className="rounded-5"
                                                    alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Ray
                                                        Tanaka</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/tom-davis11.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Tom
                                                        Davis</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/rany-tanaka11.png" className="rounded-5"
                                                    alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Ray
                                                        Tanaka</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="items-wrapper">
                                    <div
                                        className="read_advice__item p-4 p-sm-5 p-lg-6 rounded-4 border-color4">
                                        <div className="read_advice__item-head d-flex justify-content-between mb-4 mb-md-5">
                                            <div className="d-flex align-items-center gap-2">
                                                <img src="src/assets/images/tom-davis11.png" className="rounded-5" alt="Image" />
                                                <a href="javascript:void(0)"><span className="fs-seven fw-bolder">Tom
                                                        Davis</span></a>
                                            </div>
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className="ti ti-bookmarks fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                                <i
                                                    className="ti ti-brand-stackshare fs-six s2-color bg5-color p-2 rounded-2 cpoint border-color4"></i>
                                            </div>
                                        </div>
                                        <p className="fs-ten mb-4 mb-md-5">How can I improve communication with my partner?
                                        </p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <a href="javascript:void(0)"><span className="p7-color">80 Solution</span></a>
                                            <div className="balancing_work__footer-likecmn d-flex align-items-center gap-3">
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-thumb-up fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">120</span>
                                                </div>
                                                <span className="v-line lg2 mb-3"></span>
                                                <div
                                                    className="balancing_work__footer-like d-flex align-items-center gap-1 ">
                                                    <i className="ti ti-message fs-four p7-color cpoint"></i>
                                                    <span className="fs-ten p7-color">20</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/*  Most read advice for thsi week ends */}

    {/*  Newsletter section starts */}
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
    {/*  Newsletter section ends */}


   
     
    </>
  )
}

export default Home
