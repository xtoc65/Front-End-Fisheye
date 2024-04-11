(function (window) {
    "use strict";
    
    // Définition du constructeur du modèle
    function Model(storage) {
      this.storage = storage;
    }

    // Méthode pour lire les données du modèle
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
    
    // Définition de l'objet global "app" s'il n'existe pas déjà
    window.app = window.app || {};
    // Assignation du constructeur du modèle à l'objet global "app"
    window.app.Model = Model;
  })(window);
  