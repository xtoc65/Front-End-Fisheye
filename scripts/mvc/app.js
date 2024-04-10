// Récupération des pièces depuis le fichier JSON
const photographers = fetch("../../data/photographers.json");
console.log(photographers);
(function () {
    "use strict";
  
    function PhotographeDetails(name) {
      this.storage = new app.Store(name);
      this.model = new app.Model(this.storage);
      this.template = new app.Template();
      this.view = new app.View(this.template);
      this.controller = new app.Controller(this.model, this.view);
    }
  
    const photographeDetails = new PhotographeDetails("photographes");
  
    function setView() {
      photographeDetails.controller.init();
    }
  
    $on(window, 'load', setView);
    $on(window, 'hashchange', setView);
  })();