const PAGINA_CONSULTA_REQUERIMENTO  = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/consultaRequerimento.html';
const PAGINA_RETORNO_API_COMPREV    = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/retornoApiComprev.html';
const PAGINA_HISTORICO_FINANCEIRO   = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoFinanceiro.html';
const PAGINA_HISTORICO_REQUERIMENTO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoRequerimento.html';
const PAGINA_PENSAO  				= urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/pensao.html';

var tipoValDep = "";

function init() {
    with(document.forms[0]) {

        let params = {};
        params.numSeqReqApos      = urlParametros.get("numSeqReqApos");
        params.numSeqReq          = urlParametros.get("numSeqReq");
        params.numSeqBeneficio    = urlParametros.get("numSeqBeneficio");
        params.numSeqFunc         = urlParametros.get("numSeqFunc");
        params.codIdeCli          = urlParametros.get("codIdeCli");
        params.numCpf             = urlParametros.get("numCpfServidor");


        let jsonData = consumidor.executarServico("pensao/consultarInformacoesRequerimentoPensao", params);

        $('#hiddenNumSeqBeneficio').val(params.numSeqBeneficio);
        $('#hiddenCodBeneficio').val(jsonData.beneficio.codBeneficio);
        $('#hiddenNumSeqReq').val(params.numSeqReq);
        $('#hiddenNumCpfServidor').val(urlParametros.get("numCpfServidor"));
        $('#hiddenCodIdeCli').val(params.codIdeCli);
        $('#hiddenNumSeqFunc').val(urlParametros.get("numSeqFunc"));
        $('#hiddenNumSeqReqApos').val(urlParametros.get("numSeqReqApos"));
        
        $('#hiddenCodEntidade').val(jsonData.funcional.codEntidade);
        $('#hiddenNomEntidade').val(jsonData.funcional.nomEntidade);
        $('#hiddenNomPessoaFisica').val(jsonData.pessoaFisica.nomPessoaFisica);

        carregarCombosDaTela();
        bloquearCamposDaTela();
		carregarDadosDoRequerimentoDeAposentadoria(jsonData, params.numSeqReq, params.numSeqReqApos);
        carregarInfosRequerimentoAposSelecionado(params.numSeqReqApos);
        carregarDadosDoBeneficioDePensao(params);
		carregarListaDeDependentes();
        carregarDadosDoRequerimentoDePensao(params, jsonData);
        inserirMascarasNosCampos();
    }
}

function inserirMascarasNosCampos() {
    with(document.forms[0]) {
        setaMascara(dataObito, MASK_DATA);
        setaMascara(dataInitBenef, MASK_DATA);
        setaMascara(dataCessacao, MASK_DATA);
        setaMascara(dataHomolTCE, MASK_DATA);
        setaMascara(dataPrimeiraHabil, MASK_DATA);
        setaMascara(numCpfDep, MASK_CPF);
        setaMascara(datNascDep, MASK_DATA);
        setaMascara(datIniBenDep, MASK_DATA);
        setaMascara(datFimBenDep, MASK_DATA);
        setaMascara(dataAbertRequerimento, MASK_DATA);
        //setaMascara(datAtualizacao, MASK_DATA);
        $("#rendaMensalInit").maskMoney({thousands:'.', decimal:',', affixesStay: false});
    }
}

function carregarCombosDaTela() {
    with(document.forms[0]) {

        $('#codSexoDep').html('');
        $('#codSexoDep').empty();
        $('#codEstCivDep').html('');
        $('#codEstCivDep').empty();
        $('#codParentescoDep').html('');
        $('#codParentescoDep').empty();
        $('#codCapacidadeDep').html('');
        $('#codCapacidadeDep').empty();
        $('#codMotInclusaoDep').html('');
        $('#codMotInclusaoDep').empty();
        $('#codPerfilDep').html('');
        $('#codPerfilDep').empty();
        $('#codValidacaoDep').html('');
        $('#codValidacaoDep').empty();
        $('#codAnalise').html('');
        $('#codAnalise').empty();
        $('#codEstadoReq').html('');
        $('#codEstadoReq').empty();

        let params        = {}
        params.codIns     = getCookieSigeprev('cookieCodIns');
        params.numSeqFunc = urlParametros.get("numSeqFunc");
        params.numCpf     = urlParametros.get("numCpfServidor");
        params.numSeqReq  = urlParametros.get("numSeqReq");


        consumidor.setComboNovo('reqAposentadoria', "pensao/consultarRequerimentosAposentadoriaVinculados", params);
        consumidor.setCombo('codSexoDep', 30);
        consumidor.setCombo('codEstCivDep', 28);
        consumidor.setCombo('codParentescoDep', 42);
        consumidor.setCombo('codCapacidadeDep', 39);
        consumidor.setCombo('codMotInclusaoDep', 43);
        consumidor.setCombo('codPerfilDep', 40);
        consumidor.setCombo('codValidacaoDep', 44); // Sem dados
        consumidor.setCombo('codAnalise', 21);
        consumidor.setCombo('codEstadoReq', 23);
    }
}

