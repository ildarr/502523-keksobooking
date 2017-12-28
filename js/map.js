'use strict';

(function () {
  // функция активирует карту и форму, добавляет метки на карту
  var activateMap = function () {
    window.vars.map.classList.remove('map--faded');
    window.pin.addFragment(window.vars.mapPins);
    window.form.noticeFormActivate();
  };

  window.map = {
    activateMap: activateMap
  };

  // при нажатии метки (кроме кекса) показываем объявление
  window.vars.mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target;
    while (targetElement !== window.vars.mapPins) {
      if ((targetElement.tagName === 'BUTTON') && (targetElement !== window.vars.mapPinMain)) {
        if (window.vars.targetPrevious !== null) {
          window.card.closeMapCard(window.vars.targetPrevious.dataset.mapPinId);
        }
        window.card.openMapCard(targetElement.dataset.mapPinId);
        window.vars.targetPrevious = targetElement;
        return;
      }
      targetElement = targetElement.parentNode;
    }
  });
})();
