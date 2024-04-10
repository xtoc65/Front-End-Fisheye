(function (window) {
    "use strict";
  
    function Controller(model, view) {
      const self = this;
      self.model = model;
      self.view = view;
  
      self.view.bind("photoLiked", function (photoId) {
        self.updateLike(photoId);
      })
    }
  
    Controller.prototype.init = function () {
      this.showAllPhotos();
    }
  
    Controller.prototype.showAllPhotos = function () {
      const self = this;
      self.model.read(function(data) {
        self.view.render("showAllPhotos", data);
      });
    }
  
    Controller.prototype.updateLike = function (photoId) {
      const self = this;
      self.model.addLike(photoId, function ({id, countLikes}) {
        self.view.render("updateLikes", { id, countLikes })
      });
    }
  
    window.app = window.app || {};
    window.app.Controller = Controller;
  })(window);
  