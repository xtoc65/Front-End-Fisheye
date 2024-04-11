(function (window) {
    "use strict";
    
    // Définition de la fonction constructeur Template
    function Template() {
      this.cardListTemplate = ({name, city, tagline, portrait }) => `
        <div  class="photograph-header">
          <h1 class="name">${name}</h1>
          <p class="card__desc">${city}</p>
          <p class="card__desc">${tagline}</p>
        </div>
        <div>
          <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        </div>
        <div>
          <img  class="img_photographe" src"/assets/photographers/${portrait}" alt="${name}">
        </div>
        `;
    }
  
    Template.prototype.buildCardList = function (data) {
      return data.reduce((v, item) => {
        let template = this.cardListTemplate(item);
        return v + template;
      }, "");
    };
  
    Template.prototype.buildLikeButton = function ({ id, countLikes }) {
      return `
        <a class="card__btn" href="#" data-like-id="${id}">:like: (${countLikes})</a>
      `;
    };
  
    // Définition de l'objet Template dans l'espace global de la fenêtre
    window.app = window.app || {};
    window.app.Template = Template;
  })(window);
  