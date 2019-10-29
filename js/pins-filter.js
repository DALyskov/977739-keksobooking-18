'use strict';

(function () {
  var QUANTITY_ADVERTISEMENT = 5;

  var mapFilterType = window.page.mapFilter.querySelector('#housing-type');
  var mapFilterPrice = window.page.mapFilter.querySelector('#housing-price');
  var mapFilterRoomQuantity = window.page.mapFilter.querySelector('#housing-rooms');
  var mapFilterGuestsQuantity = window.page.mapFilter.querySelector('#housing-guests');
  var mapFilterInputs = window.page.mapFilter.querySelectorAll('input');

  var onChangeFilterPin = window.debounce(function () {
    window.page.addPins(window.inquiries.dataPins);
  });

  var priceListDict = {
    low: [0, 10000],
    middle: [10001, 50000],
    high: [50001, Infinity],
  };

  function checkCheckbox() {
    var arrChecked = [];
    mapFilterInputs.forEach(function (v) {
      if (v.checked) {
        arrChecked.push(v);
      }
    });
    return arrChecked;
  }

  function getRank(dataPin, arrChecked) {
    var rank = 0;

    function checkFilter(filterName, dataPinProperty) {
      if (filterName.value === 'any' ||
      filterName.value === String(dataPinProperty)) {
        rank += 1;
      }
    }

    checkFilter(mapFilterType, dataPin.offer.type);
    if (mapFilterPrice.value === 'any' ||
    (priceListDict[mapFilterPrice.value][0] <= dataPin.offer.price &&
      priceListDict[mapFilterPrice.value][1] >= dataPin.offer.price)) {
      rank += 1;
    }
    checkFilter(mapFilterRoomQuantity, dataPin.offer.rooms);
    checkFilter(mapFilterGuestsQuantity, dataPin.offer.guests);

    arrChecked.forEach(function (v) {
      if (dataPin.offer.features.indexOf(v.value) !== -1) {
        rank += 1;
      }
    });

    return rank;
  }

  function checkData(data) {
    var arrChecked = checkCheckbox();
    var newData = data.filter(function (v) {
      return (v.offer) && getRank(v, arrChecked) === (4 + arrChecked.length);
    }).slice(0, QUANTITY_ADVERTISEMENT);
    return newData;
  }

  window.page.mapFilterSelects.forEach(function (v) {
    v.addEventListener('change', onChangeFilterPin);
  });
  mapFilterInputs.forEach(function (v) {
    v.addEventListener('change', onChangeFilterPin);
  });

  window.pinsFilter = {
    checkData: checkData,
  };
})();
