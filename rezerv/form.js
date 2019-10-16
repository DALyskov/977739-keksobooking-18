'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormGuestsQuantity = adForm.querySelector('#capacity');
  var adFormSelects = adForm.querySelectorAll('select');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormAddress = adForm.querySelector('#address');

  window.form = {
    adForm: adForm,
    adFormAddress: adFormAddress,
    enableAdForm: enableAdForm,
  };

  function disableAdForm() {
    window.util.toggleEnableBlock(adFormSelects, adFormInputs, true);
  }
  disableAdForm();

  function enableAdForm() {
    window.util.toggleEnableBlock(adFormSelects, adFormInputs, false);
  }

  /*
  как вариант для размышления, здесь предусматривается что пользовательне может выбирать
  количество гостей из полного списка. т.е. главный выбор количество комнат.


  var rooms = {
  1: [2, 3, 0],
  2: [3, 0],
  3: [0],
  100: [1, 2, 3],
};

function setDefaultOptions() {
  for (var i = 0; i < capacityInput.options.length; i++) {
    capacityInput.options[i].disabled = false;
    capacityInput.options[i].selected = false;
  }
}

function onRoomNumberInput(evt) {
  var disabled = rooms[evt.target.value];

  // обнуляем все disabled и selected
  setDefaultOptions();

  for (var i = 0; i < capacityInput.options.length; i++) {
    var option = capacityInput.options[i];
    if (disabled.includes(parseInt(option.value, 10))) { *************** parseInt vs Number
      option.disabled = true;
    } else {
      option.selected = true;
    }
  }
}
  */

  function checkGuestsOrRoomValue(changeElm) {
    switch (changeElm) {
      case adFormGuestsQuantity:
        for (var i = 0; i < changeElm.options.length; i++) {
          changeElm.options[i].disabled = true;
        }
        var optionNum = Number(adFormRoomNumber.value);
        if (optionNum !== 100) {
          for (i = 1; i <= optionNum; i++) {
            changeElm.querySelector(
                'option[value=\'' + i + '\']'
            ).disabled = false;
          }
        } else {
          changeElm.querySelector('option[value=\'' + 0 + '\']').disabled = false;
        }
        break;
      case adFormRoomNumber:
        for (i = 0; i < changeElm.options.length; i++) {
          changeElm.options[i].disabled = true;
        }
        changeElm.querySelector('option[value=\'' + 100 + '\']').disabled = false;
        optionNum = Number(adFormGuestsQuantity.value);
        if (optionNum !== 0) {
          for (i = optionNum; i <= 3; i++) {
            changeElm.querySelector(
                'option[value=\'' + i + '\']'
            ).disabled = false;
          }
        } else {
          for (i = 0; i < changeElm.options.length; i++) {
            changeElm.options[i].disabled = false;
          }
        }
        break;
    }
  }

  adFormAddress.value =
    Math.round(
        window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2
    ) +
    ', ' +
    Math.round(
        window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight / 2
    );

  checkGuestsOrRoomValue(adFormGuestsQuantity);

  adFormRoomNumber.addEventListener('change', function () {
    checkGuestsOrRoomValue(adFormGuestsQuantity);
  });

  adFormGuestsQuantity.addEventListener('change', function () {
    checkGuestsOrRoomValue(adFormRoomNumber);
  });
})();
