'use strict';

module.exports = {

  normalizeEntityName() { },

  afterInstall() {
    return this.addPackagesToProject([
      { name: 'inputmask' },
      { name: 'moment' },
      { name: 'daterangepicker' },
      { name: 'bootstrap-datepicker' },
      { name: 'gridjs' },
    ]);
  }

};
