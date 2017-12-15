'use strict';

(function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var LOCATION = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };
  var MIN_PRICE = 1000;
  var offerTitles = OFFER_TITLES.slice(0, OFFER_TITLES.length);

  // Деактивируем поля ввода форм
  for (var i = 0; i < window.vars.noticeFieldset.length; i++) {
    window.vars.noticeFieldset[i].setAttribute('disabled', 'true');
  }

  // создаем массив
  for (i = 0; i < 8; i++) {
    var locationX = window.util.getRandomValue(LOCATION.x.min, LOCATION.x.max);
    var locationY = window.util.getRandomValue(LOCATION.y.min, LOCATION.y.max);

    window.vars.ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: window.util.getOfferTitle(offerTitles),
        address: locationX + ', ' + locationY,
        price: window.util.getRandomValue(MIN_PRICE, window.vars.maxPrice),
        type: window.util.getRandomArrayElement(OFFER_TYPES),
        rooms: window.util.getRandomValue(MIN_ROOMS, MAX_ROOMS),
        guests: window.util.getRandomValue(1, 4),
        checkin: window.util.getRandomArrayElement(OFFER_CHECKINS),
        checkout: window.util.getRandomArrayElement(OFFER_CHECKOUTS),
        features: window.util.getOfferFeatures(OFFER_FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
})();
