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

    let x = localStorage.length;
    localStorage[x] = JSON.stringify(vamos);
  }

  function excluirFuncionario(f){
    localStorage.removeItem(f);
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
  function loopFuncionario(){
    for (let i = 0; i <= localStorage.length; i++) {
      mostrarFuncionario(JSON.parse(localStorage[i]));      
    }
    console.log("Loop de apresentação feito");
  }

  // Apenas imprimir os funcionarios na tabela
  function mostrarFuncionario(f) {
    bruto = accounting.formatMoney(f.bruto, "R$", 2, ".", ",");
    inss = accounting.formatMoney(calculoINSS(f.bruto), "R$", 2, ".", ",");
    irrf = accounting.formatMoney(calculoIRRF(f.bruto, calculoINSS(f.bruto)), "R$", 2, ".", ",");
    liquido = parseFloat(f.bruto) - calculoINSS(f.bruto) - calculoIRRF(f.bruto, calculoINSS(f.bruto));
    liquido = accounting.formatMoney(liquido, "R$", 2, ".", ",");
    inssPatri = accounting.formatMoney(calculoInssPatri(f.bruto), "R$", 2, ".", ",");
    fgts = accounting.formatMoney(calculoFGTS(f.bruto), "R$", 2, ".", ",");
    guiaInss = accounting.formatMoney(calculoGuiaInss(f.bruto), "R$", 2, ".", ",");

    html = "<tr>";
    html += "<td>" + f.nome + "</td>";
    html += "<td>" + bruto + "</td>";
    html += "<td>" + f.dep + "</td>";
    html += "<td>" + inss + "</td>";
    html += "<td>" + irrf + "</td>";
    html += "<td>" + inssPatri + " (" + guiaInss + ")</td>";
    html += "<td>" + fgts + "</td>";
    html += "<td>" + liquido + "</td>";
    html += "</tr>";

    $("#resultados > div > table > tbody ").append(html)
  };

  // Calculo feito a parti da tabela do contribuinte
  function calculoFGTS(valor){
    return valor * 0.08;
  }
  function calculoGuiaInss(valor){
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

  function calculoInssPatri(valor){
    if (valor <= 678){
      return valor * 0.11;
    }
    if ((valor >= 678) && (valor <= 4159)){
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
