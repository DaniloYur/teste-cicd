/* Task 49569 | Modelo de Documentos | Lilian Monteiro | 02/09/2021 */

$(function(){

  $('.date').mask('00/00/0000');

  $('#summernote').summernote({
    height: 250,
    lang: 'pt-BR',
    toolbar: [
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture']],
      ['view', ['codeview']],
    ]
  });
});

var urlCriarDocumento = "criarModeloDeDocumento";

const urlBackend = "modeloDocumento";
var urlParams = new URLSearchParams(window.location.search);

var ehNovoRegistro = true;
var numSeqregistro = "";
function preparaAtualizacao(numSeq) {
  $('#btnGravar').val('GRAVAR')
  $('#btnGravar').css("backgroundColor", "#6daa6e");
  document.getElementById('btnInativar').disabled = false;
  document.getElementById('btnDeletar').disabled = false;
  
  if ($('#situacao').val() == 'INATIVO') {
    $('#btnGravar').hide();
    $('#btnInativar').hide();
    $('#btnLimpar').hide();
  }

  $('#btnInativar').click(function () {
    $("#situacao").val('INATIVO')
    $('#btnGravar').click()
  });

  $('#btnDeletar').click(function () {

    let params = {};
    params.numSeqRegistro = numSeqregistro;

    var url = "api/v1/modeloDocumento/deleteDocumento";

    if(confirm("Deseja realmente deletar o Modelo?")){
      let jsonData = consumidor.executarServico(url, params);
    }

    location.reload();

  });

  $('#btnInativar').click(function () {
    $("#situacao").val('INATIVO')
    $('#btnGravar').click()
  });

  let baseUrl = urlDominioBackEnd + urlContextoBackEnd + urlBackend; // http://localhost:8082/modeloDocumento
  
  ehNovoRegistro = false;
  numSeqregistro = numSeq;

  var url = baseUrl + "/" + numSeqregistro;
  $.getJSON(url, function (dados) {
    // Convertendo as datas
    var a = dados.dat_ini_vig.substring(0, 10)
    let inicioVigencia = a.split('-').reverse().join('-');
    
    if (dados.dat_fim_vig != null) {
      var b = dados.dat_fim_vig.substring(0, 10)
      var fimVigencia = b.split('-').reverse().join('-');
    }

    var situacao = ''
    if (dados.flg_status == 'A') {
      situacao = 'ATIVO'
    } else {
      situacao = 'INATIVO'
    }

    if (dados != undefined) {
      $("#des_assunto").val(dados.cod_assunto);
      $("#tituloDocumento").val(dados.des_titulo);
      $("#summernote").summernote('code', dados.des_texto);
      $("#inicioVigencia").val(inicioVigencia.replaceAll("-", "/"));
      if(fimVigencia != null){
        $("#fimVigencia").val(fimVigencia.replaceAll("-", "/"));
      } else {
        $("#fimVigencia").val("");
      }
      $("#situacao").val(situacao);
      sessionStorage.setItem("codTarefaEdicao", ""+dados.cod_tarefa+"#"+dados.cod_tipo_fluxo);
      sessionStorage.setItem("codTipo", dados.cod_tipo);

    } else {
      $('#erroPesquisaModeloDocumentos').html('<span class="mensagem"> !</span>');
    }
  });
}

