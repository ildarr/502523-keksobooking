'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var XHR_TIMEOUT = 10000;
  var XHR_STATUS = 200;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status + ': ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    return xhr;
  };

  var errorPopup = document.createElement('div');
  errorPopup.className = 'error-popup';

  var setErrorHandler = function () {
    errorPopup.style.position = 'fixed';
    errorPopup.style.zIndex = 10;
    errorPopup.style.top = '50px';
    errorPopup.style.left = '25%';
    errorPopup.style.width = '50%';
    errorPopup.style.height = '80px';
    errorPopup.style.paddingTop = '18px';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.fontSize = '18px';
    errorPopup.style.backgroundColor = 'white';
    errorPopup.style.border = '3px solid red';
    errorPopup.style.visibility = 'hidden';
    errorPopup.textContent = '';
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  var openErrorHandler = function (errorMessage) {
    errorPopup.style.visibility = 'visible';
    errorPopup.textContent = errorMessage;
    window.vars.closeErrorIndicator = true;
    document.addEventListener('keydown', buttonEscPressHandler);
  };

  var buttonEscPressHandler = function (evt) {
    if (evt.keyCode === window.vars.ESC_KEYCODE) {
      document.removeEventListener('keydown', buttonEscPressHandler);
      window.backend.closeErrorHandler();
    }
  };

  var closeErrorHandler = function () {
    errorPopup.style.visibility = 'hidden';
    errorPopup.textContent = '';
    window.vars.closeErrorIndicator = false;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    setErrorHandler: setErrorHandler,
    openErrorHandler: openErrorHandler,
    closeErrorHandler: closeErrorHandler,
    errorPopup: errorPopup
  };
})();
