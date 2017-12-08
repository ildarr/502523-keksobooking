'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var LOCATION = {
  x: {
    min: 300,
    max: 900
  },
  y: {
    min: 100,
    max: 500
  }
};
var keyCodes = {
  ESC: 27,
  ENTER: 13
};
var WIDTH_IMAGE = 46;
var HEIGHT_IMAGE = 62;
var ads = [];
var offerTitles = OFFER_TITLES.slice(0, OFFER_TITLES.length);
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var noticeForm = document.querySelector('.notice__form');
var fragment = document.createDocumentFragment();
var targetPrevious = null; // переменная для предыдущего целевого элемента метки объявления

// функция поиска случайного числа из диапазона
var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// функция поиска случайного элемента массива
var getRandomArrayElement = function (array) {
  var randomArray = array[getRandomValue(0, array.length - 1)];
  return randomArray;
};

// функция выбора случайного неповторяющегося заголовка из массива
var getOfferTitle = function (titles) {
  var count = getRandomValue(0, titles.length - 1);
  var offerTitle = titles[count];
  titles.splice(count, 1);
  return offerTitle;
};

// функция выбора массива услуг
var getOfferFeatures = function (feature) {
  var offerFeature = [];
  var featureQuantity = getRandomValue(1, feature.length);
  for (var i = 0; i < featureQuantity; i++) {
    offerFeature.push(feature[i]);
  }
  return offerFeature;
};

