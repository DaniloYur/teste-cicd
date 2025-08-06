const COD_REGIME_ORIGEM_RGPS = '1';
const COD_REGIME_ORIGEM_RPPS = '2';

let arrayPeriodosComprev = [];
let periodoSelecionadoComprev = obterObjetoPeriodoComprevLimpo();


function obterObjetoPeriodoComprevLimpo(){
    let objetoPeriodo = {
        numItem              : '', // Número do Item
        numSeqReqCert        : '', // Sequence Banco de Dados Certidao
        numSeqReqCertDet     : '', // Sequence Banco de Dados Certidao Detalhe
        datIni               : '', // Início Período Considerado
        datFim               : '', // Fim do Período Considerado
        nomEmpresa           : '', // Empresa
        qtdTmpTotal          : '', // Tempo Considerado
        qtdDescontos         : '', // Qtde de Descontos
        numCertidao          : '', // Protocolo de Certidão CTC/CTS
        qtdTmpTotalCertidao  : '', // Total da Certidão

        qtdTmpLiqAnoCertidao : '', // Qtd de anos da Certidão  - Apenas RPPS
        qtdTmpLiqMesCertidao : '', // Qtd de meses da Certidão - Apenas RPPS
        qtdTmpLiqDiaCertidao : '', // Qtd de dias da Certidão  - Apenas RPPS

        qtdTmpLiqAnoDet      : '', // Qtd de anos
        qtdTmpLiqMesDet      : '', // Qtd de meses
        qtdTmpLiqDiaDet      : ''  // Qtd de dias

    }
    return objetoPeriodo;
}



function limparPeriodoComprev(){
    periodoSelecionadoComprev = obterObjetoPeriodoComprevLimpo();
    selecionarPeriodoComprev('');
    $('#btnInserirPeriodo').show();
    $('#btnInserirPeriodoParaCertidao').hide();
    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnAdicionarPeriodo').hide();

    $('#rgpsNumCertidao').prop("disabled", false);
    $('#rppsNumCertidao').prop("disabled", false);

    //$('#rgpsQtdTmpTotalCertidao').prop("disabled", false);
    $('#rppsQtdTmpTotalCertidao').prop("disabled", false);

}

function selecionarPeriodoComprev(paramIndice){
    if(paramIndice === ''){
        periodoSelecionadoComprev = obterObjetoPeriodoComprevLimpo();
    }else{
        let indiceSelecionado = arrayPeriodosComprev.length - 1;
        for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){
            if(arrayPeriodosComprev[i].numItem === paramIndice){
                break;
            }else{
                --indiceSelecionado;
            }
        }
        periodoSelecionadoComprev = arrayPeriodosComprev[indiceSelecionado];
    }

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS){
        $('#rgpsDatIni').val(periodoSelecionadoComprev.datIni);
        $('#rgpsDatFim').val(periodoSelecionadoComprev.datFim);
        $('#rgpsNomEmpresa').val(periodoSelecionadoComprev.nomEmpresa);
        $('#rgpsNumCertidao').val(periodoSelecionadoComprev.numCertidao);
        $('#rgpsQtdTmpTotalCertidao').val(periodoSelecionadoComprev.qtdTmpTotalCertidao);
        $('#rgpsQtdTmpLiqAnoDet').val(periodoSelecionadoComprev.qtdTmpLiqAnoDet);
        $('#rgpsQtdTmpLiqMesDet').val(periodoSelecionadoComprev.qtdTmpLiqMesDet);
        $('#rgpsQtdTmpLiqDiaDet').val(periodoSelecionadoComprev.qtdTmpLiqDiaDet);

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        $('#rppsNumCertidao').val(periodoSelecionadoComprev.numCertidao);
        $('#rppsQtdTmpTotalCertidao').val(periodoSelecionadoComprev.qtdTmpTotalCertidao);

        $('#rppsQtdTmpLiqAnoCertidao').val(periodoSelecionadoComprev.qtdTmpLiqAnoCertidao);
        $('#rppsQtdTmpLiqMesCertidao').val(periodoSelecionadoComprev.qtdTmpLiqMesCertidao);
        $('#rppsQtdTmpLiqDiaCertidao').val(periodoSelecionadoComprev.qtdTmpLiqDiaCertidao);

        $('#rppsQtdTmpLiqAnoDet').val(periodoSelecionadoComprev.qtdTmpLiqAnoDet);
        $('#rppsQtdTmpLiqMesDet').val(periodoSelecionadoComprev.qtdTmpLiqMesDet);
        $('#rppsQtdTmpLiqDiaDet').val(periodoSelecionadoComprev.qtdTmpLiqDiaDet);

        $('#rppsDatIni').val(periodoSelecionadoComprev.datIni);
        $('#rppsDatFim').val(periodoSelecionadoComprev.datFim);
        $('#rppsQtdDescontos').val(periodoSelecionadoComprev.qtdDescontos);
        $('#rppsTempoConsiderado').val(periodoSelecionadoComprev.qtdTmpTotal);
    }

    if(paramIndice === ''){
        $('#btnInserirPeriodo').show();
        $('#btnInserirPeriodoParaCertidao').hide();
        $('#btnAlterarPeriodo').hide();
        $('#btnExcluirPeriodo').hide();
        $('#btnAdicionarPeriodo').hide();

    }else{
        $('#btnInserirPeriodo').hide();
        $('#btnInserirPeriodoParaCertidao').hide();
        $('#btnAlterarPeriodo').show();
        $('#btnExcluirPeriodo').show();
        $('#btnAdicionarPeriodo').show();
    }

    $('#rgpsNumCertidao').prop("disabled", false);
    $('#rppsNumCertidao').prop("disabled", false);

    $('#rgpsQtdTmpTotalCertidao').prop("disabled", false);
    $('#rppsQtdTmpTotalCertidao').prop("disabled", false);
}






