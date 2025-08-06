const PAGINA_CONSULTA_CADASTRO_REQUERIMENTO  = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/consultaCadastroRequerimento.html';


//inicialização
$(document).ready(function(){
    init();
});

(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    };
    $.fn.visible = function() {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    };

    $.fn.isVisible = function() {
        return this.each(function() {
            $(this).css("visibility") === 'visible';
        });
    };
}(jQuery));


function carregarCnpj(){
    $('#numCnpj').prop("disabled", true);

    let params = {};
    params.codEntidade = $('#codEntidade').val();
    let jsonData = consumidor.executarServico("renan/pesquisarCnpj", params);
    if(jsonData.numCnpj !== null){
        $('#numCnpj').val(jsonData.numCnpj);
    }else{
        $('#numCnpj').val('');
    }
}

function init() {
    with (document.forms[0]) {

        let params = {};
        params.numSeqReq       = urlParametros.get("numSeqReq");
        params.numSeqBeneficio = urlParametros.get("numSeqBeneficio");
        params.numSeqFunc      = urlParametros.get("numSeqFunc");
        params.numCpf          = urlParametros.get("numCpf");

        let jsonData = consumidor.executarServico("renan/consultarPessoaFisicaRequerimento", params);

        carregarHiddens(jsonData);
        carregarConsultaCpf(jsonData);
        carregarDadosBasicosServidor(jsonData);
        carregarDadosVinculo(jsonData);
        if(jsonData.funcional !== null){
            pesquisarLsvCadastradasNoBanco(jsonData.funcional.numSeqFunc);
        }
        carregarDadosBeneficio(jsonData);
        carregarDestinacaoRegimeOrigemTempo(jsonData);
        carregarDocumentosBeneficio(jsonData);
        carregarDocumentosRequerimento(jsonData);
        carregarDadosRequerimento(jsonData);


        selecionarRegimeOrigem();
        executarRegraCampos();

        carregarRetificacoesTelaCadastroRequerimento();


        //Bloco Periodos de Tempo
        setaMascara(rgpsDatIni, MASK_DATA);
        setaMascara(rgpsDatFim, MASK_DATA);

        setaMascara(rppsDatIni, MASK_DATA);
        setaMascara(rppsDatFim, MASK_DATA);

        setaMascara(datIniLsv, MASK_DATA);
        setaMascara(datFimLsv, MASK_DATA);

        carregarCnpj();

        pesquisarPeriodosComprevServico(params.numSeqReq);

        preencherDadosGeraisExigencia(jsonData);


        deveExibirLinkIrParaTelaComprev();

        executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo(); // essa funcao está no arquivo registrosLSV.js.


    }
}

function pesquisarCpf(){
    window.location.href = PAGINA_CONSULTA_CADASTRO_REQUERIMENTO + "?numCpf="  +   $('#numCpf').val();
}


function carregarHiddens(jsonData){

    $('#hiddenCodIns').val(getCookieSigeprev('cookieCodIns'));
    $('#hiddenLogin').val(getCookieSigeprev('cookieLogin'));

    if(jsonData.pessoaFisica !== null){
        $('#hiddenCodIdeCli').val(jsonData.pessoaFisica.codIdeCli);
    }
    if(jsonData.funcional !== null){
        $('#hiddenNumSeqFunc').val(jsonData.funcional.numSeqFunc);
        $('#hiddenNumMatricula').val(jsonData.funcional.numMatricula);
        $('#hiddenCodIdeRelFunc').val(jsonData.funcional.codIdeRelFunc);
        $('#hiddenCodEntidade').val(jsonData.funcional.codEntidade);
        $('#hiddenCodCargo').val(jsonData.funcional.codCargo);
    }
    if(jsonData.beneficio != null){
        $('#hiddenNumSeqBeneficio').val(jsonData.beneficio.numSeqBeneficio);
    }
    if(jsonData.requerimento !== null){
        $('#hiddenNumSeqReq').val(jsonData.requerimento.numSeqReq);
    }
}

function carregarConsultaCpf(jsonData){
    if(jsonData.pessoaFisica !== null){
        $('#numCpf').val(jsonData.pessoaFisica.numCpf);
    }
    setaMascara(numCpf, MASK_CPF);
}


function carregarDadosBasicosServidor(jsonData){
    consumidor.setCombo('codSexo', 30);

    if(jsonData.pessoaFisica !== null){
        $('#nomPessoaFisica').val(jsonData.pessoaFisica.nomPessoaFisica);
        $('#datNasc').val(jsonData.pessoaFisica.datNasc);
        $('#codSexo').val(jsonData.pessoaFisica.codSexo);
        $('#numNit').val(jsonData.pessoaFisica.numNit);
        $('#numPis').val(jsonData.pessoaFisica.numPis);
        $('#nomMae').val(jsonData.pessoaFisica.nomMae);
        $('#numRg').val(jsonData.pessoaFisica.numRg);

    }

    setaMascara(datNasc, MASK_DATA);
    setaMascara(numNit, MASK_PIS);
    setaMascara(numPis, MASK_PIS);
}

