'use strict';

(function () {
  var pinMainOffsetX = window.page.pinMain.offsetWidth / 2;
  var pinMainOffsetY = window.page.pinMain.offsetHeight + 12;
  var pinMainMinX = -pinMainOffsetX;
  var PIN_MAIN_MIN_Y = 130;
  var PIN_MAIN_MAX_Y = 630;

  function setadFormAddress() {
    window.form.adFormAddress.value = Math.round(window.page.pinMain.offsetLeft + pinMainOffsetX) + ', ' + Math.round(window.page.pinMain.offsetTop + pinMainOffsetY);
  }

  window.page.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var draggedMarker = false;

    setadFormAddress();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      draggedMarker = true;
      var pinMainMaxX = window.page.mapSection.offsetWidth - pinMainOffsetX;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainX = window.page.pinMain.offsetLeft - shift.x;
      var pinMainY = window.page.pinMain.offsetTop - shift.y;

      if (pinMainX >= pinMainMinX && pinMainX <= pinMainMaxX) {
        window.page.pinMain.style.left = pinMainX + 'px';
      }
      if (pinMainY >= PIN_MAIN_MIN_Y && pinMainY <= PIN_MAIN_MAX_Y) {
        window.page.pinMain.style.top = pinMainY + 'px';
      }

      setadFormAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (draggedMarker) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.page.pinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.page.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
