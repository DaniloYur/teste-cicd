/* TASK 66238 | Habilitação Pensão Autoatendimento | Lilian Monteiro | 20/08/2021 */

function buttons() {
  //ex. botão para fechar collapseDetail
  $(".btnClose").click(function(){ 
    var btn ="#" + $(this).parents(".detalhe-info").attr("id");
    $(btn).collapse('hide');
  });

  $("#btnFilter").click(function(){ 
    if ($("#fileType").val() == '4') {
      $("#part01").css("display","none");
      $("#part02").css("display","block");
    } else {
      $("#part01").css("display","block");
      $("#part02").css("display","none");
    }
  });

  $("#btnEnvio").click(function(){ location.href = 'envioArquivos.html' });
}

//init 
$(function(){ 
  controls();
  buttons();
  entidades(comboEntidade);
  grupoPagamento(comboGrupoPagamento);
  //detalhesArquivosEntradas();
  detalhesArquivosSaidas();
  var urlParams = new URLSearchParams(window.location.search);
  var periodo = urlParams.get('periodo');
  if(periodo != '' && periodo != "" && periodo != undefined){
    detalhesArquivosFiltro(periodo);
  }
});

var urlService = "administrador/arquivos/detalhes/processamento/entidadesDetalhesProcessamento"
function entidades(comboEntidade) {
  var valorSelecionado = $('#comboEntidade :checked').val();
  limparComboBox(comboEntidade,valorSelecionado);
  var settings = {
      url: urlDominioBackEnd + urlContextoBackEnd + urlService,
      method: "GET",
      headers: {
        "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
      },
      processData: false,
      crossDomain: true,
      contentType: false
  };
  $.ajax(settings).done(function (response) {
      var keys = Object.keys(response);
      response = response[keys[0]];
      limparComboBox(comboEntidade, valorSelecionado);
      response.forEach(elemento => {
          var elementKeys = Object.keys(elemento);
          if (valorSelecionado != undefined && valorSelecionado != null && valorSelecionado != '' && valorSelecionado == elemento[elementKeys[0]]) {
              $(comboEntidade).append("<option  value='"+ elemento[elementKeys[0]] +"'selected>" + elemento[elementKeys[1]] + "</option>");
          } else {
              $(comboEntidade).append("<option value='"+ elemento[elementKeys[0]] +"'>" + elemento[elementKeys[1]] + "</option>");
          }
      });
  });
}

function limparComboBox(comboEntidade,valorSelecionado) {
  $(comboEntidade).empty();
  var selecioneField = "Selecione";
  var selecione = (valorSelecionado != undefined || valorSelecionado == null || valorSelecionado != '' ? "selected" : "");
  $(comboEntidade).append("<option value='' " + selecione + ">" + selecioneField + "</option>");
}

