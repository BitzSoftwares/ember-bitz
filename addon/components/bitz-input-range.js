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
    var slider = document.getElementById('slider');
    var min = 200;
    var max = 20;
    var aux;
    console.log("Max: " + max + "Min: " + min);
    if (min > max) {
      aux = min;
      min = max;
      max = aux
    }
    console.log("Depois da troca Max: " + max + "Min: " + min);
    aux = (max - min) / 20;
    for (var i = min; i <= max; i++) {

    }

    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      snap: true,
      range: {
        // for
        'min': [min],
        '5%': [(min + aux)],
        '10%': [(min + (aux * 2))],
        '15%': [(min + (aux * 3))],
        '20%': [(min + (aux * 4))],
        '25%': [(min + (aux * 5))],
        '30%': [(min + (aux * 6))],
        '35%': [(min + (aux * 7))],
        '40%': [(min + (aux * 8))],
        '45%': [(min + (aux * 9))],
        '50%': [(min + (aux * 10))],
        '55%': [(min + (aux * 11))],
        '60%': [(min + (aux * 12))],
        '65%': [(min + (aux * 13))],
        '70%': [(min + (aux * 14))],
        '75%': [(min + (aux * 15))],
        '80%': [(min + (aux * 16))],
        '85%': [(min + (aux * 17))],
        '90%': [(min + (aux * 18))],
        '95%': [(min + (aux * 19))],
        'max': max
      },
    });
    var teste
    var snapValues = [

      document.getElementById('slider-lower'),
      document.getElementById('slider-upper'),
      teste = document.getElementById('slider-upper'),

      document.getElementById('cu-de-aperta-salame').value = teste
    ]
    console.log(slider.noUiSlider.get());
    slider.noUiSlider.on('update', function (values, handle) {
      snapValues[handle].innerHTML = values[handle];
    });
    var nonLinearStepSliderValueElement = document.getElementById('slider-value');
    slider.noUiSlider.on('update', function (values) {
      nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
    });

    var cu = document.getElementById('cu-de-aperta-salame');
    slider.noUiSlider.on('update', function (values) {
      cu.innerHTML = values;
    })

    // console.log('Aqui inicia a brincadeira :D');
  }

});
