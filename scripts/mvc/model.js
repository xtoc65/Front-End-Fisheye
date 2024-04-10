(function (window) {
    "use strict";
  
    function Model(storage) {
      this.storage = storage;
    }
  
    Model.prototype.read = function (query, callback) {
      return this.storage.findAll(query);
    };
  
    Model.prototype.addLike = function (photoId, callback) {
      const self = this;
      this.storage.findById(photoId, function (item) {
        self.storage.save(
          photoId,
          { ...item, countLikes: item.countLikes + 1 },
          callback
        );
      });
    };
  
    window.app = window.app || {};
    window.app.Model = Model;
  })(window);
  