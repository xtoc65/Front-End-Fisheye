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
  
    // Initialiser le contrôleu
    Controller.prototype.init = function () {
      this.photographerId = this.getPhotographerId(); // Obtenir l'ID du photographe à partir de l'URL
      this.getPhotographerName(); // J'obtiens le nom du photographe.
      this.showAllPhotosHeader();// Afficher l'en-tête
      this.showPhotoCard(); // Afficher les cartes de la galerie
    }

    Controller.prototype.getPhotographerId = function () {
      const urlParams = new URLSearchParams(window.location.search);
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
        console.log(data);        
        // J'affiche les cartes de la galerie.
        self.view.render("showPhotoCard", data);
      }
      self.model.readMediaById(this.photographerId, callback);
      // const self = this;
      // const photographerName = await this.getPhotographerName();
      // const mediaData = await new Promise((resolve, reject) => {
      //   self.model.readMedia(function (data){
      //     resolve(data)
      //   });
      // });

      // const galleryCards = [];
      // for (let i = 0; i < mediaData.length; i++) {
      //   const media = mediaData[i];
      //   if (media.photographerId === self.photographerId) {
      //     media.photographerName = photographerName;
      //     const card = self.view.template.photoListe(media, media.id);
      //     galleryCards.push(card);
      //   }        
      // }
      // console.log("media data:", mediaData);
      // self.view.render("showPhotoCard", galleryCards);
    }
  
    Controller.prototype.updateLike = function (photoId) {
      const self = this;
      self.model.addLike(photoId, function ({id, countLikes}) {
        self.view.render("updateLikes", { id, countLikes })
      });
    }
  
  // Je crée un espace de noms pour l'application et j'y assigne le contrôleur.
    window.app = window.app || {};
    window.app.Controller = Controller;
  })(window);
  