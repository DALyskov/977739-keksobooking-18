'use strict';

(function () {
  var NOMINATIVE = 1;
  var GENITIVE_START = 5;
  var GENITIVE_END = 20;

  var cardМarker = window.map.mapSection.querySelector('.map__filters-container');

  window.card = {
    addСard: addСard
  };

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
        if (iconFeatureItems[j].classList[1].indexOf(advertisement.offer.features[k]) !== -1) {
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
})();
