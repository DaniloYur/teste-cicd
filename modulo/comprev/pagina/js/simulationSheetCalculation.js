$(function(){
  $('#numCpf').mask('000.000.000-00');

  $("#calculo-judicial").css("display","none");
  $("#revisao-adm").css("display","none");

  $("#h2simulacao").css("display","none");
  $("#divSimulacao").css("display","none");
  $("#divBotaoCriarSimulacao").css("display","none");

  $("#cod_motivo_simulacao").change(function(){
    
    if ($(this).val() =="1"){
      $("#calculo-judicial").css("display","");
      $("#revisao-adm").css("display","none");
    } else if ($(this).val() =="2") {
      $("#calculo-judicial").css("display","none");
      $("#revisao-adm").css("display","");
    } else {
      $("#calculo-judicial").css("display","none");
      $("#revisao-adm").css("display","none");
    }
  });

  $("#novaSimulacao").click(function(){
      $("#simulacao").css("display","");
      $("#divSimulacao").css("display","");
      $("#divBotaoCriarSimulacao").css("display","");
  });
});

var urlBackendBeneficiario                               = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/beneficiarios/resumo/lista"
var urlBackendCalculoFolhaCriar                          = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/criar"
var urlBackendCalculoFolhaListaSimulacoes                = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/lista"
var urlBackendCalculoFolhaListaSimulacoesPorBeneficiario = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/listaSimulacoesPorBeneficiario"
var urlBackendCalculoFolhaBeneficiarioCriar              = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacaoBeneficiario/criar"

const PAGINA_CONSULTA_DETALHADA  = urlDominioFrontEnd + urlContextoFrontEnd + 'componenteGenerico/html/consultaDetalhadaGenerica.html';

var urlParams = new URLSearchParams(window.location.search)

