'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var targetPrevious = null; // переменная для предыдущего целевого элемента метки объявления

  // функция активирует карту и форму, добавляет метки на карту
  var activateMap = function () {
    window.vars.map.classList.remove('map--faded');
    window.pin.addFragment(mapPins);
    window.vars.noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.vars.noticeFieldset.length; i++) {
      window.vars.noticeFieldset[i].disabled = false;
    }
  };

  window.map = {
    activateMap: activateMap
  };

  // при нажатии метки (кроме кекса) показываем объявление
  mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target;
    while (targetElement !== mapPins) {
      if ((targetElement.tagName === 'BUTTON') && (targetElement !== window.vars.mapPinMain)) {
        if (targetPrevious !== null) {
          window.card.closeMapCard(targetPrevious.dataset.mapPinId);
        }
        window.card.openMapCard(targetElement.dataset.mapPinId);
        targetPrevious = targetElement;
        return;
      }
      targetElement = targetElement.parentNode;
    }
  });
})();
