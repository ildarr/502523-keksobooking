'use strict';

(function () {
  var housingType = window.vars.mapFilters.querySelector('[id = "housing-type"]');
  var housingPrice = window.vars.mapFilters.querySelector('[id = "housing-price"]');
  var housingRooms = window.vars.mapFilters.querySelector('[id = "housing-rooms"]');
  var housingGuests = window.vars.mapFilters.querySelector('[id = "housing-guests"]');
  var housingFeatures = window.vars.mapFilters.querySelector('[id = "housing-features"]');

  var priceCondition = function (element) {
    switch (housingPrice.value) {
      case 'low':
        return element.offer.price < 10000;
      case 'middle':
        return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'high':
        return element.offer.price > 50000;
    }
    return false;
  };

  // условие фильтра для features
  var featuresFilter = function (element) {
    var housingFeaturesCollection = housingFeatures.querySelectorAll('input[type="checkbox"]:checked');
    // преобразуем коллекцию в массив
    var features = [].map.call(housingFeaturesCollection, function (element) {
      return element.value;
    });
    return (features.every(function (currentElement) {
      return element.includes(currentElement);
    }));
  };

  var filterCondition = function (element) {
    return ((housingType.value === 'any') ? true : (element.offer.type === housingType.value))
    && ((housingPrice.value === 'any') ? true : priceCondition(element))
    && ((housingRooms.value === 'any') ? true : (element.offer.rooms === parseInt(housingRooms.value, 10)))
    && ((housingGuests.value === 'any') ? true : (element.offer.guests === parseInt(housingGuests.value, 10)))
    && featuresFilter(element.offer.features);
  };

  window.filters = {
    filterCondition: filterCondition
  }

})();
