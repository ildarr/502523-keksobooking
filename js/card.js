'use strict';

(function () {
  window.card = {
    // функция создания карточки DOM - элемента объявления с данными из текущего элемента массива
    getMapCard: function (array, element, indexNumber) {
      var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
      mapCard.querySelector('h3').textContent = array.offer.title;
      mapCard.querySelector('small').textContent = array.offer.address;
      mapCard.querySelector('.popup__price').innerHTML = array.offer.price + '&#x20bd;/ночь';
      mapCard.querySelector('h4').textContent = window.util.getOfferType(array.offer.type);
      mapCard.querySelector('h4 + p').textContent = array.offer.rooms + ' для ' + array.offer.guests + '  гостей';
      mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
      mapCard.querySelector('.popup__features').innerHTML = window.util.getFeatures(array.offer.features);
      mapCard.querySelector('.popup__features + p').textContent = array.offer.description;
      mapCard.querySelector('.popup__avatar').src = array.author.avatar;
      mapCard.dataset.mapCardId = indexNumber;
      mapCard.setAttribute('hidden', 'true');
      element.appendChild(mapCard);
    },

    // функция показа карточки объявления
    openMapCard: function (indexNumber) {
      var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
      var popupClose = mapCurrentCard.querySelector('.popup__close');
      var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
      mapCurrentCard.removeAttribute('hidden');
      mapCurrentPin.classList.add('map__pin--active');
      popupClose.setAttribute('tabindex', '0');
      popupClose.addEventListener('click', function () {
        window.card.closeMapCard(indexNumber);
      });
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.vars.keyCodes.ESC) {
          window.card.closeMapCard(indexNumber);
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

  // создаем карточки объявлений
  for (var i = 0; i < window.vars.ads.length; i++) {
    window.card.getMapCard(window.vars.ads[i], window.vars.map, i);
  }
})();
