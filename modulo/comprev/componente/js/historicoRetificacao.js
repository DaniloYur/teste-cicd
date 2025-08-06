$(function(){
    $("#btnClose").click(function(){ window.close() });
});


$(document).ready(function(){
    gerarTabelaHistoricoRetificacao();
});

function gerarTabelaHistoricoRetificacao(){
    let paramsRetificacoes = {};
    paramsRetificacoes.numSeqReq =   urlParametros.get("numSeqReq");
    let jsonRetificacoes = consumidor.executarServico("retificacao/pesquisarRetificacoesTelaCadastroRequerimentoHistorico", paramsRetificacoes);

    let cabecalhoDaTabela  = '<tr>';
    cabecalhoDaTabela     += '<th>Data</th>';
    cabecalhoDaTabela     += '<th>Usuário</th>';
    cabecalhoDaTabela     += '<th>Campo</th>';
    cabecalhoDaTabela     += '<th>Valor Anterior</th>';
    cabecalhoDaTabela     += '<th>Valor Atualizado</th>';
    cabecalhoDaTabela     += '<th>Análise Spprev</th>';
    cabecalhoDaTabela     += '<th>Observação</th>';
    cabecalhoDaTabela     +=  '</tr>';

    if(JSON.stringify(jsonRetificacoes.listaRetificacoes) === '[]'){
        //TODO Nao foram encontrados registros, mostrar uma msg em vermelho?

    }else{
        let corpoDaTabela = '';
        $.each(jsonRetificacoes.listaRetificacoes, function(eachIndice, eachRetificacao){
                corpoDaTabela += '<tr>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=         eachRetificacao.datIng;
                corpoDaTabela +=     '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=         eachRetificacao.nomUsuUltAtu;
                corpoDaTabela +=     '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=          eachRetificacao.desCampo;
                corpoDaTabela +=      '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=         eachRetificacao.valMascaraAtual;
                corpoDaTabela +=      '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=         eachRetificacao.valMascaraNovo;
                corpoDaTabela +=      '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=          eachRetificacao.desCampoAtualizado;
                corpoDaTabela +=      '</td>';
                corpoDaTabela +=     '<td>';
                corpoDaTabela +=          eachRetificacao.observacao;
                corpoDaTabela +=      '</td>';
                corpoDaTabela += '</tr>';
        });

        $('#tabelaHistoricoRetificacao').find('thead').empty();
        $('#tabelaHistoricoRetificacao').find('thead').append(cabecalhoDaTabela);
        $('#tabelaHistoricoRetificacao').find('tbody').empty();
        $('#tabelaHistoricoRetificacao').find('tbody').append(corpoDaTabela);
    }
}