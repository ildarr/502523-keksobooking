'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  var fragment = document.createDocumentFragment();

  // добавляем метки на карту используя DocumentFragment
  for (var i = 0; i < window.vars.ads.length; i++) {
    var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    mapPin.querySelector('img').src = window.vars.ads[i].author.avatar;
    mapPin.style.left = window.vars.ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
    mapPin.style.top = window.vars.ads[i].location.y - HEIGHT_IMAGE + 'px';
    mapPin.dataset.mapPinId = i;
    mapPin.setAttribute('tabindex', '0');
    fragment.appendChild(mapPin);
  }

  var addFragment = function (element) {
    element.appendChild(fragment);
  };

  window.pin = {
    addFragment: addFragment
  };
})();
