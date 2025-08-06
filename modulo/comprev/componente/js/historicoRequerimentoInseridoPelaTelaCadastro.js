
$(function(){
    $("#btnClose").click(function(){ window.close() });
});


$(document).ready(function(){
    gerarTabelaHistoricoAtualizacao();
});


function gerarTabelaHistoricoAtualizacao(paramCodIdeCli){
    let params = {};
    params.numSeqReq = urlParametros.get("numSeqReq");
    let jsonData = consumidor.executarServico("controleCompensacao/consultarDadosRequerimentoInseridosPelaTelaCadastroHistorico", params);

    let cabecalhoDaTabela  = '<tr><th>CAMPO ALTERADO</th>';
    cabecalhoDaTabela     += '<th>ANTES DA ALTERAÇÃO</th>';
    cabecalhoDaTabela     += '<th>ALTERAÇÃO EFETUADA</th>';
    cabecalhoDaTabela     += '<th>DT. ATUALIZAÇÃO</th>';
    cabecalhoDaTabela     += '<th>USUÁRIO</th>';
    cabecalhoDaTabela     += '<th>STATUS DE ANÁLISE NO MOMENTO DA ALTERAÇÃO</th></tr>';


    if(JSON.stringify(jsonData.listaHistoricos) === '[]'){

    }else{
        let corpoDaTabela = '';
        $.each(jsonData.listaHistoricos, function(eachIndice, eachHistorico){

            corpoDaTabela += '<tr>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachHistorico.nomCampo;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachHistorico.desValAnteriorMascara;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=          eachHistorico.desValAlteradoMascara;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachHistorico.datIng;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachHistorico.nomUsuUltAtu;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=          eachHistorico.desAnalise;
            corpoDaTabela +=      '</td>';
            corpoDaTabela += '</tr>';
        });


        $('#tabelaHistoricoAtualizacao').find('thead').empty();
        $('#tabelaHistoricoAtualizacao').find('thead').append(cabecalhoDaTabela);
        $('#tabelaHistoricoAtualizacao').find('tbody').empty();
        $('#tabelaHistoricoAtualizacao').find('tbody').append(corpoDaTabela);
    }

}