// функция получения списка доступных удобств
var getFeatures = function (features) {
  var featureList = '';
  for (var i = 0; i < features.length; i++) {
    featureList += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return featureList;
};

// фукнция получения типа жилья
var getOfferType = function (type) {
  var offerType = '';
  if (type === 'flat') {
    offerType = 'Квартира';
  } else if (type === 'house') {
    offerType = 'Дом';
  } else if (type === 'bungalo') {
    offerType = 'Бунгало';
  } else {
    offerType = type;
  }
  return offerType;
};

// Деактивируем поля ввода форм
var noticeFieldset = noticeForm.querySelectorAll('fieldset');
for (i = 0; i < noticeFieldset.length; i++) {
  noticeFieldset[i].setAttribute('disabled', 'true');
}

// создаем массив
for (var i = 0; i < 8; i++) {
  var locationX = getRandomValue(LOCATION.x.min, LOCATION.x.max);
  var locationY = getRandomValue(LOCATION.y.min, LOCATION.y.max);

  ads[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png',
    },
    offer: {
      title: getOfferTitle(offerTitles),
      address: locationX + ', ' + locationY,
      price: getRandomValue(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(OFFER_TYPES),
      rooms: getRandomValue(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomValue(1, 4),
      checkin: getRandomArrayElement(OFFER_CHECKINS),
      checkout: getRandomArrayElement(OFFER_CHECKOUTS),
      features: getOfferFeatures(OFFER_FEATURES),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
}

// добавляем метки на карту используя DocumentFragment
for (i = 0; i < ads.length; i++) {
  var mapPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = ads[i].author.avatar;
  mapPin.style.left = ads[i].location.x - WIDTH_IMAGE / 2 + 'px';
  mapPin.style.top = ads[i].location.y - HEIGHT_IMAGE + 'px';
  mapPin.dataset.mapPinId = i;
  mapPin.setAttribute('tabindex', '0');
  fragment.appendChild(mapPin);
}

// При перетаскивании метки с кексом, активируем карту и форму, добавляем метки на карту
mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  noticeForm.classList.remove('notice__form--disabled');
  for (i = 0; i < noticeFieldset.length; i++) {
    noticeFieldset[i].disabled = false;
  }
});

// функция создания карточки DOM - элемента объявления с данными из текущего элемента массива
var getMapCard = function (array, indexNumber) {
  var mapCard = document.querySelector('template').content.querySelector('.map__card').cloneNode(true);
  mapCard.querySelector('h3').textContent = array.offer.title;
  mapCard.querySelector('small').textContent = array.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = array.offer.price + '&#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = getOfferType(array.offer.type);
  mapCard.querySelector('h4 + p').textContent = array.offer.rooms + ' для ' + array.offer.guests + '  гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = getFeatures(array.offer.features);
  mapCard.querySelector('.popup__features + p').textContent = array.offer.description;
  mapCard.querySelector('.popup__avatar').src = array.author.avatar;
  mapCard.dataset.mapCardId = indexNumber;
  mapCard.setAttribute('hidden', 'true');
  map.appendChild(mapCard);
};

// функция показа карточки объявления
var openMapCard = function (indexNumber) {
  var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
  var popupClose = mapCurrentCard.querySelector('.popup__close');
  var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
  mapCurrentCard.removeAttribute('hidden');
  mapCurrentPin.classList.add('map__pin--active');
  popupClose.setAttribute('tabindex', '0');
  popupClose.addEventListener('click', function () {
    closeMapCard(indexNumber);
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === keyCodes.ESC) {
      closeMapCard(indexNumber);
    }
  });
};

// функция скрытия карточки объявления
var closeMapCard = function (indexNumber) {
  var mapCurrentCard = document.querySelector('[data-map-card-id = "' + indexNumber + '"]');
  var mapCurrentPin = document.querySelector('[data-map-pin-id = "' + indexNumber + '"]');
  mapCurrentCard.setAttribute('hidden', 'true');
  mapCurrentCard.querySelector('.popup__close').removeAttribute('tabindex');
  mapCurrentPin.classList.remove('map__pin--active');
};

// создаем карточки объявлений
for (i = 0; i < ads.length; i++) {
  getMapCard(ads[i], i);
}

// при нажатии метки (кроме кекса) показываем объявление
mapPins.addEventListener('click', function (evt) {
  var targetElement = evt.target;
  while (targetElement !== mapPins) {
    if ((targetElement.tagName === 'BUTTON') && (targetElement !== mapPinMain)) {
      if (targetPrevious !== null) {
        closeMapCard(targetPrevious.dataset.mapPinId);
      }
      openMapCard(targetElement.dataset.mapPinId);
      targetPrevious = targetElement;
      return;
    }
    targetElement = targetElement.parentNode;
  }
});

// Валидация полей формы
var noticeTitle = noticeForm.querySelector('[id = "title"]');
var noticeTimein = noticeForm.querySelector('[id = "timein"]');
var noticeTimeout = noticeForm.querySelector('[id = "timeout"]');
var noticeType = noticeForm.querySelector('[id = "type"]');
var noticePrice = noticeForm.querySelector('[id = "price"]');
var noticeRoomNumber = noticeForm.querySelector('[id = "room_number"]');
var noticeCapacity = noticeForm.querySelector('[id = "capacity"]');
var checkInput = noticeForm.querySelectorAll('input');
var OFFER_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
var MIN_LENGTH = 30;
var MAX_LENGTH = 100;
var MAX_PRICE = 1000000;

// валидация всех полей input в форме, при неверном заполнении выделяются красным
for (i = 0; i < checkInput.length; i++) {
  checkInput[i].addEventListener('blur', function (evt) {
    evt.target.checkValidity();
  });
  checkInput[i].addEventListener('focus', function (evt) {
    evt.target.style.borderWidth = '';
    evt.target.style.borderColor = '';
  });
  checkInput[i].addEventListener('invalid', function (evt) {
    evt.target.style.borderWidth = '2px';
    evt.target.style.borderColor = 'red';
    var targetRangeValue = null;
    if (evt.target.validity.tooShort) {
      targetRangeValue = evt.target.getAttribute('minlength');
      evt.target.setCustomValidity('Количество символов поля должно быть не меньше ' + String(targetRangeValue));
    } else if (evt.target.validity.tooLong) {
      targetRangeValue = evt.target.getAttribute('maxlength');
      evt.target.setCustomValidity('Количество символов поля должно быть не больше ' + String(targetRangeValue));
    } else if (evt.target.validity.rangeUnderflow) {
      targetRangeValue = evt.target.getAttribute('min');
      evt.target.setCustomValidity('Значение поля должно быть не меньше ' + String(targetRangeValue));
    } else if (evt.target.validity.rangeOverflow) {
      targetRangeValue = evt.target.getAttribute('max');
      evt.target.setCustomValidity('Значение поля должно быть не больше ' + String(targetRangeValue));
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      evt.target.style.borderWidth = '';
      evt.target.style.borderColor = '';
    }
  });
}

// дополнительная валидация minlength и maxlength Заголовка объявления внутри скрипта
noticeTitle.addEventListener('input', function (evt) {
  if (evt.target.value.length < MIN_LENGTH) {
    evt.target.style.borderWidth = '2px';
    evt.target.style.borderColor = 'red';
    evt.target.setCustomValidity('Количество символов поля должно быть не меньше ' + String(MIN_LENGTH));
  } else if (evt.target.value.length > MAX_LENGTH) {
    evt.target.style.borderWidth = '2px';
    evt.target.style.borderColor = 'red';
    evt.target.setCustomValidity('Количество символов поля должно быть не больше ' + String(MAX_LENGTH));
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.borderWidth = '';
    evt.target.style.borderColor = '';
  }
});

// дополнительная валидация min и max Цены за ночь внутри скрипта
noticePrice.addEventListener('input', function (evt) {
    if (evt.target.value < OFFER_PRICE[noticeType.value]) {
      evt.target.style.borderWidth = '2px';
      evt.target.style.borderColor = 'red';
      evt.target.setCustomValidity('Значение поля должно быть не меньше ' + String(OFFER_PRICE[noticeType.value]));
    } else if (evt.target.value > MAX_PRICE) {
      evt.target.style.borderWidth = '2px';
      evt.target.style.borderColor = 'red';
      evt.target.setCustomValidity('Значение поля должно быть не больше ' + String(MAX_PRICE));
    } else {
      evt.target.setCustomValidity('');
      evt.target.style.borderWidth = '';
      evt.target.style.borderColor = '';
    }
});

// функция синхронизации 2-х полей формы при их изменении
var formFieldSync = function (formFirstField, formSecondField) {
  formFirstField.addEventListener('change', function (evt) {
    var targetElement = evt.target;
    formSecondField.value = targetElement.value;
  });
};

// вызов функции синхронизации полей времени заезда-выезда
formFieldSync(noticeTimeout, noticeTimein);
formFieldSync(noticeTimein, noticeTimeout);

// синхронизация типа жилья и минимальной цены
noticeType.addEventListener('change', function (evt) {
  noticePrice.min = OFFER_PRICE[evt.target.value];
  noticePrice.value = OFFER_PRICE[evt.target.value];
  //инициализируем проверку input для Прайса
  inputEvent(noticePrice);
});

// синхронизация количества гостей и комнат
noticeRoomNumber.addEventListener('change', function (evt) {
  var targetElement = evt.target;
  // активируем опцию числа гостей при количестве комнат =100
  if (targetElement.value === '100') {
    for (i = 0; i < noticeCapacity.options.length; i++) {
      if (noticeCapacity.options[i].value === '0') {
        noticeCapacity.options[i].setAttribute('hidden', 'false');
      } else {
        noticeCapacity.options[i].setAttribute('hidden', 'true');
      }
    }
    noticeCapacity.value = '0';
  } else { // активируем опции числа гостей при количестве комнат, кроме 100
    for (i = 0; i < noticeCapacity.options.length; i++) {
      noticeCapacity.options[i].setAttribute('hidden', 'true');
      for (var j = 1; j <= targetElement.value; j++) {
        if (noticeCapacity.options[i].value === String(j)) {
          noticeCapacity.options[i].removeAttribute('hidden');
        }
      }
    }
    noticeCapacity.value = targetElement.value;
  }
});

// функция инициализации события Change
var changeEvent = function (objectOfEvent) {
  var event = new Event('change');
  objectOfEvent.dispatchEvent(event);
};
// инициализируем событие синхронизации гостей и комнат изначально
changeEvent(noticeRoomNumber);
// инициализируем событие синхронизации типа жилья и цены
changeEvent(noticeType);


// функция инициализации события input
var inputEvent = function (objectOfEvent) {
  var event = new Event('input');
  objectOfEvent.dispatchEvent(event);
};

var formSubmit = noticeForm.querySelector('.form__submit');
formSubmit.addEventListener('click', function() {
  // при отправке формы инициализируем проверку input для Заголовка и Прайса
  inputEvent(noticeTitle);
  inputEvent(noticePrice);
});

var formReset = noticeForm.querySelector('.form__reset');
formReset.addEventListener('click', function() {
  // при отправке формы инициализируем проверку input для Заголовка и Прайса
  for (i = 0; i < checkInput.length; i++) {
    checkInput[i].style.borderWidth = '';
    checkInput[i].style.borderColor = '';
  }
});
