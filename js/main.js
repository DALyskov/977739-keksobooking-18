'use strict';

var TITLES = ['Toyota', 'Mazda', 'Honda', 'Nissan', 'Mitsubichi', 'Subaru', 'Suzuki', 'Isuzu'];
var DISCRIPTIONS = ['дешевые', 'комфортные', 'уютные', 'с красивым видом', 'просторные', 'тихие'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var avatars = getArrStringWithIndex('img/avatars/user', '.png', 8, 2);
var photos = getArrStringWithIndex('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 8, 1);

var mapSection = document.querySelector('.map');
var pinsSection = mapSection.querySelector('.map__pins');

var advertisementData = getArrAdvertisement(8);

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
  return num.toString().padStart(lengthNum, 0);
}

// массив случайных чисел без повторов в диапазоне от 0 до arrLength с добовлением 0
function getRndNumbers(arrLength, lengthNum) {
  var arr = [];
  var rndArr = [];
  for (var i = 0; i < arrLength; i++) {
    arr[i] = 1 + i;
  }
  for (i = 0; i < arrLength; i++) {
    var rndI = Math.floor(Math.random() * arr.length);
    rndArr[i] = arr[rndI];
    arr.splice(rndI, 1);
  }
  if (lengthNum > 1) {
    for (i = 0; i < arrLength; i++) {
      rndArr[i] = padNum(rndArr[i], lengthNum);
    }
  }
  return rndArr;
}

// массив из случайных элементов друго массива без повторов в диапазоне
function getRndArrFromOriginalArr(originalArr, lengthNewArr) {
  var sourceArr = originalArr.slice();
  var rndArr = [];
  if (sourceArr.length < lengthNewArr) {
    lengthNewArr = sourceArr.length;
  }
  for (var i = 0; i < lengthNewArr; i++) {
    var rndI = Math.floor(Math.random() * sourceArr.length);
    rndArr[i] = sourceArr[rndI];
    sourceArr.splice(rndI, 1);
  }
  return rndArr;
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

function getArrAdvertisement(arrLength) {
  var arr = [];
  for (var i = 0; i < arrLength; i++) {
    var rooms = getRndNum(1, 5);
    arr[i] = {
      author: {
        avatar: getElmFromArr(avatars)
      },
      offer: {
        title: getElmFromArr(TITLES),
        address: getRndNum(689, 779) + ', ' + getRndNum(763, 774),
        price: getRndNum(2000, 50000),
        type: getElmFromArr(TYPES),
        // rooms: getRndNum(1, 5),                Это возможно?
        // getGuests: function () {
        //   return this.rooms * 2 - 1;
        // },
        // guests: getGuests()
        rooms: rooms,
        guests: rooms * 2 - getRndNum(1, 2),
        checkin: getRndNum(12, 14) + ':00',
        checkout: getRndNum(12, 14) + ':00',
        features: getRndArrFromOriginalArr(FEATURES, getRndNum(1, FEATURES.length)),
        description: getRndArrFromOriginalArr(DISCRIPTIONS, getRndNum(1, DISCRIPTIONS.length)).join(', ') + ' апартаменты',
        photos: getRndArrFromOriginalArr(photos, getRndNum(1, photos.length)),
      },
      location: {
        x: getRndNum(0, 100),
        y: getRndNum(130, 630)
      }
    };
  }
  return arr;
}

mapSection.classList.remove('map--faded');

var addPin = function (pinAmount) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pinAmount; i++) {
    var pinElm = template.cloneNode(true);
    pinElm.style.left = advertisementData[i].location.x - (25 / pinsSection.offsetWidth * 100) + '%';
    pinElm.style.top = (advertisementData[i].location.y - 70) + 'px';
    pinElm.querySelector('img').src = advertisementData[i].author.avatar;
    pinElm.querySelector('img').alt = advertisementData[i].offer.title;
    pinFragment.append(pinElm);
  }
  pinsSection.append(pinFragment);
};

addPin(8);
