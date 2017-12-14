'use strict';

(function () {
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // функция поиска случайного элемента массива
  var getRandomArrayElement = function (array) {
    var randomArray = array[window.util.getRandomValue(0, array.length - 1)];
    return randomArray;
  };

  // функция выбора случайного неповторяющегося заголовка из массива
  var getOfferTitle = function (titles) {
    var count = window.util.getRandomValue(0, titles.length - 1);
    var offerTitle = titles[count];
    titles.splice(count, 1);
    return offerTitle;
  };

  // функция выбора массива услуг
  var getOfferFeatures = function (feature) {
    var offerFeature = [];
    var featureQuantity = window.util.getRandomValue(1, feature.length);
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
  };

  // функция проверки на числовое значение
  var isNumeric = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  // функция инициализации события по полю и типу
  var callEvent = function (objectOfEvent, eventType) {
    var event = new Event(eventType);
    objectOfEvent.dispatchEvent(event);
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomArrayElement: getRandomArrayElement,
    getOfferTitle: getOfferTitle,
    getOfferFeatures: getOfferFeatures,
    getFeatures: getFeatures,
    getOfferType: getOfferType,
    isNumeric: isNumeric,
    callEvent: callEvent
  };
})();