function preencherObjetoPeriodoComprevComValoresPreenchidosDaTela(periodoComprev){
    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        periodoComprev.datIni               = $('#rgpsDatIni').val();
        periodoComprev.datFim               = $('#rgpsDatFim').val();
        periodoComprev.nomEmpresa           = $('#rgpsNomEmpresa').val();
        periodoComprev.numCertidao          = $('#rgpsNumCertidao').val();
        periodoComprev.qtdTmpTotalCertidao  = $('#rgpsQtdTmpTotalCertidao').val();
        periodoComprev.qtdTmpLiqAnoDet      = $('#rgpsQtdTmpLiqAnoDet').val();
        periodoComprev.qtdTmpLiqMesDet      = $('#rgpsQtdTmpLiqMesDet').val();
        periodoComprev.qtdTmpLiqDiaDet      = $('#rgpsQtdTmpLiqDiaDet').val();

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        periodoComprev.numCertidao         = $('#rppsNumCertidao').val();
        periodoComprev.qtdTmpTotalCertidao = $('#rppsQtdTmpTotalCertidao').val();

        periodoComprev.qtdTmpLiqAnoCertidao = $('#rppsQtdTmpLiqAnoCertidao').val();
        periodoComprev.qtdTmpLiqMesCertidao = $('#rppsQtdTmpLiqMesCertidao').val();
        periodoComprev.qtdTmpLiqDiaCertidao = $('#rppsQtdTmpLiqDiaCertidao').val();

        periodoComprev.qtdTmpLiqAnoDet      = $('#rppsQtdTmpLiqAnoDet').val();
        periodoComprev.qtdTmpLiqMesDet      = $('#rppsQtdTmpLiqMesDet').val();
        periodoComprev.qtdTmpLiqDiaDet      = $('#rppsQtdTmpLiqDiaDet').val();

        periodoComprev.datIni       = $('#rppsDatIni').val();
        periodoComprev.datFim       = $('#rppsDatFim').val();
        periodoComprev.qtdDescontos = $('#rppsQtdDescontos').val();

        periodoComprev.qtdTmpTotal  = $('#rppsTempoConsiderado').val();
    }
}



function validarPeriodoRPPS(paramAcao){
    let mensagemValidacaoRPPS = '';
    with (document.forms[0]) {
        if(rppsDatIni.value  === ''){  mensagemValidacaoRPPS += "- O campo Início Período Considerado é obrigatório.\n"; }
        if(rppsDatFim.value  === ''){ mensagemValidacaoRPPS += "- O campo Fim do Período Considerado  é obrigatório.\n"; }
        if(rppsQtdDescontos.value  === ''){  mensagemValidacaoRPPS += "- O campo Qtde de Descontos é obrigatório.\n";   }
        if(rppsTempoConsiderado.value  === ''){  mensagemValidacaoRPPS += "- O campo Tempo Considerado é obrigatório.\n"; }
        if (mensagemValidacaoRPPS != ""){  return mensagemValidacaoRPPS; }

        if(!ValidaData(rppsDatIni.value)){ mensagemValidacaoRPPS += "- O campo Início Período Considerado não foi preenchido com uma data correta.\n"; }
        if(!ValidaData(rppsDatFim.value)){ mensagemValidacaoRPPS += "- O campo Fim Período Considerado não foi preenchido com uma data correta.\n";}
        if (mensagemValidacaoRPPS !== ""){  return mensagemValidacaoRPPS;}

        if(comparaDatas(rppsDatIni.value, rppsDatFim.value) > 1){
            mensagemValidacaoRPPS = "- " + rppsDatIni.title + "(" + rppsDatIni.value + ") deve ser menor que  a "+ rppsDatFim.title + "(" + rppsDatFim.value + ").\n";
        }

        if(mensagemValidacaoRPPS == ''){
            mensagemValidacaoRPPS = verificarPeriodosComTempoTotalCertidao(paramAcao);
        }
        if(mensagemValidacaoRPPS == ''){
            mensagemValidacaoRPPS = verificarConcomitanciaPeriodos(paramAcao);
        }
        if(mensagemValidacaoRPPS == ''){
            mensagemValidacaoRPPS = verificarPeriodoComDataEstatutarioJuntoComLsv(paramAcao);
        }

        return mensagemValidacaoRPPS;
    }
}

