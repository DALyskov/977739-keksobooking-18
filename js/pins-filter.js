'use strict';

(function () {
  var QUANTITY_ADVERTISEMENT = 5;

  var mapFilterType = window.map.mapFilter.querySelector('#housing-type');
  var mapFilterRoomQuantity = window.map.mapFilter.querySelector('#housing-rooms');

  var changeFilterPin = window.debounce(function () {
    window.map.onLoadXhr(window.map.dataPins);
  });


  var getRank = function (dataPin) {
    var rank = 0;
    if (window.map.mapFilterSelects[0].value === 'any' ||
      window.map.mapFilterSelects[0].value === dataPin.offer.type) {
      rank += 1;
    }
    if (window.map.mapFilterSelects[2].value === 'any' ||
      window.map.mapFilterSelects[2].value === String(dataPin.offer.rooms)) {
      rank += 1;
    }
    return rank;
  };

  function filterPin() {
    var newData = window.map.dataPins.filter(function (v) {
      return getRank(v) === 2;
    }).slice(0, QUANTITY_ADVERTISEMENT);
    return newData;
  }


  mapFilterType.addEventListener('change', changeFilterPin);
  mapFilterRoomQuantity.addEventListener('change', changeFilterPin);

  window.pinsFilter = {
    filterPin: filterPin,
  };
})();
