'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var targetPrevious = null; // переменная для предыдущего целевого элемента метки объявления

  // При перетаскивании метки с кексом, активируем карту и форму, добавляем метки на карту
  mapPinMain.addEventListener('mouseup', function () {
    window.map.classList.remove('map--faded');
    mapPins.appendChild(window.fragment);
    window.noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.noticeFieldset.length; i++) {
      window.noticeFieldset[i].disabled = false;
    }
  });

  // создаем карточки объявлений
  for (var i = 0; i < window.ads.length; i++) {
    window.card.getMapCard(window.ads[i], i);
  }

  // при нажатии метки (кроме кекса) показываем объявление
  mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target;
    while (targetElement !== mapPins) {
      if ((targetElement.tagName === 'BUTTON') && (targetElement !== mapPinMain)) {
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