function carregarDadosVinculo(jsonData){

    let params = {}
    params.codIns = getCookieSigeprev('cookieCodIns');
    params.login  = getCookieSigeprev('cookieLogin');
    consumidor.setComboNovo('codEntidade', "cadastroRequerimento/consultarTodasEntidades", params);

    if(jsonData.funcional !== null){
        $('#numMatricula').val(jsonData.funcional.numMatricula);
        $('#numPv').val(jsonData.funcional.numPv);

        $('#numMatriculaOrigemComprev').val(jsonData.funcional.numMatriculaOrigemComprev);
        $('#numPvOrigemComprev').val(jsonData.funcional.numPvOrigemComprev);
        $('#codEntidade').val(jsonData.funcional.codEntidade);

        if(jsonData.entidade !== null){
            $('#numCnpj').val(jsonData.entidade.numCnpj);
        }
        $('#datIngServPublico').val(jsonData.pessoaFisica.datIngServPublico);
        $('#datIniEstatutarioEfetivo').val(jsonData.funcional.datIniEstatutarioEfetivo);
        if(jsonData.funcional.flgLicenca !== null && jsonData.funcional.flgLicenca !== '') {
            $('input[name=flgLicenca][value=' + jsonData.funcional.flgLicenca + ']').prop('checked', true);
        }
    }

    setaMascara(numCnpj, MASK_CNPJ);
    setaMascara(datIngServPublico, MASK_DATA);
    setaMascara(datIniEstatutarioEfetivo, MASK_DATA);


}

function carregarDadosBeneficio(jsonData){

    consumidor.setCombo('codTipoBeneficioComprev', 4);
    consumidor.setCombo('flgFiscalizacaoTcComprev', 100);
    consumidor.setCombo('codTipoCalcParidComprev', 15);

    $("#valBeneficioComprev").maskMoney({thousands:'.', decimal:',', affixesStay: false});

    if(jsonData.beneficio !== null){
        $('#codTipoBeneficioComprev').val(jsonData.beneficio.codTipoBeneficioComprev);
        $('#codBeneficio').val(jsonData.beneficio.codBeneficio);

        $('#flgDoencaCoberturaIntegral').val(jsonData.beneficio.flgDoencaCoberturaIntegral);
        $('#flgDoencaDecorrenteAcidenteTrabalho').val(jsonData.beneficio.flgDoencaDecorrenteAcidenteTrabalho);

        $('#valBeneficioComprev').val(jsonData.beneficio.valBeneficioComprev);
        $('#datIniPagamentoComprev').val(jsonData.beneficio.datIniPagamentoComprev);
        $('#dscFundLegalComprev').val(jsonData.beneficio.dscFundLegalComprev);
        $('#datIniBenComprev').val(jsonData.beneficio.datIniBenComprev);
        $('#datCessacaoComprev').val(jsonData.beneficio.datCessacaoComprev);
        $('#qtdTmpLiqDiaTotal').val(jsonData.beneficio.qtdTmpLiqDiaTotal);
        $('#numProcBen').val(jsonData.beneficio.numProcBen);
        $('#datIngServPublicComprev').val(jsonData.beneficio.datIngServPublicComprev);
        $('#flgFiscalizacaoTcComprev').val(jsonData.beneficio.flgFiscalizacaoTcComprev);
        $('#codTipoCalcParidComprev').val(jsonData.beneficio.codTipoCalcParidComprev);
        $('#numProcessoTcComprev').val(jsonData.beneficio.numProcessoTcComprev);
        $('#datHomolTc').val(jsonData.beneficio.datHomolTc);
    }

    $("#valBeneficioComprev").maskMoney({thousands:'.', decimal:',', affixesStay: false});
    //data inicio do pagamento?
    setaMascara(datIniBenComprev, MASK_DATA);
    setaMascara(datIniPagamentoComprev, MASK_DATA);
    setaMascara(datCessacaoComprev, MASK_DATA);
    setaMascara(datIngServPublicComprev, MASK_DATA);
    setaMascara(numProcessoTcComprev,MASK_NUMERO_PROCESSOTC);
    setaMascara(datHomolTc, MASK_DATA);

}

function carregarDestinacaoRegimeOrigemTempo(jsonData){
    consumidor.setCombo('codRegimeOrigem', 7);
    consumidor.setCombo('codEsferaRegOrigem', 8);
    consumidor.setCombo('codUfComprev', 19);

    if(jsonData.requerimento === null){

    }else{
        $('#codRegimeOrigem').val(jsonData.requerimento.codRegimeOrigem);
        $('#codEsferaRegOrigem').val(jsonData.requerimento.codEsferaRegOrigem);
        $('#codUfComprev').val(jsonData.requerimento.codUfComprev);
        $('#numTempContribRegOrig').val(jsonData.requerimento.numTempContribRegOrig);
        $('#numTempContribRegOrigConcessor').val(jsonData.requerimento.numTempContribRegOrigConcessor);
        $('#datIngRegOrig').val(jsonData.requerimento.datIngRegOrig);
        $('#datDesvRegOrig').val(jsonData.requerimento.datDesvRegOrig);

        carregarComboMunicipio();
        $('#codMunicipioComprev').val(jsonData.requerimento.codMunicipioComprev);

        carregarComboDestinatario();
        $('#numSeqParticipante').val(jsonData.requerimento.numSeqParticipante);

    }

    setaMascara(datIngRegOrig, MASK_DATA);
    setaMascara(datDesvRegOrig, MASK_DATA);
}


