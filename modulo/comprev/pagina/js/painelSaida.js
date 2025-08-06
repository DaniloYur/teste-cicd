//init
$(function(){ 
  controls();
  entidades(comboEntidade);
  totalArquivosMensal();
  detalheDiario();
  detalheSemanal();
  detalheMensal();    
  alerta();
});


var urlService = "administrador/arquivos/painel/saida/entidades"
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
              $(comboEntidade).append("<option selected>" + elemento[elementKeys[0]] + "</option>");
          } else {
              $(comboEntidade).append("<option>" + elemento[elementKeys[0]] + "</option>");
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

function totalArquivosMensal() {
  let params = {};
  let totalDiario = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/totais/mensal", params);
      var keysTotalDiario = Object.keys(totalDiario);
      totalDiario = totalDiario[keysTotalDiario[0]];
      totalDiario.forEach(elemento => {
          var elementKeys = Object.keys(elemento); 
              if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
                $('#naoExistemInfosMensal').show();                
              }
              //alert(elemento[elementKeys[2]])    
              if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
                $('#divTotalMensal').append("<span id='spanTotalMensal'> "+elemento[elementKeys[0]] + "/"+ elemento[elementKeys[1]] +"</span> entrada/total");               
              }                                              
      });
}

function detalheDiario() {
  let params = {};
  let totalDiario = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/detalhe/diario", params);
      if (totalDiario.data.length == 0){
        $('#naoExistemInfosDetalheMensal').show();
      }
      var keysDetalheDiario = Object.keys(totalDiario);
      totalDiario = totalDiario[keysDetalheDiario[0]];
      totalDiario.forEach(elemento => {
          var elementKeys = Object.keys(elemento);
              if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
                $('#naoExistemInfosDetalheDiario').show();                
              }
              if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
                $('#naoExistemInfosDetalheDiario').hide(); 
                var html = "<tr id='trDetalheDiarioEntidade'><td div='tdDetalheDiarioEntidade'><a href='#painelControleProcesso' onclick='painelDeControle(this.id);' id='"+ elemento[elementKeys[2]] + "'> "+ elemento[elementKeys[2]] + " </a> </td> <td div='tdDetalheDiario'><span id='spanDetalheDiario'> "+elemento[elementKeys[0]] + "/" + elemento[elementKeys[1]] +"</span></td></tr>" 
                $('#tableDetalheDiario').append(html);      
              }    
      });
}

function detalheSemanal() {
  let params = {};
  let totalSemanal = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/detalhe/semanal", params);
      if (totalSemanal.data.length == 0){
        $('#naoExistemInfosDetalheMensal').show();
      }
      var keysDetalheSemanal = Object.keys(totalSemanal);
      totalSemanal = totalSemanal[keysDetalheSemanal[0]];
      totalSemanal.forEach(elemento => {
          var elementKeys = Object.keys(elemento);   
            if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
              $('#naoExistemInfosDetalheSemanal').show();                
            }
            if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
              $('#naoExistemInfosDetalheSemanal').hide(); 
              var html = "<tr id='trDetalheSemanalEntidade'><td div='tdDetalheSemanalEntidade'><a href='#painelControleProcesso' onclick='painelDeControle(this.id);' id='"+ elemento[elementKeys[2]] + "'> "+ elemento[elementKeys[2]] + " </a> </td> <td div='tdDetalheSemanal'><span id='spanDetalheSemanal'> "+elemento[elementKeys[0]] + "/" + elemento[elementKeys[1]] +"</span></td></tr>" 
              $('#tableDetalheSemanal').append(html);     
            }                  
      });
}

function detalheMensal() {
  let params = {};
  let totalMensal = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/detalhe/mensal", params);
      if (totalMensal.data.length == 0){
        $('#naoExistemInfosDetalheMensal').show();
      }
      var keysDetalheMensal = Object.keys(totalMensal);
      totalMensal = totalMensal[keysDetalheMensal[0]];
      totalMensal.forEach(elemento => {
          var elementKeys = Object.keys(elemento);  
              if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
                $('#naoExistemInfosDetalheMensal').show();                
              }
              if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
                $('#naoExistemInfosDetalheMensal').hide();                 
                var html = "<tr id='trDetalheMensalEntidade'><td div='tdDetalheMensalEntidade'><a href='#painelControleProcesso' onclick='painelDeControle(this.id);' id='"+ elemento[elementKeys[2]] + "'> "+ elemento[elementKeys[2]] + " </a> </td> <td div='tdDetalheMensal'><span id='spanDetalheMensal'> "+elemento[elementKeys[0]] + "/" + elemento[elementKeys[1]] +"</span></td></tr>" 
             $('#tableDetalheMensal').append(html);      
              }   
      });
}

