import Component from '@ember/component';
import layout from '../templates/components/input-money';

import { get, set, observer } from '@ember/object';

export default Component.extend({
  layout,

  value: 0,
  valueInput: 0,
  readonly: false,
  changingMasked: false,

  valueObserver: observer('value', function () {
    if (get(this, 'changingMasked')) {
      set(this, 'changingMasked', false);
      return;
    }

    this.$('input').inputmask('setvalue', Number(get(this, 'value')) || 0);
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

    this.$('input').val(get(this, 'value') || 0);

    this.$('input').on('input', () => {
      set(this, 'changingMasked', true);

      const value = this.$('input').inputmask('unmaskedvalue');
      set(this, 'value', Number(value.replace(',', '.') || 0));
    });
  },

  willDestroyElement() {
    this.$('input').inputmask('remove');
  }

});