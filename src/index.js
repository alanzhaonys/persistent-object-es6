const WebStorageES6 = require('web-storage-es6');

class PersistentObjectES6 {
  /**
   * Constructor
   *
   * @constructor
   * @access public
   * @param {string} name             - The unique name of the object
   * @param {string} storageType      - The storage type, "Local" or "Session"
   * @param {Object} storageOverride  - Provide a custom storage object, useful for testing
   */
  constructor(name, storageType, storageOverride = null) {
    this.name = name;
    this.storage = null;

    switch (storageType.toLowerCase()) {
      case 'local':
        this.storage = new WebStorageES6('Local', this.name, storageOverride);
        break;
      case 'session':
        this.storage = new WebStorageES6('Session', this.name, storageOverride);
        break;
    }

    if (!this.storage) {
      console.error("Storage type of 'Local' or 'Session' is required");
      return false;
    }

    this.object = {};
  }

  create() {
    if (this.storage.has(this.name)) {
      // Get values from storage

      // Populate this.object
      this.object = this.storage.get(this.name);

      Object.keys(this.object).forEach(key => {
        let val = this.object[key];

        // Populate class property
        this[key] = val;
      });
    } else {
      var object = {};

      // Assign initial class values
      Object.getOwnPropertyNames(this).forEach(key => {
        if (!['name', 'storage', 'object'].includes(key)) {
          object[key] = this[key];
        }
      });
      // Populate this.object
      this.object = object;
      // Put in storage
      this.storage.put(this.name, this.object);
    }

    // Define Proxy handler
    var handler = {
      set: (target, prop, value, receiver) => {
        // console.log('Setting property "' + prop + '" to ' + value);

        var privateProp = '_' + prop;

        // Set class property
        target[prop] = value;
        // Set this.object property
        target['object'][prop] = value;

        // Workaround for Proxy "set" not updating the (private) variable
        // with "_private" naming convention
        if (privateProp in target) {
          target[privateProp] = value;
          target['object'][privateProp] = value;
        }

        // Put in storage
        this.storage.put(this.name, target['object']);
        return true;
      },
      deleteProperty: function(target, prop) {
        if (prop in target) {
          delete target[prop];
        }
        if (prop in target['object']) {
          delete target['object'][prop];
        }
        return true;
      }
    };

    // Return the proxy object
    return new Proxy(this, handler);
  }

  /**
   * Destory storage
   *
   * @access public
   */
  destroy() {
    this.object = {};
    this.storage.flush();
  }
}

module.exports = PersistentObjectES6;