function painelDeControle(processo) { 
  $('#cover-spin').show(0);
  $('#tbodyPainelControle').empty();    
  $('#painelControle').show();
  $('#collapseControle').collapse('show')  
  var dataFiltro = $('#date-filter2').val();
  document.getElementById('painelControleProcesso').innerHTML = processo;
 // $('#painelControleProcesso').val() = entidade;
  let params = {processo, dataFiltro};
  let dadosPainel = consumidor.executarServico("/administrador/arquivos/painel/saida/painelDeControle", params);
      var keysDetalheMensal = Object.keys(dadosPainel);
      dadosPainel = dadosPainel[keysDetalheMensal[0]];
      dadosPainel.forEach(elemento => {
          var elementKeys = Object.keys(elemento);   
              //alert(elemento[elementKeys[2]])      
             var html = "<tr id='trPainelDeControle'> <td>"+elemento[elementKeys[0]]+"</td><td>"+elemento[elementKeys[1]]+"</td><td>"+elemento[elementKeys[5]]+"</td><td>"+elemento[elementKeys[2]]+"</td><td>"+elemento[elementKeys[3]]+"</td><td>"+elemento[elementKeys[4]]+"</td> </tr>" 
             $('#tbodyPainelControle').append(html);   
      });
      setTimeout(function(){ 
        $('#cover-spin').hide(0);
    }, 1500);   
}

function detalheProcessamentoFiltro() {
  $('#painelControle').hide();
  $('#cover-spin').show(0);
  $(tableDetalheMensal).empty();
  var entidadeFiltro = $('#comboEntidade').val();
  var dataFiltro = $('#date-filter2').val();
  //alert(entidadeFiltro + dataFiltro);  
  let params = {entidadeFiltro, dataFiltro};
  let totalMensal = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/detalhe/processamentoFiltro", params);
      if (totalMensal.length == 0 || totalMensal.length == undefined){
        $('#naoExistemInfosDetalheMensal').show();                
      }
      var keysDetalheMensal = Object.keys(totalMensal);
      totalMensal = totalMensal[keysDetalheMensal[0]];
      totalMensal.forEach(elemento => {
          var elementKeys = Object.keys(elemento);  
              if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
                $('#naoExistemInfosDetalheMensal').show();                
              }
              if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){                
                $('#naoExistemInfosDetalheMensal').hide(); 
                var html = "<tr id='trDetalheMensalEntidade'><td div='tdDetalheMensalEntidade'><a href='#painelControleProcesso' onclick='painelDeControle(this.id);' id='"+ elemento[elementKeys[2]] + "'> "+ elemento[elementKeys[2]] + " </a> </td> <td div='tdDetalheMensal'><span id='spanDetalheMensal'> "+elemento[elementKeys[0]] + "/" + elemento[elementKeys[1]] +"</span></td></tr>" 
             $('#tableDetalheMensal').append(html);      
              }   
      });
      setTimeout(function(){ 
        $('#cover-spin').hide(0);
    }, 1500); 
}


function totalMensalFiltro() {
  $('#painelControle').hide();
  $('#cover-spin').show(0);
  $(divTotalMensal).empty()
  var entidadeFiltro = $('#comboEntidade').val();
  var dataFiltro = $('#date-filter2').val();
  //alert(entidadeFiltro + dataFiltro);  
  let params = {entidadeFiltro, dataFiltro};
  let totalMensal = consumidor.executarServico("/administrador/arquivos/painel/saida/lista/totais/mensal", params);
      if (totalMensal.length == 0 || totalMensal.length == undefined){
        $('#naoExistemInfosMensal').show();                
      }
      var keysDetalheMensal = Object.keys(totalMensal);
      totalMensal = totalMensal[keysDetalheMensal[0]];
      totalMensal.forEach(elemento => {
          var elementKeys = Object.keys(elemento);  
            if (elemento[elementKeys[0]] == null && elemento[elementKeys[1]] == null){
              $('#naoExistemInfosMensal').show();                
            }
            //alert(elemento[elementKeys[2]])    
            if (elemento[elementKeys[0]] != null && elemento[elementKeys[1]] != null){
              $('#naoExistemInfosMensal').hide();
              $('#divTotalMensal').append("<span id='spanTotalMensal'> "+elemento[elementKeys[0]] + "/"+ elemento[elementKeys[1]] +"</span> entrada/total");               
            }                       
      });
      setTimeout(function(){ 
        $('#cover-spin').hide(0);
    }, 1500); 
}

function alerta() {
  let params = {};
  let alerta = consumidor.executarServico("/administrador/arquivos/painel/saida/alerta", params);
      if (alerta.length == 0 || alerta.length == undefined){
        $('#naoExistemAlertas').show();                
      }
      var keysDetalheMensal = Object.keys(alerta);
      alerta = alerta[keysDetalheMensal[0]];
      alerta.forEach(elemento => {
          var elementKeys = Object.keys(elemento);             
              $('#naoExistemAlertas').hide();
              $('#cardPainelAlertas').append("<p><span> "+elemento[elementKeys[4]]+"</span> "+elemento[elementKeys[1]]+"</p>");                                                 
      });
      setTimeout(function(){ 
        $('#cover-spin').hide(0);
    }, 1500); 
}

function verificaFiltro(){
  if($('#comboEntidade').val() == '' || $('#date-filter2').val() == ''){
    alert('Preencha todos os campos do filtro.');
    return;
  }
  else{
    detalheProcessamentoFiltro();
    totalMensalFiltro();
  }
}