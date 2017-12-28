'use strict';

(function () {
  var mapFilters = window.vars.map.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('[id = "housing-type"]');
  var housingPrice = mapFilters.querySelector('[id = "housing-price"]');
  var housingRooms = mapFilters.querySelector('[id = "housing-rooms"]');
  var housingGuests = mapFilters.querySelector('[id = "housing-guests"]');
  var housingFeatures = mapFilters.querySelector('[id = "housing-features"]');

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
    var sumIncludedValues = 0;
    // преобразуем коллекцию в массив и подсчитываем количество включений отмеченных features
    var features = [].map.call(housingFeaturesCollection, function (elem) {
      if (element.includes(elem.value)) {
        sumIncludedValues += 1;
      }
    });
    return (sumIncludedValues === features.length) ? true : false;
  };

  var filterConditions = function (element) {
    return ((housingType.value === 'any') ? true : (element.offer.type === housingType.value))
    && ((housingPrice.value === 'any') ? true : priceCondition(element))
    && ((housingRooms.value === 'any') ? true : (element.offer.rooms === parseInt(housingRooms.value, 10)))
    && ((housingGuests.value === 'any') ? true : (element.offer.guests === parseInt(housingGuests.value, 10)))
    && featuresFilter(element.offer.features);
  };

  mapFilters.addEventListener('change', function () {
    var filteredAds = window.vars.ads.filter(filterConditions);
    window.pin.updateMapPins(filteredAds);
  });

  window.filters = {
    filterConditions: filterConditions
  };

})();
