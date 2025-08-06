let arrayRegistrosLsv = [];


let registroLsvSelecionado = obterObjetoLsvLimpo();

/**
 * Essa função é executada caso o campo "Houve Licença Sem Vencimentos após esse Período?" for alterado.
 * Ela também é chamada ao carregar as telas de Requerimento e Cadastro Requerimento.
 */
function executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo(){
    $('#divLsv').hide();

    selecionarPeriodoLsv('');

    if($('input[name=flgLicenca]:checked').val() === 'S') {
        carregarGridRegistrosLsv();
        $('#divLsv').show();
    }
}

function pesquisarLsvCadastradasNoBanco(paramNumSeqFunc){
    if(paramNumSeqFunc === '' || paramNumSeqFunc === null){

    }else{
        let params = {};
         params.numSeqFunc = paramNumSeqFunc;
        //params.numSeqFunc = 1;
        let jsonData = consumidor.executarServico("controleCompensacao/consultarPeriodosLsv", params);

        if(JSON.stringify(jsonData.listaLsv) !== '[]'){
            arrayRegistrosLsv = jsonData.listaLsv;
            carregarGridRegistrosLsv();
        }
    }
}

function carregarGridRegistrosLsv(){
    $('#divRegistrosLsv').empty();

    if(arrayRegistrosLsv.length === 0) {
        $('#divRegistrosLsv').html('<span class="negrito destaque-warning">Não existem registros LSV cadastrados.</span>');

    }else{
        let conteudoTabela = '<table class="tabelaRegistrosLSV tabelaLink">';
        conteudoTabela    += '<thead>';
        conteudoTabela    += '<th class="text-center">Item</th>';
        conteudoTabela    += '<th class="text-center">Data de Início da LSV</th>';
        conteudoTabela    += '<th class="text-center">Data de Fim da LSV</th>';
        conteudoTabela    += '</thead>';

        conteudoTabela    += '<tbody>';
        $.each(arrayRegistrosLsv, function(eachIndice, eachLsv){
            conteudoTabela    += '<tr>';
            conteudoTabela    +=      obterLinkSelecionarPeriodoLsv(eachLsv.numItem, eachLsv.numItem);
            conteudoTabela    +=      obterLinkSelecionarPeriodoLsv(eachLsv.numItem, eachLsv.datIniLsv);
            conteudoTabela    +=      obterLinkSelecionarPeriodoLsv(eachLsv.numItem, eachLsv.datFimLsv);
            conteudoTabela    += '</tr>';
        });

        conteudoTabela    += '</tbody>';
        conteudoTabela    += '</table>';
        $('#divRegistrosLsv').append(conteudoTabela);
    }
}

function inserirRegistroLsv(){
    let mensagemValidacao = validarObjetoLsv();

    if(mensagemValidacao === ''){
        let objetoLsv = obterObjetoLsvLimpo();
        preencherObjetoPeriodoLsvComValoresPreenchidosDaTela(objetoLsv);
        objetoLsv.numItem      = arrayRegistrosLsv.length + 1;
        arrayRegistrosLsv.push(objetoLsv);
        selecionarPeriodoLsv('');
        executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo();
    }else{
        alert(mensagemValidacao);
    }
}


function alterarRegistroLsv(){
    for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--) {
        if (arrayRegistrosLsv[i].numItem === registroLsvSelecionado.numItem) {
            preencherObjetoPeriodoLsvComValoresPreenchidosDaTela(arrayRegistrosLsv[i]);
        }
    }
    executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo();
    selecionarPeriodoLsv('');
}

function excluirRegistroLsv(){
    for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--){
        if(arrayRegistrosLsv[i].numItem === registroLsvSelecionado.numItem){
            arrayRegistrosLsv.splice(i, 1);
            break;
        }
    }
    executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo();
    selecionarPeriodoComprev('');
}

function limparCamposLsv(){
    $('#datIniLsv').val('');
    $('#datFimLsv').val('');
    $('#btnInserirLsv').show();
    $('#btnAlterarLsv').hide();
    $('#btnExcluirLsv').hide();
}


function preencherObjetoPeriodoLsvComValoresPreenchidosDaTela(objetoLsv){
    objetoLsv.datIniLsv  = $('#datIniLsv').val();
    objetoLsv.datFimLsv  = $('#datFimLsv').val();
}


