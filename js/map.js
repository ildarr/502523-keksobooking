'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
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
var WIDTH_IMAGE = 46;
var HEIGHT_IMAGE = 62;
var ads = [];
var offerTitles = OFFER_TITLES.slice(0, OFFER_TITLES.length);
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// функция поиска случайного числа из диапазона
var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// функция поиска случайного элемента массива
var getRandomArrayElement = function (array) {
  var randomArray = array[getRandomValue(0, array.length - 1)];
  return randomArray;
};

// функция выбора случайного неповторяющегося заголовка из массива
var getOfferTitle = function (titles) {
  var count = getRandomValue(0, titles.length - 1);
  var offerTitle = titles[count];
  titles.splice(count, 1);
  return offerTitle;
};

// функция выбора массива услуг
var getOfferFeatures = function (feature) {
  var offerFeature = [];
  var featureQuantity = getRandomValue(1, feature.length);
  for (var i = 0; i < featureQuantity; i++) {
    offerFeature.push(feature[i]);
  }
  return offerFeature;
};

// функция получения списка доступных удобств
var getFeatures = function (features) {
  var featureList = '';
  for (var i = 0; i < features.length; i++) {
    featureList += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureList;
};

// фукнция получения типа жилья
var getOfferType = function (type) {
  var offerType ='';
  if (type === 'flat') {
    offerType = 'Квартира';
  } else if (type === 'house') {
    offerType = 'Дом';
  } else if (type === 'bungalo') {
    offerType = 'Бунгало';
  } else {
    offerType = type;
  }
  return offerType
};

//создаем массив
for (var i = 0; i < 8; i++) {
  var locationX = getRandomValue(LOCATION.x.min, LOCATION.x.max);
  var locationY = getRandomValue(LOCATION.y.min, LOCATION.y.max);

  ads[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    },
    offer: {
      title: getOfferTitle(offerTitles),
      address: locationX + ', ' + locationY,
      price: getRandomValue(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomValue(1, 4),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      checkout: getRandomArrayElement(OFFER_CHECKOUTS),
      features: getOfferFeatures(OFFER_FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

//удалим класс у блока .map
map.classList.remove('map--faded');

// добавляем метки на карту используя DocumentFragment
for (i = 0; i < ads.length; i++) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = ads[i].author.avatar;
  mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
  mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
  fragment.appendChild(mapPin);
}
mapPins.appendChild(fragment);

// карточка DOM - элемента объявления с данными из первого элемента массива
var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
mapCard.querySelector('h3').textContent = ads[0].offer.title;
mapCard.querySelector('small').textContent = ads[0].offer.address;
mapCard.querySelector('.popup__price').innerHTML = ads[0].offer.price + '&#x20bd;/ночь';
mapCard.querySelector('h4').textContent = getOfferType(ads[0].offer.type);
mapCard.querySelector('h4 + p').textContent = ads[0].offer.rooms + ' для ' + ads[0].offer.guests + '  гостей';
mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
mapCard.querySelector('.popup__features').innerHTML = getFeatures(ads[0].offer.features);
mapCard.querySelector('.popup__features + p').textContent = ads[0].offer.description;
mapCard.querySelector('.popup__avatar').src = ads[0].author.avatar;
map.appendChild(mapCard);
