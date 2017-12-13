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
  window.MIN_PRICE = 1000;
  window.MAX_PRICE = 1000000;
  window.keyCodes = {
    ESC: 27,
    ENTER: 13
  };
  var offerTitles = OFFER_TITLES.slice(0, OFFER_TITLES.length);
  window.ads = [];
  window.fragment = document.createDocumentFragment();
  window.map = document.querySelector('.map');
  window.data = {
    // функция поиска случайного числа из диапазона
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // функция поиска случайного элемента массива
    getRandomArrayElement: function (array) {
      var randomArray = array[window.data.getRandomValue(0, array.length - 1)];
      return randomArray;
    },

    // функция выбора случайного неповторяющегося заголовка из массива
    getOfferTitle: function (titles) {
      var count = window.data.getRandomValue(0, titles.length - 1);
      var offerTitle = titles[count];
      titles.splice(count, 1);
      return offerTitle;
    },

    // функция выбора массива услуг
    getOfferFeatures: function (feature) {
      var offerFeature = [];
      var featureQuantity = window.data.getRandomValue(1, feature.length);
      for (var i = 0; i < featureQuantity; i++) {
        offerFeature.push(feature[i]);
      }
      return offerFeature;
    },

    // функция получения списка доступных удобств
    getFeatures: function (features) {
      var featureList = '';
      for (var i = 0; i < features.length; i++) {
        featureList += '<li class="feature feature--' + features[i] + '"></li>';
      }
      return featureList;
    },

    // фукнция получения типа жилья
    getOfferType: function (type) {
      var offerType = '';
      if (type === 'flat') {
        offerType = 'Квартира';
      } else if (type === 'house') {
        offerType = 'Дом';
      } else if (type === 'bungalo') {
        offerType = 'Бунгало';
      } else {
        offerType = type;
      }
      return offerType;
    },

    // функция проверки на числовое значение
    isNumeric: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num);
    },

    // функция инициализации события по полю и типу
    callEvent: function (objectOfEvent, eventType) {
      var event = new Event(eventType);
      objectOfEvent.dispatchEvent(event);
    }
  };

  // Деактивируем поля ввода форм
  window.noticeForm = document.querySelector('.notice__form');
  window.noticeFieldset = window.noticeForm.querySelectorAll('fieldset');
  for (var i = 0; i < window.noticeFieldset.length; i++) {
    noticeFieldset[i].setAttribute('disabled', 'true');
  }

  // создаем массив
  for (i = 0; i < 8; i++) {
    var locationX = window.data.getRandomValue(LOCATION.x.min, LOCATION.x.max);
    var locationY = window.data.getRandomValue(LOCATION.y.min, LOCATION.y.max);

    window.ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: window.data.getOfferTitle(offerTitles),
        address: locationX + ', ' + locationY,
        price: window.data.getRandomValue(MIN_PRICE, MAX_PRICE),
        type: window.data.getRandomArrayElement(OFFER_TYPES),
        rooms: window.data.getRandomValue(MIN_ROOMS, MAX_ROOMS),
        guests: window.data.getRandomValue(1, 4),
        checkin: window.data.getRandomArrayElement(OFFER_CHECKINS),
        checkout: window.data.getRandomArrayElement(OFFER_CHECKOUTS),
        features: window.data.getOfferFeatures(OFFER_FEATURES),
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