function validarObjetoLsv(){
    let mensagemValidacaoLsv = '';
    with (document.forms[0]) {
        if(datIniLsv.value  === ''){ mensagemValidacaoLsv += "- O campo Data de Início da LSV é obrigatório.\n"; }
        if(datFimLsv.value  === ''){ mensagemValidacaoLsv += "- O campo Data de Fim da LSV é obrigatório.\n"; }
        if (mensagemValidacaoLsv !== ""){  return mensagemValidacaoLsv; }

        if(!ValidaData(datIniLsv.value)){  mensagemValidacaoLsv += "- O campo Data de Início da LSV não foi preenchido com uma data correta.\n"; }
        if(!ValidaData(datFimLsv.value)){  mensagemValidacaoLsv += "- O campo Data de Fim da LSV não foi preenchido com uma data correta.\n"; }
        if (mensagemValidacaoLsv !== ""){  return mensagemValidacaoLsv; }

        if(comparaDatas(datIniLsv.value, datFimLsv.value) > 1){
            mensagemValidacaoLsv = "- " + datIniLsv.title + "(" + datIniLsv.value + ") deve ser menor que  a "+ datFimLsv.title + "(" + datFimLsv.value + ").\n";
        }

        if(mensagemValidacaoLsv == ''){
            mensagemValidacaoLsv = verificarConcomitanciaPeriodosLsv();
        }

        return mensagemValidacaoLsv;
    }
}


function verificarConcomitanciaPeriodosLsv(){
    let mensagemPeriodoConcomitante = '';

        for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--){
            if(moment($('#datIniLsv').val(), 'DD/MM/YYYY').isSameOrAfter(moment(arrayRegistrosLsv[i].datIniLsv, 'DD/MM/YYYY'))){
                if(moment($('#datIniLsv').val(), 'DD/MM/YYYY').isSameOrBefore(moment(arrayRegistrosLsv[i].datFimLsv, 'DD/MM/YYYY'))){
                    mensagemPeriodoConcomitante = 'Existe concomitância LSV no período inserido com o período existente. ' + '(' + arrayRegistrosLsv[i].datIniLsv + ', ' + arrayRegistrosLsv[i].datFimLsv + ').';
                }
            }

            if(mensagemPeriodoConcomitante === ''){
                if(moment($('#datFimLsv').val(), 'DD/MM/YYYY').isSameOrAfter(moment(arrayRegistrosLsv[i].datIniLsv, 'DD/MM/YYYY'))){
                    if(moment($('#datFimLsv').val(), 'DD/MM/YYYY').isSameOrBefore(moment(arrayRegistrosLsv[i].datFimLsv, 'DD/MM/YYYY'))){
                        mensagemPeriodoConcomitante = 'Existe concomitância LSV no período inserido com o período existente. ' + '(' + arrayRegistrosLsv[i].datIniLsv + ', ' + arrayRegistrosLsv[i].datFimLsv + ').';
                    }
                }
            }
        }
    return mensagemPeriodoConcomitante;
}


function obterLinkSelecionarPeriodoLsv(paramNumItem, paramDescricao){
    let conteudo = '<td class="text-center">';
    conteudo    +=     '<a href="javascript:selecionarPeriodoLsv(' + paramNumItem + ')">';
    if(paramDescricao !== undefined){
        conteudo    +=  paramDescricao
    }
    conteudo    +=     '</a>';
    conteudo    += '</td>';
    return conteudo;
}

function selecionarPeriodoLsv(paramIndice){
    if(paramIndice === ''){
        registroLsvSelecionado = obterObjetoLsvLimpo();
    }else{
        let indiceSelecionado = arrayRegistrosLsv.length - 1;
        for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--){
            if(arrayRegistrosLsv[i].numItem === paramIndice){
                break;
            }else{
                --indiceSelecionado;
            }
        }
        registroLsvSelecionado = arrayRegistrosLsv[indiceSelecionado];
    }

    $('#datIniLsv').val(registroLsvSelecionado.datIniLsv);
    $('#datFimLsv').val(registroLsvSelecionado.datFimLsv);

    if(paramIndice === ''){
        $('#btnInserirLsv').show();
        $('#btnAlterarLsv').hide();
        $('#btnExcluirLsv').hide();

    }else{
        $('#btnInserirLsv').hide();
        $('#btnAlterarLsv').show();
        $('#btnExcluirLsv').show();
    }
}



function obterObjetoLsvLimpo(){
    let objetoLsv = {
        numSeqFuncLsv : '',
        numItem       : '',
        datIniLsv     : '',
        datFimLsv     : ''
    }
    return objetoLsv;
}



function verificarRegraParaAlterarCampoDataInicioEstatutarioEfetivo(){
    if(arrayRegistrosLsv.length === 0) {

    }else{


        let isDataEstatutarioValida = true;

        let dataInicioEstatutarioEfetivoAntes = $('#datIniEstatutarioEfetivo').val(); //TODO
        let dataInicioEstatutarioEfetivoDepois = $('#datIniEstatutarioEfetivo').val();

        for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--){
            if(moment(dataInicioEstatutarioEfetivoDepois, 'DD/MM/YYYY').isAfter(moment(arrayRegistrosLsv[i].datIniLsv, 'DD/MM/YYYY'))){
                isDataEstatutarioValida = false;
                break;
            }
        }

        if(!isDataEstatutarioValida){
            alert('Não é possível alterar a data do campo "Data Início Estatutário / Efetivo" para uma data inferior as datas de início das LSVs cadastradas.');
            $('#datIniEstatutarioEfetivo').val(''); //TODO voltar o valor atual.

        }



    }

}