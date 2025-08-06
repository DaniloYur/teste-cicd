$(function(){
/*   $("#btnRecalculation").click(function(){
    location.href = 'simulationRecalculationAverageValueConcessions.html';
  }); */
  $("#btnAccumulatedBenefits").click(function(){
    alert("Funcionalidade ainda não implementada!");
  });
});

var urlBackendBeneficiario      = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/beneficiarios/resumo/lista";
//var urlBackendBeneficiario      = "http://localhost:8082/api/v1/simulador/beneficiarios/resumo/lista";

var urlBackendResumoDadosGerais = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/resumoDadosGerais";
//var urlBackendResumoDadosGerais = "http://localhost:8082/api/v1/simulador/calculo/folha/simulacoes/resumoDadosGerais";

var urlBackendListaDeSimulacoes = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/lista";
//var urlBackendListaDeSimulacoes = "http://localhost:8082/api/v1/simulador/calculo/folha/simulacoes/lista";

var matricula = null

$(document).ready(function() {

  var urlParams = new URLSearchParams(window.location.search);

  window.onload = initPage();

  $("#btnBenefitComposition").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    /* window.open(url = 'simulationBenefitComposition.html?' + paramsUrl, '_blank'); */
    location.href = 'simulationBenefitComposition.html?' + paramsUrl;
  });
  
  $("#btnRetroactive").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationRetroactive.html?' + paramsUrl;
  });

  $("#btnProcessing").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationProcessing.html?' + paramsUrl;
  });

  $("#btnBefefits").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationBenefits.html?' + paramsUrl;
  });
  
  $("#btnEvolution").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationBeneficiarysFunctionalEvolution.html?' + paramsUrl;
  });

  $("#btnIndividualComposition").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationIndividualComposition.html?' + paramsUrl;
  });

  $("#btnAttributes").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationAttributes.html?' + paramsUrl;
  });

  $("#btnBeneficiary").click(function() {
    var uri = location.href;
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    location.href = 'simulationBeneficiary.html?' + paramsUrl;
  });
  
  var paramsUrl;
  
  function initPage() {
    var uri = document.baseURI;
    //console.log(uri);
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    paramsUrl = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    var urlCompleta = urlBackendResumoDadosGerais + "?" + paramsUrl;
    //console.log(urlCompleta);

    $.ajax({ 
      url: urlCompleta, 
      success: function(data) {
        //console.log(data);

        if (data == '') {
          tr = $('<tr/>');
          tr.append("Sem dados para exibir!");
          $('#tableResumo').append(tr);
        }
        
        for (var jsonData in data) {
          // TABELA - SIMULAÇÃO + DADOS GERAIS (RESUMO)
          var NUM_CPF = data[jsonData].NUM_CPF;
          var NUM_CPF_FORMAT = NUM_CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
          
          document.getElementById("cpf").innerHTML              = NUM_CPF_FORMAT
          document.getElementById("matricula").innerHTML        = data[jsonData].NUM_MATRICULA;
          document.getElementById("dataObito").innerHTML        = data[jsonData].DAT_OBITO;
          document.getElementById("nomeServidor").innerHTML     = data[jsonData].NOM_PESSOA_FISICA;
          document.getElementById("entidade").innerHTML         = data[jsonData].NOM_ENTIDADE;
          document.getElementById("pv").innerHTML               = data[jsonData].COD_VINCULO;

          //buscarDadosDoBeneficiario(data[jsonData].NUM_CPF);
          buscarDadosDoBeneficiario(urlParams.get("num_cpf"));
          carregarCabecalho();
        }
        matricula = data[jsonData].NUM_MATRICULA;
      }
    }) // fim $.ajax()

    function buscarDadosDoBeneficiario(num_cpf) {
      
      urlCompleta = urlBackendBeneficiario + "?pf.num_cpf=" + num_cpf + "&a.cod_beneficio=&cb.num_matricula=&cb.cod_beneficio_ext=" // melhorar isso
      //console.log(urlCompleta);
      $.ajax({ 
        url: urlCompleta, 
        success: function(data) {
          //console.log(data);
  
          if (data == '') {
            tr = $('<tr/>');
            tr.append("Sem dados para exibir!");
            $('#tableResumo').append(tr);
          }
  
          for (var jsonData in data) {
            // formatação das datas
            if (data[jsonData].DAT_INI_BEN != null || data[jsonData].DAT_INI_BEN != undefined) {
              var a = data[jsonData].DAT_INI_BEN.substring(0,10);
              var DAT_INI_BEN = a.split('-').reverse().join('-');
            }

            if (data[jsonData].DAT_FIM_BEN != null || data[jsonData].DAT_FIM_BEN != undefined) {
              var b = data[jsonData].DAT_FIM_BEN.substring(0,10);
              var DAT_FIM_BEN = b.split('-').reverse().join('-');
            }

            if (data[jsonData].DAT_ULT_PAGTO != null || data[jsonData].DAT_ULT_PAGTO != undefined) {
              var c = data[jsonData].DAT_ULT_PAGTO.substring(0,10);
              var DAT_ULT_PAGTO = c.split('-').reverse().join('-');
            }

            var NUM_CPF = data[jsonData].NUM_CPF;
            var NUM_CPF_FORMAT = NUM_CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

            // GRID - RESUMO DE DADOS DO BENEFICIÁRIO
            tr = $('<tr/>');

              if (data[jsonData].COD_BENEFICIO == urlParams.get("cod_beneficio")) {
                tr.append("<td><input type=\"radio\" name=\"opcaoBeneficio\" value=\""+data[jsonData].COD_BENEFICIO+"\" checked=\"checked\" disabled=\"disabled\"> </td>");
              } else {
                tr.append("<td><input type=\"radio\" name=\"opcaoBeneficio\" value=\""+data[jsonData].COD_BENEFICIO+"\" disabled=\"disabled\"></td>");
              }

              tr.append("<td>" + NUM_CPF_FORMAT                                                                                + "</td>");
              tr.append("<td>" + data[jsonData].COD_BENEFICIO                                                                  + "</td>");
              tr.append("<td>" + data[jsonData].DES_TIPO_BENEFICIO                                                             + "</td>");
              tr.append("<td>" + data[jsonData].TIPO_CONCESSAO                                                                 + "</td>");
              tr.append("<td>" + (data[jsonData].DES_FUNDAMENTO_LEGAL != null ? data[jsonData].DES_FUNDAMENTO_LEGAL   : ''  )  + "</td>");
              tr.append("<td>" + (data[jsonData].DES_TIPO_CALCULO != null ? data[jsonData].DES_TIPO_CALCULO   : ''  )          + "</td>");
              tr.append("<td>" + data[jsonData].VAL_PERCENT_BENEFICIO +"%"                                                     + "</td>");
              tr.append("<td>" + ( DAT_INI_BEN ? DAT_INI_BEN : '' )                                                            + "</td>");
              tr.append("<td>" + ( DAT_FIM_BEN ? DAT_FIM_BEN : '' )                                                            + "</td>");
              tr.append("<td>" + data[jsonData].DES_STATUS                                                                     + "</td>");
              tr.append("<td>" + (data[jsonData].DES_MOTIVO != null ? data[jsonData].DES_MOTIVO   : ''  )                      + "</td>");
              tr.append("<td>" + DAT_ULT_PAGTO                                                                                 + "</td>");
              tr.append("<td>" + data[jsonData].VAL_BRUTO_ULT_PAGTO                                                            + "</td>");
            $('#resumoDeDadosDoBeneficiario').append(tr);
          }
        }
      }) // fim $.ajax()
    }

    function carregarCabecalho() {
      let paramsCabecalho = {};
      paramsCabecalho.cod_simulacao = urlParametros.get("cod_simulacao");
      let jsonRetorno = consumidor.executarServico("api/v1/simulador/calculo/folha/simulacoes/lista", paramsCabecalho);

      if(jsonRetorno.length == 0){
        let tr = $('<tr/>');
        tr.append("Sem dados para exibir!");
        $('#tableResumo').append(tr);
      }else{
        let cabecalho = jsonRetorno[0];

        if (cabecalho.COD_MOTIVO_SIMULACAO == 1) {
          document.getElementById("campo1label").innerHTML = 'Motivo:';
          document.getElementById("campo2label").innerHTML = 'Autor:';
          document.getElementById("campo3label").innerHTML = 'Objeto:';
          document.getElementById("campo4label").innerHTML = 'N&#176;. Processo Judicial:';
          document.getElementById("campo5label").innerHTML = 'Interessado:';

          document.getElementById("campo1valor").innerHTML = 'Cálculos Judiciais';
          document.getElementById("campo2valor").innerHTML = cabecalho.NOM_AUTOR;
          document.getElementById("campo3valor").innerHTML = cabecalho.DES_OBJETO;
          document.getElementById("campo4valor").innerHTML = cabecalho.NUM_PROC_JUDICIAL;
          document.getElementById("campo5valor").innerHTML = cabecalho.NOM_INTERESSADO;
        } else {
          document.getElementById("campo1label").innerHTML = 'Motivo:';
          document.getElementById("campo2label").innerHTML = 'N° Protocolo'
          document.getElementById("campo3label").innerHTML = 'Observação';

          document.getElementById("campo1valor").innerHTML = 'Revisão Administrativa';
          document.getElementById("campo2valor").innerHTML = cabecalho.NUM_PROTOCOLO;
          document.getElementById("campo3valor").innerHTML = cabecalho.OBSERVACAO;
        }
      }
  }}

});