function bloquearCamposDaTela() {
    with(document.forms[0]) {
        $('#numBeneficio').prop("disabled", true);
        $('#dataObito').prop("disabled", true);
        // $('#rendaMensalInit').prop("disabled", true);
        $('#numCpfDep').prop("disabled", true);
        /*
        if($('#hiddenNumSeqReq').val() != "") {
            $('#reqAposentadoria').prop("disabled", true);
        }
        */
        $('#datCompensacao').prop("disabled", true);
        $('#valCompensacao').prop("disabled", true);
        $('#valProRataAtualizada').prop("disabled", true);
        $('#dtCompProRata').prop("disabled", true);
        $('#datAtualizacao').prop("disabled", true);
        $('#usuResponsavel').prop("disabled", true);
        $('#codPerfilDep').prop("disabled", true);
        $('#dataAbertRequerimento').prop("disabled", true);

        if(isDeveHabilitarBotaoHistoricoFinanceiro == true){
            $('#botaoHistoricoFinanceiro').prop("disabled", false);
        } else {
            $('#botaoHistoricoFinanceiro').prop("disabled", true);
        }
    }
}

function carregarDadosDoRequerimentoDeAposentadoria(jsonData, numSeqReq, numSeqReqApos) {
    with(document.forms[0]) {
        $('#dadosRequerimentoAposNumCpf').text(jsonData.pessoaFisica.numCpf);
        $('#dadosRequerimentoAposNomPessoaFisica').text(jsonData.pessoaFisica.nomPessoaFisica);
        //$('#dadosRequerimentoAposNumMatricula').text(jsonData.funcional.numMatricula);

        if(numSeqReqApos === null || numSeqReqApos === ''){
            let params = {};
            params.numSeqReq = numSeqReq;
            let jsonRequerimento = consumidor.executarServico("pensao/carregarInfosRequerimentoAposSelecionado", params);
            $('#reqAposentadoria').val(jsonRequerimento.numSeqReqAposBcomprev);
        }else{
            $('#reqAposentadoria').val(numSeqReqApos);
        }
    }
}

function carregarDadosDoBeneficioDePensao(parametros) {
    with(document.forms[0]) {

        let params = {}
        params.numSeqBeneficio    = parametros.numSeqBeneficio;
        params.codIdeCli          = parametros.codIdeCli;
        params.numSeqBeneficiario = parametros.numSeqBeneficiario;

        let jsonData2 = consumidor.executarServico("pensao/consultarDadosDoBeneficioDePensao", params);

        $('#numBeneficio').val(jsonData2.numBeneficio);
        $('#dataObito').val(jsonData2.datObito);
        $('#dataInitBenef').val(jsonData2.datIniBen);
        $('#dataCessacao').val(jsonData2.datCessacao);
        $('#rendaMensalInit').val(jsonData2.rendaMensalInicial);
        $('#dataHomolTCE').val(jsonData2.datHomologTC);
        $('#dataPrimeiraHabil').val(jsonData2.datPrimHabilitacao);

        carregarAbaValidacoesDoBeneficio(params)
    }
}