function detalhesArquivosEntradas(){
    let params = {};
    let detalhesArquivosEntradas = consumidor.executarServico("/administrador/arquivos/detalhes/arquivos/detalhesArquivosEntradas", params);
        var keysDetalhesArquivosEntradas = Object.keys(detalhesArquivosEntradas);
        detalhesArquivosEntradas = detalhesArquivosEntradas[keysDetalhesArquivosEntradas[0]];
        detalhesArquivosEntradas.forEach(elementoEntradas => {
            var elementKeysEntradas = Object.keys(elementoEntradas);
                if (elementoEntradas[elementKeysEntradas[0]] == null && elementoEntradas[elementKeysEntradas[1]] == null){
                  $('#naoExistemInfosDetalhesArquivosEntradas').show();                
                }
                if (elementoEntradas[elementKeysEntradas[0]] != null && elementoEntradas[elementKeysEntradas[1]] != null){
                  $('#naoExistemInfosDetalhesArquivosEntradas').hide(); 
                  var html = "<tr id='trDetalhesArquivosEntradas'>"
                            + " <td>"+elementoEntradas[elementKeysEntradas[0]]+"</td>"
                            + "<td>"+elementoEntradas[elementKeysEntradas[1]]+"</td>"
                            + "<td>"+elementoEntradas[elementKeysEntradas[2]]+"</td>"
                            + "<td>"
                            + " <span id='status_"+elementoEntradas[elementKeysEntradas[6]]+"' class=''></span>"
                            + "</td>"
                            +"<td>"
                            +"  <a data-toggle='collapse' href='#collapseDetailEntradas' role='button' aria-expanded='false' aria-controls='collapseDetail' onclick='observacoesArquivo();'>"
                            + "    <i class='fa fa-search fa-lg' aria-label='Detalhes'></i>"
                            +"  </a>"
                            +"</td>"
                            +"<td>"+elementoEntradas[elementKeysEntradas[4]]+"</td>"
                            +"<td>"+elementoEntradas[elementKeysEntradas[5]]+"</td>"
                            +"<td>"
                            +"  <a href='#'> "
                            +"    <i class='fas fa-download fa-lg' aria-label='Download'></i>"
                            +" </a>"
                            +"  <a data-toggle='collapse' href='#collapseConfirm' role='button' aria-expanded='false' aria-controls='collapseConfirm'>"
                            +"   <i class='fas fa-file-invoice fa-lg' aria-label='Detalhes'></i>"
                            +"  </a>"
                            +"</td>" 
                            +"</tr>" 
                                
                  $('#tableDetalhesArquivosEntradas').append(html); 
                  if(elementoEntradas[elementKeysEntradas[3]] == "S"){
                    $('#status_'+elementoEntradas[elementKeysEntradas[6]]+'').addClass('status-green');
                  }
                  else if(elementoEntradas[elementKeysEntradas[3]] == "P"){
                    $('#status_'+elementoEntradas[elementKeysEntradas[6]]+'').addClass('status-yellow');
                  }
                  else if(elementoEntradas[elementKeysEntradas[3]] == "E"){
                    $('#status_'+elementoEntradas[elementKeysEntradas[6]]+'').addClass('status-red');
                  }     
                }    
        });
}

function detalhesArquivosSaidas(){
  let params = {};
  let detalhesArquivosSaidas = consumidor.executarServico("/administrador/arquivos/detalhes/arquivos/detalhesArquivosSaidas", params);
      var keysDetalhesArquivosSaidas = Object.keys(detalhesArquivosSaidas);
      detalhesArquivosSaidas = detalhesArquivosSaidas[keysDetalhesArquivosSaidas[0]];
      detalhesArquivosSaidas.forEach(elementoSaidas => {
          var elementKeysSaidas = Object.keys(elementoSaidas);
              document.getElementById('dataSaida').innerHTML = elementoSaidas[elementKeysSaidas[7]] +"/"+ elementoSaidas[elementKeysSaidas[8]];
              // if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
              //   $('#naoExistemInfosDetalhesArquivosSaidas').show();                
              // }
              // if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
                // $('#naoExistemInfosDetalhesArquivosSaidas').hide(); 
                var html = "<tr id='trDetalhesArquivosSaidas'>"
                          + " <td>"+elementoSaidas[elementKeysSaidas[0]]+"</td>"
                          + "<td>"+elementoSaidas[elementKeysSaidas[1]]+"</td>"
                          + "<td>"+elementoSaidas[elementKeysSaidas[2]]+"</td>"
                          + "<td>"
                          + " <span id='status_"+elementoSaidas[elementKeysSaidas[10]]+"' class=''></span>"
                          + "</td>"
                          +"<td>"
                          +"  <a data-toggle='collapse' href='#collapseDetailSaidas' role='button' aria-expanded='false' aria-controls='collapseDetail' onclick='observacoesArquivo("+elementoSaidas[elementKeysSaidas[9]]+","+elementoSaidas[elementKeysSaidas[11]]+","+elementoSaidas[elementKeysSaidas[12]]+",\""+elementoSaidas[elementKeysSaidas[0]]+"\" ,"+elementoSaidas[elementKeysSaidas[6]]+" );'>"
                          + "    <i class='fa fa-search fa-lg' aria-label='Detalhes'></i>"
                          +"  </a>"
                          +"</td>"
                          +"<td>"+elementoSaidas[elementKeysSaidas[4]]+"</td>"
                          +"<td>"+elementoSaidas[elementKeysSaidas[5]]+"</td>"
                          +"<td>"
                          +"  <a href='#' onclick='setarIdExecucao("+elementoSaidas[elementKeysSaidas[9]]+"); atualizaUsuDownload("+elementoSaidas[elementKeysSaidas[9]]+"); exportarJpg("+elementoSaidas[elementKeysSaidas[9]]+",1);'> "
                          +"    <i class='fas fa-download fa-lg' aria-label='Download'></i>"
                          +" </a>"
                          +"  <a data-toggle='collapse' href='#collapseConfirmSaidas' role='button' aria-expanded='false' aria-controls='collapseConfirm' onclick='setarIdExecucao("+elementoSaidas[elementKeysSaidas[9]]+"); consultarArquivo(); '>"
                          +"   <i class='fas fa-file-invoice fa-lg' aria-label='Detalhes'></i>"
                          +"  </a>"
                          +"</td>" 
                          +"</tr>" 
                                      
                $('#tableDetalhesArquivosSaidas').append(html); 
                if(elementoSaidas[elementKeysSaidas[3]] == "S"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-green');
                }
                else if(elementoSaidas[elementKeysSaidas[3]] == "A"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-yellow');
                }
                else if(elementoSaidas[elementKeysSaidas[3]] == "E"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-red');
                }     
              // }    
      });
}

