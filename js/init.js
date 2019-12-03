(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

jQuery(document).ready(function ($) {
  $("form").submit(function (event) {
    console.log($(this).serializeArray());
    novo = $(this).serializeArray();
    gravarFuncionario(novo);
  });

  function gravarFuncionario(f){
    nome = f[0].value;
    bruto = f[1].value;
    dep = f[2].value;
    vamos = {
        "nome": nome,
        "bruto": bruto,
        "dep": dep
      };

    let x = localStorage.length + 1;
    localStorage[x] = JSON.stringify(vamos);
  }

  // Tentando pegar dados passados
  try{

    if( (localStorage[0] == null) && (localStorage[1] == null) ) {
      comecarFuncionario();
    }
    console.log("Ta tudo certo");
    loopFuncionario();
  }catch(e){
    comecarFuncionario();
  };
  
  // Gerando dados padrão
  function comecarFuncionario(){
    funcionarios ={ 
        "nome": "Ricardo",
        "bruto": "3500",
        "dep": "2"
      };
    localStorage.setItem(0, JSON.stringify(funcionarios));
    funcionarios = {
        "nome": "Sabrina",
        "bruto": "9000",
        "dep": "1"
      };
    localStorage.setItem(1, JSON.stringify(funcionarios));
    console.log("Salvando funcionarios padrão no LocalStorage");
  }

  // Buscando funcionarios
  function loopFuncionario(){
    for (let i = 0; i <= localStorage.length; i++) {
      mostrarFuncionario(JSON.parse(localStorage[i]));      
    }
    console.log("Loop de apresentação feito");
  }

  // Apenas imprimir os funcionarios na tabela
  function mostrarFuncionario(f) {
    inss = calculoINSS(f.bruto);
    irrf = calculoIRRF(f.bruto, inss);
    liquido = f.bruto - inss - irrf;

    html = "<tr>";
    html += "<td>" + f.nome + "</td>";
    html += "<td>" + f.bruto + "</td>";
    html += "<td>" + f.dep + "</td>";
    html += "<td>" + inss + "</td>";
    html += "<td>" + irrf + "</td>";
    html += "<td>" + liquido + "</td>";
    html += "</tr>";

    $("#resultados > div > table > tbody ").append(html)
  };

  // Calculo feito a parti da tabela do contribuinte
  function calculoINSS(n) {
    if (n <= 1399.12) {
      return n * 0.08;
    }
    if ((n >= 1399.12) && (n <= 2331.88)) {
      return n * 0.09;
    }
    if ((n >= 2331.88) && (n <= 4663.75)) {
      return n * 0.11;
    }
  }

  function calculoIRRF(salario, inss) {
    faixa = salario - inss;
    return tabelaIRRF(faixa);
  }

  function tabelaIRRF(valor) {
    if (valor <= 1903.98) {
      return 0;
    }
    if ((valor >= 1903.99) && (valor <= 2826.65)) {
      return valor * 0.0750 - 142.80;
    }
    if ((valor >= 2826.65) && (valor <= 3751.05)) {
      return valor * 0.15 - 354.80;
    }
    if ((valor >= 3751.05) && (valor <= 4664.68)) {
      return valor * 0.2250 - 636.13;
    }
    if ((valor >= 4664.68) && (valor <= 2826.65)) {
      return valor * 0.2750 - 869.36;
    }
  }
});
