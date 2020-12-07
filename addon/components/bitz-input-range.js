import Component from '@ember/component';
import layout from '../templates/components/bitz-input-range';

import { get, set } from '@ember/object';

export default Component.extend({
  layout,

 
  min: 0,
  max: 100,
  value: 50,
  tooltip: true,

  didInsertElement() {

    noUiSlider.create(this.element, {
      start: get(this, 'value'),
      animate: false,
      tooltips: get(this, 'tooltip'),
      range: {
        min: get(this, 'min'),
        max: get(this, 'max'),
      },
      format: {
        to: value => Number(value),
        from: value => Math.round(Number(value)),
      },
    });

    this.element.noUiSlider.on('update', (values, handle) => set(this, 'value', values[handle]));
  },

  didRender() {
    this.element.noUiSlider.set(get(this, 'value'));
  },

  willDestroyElement() {
    this.element.noUiSlider.off();
    this.element.noUiSlider.destroy();
  },

});
