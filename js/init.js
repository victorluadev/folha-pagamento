(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

jQuery(document).ready(function ($) {

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

  // Gerando dados padrão
  function padraoFuncionario() {
    funcionarios = {
      0: {
        "nome": "Ricardo",
        "bruto": "3000",
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

  function loopFuncionario(f) {
    for (let i = 0; i < 20; i++) {
      if(f[i] != undefined){
        mostrarFuncionario(f[i].nome, f[i].bruto, f[i].dep);
      }else{
        return i;
      }     
    }
  };

  function mostrarFuncionario(nome, bruto, dep) {
    html = "<tr>";
    html += "<td>" + nome + "</td>";
    html += "<td>" + bruto + "</td>";
    html += "<td>" + dep + "</td>";
    html += "</tr>";

    $("#resultados > div > table > tbody ").append(html)
  };
});
