'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  var fragment = document.createDocumentFragment();

  var successHandler = function (array) {
    window.vars.ads = array;
    // добавляем метки на карту используя DocumentFragment
    for (var i = 0; i < 8; i++) {
      var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      mapPin.querySelector('img').src = window.vars.ads[i].author.avatar;
      mapPin.style.left = window.vars.ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
      mapPin.style.top = window.vars.ads[i].location.y - HEIGHT_IMAGE + 'px';
      mapPin.dataset.mapPinId = i;
      mapPin.setAttribute('tabindex', '0');
      fragment.appendChild(mapPin);
      // готовим карточки объявлений
      window.card.getMapCard(window.vars.ads[i], window.vars.map, i);
    }
  };
  window.backend.setErrorHandler();
  window.backend.load(successHandler, window.backend.openErrorHandler);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.vars.keyCodes.ESC) {
      setTimeout(window.backend.closeErrorHandler(), 1000);
    }
  });

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  window.pin = {
    addFragment: addFragment
  };
})();
