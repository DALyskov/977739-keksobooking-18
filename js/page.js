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

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  function disableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, true);
  }

  function disableAdForm() {
    window.util.toggleEnableBlock([], adFormFieldset, true);
  }

  function disablePage() {
    mapSection.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    disableMapFilter();
    disableAdForm();
  }

  disablePage();

  function enableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, false);
  }

  function enableAdForm() { /* возможно стоит перенести*/
    window.util.toggleEnableBlock([], adFormFieldset, false);
  }

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

  function checkKeyCode(cb, evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      cb();
    }
  }
  var onPinMainKeydown = checkKeyCode.bind(null, enablePage);

  function onPinMainMousedown() {
    enablePage();
  }

  function enablePage() {
    mapSection.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableMapFilter();
    enableAdForm();

    window.backend.load(window.inquiries.onLoadXhr, window.inquiries.onErrorXhr);

    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);

  window.page = {
    mapSection: mapSection,
    pinsSection: pinsSection,
    pinMain: pinMain,
    mapFilter: mapFilter,
    mapFilterSelects: mapFilterSelects,
    disablePage: disablePage,
    addPin: addPin,
    onPinMainMousedown: onPinMainMousedown,
    onPinMainKeydown: onPinMainKeydown,
  };

})();
