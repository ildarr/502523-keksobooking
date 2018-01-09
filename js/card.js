'use strict';

(function () {
  // функция создания карточки DOM - элемента объявления с данными из текущего элемента массива
  var getMapCard = function (obtainedAd, element, indexNumber) {
    var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
    mapCard.querySelector('h3').textContent = obtainedAd.offer.title;
    mapCard.querySelector('small').textContent = obtainedAd.offer.address;
    mapCard.querySelector('.popup__price').innerHTML = obtainedAd.offer.price + '&#x20bd;/ночь';
    mapCard.querySelector('h4').textContent = window.util.getOfferType(obtainedAd.offer.type);
    mapCard.querySelector('h4 + p').textContent = obtainedAd.offer.rooms + ' для ' + obtainedAd.offer.guests + '  гостей';
    mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + obtainedAd.offer.checkin + ', выезд до ' + obtainedAd.offer.checkout;
    mapCard.querySelector('.popup__features').innerHTML = window.util.getFeatures(obtainedAd.offer.features);
    mapCard.querySelector('.popup__features + p').textContent = obtainedAd.offer.description;
    mapCard.querySelector('.popup__avatar').src = obtainedAd.author.avatar;
    mapCard.dataset.mapCardId = indexNumber;
    mapCard.setAttribute('hidden', 'true');
    element.appendChild(mapCard);
  };

  // функция показа карточки объявления
  var openMapCard = function (indexNumber) {
    var currentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
    var popupClose = currentCard.querySelector('.popup__close');
    var currentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
    currentCard.removeAttribute('hidden');
    currentPin.classList.add('map__pin--active');
    popupClose.setAttribute('tabindex', '0');
    popupClose.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', buttonEscPressHandler);
  };

  var buttonClickHandler = function (evt) {
    var indexNumber = evt.target.parentNode.getAttribute('data-map-card-id');
    evt.target.removeEventListener('click', buttonClickHandler);
    closeMapCard(indexNumber);
  };

  var buttonEscPressHandler = function (evt) {
    if ((evt.keyCode === window.vars.ESC_KEYCODE) && (window.vars.closeErrorIndicator === false)) {
      var mapCardCollection = document.querySelectorAll('.map__card');
      [].forEach.call(mapCardCollection, function (currentCard, i) {
        if (currentCard !== null) {
          if (!currentCard.hasAttribute('hidden')) {
            window.card.closeMapCard(i);
          }
        }
      });
      document.removeEventListener('keydown', buttonEscPressHandler);
    }
  };

  // функция скрытия карточки объявления
  var closeMapCard = function (indexNumber) {
    var currentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
    var currentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
    currentCard.setAttribute('hidden', 'true');
    currentCard.querySelector('.popup__close').removeAttribute('tabindex');
    currentPin.classList.remove('map__pin--active');
  };

  window.card = {
    getMapCard: getMapCard,
    openMapCard: openMapCard,
    closeMapCard: closeMapCard
  };
})();
