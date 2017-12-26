'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  var fragment = document.createDocumentFragment();

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('[id = "housing-type"]');
  var housingPrice = mapFilters.querySelector('[id = "housing-price"]');
  var housingRooms = mapFilters.querySelector('[id = "housing-rooms"]');
  var housingGuests = mapFilters.querySelector('[id = "housing-guests"]');
  var housingFeatures = mapFilters.querySelector('[id = "housing-features"]');

  var priceCondition = function (element) {
    switch (housingPrice.value) {
      case 'low':
        return element.offer.price < 10000;
      case 'middle':
        return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'high':
        return element.offer.price > 50000;
    }
    return false;
  };

  var successHandler = function (array) {
    window.vars.ads = array;
    getMapPins(window.vars.ads);
  };

  var getMapPins = function (array) {
    var takeNumber = array.length > 5 ? 5 : array.length;
    // добавляем метки на карту используя DocumentFragment
    for (var i = 0; i < takeNumber; i++) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.querySelector('img').src = array[i].author.avatar;
      mapPin.style.left = array[i].location.x - WIDTH_IMAGE / 2 + 'px';
      mapPin.style.top = array[i].location.y - HEIGHT_IMAGE + 'px';
      mapPin.dataset.mapPinId = i;
      mapPin.setAttribute('tabindex', '0');
      fragment.appendChild(mapPin);
      // готовим карточки объявлений
      window.card.getMapCard(array[i], window.vars.map, i);
    }
  };
  window.backend.setErrorHandler();
  window.backend.load(successHandler, window.backend.openErrorHandler);

  var deleteMapPins = function () {
    var mapPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapCardCollection = document.querySelectorAll('.popup');

    for (var i = 0; i < mapPinsCollection.length; i++) {
      var currentPin = mapPinsCollection[i];
      var currentCard = mapCardCollection[i];
      window.vars.mapPins.removeChild(currentPin);
      window.vars.map.removeChild(currentCard);
    }
  };

  mapFilters.addEventListener('change', function () {
    deleteMapPins();
    var housingFeaturesCollection = housingFeatures.querySelectorAll('input[type="checkbox"]:checked');
    // преобразуем коллекцию в массив
    var features = [].map.call(housingFeaturesCollection, function (element) {
      return element.value;
    });
    // условие фильтра для features
    var featuresFilter = function (element) {
      return (features.every(function (currentElement) {
        return element.includes(currentElement);
      }));
    };

    var adsFiltered = window.vars.ads.filter(function (element) {
      return ((housingType.value === 'any') ? true : (element.offer.type === housingType.value))
      && ((housingPrice.value === 'any') ? true : priceCondition(element))
      && ((housingRooms.value === 'any') ? true : (element.offer.rooms === parseInt(housingRooms.value, 10)))
      && ((housingGuests.value === 'any') ? true : (element.offer.guests === parseInt(housingGuests.value, 10)))
      && featuresFilter(element.offer.features);
    });
    window.debounce(getMapPins(adsFiltered), 500);
    addFragment(window.vars.mapPins);
    window.vars.targetPrevious = null;
  });

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  window.pin = {
    addFragment: addFragment
  };
})();
