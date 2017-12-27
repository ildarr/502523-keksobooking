'use strict';

(function () {
  // функция активирует карту и форму, добавляет метки на карту
  var activateMap = function () {
    window.vars.map.classList.remove('map--faded');
    window.pin.addFragment(window.vars.mapPins);
    window.vars.noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.vars.noticeFieldset.length; i++) {
      window.vars.noticeFieldset[i].disabled = false;
    }
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
          window.showCard(window.vars.targetPrevious.dataset.mapPinId, window.card.closeMapCard);
        }
        window.showCard(targetElement.dataset.mapPinId, window.card.openMapCard);
        window.vars.targetPrevious = targetElement;
        return;
      }
      targetElement = targetElement.parentNode;
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.vars.keyCodes.ESC) {
      if (window.backend.errorPopup.style.visibility === 'visible') {
        window.backend.closeErrorHandler();
      } else {
        for (var i = 0; i < 5; i++) {
          var mapCurrentCard = document.querySelector('[data-map-card-id = "' + i + '"]');
          if (mapCurrentCard !== null) {
            if (!mapCurrentCard.hasAttribute('hidden')) {
              window.showCard(i, window.card.closeMapCard);
            }
          }
        }
      }
    }
  });
})();