function carregarAbaValidacoesDoBeneficio(params) {
    let jsonData = consumidor.executarServico("pensao/consultarValidacoesBeneficio", params);
    let dadosValidacoesBeneficios = jsonData.dadosValidacoesBeneficios;

    $('#mensagemTabelaValidacoesBeneficios').html('');
    $('#mensagemTabelaValidacoesBeneficios').empty();

    if(JSON.stringify(dadosValidacoesBeneficios) === '[]'){
        $('#mensagemTabelaValidacoesBeneficios').html('<font color="red">Não foram encontrados observações de validações para esse benefício.</font>');
    }else{
        let cabecalhoDaTabela  = '<th class="col01">DATA</th>';
        cabecalhoDaTabela     += '<th>OBSERVAÇÃO</th>';
        cabecalhoDaTabela     += '<th class="col01">USUÁRIO</th>';

        let corpoDaTabela = '';
        $.each(dadosValidacoesBeneficios, function(eachIndice, eachObservacaoValidacaoBeneficio){
            corpoDaTabela += '<tr>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoBeneficio.datIng;
            corpoDaTabela +=     '</a></td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoBeneficio.desObs;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoBeneficio.nomUsuIng;
            corpoDaTabela +=      '</td>';
            corpoDaTabela += '</tr>';
        });

        $('#tabelaValidacoesBeneficios').find('thead').empty();
        $('#tabelaValidacoesBeneficios').find('thead').append(cabecalhoDaTabela);
        $('#tabelaValidacoesBeneficios').find('tbody').empty();
        $('#tabelaValidacoesBeneficios').find('tbody').append(corpoDaTabela);
    }
}

function incluirObservacaoValidacaoBeneficio(){

    if($('#obserValidacaoBen').val() == "") {
        alert("Insira a Observação de Validação antes de tentar incluí-la");
        return;
    }

    let params = {};
    params.numSeqBeneficio              = $('#hiddenNumSeqBeneficio').val();
    params.codBeneficio                 = $('#hiddenCodBeneficio').val();
    params.observacaoValidacaoBeneficio = $('#obserValidacaoBen').val();
    params.login                        = getCookieSigeprev('cookieLogin');
    consumidor.executarServico("pensao/incluirObservacaoValidacaoBeneficio", params);
    carregarAbaValidacoesDoBeneficio(params);
}

function carregarAbaValidacoesRequerimento(params){
    $('#mensagemTabelaValidacoesRequerimento').html();
    $('#mensagemTabelaValidacoesRequerimento').empty();

    if(params.numSeqReq === ''){
        $('#mensagemTabelaValidacoesRequerimento').html('<font color="red">Não existe ainda registro de requerimento criado, grave primeiro a tela antes de inserir uma observação de validação de requerimento.</font>');
        return;
    }

    let jsonData = consumidor.executarServico("controleCompensacao/consultarValidacoesRequerimento", params);
    let dadosValidacoesRequerimento = jsonData.dadosValidacoesRequerimento;

    if(JSON.stringify(dadosValidacoesRequerimento) === '[]'){
        $('#mensagemTabelaValidacoesRequerimento').html('<font color="red">Não foram encontrados observações de validações para esse requerimento.</font>');
    }else{
        let cabecalhoDaTabela  = '<th class="col01">DATA</th>';
        cabecalhoDaTabela     += '<th>OBSERVAÇÃO</th>';
        cabecalhoDaTabela     += '<th class="col01">USUÁRIO</th>';

        let corpoDaTabela = '';
        $.each(dadosValidacoesRequerimento, function(eachIndice, eachObservacaoValidacaoRequerimento){
            corpoDaTabela += '<tr>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoRequerimento.datIng;
            corpoDaTabela +=     '</a></td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoRequerimento.desObs;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachObservacaoValidacaoRequerimento.nomUsuIng;
            corpoDaTabela +=      '</td>';
            corpoDaTabela += '</tr>';
        });

        $('#tabelaValidacoesRequerimento').find('thead').empty();
        $('#tabelaValidacoesRequerimento').find('thead').append(cabecalhoDaTabela);
        $('#tabelaValidacoesRequerimento').find('tbody').empty();
        $('#tabelaValidacoesRequerimento').find('tbody').append(corpoDaTabela);
    }

}

function incluirObservacaoValidacaoRequerimento(){

    if($('#obserValidacaoRequerimento').val() == "") {
        alert("Insira a Observação de Validação antes de tentar incluí-la");
        return;
    }
    let params = {};
    if($('#hiddenNumSeqReq').val() === ''){
        alert('Não existe registro de requerimento ainda, é necessário primeiro gravar a tela e em seguida tentar novamente inserir uma observação');
        return;
    }
    params.numSeqReq                  = $('#hiddenNumSeqReq').val();
    params.obserValidacaoRequerimento = $('#obserValidacaoRequerimento').val();
    params.login                      = getCookieSigeprev('cookieLogin');
    consumidor.executarServico("pensao/incluirObservacaoValidacaoRequerimento", params);
    carregarAbaValidacoesRequerimento(params);
}

