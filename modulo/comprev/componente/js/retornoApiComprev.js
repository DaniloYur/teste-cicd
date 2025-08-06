

$(document).ready(function(){  

  let codIdeCli = urlParametros.get("codIdeCli");
  let numSeqBeneficio = urlParametros.get("numSeqBeneficio");
  consultarApiComprev(codIdeCli, numSeqBeneficio);
});





function consultarApiComprev(codIdeCli, numSeqBeneficio){ 
  $('#terceiroBlocoApiComprev').empty();
  $('#terceiroBlocoApiComprev').show();
  let params = {};
  params.codIdeCli = codIdeCli;
  params.numSeqBeneficio = numSeqBeneficio;

  let jsonData = consumidor.executarServico("controleCompensacao/consultarDetalheApiComprev", params);
  
  let listaApiComprev = jsonData.listaApiComprev;

  $('#numCpf').text(jsonData.cabecalhoApiComprev.numCpf);
  $('#nomPessoaFisica').text(jsonData.cabecalhoApiComprev.nomPessoaFisica);
  $('#numMatricula').text(jsonData.cabecalhoApiComprev.numMatricula);
  $('#codParticipante').text(jsonData.cabecalhoApiComprev.codParticipante);
  $('#nomParticipante').text(jsonData.cabecalhoApiComprev.nomParticipante);
 
  if(JSON.stringify(listaApiComprev) === '[]'){
    $('#mensagemApiComprev').html('<font color="red">Não foram encontrados registros de retorno da api do comprev.</font>');	
  }else{
    $.each(listaApiComprev, function(eachIndice, eachApi){	   

      let cabecalhoDaTabela  = '<div class="table-responsive">';
      cabecalhoDaTabela     += '<table class="tabelaPaddingMenor comprev" id="tabelaApiComprev'+ eachIndice + '">';
      cabecalhoDaTabela     += '<thead>';
      cabecalhoDaTabela     +=     '<th>Tipo de Ação</th>';
      cabecalhoDaTabela     +=     '<th>Data</th>';
      cabecalhoDaTabela     +=     '<th>Protocolo</th>';
      cabecalhoDaTabela     +=     '<th>CPF</th>';
      cabecalhoDaTabela     +=     '<th>Matrícula</th>';
      cabecalhoDaTabela     +=      '<th>Nome</th>';
      cabecalhoDaTabela     +=      '<th>Solicitante</th>';
      cabecalhoDaTabela     +=      '<th>Destinatário</th>';
      cabecalhoDaTabela     +=      '<th>Tipo de Requerimento</th>';
      cabecalhoDaTabela     +=      '<th>Estado</th>';
      cabecalhoDaTabela     +=      '<th>Qtde de dias Aguardando Análise</th>';
      cabecalhoDaTabela     +=      '<th>Número do Benefício</th>';
      cabecalhoDaTabela     +=      '<th>Data Disponibilidade Análise</th>';
      cabecalhoDaTabela     += '</thead>';    
  
      let corpoDaTabela = '<tbody>';
      corpoDaTabela += '<tr>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.desTipoReq;
      corpoDaTabela +=     '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.datRequisicao;
      corpoDaTabela +=     '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.numProtocolo;
      corpoDaTabela +=     '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.cpf;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.numMatricula;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.desNome;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.desSolicitante;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.codDestinatario + ' - ' + eachApi.nomParticipante;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.codTipoRequerimento + ' - ' + eachApi.desTipoRequerimento;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.codEstado + ' - ' + eachApi.desEstado;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.qtdDiasAguardAnalise;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.numBeneficio;
      corpoDaTabela +=      '</td>';
      corpoDaTabela +=     '<td>';
      corpoDaTabela +=         eachApi.datDispAnalise;
      corpoDaTabela +=      '</td>';
      corpoDaTabela += '</tr>';    
      corpoDaTabela += '</tbody>';  
  
      corpoDaTabela += '</table>';  
      corpoDaTabela += '</div>'; 
  
      let tabelaExigencia = ''
     if(eachApi.desPrazoAtendExig === ''){
  
     }else{
      tabelaExigencia ='<table class="tabelaPaddingMenor fundo01 my-2" id="tabelaApiCosmprev'+ eachIndice + '">';
      tabelaExigencia +='<thead>';
      tabelaExigencia +='	<th>EXIGÊNCIAS</th>';
      tabelaExigencia +='</thead>';
      tabelaExigencia +='<tbody>';
      tabelaExigencia +='<tr><td><strong>Prazo para Atendimento das Exigências: </strong>';    
      tabelaExigencia += eachApi.desPrazoAtendExig;
      tabelaExigencia += '</td></tr>';
      tabelaExigencia +='</tbody>';
      tabelaExigencia +='</table>';
     }
  
      
      $('#terceiroBlocoApiComprev').append(cabecalhoDaTabela + corpoDaTabela + tabelaExigencia);
  
      let paramsExigencia = {};
      paramsExigencia.numSeqReqRetApi = eachApi.numSeqReqRetApi;

      
      let jsonDatExigencia = consumidor.executarServico("controleCompensacao/consultarApiComprevExigencia", paramsExigencia);
     
      if(JSON.stringify(jsonDatExigencia.listaApiExigencia) === '[]'){
      
  
      }else{
        let cabecalhoDaTabelaExigencia  = '<div class="table-responsive">';
        cabecalhoDaTabelaExigencia     += '<table class="tabelaPaddingMenor fundo03" id="tabelaApiComprevExigencia'+ eachIndice + '">';
        cabecalhoDaTabelaExigencia     += '<thead>';
        cabecalhoDaTabelaExigencia     +=     '<th>Código</th>';
        cabecalhoDaTabelaExigencia     +=     '<th>Tipo</th>';
        cabecalhoDaTabelaExigencia     +=     '<th>Ação</th>';
        cabecalhoDaTabelaExigencia     +=     '<th>Atributo</th>';
        cabecalhoDaTabelaExigencia     +=      '<th>Tipo de Documento</th>';
        cabecalhoDaTabelaExigencia     += '</thead>'; 
        let corpoDaTabelaExigencia = '<tbody>';
        $.each(jsonDatExigencia.listaApiExigencia, function(eachIndice, eachApiExigencia){	    
          corpoDaTabelaExigencia += '<tr>';
          corpoDaTabelaExigencia +=     '<td>';
          corpoDaTabelaExigencia +=         eachApiExigencia.codNum;
          corpoDaTabelaExigencia +=     '</td>';
          corpoDaTabelaExigencia +=     '<td>';
          corpoDaTabelaExigencia +=         eachApiExigencia.codTipo;
          corpoDaTabelaExigencia +=     '</td>';
          corpoDaTabelaExigencia +=     '<td>';
          corpoDaTabelaExigencia +=         eachApiExigencia.desAcao;
          corpoDaTabelaExigencia +=      '</td>';
          corpoDaTabelaExigencia +=     '<td>';
          corpoDaTabelaExigencia +=         eachApiExigencia.desAtributo;
          corpoDaTabelaExigencia +=      '</td>';
          corpoDaTabelaExigencia +=     '<td>';
          corpoDaTabelaExigencia +=         eachApiExigencia.codTipDoc;
          corpoDaTabelaExigencia +=      '</td>';
          corpoDaTabelaExigencia += '</tr>';    
        });
        corpoDaTabelaExigencia += '</tbody>';  
      
        corpoDaTabelaExigencia += '</table>';  
        corpoDaTabelaExigencia += '</div>'; 
    
        $('#terceiroBlocoApiComprev').append(cabecalhoDaTabelaExigencia + corpoDaTabelaExigencia);
      }
  
  
  
  
      let paramsErros= {};
      paramsErros.numSeqReqRetApi = eachApi.numSeqReqRetApi;

      
      let jsonDatExigenciaErros = consumidor.executarServico("controleCompensacao/consultarApiComprevErros", paramsErros);
    
      if(JSON.stringify(jsonDatExigenciaErros.listaApiErros) === '[]'){  
  
      }else{
        let cabecalhoDaTabelaExigenciaErro  = '<div class="table-responsive">';
        cabecalhoDaTabelaExigenciaErro     += '<table class="tabelaPaddingMenor fundo03 centralizar-tabela" id="tabelaApiComprevExigenciaErro'+ eachIndice + '">';       
        cabecalhoDaTabelaExigenciaErro     += '<thead>';
  
        cabecalhoDaTabelaExigenciaErro     += '<tr>';
        cabecalhoDaTabelaExigenciaErro     += '<th colspan="5" class="fundo04">ERROS</th>';
        cabecalhoDaTabelaExigenciaErro     += '</tr>';
  
        cabecalhoDaTabelaExigenciaErro     += '<tr>';
        cabecalhoDaTabelaExigenciaErro     +=     '<th>Código</th>';
        cabecalhoDaTabelaExigenciaErro     +=     '<th>Atributo</th>';
        cabecalhoDaTabelaExigenciaErro     +=     '<th>Mensagem</th>';
        cabecalhoDaTabelaExigenciaErro     +=     '<th>Descrição</th>';
        cabecalhoDaTabelaExigenciaErro     +=      '<th>Índice Lista</th>';
        cabecalhoDaTabelaExigenciaErro     += '</tr>';
  
        cabecalhoDaTabelaExigenciaErro     += '</thead>'; 
  
        let corpoDaTabelaExigenciaErro = '<tbody>';
        $.each(jsonDatExigenciaErros.listaApiErros, function(eachIndiceExigenciaErro, eachErro){
          corpoDaTabelaExigenciaErro += '<tr>';
          corpoDaTabelaExigenciaErro +=     '<td>';
          corpoDaTabelaExigenciaErro +=         eachErro.codNum;
          corpoDaTabelaExigenciaErro +=     '</td>';
          corpoDaTabelaExigenciaErro +=     '<td>';
          corpoDaTabelaExigenciaErro +=         eachErro.desAtributo;
          corpoDaTabelaExigenciaErro +=     '</td>';
          corpoDaTabelaExigenciaErro +=     '<td>';
          corpoDaTabelaExigenciaErro +=         eachErro.desMsg;
          corpoDaTabelaExigenciaErro +=      '</td>';
          corpoDaTabelaExigenciaErro +=     '<td>';
          corpoDaTabelaExigenciaErro +=         eachErro.desObs;
          corpoDaTabelaExigenciaErro +=      '</td>';
          corpoDaTabelaExigenciaErro +=     '<td>';
          corpoDaTabelaExigenciaErro +=         eachErro.numIndiceLista;
          corpoDaTabelaExigenciaErro +=      '</td>';
          corpoDaTabelaExigenciaErro += '</tr>';    
        });
        corpoDaTabelaExigenciaErro += '</tbody>';  
      
        corpoDaTabelaExigenciaErro += '</table>';  
        corpoDaTabelaExigenciaErro += '</div>'; 
        corpoDaTabelaExigenciaErro += '<br/>'; 
    
        $('#terceiroBlocoApiComprev').append(cabecalhoDaTabelaExigenciaErro + corpoDaTabelaExigenciaErro);
      }
  
      
    });

  }
 


}