import Component from '@ember/component';
import layout from '../templates/components/bitz-input-money';

import { get, set, computed, observer } from '@ember/object';

export default Component.extend({
  layout,

  value: 0,
  valueInput: 0,
  readonly: false,
  changingMasked: false,

  classComputed: computed('class', function () {
    return 'form-control ' + (get(this, 'class')  || '');
  }),

  roundedValue: computed('value', function () {
    return Math.round((Number(get(this, 'value')) || 0) * 100) / 100;
  }),

  valueObserver: observer('value', function () {
    if (get(this, 'changingMasked')) {
      set(this, 'changingMasked', false);
      return;
    }

    this.$('input').inputmask('setvalue', get(this, 'roundedValue'));
  }),

  didInsertElement() {
    this.$('input').inputmask({
      placeholder: '0,00',
      alias: 'numeric',
      autoGroup: true,
      prefix: 'R$ ',
      digits: '2',
      groupSeparator: '.',
      radixPoint: ',',
      digitsOptional: false,
      showMaskOnHover: false,
    });

    this.$('input').inputmask('setvalue', get(this, 'roundedValue'));

    this.$('input').on('input', () => {
      set(this, 'changingMasked', true);

      const value = this.$('input').inputmask('unmaskedvalue');
      set(this, 'value', Number(value.replace(',', '.') || 0));
    });
  },

  willDestroyElement() {
    this.$('input').inputmask('remove').off('input');
  }

});