function validarPeriodoRGPS(paramAcao){
    let mensagemValidacaoRGPS = '';

    with (document.forms[0]) {
        if(rgpsDatIni.value  === ''){ mensagemValidacaoRGPS += "- O campo Início Período Considerado é obrigatório.\n"; }
        if(rgpsDatFim.value  === ''){  mensagemValidacaoRGPS += "- O campo Fim do Período Considerado é obrigatório.\n"; }
        if(rgpsNomEmpresa.value  === ''){  mensagemValidacaoRGPS += "- O campo Empresa é obrigatório.\n"; }
        if(rgpsQtdTmpLiqAnoDet.value  === ''){ mensagemValidacaoRGPS += "- O campo Anos é obrigatório.\n"; }
        if(rgpsQtdTmpLiqMesDet.value  === ''){ mensagemValidacaoRGPS += "- O campo Meses é obrigatório.\n"; }
        if(rgpsQtdTmpLiqDiaDet.value  === ''){ mensagemValidacaoRGPS += "- O campo Dias é obrigatório.\n"; }
        if (mensagemValidacaoRGPS !== ""){ return mensagemValidacaoRGPS; }

        if(!ValidaData(rgpsDatIni.value)){  mensagemValidacaoRGPS += "- O campo Início Período Considerado não foi preenchido com uma data correta.\n"; }
        if(!ValidaData(rgpsDatFim.value)){  mensagemValidacaoRGPS += "- O campo Fim Período Considerado não foi preenchido com uma data correta.\n"; }
        if (mensagemValidacaoRGPS !== ""){  return mensagemValidacaoRGPS; }

        if(comparaDatas(rgpsDatIni.value, rgpsDatFim.value) > 1){
            mensagemValidacaoRGPS = "- " + rgpsDatIni.title + "(" + rgpsDatIni.value + ") deve ser menor que  a "+ rgpsDatFim.title + "(" + rgpsDatFim.value + ").\n";
        }

        if(mensagemValidacaoRGPS == ''){
            mensagemValidacaoRGPS = verificarPeriodosComTempoTotalCertidao(paramAcao);
        }
        if(mensagemValidacaoRGPS == ''){
            mensagemValidacaoRGPS = verificarConcomitanciaPeriodos(paramAcao);
        }
        if(mensagemValidacaoRGPS == ''){
            mensagemValidacaoRGPS = verificarPeriodoComDataEstatutarioJuntoComLsv(paramAcao);
        }

        return mensagemValidacaoRGPS;
    }

}


function excluirPeriodoComprev(){
    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){
        if(arrayPeriodosComprev[i].numItem === periodoSelecionadoComprev.numItem){
            arrayPeriodosComprev.splice(i, 1);
            break;
        }
    }
    carregarTabelaPeriodosComprev();
    preencherCampoDataIngressoRegimeOrigemDIRO();
    preencherCampoDataDesvinculacaoRegimeOrigemDDRO();
    atualizarValorCampoTcroOrgaoEmissor();
    selecionarPeriodoComprev('');

}

function inserirPeriodoComprev(paramInserirPeriodoParaCertidao){
    let mensagemValidacao = '';

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS){
        mensagemValidacao = validarPeriodoRGPS('inserir');
        if($('#rgpsQtdTmpTotalCertidao').val() == null || $('#rgpsQtdTmpTotalCertidao').val() == ""){
            mensagemValidacao = "- O campo Total da Certidão deve ser preenchido";
            $('#rgpsQtdTmpTotalCertidao').select();
        }
    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        mensagemValidacao = validarPeriodoRPPS('inserir');
        if($('#rppsQtdTmpTotalCertidao').val() == null || $('#rppsQtdTmpTotalCertidao').val() == ""){
            mensagemValidacao = "- O campo Total da Certidão deve ser preenchido";
            $('#rppsQtdTmpTotalCertidao').select();
        }
    }

    if(mensagemValidacao === ''){
        let periodoComprev = obterObjetoPeriodoComprevLimpo();
        preencherObjetoPeriodoComprevComValoresPreenchidosDaTela(periodoComprev);
        periodoComprev.numItem      = arrayPeriodosComprev.length + 1;

        if(paramInserirPeriodoParaCertidao){ //Caso tenha clicado no botão 'Adicionar Período para esta certidão'.
            periodoComprev.numSeqReqCert = periodoSelecionadoComprev.numSeqReqCert;
        }

        arrayPeriodosComprev.push(periodoComprev);
        atualizarTotalCertidaoParaTodasCertidoesComMesmoNome();
        carregarTabelaPeriodosComprev();
        preencherCampoDataIngressoRegimeOrigemDIRO();
        preencherCampoDataDesvinculacaoRegimeOrigemDDRO();
        atualizarValorCampoTcroOrgaoEmissor();
        selecionarPeriodoComprev('');

    }else{
        alert(mensagemValidacao);
    }
}

