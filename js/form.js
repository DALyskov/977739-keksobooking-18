'use strict';

(function () {
  var adFormGuestsQuantity = window.page.adForm.querySelector('#capacity');
  var adFormPrice = window.page.adForm.querySelector('#price');
  var timein = window.page.adForm.querySelector('#timein');
  var timeout = window.page.adForm.querySelector('#timeout');
  var adFormButtonReset = window.page.adForm.querySelector('.ad-form__reset');
  var adFormButtonSubmit = window.page.adForm.querySelector('.ad-form__submit');
  var adFormRoom = window.page.adForm.querySelector('#room_number');

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

  function setDefaultOptions() {
    for (var i = 0; i < adFormGuestsQuantity.options.length; i++) {
      adFormGuestsQuantity.options[i].disabled = false;
      adFormGuestsQuantity.options[i].selected = false;
    }
  }

  function validationRoomCapacity() {
    var disabled = rooms[adFormRoom.options[adFormRoom.selectedIndex].value];
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
  validationRoomCapacity();

  window.page.adFormAddress.readOnly = true;

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
          target.style.boxShadow = '';
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
          target.style.boxShadow = '';
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
    }

    function validationTimeInout(elm) {
      elm.value = target.value;
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

  window.page.adForm.addEventListener('input', function (evt) {
    onAdFormInput(evt);
  });
  window.page.adForm.addEventListener('change', function (evt) {
    onAdFormChange(evt);
  });
  window.page.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.page.adForm), window.inquiries.onSaveXhr, window.inquiries.onErrorXhr);
  });

  function onAdFormButtonSubmitClick() {
    for (var i = 0; i < window.page.adFormInputs.length; i++) {
      var input = window.page.adFormInputs[i];
      if (input.checkValidity() === false) {
        input.style.boxShadow = '0 0 2px 2px red';
        input.checkValidity();
      }
    }
  }
  var onAdFormButtonSubmitKeydown = window.util.checkKeyCode.bind(null, onAdFormButtonSubmitClick);
  adFormButtonSubmit.addEventListener('click', onAdFormButtonSubmitClick);
  adFormButtonSubmit.addEventListener('keydown', onAdFormButtonSubmitKeydown);

  function onAdFormButtonResetClick(evt) {
    evt.preventDefault();
    window.page.disablePage();
  }
  var onPinMainKeydown = window.util.checkKeyCode.bind(null, onAdFormButtonResetClick);
  adFormButtonReset.addEventListener('click', onAdFormButtonResetClick);
  adFormButtonReset.addEventListener('keydown', onPinMainKeydown);
})();
