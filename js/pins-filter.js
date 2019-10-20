'use strict';

(function () {
  var QUANTITY_ADVERTISEMENT = 4;
  var mapFilterType = window.map.mapFilter.querySelector('#housing-type');
  var mapFilterRoomQuantity = window.map.mapFilter.querySelector('#housing-rooms');

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
    // window.map.addPin(QUANTITY_ADVERTISEMENT, window.map.dataPins);

    // window.map.addPin(QUANTITY_ADVERTISEMENT, window.map.dataPins.filter(function (v) {
    //   return getRank(v) === 1;
    // }));

    var newData = window.map.dataPins.filter(function (v) {
      return getRank(v) === 2;
    }).slice(0, 5);
    console.log(window.map.dataPins);
    console.log(newData);

    return newData;
  }

  // function onRoomNumberInput(evt) {
  //   var disabled = rooms[evt.target.value];
  //   setDefaultOptions();
  //   for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
  //     var option = adFormGuestsQuantity.options[i];
  //     if (disabled.includes(parseInt(option.value, 10))) {
  //       option.disabled = true;
  //     } else {
  //       option.selected = true;
  //     }
  //   }
  // }

  // adFormAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight / 2);

  mapFilterType.addEventListener('change', function () {
    // console.log(window.map.mapFilterSelects[0].value);
    window.map.onLoadXhr(window.map.dataPins);
  });
  mapFilterRoomQuantity.addEventListener('change', function () {
    // console.log(window.map.mapFilterSelects[0].value);
    window.map.onLoadXhr(window.map.dataPins);
  });

  window.pinsFilter = {
    filterPin: filterPin,
  };
})();