function alterarPeriodoComprev(){

    // let mensagemValidacao = '';
    // if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS){
    //     mensagemValidacao = validarPeriodoRGPS('alterar');
    // }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
    //     mensagemValidacao = validarPeriodoRPPS('alterar');
    // }
    //
    // if(mensagemValidacao === ''){
    //     for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--) {
    //         if (arrayPeriodosComprev[i].numItem === periodoSelecionadoComprev.numItem) {
    //             preencherObjetoPeriodoComprevComValoresPreenchidosDaTela(arrayPeriodosComprev[i]);
    //         }
    //     }
    //     atualizarTotalCertidaoParaTodasCertidoesComMesmoNome();
    //     carregarTabelaPeriodosComprev();
    //     preencherCampoDataIngressoRegimeOrigemDIRO();
    //     preencherCampoDataDesvinculacaoRegimeOrigemDDRO();
    //     atualizarValorCampoTcroOrgaoEmissor();
    //     selecionarPeriodoComprev('');
    // }else{
    //     alert(mensagemValidacao);
    // }




    //Valores Antes
    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--) {
        if (arrayPeriodosComprev[i].numItem === periodoSelecionadoComprev.numItem) {
            preencherObjetoPeriodoComprevComValoresPreenchidosDaTela(arrayPeriodosComprev[i]);
        }
    }
        atualizarTotalCertidaoParaTodasCertidoesComMesmoNome();
        carregarTabelaPeriodosComprev();
        preencherCampoDataIngressoRegimeOrigemDIRO();
        preencherCampoDataDesvinculacaoRegimeOrigemDDRO();
        atualizarValorCampoTcroOrgaoEmissor();
        selecionarPeriodoComprev('');

}

function pesquisarPeriodosComprevServico(paramNumSeqReq){
    if(paramNumSeqReq === '' || paramNumSeqReq === null){

    }else{
        let params = {};
        params.numSeqReq = paramNumSeqReq;
        let jsonData = consumidor.executarServico("periodoComprev/consultarPeriodosTempoServicoContribuicaoRegimeOrigemNova", params);

        if(JSON.stringify(jsonData.listaPeriodosComprev) !== '[]'){
            arrayPeriodosComprev = jsonData.listaPeriodosComprev;
            carregarTabelaPeriodosComprev();
            //preencherCampoDataIngressoRegimeOrigemDIRO();
            //preencherCampoDataDesvinculacaoRegimeOrigemDDRO();
        }
    }

}

function carregarTabelaPeriodosComprev(){
    $('#divTabelaPeriodosComprev').empty();

    if(arrayPeriodosComprev.length === 0) {
        $('#divTabelaPeriodosComprev').html('<span class="negrito destaque-warning">Não foram encontrados períodos de tempo de serviço.</span>');

    }else{
        ordernarPeriodosPorData();

        let conteudoTabela = '<table class="tablePeriodosRPPS tabelaLink">';
        conteudoTabela    += '<thead>';
        conteudoTabela    += '<th>Item</th>';
        conteudoTabela    += '<th>Emissor</th>';

        if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS) {
            conteudoTabela += '<th>UF</th>';
            conteudoTabela += '<th>Município</th>';
        }
        conteudoTabela    += '<th>Nome Emissor</th>';
        conteudoTabela    += '<th>Protocolo de Certidão CTC/CTS</th>';
        conteudoTabela    += '<th>Total da Certidão</th>';
        conteudoTabela    += '<th>Período Considerado</th>';

        if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS) {
            conteudoTabela += '<th>Total Descontos</th>';
        }

        if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS){
            conteudoTabela    += '<th>Anos</th>';
            conteudoTabela    += '<th>Meses</th>';
            conteudoTabela    += '<th>Dias</th>';
        }
        conteudoTabela    += '</thead>';
        conteudoTabela    += '<tbody>';

        $.each(arrayPeriodosComprev, function(eachIndice, eachPeriodo){
            conteudoTabela  += '<tr>';
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.numItem);
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.emissor);

            if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS) { // RPPS
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.uf);
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.municipio);
            }
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.nomEmpresa);
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.numCertidao);
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.qtdTmpTotalCertidao);
            conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.datIni + ' - ' + eachPeriodo.datFim);

            if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS) {
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.qtdDescontos);
            }

            if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS){
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.qtdTmpLiqAnoDet);
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.qtdTmpLiqMesDet);
                conteudoTabela += obterLinkSelecionarPeriodoComprev(eachPeriodo.numItem, eachPeriodo.qtdTmpLiqDiaDet);
            }
            conteudoTabela += '</tr>';
        });

        conteudoTabela    += '</tbody>';
        conteudoTabela    += '</table>';

        $('#divTabelaPeriodosComprev').append(conteudoTabela);
    }
}

