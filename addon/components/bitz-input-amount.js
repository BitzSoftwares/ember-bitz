import Component from '@ember/component';

import layout from '../templates/components/bitz-input-amount';
import { get, set } from '@ember/object';

export default Component.extend({

  layout,

  min: 0,
  max: 100,
  value: 0,

  onInputEvent() {
    const inputEle = this.element.querySelector('input');
    const value = Number(inputEle.value);

    if (isNaN(value) || value < this.min || value > this.max) {
      inputEle.value = get(this, 'value');
      return;
    }

    if (value === 0) inputEle.value = 0;

    set(this, 'value', value);
  },

  didInsertElement() {
    const inputEle = this.element.querySelector('input');

    inputEle.value = get(this, 'value');

    inputEle.addEventListener('input', this.onInputEvent);
  },

  didUpdateAttrs() {
    this.element.querySelector('input').value = get(this, 'value');
  },

  willDestroyElement() {
    const inputEle = this.element.querySelector('input');
    inputEle.removeEventListener('input', this.onInputEvent);
  },

  actions: {

    remove() {
      const inputEle = this.element.querySelector('input');
      const value = Number(inputEle.value);

      if (value <= Number(get(this, 'min'))) {
        inputEle.value = get(this, 'value');
        return;
      }

      set(this, 'value', value - 1);
      inputEle.value = get(this, 'value');
    },

    add() {
      const inputEle = this.element.querySelector('input');
      const value = Number(inputEle.value);

      if (value >= Number(get(this, 'max'))) {
        inputEle.value = get(this, 'value');
        return;
      }

      set(this, 'value', value + 1);
      inputEle.value = get(this, 'value');
    }

  }

});
