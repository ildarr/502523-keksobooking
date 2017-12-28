'use strict';

(function () {
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var OFFER_PRICES = [1000, 0, 5000, 10000];
  var CHECK_FIELDS = ['title', 'address', 'price'];
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var ROOM_NUMBER = ['1', '2', '3', '100'];
  var CAPACITY = [
    ['1'],
    ['2', '1'],
    ['3', '2', '1'],
    ['0']
  ];
  var noticeForm = document.querySelector('.notice__form');
  var noticeTitle = noticeForm.querySelector('[id = "title"]');
  var noticeTimein = noticeForm.querySelector('[id = "timein"]');
  var noticeTimeout = noticeForm.querySelector('[id = "timeout"]');
  var noticeType = noticeForm.querySelector('[id = "type"]');
  var noticeAddress = noticeForm.querySelector('[id = "address"]');
  var noticePrice = noticeForm.querySelector('[id = "price"]');
  var noticeRoomNumber = noticeForm.querySelector('[id = "room_number"]');
  var noticeCapacity = noticeForm.querySelector('[id = "capacity"]');
  var checkInput = noticeForm.querySelectorAll('input');
  var formSubmit = noticeForm.querySelector('.form__submit');
  var formReset = noticeForm.querySelector('.form__reset');
  var noticeFieldset = noticeForm.querySelectorAll('fieldset');
  var minValue = MIN_PRICE;

  var noticeFormActivate = function () {
    noticeForm.classList.remove('notice__form--disabled');
    for (var i = 0; i < noticeFieldset.length; i++) {
      noticeFieldset[i].disabled = false;
    }
  };

  var getNoticeAddress = function (coordinateX, coordinateY) {
    noticeAddress.value = 'x: ' + coordinateX + ', y: ' + coordinateY;
  };

  window.form = {
    noticeFormActivate: noticeFormActivate,
    getNoticeAddress: getNoticeAddress
  };

  // функция изменения цвета рамки
  var setBorderColor = function (fieldObject, fieldColor) {
    fieldObject.style.borderColor = fieldColor;
    if (fieldColor === '') {
      fieldObject.style.borderWidth = '';
    } else {
      fieldObject.style.borderWidth = '2px';
    }
  };

  // функция валидации поля title
  var noticeTitleEventHandler = function (evt) {
    var targetValue = window.util.getString(evt.target.value);
    setBorderColor(evt.target, 'red');
    if (targetValue.length === 0) {
      evt.target.setCustomValidity('Обязательное поле');
    } else if (targetValue.length < MIN_LENGTH) {
      evt.target.setCustomValidity('Количество символов поля должно быть не меньше ' + MIN_LENGTH);
    } else if (targetValue.length > MAX_LENGTH) {
      evt.target.setCustomValidity('Количество символов поля должно быть не больше ' + MAX_LENGTH);
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
      evt.target.value = targetValue;
    }
  };

  // функция валидации поля price
  var noticePriceEventHandler = function (evt) {
    setBorderColor(evt.target, 'red');
    if (!window.util.isNumeric(evt.target.value)) {
      evt.target.setCustomValidity('Значение поля должно быть числом');
    } else if (evt.target.value < minValue) {
      evt.target.setCustomValidity('Значение поля должно быть не меньше ' + minValue);
    } else if (evt.target.value > MAX_PRICE) {
      evt.target.setCustomValidity('Значение поля должно быть не больше ' + MAX_PRICE);
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
    }
  };

  // функция валидации поля address
  var noticeAddressEventHandler = function (evt) {
    var targetValue = window.util.getString(evt.target.value);
    setBorderColor(evt.target, 'red');
    if (targetValue.length === 0) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
      evt.target.value = targetValue;
    }
  };

  // валидация Заголовка объявления внутри скрипта
  noticeTitle.addEventListener('blur', noticeTitleEventHandler);

  // валидация  Цены за ночь внутри скрипта
  noticePrice.addEventListener('blur', noticePriceEventHandler);

  // валидация Адреса внутри скрипта
  noticeAddress.addEventListener('blur', noticeAddressEventHandler);

  // колл-бэк функция синхронизации значений 2-х элементов
  var synchronizeValues = function (element, value) {
    element.value = value;
  };
  // вызов функции синхронизации времени заезда-выезда
  window.synchronizeFields(noticeTimein, noticeTimeout, OFFER_CHECKINS, OFFER_CHECKOUTS, synchronizeValues);
  window.synchronizeFields(noticeTimeout, noticeTimein, OFFER_CHECKOUTS, OFFER_CHECKINS, synchronizeValues);

  // колл-бэк функция синхронизации значения с min значением элемента
  var synchronizeWithMinValue = function (element, value) {
    element.min = value;
    element.value = value;
    minValue = value;
    window.util.callEvent(element, 'blur');
  };

  // синхронизация типа жилья и минимальной цены
  window.synchronizeFields(noticeType, noticePrice, OFFER_TYPES, OFFER_PRICES, synchronizeWithMinValue);

  // колл-бэк функция синхронизации значения элемента с массивом
  var synchronizeElementValueWithArray = function (element, array) {
    for (var i = 0; i < element.options.length; i++) {
      element.options[i].setAttribute('hidden', 'true');
      for (var j = 0; j <= array.length; j++) {
        if (element.options[i].value === array[j]) {
          element.options[i].removeAttribute('hidden');
        }
      }
    }
    element.value = array[0];
  };
  // синхронизация количества гостей и комнат
  window.synchronizeFields(noticeRoomNumber, noticeCapacity, ROOM_NUMBER, CAPACITY, synchronizeElementValueWithArray);

  // инициализируем событие синхронизации гостей и комнат изначально
  window.util.callEvent(noticeRoomNumber, 'change');
  // инициализируем событие синхронизации типа жилья и цены
  window.util.callEvent(noticeType, 'change');

  var resetNoticeForm = function () {
    var noticeAddressDefautValue = noticeAddress.value;
    noticeForm.reset();
    noticeAddress.value = noticeAddressDefautValue;
    noticeCapacity.value = 1;
  };

  noticeForm.addEventListener('submit', function (evt) {
    window.backend.closeErrorHandler();
    window.backend.save(new FormData(noticeForm), resetNoticeForm, window.backend.openErrorHandler);
    evt.preventDefault();
  });

  formSubmit.addEventListener('click', function () {
    // при отправке формы инициализируем проверку input для Заголовка, Прайса и Адреса
    for (var i = 0; i < checkInput.length; i++) {
      for (var j = 0; j < CHECK_FIELDS.length; j++) {
        if (checkInput[i].id === CHECK_FIELDS[j]) {
          window.util.callEvent(checkInput[i], 'blur');
        }
      }
    }
  });

  formReset.addEventListener('click', function () {
    // при очистке формы сбрасываем состояния красных полей
    for (var i = 0; i < checkInput.length; i++) {
      setBorderColor(checkInput[i], '');
    }
  });
})();
