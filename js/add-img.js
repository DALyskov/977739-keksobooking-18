'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormFileChooser = window.page.adForm.querySelector('.ad-form-header__input');
  var adFormPreview = window.page.adForm.querySelector('.ad-form-header__preview img');
  var dropAreaHeader = window.page.adForm.querySelector('.ad-form-header__drop-zone');
  var dropArea = window.page.adForm.querySelector('.ad-form__drop-zone');
  var adFormFoto = window.page.adForm.querySelector('.ad-form__photo');
  var adFormFileChoosers = window.page.adForm.querySelectorAll('input[type="file"]');
  var adFormFileDropAreas = [dropAreaHeader, dropArea];

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

  function displayImgs(files) {
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
  }

  function checkInput(elm, standardElm, data) {
    if (elm !== standardElm) {
      displayImgs(data);
    } else {
      var file = data[0];
      displayImg(file);
    }
  }

  function onInputImgChange() {
    var files = Array.prototype.slice.call(this.files);
    checkInput(this, adFormFileChooser, files);
  }

  function onAreaDrop(evt) {
    var data = evt.dataTransfer;
    var files = Array.prototype.slice.call(data.files);
    checkInput(this, dropAreaHeader, files);
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

  adFormFileDropAreas.forEach(function (v) {
    v.addEventListener('drop', onAreaDrop);
  });
})();