function obterLinkSelecionarPeriodoComprev(paramNumItem, paramDescricao){
    let conteudo = '<td>';
    conteudo    +=     '<a href="javascript:selecionarPeriodoComprev(' + paramNumItem + ')">';
    if(paramDescricao !== undefined){
        conteudo    +=  paramDescricao
    }
    conteudo    +=     '</a>';
    conteudo    += '</td>';
    return conteudo;
}

function selecionarAdicionarPeriodoParaEstaCertidao(){
    let periodoSelecionadoComprevAntes = periodoSelecionadoComprev;
    selecionarPeriodoComprev('');

    periodoSelecionadoComprev.numSeqReqCert = periodoSelecionadoComprevAntes.numSeqReqCert;

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        $('#rgpsNumCertidao').prop("disabled", true);
        $('#rgpsNumCertidao').val(periodoSelecionadoComprevAntes.numCertidao);

        $('#rgpsQtdTmpTotalCertidao').prop("disabled", true);
        $('#rgpsQtdTmpTotalCertidao').val(periodoSelecionadoComprevAntes.qtdTmpTotalCertidao);

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        $('#rppsNumCertidao').prop("disabled", true);
        $('#rppsNumCertidao').val(periodoSelecionadoComprevAntes.numCertidao);

        $('#rppsQtdTmpTotalCertidao').prop("disabled", true);
        $('#rppsQtdTmpTotalCertidao').val(periodoSelecionadoComprevAntes.qtdTmpTotalCertidao);


        //TODO Confirmar
        $('#rppsQtdTmpLiqAnoCertidao').val(periodoSelecionadoComprevAntes.qtdTmpLiqAnoCertidao);
        $('#rppsQtdTmpLiqMesCertidao').val(periodoSelecionadoComprevAntes.qtdTmpLiqMesCertidao);
        $('#rppsQtdTmpLiqDiaCertidao').val(periodoSelecionadoComprevAntes.qtdTmpLiqDiaCertidao);

    }

    $('#btnInserirPeriodoParaCertidao').show();
    $('#btnInserirPeriodo').hide();
    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnAdicionarPeriodo').hide();
}



function preencherCampoDataIngressoRegimeOrigemDIRO(){
    let menorDataInicioPeriodoAproveitado = '';
    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){
        if(menorDataInicioPeriodoAproveitado === ''){
            menorDataInicioPeriodoAproveitado = arrayPeriodosComprev[i].datIni;
        }else{

            if(moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY').isBefore(moment(menorDataInicioPeriodoAproveitado, 'DD/MM/YYYY'))){
                menorDataInicioPeriodoAproveitado = arrayPeriodosComprev[i].datIni;
            }

        }
    }
    if(menorDataInicioPeriodoAproveitado === ''){
        $('#datIngRegOrig').val('');
    }else{
        $('#datIngRegOrig').val(menorDataInicioPeriodoAproveitado);
    }

}

function preencherCampoDataDesvinculacaoRegimeOrigemDDRO(){
    let maiorDataTerminoPeriodoAproveitado = '';
    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){

        if(maiorDataTerminoPeriodoAproveitado === ''){
            maiorDataTerminoPeriodoAproveitado = arrayPeriodosComprev[i].datFim;
        }else{
            if(moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY').isAfter(moment(maiorDataTerminoPeriodoAproveitado, 'DD/MM/YYYY'))){
              maiorDataTerminoPeriodoAproveitado = arrayPeriodosComprev[i].datFim;
            }
        }
    }

    if(maiorDataTerminoPeriodoAproveitado !== ''){
       let momentMaiorDataTerminoPeriodoAproveitadoMaisUm = moment(maiorDataTerminoPeriodoAproveitado, 'DD/MM/YYYY').add(1, 'days');
       $('#datDesvRegOrig').val(momentMaiorDataTerminoPeriodoAproveitadoMaisUm.format('DD/MM/YYYY'));
    }else{
        //$('#datDesvRegOrig').val('');
    }
}

