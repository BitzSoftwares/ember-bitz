import Component from '@ember/component';
import layout from '../templates/components/bitz-input-date';

import { get, set } from '@ember/object';
import { addObserver, removeObserver } from '@ember/object/observers';

export default Component.extend({
  layout,

  value: null,
  valueInput: new Date(),
  readonly: false,

  setValue() {
    set(this, 'value', moment(get(this, 'valueInput'), 'DD/MM/YYYY').toDate());
  },

  didRender() {
    removeObserver(this, 'valueInput', null, 'setValue');

    set(this, 'valueInput', moment(get(this, 'value')).format('DD/MM/YYYY'));
    this.$('input').datepicker('update', get(this, 'value'));

    addObserver(this, 'valueInput', null, 'setValue');
  },

  didInsertElement() {
    const $input = this.$('input');

    if (!get(this, 'readonly')) {
      $input.datepicker({
        language: 'pt-BR',
        todayBtn: 'linked',
        todayHighlight: true,
        format: 'dd/mm/yyyy',
        autoclose: true,
      });
    }

    $input.inputmask('99/99/9999');

    if (get(this, 'value')) {
      set(this, 'valueInput', moment(get(this, 'value')).format('DD/MM/YYYY'));
      return;
    }

    set(this, 'valueInput', moment(new Date()).format('DD/MM/YYYY'));
  },

  willDestroyElement() {
    this.$('input').inputmask('remove').datepicker('remove');
  }

});
