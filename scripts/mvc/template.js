(function (window) {
    "use strict";
  
    function Template() {
      this.cardListTemplate = ({ id, title, desc, countLikes }) => `
        <div class="card">
          <h3 class="card__title">${title}</h3>
          <p class="card__desc">${desc}</p>
          <div class="card__summary photo-like-${id}" id="summary-${id}">
            <a class="card__btn" href="#" data-like-id="${id}">:like: (${countLikes})</a>
          </div>
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
  
    window.app = window.app || {};
    window.app.Template = Template;
  })(window);
  