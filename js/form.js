'use strict';

(function () {
  var noticeTitle = window.vars.noticeForm.querySelector('[id = "title"]');
  var noticeTimein = window.vars.noticeForm.querySelector('[id = "timein"]');
  var noticeTimeout = window.vars.noticeForm.querySelector('[id = "timeout"]');
  var noticeType = window.vars.noticeForm.querySelector('[id = "type"]');
  var noticePrice = window.vars.noticeForm.querySelector('[id = "price"]');
  var noticeRoomNumber = window.vars.noticeForm.querySelector('[id = "room_number"]');
  var noticeCapacity = window.vars.noticeForm.querySelector('[id = "capacity"]');
  var checkInput = window.vars.noticeForm.querySelectorAll('input');
  var formSubmit = window.vars.noticeForm.querySelector('.form__submit');
  var formReset = window.vars.noticeForm.querySelector('.form__reset');
  var minValue = window.vars.minPrice;
  var OFFER_TYPES = ['flat', 'bungalo', 'house', 'palace'];
  var OFFER_PRICES = [1000, 0, 5000, 10000];
  var CHECK_FIELDS = ['title', 'address', 'price'];
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var ROOM_NUMBER = ['1', '2', '3', '100']
  var CAPACITY = [
    ['1'],
    ['2', '1'],
    ['3', '2', '1'],
    ['0']
  ]

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
    var targetValue = String(evt.target.value);
    var targetValueTrim = targetValue.trim();
    setBorderColor(evt.target, 'red');
    if (targetValueTrim.length === 0) {
      evt.target.setCustomValidity('Обязательное поле');
    } else if (targetValueTrim.length < MIN_LENGTH) {
      evt.target.setCustomValidity('Количество символов поля должно быть не меньше ' + MIN_LENGTH);
    } else if (targetValueTrim.length > MAX_LENGTH) {
      evt.target.setCustomValidity('Количество символов поля должно быть не больше ' + MAX_LENGTH);
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
      evt.target.value = targetValueTrim;
    }
  };

  // функция валидации поля price
  var noticePriceEventHandler = function (evt) {
    setBorderColor(evt.target, 'red');
    if (!window.util.isNumeric(evt.target.value)) {
      evt.target.setCustomValidity('Значение поля должно быть числом');
    } else if (evt.target.value < minValue) {
      evt.target.setCustomValidity('Значение поля должно быть не меньше ' + minValue);
    } else if (evt.target.value > window.vars.maxPrice) {
      evt.target.setCustomValidity('Значение поля должно быть не больше ' + window.vars.maxPrice);
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
    }
  };

  // функция валидации поля address
  var noticeAddressEventHandler = function (evt) {
    var targetValue = String(evt.target.value);
    var targetValueTrim = targetValue.trim();
    setBorderColor(evt.target, 'red');
    if (targetValueTrim.length === 0) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      setBorderColor(evt.target, '');
      evt.target.value = targetValueTrim;
    }
  };

  // валидация Заголовка объявления внутри скрипта
  noticeTitle.addEventListener('blur', noticeTitleEventHandler);

  // валидация  Цены за ночь внутри скрипта
  noticePrice.addEventListener('blur', noticePriceEventHandler);

  // валидация Адреса внутри скрипта
  window.vars.noticeAddress.addEventListener('blur', noticeAddressEventHandler);

  // колл-бэк функция синхронизации значений 2-х элементов
  var syncValues = function(element, value) {
    element.value = value;
  };
  // вызов функции синхронизации времени заезда-выезда
  window.synchronizeFields(noticeTimein, noticeTimeout, window.vars.offerCheckins, window.vars.offerCheckouts, syncValues);
  window.synchronizeFields(noticeTimeout, noticeTimein, window.vars.offerCheckouts, window.vars.offerCheckins, syncValues);

  // колл-бэк функция синхронизации значения с min значением элемента
  var syncValueWithMin = function(element, value) {
    element.min = value;
    element.value = value;
    minValue = value;
    window.util.callEvent(element, 'blur');
  };

  // синхронизация типа жилья и минимальной цены
  window.synchronizeFields(noticeType, noticePrice, OFFER_TYPES, OFFER_PRICES, syncValueWithMin);

  // колл-бэк функция синхронизации массива со значением
  var syncArrayWithValue = function(element, value) {
    for (var i = 0; i < element.options.length; i++) {
      element.options[i].setAttribute('hidden', 'true');
      for (var j = 0; j <= value.length; j++) {
        if (element.options[i].value === value[j]) {
          element.options[i].removeAttribute('hidden');
        }
      }
    }
    element.value = value[0];
  };
  // синхронизация количества гостей и комнат
  window.synchronizeFields(noticeRoomNumber, noticeCapacity, ROOM_NUMBER, CAPACITY, syncArrayWithValue);

  // инициализируем событие синхронизации гостей и комнат изначально
  window.util.callEvent(noticeRoomNumber, 'change');
  // инициализируем событие синхронизации типа жилья и цены
  window.util.callEvent(noticeType, 'change');

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