function carregarListaDeDependentes() {
    with(document.forms[0]) {
        let params                = {};
        params.codBeneficio       = $('#hiddenCodBeneficio').val();
        params.numSeqRequerimento = $('#hiddenNumSeqReq').val();
        let jsonData              = consumidor.executarServico("pensao/buscarListaDeDependentes", params);

        if(JSON.stringify(jsonData.listaDependentes) === '[]') {
            // Tratar quando dependentes não forem encontrados
        } else {
            let cabecalhoTabela = '';
            cabecalhoTabela +=  '<tr>';
            cabecalhoTabela +=      '<th>NOME DEPENDENTE</th>';
            cabecalhoTabela +=      '<th>CPF</th>';
            cabecalhoTabela +=      '<th>DATA DE NASCIMENTO</th>';
            cabecalhoTabela +=      '<th>VÍNCULO</th>';
            cabecalhoTabela +=      '<th>SEXO</th>';
            cabecalhoTabela +=      '<th>CAPACIDADE</th>';
            cabecalhoTabela +=      '<th>VALIDAÇÃO DEPENDENTE</th>';
            cabecalhoTabela +=  '</tr>';

            let corpoDaTabela = '';
            $.each(jsonData.listaDependentes, function(indiceDepentente, dependente) {
                corpoDaTabela +=    '<tr>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.nomPessoaFisica;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.numCpf;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.datNasc;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.desVinculo;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.desSexo;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.desCapacidade;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=        '<td>';
                corpoDaTabela +=            '<a href="javascript:carregarDependenteSelecionado(' + retornaValorComAspas(dependente.numSeqBeneficiario) + ', ' + retornaValorComAspas($('#hiddenNumSeqReq').val()) +',\''+dependente.desValidacao+'\')">';
                corpoDaTabela +=                dependente.desValidacao;
                corpoDaTabela +=            '</a">';
                corpoDaTabela +=        '</td>';
                corpoDaTabela +=    '<tr>';
            });

            $('#tabelaDependente').find('thead').empty();
            $('#tabelaDependente').find('thead').append(cabecalhoTabela);
            $('#tabelaDependente').find('tbody').empty();
            $('#tabelaDependente').find('tbody').append(corpoDaTabela);
        }

    }
}

function carregarDependenteSelecionado(numSeqBeneficiario, numSeqRequerimento, desDep) {
    with(document.forms[0]) {
        let params   = {};
        params.numSeqBeneficiario = numSeqBeneficiario;
        params.numSeqRequerimento = numSeqRequerimento;
        let jsonData = consumidor.executarServico("pensao/carregarDependenteSelecionado", params);
        $('#numCpfDep').val(jsonData.numCpf);
        $('#nomDep').val(jsonData.nomPessoaFisica);
        $('#nomMaeDep').val(jsonData.nomMae);
        $('#datNascDep').val(jsonData.datNasc);
        $('#codSexoDep').val(jsonData.codSexo);
        $('#codEstCivDep').val(jsonData.codEstCiv);
        $('#codParentescoDep').val(jsonData.codParentesco);
        $('#codCapacidadeDep').val(jsonData.codCapacidade);
        $('#codMotInclusaoDep').val(jsonData.codMotInclusao);
        $('#datIniBenDep').val(jsonData.datIniBen);
        $('#datFimBenDep').val(jsonData.datFimBen);
        $('#codPerfilDep').val(jsonData.codPerfil);
        $('#codValidacaoDep').val(jsonData.codValidacao);

        $('#codIdeCliDependenteSelecionado').val(jsonData.codIdeCliDep);
        $('#numSeqBeneficiarioDependenteSelecionado').val(numSeqBeneficiario);
		
		tipoValDep = desDep;
    }
}

function carregarDadosDoRequerimentoDePensao(params, jsonData) {
    with(document.forms[0]) {
        if(params.numSeqReq != "") {
            let jsonData2 = consumidor.executarServico("pensao/carregarDadosDoRequerimentoDePensao", params);

            carregarDadosTratamentoRequerimentoDeCompensacao(params, jsonData2);
            carregarDadosAcompanhamentoRequerimentoDeCompensacao(params, jsonData2);
        }
    }
}

function carregarDadosTratamentoRequerimentoDeCompensacao(params, jsonData2) {
    with(document.forms[0]) {

        $('#codAnalise').val(jsonData2.codAnalise);
        $('#obsAnaliseComprev').val(jsonData2.desObsAnaliseComprev);
        carregarAbaValidacoesRequerimento(params);
    }
}