function detalhesArquivosFiltro(periodo){ 
  $('#cover-spin').show(0); 
  $('#tbodyDetalhesArquivosSaidas').html(''); 
  var element = document.getElementById("collapseDetailSaidas");
  element.classList.remove("show");
  var entidade = $('#comboEntidade :checked').text();
  var tipoArquivo = $('#tipoArquivo').val();
  var dataInicio = $('#date-filter').val();
  var dataFim = $('#date-filter-end').val();
  var grupoPagamento = $('#comboGrupoPagamento :checked').val();
  let params = {entidade, tipoArquivo, dataInicio, dataFim, periodo, grupoPagamento};
  let detalhesArquivosSaidas = consumidor.executarServico("/administrador/arquivos/detalhes/arquivos/detalhesArquivosFiltro", params);
      var keysDetalhesArquivosSaidas = Object.keys(detalhesArquivosSaidas);
      detalhesArquivosSaidas = detalhesArquivosSaidas[keysDetalhesArquivosSaidas[0]];
      detalhesArquivosSaidas.forEach(elementoSaidas => {
          var elementKeysSaidas = Object.keys(elementoSaidas);
              document.getElementById('dataSaida').innerHTML = elementoSaidas[elementKeysSaidas[7]] +"/"+ elementoSaidas[elementKeysSaidas[8]];            
              var html = "<tr id='trDetalhesArquivosSaidas'>"
                  + " <td>"+elementoSaidas[elementKeysSaidas[0]]+"</td>"
                  + "<td>"+elementoSaidas[elementKeysSaidas[1]]+"</td>"
                  + "<td>"+elementoSaidas[elementKeysSaidas[2]]+"</td>"
                  + "<td>"
                  + " <span id='status_"+elementoSaidas[elementKeysSaidas[10]]+"' class=''></span>"
                  + "</td>"
                  +"<td>"
                  +"  <a data-toggle='collapse' href='#collapseDetailSaidas' role='button' aria-expanded='false' aria-controls='collapseDetail' onclick='observacoesArquivo("+elementoSaidas[elementKeysSaidas[9]]+","+elementoSaidas[elementKeysSaidas[11]]+","+elementoSaidas[elementKeysSaidas[12]]+",\""+elementoSaidas[elementKeysSaidas[0]]+"\" ,"+elementoSaidas[elementKeysSaidas[6]]+" );'>"
                  + "    <i class='fa fa-search fa-lg' aria-label='Detalhes'></i>"
                  +"  </a>"
                  +"</td>"
                  +"<td>"+elementoSaidas[elementKeysSaidas[4]]+"</td>"
                  +"<td>"+elementoSaidas[elementKeysSaidas[5]]+"</td>"
                  +"<td>"
                  +"  <a href='#' onclick='setarIdExecucao("+elementoSaidas[elementKeysSaidas[9]]+"); atualizaUsuDownload("+elementoSaidas[elementKeysSaidas[9]]+"); exportarJpg("+elementoSaidas[elementKeysSaidas[9]]+",1);'> "
                  +"    <i class='fas fa-download fa-lg' aria-label='Download'></i>"
                  +" </a>"
                  +"  <a data-toggle='collapse' href='#collapseConfirmSaidas' role='button' aria-expanded='false' aria-controls='collapseConfirm' onclick='setarIdExecucao("+elementoSaidas[elementKeysSaidas[9]]+"); consultarArquivo(); '>"
                  +"   <i class='fas fa-file-invoice fa-lg' aria-label='Detalhes'></i>"
                  +"  </a>"
                  +"</td>" 
                  +"</tr>" 
                              
                $('#tableDetalhesArquivosSaidas').append(html); 
                if(elementoSaidas[elementKeysSaidas[3]] == "S"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-green');
                }
                else if(elementoSaidas[elementKeysSaidas[3]] == "A"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-yellow');
                }
                else if(elementoSaidas[elementKeysSaidas[3]] == "E"){
                  $('#status_'+elementoSaidas[elementKeysSaidas[10]]+'').addClass('status-red');
                }                       
      });
      setTimeout(function(){ 
        $('#cover-spin').hide(0);
    }, 1500);
}

