'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');
  var pinsSection = mapSection.querySelector('.map__pins');
  var pinMain = pinsSection.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  function disableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, true);
  }
  // disableMapFilter();

  function disableAdForm() {
    window.util.toggleEnableBlock([], adFormFieldset, true);
  }
  // disableAdForm();

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

    window.backend.load(window.map.onLoadXhr, window.map.onErrorXhr);

    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  pinMain.addEventListener('mousedown', onPinMainMousedown);
  pinMain.addEventListener('keydown', onPinMainKeydown);

  window.disablePage = {
    disablePage: disablePage,
    onPinMainMousedown: onPinMainMousedown,
    onPinMainKeydown: onPinMainKeydown,
  };

})();
