(function (window) {
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
      
      // Définition du template pour les cartes de la galerie
      this.photoTemplate = ({id, photographerId, image, video, title, likes }) => {
        let mediaPhotographe = "";
        if (image) {
          mediaPhotographe = `<img class="img_photographe" src="/assets/${photographerId}/${image}" alt="${title}">`;
        } else if (video) {
          mediaPhotographe = `<video class="img_photographe" src="/assets/${photographerId}/${video}" alt="${title}"></video>`;
        };
        return `
          <section class="cards" data-media-id="${id}">
          <article>
          ${mediaPhotographe}
            <div>
              <h2>${title}</h2>
              <p>${likes} <i class="fa-solid fa-heart"></i></p>
            </div>
          </article>
          </section>
        `;
      };

      this.summaryTemplate = ({id, likes, price}) => {
        `<section class="summary" data-media-id="${id}">
          <p>${likes} <i class="fa-solid fa-heart"></i></p>
          <p>${price}/jour</p>
          </section>`
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
      console.log(data);
      return this.summaryTemplate(data);
    };

  
    // Template.prototype.buildLikeButton = function ({ id, countLikes }) {
      //pour incrémenté le bouton like
    //   return `
    //     <a class="card__btn" href="#" data-like-id="${id}">:like: (${countLikes})</a>
    //   `;
    // };
  
    // Définition de l'objet Template dans l'espace global de la fenêtre
    window.app = window.app || {};
    window.app.Template = Template;
  })(window);
  