$(document).ready(function() {

  $('#numCpf').val(urlParams.get("pf.num_cpf"));
  $('#cover-spin').show(0);

  window.onload = initPage();

  $('#btnConsultar').click(function() {
    var cpf = $('#numCpf').val();
    var cpfReplace = cpf.replace(/\D/g,'');
    $('#numCpf').val(cpfReplace)

    var url2 = urlBackendBeneficiario                  +   
      "?pf.num_cpf="      + $('#numCpf').val()         +
      "&protocolo="       + $('#numProtocolo').val()   +
      "&matricula="       + $('#numMatriculaRF').val() +
      "&cb.cod_beneficio_ext="       + $('#numProtocolo').val() +
      "&a.cod_beneficio=" + $('#numBeneficio').val();
      
      let settings = {
        "async": false,
        "crossDomain": true,
        "url": url2,
        "method": "GET",
        "headers": {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        }
      }
      let JSONData = {};
      $.ajax(settings).done(function (response) {
          //JSONData = response;
      });

  });

  $('#btnLimpar').click(function() {
    location.href = 'simulationSheetCalculation.html';
  })

  function listaSimulacoesPorBeneficiario(cod_ide_cliiii) {
    var urlLista = urlBackendCalculoFolhaListaSimulacoesPorBeneficiario + "?cod_ide_cli=" + cod_ide_cliiii
    // alert('linha 67-> ' + urlLista)

    $.ajax({
      url: urlLista,
      success: function(data) {
        console.log(data);
      }
    });
  }

  function initPage() {
    var uri = document.baseURI;
    //console.log(uri);
    var indexUri = uri.indexOf('?'); // pegar os parametros da uri
    //console.log(indexUri);
    var params = uri.substring(++indexUri, uri.length); // recupera parametros da uri
    //console.log(params);
    var urlCompleta = urlBackendBeneficiario + "?" + params;
    //console.log(urlCompleta);

    var cod_ide_cli = '';
    var cod_tipo_beneficio = '';
    
    //inicio ajax
    $.ajax({ 
      url: urlCompleta, 
      success: function(data) {
        //console.log(data);

        if (data == '') {
          tr = $('<tr/>');
          tr.append("Sem dados para exibir!");
          $('#tableResumo').append(tr);
        }
        var encontrouSimulacoes = false;
        for (var jsonData in data) {
          // formatação das datas
          if (data[jsonData].DAT_INI_BEN != null) {
            var a = data[jsonData].DAT_INI_BEN.substring(0,10);
            var DAT_INI_BEN = a.split('-').reverse().join('-');
          }

          if (data[jsonData].DAT_FIM_BEN != null) {
            var b = data[jsonData].DAT_FIM_BEN.substring(0,10);
            var DAT_FIM_BEN = b.split('-').reverse().join('-');
          } else {
            DAT_FIM_BEN = "";
          }

          if (data[jsonData].DAT_ULT_PAGTO != null) {
            var c = data[jsonData].DAT_ULT_PAGTO.substring(0,10);
            var DAT_ULT_PAGTO = c.split('-').reverse().join('-');
          }

          var NUM_CPF = data[jsonData].NUM_CPF;
          cod_ide_cli = data[jsonData].COD_IDE_CLI;
          var NUM_CPF_FORMAT = NUM_CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

          // GRID - RESUMO DE DADOS DO BENEFICIÁRIO
          tr = $('<tr/>');
            if (jsonData == 0) {
              tr.append("<td><input type=\"radio\" name=\"opcaoBeneficio\" value=\""+data[jsonData].COD_BENEFICIO+"\" checked=\"checked\"> </td>");
            } else {
              tr.append("<td><input type=\"radio\" name=\"opcaoBeneficio\" value=\""+data[jsonData].COD_BENEFICIO+"\">     </td>");
            }            
            tr.append("<td>" + NUM_CPF_FORMAT                                                                         + "</td>");
            tr.append("<td>" + data[jsonData].COD_BENEFICIO                                                           + "</td>");
            tr.append("<td>" + data[jsonData].DES_TIPO_BENEFICIO                                                      + "</td>");
            tr.append("<td>" + data[jsonData].TIPO_CONCESSAO                                                          + "</td>");
            tr.append("<td>" + (data[jsonData].DES_FUNDAMENTO_LEGAL ? data[jsonData].DES_FUNDAMENTO_LEGAL : '')       + "</td>");
            tr.append("<td>" + (data[jsonData].DES_TIPO_CALCULO ? data[jsonData].DES_TIPO_CALCULO : '')               + "</td>");
            tr.append("<td>" + data[jsonData].VAL_PERCENT_BENEFICIO +"%"                                              + "</td>");
            tr.append("<td>" + DAT_INI_BEN                                                                            + "</td>");
            tr.append("<td>" + DAT_FIM_BEN                                                                            + "</td>");
            tr.append("<td>" + data[jsonData].DES_STATUS                                                              + "</td>");
            tr.append("<td>" + (data[jsonData].DES_MOTIVO ? data[jsonData].DES_MOTIVO : '')                           + "</td>");
            tr.append("<td>" + DAT_ULT_PAGTO                                                                          + "</td>");
            tr.append("<td>" + data[jsonData].VAL_BRUTO_ULT_PAGTO                                                     + "</td>");
          $('#tableResumo').append(tr);
          
          var encontrouSimulacoesAux = listarSimulacoes(data[jsonData].COD_IDE_CLI, data[jsonData].COD_BENEFICIO, data[jsonData].DES_TIPO_BENEFICIO);
          cod_tipo_beneficio = data[jsonData].COD_TIPO_BENEFICIO;
          if (encontrouSimulacoesAux == true) {
            encontrouSimulacoes = true;
          }

          //listaSimulacoesPorBeneficiario(data[jsonData].COD_IDE_CLI);
          dados(data[jsonData].COD_IDE_CLI, data[jsonData].COD_BENEFICIO)
          $('#numCpf').val(NUM_CPF_FORMAT);
          $('#numBeneficio').val(data[jsonData].COD_BENEFICIO);
          $('#numProtocolo').val(data[jsonData].COD_BENEFICIO);
        }
        
        //if (!encontrouSimulacoes) {
         // tr = $('<tr/>');
         // tr.append("Sem dados para exibir!");
         // $('#tableSimulacao').append(tr);
        //}

      }




    }) 
    
    
    
    // fim $.ajax()

    function listarSimulacoes(cod_ide_cli, cod_beneficio, des_tipo_beneficio) {
      cod_ide_cliiii = cod_ide_cli
      var encontrouRegistro = false;
      $.ajax({ 
        url: urlBackendCalculoFolhaListaSimulacoesPorBeneficiario + "?cod_ide_cli=" + cod_ide_cli + "&cod_beneficio="+ cod_beneficio, 
        success: function(data) {
          console.log(data);
          for (var jsonData in data) {
            // formatação das datas
            if (data[jsonData].DAT_SIMULACAO != null || data[jsonData].DAT_SIMULACAO != undefined) {
              encontrou = true;
              function adicionarZero(numero) {
                if (numero <= 9) 
                    return "0" + numero;
                else
                    return numero; 
              }
              var datas = new Date(data[jsonData].DAT_SIMULACAO);
              var DAT_SIMULACAO = ((adicionarZero(datas.getDate()) )) + "/" + ((adicionarZero(datas.getMonth() + 1))) + "/" + datas.getFullYear() + ' ' 
                + adicionarZero(datas.getHours()) + ':' + adicionarZero(datas.getMinutes())  + ':' + adicionarZero(datas.getSeconds()); 
            }
  
            // verificar o motivo da simulação
            var motivo = '';
              if (data[jsonData].COD_MOTIVO_SIMULACAO == 1) {
                motivo = 'C\u00e1lculos Judiciaiss';
              } else {
                motivo = 'Revis\u00e3o Administrativa';
              }
  
            // GRID - LISTA DE SIMULAÇÕES
            tr = $('<tr/>');
              tr.append("<td>" + data[jsonData].COD_SIMULACAO                                                       + "</td>");
              tr.append("<td>" + DAT_SIMULACAO                                                                      + "</td>");
              tr.append("<td>" + motivo                                                                             + "</td>");
              tr.append("<td>" + (data[jsonData].COD_MOTIVO_SIMULACAO == 2 ? (data[jsonData].NUM_PROTOCOLO     == null || data[jsonData].NUM_PROTOCOLO     == '' ? '' : data[jsonData].NUM_PROTOCOLO) : '') 
                               + (data[jsonData].COD_MOTIVO_SIMULACAO == 1 ? (data[jsonData].NUM_PROC_JUDICIAL == null || data[jsonData].NUM_PROC_JUDICIAL == '' ? '' : data[jsonData].NUM_PROC_JUDICIAL) : '') + "</td>");
              tr.append("<td class=\"pesquisar\"><a href=\""+urlDominioFrontEnd+urlContextoFrontEnd+"/modulo/comprev/pagina/html/simulation.html?cod_beneficio="+data[jsonData].COD_BENEFICIO + "&cod_simulacao=" +data[jsonData].COD_SIMULACAO + "&cod_ide_cli=" + data[jsonData].COD_IDE_CLI + "&cod_motivo_simulacao=" + data[jsonData].COD_MOTIVO_SIMULACAO  + "&cod_entidade=" + data[jsonData].COD_ENTIDADE + "&num_cpf=" + data[jsonData].NUM_CPF + "&des_tipo_beneficio=" + des_tipo_beneficio + "&cod_tipo_beneficio=" + cod_tipo_beneficio + "\" target=\"_blank\"><i class=\"fa fa-search\" aria-label=\"Pesquisa\"></i></a></td>");                 
            $('#tableSimulacao').append(tr);
            encontrouRegistro = true
          }
        }
      }) // fim $.ajax()
      return encontrouRegistro;
    }

    /*
    var url2 = urlBackendBeneficiario;
    $.ajax({
      url: url2,
      success: function(data) {
        console.log(data);
      }
    })
    */

    setTimeout(function(){ 
      $('#cover-spin').hide(0);
    }, 3000);    

  } // fim initPage()

  var _cod_ide_cli = '';
  var _codBeneficio = '';
  function dados(codIdeCli, codBeneficio) {
    _cod_ide_cli  = codIdeCli
    _codBeneficio = codBeneficio
  }

  $('#btnCriarSimulacao').click(function() {
    var url = urlBackendCalculoFolhaCriar;

    let cod_tipo_efeito_judicial_lista = [];

    jQuery('.comboTiposEfeitosJudiciais').each(function() {
      var currentElement = $(this);
      var value = currentElement.val();
      //console.log('value: ');
      //console.log(value);
      if(jQuery.inArray(value, cod_tipo_efeito_judicial_lista) == -1) {
          cod_tipo_efeito_judicial_lista.push(value);
      }
    });
    //console.log(cod_tipo_efeito_judicial_lista);
    var matriz = {
      cod_ins                        : 1,
      cod_motivo_simulacao           : $('#cod_motivo_simulacao').val(),
      num_protocolo                  : $('#num_protocolo').val(),
      observacao                     : $('#observacao').val(),
      dat_ult_atu                    : $('#dat_ult_atu').val(),
      nom_usu_ult_atu                : 'THIAGO',
      nom_pro_ult_atu                : 'MANUAL',
      num_proc_judicial              : $('#num_proc_judicial').val(),
      nom_autor                      : $('#nom_autor').val(),
      nom_interessado                : $('#nom_interessado').val(),
      des_objeto                     : $('#des_objeto').val(),
      cod_tipo_efeito_judicial_lista : JSON.stringify(cod_tipo_efeito_judicial_lista)
    };

    console.log(matriz);
    
    var settings = {
      "async": false,
      "crossDomain": true,
      "processData": false,
      "url": url,
      "method": "POST",
      "headers": {
          "Cache-Control" : "no-cache"
        , "Content-Type"  : "application/json"
        , "tokenSigeprev" : getCookieSigeprev("tokenSigeprev")
      },  
      "data": JSON.stringify(matriz),
      "statusCode": {
        201: function() {
          $('#btnConsultar').click();
        },
        404: function() {
          alert('Requisução não encontrada!')
        },
        500: function() {
          alert('Ocorreu um erro interno no servidor!')
        }
      }    
    };

    $.ajax(settings).done(function (response) {
      console.log(response);

      associar(_cod_ide_cli, _codBeneficio, response);
      console.log(_cod_ide_cli);
      console.log(_codBeneficio);
      console.log(response);
    });
  });

  // --- Associar uma simulação ao beneficiario
  function associar(_cod_ide_cli, _codBeneficio, response) {
    var pfNum_cpf;

    var uri = window.location.href;
    var url = new URL(uri);
    pfNum_cpf = url.searchParams.get("pf.num_cpf"); // recupera o parametro cpf da uri
    var cpf = $('#numCpf').val(pfNum_cpf);

    var UrlSimulacaoBeneficiario = urlBackendCalculoFolhaBeneficiarioCriar;

    var _vCodBeneficio = _codBeneficio;
    if ($('input[name=opcaoBeneficio]:checked').val() != '') {
      _vCodBeneficio = $('input[name=opcaoBeneficio]:checked').val();
    }
    var matriz = {
      cod_simulacao         : response.id,
      cod_ins               : 1,
      cod_beneficio         : _vCodBeneficio,
      cod_ide_cli           : _cod_ide_cli,
      dat_ult_atu           : null,
      nom_usu_ult_atu       : 'THIAGO',
      nom_pro_ult_atu       : 'MANUAL',
    };

    console.log(matriz);
    console.log(JSON.stringify(matriz));

    var settings = {
      "async": false,
      "crossDomain": true,
      "processData": false,
      "url": UrlSimulacaoBeneficiario,
      "method": "POST",
      "headers": {
        "Cache-Control": "no-cache"
        ,"Content-Type" : "application/json"
        , "tokenSigeprev" : getCookieSigeprev("tokenSigeprev")
      },
      "data": JSON.stringify(matriz),
      "statusCode": {
        201: function() {
         $('#btnConsultar').click();
        },
        404: function() {
          alert('Requisução não encontrada!')
        },
        500: function() {
          alert('Ocorreu um erro interno no servidor!')
        }
      }    
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

});

var urlBackendListarCriterios               = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/calculo/folha/simulacoes/listarTiposEfeitosJudiciais";
function carregaComboTiposEfeitos(idObjectToRender) {
  $.getJSON(urlBackendListarCriterios, function (dados) {
    //console.log(dados);
    if (dados.length > 0) {
      $('#'+idObjectToRender).children().remove();
      var option = '<option> Selecione</option>';
      $(option).appendTo('#'+idObjectToRender);
      $.each(dados, function (key, value) { 
        option = '<option value="' + value.CHAVE + '">' + value.VALOR + '</option>';
        $(option).appendTo('#'+idObjectToRender);
      });
    } else {
      $('#erro').html('<span class="mensagem">Não foram encontrados tipos de efeitos!</span>');
    }
  });
}
carregaComboTiposEfeitos('combo_tipos_efeitos_judiciais');

let efeitoJudicialCounter = 0;
function adicionarTipoEfeitoJudicial() {
  if (($('select[name="combo_tipos_efeitos_judiciais"]').length) < ($('#combo_tipos_efeitos_judiciais > option').length-1)) {
    efeitoJudicialCounter++;
    var htmlToAppend = `<div class="form-group" id="formGroupId`+efeitoJudicialCounter+`">
                            <label for="" class="control-label col-sm-2"></label>
                            <div class="col-sm-3">
                              <select id="combo_tipos_efeitos_judiciais`+efeitoJudicialCounter+`" name="combo_tipos_efeitos_judiciais" class="form-control comboTiposEfeitosJudiciais">
                              </select>
                            </div>
                            <div class="col-sm-1">
                                <a onclick="javascript:removerTipoEfeitoJudicial('formGroupId`+efeitoJudicialCounter+`');"><i class="fas fa-minus-circle fa-2x" style="color: red;"></i></a>
                            </div>
                        </div>
                        `;

    $('#tiposEfeitosJudiciais').append(htmlToAppend);
    carregaComboTiposEfeitos('combo_tipos_efeitos_judiciais'+efeitoJudicialCounter);
  }
}

function removerTipoEfeitoJudicial(idObjectToRemove) {
   $('#'+idObjectToRemove).remove();
}
  
function abrirTelaConsultaDetalhada(){
    window.open(PAGINA_CONSULTA_DETALHADA,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function carregarNumCpfPelaConsultaDetalhada(_numCpf) {
    document.getElementById('numCpf').value = _numCpf;
    $('#btnConsultar').click();   
}

function limpar() {

}