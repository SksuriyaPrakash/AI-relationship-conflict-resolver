"use strict";
document.addEventListener("DOMContentLoaded", function () {

    $(function ($) {

        // Odometer
        $(".odometer").each(function () {
            $(this).isInViewport(function (status) {
                if (status === "entered") {
                    var section = $(this).closest(".counters");
                    section.find(".odometer").each(function () {
                        $(this).html($(this).attr("data-odometer-final"));
                    });
                }
            });
        });
        /* niceSelect */
        $("select").niceSelect();

        // Categories Top
        let categoriesCarousel = document.querySelector('.categories_top');
        let categoriesBtn = document.querySelector('.categories_top_btn');
        if (categoriesCarousel) {
            const swiper = new Swiper(categoriesCarousel, {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                navigation: {
                    nextEl: categoriesBtn.querySelector('.ara-next'),
                    prevEl: categoriesBtn.querySelector('.ara-prev'),
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 6,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    578: {
                        slidesPerView: 3,
                    },
                    375: {
                        slidesPerView: 2,
                    },
                }
            });
        }

        // Balancing Work
        let balancingCarousel= document.querySelector('.balancing_top');
        let balancingBtn = document.querySelector('.slider-pagination');
        if (balancingCarousel) {
            const swiper = new Swiper(balancingCarousel, {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                pagination: {
                    el: document.querySelector('.slider-pagination'),
                    // el: balancingCarousel.querySelector('.slider-pagination'),
                    clickable: true,
                  },
                // navigation: {
                //     nextEl: balancingBtn.querySelector('.ara-next'),
                //     prevEl: balancingBtn.querySelector('.ara-prev'),
                // },
                breakpoints: {
                    1800: {
                        slidesPerView: 1.8,
                    },
                    1200: {
                        slidesPerView: 1,
                    },
                 
                }
            });
        }


        
        // Top Author Work
        let authorCarousel= document.querySelector('.author_top');
        if (authorCarousel) {
            const swiper = new Swiper(authorCarousel, {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                pagination: {
                    el: document.querySelector('.author-pagination'),
                    // el: balancingCarousel.querySelector('.slider-pagination'),
                    clickable: true,
                  },
                // navigation: {
                //     nextEl: balancingBtn.querySelector('.ara-next'),
                //     prevEl: balancingBtn.querySelector('.ara-prev'),
                // },
                breakpoints: {
                    1700: {
                        slidesPerView: 4,
                    },
                    1500: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    576: {
                        slidesPerView: 1,
                    },
                 
                }
            });
        }

        // Expert Opinion
        let expertOptionCarousel = document.querySelector('.expert_option');
        let expertOptionBtn = document.querySelector('.expert_option_btn');
        if (expertOptionCarousel) {
            const swiper = new Swiper(expertOptionCarousel, {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                navigation: {
                    nextEl: expertOptionBtn.querySelector('.ara-next'),
                    prevEl: expertOptionBtn.querySelector('.ara-prev'),
                },
                breakpoints: {
                    1400: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    578: {
                        slidesPerView: 2,
                    },
                    375: {
                        slidesPerView: 1,
                    },
                }
            });
        }

        // Top Consultant Of Month
        let consulMonthCarousel = document.querySelector('.consul_month');
        let consulMonthBtn = document.querySelector('.consul_month_btn');
        if (consulMonthCarousel) {
            const swiper = new Swiper(consulMonthCarousel, {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                navigation: {
                    nextEl: consulMonthBtn.querySelector('.ara-next'),
                    prevEl: consulMonthBtn.querySelector('.ara-prev'),
                },
                breakpoints: {
                    578: {
                        slidesPerView: 2,
                    },
                    375: {
                        slidesPerView: 1,
                    },
                }
            });
        }

        

        // Booking date
        let bookingCarousel = document.querySelector('.booking_top');
        if (bookingCarousel) {
            const swiper = new Swiper(bookingCarousel, {
                loop: true,
                autoplay: false,
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                breakpoints: {
                    1400: {
                        slidesPerView: 4,
                    },
                    578: {
                        slidesPerView: 4,
                    },
                    320: {
                        slidesPerView: 2,
                    },
                }
            });
        }
        // Read More Advices
        let consulMonthCarousel2 = document.querySelector('.consul_month2');
        if (consulMonthCarousel2) {
            const swiper = new Swiper(consulMonthCarousel2, {
                loop: 1,
                speed: 5000,
                autoplay: {
                    delay: false,
                    disableOnInteraction: false,
                },
                spaceBetween: 24,
                slidesPerView: 1,
                paginationClickable: true,
                breakpoints: {
                    1799: {
                        slidesPerView: 5,
                    },
                    1499: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    375: {
                        slidesPerView: 1,
                    },
                }
            });
        }

        let consulMonthCarousel3 = document.querySelector('.consul_month3');
        if (consulMonthCarousel3) {
            const swiper = new Swiper(consulMonthCarousel3, {
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
                    1799: {
                        slidesPerView: 5,
                    },
                    1499: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    375: {
                        slidesPerView: 1,
                    },
                }
            });
        }

        /* price-range */
        if (document.querySelector('#price-range') !== null) {
            $("#price-range").slider({
                step: 1,
                range: true,
                min: 0,
                max: 1000,
                values: [50, 800],
                slide: function (event, ui) { $("#priceRange").val(ui.values[0] + " - " + ui.values[1]); }
            });
            $("#priceRange").val($("#price-range").slider("values", 0) + " - " + $("#price-range").slider("values", 1));
        }

        /* Wow js */
        new WOW().init();

        // Quill Editor
        let quill = new Quill('.editor', {
            theme: 'snow'
        });

        // Quill Editor
        let quill2 = new Quill('.editor2', {
            theme: 'snow'
        });
          
    });
});