function carregarDadosAcompanhamentoRequerimentoDeCompensacao(params, jsonData2) {
    with(document.forms[0]) {

        consultarApiComprev(params);

        $('#numProtocoloCompen').val(jsonData2.numProtocoloCompen);
        $('#dataAbertRequerimento').val(jsonData2.datAbertReq);
        $('#codEstadoReq').val(jsonData2.codEstadoReq);
        $('#datCompensacao').val(jsonData2.datCompensacao);
        $('#valCompensacao').val(jsonData2.valProRataConcessao);
        $('#valProRataAtualizada').val(jsonData2.valUltProRataAtualizada);
        $('#dtCompProRata').val(jsonData2.datUltComptProRata);
        $('#datAtualizacao').val(jsonData2.datUltAtuComprev);
        $('#usuResponsavel').val(jsonData2.nomUsuUltAtuComprev);
    }
}

function carregarInfosRequerimentoAposSelecionado(numSeqReq) {
    if(numSeqReq != "" && numSeqReq != null) {
        let params = {};
        params.numSeqReq  = numSeqReq;
        let jsonDataToken = consumidor.executarServico("pensao/carregarInfosRequerimentoAposSelecionado", params);
        $('#dadosRequerimentoAposDestinatario').text(jsonDataToken.destinatario == null ? "" : jsonDataToken.destinatario);
        $('#dadosRequerimentoAposEstadoReq').text(jsonDataToken.desEstadoReq == null ? "" : jsonDataToken.desEstadoReq);
    } else {
        $('#dadosRequerimentoAposDestinatario').text("");
        $('#dadosRequerimentoAposEstadoReq').text("");
    }
}

function alterarDependente() {
    with (document.forms[0]) {
        if($('#codIdeCliDependenteSelecionado').val() == "") {
            alert("Nenhum dependente selecionado");
        } else {
            erros = "";
            validaCampo2(numCpfDep);
            validaCampo2(nomDep);
            validaCampo2(nomMaeDep);
            validaCampoData2(datNascDep);
            validaCampo2(codSexoDep);
            validaCampo2(codEstCivDep);
            validaCampo2(codParentescoDep);
            validaCampo2(codCapacidadeDep);

            if (erros != ""){
                alert(erros);
                erros ="";
                return;
            } else{
                let paramsDependente = {};
                paramsDependente.codIdeCliDep      = $('#codIdeCliDependenteSelecionado').val();
                // paramsDependente.numCpfDep         = $('#numCpfDep').val();
                paramsDependente.nomDep            = $('#nomDep').val();
                paramsDependente.nomMaeDep         = $('#nomMaeDep').val();
                paramsDependente.datNascDep        = $('#datNascDep').val();
                paramsDependente.codSexoDep        = $('#codSexoDep').val();
                paramsDependente.codEstCivDep      = $('#codEstCivDep').val();
                paramsDependente.codParentescoDep  = $('#codParentescoDep').val();
                paramsDependente.codCapacidadeDep  = $('#codCapacidadeDep').val();
                paramsDependente.codMotInclusaoDep = $('#codMotInclusaoDep').val();
                paramsDependente.datIniBenDep      = $('#datIniBenDep').val();
                paramsDependente.datFimBenDep      = $('#datFimBenDep').val();
                paramsDependente.codPerfilDep      = $('#codPerfilDep').val();
                paramsDependente.codValidacaoDep   = $('#codValidacaoDep').val();

                let retornoAlteracao = consumidor.executarServico("pensao/alterarDependente", paramsDependente);

                if(retornoAlteracao.codStatus !== 0){
                    alert("Erro");
                    return;
                } else {
                    alert('Dependente alterado com sucesso.');
                    carregarListaDeDependentes();
                }
            }
        }
        
    }
}


function consultarApiComprev(params){
    $('#terceiroBlocoApiComprev').empty();
    $('#terceiroBlocoApiComprev').show();

    let paramsServico = {};
    paramsServico.codIdeCli = params.codIdeCli;

    $('#mensagemApiComprev').html();
    $('#btnRetornoApiComprev').hide();

    let jsonData = consumidor.executarServico("pensao/consultarApiComprev", params);

    let listaApiComprev = jsonData.listaApiComprev;


    if(JSON.stringify(listaApiComprev) === '[]'){
        $('#mensagemApiComprev').html('<font color="red">Não foram encontrados registros de retorno da api do comprev.</font>');
    }else{
        $('#btnRetornoApiComprev').show();
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
            //paramsExigencia.numSeqReqRetApi = '4'; //MOCK

            let jsonDatExigencia = consumidor.executarServico("pensao/consultarApiComprevExigencia", paramsExigencia);

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


        });

    }

}



