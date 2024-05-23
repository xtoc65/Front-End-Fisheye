(function (window) {
    // Activation du mode strict pour un code plus sûr
    "use strict";

    // Fonction constructeur du contrôleur
    function Controller(model, view) {
      const self = this;// Assigner la valeur de "this" à "self" pour pouvoir l'utiliser dans les fonctions de rappel
      self.model = model; // Assigner le modèle au contrôleur
      self.view = view;// Assigner la vue au contrôleur
  
      self.view.bind("photoLiked", function (photoId) {
        self.updateLike(photoId);
      })
    }
  
    // Initialiser le contrôleu
    Controller.prototype.init = function () {
      this.photographerId = this.getPhotographerId(); // Obtenir l'ID du photographe à partir de l'URL
      this.getPhotographerName(); // J'obtiens le nom du photographe.
      this.showAllPhotosHeader();// Afficher l'en-tête
      this.showPhotoCard(); // Afficher les cartes de la galerie
      this.showSummary(); // Affiche le summary(likes plus prix)
      this.showDiapo();// Afficher la modale des diapo
      this.updateLike();// ajout des likes
    }

    Controller.prototype.getPhotographerId = function () {
       // Récupère les paramètres de l'URL de la fenêtre actuelle
      const urlParams = new URLSearchParams(window.location.search);
      // Extrait l'ID du photographe de la chaîne de requête de l'URL et le convertit en nombre
      return Number(urlParams.get("id"));
    }

     // J'obtiens le nom du photographe.
    Controller.prototype.getPhotographerName = function () {
      const self = this;
      return new Promise((resolve, reject) => {
        self.model.read(function (data) {
          // Je trouve les données du photographe correspondant à l'ID.
          const photographerData = data.find(
            (photographer) => photographer.id === self.photographerId
          );
          resolve(photographerData.name);
        });
      });
    };
  
    Controller.prototype.showAllPhotosHeader = function () {
      const self = this;
      self.model.read(function(data) {
         // Afficher l'en-tête en utilisant les données du photographe
        self.view.render("showAllPhotosHeader" , data.find((photographer) => photographer.id === self.photographerId));
      });
    }

    Controller.prototype.showPhotoCard = function () {
      const self = this;
      const callback = function (data) {
        // J'affiche les cartes de la galerie.
        self.view.render("showPhotoCard", data);
      }
      // Appel de la méthode readMediaById du modèle pour récupérer les médias du photographe
      // avec l'ID du photographe actuel, en utilisant le callback défini ci-dessus
      self.model.readMediaById(this.photographerId, callback);
    }

    Controller.prototype.showSummary = function () {
      const self = this;
      const callback = function (data) {
        // J'affiche les likes et le prix.
        self.view.render("showSummary", data);
      }
      self.model.readSummary(this.photographerId, callback);
    }

    Controller.prototype.showDiapo = function () {
      const self = this;
      const func = function(data) {
        // Afficher l'en-tête en utilisant les données du photographe
       self.view.render("showDiapo" , data.filter((photographer) => photographer.id === self.photographerId));
     }
      self.model.readMediaById(this.photographerId, func);
    }
  
    Controller.prototype.updateLike = function (photoId) {
      const self = this;
      self.model.addLike(photoId, function ({id, likes}) {
        self.view.render("updateLikes", { id, likes })
      });
    }
  
  // Je crée un espace de noms pour l'application et j'y assigne le contrôleur.
    window.app = window.app || {};
    window.app.Controller = Controller;
  })(window);
  