'use strict';

(function () {
  var NOMINATIVE = 1;
  var GENITIVE_START = 5;
  var GENITIVE_END = 20;

  var type = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
  };

  var cardМarker = window.map.mapSection.querySelector(
      '.map__filters-container'
  );

  // желательно размещать внизу
  window.card = {
    addСard: addСard,
  };

  function addСard(advertisement) {
    var template = document
      .querySelector('#card')
      .content.querySelector('.map__card');
    var cardFragment = document.createDocumentFragment();

    var cardElm = template.cloneNode(true);
    cardElm.querySelector('.popup__title').textContent =
      advertisement.offer.title;
    cardElm.querySelector('.popup__text--price').innerHTML =
      advertisement.offer.price + '&#x20bd;<span>/ночь</span>';

    // функция addCard занимается присвоением данных и добавлением карточки в DOM, это уже не мало
    // 0 код ниже вынесем в отдельную функцию mapType
    // чем больше текста тем сложней читать
    /*
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
    */
    // cardElm.querySelector('.popup__type').textContent = mapType(
    //     advertisement.offer.type
    // );
    cardElm.querySelector('.popup__type').textContent = type[advertisement.offer.type];


    // Вернуться к вопросу 'условие в функцию'
    // возвращаемся, очевидно что множесвенное число надо выносить в отдельную функцию
    //
    cardElm.querySelector('.popup__text--capacity').textContent =
      advertisement.offer.rooms +
      ' комната для ' +
      advertisement.offer.guests +
      ' ' +
      plural(['гостя', 'гостей'], advertisement.offer.rooms);

    cardElm.querySelector('.popup__text--time').textContent =
      'Заезд после ' +
      advertisement.offer.checkin +
      ', выезд до ' +
      advertisement.offer.checkout;

      // множественное число
    // спер в интернетах, немного модифицировал под 'гостя/гостей'
    function plural(forms, n) {
      var idx;
      if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0; // many
      } else {
        idx = 1; // one
      }
      return forms[idx] || '';
    }

    // var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
    // вложенные итерации по массиву всегда нужно оставлять как самый последний вариант
    /*
    for (var j = 0; j < iconFeatureItems.length; j++) {
      iconFeatureItems[j].style.display = 'none';
      for (var k = 0; k < advertisement.offer.features.length; k++) {
        if (
          iconFeatureItems[j].classList[1].indexOf(
              advertisement.offer.features[k]
          ) !== -1
        ) {
          iconFeatureItems[j].style.display = 'inline-block';
        }
      }
    }
    */
    // пересмотрим решение задачи, получим все feature li элементы
    var iconFeatureItems = cardElm.querySelectorAll('.popup__feature');
    // iconFeatureItems это коллекцияи, но из нее можно получить массив и работать как с массивом
    // получим массив из коллекции следующим образом
    // Array.prototype.slice.call()
    // https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work
    // если коротко просто добавляем коллекции методы массива
    iconFeatureItems = Array.prototype.slice.call(iconFeatureItems);
    // удалим их из шаблона
    var featureParent = cardElm.querySelector('.popup__features');
    featureParent.innerHTML = '';
    // соберем из li только те эдементы которые нужны
    advertisement.offer.features.forEach(function (feature) {
      var icon = iconFeatureItems.find(function (el) {
        var type = el.classList[1].split('--')[1];
        return feature === type;
      });
      featureParent.appendChild(icon);
    });

    cardElm.querySelector('.popup__description').textContent =
      advertisement.offer.description;

    var popupPhotos = cardElm.querySelector('.popup__photos');
    // не понял что это...
    // cardElm.querySelector('.popup__photo').src = advertisement.offer.photos[0]; Элементу 0 я присваиваю адрес первого фото дольше через цикл создаю  остальные

    // уходим от for
    advertisement.offer.photos.forEach(function (photo) {
      var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = photo;
      popupPhotos.append(popupPhoto);
    });

    /*
    for (j = 1; j < advertisement.offer.photos.length; j++) {
      var popupPhoto = cardElm.querySelector('.popup__photo').cloneNode(true);
      popupPhoto.src = advertisement.offer.photos[j];
      popupPhotos.append(popupPhoto);
    }
    */

    cardElm.querySelector('.popup__avatar').src = advertisement.author.avatar;

    cardFragment.append(cardElm);

    cardМarker.before(cardFragment);
  }

  function mapType(key) {
    // 1 мы знаем что должно приходить в case и что мы будем возвращать,
    /* 2
    switch (type) {
      case 'palace':
        return 'Дворец';
        case 'flat':
          return 'Квартира';
          case 'house':
            return 'Дом';
            case 'bungalo':
              return 'Бунгало';
              default:
                return 'Апартаменты';
              }
              */
    //  3 это не вычисляемые значения, т.е. их можно собрать в объект
    // * здесь только для демо, объект налдо вынести вверх
    var type = {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
    };
    // 4 становится понято что не нужен ни switch ни функция
    return type[key];
  }


})();
