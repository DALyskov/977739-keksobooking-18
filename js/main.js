'use strict';

var TITLES = ['Toyota', 'Mazda', 'Honda', 'Nissan', 'Mitsubichi', 'Subaru', 'Suzuki', 'Isuzu'];
var DISCRIPTIONS = ['дешевые', 'комфортные', 'уютные', 'с красивым видом', 'просторные', 'тихие'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var QUANTITY_ADVERTISEMENT = 3;

var avatars = getArrStringWithIndex('img/avatars/user', '.png', 8, 2);
var photos = getArrStringWithIndex('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 3, 1);

var mapSection = document.querySelector('.map');
var pinsSection = mapSection.querySelector('.map__pins');
var cardМarker = mapSection.querySelector('.map__filters-container');

var advertisementsData = getArrAdvertisement(QUANTITY_ADVERTISEMENT);

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
    for (i = 0; i < arrLength; i++) {
      newArr[i] = padNum(newArr[i], lengthNum);
    }
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

function getArrAdvertisement(arrLength) {
  var arr = [];
  for (var i = 0; i < arrLength; i++) {
    var rooms = getRndNum(1, 5);
    if (rooms === 1) {
      var guests = getRndNum(0, 1);
    } else {
      guests = getRndNum(1, 2);
    }
    arr[i] = {
      author: {
        avatar: getElmFromArr(avatars)
      },
      offer: {
        title: getElmFromArr(TITLES),
        address: getRndNum(689, 779) + ', ' + getRndNum(763, 774),
        price: getRndNum(2000, 50000),
        type: getElmFromArr(TYPES),
        rooms: rooms,
        guests: rooms * 2 - guests,
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

function addPin(pinAmount) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pinAmount; i++) {
    var pinElm = template.cloneNode(true);
    pinElm.classList.add('map__pin--new');
    pinElm.style.left = advertisementsData[i].location.x - (25 / pinsSection.offsetWidth * 100) + '%';
    pinElm.style.top = (advertisementsData[i].location.y - 70) + 'px';
    pinElm.querySelector('img').src = advertisementsData[i].author.avatar;
    pinElm.querySelector('img').alt = advertisementsData[i].offer.title;
    pinFragment.append(pinElm);
  }
  pinsSection.append(pinFragment);
}

addPin(QUANTITY_ADVERTISEMENT);

function addСard(advertisement) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();

  var cardElm = template.cloneNode(true);
  cardElm.querySelector('.popup__title').textContent = advertisement.offer.title;
  cardElm.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';

  switch (advertisement.offer.type) {
    case 'palace':
      cardElm.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      cardElm.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      cardElm.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'bungalo':
      cardElm.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    default:
      cardElm.querySelector('.popup__type').textContent = 'Апартаменты';
  }

  var rooms = advertisement.offer.rooms;
  var guests = advertisement.offer.guests;
  if (rooms === 1 || (rooms > 20 && rooms % 10 === 1)) {
    if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комната для ' + advertisement.offer.guests + ' гостя';
    } else {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комната для ' + advertisement.offer.guests + ' гостей';
    }
  } else if (rooms >= 5 || (rooms > 20 && rooms % 10 >= 5)) {
    if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостя';
    } else {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостей';
    }
  } else {
    if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостя';
    } else {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    }
  }

  cardElm.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
  for (var j = 0; j < iconFeatureItems.length; j++) {
    iconFeatureItems[j].style.display = 'none';
    for (var k = 0; k < advertisement.offer.features.length; k++) {
      // Испаравь .includes на .contains
      if (iconFeatureItems[j].classList[1].includes(advertisement.offer.features[k])) {
        iconFeatureItems[j].style.display = 'inline-block';
      }
    }
  }

  cardElm.querySelector('.popup__description').textContent = advertisement.offer.description;

  var popupPhotos = cardElm.querySelector('.popup__photos');
  cardElm.querySelector('.popup__photo').src = advertisement.offer.photos[0];
  for (j = 1; j < advertisement.offer.photos.length; j++) {
    var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = advertisement.offer.photos[j];
    popupPhotos.append(popupPhoto);
  }

  cardElm.querySelector('.popup__avatar').src = advertisement.author.avatar;

  cardFragment.append(cardElm);

  cardМarker.before(cardFragment);
}

var pins = pinsSection.querySelectorAll('.map__pin--new');

function pinClickHandler(advertisement) {
  pins[i].addEventListener('click', function () {
    addСard(advertisement);
  });
}

for (var i = 0; i < pins.length; i++) {
  pinClickHandler(advertisementsData[i]);
}
