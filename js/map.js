'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var targetPrevious = null; // переменная для предыдущего целевого элемента метки объявления
  var WIDTH_IMAGE = 66;
  var HEIGHT_IMAGE = 70;
  var LOCATION = {
    x: {
      min: 66,
      max: 1200
    },
    y: {
      min: 100,
      max: 500
    }
  };
  var locationY = mapPinMain.offsetTop + HEIGHT_IMAGE;
  var locationX = mapPinMain.offsetLeft + WIDTH_IMAGE / 2;

  window.vars.noticeAddress.value = 'x: {' + locationX + '}, y: {' + locationY + '}';
  window.util.callEvent(window.vars.noticeAddress, "change");

  // После нажатия мыши на метку с кексом передвигаем метку в заданных пределах
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      locationY -= shift.y;
      locationX -= shift.x;

      if (locationX < LOCATION.x.min) {
        locationX = LOCATION.x.min;
        mapPinMain.style.left = locationX - WIDTH_IMAGE / 2 + 'px';
      } else if (locationX > LOCATION.x.max) {
        locationX = LOCATION.x.max;
        mapPinMain.style.left = locationX - WIDTH_IMAGE / 2 + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (locationY < LOCATION.y.min) {
        locationY = LOCATION.y.min;
        mapPinMain.style.top = locationY - HEIGHT_IMAGE + 'px';
      } else if (locationY > LOCATION.y.max) {
        locationY = LOCATION.y.max;
        mapPinMain.style.top = locationY - HEIGHT_IMAGE + 'px'
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      window.vars.noticeAddress.value = 'x: {' + locationX + '}, y: {' + locationY + '}';
      window.util.callEvent(window.vars.noticeAddress, "change");
    };

    var onMouseUp = function (upEvt) {
      // При отпускании мыши, активируем карту и форму, добавляем метки на карту
      upEvt.preventDefault();
      window.vars.map.classList.remove('map--faded');
      window.pin.addFragment(mapPins);
      window.vars.noticeForm.classList.remove('notice__form--disabled');
      for (var i = 0; i < window.vars.noticeFieldset.length; i++) {
        window.vars.noticeFieldset[i].disabled = false;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
