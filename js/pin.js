'use strict';

(function () {
  var WIDTH_IMAGE = 46;
  var HEIGHT_IMAGE = 62;
  // добавляем метки на карту используя DocumentFragment
  for (var i = 0; i < ads.length; i++) {
    var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    mapPin.querySelector('img').src = ads[i].author.avatar;
    mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
    mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
    mapPin.dataset.mapPinId = i;
    mapPin.setAttribute('tabindex', '0');
    fragment.appendChild(mapPin);
  }
})();
