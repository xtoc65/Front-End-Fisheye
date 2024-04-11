(function (window) {
    "use strict";
  
     // Définition de la fonction constructeur View
    function View(template) {
      this.templage = template;
  
      // this.$cardsList = qs(".cards");
    }
  
    // View.prototype.bind = function (event, handler) {
    //   const self = this;
    //   if (event === "photoLiked") {
    //     $delegate(self.$cardsList, ".card__btn", "click", function (event) {
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
        showAllPhotos: function () {
          // self._replaceWith(self.$cardsList, self.templage.buildCardList(params));
        },
  
        updateLikes: function () {
          self._replaceWith(
            qs(`.photo-like-${params.id}`),
            self.templage.buildLikeButton(params)
          );
        },
      };
  
      viewCmdList[viewCmd].call();
    };
  
    // Méthode pour remplacer un élément avec du HTML
    View.prototype._replaceWith = function (element, html) {
      const parsedDocument = new DOMParser().parseFromString(html, "text/html");// Création d'un document HTML à partir de la chaîne de caractères
      element.replaceChildren(...parsedDocument.body.childNodes);// Remplacement des enfants de l'élément par les enfants du document HTML
    };
    
    // Exposition de la classe View en tant que propriété de l'objet global "app"
    window.app = window.app || {};
    window.app.View = View;
  })(window);
  