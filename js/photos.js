'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var INITIAL_AVATAR_IMAGE = 'img/muffin.png';

  var getPhotosToUpload = function (fileChooser, previewContainer, fileMultiple) {
    fileChooser.multiple = fileMultiple;
    var inputChangeHandler = function (currentEvt) {
      var files = currentEvt.target.files;
      [].forEach.call(files, function (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function (evt) {
            if (fileMultiple === true) {
              previewContainer.insertAdjacentHTML('beforeend', '<img src="' + evt.target.result + '" width="45" height="45" title="' + fileName + '">');
            } else {
              previewContainer.querySelector('img').src = evt.target.result;
            }
          });
          reader.readAsDataURL(file);
        }
      });
    };
    fileChooser.addEventListener('change', inputChangeHandler);
  };

  var resetPhotosToUpload = function (resettingAvatarContainer, deletedPhotosContainer) {
    resettingAvatarContainer.querySelector('img').src = INITIAL_AVATAR_IMAGE;
    var previewPhotosCollection = deletedPhotosContainer.querySelectorAll('img');
    [].forEach.call(previewPhotosCollection, function (previewPhoto) {
      deletedPhotosContainer.removeChild(previewPhoto);
    });
  };

  var sortPhotosToUpload = function (sortingPhotosContainer) {

    var draggedItem = null;
    var dragoverItem = null;
    var nextItem = null;

    sortingPhotosContainer.addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        nextItem = draggedItem.nextElementSibling;
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    });

    sortingPhotosContainer.addEventListener('dragover', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        dragoverItem = evt.target;
      }
      evt.preventDefault();
      return false;
    });

    sortingPhotosContainer.addEventListener('drop', function (evt) {
      evt.target.style.backgroundColor = '';
      var replaced = sortingPhotosContainer.replaceChild(draggedItem, dragoverItem);
      sortingPhotosContainer.insertBefore(replaced, (replaced === nextItem) ? draggedItem : nextItem);
      evt.preventDefault();
    });

    sortingPhotosContainer.addEventListener('dragenter', function (evt) {
      evt.target.style.backgroundColor = 'yellow';
      evt.preventDefault();
    });

    sortingPhotosContainer.addEventListener('dragleave', function (evt) {
      evt.target.style.backgroundColor = '';
      evt.preventDefault();
    });
  };

  window.photos = {
    getPhotosToUpload: getPhotosToUpload,
    resetPhotosToUpload: resetPhotosToUpload,
    sortPhotosToUpload: sortPhotosToUpload
  };
})();