function observacoesArquivo(execProcArqId,definicaoProcessoId,definicaoSaidaId,competencia, execProcId){
  $('#tbodyObservacoesArquivosSaidas').html('');
  let params = {execProcArqId,definicaoProcessoId,definicaoSaidaId, competencia, execProcId};
  let totalDiario = consumidor.executarServico("/administrador/arquivos/detalhes/arquivos/observacoesArquivos", params);
      var keysDetalheDiario = Object.keys(totalDiario);
      totalDiario = totalDiario[keysDetalheDiario[0]];
      totalDiario.forEach(elemento => {
          var elementKeys = Object.keys(elemento);                  
                var html = "<tr> " 
                +"<th>Origem: </th>"
                +"<td>"+elemento[elementKeys[0]]+"</td></tr><tr>"
                +"<th>Nome do Arquivo:</th>"
                +"<td>"+elemento[elementKeys[1]]+"</td> </tr> <tr>"
                +"<th>Tipo Arquivo:</th>"
                +"<td>"+elemento[elementKeys[2]]+"</td></tr> <tr>"
                +"<td colspan='2'>&nbsp;</td></tr><tr>"
                +"<th>Data Geração: </th>"
                +"<td>"+elemento[elementKeys[3]]+"</td></tr><tr>"
                +"<th>Competência:</th>"
                +"<td>"+elemento[elementKeys[4]]+"</td> </tr><tr>"
                +"<th>Usuário Responsável:</th>"
                +"<td>"+elemento[elementKeys[5]]+"</td> </tr><tr>"
                +"<th>Situação:</th>"
                +"<td>"+elemento[elementKeys[6]]+"</td></tr> <tr>"
                +"<td colspan='2'>&nbsp;</td> </tr> <tr>"
                +"<th colspan='2'>Detalhe Situação:</th> </tr> <tr>"
                +"<td colspan='2'> "+elemento[elementKeys[7]]+"</td> </tr><tr>"
                +"<td colspan='2'>&nbsp;</td></tr><tr>"
                +"<th colspan='2'>Dados do contato:</th> </tr><tr>"
                +"<td>Nome:</td>"
                +"<td>"+elemento[elementKeys[8]]+"</td></tr> <tr>"
                +"<td>E-mail:</td>"
                +"<td>"+elemento[elementKeys[9]]+"</td>  </tr><tr>"
                +"<td>Telefone:</td>"
                +"<td>"+elemento[elementKeys[10]]+"</td></tr>"
                 
                $('#observacoesArquivosSaidas').append(html);                                  
      });
}

