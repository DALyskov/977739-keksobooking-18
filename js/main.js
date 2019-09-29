'use strict';

var TITLES = ['Toyota', 'Mazda', 'Honda', 'Nissan', 'Mitsubichi', 'Subaru', 'Suzuki', 'Isuzu'];
var DISCRIPTIONS = ['дешевые', 'комфортные', 'уютные', 'с красивым видом', 'просторные', 'тихие'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var QUANTITY_ADVERTISEMENT = 8;
var NOMINATIVE = 1;
var GENITIVE_START = 5;
var GENITIVE_END = 20;
var PIN_ELM_WIDTH = 50;
var PIN_ELM_HEIGHT = 70;
var ENTER_KEYCODE = 13;
var SPACE_KEYCODE = 32;
var ESC_KEYCODE = 27;

var avatars = getArrStringWithIndex('img/avatars/user', '.png', 8, 2);
var photos = getArrStringWithIndex('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 3, 1);

var mapSection = document.querySelector('.map');
var pinsSection = mapSection.querySelector('.map__pins');
var cardМarker = mapSection.querySelector('.map__filters-container');

var advertisementsData = getArrAdvertisement(QUANTITY_ADVERTISEMENT);

var pinMain = pinsSection.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var mapFilterSelects = mapFilter.querySelectorAll('select');
var mapFilterInputs = mapFilter.querySelectorAll('input');
var adForm = document.querySelector('.ad-form');
var adFormSelects = adForm.querySelectorAll('select');
var adFormInputs = adForm.querySelectorAll('input');
var adFormAddress = adForm.querySelector('#address');

var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormGuestsQuantity = adForm.querySelector('#capacity');


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
      // почему не работает v = padNum(v, lengthNum). из-за передачи аргумента в параметр функции по ссылке?
      newArr[j] = padNum(newArr[j], lengthNum);
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

function addPin(pinAmount) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < pinAmount; i++) {
    var pinElm = template.cloneNode(true);
    pinElm.classList.add('map__pin--new');
    pinElm.style.left = advertisementsData[i].location.x - (PIN_ELM_WIDTH / 2 / pinsSection.offsetWidth * 100) + '%';
    pinElm.style.top = (advertisementsData[i].location.y - PIN_ELM_HEIGHT) + 'px';
    pinElm.querySelector('img').src = advertisementsData[i].author.avatar;
    pinElm.querySelector('img').alt = advertisementsData[i].offer.title;
    pinFragment.append(pinElm);

  }
  pinsSection.append(pinFragment);
}


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
  // Вернуться к вопросу 'условие в функцию'
  if (rooms === NOMINATIVE || (rooms > GENITIVE_END && rooms % 10 === NOMINATIVE)) {
    if (guests === NOMINATIVE || (guests > GENITIVE_END && guests % 10 === NOMINATIVE)) {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комната для ' + advertisement.offer.guests + ' гостя';
    } else {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комната для ' + advertisement.offer.guests + ' гостей';
    }
  } else if (rooms >= GENITIVE_START || (rooms > GENITIVE_END && rooms % 10 >= GENITIVE_START)) {
    if (guests === NOMINATIVE || (guests > GENITIVE_END && guests % 10 === NOMINATIVE)) {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостя';
    } else {
      cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнат для ' + advertisement.offer.guests + ' гостей';
    }
  } else {
    if (guests === NOMINATIVE || (guests > GENITIVE_END && guests % 10 === NOMINATIVE)) {
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
      if (iconFeatureItems[j].classList[1].indexOf(advertisement.offer.features[k]) !== -1) {
      // if (iconFeatureItems[j].classList[1].contains('popup__feature--' + advertisement.offer.features[k])) {
        iconFeatureItems[j].style.display = 'inline-block';
      }
    }
  }

  cardElm.querySelector('.popup__description').textContent = advertisement.offer.description;

  var popupPhotos = cardElm.querySelector('.popup__photos');
  cardElm.querySelector('.popup__photo').src = advertisement.offer.photos[0];
  // for (j = 1; j < advertisement.offer.photos.length; j++) {
  //   var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
  //   popupPhoto.src = advertisement.offer.photos[j];
  //   popupPhotos.append(popupPhoto);
  // }
  // Считаю, что в этом случае обычный for-цикл лучше
  advertisement.offer.photos.forEach(function (v, i) {
    if (i >= 1) {
      var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = v;
      popupPhotos.append(popupPhoto);
    }
  });

  cardElm.querySelector('.popup__avatar').src = advertisement.author.avatar;

  cardFragment.append(cardElm);

  cardМarker.before(cardFragment);
}

