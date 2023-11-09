document.addEventListener("DOMContentLoaded", function(event) {
  var portfolio = new Swiper('#portfolio', {
    slidesPerView: "auto",
    //slidesPerView: 14,
    //  centeredSlides: true,
    // slidesPerView: 14,
    spaceBetween: 15,
    clickable: true,
    navigation: {
      nextEl: '.portfolio__pagination-button--next',
      prevEl: '.portfolio__pagination-button--prev',
    },
    breakpoints: {
      1200: {
     //   slidesPerView:14,
        spaceBetween: 15
      },
      900: {
    //        slidesPerView:9.5,
        spaceBetween: 15
      },
      540: {
     //   slidesPerView: 4.5,
        spaceBetween: 5
      },
      440: {
     //   slidesPerView:3.5,
        spaceBetween: 5
      },
    }
  });

});
document.addEventListener("DOMContentLoaded", function(event) {
  var portfolio = new Swiper('#main_slider', {
    slidesPerView: 1,
    spaceBetween: 150,
    clickable: true,
    navigation: {
      nextEl: '.promo__pagination-button--next',
      prevEl: '.promo__pagination-button--prev',
    },
    breakpoints: {
      1200: {
     //   slidesPerView:14,
        spaceBetween: 15
      },
      900: {
    //        slidesPerView:9.5,
        spaceBetween: 15
      },
      540: {
     //   slidesPerView: 4.5,
        spaceBetween: 5
      },
      440: {
     //   slidesPerView:3.5,
        spaceBetween: 5
      },
    }
  });

});
