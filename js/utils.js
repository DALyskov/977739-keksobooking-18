'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;

  // Функция разблокировки inputs
  function toggleEnableBlock(arrSelects, arrFieldset, toggle) {
    arrSelects.forEach(function (v) {
      v.disabled = toggle;
    });
    arrFieldset.forEach(function (v) {
      v.disabled = toggle;
    });
  }
  // Фун. проверки соответствия кода клавиш enter и space
  function checkKeyCode(cb, evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      cb(evt);
    }
  }
  // Фун. закрытия попапа
  function closePopup(domElement) {
    domElement.remove();
  }

  // Проверка наличия и удаления предыдущего элемента
  function checkAndRemoveElm(parentElm, selectorElm) {
    var elm = parentElm.querySelectorAll(selectorElm);
    elm.forEach(function (v) {
      if (v) {
        v.remove();
      }
    });
  }

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    toggleEnableBlock: toggleEnableBlock,
    checkKeyCode: checkKeyCode,
    checkAndRemoveElm: checkAndRemoveElm,
    closePopup: closePopup,
  };
})();
