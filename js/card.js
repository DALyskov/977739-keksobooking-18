'use strict';

(function () {
  var cardMarker = window.page.mapSection.querySelector('.map__filters-container');

  var typeListDict = {
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

  function add(advertisement) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var cardFragment = document.createDocumentFragment();

    var cardElm = template.cloneNode(true);
    var title = cardElm.querySelector('.popup__title');
    var price = cardElm.querySelector('.popup__text--price');
    var type = cardElm.querySelector('.popup__type');
    var room = cardElm.querySelector('.popup__text--capacity');
    var time = cardElm.querySelector('.popup__text--time');
    var description = cardElm.querySelector('.popup__description');
    var avatar = cardElm.querySelector('.popup__avatar');
    var featureParent = cardElm.querySelector('.popup__features');
    var photosContainer = cardElm.querySelector('.popup__photos');

    function setTitle() {
      title.textContent = advertisement.offer.title;
    }
    function setPrice() {
      price.innerHTML = advertisement.offer.price + '&#x20bd;<span>/ночь</span>';
    }
    function setType() {
      type.textContent = typeListDict[advertisement.offer.type];
    }
    function setRooms() {
      room.textContent = advertisement.offer.rooms + plural([' комната для ', ' комнаты  для ', ' комнат  для '], advertisement.offer.rooms) + advertisement.offer.guests + plural([' гостя', ' гостей'], advertisement.offer.guests);
    }
    function setFeature() {
      var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
      iconFeatureItems = Array.prototype.slice.call(iconFeatureItems);
      featureParent.innerHTML = '';
      advertisement.offer.features.forEach(function (feature) {
        var icon = iconFeatureItems.find(function (el) {
          var featuresType = el.classList[1].split('--')[1];
          return feature === featuresType;
        });
        featureParent.appendChild(icon);
      });
    }
    function setDescription() {
      description.textContent = advertisement.offer.description;
    }
    function setPhotos() {
      var popupPhotoSource = cardElm.querySelector('.popup__photo');
      photosContainer.innerHTML = '';
      advertisement.offer.photos.forEach(function (photo) {
        var popupPhoto = popupPhotoSource.cloneNode(true);
        popupPhoto.src = photo;
        photosContainer.append(popupPhoto);
      });
    }
    function setAvatar() {
      avatar.src = advertisement.author.avatar;
    }

    function checkData(data, elmNeme, cb) {
      if (data === '' || data.length === 0) {
        elmNeme.remove();
      } else {
        cb();
      }
    }

    function checkDataTime() {
      if (advertisement.offer.checkin === '' || advertisement.offer.checkout === '') {
        time.remove();
      } else {
        time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
      }
    }

    checkData(advertisement.offer.title, title, setTitle);
    checkData(advertisement.offer.price, price, setPrice);
    checkData(advertisement.offer.type, type, setType);
    checkData(advertisement.offer.rooms, room, setRooms);
    checkDataTime();
    checkData(advertisement.offer.features, featureParent, setFeature);
    checkData(advertisement.offer.description, description, setDescription);
    checkData(advertisement.offer.photos, photosContainer, setPhotos);
    checkData(advertisement.author.avatar, avatar, setAvatar);

    cardFragment.append(cardElm);
    cardMarker.before(cardFragment);

    document.removeEventListener('keydown', window.inquiries.onMapKeydown);
  }

  window.card = {
    add: add,
  };
})();
