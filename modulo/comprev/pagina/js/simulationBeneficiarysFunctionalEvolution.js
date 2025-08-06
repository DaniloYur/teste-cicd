function init() {

  with (document.forms[0]) {
    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
  }

  $("#journey").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
  $("#secondJourney").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
  $("#thirdJourney").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
  $("#monthYear").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
  $("#secondMonthYear").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
  $("#secondMonthYear").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
}

$(function(){
  init();
});

urlEvolucaoFuncionalBeneficiario = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/evolucaoFuncionalBeneficiario"

$(document).ready(function() {
  window.onload = initPage();

  function initPage() {
    var uri = window.location.href;
    var url = new URL(uri);
    var paramsCodIdeCliBen = url.searchParams.get("cod_ide_cli"); // recupera o parametro cod_ide_cli da uri
    var paramsCodSimulacao = url.searchParams.get("cod_simulacao"); // recupera o parametro cod_simulacao da uri

    // GET - EVOLUÇÃO FUNCIONAL BENEFICIÁRIO
    $.ajax({
      url: urlEvolucaoFuncionalBeneficiario 
        + "?cod_ide_cli_ben="   + paramsCodIdeCliBen
        + "&cod_simulacao="     + paramsCodSimulacao, 
        success: function(data) {
        
        console.log(data);
        
        if(data == '') {
          tr = $('<tr/>');
          tr.append("Sem dados para exibir!");
          $('#tableResumoResultadoProcessamento').append(tr);
        }

        for (var jsonData in data) { 
          // Convertendo as datas,
          if (data[jsonData].DAT_PROC != null || data[jsonData].DAT_PROC != undefined) {
            encontrou = true;
            function adicionarZero(numero) {
              if (numero <= 9) 
                  return "0" + numero;
              else
                  return numero; 
            }
            var datas = new Date(data[jsonData].DAT_PROC);
            var DAT_PROC = ((adicionarZero(datas.getDate()) )) + "/" + ((adicionarZero(datas.getMonth() + 1))) + "/" + datas.getFullYear() + ' ' 
              + adicionarZero(datas.getHours()) + ':' + adicionarZero(datas.getMinutes())  + ':' + adicionarZero(datas.getSeconds()); 
          }

          if (data[jsonData].DAT_COMP_BASE_PROC != null) {
            var b = data[jsonData].DAT_COMP_BASE_PROC.substring(0,10)
            var DAT_COMP_BASE_PROC = b.split('-').reverse().join('-');
          } else {
            var DAT_COMP_BASE_PROC = "";
          } 
          if (data[jsonData].DAT_ULT_PER_RECEBIDO != null) {
            var c = data[jsonData].DAT_ULT_PER_RECEBIDO.substring(0,10)
            var DAT_ULT_PER_RECEBIDO = c.split('-').reverse().join('-');
          } else {
            var DAT_ULT_PER_RECEBIDO = "";
          } 
  
          tr = $('<tr/>');
            tr.append("<td>" + DAT_PROC                             + "</td>");
            tr.append("<td>" + DAT_COMP_BASE_PROC                   + "</td>");
            tr.append("<td>" + DAT_ULT_PER_RECEBIDO                 + "</td>");
            tr.append("<td>" + data[jsonData].PORC_DIFERENCA + '%'  + "</td>");
          $('#tableResumoResultadoProcessamento').append(tr);
        }
      }
    }); // fim $.ajax()
  }
});
