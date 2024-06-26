(function (window) {
    // Activation du mode strict pour un code plus sûr
    "use strict";
    
    // Définition la fonction constructeur Template
    function Template() {
      // Définition du template pour l'en-tête
      this.headerTemplate = ({name, city, tagline, portrait }) => `
      <section class="photographe-header">
      <article>
      <h1 class="name">${name}</h1>
      <p class="ville">${city}</p>
      <p class="description">${tagline}</p>
      </article>
      <article>
      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      </article>
      <article>
      <img class="img_photographe" src="/assets/photographers/${portrait}" alt="${name}">
      </article>
      </section>
      `;

      //function pour mediPhotographe
      function genereMedia ({photographerId, image, video, title}){
        let mediaPhotographe = "";
        if (image) {
          mediaPhotographe = `<img class="img_photographe" src="/assets/${photographerId}/${image}" alt="${title}">`;
        } else if (video) {
          mediaPhotographe = `<video class="img_photographe" src="/assets/${photographerId}/${video}" alt="${title}"></video>`;
        };
        return mediaPhotographe;
      }
            
      // Définition du template pour les cartes de la galerie
      this.photoTemplate = ({id, title, likes, liked, photographerId, image, video}) => {
        const mediaPhotographe = genereMedia({ photographerId, image, video, title });
        return `
          <section class="cards" data-media-id="${id}">
          <article>
          ${mediaPhotographe}
            <div>
              <h2>${title}</h2>
              <a class="card__btn" href="#" data-like-id="${id}">${likes} ${
                liked ? '<i class="fa-solid fa-heart"></i>' : '<i class="far fa-heart"></i>'
              }</a>
            </div>
          </article>
          </section>
        `;
      };

      this.summaryTemplate = ({id, likes, price}) => {
        return `<section class="summary" data-media-id="${id}">
          <p>${likes} <i class="fa-solid fa-heart"></i></p>
          <p>${price}€/jour</p>
          </section>`;
      },

      this.diapoTemplate = ({id, title, photographerId, image, video}) =>{
        const mediaPhotographe = genereMedia({ photographerId, image, video, title });
        return `<div class="slider-item">
        <div class="menu">
            <label for="slide-dot-1"></label>
            <label for="slide-dot-2"></label>
        </div>
        <img class="slide-close"src="assets/icons/close.svg" onclick="closeModal()" />
        <input class="slide-input" id="slide-dot-1" type="radio" name="slides" data-media-id="${id} checked>
        ${mediaPhotographe}
        <h2>${title}</h2>
      </div> `
      }
    }
    
    Template.prototype.headerListe = function (data) {
      return this.headerTemplate(data);
    };

    Template.prototype.photoListe = function (data) {
      return data.reduce((v, item) => {
        let template = this.photoTemplate(item);
        return v + template;
      }, "");
    };

    Template.prototype.summaryListe = function (data) {
      return this.summaryTemplate(data);
    };

    Template.prototype.diapoListe = function (data) {
      console.log("diapoListe", data);
      return this.diapoTemplate(data);
    }
  
    Template.prototype.buildLikeButton = function ({ id, likes }) {
      // pour incrémenté le bouton like
      return `
      <a class="card__btn" href="#" data-like-id="${id}">${likes}<i class='fa-solid fa-heart'></i></a>
      `;
    };
  
    // Définition de l'objet Template dans l'espace global de la fenêtre
    window.app = window.app || {};
    window.app.Template = Template;
  })(window);
  