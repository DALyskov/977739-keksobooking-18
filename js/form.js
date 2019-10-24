'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormGuestsQuantity = adForm.querySelector('#capacity');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormPrice = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var type = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
  var rooms = {
    1: [2, 3, 0],
    2: [3, 0],
    3: [0],
    100: [1, 2, 3]
  };

  // function disableAdForm() {
  //   window.util.toggleEnableBlock([], adFormFieldset, true);
  // }
  // disableAdForm();

  // function enableAdForm() { /* возможно стоит перенести*/
  //   window.util.toggleEnableBlock([], adFormFieldset, false);
  // }

  function setDefaultOptions() {
    for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
      adFormGuestsQuantity.options[i].disabled = false;
      adFormGuestsQuantity.options[i].selected = false;
    }
  }

  adFormAddress.readOnly = true;
  adFormAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight / 2);

  function onAdFormInput(evt) {
    var target = evt.target;

    function validationTitle() {
      switch (true) {
        case target.validity.valueMissing:
          target.setCustomValidity('Добавьте заголовок объявления');
          break;
        case target.validity.tooShort:
          target.setCustomValidity('Заголовок объявления не должен быть меньше 30 символов');
          break;
        case target.validity.tooLong:
          target.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
          break;
        case target.validity.typeMismatch:
          target.setCustomValidity('Введено неверное значение');
          break;
        default:
          target.setCustomValidity('');
      }
    }

    function validationPrice() {
      switch (true) {
        case target.validity.valueMissing:
          target.setCustomValidity('Укажите цену за ночь');
          break;
        case target.validity.rangeUnderflow:
          target.setCustomValidity('Цена за ночь не должна быть меньше ' + adFormPrice.min + ' руб.');
          break;
        case target.validity.rangeOverflow:
          target.setCustomValidity('Цена за ночь не должна быть больше 1 000 000 руб.');
          break;
        case target.validity.typeMismatch:
          target.setCustomValidity('Введено неверное значение');
          break;
        default:
          target.setCustomValidity('');
      }
    }

    switch (target.name) {
      case 'title':
        validationTitle();
        break;
      case 'price':
        validationPrice();
        break;
    }
  }

  function onAdFormChange(evt) {
    var target = evt.target;

    function validationTypePrice() {
      adFormPrice.placeholder = type[target.value];
      adFormPrice.min = type[target.value];
      adFormPrice.value = '';
    }

    function validationTimeInout(elm) {
      elm.value = target.value;
    }

    function validationRoomCapacity() {
      var disabled = rooms[target.value];
      setDefaultOptions();
      for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
        var quantityOption = adFormGuestsQuantity.options[i];
        if (disabled.includes(parseInt(quantityOption.value, 10))) {
          quantityOption.disabled = true;
        } else {
          quantityOption.selected = true;
        }
      }
    }

    switch (target.name) {
      case 'type':
        validationTypePrice();
        break;
      case 'timein':
        validationTimeInout(timeout);
        break;
      case 'timeout':
        validationTimeInout(timein);
        break;
      case 'rooms':
        validationRoomCapacity();
        break;
    }
  }

  adForm.addEventListener('input', function (evt) {
    onAdFormInput(evt);
  });
  adForm.addEventListener('change', function (evt) {
    onAdFormChange(evt);
  });

  function onSaveXhr() {
    console.log('run');
    window.disablePage.disablePage();
    window.map.pinMain.addEventListener('mousedown', window.disablePage.onPinMainMousedown);
    window.map.pinMain.addEventListener('keydown', window.disablePage.onPinMainKeydown);
  }

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onSaveXhr, window.map.onErrorXhr);
    evt.preventDefault();
  });

  window.form = {
    adForm: adForm,
    adFormAddress: adFormAddress,
    // disableAdForm: disableAdForm,
    // enableAdForm: enableAdForm,
  };
})();
