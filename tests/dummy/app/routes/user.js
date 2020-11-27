import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return {
            dinheiro: 23.375,
            dataChegada: new Date(),
            dataInicial: new Date(),
            dataFinal: new Date(),
            quantidade: 5,
        };
    }

});
