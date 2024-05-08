(function (window) {
    // Activation du mode strict pour un code plus sûr
    "use strict";
    
    // Définition du constructeur du modèle
    function Model(storage) {
      this.storage = storage;// Stockage des données
    }

    // Méthode pour lire les données du modèle
    Model.prototype.read = function (query) {
      return this.storage.photographersAll(query);
    };

    Model.prototype.readMediaById = function (photographerId, callback) {
      const medias = this.storage.mediaAll();
      //on filtre les médias pour ne conserver que ceux dont la propriété media photographerId est égale à photographerId 
      const mediasByPhotographer = medias.filter(media => media.photographerId === photographerId);
      
      console.log("Media found by ID:", mediasByPhotographer);
      
      callback.call(null, mediasByPhotographer);
    };

    Model.prototype.readSummary = function (photographerId, callback) {
      const self = this;  
      // Appeler la méthode pour calculer les likes par photographe
      self.storage.summaryAll(photographerId, function(summary) {
        // Appeler le callback avec le total de likes
        callback(summary);
      });
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