$(document).ready(function () {
  window.onload = initPage;
  let baseUrl = urlDominioBackEnd + urlContextoBackEnd + urlBackend; // http://localhost:8082/modeloDocumento

  $('#comboFluxos').multiselect({
    columns  : 3,
    placeholder: 'Selecione os Fluxos',
    search: true,
    searchOptions: {
        'default': 'Busque fluxos'
    }

  });
  $('#comboTarefas').multiselect({
    columns  : 3,
    placeholder: 'Selecione as Tarefas',
    search: true,
    searchOptions: {
        'default': 'Busque tarefas'
    }
  });

  function initPage(){
    $("#inicioVigencia").datepicker({format: "dd/mm/yyyy", orientation: "top auto"});
    $("#fimVigencia").datepicker({format: "dd/mm/yyyy", orientation: "top auto"});

    var tarefasSelecionadas =  urlParams.get("codTarefa");
    if(tarefasSelecionadas != null){
      var tarefas = tarefasSelecionadas.split(',');
      var contador = 0;
      tarefasSelecionadas = "";
      for(var i = 0; i < tarefas.length; i ++) {
          var elemento = tarefas[i];
          var parts = elemento.split('#');
          var firstPart = parts[0]
          if(contador == 0) {
              tarefasSelecionadas = firstPart
          } else {
              tarefasSelecionadas += "','" + firstPart
          }
          contador++
      }
    }

    var urlCompleta = baseUrl + "/pesquisaModeloDocumentos?" +
    "tip.tip_cod_ins=1"         +
    "&tar.tar_cod_ins=1"         +
    "&mtd.cod_tipo_fluxo="       + urlParams.get("codFluxo") +
    "&mtd.cod_tarefa="           + tarefasSelecionadas +
    "&mtd.situacao="             + urlParams.get("mtd.situacao") +
    "&cod_tipo="                 + sessionStorage.getItem("tipoDoc");

    $.ajax({
      url: urlCompleta,
      success: function(data){
        if(data == '') {
          tr = $('<tr/>');
          $('table').append(tr);
        }
        
        for (var jsonData in data) {
          tr = $('<tr/>');
          tr.append("<td>" + data[jsonData].FLUXO + "</td>");
          tr.append("<td>" + data[jsonData].TAREFA + "</td>");
          tr.append("<td>" + data[jsonData].TIPO + "</td>");
          tr.append("<td>" + data[jsonData].DES_TITULO + "</td>");
          tr.append("<td>" + data[jsonData].DAT_INI + "</td>");
          if(data[jsonData].DAT_FIM == null){
            tr.append("<td>" + "" + "</td>");
          } else {
            tr.append("<td>" + data[jsonData].DAT_FIM + "</td>");
          }
          tr.append("<td>" + data[jsonData].SITUACAO + "</td>");
          tr.append("<td><a href=\"javascript:preparaAtualizacao("+data[jsonData].NUM_SEQ+");\"><i class=\"fa fa-search\" aria-label=\"Pesquisa\"></i></a></td>");                 
          $('table').append(tr);
        }
        if(data != '') {
          $('#tabelaModelosDocumentos').footable({pageSize: 3});
          carregaComboTiposDeAssuntos()
        }
      }
    })
  };

  function carregarCombos(){
    if($("#fluxosSelecionados").val() != null && $("#fluxosSelecionados").val() != "" && $("#fluxosSelecionados").val().includes(",")){
      var fluxosSelecionados = $("#fluxosSelecionados").val();
      $.each(fluxosSelecionados.split(","), function(i, e){
        $("#comboFluxos").find('option[value='+e+']').prop("selected", true);
      });
    } else {
      var fluxosSelecionados = $("#fluxosSelecionados").val();
      $("#comboTarefas").val(fluxosSelecionados).attr("selected", true);
    }

    $("#comboFluxos").multiselect('reload');

    carregaTarefaDoFluxo();
    carregaComboTiposDeAssuntos();

    sessionStorage.clear()

  }

  function carregacomboFluxos() {
    $.getJSON(baseUrl + '/listaDeFluxos' , function (dados) {
      if (dados == null){
        alert('erro de conexão')
      }
      if (dados.length > 0) {
        $('#comboFluxos').children().remove();
        var option = '';

        $(option).appendTo('#comboFluxos');
        $.each(dados, function (key, value) {
          option = '<option value="' + value.TIP_COD_TIPO + '">' + value.TIP_DES_TIPO + '</option>';
          $(option).appendTo('#comboFluxos');
        });
        $('#comboFluxos').multiselect('reload');

        if (urlParams.get('codFluxo') != undefined && urlParams.get('codFluxo') != null && urlParams.get('codFluxo') != '') {
          var options = urlParams.get('codFluxo');
          $.each(options.split(","), function(i,e){
            $("#comboFluxos option[value='" + e + "']").prop("selected", true);
          });
          $('#comboFluxos').multiselect('reload');
          carregaTarefaDoFluxo()
        }       
        
      } else {
        $('#erroFluxo').html('<span class="mensagem">Não foram encontrados fluxos!</span>');
      }
    });
  }
  carregacomboFluxos();

  function getLabels() {
    var selectedOptions = $('#comboFluxos option:selected').toArray().map(item => {
      return { value: item.value, text: $(item).text() };
    });
    return selectedOptions;
  }

  function carregaTarefaDoFluxo() {

    var fluxosSelecionados = $('#comboFluxos option:selected').toArray().map(item => item.value);

    var resultJson = baseUrl + "/listaDeTarefasPorFluxo?tar_cod_tipo=" + fluxosSelecionados;
    $.getJSON(resultJson, function (dados) {
      if (dados.length > 0) {
        $('#comboTarefas').children().remove();
        var listaLabelFluxosSelecionados = getLabels();
        var contador = 0;
        $.each(listaLabelFluxosSelecionados, function(key, fluxo){
          var optgroup = $('<optgroup color='+"black"+' label="' + fluxo.text + '">')
          $.each(dados, function (key, tarefa) {
            if(fluxo.value == tarefa.TIPO_FLUXO) {
              var option = '<option value="' + tarefa.VALUE + '#' +tarefa.TIPO_FLUXO+'" data-value="'+tarefa.VALUE+'">' + tarefa.LABEL + '</option>';
              optgroup.append(option);
            }
          });
          contador++;
          $(optgroup).appendTo('#comboTarefas');
        });

        $('#comboTarefas').multiselect('reload');

        if (urlParams.get('codTarefa') != undefined && urlParams.get('codTarefa') != '' ) {
          var options = urlParams.get('codTarefa');
          $.each(options.split(","), function(i,e){
            $("#comboTarefas option[value='" + e + "']").prop("selected", true);
          });
          $('#comboTarefas').multiselect('reload');
          carregaComboTiposDeAssuntos();
          carregaComboTiposDeDocumentos();
        }        
      } else {
        $('#erroTarefas').html('<span class="mensagem">Não foram encontrados tarefas!</span>');
      }
    });

    $("codFluxo").val(fluxosSelecionados);
  }

  // Lista de Fluxos
  $('#comboFluxos').change(function(event){
    var fluxo = event.currentTarget.value;
    if (fluxo != 'Selecione o fluxo' && fluxo != '') {
      carregaTarefaDoFluxo();
    }
  });

  $('#comboTarefas').change(function(event){
    var tarefas = event.currentTarget.value;
    //console.log(tarefas);
    if (tarefas != 'Selecione uma Tarefa' && tarefas != '') {
      carregaComboTiposDeAssuntos();
      carregaComboTiposDeDocumentos();
    }    
  });

  function carregaComboTiposDeDocumentos() {
    $.getJSON(baseUrl + "/listaDeTiposDeDocumentos", function (dados) {
      //console.log(dados);
      if (dados.length > 0) {
        $('#comboTiposDocumentos').children().remove();
        var option = '<option> Selecione um tipo de documento </option>';
        $(option).appendTo('#comboTiposDocumentos');
        $.each(dados, function (key, value) { // loop
          option = '<option value="' + value.VALUE + '">' + value.LABEL + '</option>';
          $(option).appendTo('#comboTiposDocumentos');
        });

        if (urlParams.get('mtd.cod_tipo') != undefined && urlParams.get('mtd.cod_tipo') != null && urlParams.get('mtd.cod_tipo') != '' && urlParams.get('mtd.cod_tipo') != 'Selecione um tipo de documento') {
          $('#comboTiposDocumentos').val(urlParams.get('mtd.cod_tipo'));
        } 

      } else {
        $('#erroTiposDocumentos').html('<span class="mensagem">Não foram encontrados tipos de documentos!</span>');
      }
    });
  }
  carregaComboTiposDeDocumentos();

  
  function carregaComboStatus() {
    if (urlParams.get('mtd.situacao') != undefined && urlParams.get('mtd.situacao') != null && urlParams.get('mtd.situacao') != '' && urlParams.get('mtd.situacao') != 'selecionar') {
      $('#situacao').val(urlParams.get('mtd.situacao'));
    }     
  }

  carregaComboStatus();



  function carregaComboTiposDeAssuntos() {
    var tarefasSelecionadas = $('#comboTarefas option:selected').toArray().map(item => item.value);

    let params = {};
    var cod_tarefa = null;
    var tarefasEscolhidas = "";

    if(tarefasSelecionadas.toString() === ''){
      cod_tarefa = urlParams.get("codTarefa");
      tarefasEscolhidas = cod_tarefa;
      var tarefas = cod_tarefa.split(',');
      var contador = 0;
      tarefasSelecionadas = "";
      for(var i = 0; i < tarefas.length; i ++) {
          var elemento = tarefas[i];
          var parts = elemento.split('#');
          var firstPart = parts[0]
          if(contador == 0) {
              tarefasSelecionadas = firstPart
          } else {
              tarefasSelecionadas += "','" + firstPart
          }
          contador++
      }
    } else {
      cod_tarefa = tarefasSelecionadas;
      tarefasEscolhidas = cod_tarefa;
    }

    params.cod_tarefa = cod_tarefa.toString();

    var url = "api/v1/modeloDocumento/listaTiposAssuntos";

    let jsonData = consumidor.executarServico(url, params);

    if( jsonData.length > 0) {
      carregarCombo("des_assunto", jsonData);
    }

    $("#codTarefa").val(tarefasEscolhidas);
  }

  // Lista de Tipos de Documentos (TB_CODIGO)
  $('#comboTiposDocumentos').change(function (event) {
    var tiposDocumentos = event.currentTarget.value;
    //console.log(tiposDocumentos);
  });

  // Situações
  $('#situacao').change(function (event) {
    var situacao = event.currentTarget.value;
    //console.log(situacao);
  });

  $('#btnGravar').click(function() {
      //-- Fazer as criticas
      var url = baseUrl + "/" + (ehNovoRegistro ? urlCriarDocumento : "editarModeloDeDocumento/"+numSeqregistro) ;

      var a = $("#inicioVigencia").val();
      //console.log(a);
      let inicioVigencia = a.split('/').reverse().join('-');
      //console.log(inicioVigencia);
      var b = $("#fimVigencia").val();
      //console.log(b);
      let fimVigencia = b.split('/').reverse().join('-');
      //console.log(fimVigencia);

      var situacao = ''
        if ($('#situacao').val() == 'ATIVO') {
          situacao = 'A'
        } else {
          situacao = 'I'
        }

      //1- Chama o endPoint
      var matriz;

        matriz = {cod_tipo_fluxo  : $("#comboTarefas").val()
                 ,cod_tipo        : $("#comboTiposDocumentos").val()
                 ,cod_assunto     : $("#des_assunto").val()
                 ,des_titulo      : $("#tituloDocumento").val()
                 ,des_texto       : $("#summernote").summernote('code')
                 ,dat_ini_vig     : inicioVigencia
                 ,dat_fim_vig     : fimVigencia
                 ,flg_status      : situacao
                 ,nom_usu_ult_atu :  getCookieSigeprev('cookieLogin')
                 ,nom_pro_ult_atu : 'TelaModelosDocumentos' };

      if(url.includes("editarModeloDeDocumento")) {
        matriz.cod_tipo_fluxo = sessionStorage.getItem("codTarefaEdicao");
      } else {

      }

      if (validacaoUpdate()) {           
        var settings = {
            "async": false,
            "crossDomain": true,
            "processData": false,
            "url": url,
            "method": (ehNovoRegistro ? "POST" : "PUT"),
            "headers": {
            "Cache-Control": "no-cache"
            ,"Content-Type" : "application/json"
            },
            "data": JSON.stringify(matriz),
            "statusCode": {
              200: function() {
                $('#btnPesquisar').click();
              },
              201: function() {
                $('#btnPesquisar').click();
              },
              404: function() {
                alert('Requisição não encontrada!')
              },
              500: function() {
                alert('Ocorreu um erro interno!')
              }
            }                                
        };
      }
      
      var _response = {};
      $.ajax(settings).done(function (response) {
          //_response = response.data;
          //console.log("HERE 2");
          //console.log(response);
      });
  });

  $('#btnPesquisar').click(function () {
    if (validacaoPesquisa()) {
    var fluxosSelecionados = $('#comboFluxos option:selected').toArray().map(item => item.value);
    var tarefasSelecionadas =  $('#comboTarefas option:selected').toArray().map(item => item.value);
    sessionStorage.setItem("tipoDoc", $("#comboTiposDocumentos").val())

      var url = baseUrl + "/pesquisaModeloDocumentos" +
        "?tip.tip_cod_ins=1"         +
        "&tar.tar_cod_ins=1"         +
        "&mtd.cod_tipo_fluxo="       + fluxosSelecionados +
        "&mtd.cod_tarefa="           + tarefasSelecionadas +
        "&mtd.situacao="             + $('#situacao').val() +
        "&cod_tipo="                 + $('#comboTiposDocumentos').val();
        
      if ($('#situacao').val() != "") {
        url += "&mtd.situacao="  + $('#situacao').val();
      }

      $("#codFluxo").val(fluxosSelecionados.toString())
      $("#codTarefa").val(tarefasSelecionadas.toString())

      $.getJSON(url, function (dados) {
        if (dados.length > 0) {
          carregarTabelaDocumentos(dados);
        } else {
          $('#erroPesquisaModeloDocumentos').html('<span class="mensagem">Selecione uma situação!</span>');
        }
      })
    } else {
      return false;
    }
  });

  function carregarTabelaDocumentos (param) {
    let tr = '<tr>';
    $(param).each(function(id, value){

      var a = value.DAT_INI_VIG.substring(0,10)
      let inicioVigencia = a.split('-').reverse().join('-');

      if (value.DAT_FIM_VIG != null) {
        var b = value.DAT_FIM_VIG.substring(0,10)
        var fimVigencia = b.split('-').reverse().join('-');
      } else {
        var fimVigencia = "";
      }

      tr += '<tr>';
      tr += "<td>" + value.FLUXO + "</td>";
      tr += "<td>" + value.TAREFA + "</td>";
      tr += "<td>" + value.TIPO + "</td>";
      tr += "<td>" + value.DES_TITULO + "</td>";
      tr += "<td>" + inicioVigencia + "</td>";
      tr += "<td>" + fimVigencia + "</td>";
      tr += "<td>" + value.SITUACAO + "</td>";
      tr += "<td><a href=\"javascript:preparaAtualizacao("+value.NUM_SEQ+");\"><i class=\"fa fa-search\" aria-label=\"Pesquisa\"></i></a></td>";
      tr += '</tr>';
    });
    $('#corpoTabelaDoc').append(tr);
  }

  $('#limpar').click(function limpar() {
    $("#codFluxo").val("");
    $("#codTarefa").val("");
    $("#comboFluxos").val("");
    $("#comboTarefas").val("");
    urlParams.set("mtd.cod_tipo", "");
    urlParams.set("mtd.situacao", "");
    $('#comboFluxos').multiselect('reload');
    $('#comboTarefas').multiselect('reload');
    $('#comboTiposDocumentos').val('Selecione um tipo de documento');
    $('#situacao').val('selecionar');
    $('#des_assunto').val('selecionar');
    $('#tabelaModelosDocumentos').remove();
    $("#divFooter").hide();
  });

  $('#btnLimpar').click(function limpar() {
    $('#des_assunto').val('selecionar')
    $('#tituloDocumento').val('')
    $("#summernote").summernote('code','');
    $('#inicioVigencia').val('')
    $('#fimVigencia').val('')
  });
  
  function validacaoPesquisa() {
    var validado = true;
    if ($('#comboFluxos').val() == undefined || $('#comboFluxos').val() == 'Selecione o Fluxo') {
      confirmSigeprev('Campo fluxo &eacute;	obrigat&oacute;rio');
      validado = false;

    } else if ($('#comboTarefas').val() == undefined || $('#comboTarefas').val() == 'Selecione uma Tarefa') {
      confirmSigeprev('Campo tarefa &eacute; obrigat&oacute;rio');
      validado = false;

    } else if ($('#comboTiposDocumentos').val() == undefined || $('#comboTiposDocumentos').val() == 'Selecione um tipo de documento') {
      confirmSigeprev('Campo tipo de documento &eacute;	obrigat&oacute;rio');
      validado = false;
    }
    return validado;
  }

  function validacaoUpdate() {
    var validado = true;

    if ($('#des_assunto').val() == undefined || $('#des_assunto').val() == '' || $('#des_assunto').val() == 'Selecione um tipo de assunto') {
      confirmSigeprev('O Campo assunto &eacute;	obrigat&oacute;rio');
      validado = false;

    } else if ($('#tituloDocumento').val() == undefined || $('#tituloDocumento').val() == '') {
      confirmSigeprev('Campo t&iacute;tulo &eacute;	obrigat&oacute;rio');
      validado = false;

    } else if ($("#summernote").summernote('code') == undefined || $("#summernote").summernote('code') == '') {
      confirmSigeprev('Campo texto &eacute;	obrigat&oacute;rio');
      validado = false;

    } else if ($('#inicioVigencia').val() == undefined || $('#inicioVigencia').val() == '') {
      confirmSigeprev('Campo Data Início de Vigência &eacute; obrigat&oacute;rio');
      validado = false;
      
    } else if ($('#situacao').val() == undefined || $('#situacao').val() == '' || $('#situacao').val() == 'Selecione' || $('#situacao').val() == null) {
      confirmSigeprev('Campo situa&ccedil;&atilde;o &eacute; obrigat&oacute;rio');
      validado = false;
    } 
    return validado;
  }
 
  function carregarCombo(nomCombo, jsonData){

    if(jsonData != "" && jsonData != null) {
      $("#" + nomCombo).children().remove();
      let option = '<option>Selecionar</option>';
      $(option).appendTo("#" + nomCombo);
      $.each(jsonData, function(key, value) {
        option = '<option value="' + value.VALUE +  '">' + value.LABEL + '</option>';
        $(option).appendTo("#" + nomCombo);
      });
    } else  {
      $("#" + nomCombo).children().remove();
      let option = '<option>Selecionar</option>';
      $(option).appendTo("#" + nomCombo);
    }

  }

  function validaEdicao(inputString, targetValue) {
    return inputString.toLowerCase() === targetValue.toLowerCase();
  }

});