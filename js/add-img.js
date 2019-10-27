'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adFormHeadeFileChooser = window.page.adForm.querySelector('.ad-form__field input');
  var adFormPreview = window.page.adForm.querySelector('.ad-form-header__preview img');
  var dropAreaHeader = window.page.adForm.querySelector('.ad-form-header__drop-zone');
  var dropArea = window.page.adForm.querySelector('.ad-form__drop-zone');
  var dropAreaColor = dropAreaHeader.style.color;
  var dropAreaColorHover = '#ff5635';
  var adFormFoto = window.page.adForm.querySelector('.ad-form__photo');
  var adFormFileChoosers = window.page.adForm.querySelectorAll('input[type="file"]');
  var adFormFileDropAreas = [dropAreaHeader, dropArea];

  adFormFoto.style.display = 'flex';
  adFormFoto.style.alignItems = 'center';
  adFormFoto.style.width = 'auto';
  adFormFoto.style.height = 'auto';
  adFormFoto.style.minWidth = '70px';
  adFormFoto.style.minHaight = '70px';
  adFormFoto.style.flexWrap = 'wrap';
  adFormFoto.style.justifyContent = 'space-between';
  dropArea.style.marginBottom = '10px';

  function displayHeaderImg(file) {
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
        elm.style.margin = '15px 15px';

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
      displayHeaderImg(file);
    }
  }

  function onInputImgChange() {
    var files = Array.prototype.slice.call(this.files);
    checkInput(this, adFormHeadeFileChooser, files);
  }

  function onAreaDrop(evt) {
    var data = evt.dataTransfer;
    var files = Array.prototype.slice.call(data.files);
    checkInput(this, dropAreaHeader, files);
  }

  adFormFileChoosers.forEach(function (v) {
    v.addEventListener('change', onInputImgChange);
  });

  var evtDragAndDropArr = ['dragenter', 'dragover', 'dragleave', 'drop'];
  function onDropAreaEvtDragAndDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  evtDragAndDropArr.forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, onDropAreaEvtDragAndDrop);
    dropArea.addEventListener(evtName, onDropAreaEvtDragAndDrop);
  });
  function onDropAreaFileIn() {
    this.style.color = dropAreaColorHover;
  }

  function onDropAreaFileLeave() {
    this.style.color = dropAreaColor;
  }
  ['dragenter', 'dragover'].forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, onDropAreaFileIn);
    dropArea.addEventListener(evtName, onDropAreaFileIn);
  });
  ['dragleave', 'drop'].forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, onDropAreaFileLeave);
    dropArea.addEventListener(evtName, onDropAreaFileLeave);
  });

  adFormFileDropAreas.forEach(function (v) {
    v.addEventListener('drop', onAreaDrop);
  });

  window.addImg = {
    adFormPreview: adFormPreview,
    adFormFoto: adFormFoto,
  };
})();
