import Component from '@ember/component';
import layout from '../templates/components/bitz-grid';

import { A } from '@ember/array';
import { inject } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  layout,

  router: inject(),

  url: '',
  data: null,
  columns: A(),
  paginationLimit: 5, // colocar 10 depois
  editRoute: 'home',

  init(...args) {
    this._super(args);

    set(this, 'language', {
      loading: 'Carregando...',
      noRecordsFound: 'Nenhum registro encontrado',
      error: 'Um erro ocorreu ao carregar os registros',
      search: {
        placeholder: 'Procurar...'
      },
      pagination: {
        previous: 'Anterior',
        next: 'Próximo',
        showing: 'Mostrando',
        results: () => 'Registros'
      }
    });
  },

  gridFromData() {
    new gridjs.Grid({
      search: true,
      language: get(this, 'language'),
      pagination: {
        enabled: true,
        limit: get(this, 'paginationLimit'),
        summary: false
      },
      columns: get(this, 'columns'),
      data: get(this, 'data'),
    }).render(this.$()[0]);
  },

  gridFromServer() {
    new gridjs.Grid({
      search: true,
      language: get(this, 'language'),
      pagination: {
        enabled: true,
        limit: get(this, 'paginationLimit'),
        summary: false
      },
      columns: ['Name', 'Language', 'Released At', 'Artist',
        {
          name: 'Ações',
          attributes: () => {
            return { class: 'gridjs-td text-right' };
          },
          formatter: id =>
            gridjs.html(`
              <div class="btn-group">
                <button class="btn btn-sm btn-primary btn-edit" data-id="${id}">
                  <i class="fa fa-edit"></i> 
                </button>
                <button class="btn btn-sm btn-danger btn-delete" data-id="${id}">
                  <i class="fa fa-trash-o"></i>
                </button>
              </div>`)
        }],
      server: {
        url: get(this, 'url'),
        then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist, card.id]),
        handle: (res) => {
          if (res.status === 404) return { data: A() };
          if (res.ok) return A(res.json());

          throw Error('Um erro ocorreu ao carregar os registros');
        },
      }
    }).render(this.$()[0]);
  },

  didInsertElement() {
    set(this, 'url', 'https://api.scryfall.com/cards/search?q=Inspiring');

    set(this, 'columns', A(['Name', 'Language', 'Released At', 'Artist']));

    // set(this, 'columns', A([
    //   {
    //     name: "Name",
    //     sort: true,
    //   },
    //   { name: "Email" },
    //   { name: "Phone Number" }
    // ]));

    // set(this, 'data', A([
    //   ["John", "john@example.com", "(353) 01 222 3333"],
    //   ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
    //   ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
    //   ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
    //   ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
    // ]));

    this.$().on('click', '.btn-edit', e => {
      const id = $(e.currentTarget).attr('data-id');

      get(this, 'router').transitionTo(get(this, 'editRoute'), id);
    });

    this.$().on('click', '.btn-delete', e => {
      const id = $(e.currentTarget).attr('data-id');

      console.log('Excluindo... ', id);
    });

    if (get(this, 'url')) {
      this.gridFromServer();
      return;
    }

    if (get(this, 'data')) {
      this.gridFromData();
      return;
    }

    throw Error('Nenhuma informação passada para os atributos data ou url.');
  }

});
