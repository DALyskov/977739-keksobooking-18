'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form-header__input');
  var adFormPreview = document.querySelector('.ad-form-header__preview img');
  var dropAreaHeader = document.querySelector('.ad-form-header__drop-zone');
  var dropArea = document.querySelector('.ad-form__drop-zone');
  var adFormFoto = document.querySelector('.ad-form__photo');

  var adFormFileChoosers = window.page.adForm.querySelectorAll('input[type="file"]');
  var adFormFiledropAreas = [dropAreaHeader, dropArea];


  function displayImg(file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (v) {
      return fileName.endsWith(v);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        adFormPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  function onInputImgChange() {
    var files = Array.prototype.slice.call(this.files);

    if (this !== fileChooser) {
      // var fileName = file.name.toLowerCase();
      // var matches = FILE_TYPES.some(function (v) {
      //   return fileName.endsWith(v);
      // });

      // if (matches) {
      //   var template = adFormPreview;
      //   var elm = template.cloneNode(true);
      //   elm.alt = 'Фотография жилья';

      //   var reader = new FileReader();
      //   reader.addEventListener('load', function () {
      //     elm.src = reader.result;
      //   });
      //   reader.readAsDataURL(file);

      //   adFormFoto.append(elm);
      // }
      console.dir(file);
      files.forEach(function (v) {
        var fileName = v.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var template = adFormPreview;
          var elm = template.cloneNode(true);
          elm.alt = 'Фотография жилья';

          var reader = new FileReader();
          reader.addEventListener('load', function () {
            elm.src = reader.result;
          });
          reader.readAsDataURL(v);

          adFormFoto.append(elm);
        }
      });
    } else {
      var file = files[0];
      displayImg(file);
    }
  }

  adFormFileChoosers.forEach(function (v) {
    v.addEventListener('change', onInputImgChange);
  });

  var evtDNDArr = ['dragenter', 'dragover', 'dragleave', 'drop'];
  evtDNDArr.forEach(function (evtName) {
    dropArea.addEventListener(evtName, function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });
    dropAreaHeader.addEventListener(evtName, function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    });
  });

  function onAreaDrop(evt) {
    var data = evt.dataTransfer;
    var files = Array.prototype.slice.call(data.files);
    if (this !== dropAreaHeader) {
      files.forEach(function (v) {
        var fileName = v.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var template = adFormPreview;
          var elm = template.cloneNode(true);
          elm.alt = 'Фотография жилья';

          var reader = new FileReader();
          reader.addEventListener('load', function () {
            elm.src = reader.result;
          });
          reader.readAsDataURL(v);

          adFormFoto.append(elm);
        }
      });
    } else {
      var file = files[0];
      displayImg(file);
    }
  }

  adFormFiledropAreas.forEach(function (v) {
    v.addEventListener('drop', onAreaDrop);
  });
})();
