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
      self.storage.summaryAll(function(likesByPhotographer) {
        // Vérifier si le photographe spécifié a des likes calculés
        const totalLikes = likesByPhotographer[photographerId] || 0;
        
        // Afficher le total de likes pour le photographe spécifié
        console.log(`Total des likes par rapport a l'id du photographer ${photographerId}: ${totalLikes}`);
        
        // Appeler le callback avec le total de likes
        callback(totalLikes);
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