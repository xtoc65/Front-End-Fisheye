(function (window) {
    "use strict";
  
    let Memory = {};
    let ID = 1;
  
    function Store(name) {
      this._dbName = name;
  
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
  
    Store.prototype.count = function (callback) {
      const photographeCount = Object.keys(Memory[this._dbName].photos).length;
      callback.call(photographeCount);
    };
  
    Store.prototype.findAll = function (callback) {
      callback = callback || function () {};
  
      const entities = Memory[this._dbName].photos;
      callback.call(
        this,
        Object.keys(entities).map((key) => entities[key])
      );
    };
  
    Store.prototype.findById = function (id, callback) {
      callback = callback || function () {};
      callback.call(this, Memory[this._dbName].photos[id]);
    };
  
    Store.prototype.save = function (id, params, callback) {
      if (id) {
        const item = { ...Memory[this._dbName][id], ...params };
        Memory[this._dbName].photos[item.id] = item;
        callback(item);
        return;
      }
  
      Memory[this._dbName].photos[ID++] = params;
      callback(params);
    };
  
    window.app = window.app || {};
    window.app.Store = Store;
  })(window);
  