function preencherCamposAnosMesesDias(){
    let valorAno = '';
    let valorMes = '';
    let valorDia = '';

    let datInicioPeriodoConsiderado = '';
    let datFimPeriodoConsiderado    = '';

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        datInicioPeriodoConsiderado =  $('#rgpsDatIni').val();
        datFimPeriodoConsiderado    =  $('#rgpsDatFim').val();

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        datInicioPeriodoConsiderado =  $('#rppsDatIni').val();
        datFimPeriodoConsiderado    =  $('#rppsDatFim').val();
    }

    if(datInicioPeriodoConsiderado !== '' && datFimPeriodoConsiderado !== ''){
        if(moment(datInicioPeriodoConsiderado,'DD/MM/YYYY', true).isValid()){
            if(moment(datFimPeriodoConsiderado,'DD/MM/YYYY', true).isValid()){
                let params = {};
                params.datInicioPeriodo = datInicioPeriodoConsiderado;
                params.datFimPeriodo = datFimPeriodoConsiderado;
                let jsonAnosMesesDias = consumidor.executarServico("periodoComprev/calcularQtdAnosMesesDiasDoPeriodo", params);

                if(jsonAnosMesesDias.mensagem == 'OK'){
                    valorAno = jsonAnosMesesDias.qtdAnos;
                    valorMes = jsonAnosMesesDias.qtdMeses;
                    valorDia = jsonAnosMesesDias.qtdDias;
                }
            }
        }
    }

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        $('#rgpsQtdTmpLiqAnoDet').val(valorAno);
        $('#rgpsQtdTmpLiqMesDet').val(valorMes);
        $('#rgpsQtdTmpLiqDiaDet').val(valorDia);

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        //TODO confirmar, aparentemente , nem ta chamando nada de rpps ja q as chamada da funcao esta sendo utilizada apenas pro RGPS.
        //Mas coloquei a chamada pro rpps tbm, ai tem q confirmar com a yumi.
        $('#rppsQtdTmpLiqAnoDet').val(valorAno);
        $('#rppsQtdTmpLiqMesDet').val(valorMes);
        $('#rppsQtdTmpLiqDiaDet').val(valorDia);
    }

}

function verificarPeriodosComTempoTotalCertidao(paramAcao){
    let params = {};
    params.codRegimeOrigem     = '';
    params.numCertidao         = '';
    params.qtdTmpTotalCertidao = '';
    params.qtdTmpLiqAno        = '';
    params.qtdTmpLiqMes        = '';
    params.qtdTmpLiqDia        = '';
    params.tempoConsiderado    = '';
    params.acao                = paramAcao;

    params.numItem             = '';

    params.certidoes = JSON.stringify(arrayPeriodosComprev);

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        params.codRegimeOrigem     = $('#codRegimeOrigem').val();
        params.numCertidao         = $('#rgpsNumCertidao').val();
        params.qtdTmpTotalCertidao = $('#rgpsQtdTmpTotalCertidao').val();
        params.qtdTmpLiqAno        = $('#rgpsQtdTmpLiqAnoDet').val();
        params.qtdTmpLiqMes        = $('#rgpsQtdTmpLiqMesDet').val();
        params.qtdTmpLiqDia        = $('#rgpsQtdTmpLiqDiaDet').val();

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        params.codRegimeOrigem     = $('#codRegimeOrigem').val();
        params.numCertidao         = $('#rppsNumCertidao').val();
        //TODO confirmar.
        params.qtdTmpTotalCertidao = $('#rppsQtdTmpTotalCertidao').val();
        params.qtdTmpLiqAno        = $('#rppsQtdTmpLiqAnoCertidao').val();
        params.qtdTmpLiqMes        = $('#rppsQtdTmpLiqMesCertidao').val();
        params.qtdTmpLiqDia        = $('#rppsQtdTmpLiqDiaCertidao').val();
        params.tempoConsiderado    = $('#rppsTempoConsiderado').val();
    }

    let jsonRetorno = consumidor.executarServico("periodoComprev/obterQtdTotalPeriodos", params);

    if(jsonRetorno.qtdTotalPeriodos > params.qtdTmpTotalCertidao){
       return "O total dos períodos (" + jsonRetorno.qtdTotalPeriodos + ") não pode ser maior que o Total da Certidão (" + params.qtdTmpTotalCertidao + ") para o protocolo de certidão '" + params.numCertidao + "'.";
    }
    return "";
}


function ordernarPeriodosPorData(){
    arrayPeriodosComprev.sort(function(a, b){
        return moment(a.datIni, 'DD/MM/YYYY').isBefore(moment(b.datIni, 'DD/MM/YYYY')) ? -1 : moment(a.datIni, 'DD/MM/YYYY').isAfter(moment(b.datIni, 'DD/MM/YYYY')) ? 1 : 0
        //return a.datIni < b.datIni ? -1 : a.datIni > b.datIni ? 1 : 0
    });
}


