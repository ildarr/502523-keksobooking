'use strict';

(function () {
  var noticeTitle = window.vars.noticeForm.querySelector('[id = "title"]');
  var noticeAddress = window.vars.noticeForm.querySelector('[id = "address"]');
  var noticeTimein = window.vars.noticeForm.querySelector('[id = "timein"]');
  var noticeTimeout = window.vars.noticeForm.querySelector('[id = "timeout"]');
  var noticeType = window.vars.noticeForm.querySelector('[id = "type"]');
  var noticePrice = window.vars.noticeForm.querySelector('[id = "price"]');
  var noticeRoomNumber = window.vars.noticeForm.querySelector('[id = "room_number"]');
  var noticeCapacity = window.vars.noticeForm.querySelector('[id = "capacity"]');
  var checkInput = window.vars.noticeForm.querySelectorAll('input');
  var formSubmit = window.vars.noticeForm.querySelector('.form__submit');
  var formReset = window.vars.noticeForm.querySelector('.form__reset');
  var ADDRESS = '620, 450';
  var OFFER_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var CHECK_FIELDS = ['title', 'address', 'price'];
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;

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
    } else if (evt.target.value < OFFER_PRICE[noticeType.value]) {
      evt.target.setCustomValidity('Значение поля должно быть не меньше ' + OFFER_PRICE[noticeType.value]);
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
  noticeAddress.value = ADDRESS;
  noticeAddress.addEventListener('blur', noticeAddressEventHandler);

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
    // инициализируем проверку input для Прайса
    window.util.callEvent(noticePrice, 'blur');
  });

  // синхронизация количества гостей и комнат
  noticeRoomNumber.addEventListener('change', function (evt) {
    var targetElement = evt.target;
    // активируем опцию числа гостей при количестве комнат =100
    if (targetElement.value === '100') {
      for (var i = 0; i < noticeCapacity.options.length; i++) {
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
