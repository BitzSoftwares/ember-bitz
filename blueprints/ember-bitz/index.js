'use strict';

module.exports = {

  normalizeEntityName() { },

  afterInstall() {
    return this.addPackageToProject('inputmask');
  }

};