function calcularAnosMesesDiasCertidaoRPPS(){
    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        let params = {};
        params.rppsQtdTmpTotalCertidao = $('#rppsQtdTmpTotalCertidao').val();
        let jsonAnosMesesDiasRPPS = consumidor.executarServico("periodoComprev/calcularAnosMesesDiasCertidaoRPPS", params);
        if(jsonAnosMesesDiasRPPS.mensagem == 'OK'){
            $('#rppsQtdTmpLiqAnoCertidao').val(jsonAnosMesesDiasRPPS.qtdAnosCertidao);
            $('#rppsQtdTmpLiqMesCertidao').val(jsonAnosMesesDiasRPPS.qtdMesesCertidao);
            $('#rppsQtdTmpLiqDiaCertidao').val(jsonAnosMesesDiasRPPS.qtdDiasCertidao);
        }
    }
}

function calcularTempoConsideradoRPPS(){
    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        let params = {};
        params.datInicioPeriodo = $('#rppsDatIni').val();
        params.datFimPeriodo    = $('#rppsDatFim').val();
        params.qtdDescontos     = $('#rppsQtdDescontos').val();

        let jsonTempoConsiderado = consumidor.executarServico("periodoComprev/calcularTempoConsideradoRPPS", params);
        if(jsonTempoConsiderado.mensagem == 'OK'){
            $('#rppsTempoConsiderado').val(jsonTempoConsiderado.tempoConsiderado);
        }else{
            alert(jsonTempoConsiderado.mensagem);
        }
    }
}


function verificarConcomitanciaPeriodos(paramAcao){
    let mensagemPeriodoConcomitante = '';
    let datIniPeriodo = '';
    let datFimPeriodo = '';

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        datIniPeriodo =  $('#rgpsDatIni').val();
        datFimPeriodo  = $('#rgpsDatFim').val();
    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        datIniPeriodo =  $('#rppsDatIni').val();
        datFimPeriodo =  $('#rppsDatFim').val();
    }

    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){
		
		console.log("1 - After: " + moment(datIniPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY')));
		console.log("1 - Before: " + moment(datIniPeriodo, 'DD/MM/YYYY').isSameOrBefore(moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY')));
		
        if(((moment(datIniPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY')) && moment(datIniPeriodo, 'DD/MM/YYYY').isSameOrBefore(moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY')))
        		|| (moment(datFimPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY')) && moment(datFimPeriodo, 'DD/MM/YYYY').isSameOrBefore(moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY'))))
        		
        	||
        	
        	((moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY').isSameOrAfter(moment(datIniPeriodo, 'DD/MM/YYYY')) && moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY').isSameOrBefore(moment(datFimPeriodo, 'DD/MM/YYYY'))
        		|| (moment(arrayPeriodosComprev[i].datFim, 'DD/MM/YYYY').isSameOrAfter(moment(datIniPeriodo, 'DD/MM/YYYY')) && moment(arrayPeriodosComprev[i].datIni, 'DD/MM/YYYY').isSameOrBefore(moment(datFimPeriodo, 'DD/MM/YYYY')))))){
                var valorEmDias = 0;
                let params = {};
                params.datInicioPeriodo = datIniPeriodo;
                params.datFimPeriodo = arrayPeriodosComprev[i].datFim;
                let jsonAnosMesesDias = consumidor.executarServico("periodoComprev/calcularQtdAnosMesesDiasDoPeriodo", params);

                if(jsonAnosMesesDias.mensagem == 'OK'){
                    if(jsonAnosMesesDias.qtdAnos != 0){
                        valorEmDias = valorEmDias + (jsonAnosMesesDias.qtdAnos * 365);
                    } else {
                        if(jsonAnosMesesDias.qtdMeses > 1){
                            valorEmDias = valorEmDias + (jsonAnosMesesDias.qtdMeses * 30,437);
                        } else {
                            valorEmDias = valorEmDias + 30;
                            if(jsonAnosMesesDias.qtdDias != 0){
                                valorEmDias = valorEmDias + jsonAnosMesesDias.qtdDias + 1;
                            }
                        }
                    }

                }
                console.log(datIniPeriodo + "," +arrayPeriodosComprev[i].datFim);
                mensagemPeriodoConcomitante = 'Existe concomitância no período inserido com o período existente. ' + '\nDe ' + arrayPeriodosComprev[i].datIni + ' à ' + arrayPeriodosComprev[i].datFim + ' ( Aproximadamente ' + valorEmDias + ' dias ).' ;
        }
    }
    return mensagemPeriodoConcomitante;
}

