'use strict';

(function () {
  var cardМarker = window.page.mapSection.querySelector('.map__filters-container');

  var typeListMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  function plural(forms, n) {
    var idx;
    if (n % 10 === 1 && n % 100 !== 11) {
      idx = 0;
    } else if (n % 10 > 1 && n % 10 < 5) {
      idx = 1;
    } else {
      idx = forms.length - 1;
    }
    return forms[idx] || '';
  }

  function addСard(advertisement) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var cardFragment = document.createDocumentFragment();

    var cardElm = template.cloneNode(true);
    cardElm.querySelector('.popup__title').textContent = advertisement.offer.title;
    cardElm.querySelector('.popup__text--price').innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';

    cardElm.querySelector('.popup__type').textContent = typeListMap[advertisement.offer.type];

    cardElm.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + plural([' комната для ', ' комнаты  для ', ' комнат  для '], advertisement.offer.rooms) + advertisement.offer.guests + plural([' гостя', ' гостей'], advertisement.offer.guests);

    cardElm.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
    iconFeatureItems = Array.prototype.slice.call(iconFeatureItems);
    var featureParent = cardElm.querySelector('.popup__features');
    featureParent.innerHTML = '';
    advertisement.offer.features.forEach(function (feature) {
      var icon = iconFeatureItems.find(function (el) {
        var featuresType = el.classList[1].split('--')[1];
        return feature === featuresType;
      });
      featureParent.appendChild(icon);
    });

    cardElm.querySelector('.popup__description').textContent = advertisement.offer.description;

    var popupPhotos = cardElm.querySelector('.popup__photos');
    var popupPhotoSource = cardElm.querySelector('.popup__photo');
    popupPhotos.innerHTML = '';
    advertisement.offer.photos.forEach(function (photo) {
      var popupPhoto = popupPhotoSource.cloneNode(true);
      popupPhoto.src = photo;
      popupPhotos.append(popupPhoto);
    });

    cardElm.querySelector('.popup__avatar').src = advertisement.author.avatar;

    cardFragment.append(cardElm);

    cardМarker.before(cardFragment);
  }

  window.card = {
    addСard: addСard
  };
})();
