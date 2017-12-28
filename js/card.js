'use strict';

(function () {
  var CARDS_AMOUNT = 5;
  // функция создания карточки DOM - элемента объявления с данными из текущего элемента массива
  var getMapCard = function (array, element, indexNumber) {
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
  };

  // функция показа карточки объявления
  var openMapCard = function (indexNumber) {
    var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
    var popupClose = mapCurrentCard.querySelector('.popup__close');
    var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
    mapCurrentCard.removeAttribute('hidden');
    mapCurrentPin.classList.add('map__pin--active');
    popupClose.setAttribute('tabindex', '0');
    popupClose.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonEscPressHandler);
  };

  var buttonClickHandler = function (evt) {
    var indexNumber = evt.tagret.parentNode.getAttribute('data-map-card-id');
    evt.tagret.removeEventListener('click', buttonClickHandler);
    closeMapCard(indexNumber);
  };

  var buttonEscPressHandler = function (evt) {
    if ((evt.keyCode === window.vars.ESC_KEYCODE) && (window.vars.closeErrorIndicator === false)) {
      for (var i = 0; i < CARDS_AMOUNT; i++) {
        var mapCurrentCard = document.querySelector('[data-map-card-id = "' + i + '"]');
        if (mapCurrentCard !== null) {
          if (!mapCurrentCard.hasAttribute('hidden')) {
            window.card.closeMapCard(i);
          }
        }
      }
      document.removeEventListener('keydown', buttonEscPressHandler);
    }
  };

  // функция скрытия карточки объявления
  var closeMapCard = function (indexNumber) {
    var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
    var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
    mapCurrentCard.setAttribute('hidden', 'true');
    mapCurrentCard.querySelector('.popup__close').removeAttribute('tabindex');
    mapCurrentPin.classList.remove('map__pin--active');
  };

  window.card = {
    getMapCard: getMapCard,
    openMapCard: openMapCard,
    closeMapCard: closeMapCard
  };
})();
