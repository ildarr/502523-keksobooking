'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var KEY_CODES = {
    ESC: 27,
    ENTER: 13
  };
  var ads = [];
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldset = noticeForm.querySelectorAll('fieldset');
  var noticeAddress = noticeForm.querySelector('[id = "address"]');

  window.vars = {
    maxPrice: MAX_PRICE,
    keyCodes: KEY_CODES,
    ads: ads,
    map: map,
    mapPinMain: mapPinMain,
    noticeForm: noticeForm,
    noticeFieldset: noticeFieldset,
    noticeAddress: noticeAddress
  };
})();
