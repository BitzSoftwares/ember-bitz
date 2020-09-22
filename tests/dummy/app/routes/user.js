import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return { dinheiro: 10.0 };
    }

});
