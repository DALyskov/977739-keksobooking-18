'use strict';

(function () {
  var elmMain = document.querySelector('main');

  function onLoadXhr(dataXhr) {
    window.inquiries.dataPins = dataXhr;
    window.page.addPins(window.inquiries.dataPins);
  }

  function openCloseMessagePopup(message, reasonCall, attributeFragment) {
    var template = document.querySelector('#' + attributeFragment).content.querySelector('.' + attributeFragment);
    var elm = template.cloneNode(true);
    var elmMessage = elm.querySelector('.' + attributeFragment + '__message');
    elmMessage.innerText = message;
    elmMain.prepend(elm);

    function onErrorElmKeydown(evt) {
      window.util.onPopupEscPress(evt, elm);
      document.removeEventListener('keydown', onErrorElmKeydown);
      document.removeEventListener('click', onErrorElmCkick);
    }
    function onErrorElmCkick(evt) {
      if (evt.target.closest('.' + attributeFragment + '__message') === null) {
        window.util.closePopup(elm);
        document.removeEventListener('keydown', onErrorElmKeydown);
        document.removeEventListener('click', onErrorElmCkick);
      }
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

    openCloseMessagePopup(successMessage, true, 'success');
    window.page.disablePage();
  }

  window.inquiries = {
    onLoadXhr: onLoadXhr,
    onErrorXhr: onErrorXhr,
    onSaveXhr: onSaveXhr,
  };
})();