function carregarDadosRequerimento(jsonData){
    //consumidor.setCombo('codDadosRetificadosComprev', 33);
    if(jsonData.requerimento === null){

    }else{
        if(jsonData.requerimento.flgRequerimentoComprev !== ''){
            $('input[name=flgRequerimentoComprev][value=' + jsonData.requerimento.flgRequerimentoComprev + ']').prop('checked', true);
        }else{
            $('input[name=flgRequerimentoComprev][value=I]').prop('checked', true); //Inicial
        }
        //$('#codDadosRetificadosComprev').val(jsonData.requerimento.codDadosRetificadosComprev);
    }

    $('input[name=flgRequerimentoComprev]').prop('disabled', true);
    //$('#codDadosRetificadosComprev').prop('disabled', true);


    if(jsonData.requerimento === null || jsonData.requerimento.flgRequerimentoComprev === ''){
        $('#flgRequerimentoComprevInicial').prop("checked",true);
    }

}


function limpar(){
    window.location.href = PAGINA_CONSULTA_CADASTRO_REQUERIMENTO;
}


function irParaTelaComprev(){
    window.location.href = PAGINA_CONSULTA_CADASTRO_REQUERIMENTO + "?numCpf="       + $('#numCpf').val();
}



/////////////////////////////
function executarRegraCampos(){
    //Regime de Origem
    if($('#codRegimeOrigem').val() === '2'){ //RPPS
        $('#codEsferaRegOrigem').visible();
        $('#labelCodEsferaRegOrigem').visible();
    }else{
        $('#codEsferaRegOrigem').val('');
        $('#codEsferaRegOrigem').invisible();
        $('#labelCodEsferaRegOrigem').invisible();
    }

    //Entidade/Esfera
    if($('#codEsferaRegOrigem').isVisible() && ($('#codEsferaRegOrigem').val() === '2' || $('#codEsferaRegOrigem').val() === '3')){ //Municipal ou Estadual
        $('#codUfComprev').visible();
        $('#labelCodUfComprev').visible();
    }else{
        $('#codUfComprev').val('');
        $('#codUfComprev').invisible();
        $('#labelCodUfComprev').invisible();
    }

    //alert($('#codUfComprev').isVisible() == true); acho melhor definir como div, verificar se ohidden aplica pras filahs label e field.
    //Município
    if($('#codUfComprev').isVisible()  &&  $('#codEsferaRegOrigem').val() === '2'){ //Municipal
        $('#labelCodMunicipioComprev').visible();
        $('#codMunicipioComprev').visible();
    }else{
        $('#codMunicipioComprev').val('');
        $('#labelCodMunicipioComprev').invisible();
        $('#codMunicipioComprev').invisible();
    }

    if($('#flgFiscalizacaoTcComprev').val() === 'S'){
        $('#asteriscoNumProcessoTcComprev').show();
    }else{
        $('#asteriscoNumProcessoTcComprev').hide();
    }

    if($('#hiddenNumSeqReq').val() !== '' || $('#hiddenNumSeqFunc').val() !== '' || $('#hiddenNumSeqBeneficio').val() !== ''){
        $('#codSexo').prop("disabled", true);
        $('#datNasc').prop("disabled", true);
        $('#numMatricula').prop("disabled", true);
        $('#numPv').prop("disabled", true);
        $('#codEntidade').prop("disabled", true);
        $('#flgRequerimentoComprevInicial').prop("disabled", true);
        $('#flgRequerimentoComprevRetificacao').prop("disabled", true);
        //$('#codDadosRetificadosComprev').prop("disabled", true);

    }


    //Caso o campo Tipo Benefício Comprev seja Aposentadoria por Tempo de Contribuicao, deve-se exibir alguns campos.
    if($('#codTipoBeneficioComprev').val() === '3'){
        $('#labelFlgDoencaCoberturaIntegral').visible();
        $('#flgDoencaCoberturaIntegral').visible();
        $('#labelFlgDoencaDecorrenteAcidenteTrabalho').visible();
        $('#flgDoencaDecorrenteAcidenteTrabalho').visible();
    }else{
        $('#flgDoencaCoberturaIntegral').val('');
        $('#flgDoencaDecorrenteAcidenteTrabalho').val('');

        $('#labelFlgDoencaCoberturaIntegral').invisible();
        $('#flgDoencaCoberturaIntegral').invisible();
        $('#labelFlgDoencaDecorrenteAcidenteTrabalho').invisible();
        $('#flgDoencaDecorrenteAcidenteTrabalho').invisible();
    }


}


function carregarComboMunicipio(){
    let paramsMunicipio = {};
    paramsMunicipio.codUf = $('#codUfComprev').val();
    consumidor.setComboNovo('codMunicipioComprev', 'controleCompensacao/consultarMunicipio', paramsMunicipio);
}

function carregarComboDestinatario(){
    let paramsDestinatario = {};

    if($('#codRegimeOrigem').val() === '') {
        $('#numSeqParticipante').empty();
        $('#numSeqParticipante').append('<option value="">Selecione</option>');

    }else if($('#codRegimeOrigem').val() === '2' && $('#codEsferaRegOrigem').val() === ''){ //RPPS
        $('#numSeqParticipante').empty();
        $('#numSeqParticipante').append('<option value="">Selecione</option>');
    }else{
        paramsDestinatario.codRegimeOrigem = $('#codRegimeOrigem').val();
        paramsDestinatario.codEsferaRegOrigem = $('#codEsferaRegOrigem').val();
        paramsDestinatario.codUfComprev = $('#codUfComprev').val();
        paramsDestinatario.codMunicipioComprev = $('#codMunicipioComprev').val();
        consumidor.setComboNovo('numSeqParticipante', 'controleCompensacao/consultarComboDestinatario', paramsDestinatario);

    }

}

