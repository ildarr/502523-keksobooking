'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  var PINS_AMOUNT = 5;
  var DEBOUNCE_INTERVAL = 500;
  var fragment = document.createDocumentFragment();

  var getDownloadsHandler = function (downloadedAds) {
    window.vars.ads = downloadedAds;
    getMapPins(window.vars.ads);
  };

  var getMapPins = function (receivedAds) {
    if (receivedAds.length > PINS_AMOUNT) {
      receivedAds = receivedAds.slice(0, PINS_AMOUNT);
    }
    // добавляем метки на карту используя DocumentFragment
    receivedAds.forEach(function (currentAd, i) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.querySelector('img').src = currentAd.author.avatar;
      mapPin.style.left = currentAd.location.x - WIDTH_IMAGE / 2 + 'px';
      mapPin.style.top = currentAd.location.y - HEIGHT_IMAGE + 'px';
      mapPin.dataset.mapPinId = i;
      mapPin.setAttribute('tabindex', '0');
      fragment.appendChild(mapPin);
      // готовим карточки объявлений
      window.card.getMapCard(currentAd, window.vars.map, i);
    });
  };

  var deleteMapPins = function () {
    var mapPinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var mapCardCollection = document.querySelectorAll('.map__card');
    [].forEach.call(mapPinsCollection, function (currentPin) {
      window.vars.mapPins.removeChild(currentPin);
    });
    [].forEach.call(mapCardCollection, function (currentCard) {
      window.vars.map.removeChild(currentCard);
    });
  };

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  window.backend.setErrorHandler();
  window.backend.load(getDownloadsHandler, window.backend.openErrorHandler);

  var updateMapPins = function (filteredPins) {
    deleteMapPins();
    window.debounce(getMapPins(filteredPins), DEBOUNCE_INTERVAL);
    addFragment(window.vars.mapPins);
    window.vars.targetPrevious = null;
  };

  window.pin = {
    addFragment: addFragment,
    updateMapPins: updateMapPins
  };
})();
