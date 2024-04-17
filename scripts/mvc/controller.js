(function (window) {
    "use strict";

    // Fonction constructeur du contrôleur
    function Controller(model, view) {
      const self = this;// Assigner la valeur de "this" à "self" pour pouvoir l'utiliser dans les fonctions de rappel
      self.model = model; // Assigner le modèle au contrôleur
      self.view = view;// Assigner la vue au contrôleur
  
      // self.view.bind("photoLiked", function (photoId) {
      //   self.updateLike(photoId);
      // })
    }
  
    // Initialiser le contrôleur
    Controller.prototype.init = function () {
      this.showAllPhotosHeader();
      this.showAllPhotos();
    }
  
    Controller.prototype.showAllPhotosHeader = function () {
      const self = this;
      self.model.read(function(data) {
        self.view.render("showAllPhotosHeader", data);
      });
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
  
    // Obtenir l'ID du photographe à partir de l'URL
    window.app = window.app || {};
    window.app.Controller = Controller;
  })(window);
  