(function (window) {
    "use strict";
    
    // Déclaration des variables privées
    let Memory = {};// Mémoire pour stocker les données
    let ID = 1;// ID pour les nouveaux éléments
  
    // Constructeur de la classe Store
    function Store(name) {
      this._dbName = name;// Nom de la base de données
  
      // Vérifie si les données sont déjà en mémoire
      if (!Memory[name]) {
        Memory[name] = {
          photos: {
            1: {
              title: "Photographe Lvl. 1",
              desc: "Lucas Nicola",
              id: 1,
              countLikes: 0,
            },
            2: {
              title: "Photographe Lvl. 2",
              desc: "Flora Paul",
              id: 2,
              countLikes: 10,
            },
            3: {
              title: "Photographe Lvl. 2",
              desc: "Pauline Gagniere",
              id: 3,
              countLikes: 100,
            },
            4: {
              title: "Photographe Lvl. 2",
              desc: "Joel Mayen", 
              id: 4,
              countLikes: 1000,
            },
          },
        };
      }
    }

     // Méthode pour compter le nombre d'éléments
    Store.prototype.count = function (callback) {
      const photographeCount = Object.keys(Memory[this._dbName].photos).length;
      callback.call(photographeCount);
    };
  
     // Méthode pour récupérer tous les éléments
    Store.prototype.findAll = function (callback) {
      callback = callback || function () {};// Fonction de rappel par défaut
  
      const entities = Memory[this._dbName].photos;
      callback.call(
        this,
        Object.keys(entities).map((key) => entities[key])
      );
    };

    // Méthode pour récupérer un élément par son ID
    Store.prototype.findById = function (id, callback) {
      callback = callback || function () {}; // Fonction de rappel par défaut
      callback.call(this, Memory[this._dbName].photos[id]);
    };
  
    // Méthode pour sauvegarder un élément
    Store.prototype.save = function (id, params, callback) {
      if (id) {
        // Si l'ID est fourni, met à jour l'élément existant
        const item = { ...Memory[this._dbName][id], ...params };// Fusionne les données existantes avec les nouvelles données
        Memory[this._dbName].photos[item.id] = item;// Met à jour les données en mémoire
        callback(item);// Appelle la fonction de rappel avec l'élément mis à jour
        return;
      }
  
      // Si l'ID n'est pas fourni, ajoute un nouvel élément avec un nouvel ID
      Memory[this._dbName].photos[ID++] = params;
      callback(params);// Appelle la fonction de rappel avec le nouvel élément
    };
  
     // Expose la classe Store en tant que propriété de l'objet global "app"
    window.app = window.app || {};
    window.app.Store = Store;
  })(window);
  