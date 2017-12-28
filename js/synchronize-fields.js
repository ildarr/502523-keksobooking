'use strict';

(function () {
  window.synchronizeFields = function (primaryElement, dependentElement, primaryElementValues, dependentElementValues, synchronizeElementValues) {
    primaryElement.addEventListener('change', function (evt) {
      for (var i = 0; i < primaryElementValues.length; i++) {
        if (evt.target.value === primaryElementValues[i]) {
          // запуск на исполнение callback функции
          synchronizeElementValues(dependentElement, dependentElementValues[i]);
        }
      }
    });
  };
})();
