'use strict';

(function () {
  var pinMainHeightCorretion = 12;
  var mapSection = document.querySelector('.map');
  var pinsSection = mapSection.querySelector('.map__pins');
  var pinMain = pinsSection.querySelector('.map__pin--main');
  var pinMainSourceY = pinMain.offsetTop;
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterFieldset = mapFilter.querySelectorAll('fieldset');
  var pinMainOffsetX = pinMain.offsetWidth / 2;
  var pinMainOffsetYMoution = pinMain.offsetHeight + pinMainHeightCorretion;
  var pinMainOffsetYStart = pinMain.offsetHeight / 2;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('#address');
  var adFormInputs = adForm.querySelectorAll('input');
  var adFormPreview = adForm.querySelector('.ad-form-header__preview img');
  var adFormFoto = adForm.querySelector('.ad-form__photo');
  var adFormPreviewSrc = adFormPreview.src;

  function renderPins(pinQuantity, pins) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < pinQuantity; i++) {
      var pinElm = template.cloneNode(true);
      pinElm.classList.add('map__pin--new');
      pinElm.style.left = pins[i].location.x - (pinElm.offsetWidth / 2) + 'px';
      pinElm.style.top = (pins[i].location.y - pinElm.offsetHeight) + 'px';
      pinElm.querySelector('img').src = pins[i].author.avatar;
      pinElm.querySelector('img').alt = pins[i].offer.title;

      pinFragment.append(pinElm);
    }
    pinsSection.append(pinFragment);
  }

  function addPins(data) {
    var filteredData = window.pinsFilter.checkData(data);

    window.util.checkAndRemoveElm(mapSection, '.map__pin--new');
    window.util.checkAndRemoveElm(mapSection, '.map__card');
    renderPins(filteredData.length, filteredData);
    enableMapFilter();

    var pins = pinsSection.querySelectorAll('.map__pin--new');
    function onPinClick(advertisement) {
      var pinActive = pins[i];
      pinActive.addEventListener('click', function () {
        window.util.checkAndRemoveElm(mapSection, '.map__card');
        window.card.add(advertisement);

        function removeClassActive() {
          pins.forEach(function (v) {
            v.classList.remove('map__pin--active');
          });
        }
        removeClassActive();

        pinActive.classList.add('map__pin--active');
        var card = document.querySelector('.map__card');
        var cardEscButton = card.querySelector('.popup__close');

        function onMapKeydown(evt) {
          if (evt.keyCode === window.util.ESC_KEYCODE) {
            removeClassActive();
            window.util.closePopup(card);
            document.removeEventListener('keydown', onMapKeydown);
          }
        }
        window.inquiries.onMapKeydown = onMapKeydown;

        document.addEventListener('keydown', onMapKeydown);
        cardEscButton.addEventListener('click', function () {
          window.util.closePopup(card);
          removeClassActive();
          document.removeEventListener('keydown', onMapKeydown);
        });
      });
    }

    for (var i = 0; i < pins.length; i++) {
      onPinClick(filteredData[i]);
    }

    window.util.checkAndRemoveElm(document, '.error');
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

  function onPinMainMousedown() {
    enablePage();
  }
  var onPinMainKeydown = window.util.checkKeyCode.bind(null, enablePage);

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

  function enablePage() {
    mapSection.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    enableAdForm();

    window.backend.load(window.inquiries.onLoadXhr, window.inquiries.onErrorXhr);

    pinMain.removeEventListener('mousedown', onPinMainMousedown);
    pinMain.removeEventListener('keydown', onPinMainKeydown);
  }

  window.page = {
    pinMainHeightCorretion: pinMainHeightCorretion,
    mapSection: mapSection,
    pinMain: pinMain,
    adForm: adForm,
    adFormAddress: adFormAddress,
    adFormFieldsets: adFormFieldsets,
    adFormInputs: adFormInputs,
    adFormPreview: adFormPreview,
    adFormFoto: adFormFoto,
    mapFilter: mapFilter,
    mapFilterSelects: mapFilterSelects,
    disablePage: disablePage,
    addPins: addPins,
    pinMainOffsetX: pinMainOffsetX,
    pinMainOffsetYMoution: pinMainOffsetYMoution,
    setAdFormAddress: setAdFormAddress,
  };
})();