function verificaFiltro(){
  if($('#comboEntidade').val() == '' || $('#tipoArquivo').val() == '' || $('#date-filter').val() == '' || $('#date-filter-end').val() == '' || $('#comboGrupoPagamento').val() == ''){
    alert('Preencha todos os campos do filtro.');
    return;
  }
  else{
    detalhesArquivosFiltro();
  }
}
 var idExecucaoProcesso
 function setarIdExecucao(idExecucao){
  idExecucaoProcesso = idExecucao;
 }

 function consultarArquivo(){
   $('#arquivoCarregado').html('');
  let params = {idExecucaoProcesso};
  let consultaArquivo = consumidor.executarServico("/administrador/arquivos/detalhes/arquivos/consultaArquivo", params);
  var keysConsultaArquivo = Object.keys(consultaArquivo);
      consultaArquivo = consultaArquivo[keysConsultaArquivo[0]];
      consultaArquivo.forEach(elementoConsultaArquivo => {
          var elementKeysConsultaArquivo = Object.keys(elementoConsultaArquivo);                  
                var html = "<div class='col-3 col-sm-3 col-md-3'><a  onclick='setarIdExecucao("+idExecucaoProcesso+"); exportarJpg("+elementoConsultaArquivo[elementKeysConsultaArquivo[5]]+",2);'><i class='fas fa-file-download fa-lg mr-3' aria-hidden='true' ></i></a> "+elementoConsultaArquivo[elementKeysConsultaArquivo[0]]+"</div>"
                          +"<div class='col-3 col-sm-3 col-md-3'>"+elementoConsultaArquivo[elementKeysConsultaArquivo[1]]+"</div>"
                          +"<div class='col-3 col-sm-3 col-md-3'>"+elementoConsultaArquivo[elementKeysConsultaArquivo[2]]+"</div>"
                          +"<div class='col-3 col-sm-3 col-md-3'>"+elementoConsultaArquivo[elementKeysConsultaArquivo[3]]+"</div>"                 
                $('#arquivoCarregado').append(html);                                  
      });
 }

 function processarRelatorio(flgSucessoErro) {  
  //--Verificando obrigatoriedade
  if($('#dataEvidenciaSaida').val() == '' || $('#dataEvidenciaSaida').val() == 0 || $('#dataEvidenciaSaida').val() == null){
    alert("Por favor insira uma data.");    
    return;
  }
  if($('#horaEvidenciaSaida').val() == '' || $('#horaEvidenciaSaida').val() == 0 || $('#horaEvidenciaSaida').val() == null){
    alert("Por favor insira uma hora.");    
    return;
  }
  if($('#obsEvidenciaSaida').val() == '' || $('#obsEvidenciaSaida').val() == 0 || $('#obsEvidenciaSaida').val() == null){
      alert("Por favor insira uma observação.");      
      return;
  }
  var documento = document.getElementById('arquivoEvidenciaSaida');
  if(documento.files.length === 0){
      alert("Por favor insira um arquivo.");      
      return;
  }
  if ((documento.value.indexOf('.png') < 0 && documento.value.indexOf('.PNG') < 0) && (documento.value.indexOf('.jpg') < 0 && documento.value.indexOf('.JPG') < 0)) {
      alert("Insira um arquivo no formato JPG ou PNG.");      
      return;
  }

  $('#cover-spin').show(0);

  var apiData              = 'administrador/arquivos/detalhes/arquivos/processar'
  let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + apiData 

  var data = new FormData();
  jQuery.each(jQuery('#arquivoEvidenciaSaida')[0].files, function(i, file) {
      data.append('arquivoEvidenciaSaida', file);
  });
  data.append('dataEvidenciaSaida', $('#dataEvidenciaSaida').val());
  data.append('horaEvidenciaSaida', $('#horaEvidenciaSaida').val());
  data.append('obsEvidenciaSaida', $('#obsEvidenciaSaida').val());
  data.append('arquivoEvidenciaSaida', $('#arquivoEvidenciaSaida').val());
  data.append('execucaoSaidaId', idExecucaoProcesso);  
  data.append('flgSucessoErro', flgSucessoErro); 
  data.append('tokenSigeprev', getCookieSigeprev("tokenSigeprev"));

  var opts = {
      url: urlDominioContextoServicoParametros,
      data: data,
      cache: false,
      contentType: false,
      processData: false,            
      method: 'POST',
      type: 'POST', // For jQuery < 1.9
      success: function(data){
          //alert(data);
      }
  };

  jQuery.ajax(opts);  

  setTimeout(function(){ 
      $('#cover-spin').hide(0);
  }, 2000);     
  document.getElementById('dataEvidenciaSaida').value = ''
  document.getElementById('horaEvidenciaSaida').value = ''
  document.getElementById('obsEvidenciaSaida').value = ''
  document.getElementById('arquivoEvidenciaSaida').value = ''
  var element = document.getElementById("collapseConfirmSaidas");
  element.classList.remove("show");
}

