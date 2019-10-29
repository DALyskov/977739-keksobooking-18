'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;
  var TIMEOUT = 3000;

  function request(method, url, onSuccess, onError, data, reasonCallSave) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (reasonCallSave) {
        var argument = 'Ваше объявление \n сохранено';
      } else {
        argument = xhr.response;
      }

      if (xhr.status === SUCCESS_CODE) {
        onSuccess(argument);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, reasonCallSave);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', reasonCallSave);
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс', reasonCallSave);
    });


    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);

  }

  function load(onLoad, onError) {
    request('GET', URL_GET, onLoad, onError, null, false);
  }

  function save(data, onLoad, onError) {
    request('POST', URL_POST, onLoad, onError, data, true);
  }

  window.backend = {
    load: load,
    save: save
  };
})();
