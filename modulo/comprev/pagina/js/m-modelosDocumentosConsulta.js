/* Task 49569 | Modelo de Documentos | Lilian Monteiro | 02/09/2021 */

/* $(function(){

  $('.date').mask('00/00/0000');

  $('.summernote').summernote({
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
}); */
const baseUrl = 'http://localhost:8082/modeloDocumento';

//const url_findFluxo = 'http://localhost:8082/modeloDocumento/listaDeFluxos';
//const url_findTarefa = 'http://localhost:8082/modeloDocumento/listaDeTarefasPorFluxo';
//const url_findTiposDocumentos = 'http://localhost:8082/modeloDocumento/listaDeTiposDeDocumentos';
//const pesquisaModeloDocumentos = 'http://localhost:8082/modeloDocumento/pesquisaModeloDocumentos';


$(document).ready(function () {

  //$.ajax
  
  // Lista de Fluxos
  $('#comboFluxo').click(function () {
    $.getJSON(baseUrl + '/listaDeFluxos' , function (dados) {
      //console.log(dados);
      if (dados == null){
        alert('erro de conexão')
      }
      if (dados.length > 0) {
        var option = '<option>Selecione o Fluxo		  </option>';
        $.each(dados, function (key, value) { // loop
          //console.log(dados);
          option = '<option value="' + value.TIP_COD_TIPO + '">' + value.TIP_DES_TIPO + '</option>';
          $(option).appendTo('#comboFluxo');
        })
      } else {
        $('#erroFluxo').html('<span class="mensagem">Não foram encontrados fluxos!</span>');
      }
    })
  });

  $('#comboFluxo').change(function(event){
    var fluxo = event.currentTarget.value;
  });

  // Lista de Tarefas
  $('#comboTarefas').click(function () {
    var resultJson = baseUrl + "/listaDeTarefasPorFluxo?tar_cod_tipo=" + $('#comboFluxo').val();

    $.getJSON(resultJson, function (dados) {
      if (dados.length > 0) {
        //console.log(dados);
        var option = '<option> Selecione uma tarefa </option>';
        $.each(dados, function (key, value) { // loop
          //console.log(value);
          option = '<option value="' + value.VALUE + '">' + value.LABEL + '</option>';
          $(option).appendTo('#comboTarefas');
        })
      } else {
        $('#erroTarefas').html('<span class="mensagem">Não foram encontrados tarefas!</span>');
      }
    })
  });

  $('#comboTarefas').change(function(event){
    var tarefas = event.currentTarget.value;
    //console.log(tarefas);
  });

  // Lista de Tipos de Documentos (TB_CODIGO)
  $('#comboTiposDocumentos').click(function () {
    $.getJSON(baseUrl + "/listaDeTiposDeDocumentos", function (dados) {
      //console.log(dados);
      if (dados.length > 0) {
        var option = '<option> Selecione uma tipo de documento </option>';
        $.each(dados, function (key, value) { // loop
          option = '<option value="' + value.VALUE + '">' + value.LABEL + '</option>';
          $(option).appendTo('#comboTiposDocumentos');
        })
      } else {
        $('#erroTiposDocumentos').html('<span class="mensagem">Não foram encontrados tipos de documentos!</span>');
      }
    })
  });

  $('#comboTiposDocumentos').change(function (event) {
    var tiposDocumentos = event.currentTarget.value;
    //console.log(tiposDocumentos);
  });

  // Situações
  $('#situacao').change(function (event) {
    var situacao = event.currentTarget.value;
    //console.log(situacao);
  });

  $('#btnPesquisar').click(function () {
    var url = baseUrl + "/pesquisaModeloDocumentos" + 
      "?tip.tip_cod_ins=1"   + 
      "&tar.tar_cod_ins=1"   + 
      "&mtd.cod_tipo_fluxo=" + $('#comboFluxo').val() +
      "&mtd.cod_tarefa="     + $('#comboTarefas').val() +
      "&mtd.cod_tipo="       + $('#comboTiposDocumentos').val() +
      "&mtd.flg_status="     + $('#situacao').val();

    $.getJSON(url, function (dados) {
      var dadosJson = dados;
      console.log(dados);
      if (dados.length > 0) {
        $.each(dados, function (key, value) { 
          var option = value
          var formData = JSON.stringify(option);
          $('#textarea').val(formData)
        })
      } else {
        $('#erroPesquisaModeloDocumentos').html('<span class="mensagem">Selecione uma situação!</span>');
      }
    })
  });

  $('#limpar').click(function limpar() {
    $('#comboFluxo').val('selecionar')
    $('#comboTarefas').val('selecionar')
    $('#comboTiposDocumentos').val('selecionar')
    $('#situacao').val('selecionar')
  });
 

  

});