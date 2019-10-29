'use strict';

(function () {
  var PIN_MAIN_MIN_Y_SOURCE = 130;
  var PIN_MAIN_MAX_Y_SOURCE = 630;
  var pinMainMinX = -window.page.pinMainOffsetX;
  var pinMainMinY = PIN_MAIN_MIN_Y_SOURCE - window.page.pinMain.offsetHeight - window.page.pinMainHeightCorretion;
  var pinMainMaxY = PIN_MAIN_MAX_Y_SOURCE - window.page.pinMain.offsetHeight - window.page.pinMainHeightCorretion;

  window.page.pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var draggedMarker = false;

    window.page.setAdFormAddress(window.page.pinMainOffsetYMoution);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      draggedMarker = true;
      var pinMainMaxX = window.page.mapSection.offsetWidth - window.page.pinMainOffsetX;

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
      if (pinMainY >= pinMainMinY && pinMainY <= pinMainMaxY) {
        window.page.pinMain.style.top = pinMainY + 'px';
      }

      window.page.setAdFormAddress(window.page.pinMainOffsetYMoution);
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
