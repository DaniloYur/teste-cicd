function init(){
  with (document.forms[0]) {

    let paramsToken = {};
    paramsToken.token = getCookieSigeprev("tokenSigeprev");
    let jsonDataToken = consumidor.executarServico("token/verificarTokenRetornandoJson", paramsToken);
    setCookieSigeprev('cookieContexto',jsonDataToken.ambiente, 1);
    setCookieSigeprev('cookieCodIns',jsonDataToken.codIns, 1);
    setCookieSigeprev('cookieLogin',jsonDataToken.login, 1);
    setCookieSigeprev('cookieNumCpfLogin',jsonDataToken.numCpfLogin, 1);

    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
  }
  //$('#periododeCompetenciadoProcesso').mask('00/0000',{placeholder: '__/____'});
}

$(function(){
  init();
});

function cancelaRegistro(_idRegistro) {
 
  matriz = {
    //num_seq: _idRegistro
  }

  var settings = {
    "async": false,
    "crossDomain": true,
    "processData": false,
    "url": urlBackendListarFolhaRetroativosDeletar+"?num_seq="+_idRegistro,
    "method": "POST",
    "headers": {
    "Cache-Control": "no-cache"
    ,"Content-Type" : "application/json"
    },
    "data": JSON.stringify(matriz),
    "statusCode": {
      200: function() {
        //alert('OK 1');
      },
      201: function() {
        //alert('OK 2');
        location.reload(true)
      },
      404: function() {
        //alert('OK 3');
        //alert('Requisução não encontrada!');
      },
      500: function() {
        //alert('OK 4');
        //alert('Ocorreu um erro interno!')
      }
    }                                
  };
  var _response = {};
  $.ajax(settings).done(function (response) {
  });  

}

var urlBackendListarFolhaRetroativos        = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/folhaRetroativos/listar";
var urlBackendListarFolhaRetroativosCriar   = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/folhaRetroativos/criar";
var urlBackendListarCriterios               = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/folhaRetroativos/listarCriterios";
var urlPeriododeProcessamento               = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/listar"
var urlBackendListarFolhaRetroativosDeletar = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/folhaRetroativos/cancelar";

