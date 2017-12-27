'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  var fragment = document.createDocumentFragment();

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

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  window.backend.setErrorHandler();
  window.backend.load(successHandler, window.backend.openErrorHandler);

  window.vars.mapFilters.addEventListener('change', function () {
    var adsFiltered = window.vars.ads.filter(window.filters.filterCondition);
    deleteMapPins();
    window.debounce(getMapPins(adsFiltered), 500);
    addFragment(window.vars.mapPins);
    window.vars.targetPrevious = null;
  });

  window.pin = {
    addFragment: addFragment
  };
})();
