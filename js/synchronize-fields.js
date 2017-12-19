'use strict';

(function () {
  window.synchronizeFields = function (primaryElement, dependentElement, primaryElementValues, dependentElementValues, syncElementValues) {
    primaryElement.addEventListener('change', function (evt) {
      for (var i = 0; i < primaryElementValues.length; i++) {
        if (evt.target.value === primaryElementValues[i]) {
          // запуск на исполнение callback функции
          syncElementValues(dependentElement, dependentElementValues[i]);
        }
      }
    });
  };
})();
