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
    gravandoFuncionario(novo);
  });

  function gravandoFuncionario(f) {
    // transformando em string novamente
    str = JSON.stringify(funcionarios);
    // usando regex para pegar o ultimo } e paga-lo
    //localStorage['funcionarios'] = str.replace(/}$/g, ", ");
    str = str.replace(/}$/g, ", ");
    // contando quantos funcionarios salvo tem
    ultimo = countFuncionario(funcionarios);
    ultimo += 1;
    nome = f[0].value;
    bruto = f[1].value;
    dep = f[2].value;
    // nova string para adicionar um novo funcionario
    vamos = {
      ultimo: {
        "nome": nome,
        "bruto": bruto,
        "dep": dep
      }
    };

    vamos = JSON.stringify(vamos);
    vamos = vamos.replace(/}$/g, "");
    vamos = vamos.replace(/^{/g, "");
    localStorage['funcionarios'] = str + vamos + "}";
  }
  // Tentando pegar dados passados
  try {
    if (localStorage.getItem("funcionarios") == null) {
      padraoFuncionario();

      funcionarios = JSON.parse(localStorage.getItem("funcionarios"));
      console.log("Funcionarios recuperados pelo LocalStorage");
      console.table(funcionarios);
    }
  } catch (e) {
    padraoFuncionario();
  }

  // function comecarFuncionario(){
  //   funcionarios = {
  //     0: {
  //       "nome": "Ricardo",
  //       "bruto": "3500",
  //       "dep": "2"
  //     }
  //   };
  //   localStorage.setItem(0, JSON.stringify(funcionarios));
  //   funcionarios = {
  //     1: {
  //       "nome": "Sabrina",
  //       "bruto": "9000",
  //       "dep": "1"
  //     }
  //   };
  //   localStorage.setItem(2, JSON.stringify(funcionarios));
  //   console.log("Salvando funcionarios padrão no LocalStorage");
  // }

  // Gerando dados padrão
  function padraoFuncionario() {
    funcionarios = {
      0: {
        "nome": "Ricardo",
        "bruto": "3500",
        "dep": "2"
      },
      1: {
        "nome": "Sabrina",
        "bruto": "9000",
        "dep": "1"
      }
    };

    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    console.log("Salvando funcionarios padrão no LocalStorage");
    console.table(funcionarios);
  }

  // Começando de verdade a logica
  // var funcionarios = JSON.parse(localStorage.getItem("funcionarios"));
  var funcionarios = JSON.parse(localStorage["funcionarios"]);
  loopFuncionario(funcionarios);

  // Loop para achar a quantidade de indices/funcionarios que tem na array
  // um arranjo tecnico pois o JSON.parse tem um problema com converção
  function loopFuncionario(f) {
    for (let i = 0; i < 10; i++) {
      if (f[i] != undefined) {
        mostrarFuncionario(f[i]);
      } else {
        return i;
      }
    }
  };

  function countFuncionario(f) {
    for (let i = 0; i < 10; i++) {
      if (f[i] != undefined) {
        console.log(i + "º Funcionario")
      } else {
        return i;
      }
    }
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