function selecionarRegimeOrigem(){
    let codRegimeOrigem = $('#codRegimeOrigem').val();

    $('#blocoPeriodoTempoServicoContribuicaoRegimeOrigem').hide();
    $('#camposRGPS').hide();
    $('#camposRPPS').hide();

    $('#btnInserirPeriodo').show();
    $('#btnInserirPeriodoParaCertidao').hide();
    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnAdicionarPeriodo').hide();

    //Verifica qual opcao de bloco deve exibir.
    if(codRegimeOrigem === '1'){ //RGPS
        $('#blocoPeriodoTempoServicoContribuicaoRegimeOrigem').show();
        $('#tituloPeriodoTempoServicoContribuicaoRegimeOrigem').text('PERÍODOS DE TEMPO DE SERVIÇO/CONTRIBUIÇÃO DO REGIME DE ORIGEM - INSS');
        $('#camposRGPS').show();

    }else if(codRegimeOrigem === '2'){ //RPPS
        $('#blocoPeriodoTempoServicoContribuicaoRegimeOrigem').show();
        $('#tituloPeriodoTempoServicoContribuicaoRegimeOrigem').text('PERÍODOS DE TEMPO DE SERVIÇO/CONTRIBUIÇÃO DO REGIME DE ORIGEM - RPPS');
        $('#camposRPPS').show();
    }
}



