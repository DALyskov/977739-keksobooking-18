'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var PIN_ELM_WIDTH = 50;
  var PIN_ELM_HEIGHT = 70;

  var mapSection = document.querySelector('.map');
  var pinsSection = mapSection.querySelector('.map__pins');
  var pinMain = pinsSection.querySelector('.map__pin--main');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');

  function addPin(pinAmount, pins) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < pinAmount; i++) {
      var pinElm = template.cloneNode(true);
      pinElm.classList.add('map__pin--new');
      pinElm.style.left = pins[i].location.x - (PIN_ELM_WIDTH / 2) + 'px';
      pinElm.style.top = (pins[i].location.y - PIN_ELM_HEIGHT) + 'px';
      pinElm.querySelector('img').src = pins[i].author.avatar;
      pinElm.querySelector('img').alt = pins[i].offer.title;

      pinFragment.append(pinElm);
    }
    pinsSection.append(pinFragment);
  }

  function disableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, true);
  }
  disableMapFilter();

  function enableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, false);
  }

  function onLoadXhr(dataXhr) {
    window.map.dataPins = dataXhr;
    var filteredData = window.pinsFilter.filterPin();

    window.util.checkAndRemoveElm('.map__pin--new');
    addPin(filteredData.length, filteredData);

    var pins = pinsSection.querySelectorAll('.map__pin--new');
    function onPinClick(advertisement) {
      pins[i].addEventListener('click', function () {
        window.util.checkAndRemoveElm('.map__card');
        window.card.addСard(advertisement);
        var card = document.querySelector('.map__card');
        var cardEscButton = card.querySelector('.popup__close');
        function onMapKeydown(evt) {
          window.util.onPopupEscPress(evt, card);
          document.removeEventListener('keydown', onMapKeydown);
        }
        document.addEventListener('keydown', onMapKeydown);
        cardEscButton.addEventListener('click', function () {
          window.util.closePopup(card);
          document.removeEventListener('keydown', onMapKeydown);
        });
      });
    }

    for (var i = 0; i < pins.length; i++) {
      onPinClick(filteredData[i]);
    }

    window.util.checkAndRemoveElm('.error');
  }

  function onErrorXhr(errorMessage) {
    var errorElm = document.querySelector('.error');
    if (errorElm) {
      errorElm.remove();
    }
    var template = document.querySelector('#error').content.querySelector('.error');
    errorElm = template.cloneNode(true);
    errorElm.querySelector('.error__message').textContent = errorMessage;
    document.body.prepend(errorElm);

    var buttonRepeat = document.querySelector('.error__button');
    buttonRepeat.addEventListener('click', function () {
      window.backend.load(onLoadXhr, onErrorXhr);
    });
  }

  function enablePage() {
    mapSection.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    enableMapFilter();
    window.form.enableAdForm();

    window.backend.load(onLoadXhr, onErrorXhr);

    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  function checkKeyCode(cb, evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      cb();
    }
  }
  var onPinMainKeydown = checkKeyCode.bind(null, enablePage);

  function onPinMainMousedown() {
    enablePage();
  }

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);

  window.map = {
    mapSection: mapSection,
    pinMain: pinMain,
    mapFilterSelects: mapFilterSelects,
    mapFilter: mapFilter,
    onLoadXhr: onLoadXhr,
  };
})();
