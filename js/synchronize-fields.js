'use strict';

(function () {
  window.synchronizeFields = function (primaryElement, dependentElement, primaryElementValues, dependentElementValues, synchronizeElementValues) {
    primaryElement.addEventListener('change', function (evt) {
      primaryElementValues.forEach(function (primaryElementValue, i) {
        if (evt.target.value === primaryElementValue) {
          // запуск на исполнение callback функции
          synchronizeElementValues(dependentElement, dependentElementValues[i]);
        }
      });
    });
  };
})();