function exportarJpg(id,tipo) {     
  var domain = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
  var apiData              = domain + '/administrador/arquivos/detalhes/arquivos/exportarRelatorioJpg?id=' +id+ '&tipo=' +tipo;
  window.location.href     = apiData;
}

var urlServiceGrupoPagamento = "/administrador/arquivos/detalhes/arquivos/grupoPagamento"
function grupoPagamento(comboGrupoPagamento) {
  var valorSelecionadoGrupoPagamento = $('#comboGrupoPagamento :checked').val();
  console.log(valorSelecionadoGrupoPagamento);
  limparComboBox(comboGrupoPagamento,valorSelecionadoGrupoPagamento);
  var settingsGrupoPagamento = {
      url: urlDominioBackEnd + urlContextoBackEnd + urlServiceGrupoPagamento,
      method: "GET",
      headers: {
        "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
      },
      processData: false,
      crossDomain: true,
      contentType: false
  };
  $.ajax(settingsGrupoPagamento).done(function (responseGrupoPagamento) {
      var keysGrupoPagamento = Object.keys(responseGrupoPagamento);
      responseGrupoPagamento = responseGrupoPagamento[keysGrupoPagamento[0]];
      limparComboBox(comboGrupoPagamento, valorSelecionadoGrupoPagamento);
      responseGrupoPagamento.forEach(elementoGrupoPagamento => {
          var elementKeysGrupoPagamento = Object.keys(elementoGrupoPagamento);
          if (valorSelecionadoGrupoPagamento != undefined && valorSelecionadoGrupoPagamento != null && valorSelecionadoGrupoPagamento != '' && valorSelecionadoGrupoPagamento == elementoGrupoPagamento[elementKeysGrupoPagamento[0]]) {
              $(comboGrupoPagamento).append("<option  value='"+ elementoGrupoPagamento[elementKeysGrupoPagamento[0]] +"'selected>" + elementoGrupoPagamento[elementKeysGrupoPagamento[1]] + "</option>");
          } else {
              $(comboGrupoPagamento).append("<option value='"+ elementoGrupoPagamento[elementKeysGrupoPagamento[0]] +"'>" + elementoGrupoPagamento[elementKeysGrupoPagamento[1]] + "</option>");
          }
      });
  });
}

function atualizaUsuDownload(id){
  let params = {};
  consumidor.executarServico2("/administrador/arquivos/detalhes/arquivos/atualizaUsuDownload?id="+id, params);
}