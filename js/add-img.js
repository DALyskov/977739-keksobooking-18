'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var EVENTS_DRAG_AND_DROP = ['dragenter', 'dragover', 'dragleave', 'drop'];
  var EVENTS_DRAG_ENTER_AND_OVER = ['dragenter', 'dragover'];
  var EVENTS_DRAG_LEAVE_AND_DROP = ['dragleave', 'drop'];

  var adFormHeadeFileChooser = window.page.adForm.querySelector('.ad-form__field input');
  var dropAreaHeader = window.page.adForm.querySelector('.ad-form-header__drop-zone');
  var dropArea = window.page.adForm.querySelector('.ad-form__drop-zone');
  var dropAreaColor = dropAreaHeader.style.color;
  var dropAreaColorHover = '#ff5635';
  var adFormFoto = window.page.adFormFoto;
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
        window.page.adFormPreview.src = reader.result;
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
        var template = window.page.adFormPreview;
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

  adFormFileChoosers.forEach(function (v) {
    v.addEventListener('change', function () {
      var files = Array.prototype.slice.call(v.files);
      checkInput(v, adFormHeadeFileChooser, files);
    });
  });

  function onDropAreaEvtDragAndDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  EVENTS_DRAG_AND_DROP.forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, onDropAreaEvtDragAndDrop);
    dropArea.addEventListener(evtName, onDropAreaEvtDragAndDrop);
  });

  EVENTS_DRAG_ENTER_AND_OVER.forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, function () {
      dropAreaHeader.style.color = dropAreaColorHover;
    });
    dropArea.addEventListener(evtName, function () {
      dropArea.style.color = dropAreaColorHover;
    });
  });

  EVENTS_DRAG_LEAVE_AND_DROP.forEach(function (evtName) {
    dropAreaHeader.addEventListener(evtName, function () {
      dropAreaHeader.style.color = dropAreaColor;
    });
    dropArea.addEventListener(evtName, function () {
      dropArea.style.color = dropAreaColor;
    });
  });

  adFormFileDropAreas.forEach(function (v) {
    v.addEventListener('drop', function (evt) {
      if (!window.page.adFormFieldsets[0].disabled) {
        var data = evt.dataTransfer;
        var files = Array.prototype.slice.call(data.files);
        checkInput(v, dropAreaHeader, files);
      }
    });
  });
})();
