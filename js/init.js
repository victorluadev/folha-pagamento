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

  // Salvando no localStorage
  function gravarFuncionario(f) {
    nome = f[0].value;
    bruto = f[1].value;
    dep = f[2].value;
    vamos = {
      "nome": nome,
      "bruto": bruto,
      "dep": dep
    };

    let x = localStorage.length;
    localStorage.setItem(x, JSON.stringify(vamos));
  }

  // Deletando o funcionário selecionado na tabela
  function excluirFuncionario(func) {
    localStorage.removeItem(func);
  }

  // Tentando pegar dados passados
  try {
    if ((localStorage[0] == null) && (localStorage[1] == null)) {
      //comecarFuncionario();
    }
    console.log("Ta tudo certo");
    loopFuncionario();
  } catch (e) {
    //comecarFuncionario();
  };

  // Gerando dados padrão
  function comecarFuncionario() {
    funcionarios = {
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
  // Segundo parâmetro para identificar o funcionário a ser excluido
  function loopFuncionario() {
    for (let i = 0; i <= localStorage.length; i++) {
      if(localStorage[i] != null) {
        mostrarFuncionario(JSON.parse(localStorage[i]),localStorage.key(i));
      }
    }
    console.log("Loop de apresentação feito");
    //mostrarTabela();
  }

  // function mostrarTabela(){
  //   for (let i = 0; i <= localStorage.length; i++) {
  //     f = JSON.parse(localStorage[i]);
  //     bruto += f.bruto;
  //     dep += f.dep;
  //     inss += calculoINSS(f.bruto);
  //     irrf += calculoIRRF(f.bruto, calculoINSS(f.bruto));
  //     inssPatri += calculoInssPatri(f.bruto);
  //     guiaInss += calculoGuiaInss(f.bruto);
  //     fgts += calculoFGTS(f.bruto);
  //     liquido += f.bruto - calculoINSS(f.bruto) - calculoIRRF(f.bruto, calculoINSS(f.bruto));
  //   }
    
  //     html = "<tr><b>";
  //     html += "<td></td>";
  //     html += "<td>" + bruto + "</td>";
  //     html += "<td>" + dep + "</td>";
  //     html += "<td>" + inss + "</td>";
  //     html += "<td>" + irrf + "</td>";
  //     html += "<td>" + inssPatri + " (" + guiaInss + ")</td>";
  //     html += "<td>" + fgts + "</td>";
  //     html += "<td>" + liquido + "</td>";
  //     html += "</b></tr>";

  //     $("#resultados > div > table > tbody ").append(html)
    
  // }

  // var total = {
  //   bruto: 0,
  //   dep: 0,
  //   inss: 0,
  //   irrf: 0,
  //   inssPatri: 0,
  //   guiaInss: 0,
  //   fgts: 0,
  //   liquido: 0
  // }

  // var total = [0, 0, 0, 0, 0, 0, 0, 0];

  // function mostrarTabela() {
  //   html = "<tr><b>";
  //   html += "<td></td>";
  //   html += "<td>" + total[0] + "</td>";
  //   html += "<td>" + total[1] + "</td>";
  //   html += "<td>" + total[2] + "</td>";
  //   html += "<td>" + total[3] + "</td>";
  //   html += "<td>" + total[4] + " (" + total[5] + ")</td>";
  //   html += "<td>" + total[6] + "</td>";
  //   html += "<td>" + total[7] + "</td>";
  //   html += "</b></tr>";

  //   $("#resultados > div > table > tbody ").append(html)
  // }

  // function totalTabela(f) {
  //   total[0] += f.bruto;
  //   total[1] += f.dep;
  //   total[2] += calculoINSS(f.bruto);
  //   total[3] += calculoIRRF(f.bruto, calculoINSS(f.bruto));
  //   total[4] += calculoInssPatri(f.bruto);
  //   total[5] += calculoGuiaInss(f.bruto);
  //   total[6] += calculoFGTS(f.bruto);
  //   total[7] += f.bruto - calculoINSS(f.bruto) - calculoIRRF(f.bruto, calculoINSS(f.bruto));

  //   console.log("Total inscrementado");
  // }

  // total["bruto"] = 0;
  // total["dep"] = 0;
  // total["inss"] = 0;
  // total["irrf"] = 0;
  // total["inssPatri"] = 0;
  // total["guiaInss"] = 0;
  // total["fgts"] = 0;
  // total["liquido"] = 0;

  // function mostrarTabela(total) {
  //   html = "<tr><b>";
  //   html += "<td></td>";
  //   html += "<td>" + total.bruto + "</td>";
  //   html += "<td>" + total.dep + "</td>";
  //   html += "<td>" + total.inss + "</td>";
  //   html += "<td>" + total.irrf + "</td>";
  //   html += "<td>" + total.inssPatri + " (" + total.guiaInss + ")</td>";
  //   html += "<td>" + total.fgts + "</td>";
  //   html += "<td>" + total.liquido + "</td>";
  //   html += "</b></tr>";

  //   $("#resultados > div > table > tbody ").append(html)
  // }

  // function totalTabela(f) {
  //   total.bruto += f.bruto;
  //   total.dep += f.dep;
  //   total.inss += calculoINSS(f.bruto);
  //   total.irrf += calculoIRRF(f.bruto, calculoINSS(f.bruto));
  //   total.inssPatri += calculoInssPatri(f.bruto);
  //   total.guiaInss += calculoGuiaInss(f.bruto);
  //   total.fgts += calculoFGTS(f.bruto);
  //   total.liquido += f.bruto - calculoINSS(f.bruto) - calculoIRRF(f.bruto, calculoINSS(f.bruto));

  //   console.log("Total inscrementado");
  // }

  // Apenas imprimir os funcionarios na tabela
  function mostrarFuncionario(f,id) {
    bruto = accounting.formatMoney(f.bruto, "R$", 2, ".", ",");
    inss = accounting.formatMoney(calculoINSS(f.bruto), "R$", 2, ".", ",");
    irrf = accounting.formatMoney(calculoIRRF(f.bruto, calculoINSS(f.bruto)), "R$", 2, ".", ",");
    liquido = f.bruto - calculoINSS(f.bruto) - calculoIRRF(f.bruto, calculoINSS(f.bruto));
    liquido = accounting.formatMoney(liquido, "R$", 2, ".", ",");
    inssPatri = accounting.formatMoney(calculoInssPatri(f.bruto), "R$", 2, ".", ",");
    fgts = accounting.formatMoney(calculoFGTS(f.bruto), "R$", 2, ".", ",");
    guiaInss = accounting.formatMoney(calculoGuiaInss(f.bruto), "R$", 2, ".", ",");

    html = '<tr>';
    html += "<td>" + f.nome + "</td>";
    html += "<td>" + bruto + "</td>";
    html += "<td>" + f.dep + "</td>";
    html += "<td>" + inss + "</td>";
    html += "<td>" + irrf + "</td>";
    html += "<td>" + inssPatri + " (" + guiaInss + ")</td>";
    html += "<td>" + fgts + "</td>";
    html += "<td>" + liquido + "</td>";
    html += '<td><a class="btn-floating btn-large red" id="'+ id +'"><i class="material-icons">delete</i></a> </td>';
    html += "</tr>";

    $("#resultados > div > table > tbody ").append(html)
  };

  $("tr > td > a").click(function(){
    $(this).closest("tr").remove();
    let func = $(this).attr('id');
    excluirFuncionario(func);
  });
  
  

  // Calculo feito a partir da tabela do contribuinte
  function calculoFGTS(valor) {
    return valor * 0.08;
  }
  function calculoGuiaInss(valor) {
    base = calculoINSS(valor) + calculoInssPatri(valor);
    rat = (calculoINSS(valor) + calculoInssPatri(valor)) * 0.2;
    outros = (calculoINSS(valor) + calculoInssPatri(valor)) * 0.058;
    return base + rat + outros;
  }
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

    return n * 0.11;
  }

  function calculoInssPatri(valor) {
    if (valor <= 678) {
      return valor * 0.11;
    }
    if ((valor >= 678) && (valor <= 4159)) {
      return valor * 0.20;
    }

    return valor * 0.20;
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

    return valor * 0.2750 - 869.36;
  }
});
