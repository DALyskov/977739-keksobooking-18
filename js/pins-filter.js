'use strict';

(function () {
  var QUANTITY_ADVERTISEMENT = 5;

  var mapFilterType = window.page.mapFilter.querySelector('#housing-type');
  var mapFilterRoomQuantity = window.page.mapFilter.querySelector('#housing-rooms');

  var onChangeFilterPin = window.debounce(function () {
    window.inquiries.onLoadXhr(window.inquiries.dataPins);
  });


  var getRank = function (dataPin) {
    var rank = 0;
    if (window.page.mapFilterSelects[0].value === 'any' ||
      window.page.mapFilterSelects[0].value === dataPin.offer.type) {
      rank += 1;
    }
    if (window.page.mapFilterSelects[2].value === 'any' ||
      window.page.mapFilterSelects[2].value === String(dataPin.offer.rooms)) {
      rank += 1;
    }
    return rank;
  };

  function filterPin() {
    var newData = window.inquiries.dataPins.filter(function (v) {
      return getRank(v) === 2;
    }).slice(0, QUANTITY_ADVERTISEMENT);
    return newData;
  }


  mapFilterType.addEventListener('change', onChangeFilterPin);
  mapFilterRoomQuantity.addEventListener('change', onChangeFilterPin);

  window.pinsFilter = {
    filterPin: filterPin,
  };
})();
