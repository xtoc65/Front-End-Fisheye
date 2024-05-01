(function (window) {
    "use strict";
    
    // Définition du constructeur du modèle
    function Model(storage) {
      this.storage = storage;// Stockage des données
    }

    // Méthode pour lire les données du modèle
    Model.prototype.read = function (query) {
      return this.storage.photographersAll(query);
    };

    Model.prototype.readMedia = function (query) {
      return this.storage.mediaAll(query);
    };

    Model.prototype.readMediaById = function (photographerId, callback) {
      const medias = this.storage.mediaAll();
      
      const mediasByPhotographer = medias.filter(media => media.photographerId === photographerId);
      
      console.log("Media found by ID:", mediasByPhotographer);
      
      callback.call(null, mediasByPhotographer);
    };
  
    //pour ajouté un like
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