function cadastrarRequerimento(){
    with (document.forms[0]) {
        erros = "";

        if($('#numProcBen').val() === ''){
            if(!confirm("O número do processo não está preenchido. Deseja cadastrar mesmo assim?")) {
                return;
            }
        }

        //DADOS BÁSICOS DO SERVIDOR
        validaCampo2(nomPessoaFisica);

        validaCampo2(datNasc);
        validaCampoData2(datNasc);

        validaCampo2(codSexo);
        validaCampo2(numNit);
        validaCampo2(numPis);
        let b = validaPIS2(numPis);

        validaCampo2(nomMae);
        validaCampo2(numRg);

        //DADOS DO VÍNCULO
        validaCampo2(numMatricula);
        validaCampo2(codEntidade);
        validaCampo2(numCnpj);
        // validaCampo2(datIngServPublico);
        validaCampoData2(datIngServPublico);
        validaCampo2(datIniEstatutarioEfetivo);
        validaCampoData2(datIniEstatutarioEfetivo);
        validaCampo2(flgLicenca);


        //DADOS DO BENEFÍCIO
        validaCampo2(codTipoBeneficioComprev);
        validaCampo2(codBeneficio);


        if($('#codTipoBeneficioComprev').val() === '3'){ //Aposentadoria por Tempo de Contribuição.
            validaCampo2(flgDoencaCoberturaIntegral);
            validaCampo2(flgDoencaDecorrenteAcidenteTrabalho);
        }

        validaCampo2(valBeneficioComprev);
        //validaCampoData2(dataInicioPagamento);
        validaCampo2(dscFundLegalComprev);
        validaCampo2(datIniBenComprev);
        validaCampoData2(datIniBenComprev);
        validaCampoData2(datCessacaoComprev);
        validaCampoData2(datIngServPublicComprev);
        validaCampo2(qtdTmpLiqDiaTotal);
        validaCampo2(flgFiscalizacaoTcComprev);
        validaCampo2(codTipoCalcParidComprev);

        if($('#flgFiscalizacaoTcComprev').val() === 'S'){
            validaCampo2(numProcessoTcComprev);
        }


        validaCampoData2(datHomolTc);


        // if($('#flgFiscalizacaoTcComprev').val() === 'S'){
        //validaCampo2(numProcessoTcComprev);
        //}

        //DESTINAÇÃO / REGIME DE ORIGEM E TEMPO
        validaCampo2(codRegimeOrigem);
        validaCampo2(numSeqParticipante);
        validaCampo2(numTempContribRegOrig);
        validaCampo2(numTempContribRegOrigConcessor);
        validaCampo2(datIngRegOrig);
        validaCampoData2(datIngRegOrig);
        validaCampo2(datDesvRegOrig);
        validaCampoData2(datDesvRegOrig);

        //DADOS DE REQUERIMENTO

        if (erros != ""){
            alerta = JSON.stringify(erros.replace(/(?:\r\n|\r|\n)/g, '      '));
            alert(alerta.replace(/[\\"]/g, ''));
            erros = "";
            alerta = "";
            return;
        }
    }


    let isRegistroNovo = $('#hiddenNumSeqReq').val() === "";
    let params = {};
    params.codIns = getCookieSigeprev('cookieCodIns');
    params.login  = getCookieSigeprev('cookieLogin');

    params.codIdeCli          = $('#hiddenCodIdeCli').val();
    params.numSeqFunc         = $('#hiddenNumSeqFunc').val();
    params.numSeqBeneficio    = $('#hiddenNumSeqBeneficio').val();
    params.numSeqReq          = $('#hiddenNumSeqReq').val();


    params.numCpf             = $('#numCpf').val();

    //DADOS BÁSICOS DO SERVIDOR
    params.nomPessoaFisica       = $('#nomPessoaFisica').val();
    params.datNasc               = $('#datNasc').val();
    params.codSexo               = $('#codSexo').val();
    params.numNit                = $('#numNit').val();
    params.numPis                = $('#numPis').val();
    params.nomMae                = $('#nomMae').val();
    params.numRg                 = $('#numRg').val();

    //DADOS DO VÍNCULO
    params.numMatricula              =  $('#numMatricula').val();
    params.numPv                     =  $('#numPv').val();
    params.numMatriculaOrigemComprev =  $('#numMatriculaOrigemComprev').val();
    params.numPvOrigemComprev        =  $('#numPvOrigemComprev').val();
    params.codEntidade               =  $('#codEntidade').val();
    params.numCnpj                   =  $('#numCnpj').val();
    params.datIngServPublico         =  $('#datIngServPublico').val();
    params.datIniEstatutarioEfetivo  =  $('#datIniEstatutarioEfetivo').val();
    params.flgLicenca                =  $('input[name=flgLicenca]:checked').val();

    params.listaLsv = JSON.stringify(arrayRegistrosLsv);

    //DADOS DO BENEFÍCIO
    params.codTipoBeneficioComprev  = $('#codTipoBeneficioComprev').val();
    params.codBeneficio             = $('#codBeneficio').val();
    params.flgDoencaCoberturaIntegral          = $('#flgDoencaCoberturaIntegral').val();
    params.flgDoencaDecorrenteAcidenteTrabalho = $('#flgDoencaDecorrenteAcidenteTrabalho').val();
    params.valBeneficioComprev      = $('#valBeneficioComprev').val();
    params.datIniPagamentoComprev   = $('#datIniPagamentoComprev').val();

    params.dscFundLegalComprev      = $('#dscFundLegalComprev').val();
    params.datIniBenComprev         = $('#datIniBenComprev').val();
    params.datCessacaoComprev       = $('#datCessacaoComprev').val();
    params.qtdTmpLiqDiaTotal        = $('#qtdTmpLiqDiaTotal').val();
    params.numProcBen               = $('#numProcBen').val();
    params.datIngServPublicComprev  = $('#datIngServPublicComprev').val();
    params.flgFiscalizacaoTcComprev = $('#flgFiscalizacaoTcComprev').val();
    params.codTipoCalcParidComprev  = $('#codTipoCalcParidComprev').val();
    params.numProcessoTcComprev     = $('#numProcessoTcComprev').val();
    params.datHomolTc               = $('#datHomolTc').val();


    //DESTINAÇÃO / REGIME DE ORIGEM E TEMPO
    params.codRegimeOrigem     = $('#codRegimeOrigem').val();
    params.codEsferaRegOrigem  = $('#codEsferaRegOrigem').val();
    params.codUfComprev        = $('#codUfComprev').val();
    params.codMunicipioComprev = $('#codMunicipioComprev').val();
    params.numSeqParticipante  = $('#numSeqParticipante').val();
    params.numTempContribRegOrig = $('#numTempContribRegOrig').val();
    params.numTempContribRegOrigConcessor = $('#numTempContribRegOrigConcessor').val();
    params.datIngRegOrig         = $('#datIngRegOrig').val();
    params.datDesvRegOrig        = $('#datDesvRegOrig').val();

    params.flgRequerimentoComprev      = $('input[name=flgRequerimentoComprev]:checked').val();
    //params.codDadosRetificadosComprev  = $('#codDadosRetificadosComprev').val();

    params.certidoes = JSON.stringify(arrayPeriodosComprev);

    let jsonDataRegistroGravado = consumidor.executarServico("renan/gravarTela", params);

    if(jsonDataRegistroGravado.codStatus !== 0){
        alert(jsonDataRegistroGravado.msgStatus);
        return;
    }

    $('#hiddenNumSeqReq').val(jsonDataRegistroGravado.numSeqReq);

    if(isRegistroNovo){
        alert('Requerimento inicial cadastrado com sucesso. Favor encaminhar por meio do sistema de imagens os documentos digitalizados e certificados. Documentos encaminhados por meio físico, não serão recepcionados pela SPPREV.');
    }else{
        alert('Requerimento alterado com sucesso. Favor encaminhar por meio do sistema de imagens os documentos digitalizados e certificados. Documentos encaminhados por meio físico, não serão recepcionados pela SPPREV.');
    }


    let urlParam = PAGINA_CONSULTA_CADASTRO_REQUERIMENTO;
    urlParam     += "?numCpf="        + $('#numCpf').val();
    window.location.href = urlParam;
}





function preencherDadosGeraisExigencia(jsonData){

    $('#blocoExigenciaAnalise').hide();
    if(jsonData.requerimento === null){


    }else{

        if(jsonData.requerimento.codAnalise != ''){ // Exigencia

            $('#dadosGeraisNumCpf').text(jsonData.pessoaFisica.numCpf);
            $('#dadosGeraisNomEntidade').text(jsonData.entidade.nomEntidade);
            $('#dadosGeraisNumMatricula').text(jsonData.funcional.numMatricula);
            $('#dadosGeraisNomCargo').text(jsonData.funcional.nomCargo);
            $('#dadosGeraisNomPessoaFisica').text(jsonData.pessoaFisica.nomPessoaFisica);
            $('#desAnaliseExigencia').text(jsonData.requerimento.desAnalise);


            if(jsonData.requerimento.codAnalise === 3) { // Exigencia
                carregarDocumentosExigencia();
            }
            preencherDocumentosExigencia(jsonData.requerimento.numSeqReq);

            $('input[name=codExigenciaIlegivel]').each(function (){
                $(this).prop("disabled", true)
            });
            $('input[name=codExigenciaFaltante]').each(function (){
                $(this).prop("disabled", true)
            });

            $('input[name=codExigenciaIlegivelExigenciaBeneficio]').each(function (){
                $(this).prop("disabled", true)
            });
            $('input[name=codExigenciaFaltanteExigenciaBeneficio]').each(function (){
                $(this).prop("disabled", true)
            });

            carregarDadosRequerimentoExigencia(jsonData);

            $('#blocoTelaRequerimento').hide();
            $('#blocoExigenciaAnalise').show();

        }
    }
}




function carregarDocumentosExigencia(){
    $('#divDocumentosNecessariosExigencia').empty();

    let params  = {};
    params.codNum = 36;
    let jsonData = consumidor.executarServico("controleCompensacao/consultarCodigo", params);


    let paramsExigenciaBeneficio = {};
    paramsExigenciaBeneficio.codIns = 1;
    paramsExigenciaBeneficio.numSeqBeneficio = $('#hiddenNumSeqBeneficio').val();
    let jsonDataExigenciaBeneficio = consumidor.executarServico("exigenciaBeneficio/pesquisarTodasExigenciasDoBeneficio", paramsExigenciaBeneficio);

    let conteudoTabela =  '<h2 class="mb-3"><i class="fa fa-file" aria-hidden="true"></i> Exigência - Documentos Necessários</h2>';

    conteudoTabela     += '<table id="tabelaDocumentos" class="tabelaPaddingMenor">';
    conteudoTabela     += '<thead>';
    conteudoTabela     += '<th class="text-center col-md-1 col-sm-1">Faltante</th>';
    conteudoTabela     += '<th class="text-center col-md-1 col-sm-1">Ilegível</th>';
    conteudoTabela     += '<th>Documento</th>';
    conteudoTabela     += '</thead>';
    conteudoTabela     += '<tbody>';


    $.each(jsonDataExigenciaBeneficio.listaExigencias, function(eachIndice, eachExigenciaBeneficio){
        conteudoTabela     += '<tr>';
        conteudoTabela     +=     '<td class="text-center">';
        conteudoTabela     +=          '<input type="checkbox" id="' + eachExigenciaBeneficio.codExigenciaBeneficio +'_ExigenciaBeneficioFaltante" name="codExigenciaFaltanteExigenciaBeneficio" value="'+ eachExigenciaBeneficio.codExigenciaBeneficio +'"/>';
        conteudoTabela     +=     '</td>';

        conteudoTabela     +=     '<td class="text-center">';
        conteudoTabela     +=          '<input type="checkbox" id="' + eachExigenciaBeneficio.codExigenciaBeneficio +'_ExigenciaBeneficioIlegivel" name="codExigenciaIlegivelExigenciaBeneficio" value="'+ eachExigenciaBeneficio.codExigenciaBeneficio +'"/>';
        conteudoTabela     +=     '</td>';
        conteudoTabela     +=     '<td>' + eachExigenciaBeneficio.desExigenciaBeneficio + '</td>';

        conteudoTabela     += '</tr>';
    });




    $.each(jsonData.codigos, function(eachIndice, eachCodigo){

        let isDeveMostrarExigencia = false;
        if($('#codRegimeOrigem').val() === '2') { //  RPPS
            if(eachCodigo.codPar === '30'){
                isDeveMostrarExigencia = true
            }
        }else if($('#codRegimeOrigem').val() === '1') { //RGPS
            if(eachCodigo.codPar === '20'){
                isDeveMostrarExigencia = true
            }
        }

        if(isDeveMostrarExigencia){
            conteudoTabela     += '<tr>';
            conteudoTabela     +=     '<td class="text-center">';
            conteudoTabela     +=          '<input type="checkbox" id="' + eachCodigo.codPar +'_Faltante" name="codExigenciaFaltante" value="'+ eachCodigo.codPar +'"/>';
            conteudoTabela     +=     '</td>';

            conteudoTabela     +=     '<td class="text-center">';
            conteudoTabela     +=          '<input type="checkbox" id="' + eachCodigo.codPar +'_Ilegivel" name="codExigenciaIlegivel" value="'+ eachCodigo.codPar +'"/>';
            conteudoTabela     +=     '</td>';
            conteudoTabela     +=     '<td>' + eachCodigo.desDescricao + '</td>';

            conteudoTabela     += '</tr>';
        }

    });
    conteudoTabela     += '</tbody>';
    conteudoTabela     += '</table>';

    $('#divDocumentosNecessariosExigencia').append(conteudoTabela);

}


function preencherDocumentosExigencia(paramNumSeqReq){
    let params = {};
    params.numSeqReq = paramNumSeqReq;

    let jsonData = consumidor.executarServico("controleCompensacao/consultarExigenciasDocumentos", params);

    $.each(jsonData.listaReqDocs, function(eachIndice, eachReqDoc){

        if(eachReqDoc.codExigenciaStatus === 'F'){
            $('input[name=codExigenciaFaltante][value=' + eachReqDoc.codDocumento + ']').prop("checked", true);
        }else if(eachReqDoc.codExigenciaStatus === 'I'){
            $('input[name=codExigenciaIlegivel][value=' + eachReqDoc.codDocumento + ']').prop("checked", true);
        }

        if(eachReqDoc.codDocumento === '998'){
            $('#nomOutros998').val(eachReqDoc.nomOutros);
        }else if(eachReqDoc.codDocumento === '999'){
            $('#nomOutros999').val(eachReqDoc.nomOutros);
        }
    });

    let paramsExigenciaBeneficio = {};
    paramsExigenciaBeneficio.codIns = 1;
    paramsExigenciaBeneficio.numSeqBeneficio = $('#hiddenNumSeqBeneficio').val();
    let jsonDataExigenciaBeneficio = consumidor.executarServico("exigenciaBeneficio/pesquisarTodasExigenciasDoBeneficio", paramsExigenciaBeneficio);


    $.each(jsonDataExigenciaBeneficio.listaExigencias, function(eachIndice, eachExigenciaBeneficio){
        if(eachExigenciaBeneficio.flgTipoExigencia === 'F'){
            $('input[name=codExigenciaFaltanteExigenciaBeneficio][value=' + eachExigenciaBeneficio.codExigenciaBeneficio + ']').prop("checked", true);
        }else if(eachExigenciaBeneficio.flgTipoExigencia === 'I'){
            $('input[name=codExigenciaIlegivelExigenciaBeneficio][value=' + eachExigenciaBeneficio.codExigenciaBeneficio + ']').prop("checked", true);
        }
    });



}

function carregarDadosRequerimentoExigencia(jsonData){
    //consumidor.setCombo('exigenciaCodDadosRetificadosComprev', 33);
    if(jsonData.requerimento === null){

    }else{
        if(jsonData.requerimento.flgRequerimentoComprev !== ''){
            $('input[name=exigenciaFlgRequerimentoComprev][value=' + jsonData.requerimento.flgRequerimentoComprev + ']').prop('checked', true);
        }
        $('#exigenciaCodDadosRetificadosComprev').val(jsonData.requerimento.codDadosRetificadosComprev);
    }

    //$('input[name=exigenciaFlgRequerimentoComprev]').prop('disabled', true);
   // $('#exigenciaCodDadosRetificadosComprev').prop('disabled', true);

    if(jsonData.requerimento === null || jsonData.requerimento.flgRequerimentoComprev === ''){
        $('#exigenciaFlgRequerimentoComprevRetificacao').prop("checked",true);
    }

}


function carregarDocumentosBeneficio(){

    if($('#hiddenNumSeqReq').val() !== ''){

        $('#divDocumentosBeneficio').empty();

        let params  = {};
        params.codNum = 37;
        let jsonData = consumidor.executarServico("controleCompensacao/consultarCodigo", params);

        let conteudoTabela =  '<h2 class="mb-3"><i class="fa fa-file" aria-hidden="true"></i>Documentos do Benefício</h2>';

        conteudoTabela     += '<table id="tabelaDocumentos" class="tabelaPaddingMenor">';
        conteudoTabela     += '<thead>';
        conteudoTabela     += '<th >Documentos</th>';
        conteudoTabela     += '<th>Anexar Documentos</th>';
        conteudoTabela     += '</thead>';
        conteudoTabela     += '<tbody>';

        $.each(jsonData.codigos, function(eachIndice, eachCodigo){
            conteudoTabela     += '<tr>';
            conteudoTabela     +=     '<td>' + eachCodigo.desDescricao + '</td>';
            conteudoTabela     +=     '<td><input type="file" id="myFile" name="filename"></td>';
            conteudoTabela     += '</tr>';
        });
        conteudoTabela     += '</tbody>';
        conteudoTabela     += '</table>';
        conteudoTabela     += '<p>Os Documentos devem estar no formato ".PDF" e devem ter, cada um, no máximo 3MB.<br/>';
        conteudoTabela     += 'Após anexar os documentos, eles devem ser assinados. Só serão recebidos pela Spprev documentos assinados.</p>';
        conteudoTabela     += '<div class="botao-rodape centralizar mb-6">';
        conteudoTabela     += '<input type="button" value="Assinar Documentos" class="btn butverde" disabled="true">';
        conteudoTabela     += '</div">';

        $('#divDocumentosBeneficio').append(conteudoTabela);
    }
}

function carregarDocumentosRequerimento(){
    if($('#hiddenNumSeqReq').val() !== ''){

        $('#divDocumentosRequerimento').empty();



        let conteudoTabela =  '<h2 class="mb-3"><i class="fa fa-file" aria-hidden="true"></i>Documentos do Requerimento</h2>';

        conteudoTabela     += '<table id="tabelaDocumentos" class="tabelaPaddingMenor">';
        conteudoTabela     += '<thead>';
        conteudoTabela     += '<th >Documentos</th>';
        conteudoTabela     += '<th>Anexar Documentos</th>';
        conteudoTabela     += '</thead>';
        conteudoTabela     += '<tbody>';


           //RGPS  Certidão de Tempo do INSS

            conteudoTabela     += '<tr>';
            conteudoTabela     +=     '<td>' + 'Certidão de Tempo do INSS' + '</td>';
            conteudoTabela     +=     '<td><input type="file" id="myFile" name="filename"></td>';
            conteudoTabela     += '</tr>';


           //RPPS Certidão de Tempo do RPPS <ESFERA> de <NOME DESTINATÁRIO>
           //Exemplo RPPS : Certidão de Tempo do RPPS Municipal de Belo Horizonte

            conteudoTabela     += '<tr>';
            conteudoTabela     +=     '<td>' + 'Certidão de Tempo do RPPS [ESFERA] de [NOME_DESTINATARIO]' + '</td>';
            conteudoTabela     +=     '<td><input type="file" id="myFile" name="filename"></td>';
            conteudoTabela     += '</tr>';

        conteudoTabela     += '</tbody>';
        conteudoTabela     += '</table>';
        conteudoTabela     += '<p>Os Documentos devem estar no formato ".PDF" e devem ter, cada um, no máximo 3MB.<br/>';
        conteudoTabela     += 'Após anexar os documentos, eles devem ser assinados. Só serão recebidos pela Spprev documentos assinados.</p>';
        conteudoTabela     += '<div class="botao-rodape centralizar mb-6">';
        conteudoTabela     += '<input type="button" value="Assinar Documentos" class="btn butverde" disabled="true">';
        conteudoTabela     += '</div">';

        $('#divDocumentosRequerimento').append(conteudoTabela);
    }
}

function deveExibirLinkIrParaTelaComprev(){
    let params = {};
    params.codIns = $('#hiddenCodIns').val();
    params.login = $('#hiddenLogin').val();
    params.codEntidade = $('#hiddenCodEntidade').val();

    let jsonData = consumidor.executarServico("cadastroRequerimento/deveExibirLinkIrParaTelaComprev", params);

    if(jsonData.deveExibirLinkIrParaTelaComprev === true){
        $('#linkIrParaTelaComprev').show();
    }else{
        $('#linkIrParaTelaComprev').hide();
    }
}

function ObterCamposRelatorio(){

    let params = {};

    params.numCpf = $("#numCpf").val();

    if($("#flgRequerimentoComprevInicial").prop('checked') == true){
        params.tipoReq = "Inicial";
    } else {
        params.tipoReq = "Alteração de Beneficio";
    }

    params.nomPessoaFisica                = $("#nomPessoaFisica").val();
    params.codSexo                        = $("#codSexo").val();
    params.numPis                         = $("#numPis").val();
    params.numRg                          = $("#numRg").val();

    params.datNasc                        = $("#datNasc").val();
    params.numNit                         = $("#numNit").val();
    params.nomMae                         = $("#nomMae").val();
    params.numMatricula                   = $("#numMatricula").val();
    params.numPv                          = $("#numPv").val();
    params.numMatriculaOrigemComprev      = $("#numMatriculaOrigemComprev").val();
    params.numPvOrigemComprev             = $("#numPvOrigemComprev").val();
    params.numCnpj                        = $("#numCnpj").val();
    params.datIniEstatutarioEfetivo       = $("#datIniEstatutarioEfetivo").val();

    if($("#flgLicencaSim").prop('checked') == true){
        params.flgLicenca = "SIM";
    } else {
        params.flgLicenca = "";
    }

    if($("#flgLicencaNao").prop('checked') == true){
        params.flgLicenca = "NÃO";
    } else {
        params.flgLicenca = "";
    }

    params.codTipoBeneficioComprev        = $("#codTipoBeneficioComprev").val();
    params.codBeneficio                   = $("#codBeneficio").val();
    params.valBeneficioComprev            = $("#valBeneficioComprev").val();
    params.datIniPagamentoComprev         = $("#datIniPagamentoComprev").val();
    params.dscFundLegalComprev            = $("#dscFundLegalComprev").val();
    params.datIniBenComprev               = $("#datIniBenComprev").val();
    params.datCessacaoComprev             = $("#datCessacaoComprev").val();
    params.qtdTmpLiqDiaTotal              = $("#qtdTmpLiqDiaTotal").val();
    params.numProcBen                     = $("#numProcBen").val();
    params.datIngServPublicComprev        = $("#datIngServPublicComprev").val();
    params.flgFiscalizacaoTcComprev       = $("#flgFiscalizacaoTcComprev").val();
    params.codTipoCalcParidComprev        = $("#codTipoCalcParidComprev").val();
    params.numProcessoTcComprev           = $("#numProcessoTcComprev").val();
    params.datHomolTc                     = $("#datHomolTc").val();
    params.codRegimeOrigem                = $("#codRegimeOrigem").val();
    if($("#numSeqParticipante").val() != null){
        params.numSeqParticipante             = $("#numSeqParticipante").val();
    } else {
        params.numSeqParticipante             = "";
    }

    params.datIngRegOrig                  = $("#datIngRegOrig").val();
    params.datDesvRegOrig                 = $("#datDesvRegOrig").val();
    params.numTempContribRegOrig          = $("#numTempContribRegOrig").val();
    params.numTempContribRegOrigConcessor = $("#numTempContribRegOrigConcessor").val();
    params.codEntidade                    = $("#codEntidade").val();
    params.datIngServPublico              = $("#datIngServPublico").val();

    return params;
}


function imprimirCadastroRequerimentoPdf(){
    let req = new XMLHttpRequest();
    let paramUrl = urlDominioBackEnd + urlContextoBackEnd + '/cadastroRequerimento/imprimirCadastroRequerimentoPdf';
    let params = {};

    params = ObterCamposRelatorio();

    req.open("POST", paramUrl, true);
    req.responseType = "blob"
    req.onload = function (event) {
        let blob = req.response;
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download= 'Cadastro_Requerimento.pdf';
        link.click();
    };
    req.send(JSON.stringify(params));
}