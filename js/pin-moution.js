'use strict';

(function () {
  function setadFormAddress() {
    window.form.adFormAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight + 12);
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

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + 'px';
      window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + 'px';

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
