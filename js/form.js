'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormGuestsQuantity = adForm.querySelector('#capacity');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormAddress = adForm.querySelector('#address');

  var rooms = {
    1: [2, 3, 0],
    2: [3, 0],
    3: [0],
    100: [1, 2, 3]
  };

  function disableAdForm() {
    window.util.toggleEnableBlock(adFormSelects, adFormInputs, true);
  }
  disableAdForm();

  function enableAdForm() {
    window.util.toggleEnableBlock(adFormSelects, adFormInputs, false);
  }

  function setDefaultOptions() {
    for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
      adFormGuestsQuantity.options[i].disabled = false;
      adFormGuestsQuantity.options[i].selected = false;
    }
  }

  function onRoomNumberInput(evt) {
    var disabled = rooms[evt.target.value];
    setDefaultOptions();
    for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
      var option = adFormGuestsQuantity.options[i];
      if (disabled.includes(parseInt(option.value, 10))) {
        option.disabled = true;
      } else {
        option.selected = true;
      }
    }
  }

  adFormAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight / 2);

  adFormRoomNumber.addEventListener('change', function (evt) {
    onRoomNumberInput(evt);
  });

  window.form = {
    adForm: adForm,
    adFormAddress: adFormAddress,
    enableAdForm: enableAdForm
  };
})();
