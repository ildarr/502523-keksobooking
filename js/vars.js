'use strict';

(function () {
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var MIN_PRICE = 1000;
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
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    keyCodes: KEY_CODES,
    ads: ads,
    map: map,
    mapPinMain: mapPinMain,
    noticeForm: noticeForm,
    noticeFieldset: noticeFieldset,
    noticeAddress: noticeAddress,
    offerCheckins: OFFER_CHECKINS,
    offerCheckouts: OFFER_CHECKOUTS
  };
})();
