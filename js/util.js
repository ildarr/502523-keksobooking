'use strict';

(function () {
  // функция получения списка доступных удобств
  var getFeatures = function (features) {
    var featureList = '';
    features.forEach(function (currentFeature) {
      featureList += '<li class="feature feature--' + currentFeature + '"></li>';
    });
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

  // функция преобразования в строку и удаления внешних пробелов
  var getString = function (objectValue) {
    if (typeof objectValue !== 'string') {
      var stringObjectValue = String(objectValue);
      return stringObjectValue.trim();
    } else {
      return objectValue.trim();
    }
  };

  // функция инициализации события по полю и типу
  var callEvent = function (objectOfEvent, eventType) {
    var newEvent = new Event(eventType);
    objectOfEvent.dispatchEvent(newEvent);
  };

  window.util = {
    getFeatures: getFeatures,
    getOfferType: getOfferType,
    isNumeric: isNumeric,
    getString: getString,
    callEvent: callEvent
  };
})();
