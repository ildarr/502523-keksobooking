'use strict';

(function () {
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };
  var ads = [];
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldset = noticeForm.querySelectorAll('fieldset');

  window.vars = {
    maxPrice: MAX_PRICE,
    keyCodes: KEY_CODES,
    ads: ads,
    map: map,
    noticeForm: noticeForm,
    noticeFieldset: noticeFieldset
  }
})();
