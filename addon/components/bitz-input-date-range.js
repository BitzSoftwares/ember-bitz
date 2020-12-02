import Component from '@ember/component';
import layout from '../templates/components/bitz-input-date-range';

import { get, set, observer } from '@ember/object';

export default Component.extend({
  layout,

  drops: 'auto',
  timePicker: false,
  separator: ' até ',
  start: new Date(),
  end: new Date(),
  readonly: false,

  isUpdating: false,

  valueObserver: observer('start', 'end', function () {
    // feito isso para que o evento do daterangepicker 
    // não execute na hora que alterar o start apenas
    if (get(this, 'isUpdating')) return;

    this.$('input').data('daterangepicker').setStartDate(get(this, 'start'));
    this.$('input').data('daterangepicker').setEndDate(get(this, 'end'));
  }),

  didInsertElement() {
    if (get(this, 'readonly')) {
      const start = moment(get(this, 'start')).format('DD/MM/YYYY');
      const end = moment(get(this, 'end')).format('DD/MM/YYYY');

      this.$('input').val(start + ' - ' + end);
      return;
    }

    this.$('input').daterangepicker({
      autoApply: true,
      drops: get(this, 'drops'),
      startDate: get(this, 'start'),
      endDate: get(this, 'end'),
      timePicker: get(this, 'timePicker'),
      timePicker24Hour: true,
      locale: {
        format: get(this, 'timePicker') ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY',
        separator: get(this, 'separator'),
        applyLabel: 'Aplicar',
        cancelLabel: 'Cancelar',
        fromLabel: 'De',
        toLabel: 'Para',
        customRangeLabel: 'Customizado',
        weekLabel: 'W',
        daysOfWeek: [
          'Dom',
          'Seg',
          'Ter',
          'Qua',
          'Qui',
          'Sex',
          'Sab'
        ],
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
        ],
        firstDay: 1
      }
    }).on('apply.daterangepicker', (event, dateObject) => {
      set(this, 'isUpdating', true);
      set(this, 'start', dateObject.startDate.toDate());
      set(this, 'isUpdating', false);
      set(this, 'end', dateObject.endDate.toDate());
    });
  },

  willDestroyElement() {
    this.$('input').data('daterangepicker').remove();
  }

});
