'use strict';

(function () {
  var PIN_ELM_WIDTH = 50;
  var PIN_ELM_HEIGHT = 70;

  var mapSection = document.querySelector('.map');
  var pinsSection = mapSection.querySelector('.map__pins');
  var pinMain = pinsSection.querySelector('.map__pin--main');
  var pinMainSourceY = pinMain.offsetTop;
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');
  var pinMainOffsetX = pinMain.offsetWidth / 2;
  var pinMainOffsetYMoution = pinMain.offsetHeight + 12;
  var pinMainOffsetYStart = pinMain.offsetHeight / 2;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormFoto = adForm.querySelector('.ad-form__photo');
  var adFormPreviewSrc = adFormPreview.src;

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

  function removePins() {
    window.util.checkAndRemoveElm(mapSection, '.map__pin--new');
    window.util.checkAndRemoveElm(mapSection, '.map__card');
  }

  function disableMapFilter() {
    mapFilter.reset();
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, true);
  }

  function setAdFormAddress(pinMainOffsetY) {
    adFormAddress.value = Math.round(pinMain.offsetLeft + pinMainOffsetX) + ', ' + Math.round(pinMain.offsetTop + pinMainOffsetY);
  }

  function disableAdForm() {
    adForm.reset();
    window.util.toggleEnableBlock([], adFormFieldsets, true);

    adFormInputs.forEach(function (v) {
      v.style.boxShadow = '';
    });
    adFormPreview.src = adFormPreviewSrc;
    adFormFoto.innerHTML = '';

    setAdFormAddress(pinMainOffsetYStart);
  }

  function disablePage() {
    mapSection.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pinMain.style.left = (50 - pinMainOffsetX / pinsSection.offsetWidth * 100) + '%';
    pinMain.style.top = pinMainSourceY + 'px';
    removePins();
    disableMapFilter();
    disableAdForm();
    pinMain.addEventListener('mousedown', onPinMainMousedown);
    pinMain.addEventListener('keydown', onPinMainKeydown);
  }
  disablePage();

  function enableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterFieldset, false);
  }

  function enableAdForm() {
    window.util.toggleEnableBlock([], adFormFieldsets, false);
  }

  function onPinMainMousedown() {
    enablePage();
  }
  var onPinMainKeydown = window.util.checkKeyCode.bind(null, enablePage);

  function enablePage() {
    mapSection.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableMapFilter();
    enableAdForm();

    window.backend.load(window.inquiries.onLoadXhr, window.inquiries.onErrorXhr);

    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  window.page = {
    mapSection: mapSection,
    pinsSection: pinsSection,
    pinMain: pinMain,
    adForm: adForm,
    adFormAddress: adFormAddress,
    adFormFieldsets: adFormFieldsets,
    adFormInputs: adFormInputs,
    adFormPreview: adFormPreview,
    adFormFoto: adFormFoto,
    adFormPreviewSrc: adFormPreviewSrc,
    mapFilter: mapFilter,
    mapFilterSelects: mapFilterSelects,
    disablePage: disablePage,
    addPin: addPin,
    // onPinMainMousedown: onPinMainMousedown, /* check and delete */
    // onPinMainKeydown: onPinMainKeydown, /* check and delete */
    pinMainOffsetX: pinMainOffsetX,
    pinMainOffsetYMoution: pinMainOffsetYMoution,
    setAdFormAddress: setAdFormAddress,
  };
})();
