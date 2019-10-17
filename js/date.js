'use strict';

(function () {
  var TITLES = ['Toyota', 'Mazda', 'Honda', 'Nissan', 'Mitsubichi', 'Subaru', 'Suzuki', 'Isuzu'];
  var DISCRIPTIONS = ['дешевые', 'комфортные', 'уютные', 'с красивым видом', 'просторные', 'тихие'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var QUANTITY_ADVERTISEMENT = 8;

  var avatars = window.util.getArrStringWithIndex('img/avatars/user', '.png', 8, 2);
  var photos = window.util.getArrStringWithIndex('http://o0.github.io/assets/images/tokyo/hotel', '.jpg', 3, 1);
  var advertisementsData = getArrAdvertisement(QUANTITY_ADVERTISEMENT);
  console.log(advertisementsData);

  function getArrAdvertisement(arrLength) {
    var arr = [];
    for (var i = 0; i < arrLength; i++) {
      var rooms = window.util.getRndNum(1, 5);
      if (rooms === 1) {
        var guests = window.util.getRndNum(0, 1);
      } else {
        guests = window.util.getRndNum(1, 2);
      }
      arr[i] = {
        author: {
          avatar: window.util.getElmFromArr(avatars)
        },
        offer: {
          title: window.util.getElmFromArr(TITLES),
          address: window.util.getRndNum(689, 779) + ', ' + window.util.getRndNum(763, 774),
          price: window.util.getRndNum(2000, 50000),
          type: window.util.getElmFromArr(TYPES),
          rooms: rooms,
          guests: rooms * 2 - guests,
          checkin: window.util.getRndNum(12, 14) + ':00',
          checkout: window.util.getRndNum(12, 14) + ':00',
          features: window.util.getRndArrFromOriginalArr(FEATURES, window.util.getRndNum(1, FEATURES.length)),
          description: window.util.getRndArrFromOriginalArr(DISCRIPTIONS, window.util.getRndNum(1, DISCRIPTIONS.length)).join(', ') + ' апартаменты',
          photos: window.util.getRndArrFromOriginalArr(photos, window.util.getRndNum(1, photos.length)),
        },
        location: {
          x: window.util.getRndNum(0, 100),
          y: window.util.getRndNum(130, 630)
        }
      };
    }
    return arr;
  }

  window.date = {
    QUANTITY_ADVERTISEMENT: QUANTITY_ADVERTISEMENT,
    advertisementsData: advertisementsData
  };
})();
