import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return {
            dinheiro: 10.58,
            dataChegada: new Date(),
            dataInicial: new Date(),
            dataFinal: new Date()
        };
    }

});
