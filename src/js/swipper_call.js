
document.addEventListener("DOMContentLoaded", function(event) {

  var mySwiper = new Swiper('#swiper-container-tver', {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 4500,
    },
//    loop: true,
    speed: 400,
    lazy: true,
  //  observer: true,
  //  observeParents: true,
    pagination: {
     el: '.swiper-pagination-bullet',
     clickable: true,
    },

    navigation: {
      nextEl: '.swiper-button-next-photo',
      prevEl: '.swiper-button-prev-photo',
    },
    on: {
      init() {
        document.querySelector('.swiper-button-next-photo').addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });

        document.querySelector('.swiper-button-prev-photo').addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });
      }
    },
    //clickable: true,
    breakpoints: {
      900: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0
      },
    }
  });

  var swiperButton = new Swiper('#swiper-container-button', {
    slidesPerView: 4,
    spaceBetween: 30,

    navigation: {
  //    nextEl: '.swiper-button-next-photo',
  //    prevEl: '.swiper-button-prev-photo',
    },
    clickable: true,
    breakpoints: {
      900: {
        slidesPerView:4,
        spaceBetween: 15
      },
      // when window width is >= 480px
      540: {
        slidesPerView: 3.5,
        spaceBetween: 5
      },
      440: {
        slidesPerView:2.5,
        spaceBetween: 5
      },
    }
  });

});
