import Component from '@ember/component';
import layout from '../templates/components/bitz-input-date-range';

import { get, set } from '@ember/object';

export default Component.extend({
  layout,

  start: new Date(),
  valueStart: '',
  end: new Date(),
  valueEnd: '',
  readonly: false,
  toStr: 'até',

  didInsertElement() {
    const $inputGroup = this.$('.input-daterange');

    if (!get(this, 'readonly')) {
      $inputGroup.datepicker({
        language: 'pt-BR',
        todayBtn: 'linked',
        todayHighlight: true,
        format: 'dd/mm/yyyy'
      });
    }

    $inputGroup.find('input').inputmask('99/99/9999');

    set(this, 'valueStart', moment(get(this, 'start')).format('DD/MM/YYYY'));
    set(this, 'valueEnd', moment(moment(get(this, 'end')).add(1, 'day').toDate()).format('DD/MM/YYYY'));
  }
});