$(document).ready(function() {
  window.onload = initPage();

  var paramsCod_simulacao;
  var paramsCod_beneficio;

  function initPage() {
    var uri = window.location.href;
    var url = new URL(uri);
    paramsCod_simulacao = url.searchParams.get("cod_simulacao"); // recupera o parametro cod_simulacao da uri
    paramsCod_beneficio = url.searchParams.get("cod_beneficio"); // recupera o parametro cod_beneficio da uri
    paramsCod_ide_cli   = url.searchParams.get("cod_ide_cli"); // recupera o parametro cod_ide_cli da uri
    paramsMatricula     = url.searchParams.get("matricula"); // recupera o parametro cod_ide_cli da uri

    // GET - Listar Folha Retroativos  
    $.ajax({
      url: urlBackendListarFolhaRetroativos + "?cod_simulacao=" + paramsCod_simulacao,
      success: function(data){
        console.log(data);
        if(data == '') {
          tr = $('<tr/>');
          tr.append("Sem dados para exibir!");
          $('#tableRetroativos').append(tr);
        }
        
        for (var jsonData in data) { 
          // Convertendo as datas,
          if (data[jsonData].DAT_PERIODO_PROC != null) {
            var a = data[jsonData].DAT_PERIODO_PROC.substring(0,10);
            var DAT_PERIODO_PROC = a.split('-').reverse().join('-');
          } else {
            var DAT_PERIODO_PROC = "";
          }
          if (data[jsonData].DAT_FIM_RETRO != null) {
            var b = data[jsonData].DAT_FIM_RETRO.substring(0,10);
            var DAT_FIM_RETRO = b.split('-').reverse().join('-');
          } else {
            var DAT_FIM_RETRO = "";
          } 
          if (data[jsonData].DAT_PERIODO_COMP != null) {
            var c = data[jsonData].DAT_PERIODO_COMP.substring(0,10);
            var DAT_PERIODO_COMP = c.split('-').reverse().join('-');
            DAT_PERIODO_COMP = DAT_PERIODO_COMP.substring(3, DAT_PERIODO_COMP.length) // retirando o dia da data. Ex: 01/2021
          } else {
            var DAT_PERIODO_COMP = "";
          }
         
          
          tr = $('<tr/>');
            tr.append("<td>" + DAT_PERIODO_PROC                 + "</td>");
            tr.append("<td>" + DAT_FIM_RETRO                    + "</td>");
            tr.append("<td>" + DAT_PERIODO_COMP                 + "</td>");
            tr.append("<td>" + (data[jsonData].FATOR_CORRECAO == 'S'? 'Sim' : 'Não' ) + "</td>");
            tr.append("<td>" + (data[jsonData].NOM_USU_ULT_ATU ? data[jsonData].NOM_USU_ULT_ATU : '')   + "</td>");
            tr.append("<td>" + data[jsonData].DAT_ULT_ATU_FMT   + "</td>");
            tr.append("<td>" + (data[jsonData].FLG_STATUS == 'V' ? 'Vigente' : (data[jsonData].FLG_STATUS == 'C' ? 'Cancelado' : '')) + "</td>");
            tr.append("<td>" + (data[jsonData].NOM_CRITERIO == null ||  data[jsonData].NOM_CRITERIO == '' ? '' : data[jsonData].NOM_CRITERIO) + "</td>");
            tr.append("<td style=\"text-align: center\"><a href=\"\" onclick=\"cancelaRegistro("+ data[jsonData].NUM_SEQ+");\"><i class=\"fas fa-times-circle fa-2x\" style=\"color:red;\"></i></a></td>");
          $('#tableRetroativos').append(tr);
        }
      }
    }); // fim $.ajax()

    carregarCabecalho();
  } // fim initPage()

  function carregaComboTiposDeCriterios() {
    $.getJSON(urlBackendListarCriterios, function (dados) {
      //console.log(dados);
      if (dados.length > 0) {
        $('#comboCriterio').children().remove();
        var option = '<option> Selecione</option>';
        $(option).appendTo('#comboCriterio');
        $.each(dados, function (key, value) { 
          option = '<option value="' + value.CHAVE + '">' + value.VALOR + '</option>';
          $(option).appendTo('#comboCriterio');
        });
      } else {
        $('#erro').html('<span class="mensagem">Não foram encontrados tipos de documentos!</span>');
      }
    });
  }
  carregaComboTiposDeCriterios();

  $('#btnGravar').click(function() {
    var url = urlBackendListarFolhaRetroativosCriar;

    var a = $("#periodoInicialdeProcessamento").val();
    let b = a.split('/').reverse().join('/');
    let periodoInicialdeProcessamento = b.replaceAll('/', '-');
    
    var c = $('#dataFinaldeProcessamento').val();
    let d = c.split('/').reverse().join('/');
    let dataFinaldeProcessamento = d.replaceAll('/', '-');

    var e = $("#periododeCompetenciadoProcesso").val();
    //e = "01/" + e // adicionando 01 para completar uma data
    let f = e.split('/').reverse().join('/');
    let periododeCompetenciadoProcesso = f.replaceAll('/', '-');

    let nom_usu_ult_atu = getCookieSigeprev('cookieLogin');
    console.log(periododeCompetenciadoProcesso);

    //1- Chama o endPoint
    var matriz;

      matriz = {
                cod_simulacao     : paramsCod_simulacao
               ,cod_ins           : 1
               ,cod_ide_cli       : paramsCod_ide_cli
               ,num_matricula     : paramsMatricula
               ,dat_periodo_proc  : periodoInicialdeProcessamento
               ,dat_periodo_comp  : periododeCompetenciadoProcesso
               ,dat_proc          : periododeCompetenciadoProcesso
               ,fator_correcao    : $("#fatorCorrecao").val()
               ,qtd_parc_credito  : 0 // FIXO
               ,qtd_parc_debito   : 0 // FIXO
               ,dat_fim_retro     : dataFinaldeProcessamento
               ,flg_status        : "V" // FIXO
               ,num_seq           : null
               ,cod_criterio      : $('#comboCriterio').val()
               ,flg_localizacao   : null
               ,dat_ing           : null
               ,dat_ult_atu       : null
               ,nom_usu_ult_atu   : nom_usu_ult_atu
               ,nom_pro_ult_atu   : null
              };
      //console.log(JSON.stringify(matriz));
      if (validacaoInsert()) {  
        var settings = {
            "async": false,
            "crossDomain": true,
            "processData": false,
            "url": url,
            "method": "POST",
            "headers": {
            "Cache-Control": "no-cache"
            ,"Content-Type" : "application/json"
            },
            "data": JSON.stringify(matriz),
            "statusCode": {
              200: function() {
                /* alert('OK'); */
                location.reload(true)
              },
              201: function() {
                alert('Operação Realizada com Sucesso!');
                location.reload(true)
              },
              404: function() {
                /* alert('OK 3'); */
                alert('Requisução não encontrada!')
              },
              500: function() {
                /* alert('OK 4'); */
                alert('Ocorreu um erro interno!')
              }
            }                                
        };
      }
    
    var _response = {};
    $.ajax(settings).done(function (response) {
    });
  });

  // GET - Listar Composicao Beneficio  
  function carregaComboPeriodoDeProcessamento() {
    $.getJSON(urlPeriododeProcessamento, function (dados) {
      console.log(dados);
      if (urlPeriododeProcessamento.length > 0) {
        $('#periododeCompetenciadoProcesso').children().remove();
        var option = '<option>Selecionar</option>';
        $(option).appendTo('#periododeCompetenciadoProcesso');
        $.each(dados, function(key, value) {
          //console.log(dados);
          option = '<option value="' + value.PERIODO + '">' + value.PERIODO + '</option>';
          $(option).appendTo('#periododeCompetenciadoProcesso');
        });
      }
    });
  }
  carregaComboPeriodoDeProcessamento();

  function validacaoInsert() {
    var validado = true;

    if ($('#periodoInicialdeProcessamento').val() == undefined || $('#periodoInicialdeProcessamento').val() == '' || $('#periodoInicialdeProcessamento').val() == 'Selecionar') {
      alertNovo('Campo Per&iacute;odo inicial de processamento &eacute; obrigat&oacute;rio');
      validado = false;

    } else if ($('#dataFinaldeProcessamento').val() == undefined || $('#dataFinaldeProcessamento').val() == '' || $('#dataFinaldeProcessamento').val() == 'Selecionar') {
      alertNovo('Campo Per&iacute;odo final de processamento &eacute; obrigat&oacute;rio');
      validado = false;

    } else if ($('#periododeCompetenciadoProcesso').val() == undefined || $('#periododeCompetenciadoProcesso').val() == '' || $('#periododeCompetenciadoProcesso').val() == 'Selecionar') {
      alertNovo('Campo Per&iacute;odo de Compet&ecirc;ncia do Processo &eacute;	obrigat&oacute;rio');
      validado = false;

    } else if ($('#fatorCorrecao').val() == undefined || $('#fatorCorrecao').val() == '' || $('#fatorCorrecao').val() == 'Selecionar') {
      alertNovo('Campo Fator de Corre&ccedil;&atilde;o &eacute;	obrigat&oacute;rio');
      validado = false;

    }  
    return validado;
  }



});

function carregarCabecalho() {
  let paramsCabecalho = {};
  paramsCabecalho.cod_simulacao = urlParametros.get("cod_simulacao");
  let jsonRetorno = consumidor.executarServico("api/v1/simulador/calculo/folha/simulacoes/lista", paramsCabecalho);

  if (jsonRetorno.length == 0) {
    let tr = $('<tr/>');
    tr.append("Sem dados para exibir!");
    $('#tableResumo').append(tr);
  } else {
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
}