function toggleEnableBlock(arrSelects, arrInputs, toggle) {
  arrSelects.forEach(function (v) {
    v.disabled = toggle;
  });
  arrInputs.forEach(function (v) {
    v.disabled = toggle;
  });
}

function disableMapFilter() {
  toggleEnableBlock(mapFilterSelects, mapFilterInputs, true);
}
disableMapFilter();

function enableMapFilter() {
  toggleEnableBlock(mapFilterSelects, mapFilterInputs, false);
}

function disableAdForm() {
  toggleEnableBlock(adFormSelects, adFormInputs, true);
}
disableAdForm();

function enableAdForm() {
  toggleEnableBlock(adFormSelects, adFormInputs, false);
}

function enablePage() {
  mapSection.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  enableMapFilter();
  enableAdForm();
  addPin(QUANTITY_ADVERTISEMENT);
  // addСard(1);
  var pins = pinsSection.querySelectorAll('.map__pin--new');
  // Тут большой вопрос, в котором самостаятельно не разобрался
  function pinClickHandler(advertisement) {
    pins[i].addEventListener('click', function () {
      var cards = document.querySelectorAll('.map__card');
      cards.forEach(function (v) {
        v.remove();
      });
      addСard(advertisement);
      // var card = document.querySelector('.map__card');
      cards = document.querySelectorAll('.map__card');
      var card = cards[cards.length - 1];
      document.addEventListener('keydown', function rem(evt) {
        popupEscPressHandler(evt, card);
      }, {once: true});

      // document.addEventListener('keydown', popupEscPressHandler);

      // document.addEventListener('keydown', function rem(evt) {
      //   popupEscPressHandler(evt, card);
      // });
    });
  }
  for (var i = 0; i < pins.length; i++) {
    pinClickHandler(advertisementsData[i]);
  }
  adFormAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight + 12);
}

adFormAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);

pinMain.addEventListener('mousedown', enablePage);
pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
    enablePage();
  }
});


function popupEscPressHandler(evt, domElement) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(domElement);
  }
}

function closePopup(domElement) {
  domElement.remove();
  // document.removeEventListener('keydown', function rem(evt) {
  //   popupEscPressHandler(evt, domElement);
  // });
  // document.removeEventListener('keydown', popupEscPressHandler);
}

function checkAdFormGuestsQuantity() {
  switch (adFormRoomNumber.value) {
    case '1':
      adFormGuestsQuantity.options[0].disabled = true;
      adFormGuestsQuantity.options[1].disabled = true;
      adFormGuestsQuantity.options[2].disabled = false;
      adFormGuestsQuantity.options[3].disabled = true;
      break;
    case '2':
      adFormGuestsQuantity.options[0].disabled = true;
      adFormGuestsQuantity.options[1].disabled = false;
      adFormGuestsQuantity.options[2].disabled = false;
      adFormGuestsQuantity.options[3].disabled = true;
      break;
    case '3':
      adFormGuestsQuantity.options[0].disabled = false;
      adFormGuestsQuantity.options[1].disabled = false;
      adFormGuestsQuantity.options[2].disabled = false;
      adFormGuestsQuantity.options[3].disabled = true;
      break;
    default:
      adFormGuestsQuantity.options[0].disabled = true;
      adFormGuestsQuantity.options[1].disabled = true;
      adFormGuestsQuantity.options[2].disabled = true;
      adFormGuestsQuantity.options[3].disabled = false;
  }
}
checkAdFormGuestsQuantity();

adFormRoomNumber.addEventListener('change', checkAdFormGuestsQuantity);
