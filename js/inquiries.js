'use strict';

(function () {
  function onLoadXhr(dataXhr) {
    window.inquiries.dataPins = dataXhr;
    var filteredData = window.pinsFilter.filterPin();

    window.util.checkAndRemoveElm('.map__pin--new');
    window.page.addPin(filteredData.length, filteredData);

    var pins = window.page.pinsSection.querySelectorAll('.map__pin--new');
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

  function onErrorXhr(errorMessage, reasonCall) {
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

    if (reasonCall) {
      document.addEventListener('keydown', function (evt) {
        window.util.onPopupEscPress(evt, errorElm);
      });
    }
  }

  window.inquiries = {
    onLoadXhr: onLoadXhr,
    onErrorXhr: onErrorXhr,
  };
})();
