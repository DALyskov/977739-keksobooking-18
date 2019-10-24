'use strict';

(function () {
  var pinMainOffsetX = window.map.pinMain.offsetWidth / 2;
  var pinMainOffsetY = window.map.pinMain.offsetHeight + 12;
  var pinMainMinX = -pinMainOffsetX;
  var PIN_MAIN_MIN_Y = 130;
  var PIN_MAIN_MAX_Y = 630;

  function setadFormAddress() {
    window.form.adFormAddress.value = Math.round(window.map.pinMain.offsetLeft + pinMainOffsetX) + ', ' + Math.round(window.map.pinMain.offsetTop + pinMainOffsetY);
  }

  window.map.pinMain.addEventListener('mousedown', function (evt) {
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
      var pinMainMaxX = window.map.mapSection.offsetWidth - pinMainOffsetX;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainX = window.map.pinMain.offsetLeft - shift.x;
      var pinMainY = window.map.pinMain.offsetTop - shift.y;

      if (pinMainX >= pinMainMinX && pinMainX <= pinMainMaxX) {
        window.map.pinMain.style.left = pinMainX + 'px';
      }
      if (pinMainY >= PIN_MAIN_MIN_Y && pinMainY <= PIN_MAIN_MAX_Y) {
        window.map.pinMain.style.top = pinMainY + 'px';
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
          window.map.pinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.map.pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
