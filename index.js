'use strict';

const path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('node_modules/inputmask/dist/jquery.inputmask.min.js');
  }
};
