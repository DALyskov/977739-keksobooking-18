'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var PIN_ELM_WIDTH = 50;
  var PIN_ELM_HEIGHT = 70;
  var QUANTITY_ADVERTISEMENT = 8;

  var mapSection = document.querySelector('.map');
  var pinsSection = mapSection.querySelector('.map__pins');
  var pinMain = pinsSection.querySelector('.map__pin--main');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilter.querySelectorAll('select');
  var mapFilterInputs = mapFilter.querySelectorAll('input');

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
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterInputs, true);
  }
  disableMapFilter();

  function enableMapFilter() {
    window.util.toggleEnableBlock(mapFilterSelects, mapFilterInputs, false);
  }

  function onLoadXhr(dataXhr) {
    addPin(QUANTITY_ADVERTISEMENT, dataXhr);
    var pins = pinsSection.querySelectorAll('.map__pin--new');

    function onPinClick(advertisement) {
      pins[i].addEventListener('click', function () {
        window.util.checkAndRemoveElm('.map__card');
        window.card.addСard(advertisement);
        var card = document.querySelector('.map__card');
        document.addEventListener('keydown', function close(evt) {
          window.util.onPopupEscPress(evt, card);
          document.removeEventListener('keydown', close);
        });
      });
    }

    for (var i = 0; i < pins.length; i++) {
      onPinClick(dataXhr[i]);
    }

    window.util.checkAndRemoveElm('.error');
    pinMain.removeEventListener('mousedown', enablePage);
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

    window.form.adFormAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight + 12);
  }

  pinMain.addEventListener('mousedown', enablePage);
  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      enablePage();
    }
  });

  window.map = {
    mapSection: mapSection,
    pinMain: pinMain,
  };
})();
