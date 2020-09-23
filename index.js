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

    // inputmask
    app.import('node_modules/inputmask/dist/jquery.inputmask.min.js');

    // moment
    app.import('node_modules/moment/moment.js');

    // datepicker
    app.import('node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css');
    app.import('node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js');
    app.import('node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.pt-BR.min.js');
  }
};
