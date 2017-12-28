'use strict';

(function () {
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
  var locationY = window.vars.mapPinMain.offsetTop + HEIGHT_IMAGE;
  var locationX = window.vars.mapPinMain.offsetLeft + WIDTH_IMAGE / 2;

  window.form.getNoticeAddress(locationX, locationY);

  // После нажатия мыши на метку с кексом передвигаем метку в заданных пределах
  window.vars.mapPinMain.addEventListener('mousedown', function (evt) {
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
        window.vars.mapPinMain.style.left = locationX - WIDTH_IMAGE / 2 + 'px';
      } else if (locationX > LOCATION.x.max) {
        locationX = LOCATION.x.max;
        window.vars.mapPinMain.style.left = locationX - WIDTH_IMAGE / 2 + 'px';
      } else {
        window.vars.mapPinMain.style.left = (window.vars.mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (locationY < LOCATION.y.min) {
        locationY = LOCATION.y.min;
        window.vars.mapPinMain.style.top = locationY - HEIGHT_IMAGE + 'px';
      } else if (locationY > LOCATION.y.max) {
        locationY = LOCATION.y.max;
        window.vars.mapPinMain.style.top = locationY - HEIGHT_IMAGE + 'px';
      } else {
        window.vars.mapPinMain.style.top = (window.vars.mapPinMain.offsetTop - shift.y) + 'px';
      }

      window.form.getNoticeAddress(locationX, locationY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // При отпускании мыши, активируем карту и форму, добавляем метки на карту
      window.map.activateMap();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
