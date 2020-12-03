import Component from '@ember/component';
import layout from '../templates/components/bitz-input-range';

export default Component.extend({
  layout,

  // Keslley, já coloquei pra ti o plugin e inciei ele la no template
  // pra vc ver ele só ir lá http://localhost:4200/ o nome é Range Input
  // se divirta viu, você vai ter que ver tanto a documentação do ember
  // quanto a documentação do plugin
  // pra você ver o template onde está sendo chamado esta no caminho:
  // --> /tests/dummy/app/templates/user.hbs

  // o css desse plugin é meio estranho, mas pode deixar dai, depois eu ajusto ele ;)
  // boa sorte mestre :D

  didInsertElement() {
    // você vai iniciar o plugin aqui
    // para pegar o elemento desse componente use o this.element
    // bom código, se divirta com esse cara

    console.log('Aqui inicia a brincadeira :D');
  }

});
