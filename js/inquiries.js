'use strict';

(function () {
  function onLoadXhr(dataXhr) {
    window.inquiries.dataPins = dataXhr;
    var filteredData = window.pinsFilter.filterPin();

    window.util.checkAndRemoveElm(window.page.mapSection, '.map__pin--new');
    window.util.checkAndRemoveElm(window.page.mapSection, '.map__card');
    window.page.addPin(filteredData.length, filteredData);

    var pins = window.page.pinsSection.querySelectorAll('.map__pin--new');
    function onPinClick(advertisement) {
      pins[i].addEventListener('click', function () {
        window.util.checkAndRemoveElm(window.page.mapSection, '.map__card');
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

    window.util.checkAndRemoveElm(document, '.error');
  }

  function openCloseMessagePopup(message, reasonCall, attributeFragment) {
    var template = document.querySelector('#' + attributeFragment).content.querySelector('.' + attributeFragment);
    var elm = template.cloneNode(true);
    elm.querySelector('.' + attributeFragment + '__message').innerText = message;
    document.body.prepend(elm);

    function onErrorElmKeydown(evt) {
      window.util.onPopupEscPress(evt, elm);
      document.removeEventListener('keydown', onErrorElmKeydown);
      document.removeEventListener('click', onErrorElmCkick);
    }
    function onErrorElmCkick() {
      window.util.closePopup(elm);
      document.removeEventListener('keydown', onErrorElmKeydown);
      document.removeEventListener('click', onErrorElmCkick);
    }

    if (reasonCall) {
      document.addEventListener('keydown', onErrorElmKeydown);
      document.addEventListener('click', onErrorElmCkick);
    }
  }

  function onErrorXhr(errorMessage, reasonCall) {
    window.util.checkAndRemoveElm(document, '.error');
    openCloseMessagePopup(errorMessage, reasonCall, 'error');

    var buttonRepeat = document.querySelector('.error__button');

    if (!reasonCall) {
      buttonRepeat.addEventListener('click', function () {
        window.backend.load(onLoadXhr, onErrorXhr);
      });
    } else {
      buttonRepeat.addEventListener('click', function () {
        window.util.closePopup(buttonRepeat);
      });
    }
  }

  function onSaveXhr(successMessage) {
    window.page.disablePage();
    window.page.pinMain.addEventListener('mousedown', window.page.onPinMainMousedown);
    window.page.pinMain.addEventListener('keydown', window.page.onPinMainKeydown);

    openCloseMessagePopup(successMessage, true, 'success');
  }

  window.inquiries = {
    onLoadXhr: onLoadXhr,
    onErrorXhr: onErrorXhr,
    onSaveXhr: onSaveXhr,
  };
})();
