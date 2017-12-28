'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ads = [];
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var targetPrevious = null; // переменная для предыдущего целевого элемента метки объявления
  var closeErrorIndicator = false;

  window.vars = {
    ESC_KEYCODE: ESC_KEYCODE,
    ads: ads,
    map: map,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    targetPrevious: targetPrevious,
    closeErrorIndicator: closeErrorIndicator
  };
})();
