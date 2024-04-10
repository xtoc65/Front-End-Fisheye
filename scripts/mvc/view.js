(function (window) {
    "use strict";
  
    function View(template) {
      this.templage = template;
  
      this.$cardsList = qs(".cards");
    }
  
    View.prototype.bind = function (event, handler) {
      const self = this;
      if (event === "photoLiked") {
        $delegate(self.$cardsList, ".card__btn", "click", function (event) {
          event.preventDefault();
  
          const id = parseInt(event.target.getAttribute("data-like-id"));
          handler(id);
        });
      }
    };
  
    /**
     *
     * @param {*} viewCmd
     * @param {*} params List des données du modèle
     */
    View.prototype.render = function (viewCmd, params) {
      const self = this;
      const viewCmdList = {
        showAllPhotos: function () {
          self._replaceWith(self.$cardsList, self.templage.buildCardList(params));
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
  
    View.prototype._replaceWith = function (element, html) {
      const parsedDocument = new DOMParser().parseFromString(html, "text/html");
      element.replaceChildren(...parsedDocument.body.childNodes);
    };
  
    window.app = window.app || {};
    window.app.View = View;
  })(window);
  