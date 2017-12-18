'use strict';

(function () {
  window.showCard = {
    // функция показа карточки объявления
    openMapCard: function (indexNumber) {
      var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
      var popupClose = mapCurrentCard.querySelector('.popup__close');
      var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
      mapCurrentCard.removeAttribute('hidden');
      mapCurrentPin.classList.add('map__pin--active');
      popupClose.setAttribute('tabindex', '0');
      popupClose.addEventListener('click', function () {
        window.showCard.closeMapCard(indexNumber);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.vars.keyCodes.ESC) {
          window.showCard.closeMapCard(indexNumber);
        }
      });
    },

    // функция скрытия карточки объявления
    closeMapCard: function (indexNumber) {
      var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
      var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
      mapCurrentCard.setAttribute('hidden', 'true');
      mapCurrentCard.querySelector('.popup__close').removeAttribute('tabindex');
      mapCurrentPin.classList.remove('map__pin--active');
    }
  };
})();