function atualizarTotalCertidaoParaTodasCertidoesComMesmoNome(){
    let campoNumCertidao = '';
    let campoTotalDaCertidao = '';

    let campoAnos = '';
    let campoMeses = '';
    let campoDias = '';

    if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RGPS) {
        campoNumCertidao     = $('#rgpsNumCertidao').val();
        campoTotalDaCertidao = $('#rgpsQtdTmpTotalCertidao').val();

    }else if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
        campoNumCertidao     = $('#rppsNumCertidao').val();
        campoTotalDaCertidao = $('#rppsQtdTmpTotalCertidao').val();

        campoAnos  = $('#rppsQtdTmpLiqAnoCertidao').val();
        campoMeses = $('#rppsQtdTmpLiqMesCertidao').val();
        campoDias  = $('#rppsQtdTmpLiqDiaCertidao').val();
    }

    for(let i = arrayPeriodosComprev.length - 1; i >= 0; i--){
        if(campoNumCertidao === arrayPeriodosComprev[i].numCertidao){
            arrayPeriodosComprev[i].qtdTmpTotalCertidao = campoTotalDaCertidao;

            if($('#codRegimeOrigem').val() === COD_REGIME_ORIGEM_RPPS){
                arrayPeriodosComprev[i].qtdTmpLiqAnoCertidao = campoAnos;
                arrayPeriodosComprev[i].qtdTmpLiqMesCertidao = campoMeses;
                arrayPeriodosComprev[i].qtdTmpLiqDiaCertidao = campoDias;
            }
        }
    }
}

/********************************************************/

function verificarPeriodoComDataEstatutarioJuntoComLsv(paramAcao) {
    let mensagemCritica = '';
    let isDeveMostrarMensagemCritica = false;

    let dataInicioEstatutarioEfetivo = $('#datIniEstatutarioEfetivo').val();
    let tipoRegimeOrigem             = $('#codRegimeOrigem').val();

    let dataInicioPeriodo = '';
    let dataFimPeriodo    = '';
    if(tipoRegimeOrigem === COD_REGIME_ORIGEM_RGPS) {
        dataInicioPeriodo = $('#rgpsDatIni').val();
        dataFimPeriodo    = $('#rgpsDatFim').val();
    }else if(tipoRegimeOrigem === COD_REGIME_ORIGEM_RPPS){
        dataInicioPeriodo = $('#rppsDatIni').val();
        dataFimPeriodo    = $('#rppsDatFim').val();
    }


    if(dataInicioEstatutarioEfetivo == ''){



    }else{

        if(!ValidaData(dataInicioEstatutarioEfetivo)){
            mensagemCritica += "- O campo Data Início Estatutário / Efetivo não foi preenchido com uma data válida, esse campo é necessário para a validação do período inserido.\n";
        }

        if(moment(dataInicioPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(dataInicioEstatutarioEfetivo, 'DD/MM/YYYY'))
            || moment(dataFimPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(dataInicioEstatutarioEfetivo, 'DD/MM/YYYY'))) {

            isDeveMostrarMensagemCritica = true;

            if(arrayRegistrosLsv.length !== 0){ //o arrayRegistrosLsv eu estou pegando do valor do arquivo registrosLsv.js

                //Eu estou considerando o range de períodos, ou seja, o Período (Data Inicio e Data Fim) devem estar DENTRO do
                //período da LSV(Data Início e Data Fim).
                for(let i = arrayRegistrosLsv.length - 1; i >= 0; i--) {
                    let isDataInicioPeriodoDentroDaLsv = false;
                    let isDataFimPeriodoDentroDaLsv    = false;

                    if(moment(dataInicioPeriodo, 'DD/MM/YYYY').isSameOrAfter(moment(arrayRegistrosLsv[i].datIniLsv, 'DD/MM/YYYY'))){
                        isDataInicioPeriodoDentroDaLsv = true;
                    }

                    if(isDataInicioPeriodoDentroDaLsv){
                        if(moment(dataFimPeriodo, 'DD/MM/YYYY').isSameOrBefore(moment(arrayRegistrosLsv[i].datFimLsv, 'DD/MM/YYYY'))){
                            isDataFimPeriodoDentroDaLsv = true;
                        }
                    }

                    if(isDataInicioPeriodoDentroDaLsv && isDataFimPeriodoDentroDaLsv){
                        isDeveMostrarMensagemCritica = false;
                        break;
                    }
                }

            }
        }

        if(isDeveMostrarMensagemCritica){
            mensagemCritica = 'Período da Certidão é posterior à Data de início Efetivo/Estatutário. Para considerar esse período é necessário ter uma LSV cadastrada';
        }

    }
    return mensagemCritica;
}



function atualizarValorCampoTcroOrgaoEmissor(){

    let params = {};

    params.certidoes = JSON.stringify(arrayPeriodosComprev);

    params.numCertidao         = '';
    params.qtdTmpTotalCertidao = '0';
    params.qtdTmpLiqAno        = '0';
    params.qtdTmpLiqMes        = '0';
    params.qtdTmpLiqDia        = '0';
    params.tempoConsiderado    = '0';

    //A yumi mencionou que deve pegar sempre o calculo do RGPS.
    params.codRegimeOrigem = COD_REGIME_ORIGEM_RGPS;

    let jsonRetorno = consumidor.executarServico("periodoComprev/obterQtdTotalPeriodos", params);
    //TCRO do Órgão Concessor:
    $('#numTempContribRegOrig').val(jsonRetorno.qtdTotalPeriodos);
}