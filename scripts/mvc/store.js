// La parenthese est pour evité que les variables interfère avec d'autre variable(évite les beug)
(function (window) {
  // Activation du mode strict pour un code plus sûr
  "use strict";
    
    // Déclaration des variables privées
    let Memory = {};// Mémoire pour stocker les données
    let ID = 1;// ID pour les nouveaux éléments
  
    // Constructeur de la classe Store
    function Store(name) {
      this._dbName = name; // Nom de la base de données
  
      // Vérifie si les données sont déjà en mémoire
      if (!Memory[name]) {
        // Si les données ne sont pas en mémoire, les récupère depuis le fichier JSON
        this._dataPromise = fetch("../../data/photographers.json")
          .then((response) => response.json())
          .then((data) => {
            // Stocke les données en mémoire pour une utilisation ultérieure
            Memory[name] = {
              photographers: data.photographers,
              media: data.media
            };
          })
          // Gestion des erreurs lors du chargement des données 
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // Si les données sont déjà en mémoire, utilise la promesse résolue
        this._dataPromise = Promise.resolve(Memory[name]);
      }
    }

    // Méthode pour compter le nombre d'éléments
    Store.prototype.count = function (callback) {
      const photographeCount = Object.keys(Memory[this._dbName].photographers).length;// Compte le nombre de photographes
      callback.call(photographeCount);// Appelle la fonction de rappel avec le nombre de photographes
    };
  
     // Méthode pour récupérer tous les éléments
    Store.prototype.photographersAll = function (callback) {
      callback = callback || function () {};// Fonction de rappel par défaut
      
      // Attend que les données soient chargées avant d'appeler la fonction de rappel
      this._dataPromise.then(() => {        
        const entities = Memory[this._dbName].photographers;// Récupère les photographes depuis la mémoire
         // Appelle la fonction de rappel avec un tableau contenant tous les photographes
        callback.call(
          this,
          Object.keys(entities).map((key) => entities[key])
        );
      });
    };

     // Méthode pour récupérer tous les médias
    Store.prototype.mediaAll = function (callback) {
      callback = callback || function () {};// Fonction de rappel par défaut
      // Attend que les données soient chargées avant d'appeler la fonction de rappel        
        const entities = Memory[this._dbName].media; // Je récupère les médias depuis la mémoire.
        console.log("Médias récupérés depuis le store :", entities);
        // Récupère les photographes depuis la mémoire
         // Appelle la fonction de rappel avec un tableau contenant tous les photographes
        return entities;
    };

    Store.prototype.summaryAll = function (id, callback) {
      callback = callback || function () {};// Fonction de rappel par défaut
       // Recherche le photographe correspondant à l'ID spécifié dans la base de données
      const photographe = Memory[this._dbName].photographers.find(p => p.id === id);
      // Je récupère les médias depuis la mémoire.
      const entities = Memory[this._dbName].media; 

      // Parcourir les médias pour calculer les totaux de likes par photographe
      // Initialisation de la variable total pour stocker le nombre total de likes
      let total = 0
      // Parcours de toutes les clés de l'objet entities et on filtre les médias pour ceux appartenant au photographe avec l'ID spécifié
      Object.keys(entities).filter(key => entities[key].photographerId === id).forEach(key => {
        // Pour chaque clé (représentant un média du photographe), ajoute les likes de ce média au total
        total = total + entities[key].likes; // Ajoute le nombre de likes de ce média au total
      });
      // Afficher les totaux de likes par photographe
      console.log("Total de likes par photographe :", total);
      // Appeler le callback avec les totaux de likes par photographe, y compris les données du photographe lui-même
      callback({...photographe, likes: total});
    };

    // Méthode pour récupérer un élément par son ID
    Store.prototype.findById = function (id, callback) {
      callback = callback || function () {}; // Fonction de rappel par défaut
      // const photographers = Memory[this._dbName].photographers;
      // const photographer = photographers.find(p => p.id === id);
      console.log('Memory:', Memory);
      console.log('Database:', this._dbName);
      console.log('Photographers:', Memory[this._dbName].photographers);
      console.log(Memory[this._dbName].photographers.find(p => p.id === id)); 
      callback.call(this, Memory[this._dbName].photographer);//TODO utilisé la methode find
    };
  
    // Méthode pour sauvegarder un élément
    Store.prototype.save = function (id, params, callback) {
      if (id) {
        // Si l'ID est fourni, met à jour, modifie l'élément existant
        const item = { ...Memory[this._dbName][id], ...params };// Fusionne les données existantes avec les nouvelles données
        Memory[this._dbName].photographers[item.id] = item;// Met à jour les données en mémoire
        callback(item);// Appelle la fonction de rappel avec l'élément mis à jour
        return;
      }
      
      // Si l'ID n'est pas fourni, crée, ajoute un nouvel élément avec un nouvel ID
      Memory[this._dbName].photographers[ID++] = params;
      // console.log(params);
      // callback(params);// Appelle la fonction de rappel avec le nouvel élément
    };
  
    // Expose la classe Store en tant que propriété de l'objet global "app"
    //si c'est pas défini tu le defini
    window.app = window.app || {};
    //ajoute le dans le store
    window.app.Store = Store;
  })(window);
  