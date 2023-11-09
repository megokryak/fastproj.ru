var bodyElement = document.body;
var navMain = document.querySelector('.header');
var navToggle = document.querySelector('.header__toggle');
var map = document.querySelector('.contacts__img');
var toggleColor = document.querySelector('.main-nav__toggle-color');
var subMenuItem = document.querySelector('.main-nav__menu-item--submenu');
var subMenu = document.querySelector('.main-nav__submenu-list');
var paginationHeader = navMain.offsetHeight;
var modalCall = document.querySelector('.modal-call');
var modalCallClose = document.querySelector('.modal-call__button');
var mainNavCallbackPhone = document.querySelectorAll('.main-nav__callback-phone');
var footerCallbackPhone = document.querySelector('.footer__callback-phone');
var modalForm = document.querySelector('.modal-form');
var messageButton = document.querySelector('.message__button');
var modalFormButton = document.querySelector('.modal-form__button');
const paddingMenu = 50;
const tabletWidth = 1200;

navMain.classList.remove('header--nojs');

function removeCallPhone() {
  modalCall.classList.remove('modal-call--close');
};

mainNavCallbackPhone.forEach((e)=> {
  e.addEventListener('click', function() {
    removeCallPhone();
});
});

footerCallbackPhone.addEventListener('click', function() {
  removeCallPhone();
});

modalCallClose.addEventListener('click', function() {
  modalCall.classList.add('modal-call--close');
});

// messageButton.addEventListener('click', function() {
//   modalForm.classList.remove('modal-form--close');
// });

modalFormButton.addEventListener('click', function() {
  modalForm.classList.add('modal-form--close');
});

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('header--closed-menu')) {
    navMain.classList.remove('header--closed-menu');
    navMain.classList.add('header--open-menu');
  } else {
    navMain.classList.remove('header--open-menu');
    navMain.classList.add('header--closed-menu');
  }
});

toggleColor.addEventListener('click', function() {
  if (toggleColor.classList.contains('main-nav__toggle-color--dark')) {
    toggleColor.classList.remove('main-nav__toggle-color--dark');
    bodyElement.classList.remove('theme_dark');
    bodyElement.classList.add('theme_white');
  } else {
    toggleColor.classList.add('main-nav__toggle-color--dark');
    bodyElement.classList.remove('theme_white');
    bodyElement.classList.add('theme_dark');
  }
});

function mouseHoverSubmenu() {
  if(document.documentElement.clientWidth >= tabletWidth) {
    console.log(1);
    navMain.style.height = subMenu.offsetHeight + paginationHeader + paddingMenu + "px";
    navMain.style.boxShadow = "0 4px 11px rgba(168,175,196,.5)";
  }
};

function mouseLeaveSubmenu() {
  if(document.documentElement.clientWidth >= tabletWidth) {
    navMain.style.height = paginationHeader + "px";
    navMain.style.boxShadow = "none";
  }
};

subMenuItem.addEventListener('mouseenter', mouseHoverSubmenu);
subMenuItem.addEventListener('mouseleave', mouseLeaveSubmenu);