function abrirTelaDetalheRetornoApiComprev(){
    let urlTelaApiComprev = PAGINA_RETORNO_API_COMPREV;
    urlTelaApiComprev   += "?codIdeCli=" + $('#hiddenCodIdeCli').val();
    urlTelaApiComprev   += "&numSeqBeneficio=" + $('#hiddenNumSeqBeneficio').val();
    window.open(urlTelaApiComprev,'pagina',"width=950, height=755, top=100, left=110, scrollbars=no ");
}

function abrirTelaHistoricoFinanceiro(){
    window.open(PAGINA_HISTORICO_FINANCEIRO,'pagina',"width=1050, height=355, top=100, left=110, scrollbars=no ");
}

function abrirTelaHistoricoAtualizacaoDados(){
    let urlParam = PAGINA_HISTORICO_REQUERIMENTO;
    urlParam     += "?numSeqReq=" + $('#hiddenNumSeqReq').val();
    urlParam     += "&flgPensao=1";
    window.open(urlParam,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function voltar(){
    let urlParam = PAGINA_CONSULTA_REQUERIMENTO;
    urlParam     += "?numCpf=" + $('#hiddenNumCpfServidor').val();
    window.location.href = urlParam;
}

function gravar() {
    with(document.forms[0]) {
        erros = "";
//THAMIRES RECHE B DA SILVA
		
		if (tipoValDep != undefined && !tipoValDep.includes("Sem Compensa")) {
			validaCampo2(reqAposentadoria);
			validaCampo2(dataInitBenef);
			validaCampo2(rendaMensalInit);
			if ($('#codIdeCliDependenteSelecionado').val() != "") {
				// validaCampo2(numCpfDep);
				validaCampo2(nomDep);
				validaCampo2(nomMaeDep);
				validaCampoData2(datNascDep);
				validaCampo2(codSexoDep);
				validaCampo2(codEstCivDep);
				validaCampo2(codParentescoDep);
				validaCampo2(codCapacidadeDep);
			}
			validaCampo2(obsAnaliseComprev);
		}
		
        if (erros != ""){
            alerta = JSON.stringify(erros.replace(/(?:\r\n|\r|\n)/g, '      '));
            alert(alerta.replace(/[\\"]/g, ''));
            erros = "";
            alerta = "";
            return;
        } else {
            // Montar objeto para ser enviado ao servidor
            let params = {};


            params.login = getCookieSigeprev('cookieLogin');
            /* Dados do requerimento de aposentadoria */
            params.codIdeCliServ     = $('#hiddenCodIdeCli').val(); // codIdeCli do servidor/legador
            params.numSeqReq         = $('#hiddenNumSeqReq').val(); // req de pensão
            params.reqAposentadoria  = $('#reqAposentadoria').val();
            /* Dados do beneficio de pensao */
            params.numSeqBeneficio   = $('#hiddenNumSeqBeneficio').val();
            params.codBeneficio      = $('#hiddenCodBeneficio').val();
            params.dataInitBenef     = $('#dataInitBenef').val();
            params.dataCessacao      = $('#dataCessacao').val();

            params.rendaMensalInit   = $('#rendaMensalInit').val()

            //Renan - Vitor verificar por favor.
            params.valRendaMensalIni = $('#rendaMensalInit').val();


            params.dataHomolTCE      = $('#dataHomolTCE').val();
            params.dataPrimeiraHabil = $('#dataPrimeiraHabil').val();
            /* Dependentes */
            if($('#codIdeCliDependenteSelecionado').val() != "") {
                params.flgDependenteAlterado = "1";
                params.codIdeCliDep          = $('#codIdeCliDependenteSelecionado').val();
                params.numSeqBeneficiario    = $('#numSeqBeneficiarioDependenteSelecionado').val();
                params.numCpfDep             = $('#numCpfDep').val();
                params.nomDep                = $('#nomDep').val();
                params.nomMaeDep             = $('#nomMaeDep').val();
                params.datNascDep            = $('#datNascDep').val();
                params.codSexoDep            = $('#codSexoDep').val();
                params.codEstCivDep          = $('#codEstCivDep').val();
                params.codParentescoDep      = $('#codParentescoDep').val();
                params.codCapacidadeDep      = $('#codCapacidadeDep').val();
                params.codMotInclusaoDep     = $('#codMotInclusaoDep').val();
                params.datIniBenDep          = $('#datIniBenDep').val();
                params.datFimBenDep          = $('#datFimBenDep').val();
                params.codPerfilDep          = $('#codPerfilDep').val();
                params.codValidacaoDep       = $('#codValidacaoDep').val();
            } else {
                params.flgDependenteAlterado = "0";
            }
            /* Tratamento requerimento de Compensacao */
            params.codAnalise        = $('#codAnalise').val();
            params.obsAnaliseComprev = $('#obsAnaliseComprev').val();
            /* Acompanhamento requerimento de Compensacao */
            params.numProtocoloCompen    = $('#numProtocoloCompen').val();
            params.dataAbertRequerimento = $('#dataAbertRequerimento').val();
            params.codEstadoReq          = $('#codEstadoReq').val();

            let jsonRetornoGravacao = consumidor.executarServico("pensao/gravarDadosDaTela", params);

            //if(jsonRetornoGravacao.codStatus !== 0){
            //    alert(jsonRetornoGravacao.msgStatus);
            //} else {
            //    alert('Gravação efetuada com sucesso.');
            //}
            alert(jsonRetornoGravacao.msgStatus);
            if(jsonRetornoGravacao.codStatus === 0){
                init();
                if($('#codIdeCliDependenteSelecionado').val() != "") {
                    carregarDependenteSelecionado($('#numSeqBeneficiarioDependenteSelecionado').val(), $('#hiddenNumSeqReq').val())
                }
            }
        }
    }
}

function retornaValorComAspas(valor){
    return "'" + valor + "'";
}

// Inicialização - init
$(function(){
    init();
});

function completarProtocoloComZeros(numeroProtocolo) {
    let numeroProtocoloStr;
    if(numeroProtocolo == null || numeroProtocolo == "") {
        return "";
    }else {
        numeroProtocoloStr = numeroProtocolo;
        if(numeroProtocolo.length < 10) {
            let qtdZerosFaltantes =  10 - numeroProtocolo.length;
        let sbZeros = "";
        for(let contador = 0; contador < qtdZerosFaltantes; contador++) {
            sbZeros+= "0";
        }
        numeroProtocoloStr = sbZeros + numeroProtocolo;
        }
    }
    return numeroProtocoloStr;
}

function atualizarPagina(){
    if(confirm("Deseja atualizar a página? Todas as informações preenchidas não gravadas serão descartadas.")){
        let urlParam = PAGINA_PENSAO;
        urlParam     += "?numSeqReqApos="+ $('#hiddenNumSeqReqApos').val();
        urlParam     += "&numSeqReq="     + $('#hiddenNumSeqReq').val();
        urlParam     += "&numSeqBeneficio="    + $('#hiddenNumSeqBeneficio').val();
        urlParam     += "&numSeqFunc="  + $('#hiddenNumSeqFunc').val();
        urlParam     += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
        urlParam     += "&numCpfServidor=" + $('#hiddenNumCpfServidor').val();
        window.location.href = urlParam;
    }
}

function abrirTelaSigeprevVisualizacaoDocumentosDigitalizados(){
    // https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/documentoDigital.do?acao=prepararTelaVisualizacao&numeroProtocoloPreenchimentoDadosAutomatico=0080007000
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/documentoDigitalLayoutNovo.do";
    url += "?metodoParaChamarNoServidor=prepararTelaVisualizacao";
    url += "&numeroProtocoloPreenchimentoDadosAutomatico=" + completarProtocoloComZeros($('#hiddenCodBeneficio').val());
    url += "&origem=comprev";
    window.open(url, '_blank');
}

function abrirTelaSigerevServidor(){
    //https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/servidor.do?numCpf=093.181.248-80&acao=PESQUISAR_CPF
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/servidor.do";
    url += "?acao=PESQUISAR_CPF";
    url += "&numCpf=" +  $('#hiddenNumCpfServidor').val();
    window.open(url, 'beneficiarios');
}

function abrirTelaSigeprevHistoricoTempo(){
    //https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/histCarteiraTrab.do?acao=PESQUISAR&modo=JANELA&codIdeCli=9006000547143600&codEntidade=6&numCpf=093.181.248-80&nomPessoaFisica=ANTONIA%20PIMENTEL%20DA%20SILVA&nomEntidade=SECRETARIA%20DE%20SA%DADE&travarTela=true
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/histCarteiraTrab.do";
    url += "?acao=PESQUISAR";
    url += "&modo=JANELA";
    url += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
    url += "&codEntidade=" + $('#hiddenCodEntidade').val();
    url += "&numCpf=" + $('#hiddenNumCpfServidor').val();
    url += "&nomPessoaFisica=" + $('#hiddenNomPessoaFisica').val();
    url += "&nomEntidade=" + $('#hiddenNomEntidade').val();
    url += "&travarTela=true";
    window.open(url, 'historicoTempo');
}

function abrirTelaSigeprevCertidoes(){
    //https://sigeprev.spprev.sp.gov.br/spprevhom/comprev/certidaoTemposComprev.do?acao=PESQUISAR&modo=JANELA&codIdeCli=9006000547143600&codEntidade=6&codBeneficio=80007000&relatorio=relatorioTemposAverbadosComprev&travarTela=true
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/comprev/certidaoTemposComprev.do";
    url += "?acao=PESQUISAR";
    url += "&modo=JANELA";
    url += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
    url += "&codEntidade=" + $('#hiddenCodEntidade').val();
    url += "&codBeneficio=" + $('#hiddenCodBeneficio').val();
    url += "&relatorio=relatorioTemposAverbadosComprev";
    url += "&travarTela=true";
    window.open(url, 'certidoes');
}

function excluirCallBack(simNao){
	if(!simNao)
		return;
	
	let param = {};
	param.codBeneficio = $('#codBeneficio').val() == undefined || $('#codBeneficio').val() == "" ? $('#numBeneficio').val() : $('#codBeneficio').val();
	param.numSeqReq = $('#hiddenNumSeqReq').val();
	
	var msg = consumidor.executarServico("cadastroRequerimento/cancelarRequerimentoPensao", param);
	
	if(msg != undefined && msg.codigoResultado > 0){
		alertSigePrev2comCallback2(msg.mensagemResultado, redirecionarParaPrimeiraPagina);
	}else if(msg != undefined && msg.codigoResultado <= 0){
		alertSigePrev2(msg.mensagemResultado);
	}else{
		alertSigePrev2("Erro ao excluir requerimento, por favor tente novamente, se o erro persistir contate o suporte.");
	}
}

function excluirReqPensao(){
	let objMsg = buscarMsg();
	confirmSigeprev2(objMsg.codigos[0].desDescricao, "excluirCallBack");
}

function buscarMsg(){
	let msg = "";
	let param = {};
	param.codNum = "30213";
	param.codPar="2";
	msg = consumidor.executarServico("cadastroRequerimento/consultarCodigo", param);
	return msg;
}

function redirecionarParaPrimeiraPagina() {
	let urlParam = PAGINA_CONSULTA_REQUERIMENTO;
	urlParam += "?numCpf=" + $('#hiddenNumCpfServidor').val();
	urlParam += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
	urlParam += "&numSeqFunc=" + $('#hiddenNumSeqFunc').val();
	urlParam += "&numMatricula=" + $('#hiddenNumMatricula').val();
	urlParam += "&codIdeRelFunc=" + $('#hiddenCodIdeRelFunc').val();

	urlParam += "&numSeqBeneficio=" + $('#hiddenNumSeqBeneficio').val();
	urlParam += "&numSeqReq=" + $('#hiddenNumSeqReq').val();
	window.location.href = urlParam;
}

function alertSigePrev2comCallback2(msgEmHtml, metodoCallback) {
	$(function() {
		$("#dialog-msg .ui-dialog-content", window.parent.document).html(msgEmHtml);
		$("#dialog-msg", window.parent.document).css({ "display": "block" });
		$(".ui-widget-overlay", window.parent.document).css({ "display": "block" });

		$("#dialog-msg .ui-dialog-buttonset button", window.parent.document).click(function() { botaoDialog("#dialog-msg"); metodoCallback();});
		$("#dialog-msg .ui-dialog-titlebar .ui-dialog-titlebar-close", window.parent.document).click(function() { botaoDialog("#dialog-msg"); metodoCallback();});

		altura = $("#dialog-msg", window.parent.document).height() / 2;
		largura = $("#dialog-msg", window.parent.document).width() / 2;

		$("#dialog-msg", window.parent.document).css({ position: "fixed", top: "50%", left: "50%", "margin-top": "-" + altura + "px", "margin-left": "-" + largura + "px" });

		checkPageOutput(); //fallback 
	});
}