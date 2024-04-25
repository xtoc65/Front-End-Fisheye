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

    Model.prototype.readMedia = function () {
      this.storage.mediaAll(function (mediaData) {
        // Je filtre les médias qui appartiennent au photographe avec l'ID correspondant.
        const photographerMedia = mediaData.filter(
          (media) => media.photographerId === this.photographerId
        );
      console.log(photographerMedia);
      return photographerMedia;
    });
        
       // // Je filtre les médias qui appartiennent au photographe avec l'ID correspondant.
      // const photographerMedia = mediaData.filter(
     //   (media) => media.photographerId === this.photographerId
     // );
     // return this.storage.mediaAll(photographerMedia);
    };

    Model.prototype.readMediaById = function (mediaId, callback) {
      // Utiliser une logique appropriée pour trouver le média par son ID
      this.storage.readMedia(function (mediaData) {
        const media = mediaData.find((media) => String(media.id) === String(mediaId)); // Convertir les deux valeurs en chaînes de caractères pour comparer
        console.log("Media found by ID:", media);
        callback(media);
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
  