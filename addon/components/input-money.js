import Component from '@ember/component';
import layout from '../templates/components/input-money';

import { get, set } from '@ember/object';
import { addObserver, removeObserver } from '@ember/object/observers';

export default Component.extend({
  layout,

  value: 0,
  valueInput: 0,
  readonly: false,

  setValueUnmasked() {
      const value = this.$('input').inputmask('unmaskedvalue');

      set(this, 'value', Number(value.replace(',', '.') || 0));
  },

  didReceiveAttrs() {
      removeObserver(this, 'valueInput', null, 'setValueUnmasked');

      set(this, 'valueInput', get(this, 'value') || 0);

      addObserver(this, 'valueInput', null, 'setValueUnmasked');
  },

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
  },

  willDestroyElement() {
      this.$('input').inputmask('remove');
  }
});