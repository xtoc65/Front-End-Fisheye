(function (window) {
    "use strict";
  
     // Définition de la fonction constructeur View
    function View(template) {
      this.template = template;
  
      this.$photographesListe = qs(".liste");

      this.$photographesPhotos = qs(".images");
    }
  
    // View.prototype.bind = function (event, handler) {
    //   const self = this;
    //   if (event === "photoLiked") {
    //     $delegate(self.$photographesListe, ".card__btn", "click", function (event) {
    //       event.preventDefault();
  
    //       const id = parseInt(event.target.getAttribute("data-like-id"));
    //       handler(id);
    //     });
    //   }
    // };
  
    /**
     *
     * @param {*} viewCmd
     * @param {*} params List des données du modèle
     */
    View.prototype.render = function (viewCmd, params) {
      const self = this;
      const viewCmdList = {
        showAllPhotosHeader: function () {
          ///on appelle le template ou on a mis les element du dom dans lequelle on va placé les photos
          //on appelle le template headerListe ou on lui passe les parametres(les donnée qu'on a eu dans le controler)
          self._replaceWith(self.$photographesListe, self.template.headerListe(params));
        },

        showPhotoCard: function () {
          ///on appelle le template ou on a mis les element du dom dans lequelle on va placé les photos
          //on appelle le template headerListe ou on lui passe les parametres(les donnée qu'on a eu dans le controler)
          console.log(params)
          self._replaceWith(self.$photographesPhotos, self.template.photoListe(params));
        },
 
        // updateLikes: function () {
        //   self._replaceWith(
        //     qs(`.img_photographe-${params.portrait}`),
        //     self.template.headerListe(params)
        //   );
        // },
      };
  
      viewCmdList[viewCmd].call();
    };
  
    // Méthode pour remplacer un élément avec du HTML
    // utilisé un factory pattern
    View.prototype._replaceWith = function (element, html) {
      const parsedDocument = new DOMParser().parseFromString(html, "text/html");// Création d'un document HTML à partir de la chaîne de caractères
      element.replaceChildren(...parsedDocument.body.childNodes);// Remplacement des enfants de l'élément par les enfants du document HTML
    };
    
    // Exposition de la classe View en tant que propriété de l'objet global "app"
    window.app = window.app || {};
    window.app.View = View;
  })(window);
  