'use strict';

var TITLES = ['Toyota', 'Mazda', 'Honda', 'Nissan', 'Mitsubichi', 'Subaru', 'Suzuki', 'Isuzu'];
var DISCRIPTIONS = ['дешевые', 'комфортные', 'уютные', 'с красивым видом', 'просторные', 'тихие'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var avatars = getArrStringWithIndex('img/avatars/user', '.png', 8, 2);
var photos = getArrStringWithIndex('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 3, 1);

var mapSection = document.querySelector('.map');
var pinsSection = mapSection.querySelector('.map__pins');
var cardМarker = mapSection.querySelector('.map__filters-container');

var advertisementsData = getArrAdvertisement(8);

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

var addPin = function (pinAmount) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pinAmount; i++) {
    var pinElm = template.cloneNode(true);
    pinElm.style.left = advertisementsData[i].location.x - (25 / pinsSection.offsetWidth * 100) + '%';
    pinElm.style.top = (advertisementsData[i].location.y - 70) + 'px';
    pinElm.querySelector('img').src = advertisementsData[i].author.avatar;
    pinElm.querySelector('img').alt = advertisementsData[i].offer.title;
    pinFragment.append(pinElm);
  }
  pinsSection.append(pinFragment);
};

addPin(8);

var addСard = function (cardAmount) {
  var template = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();
  for (var i = 0; i < cardAmount; i++) {
    var cardElm = template.cloneNode(true);
    cardElm.querySelector('.popup__title').textContent = advertisementsData[i].offer.title;
    cardElm.querySelector('.popup__text--price').innerHTML = advertisementsData[i].offer.price + '&#x20bd;<span>/ночь</span>';

    switch (advertisementsData[i].offer.type) {
      case TYPES[0]:
        cardElm.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case TYPES[1]:
        cardElm.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case TYPES[2]:
        cardElm.querySelector('.popup__type').textContent = 'Дом';
        break;
      case TYPES[3]:
        cardElm.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      default:
        cardElm.querySelector('.popup__type').textContent = 'Апартаменты';
    }

    var rooms = advertisementsData[i].offer.rooms;
    var guests = advertisementsData[i].offer.guests;
    if (rooms === 1 ||  (rooms > 20 && rooms % 10 === 1)) {
      if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комната для ' + advertisementsData[i].offer.guests + ' гостя';
      } else {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комната для ' + advertisementsData[i].offer.guests + ' гостей';
      }
    } else if (rooms >= 5 || (rooms > 20 && rooms % 10 >= 5)) {
      if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комнат для ' + advertisementsData[i].offer.guests + ' гостя';
      } else {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комнат для ' + advertisementsData[i].offer.guests + ' гостей';
      }
    } else {
      if (guests === 1 || (guests > 20 && guests % 10 === 1)) {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комнаты для ' + advertisementsData[i].offer.guests + ' гостя';
      } else {
        cardElm.querySelector('.popup__text--capacity').textContent = advertisementsData[i].offer.rooms + ' комнаты для ' + advertisementsData[i].offer.guests + ' гостей';
      }
    }

    cardElm.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisementsData[i].offer.checkin + ', выезд до ' + advertisementsData[i].offer.checkout;

    var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
    for (var j = 0; j < iconFeatureItems.length; j++) {
      iconFeatureItems[j].style.display = 'none';
      for (var k = 0; k < advertisementsData[i].offer.features.length; k++) {
        if (iconFeatureItems[j].classList[1].includes(advertisementsData[i].offer.features[k])) {
          iconFeatureItems[j].style.display = 'inline-block';
        }
      }
    }

    cardElm.querySelector('.popup__description').textContent = advertisementsData[i].offer.description;

    var popupPhotos = cardElm.querySelector('.popup__photos');
    cardElm.querySelector('.popup__photo').src = advertisementsData[i].offer.photos[0];
    for (j = 1; j < advertisementsData[i].offer.photos.length; j++) {
      var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = advertisementsData[i].offer.photos[j];
      popupPhotos.append(popupPhoto);
    }

    cardElm.querySelector('.popup__avatar').src = advertisementsData[i].author.avatar;
    // popupPhotos.append(cardElm.querySelector('.popup__photo'));

    // cardElm.querySelector('.popup__feature')[j].style.display = 'none';
    // for (var j = 0; j < advertisementsData[i].offer.features.length; j++) {
    //   console.log(advertisementsData[i].offer.features[j]);
    //   switch (advertisementsData[i].offer.features[j]) {
    //     case 'wifi':
    //       cardElm.querySelector('.popup__feature--wifi').style.display = 'inline-block';
    //       break;
    //     case 'dishwasher':
    //       cardElm.querySelector('.popup__feature--dishwasher').style.display = 'inline-block';
    //       break;
    //     case 'parking':
    //       cardElm.querySelector('.popup__feature--parking').style.display = 'inline-block';
    //       break;
    //     case 'washer':
    //       cardElm.querySelector('.popup__feature--washer').style.display = 'inline-block';
    //       break;
    //     case 'elevator':
    //       cardElm.querySelector('.popup__feature--elevator').style.display = 'inline-block';
    //       break;
    //     case 'conditioner':
    //       cardElm.querySelector('.popup__feature--conditioner').style.display = 'inline-block';
    //       break;
    //     // default:
    //     //   cardElm.querySelector('.popup__feature').style.display = 'none';
    //   }
    // }

    // FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    // pinElm.style.left = advertisementsData[i].location.x - (25 / pinsSection.offsetWidth * 100) + '%';
    // pinElm.style.top = (advertisementsData[i].location.y - 70) + 'px';
    // pinElm.querySelector('img').src = advertisementsData[i].author.avatar;
    // pinElm.querySelector('img').alt = advertisementsData[i].offer.title;
    cardFragment.append(cardElm);
  }
  cardМarker.before(cardFragment);
};

addСard(1);
console.log(advertisementsData[0]);
