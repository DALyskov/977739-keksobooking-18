'use strict';

(function () {
  var ESC_KEYCODE = 27;

  // функция выборки случайного элемента из массива
  function getElmFromArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  // функция случайного числа в диапазоне
  function getRndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // набивка номера
  function padNum(num, lengthNum) {
    if (lengthNum > num.toString().length) {
      var result = '';
      for (var i = 0; i < lengthNum - num.toString().length; i++) {
        result += '0';
      }
      result += num;
      return result;
    }
    return num;
  }
  // перемешивание массива
  function getRndArrFromArr(arr) {
    var newArr = arr.slice();
    var j;
    var temp;
    for (var i = newArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  }
  // массив случайных чисел без повторов в диапазоне от 1 до arrLength с добовлением 0
  function getRndNumbers(arrLength, lengthNum) {
    var arr = [];
    for (var i = 0; i < arrLength; i++) {
      arr[i] = 1 + i;
    }
    var newArr = getRndArrFromArr(arr);
    if (lengthNum > 1) {
      newArr.forEach(function (v, j) {
        newArr[j] = padNum(newArr[j], lengthNum);
        // v = padNum(v, lengthNum);
      });
    }
    return newArr;
  }
  // массив из случайных элементов друго массива без повторов в диапазоне
  function getRndArrFromOriginalArr(originalArr, lengthNewArr) {
    return getRndArrFromArr(originalArr).slice(0, lengthNewArr);
  }
  // массив строк со вставленными случайными(без повторов) индексами(номерами)
  function getArrStringWithIndex(startString, endString, arrLength, lengthNum) {
    var arr = [];
    var arrRndNubers = getRndNumbers(arrLength, lengthNum);
    for (var i = 0; i < arrLength; i++) {
      arr[i] = startString + arrRndNubers[i] + endString;
    }
    return arr;
  }
  // Функция разблокировки inputs
  function toggleEnableBlock(arrSelects, arrInputs, toggle) {
    arrSelects.forEach(function (v) {
      v.disabled = toggle;
    });
    arrInputs.forEach(function (v) {
      v.disabled = toggle;
    });
  }
  // Фун.Обр по esc
  function onPopupEscPress(evt, domElement) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup(domElement);
    }
  }
  // Фун закрытия попапа
  function closePopup(domElement) {
    domElement.remove();
  }

  window.util = {
    getElmFromArr: getElmFromArr,
    getRndNum: getRndNum,
    getRndArrFromOriginalArr: getRndArrFromOriginalArr,
    getArrStringWithIndex: getArrStringWithIndex,
    toggleEnableBlock: toggleEnableBlock,
    onPopupEscPress: onPopupEscPress
  };
})();
