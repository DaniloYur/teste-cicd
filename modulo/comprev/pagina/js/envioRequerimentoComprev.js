const PAGINA_REQUERIMENTO        = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/requerimento.html';
const PAGINA_REQUERIMENTO_PENSAO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/pensao.html';
const PAGINA_CONSULTA_DETALHADA  = urlDominioFrontEnd + urlContextoFrontEnd + 'componenteGenerico/html/consultaDetalhada.html';
//Pegar valor de paginacao
let paramsToken = {};
paramsToken.token = getCookieSigeprev("tokenSigeprev")
let valorPaginacao = consumidor.executarServico("requerimentoCompensacao/consultarPaginacao", paramsToken);
valorPaginacao = valorPaginacao.replace("[", "")
valorPaginacao = valorPaginacao.replace("]", "")
valorPaginacao = valorPaginacao.replaceAll("'", "")
//
const QTD_REGISTROS_POR_PAGINA = valorPaginacao;
const QUANTIDADE_MAXIMA_DE_LINKS_PARA_PAGINAS = 5;

let REQ_INICIAL_PAGINA = -1;
let REQ_FINAL_PAGINA = -1;
let TOTAL_REGISTROS = -1;
let PAGINA_ATUAL = -1;
let PAGINA_FINAL = -1;
let QTD_TOTAL_DE_PAGINAS = -1
let QTD_TOTAL_DE_GRUPOS_DE_PAGNAS = -1

function init() {
    with(document.forms[0]) {

        let paramsToken = {};
        paramsToken.token = getCookieSigeprev("tokenSigeprev");
        let jsonDataToken = consumidor.executarServico("token/verificarTokenRetornandoJson", paramsToken);
        setCookieSigeprev('cookieContexto',jsonDataToken.ambiente, 1);
        setCookieSigeprev('cookieCodIns',jsonDataToken.codIns, 1);
        setCookieSigeprev('cookieLogin',jsonDataToken.login, 1);
        setCookieSigeprev('cookieNumCpfLogin',jsonDataToken.numCpfLogin, 1);

        carregarCombosDaTela();
        inserirMascarasNosCampos();
        $('#divPosConsulta').hide();
    }
}

function carregarCombosDaTela() {
    with(document.forms[0]) {
        $('#codRegimeOrigem').html('');
        $('#codRegimeOrigem').empty();
        $('#codTipProcesso').html('');
        $('#codTipProcesso').empty();
        $('#codTipRequerimento').html('');
        $('#codTipRequerimento').empty();
        $('#codAnalise').html('');
        $('#codAnalise').empty();
        $('#usuResponsavel').html('');
        $('#usuResponsavel').empty();

        consumidor.setComboComOpcaoTodos('codRegimeOrigem', 7);
        consumidor.setComboComOpcaoTodos('codTipProcesso', 47);
        consumidor.setComboComOpcaoTodos('codTipRequerimento', 48);
        consumidor.setCombo('codAnalise', 21);
        consumidor.setComboNovo('usuResponsavel', "enviarRequerimento/listarUsuarios");
        consumidor.setCombo('codEstadoReq', 23);
    }
}

function inserirMascarasNosCampos() {
    with(document.forms[0]) {
        setaMascara(numCpf, MASK_CPF);
        //setaMascara(numNit, MASK_CPF);
        setaMascara(numPis, MASK_PIS);
        setaMascara(datConcBenIni, MASK_DATA);
        setaMascara(datConcBenFim, MASK_DATA);
        setaMascara(datInclFolhaIni, MASK_DATA);
        setaMascara(datInclFolhaFim, MASK_DATA);
        setaMascara(datAtuReqIni, MASK_DATA);
        setaMascara(datAtuReqFim, MASK_DATA);

        setaMascara(datAbertReqIni, MASK_DATA);
        setaMascara(datAbertReqFim, MASK_DATA);
        setaMascara(datHomolTcIni, MASK_DATA);
        setaMascara(datHomolTcFim, MASK_DATA);
        setaMascara(datCessacaoIni, MASK_DATA);
        setaMascara(datCessacaoFim, MASK_DATA);
    }
}

function abrirTelaConsultaDetalhada(){
    window.open(PAGINA_CONSULTA_DETALHADA,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function carregarNumCpfPelaConsultaDetalhada(paramNumCpf){
    $('#numCpf').val(paramNumCpf);
}

function limpar() {
    with(document.forms[0]) {
        
        codRegimeOrigem.value = '';
        numCpf.value = '';
        codTipProcesso.value = '';
        numProtocolo.value = '';
        codTipRequerimento.value = '';
        numNit.value = '';
        codAnalise.value = '';
        numPis.value = '';
        usuResponsavel.value = '';
        datConcBenIni.value = '';
        datConcBenFim.value = '';
        datInclFolhaIni.value = '';
        datInclFolhaFim.value = '';
        datAtuReqIni.value = '';
        datAtuReqFim.value = '';

        datAbertReqIni.value = '';
        datAbertReqFim.value = '';
        datHomolTcIni.value  = '';
        datHomolTcFim.value  = '';
        datCessacaoIni.value = '';
        datCessacaoFim.value = '';

        $('#divPosConsulta').hide();
        
    }
}

function consultar() {
    with(document.forms[0]) {

        erros = '';

        validaCampo2(codRegimeOrigem);
        validaCampo2(codTipProcesso);
        validaCampo2(codTipRequerimento);

        erros = verificarDatasInicialFinal(datConcBenIni, datConcBenFim, 'Data de Concessão do Benefício', erros);
        erros = verificarDatasInicialFinal(datInclFolhaIni, datInclFolhaFim, 'Data da Inclusão na Folha de Pagamento', erros);
        erros = verificarDatasInicialFinal(datAtuReqIni, datAtuReqFim, 'Data de Atualização do Requerimento', erros);

        erros = verificarDatasInicialFinal(datAbertReqIni, datAbertReqFim, 'Data de Abertura do Requerimento', erros);
        erros = verificarDatasInicialFinal(datHomolTcIni, datHomolTcFim, 'Data de Homologação do TCE', erros);
        erros = verificarDatasInicialFinal(datCessacaoIni, datCessacaoFim, 'Data de Cessação do Benefício', erros);

        if(erros != '') {
            alerta = JSON.stringify(erros.replace(/(?:\r\n|\r|\n)/g, '      '));
            alert(alerta.replace(/[\\"]/g, ''));
            erros = "";
            alerta = "";
            return;
        } else {

            let params = {};
            params.cod_regime_origem    = $('#codRegimeOrigem').val();
            params.tipo_processo        = $('#codTipProcesso').val();
            params.tipo_requerimento    = $('#codTipRequerimento').val();
            params.cod_analise          = $('#codAnalise').val();
            params.cod_Estado_Req         = $('#codEstadoReq').val();
            params.resp_atu_func        = $('#usuResponsavel').val();
            params.dat_incl_folha_ini   = $('#datInclFolhaIni').val();
            params.dat_incl_folha_fim   = $('#datInclFolhaFim').val();
            params.cpf                  = $('#numCpf').val() != '' ? tirarMascaraDeValor($('#numCpf').val()) : ''
            params.protocolo            = $('#numProtocolo').val();
            params.nit                  = $('#numNit').val();
            params.pis_pasep            = $('#numPis').val() != '' ? tirarMascaraDeValor($('#numPis').val()) : ''
            params.dat_conc_ben_ini     = $('#datConcBenIni').val();
            params.dat_conc_ben_fim     = $('#datConcBenFim').val();
            params.dat_atu_req_ini      = $('#datAtuReqIni').val();
            params.dat_atu_req_fim      = $('#datAtuReqFim').val();
            params.dat_abert_req_ini = $('#datAbertReqIni').val();
            params.dat_abert_req_fim = $('#datAbertReqFim').val();
            params.dat_homol_tc_ini  = $('#datHomolTcIni').val();
            params.dat_homol_tc_fim  = $('#datHomolTcFim').val();
            params.dat_cessacao_ini  = $('#datCessacaoIni').val();
            params.dat_cessacao_fim  = $('#datCessacaoFim').val();

            let jsonData = consumidor.executarServico("enviarRequerimento/consultarRequerimentos", params);
            montarTabelaDeRequerimentos(jsonData);
        }
    }
}

function montarTabelaDeRequerimentos(jsonData) {
    with(document.forms[0]) {

        $('#divMsgBuscaVazia').html('');
        $('#divMsgBuscaVazia').hide();

        if(JSON.stringify(jsonData.listaRequerimentos) === '[]') {
            $('#divBuscaComResultados').hide();
            $('#divMsgBuscaVazia').html('Não existem requerimentos para a busca efetuada');
            $('#divMsgBuscaVazia').show();
        } else {
            $('#divBuscaComResultados').show();
            let cabecalhoDaTabela = '<th>Data Formalização Folha</th>';
            cabecalhoDaTabela 	  += "<th>Nome</th>"
            cabecalhoDaTabela     += '<th>CPF</th>';
            cabecalhoDaTabela     += '<th>NIT</th>';
            cabecalhoDaTabela     += '<th>PIS/PASEP</th>';
            cabecalhoDaTabela     += '<th>Protocolo</th>';
            cabecalhoDaTabela     += '<th>Tipo de Processo</th>';
            cabecalhoDaTabela     += '<th>Tipo de Requerimento</th>';
            cabecalhoDaTabela     += '<th>Regime Origem</th>';
            cabecalhoDaTabela     += '<th>Data de Concessão do Benefício</th>';
            cabecalhoDaTabela     += '<th>Data Atualização Funcional</th>';
            cabecalhoDaTabela     += '<th>Data de Abertura do Requerimento</th>';
            cabecalhoDaTabela     += '<th>Data de Homologação</th>';
            cabecalhoDaTabela     += '<th>Data de Cessação</th>';
            cabecalhoDaTabela     += '<th>Estado do Requerimento</th>';
            cabecalhoDaTabela     += '<th>Análise</th>';
            cabecalhoDaTabela     += '<th>Responsável Atualização Funcional</th>';
            cabecalhoDaTabela     += '<th>VER REQUERIMENTOS</th>';
            cabecalhoDaTabela     += '<th>';
            cabecalhoDaTabela     +=    '<input type="checkbox" name="checkAll" id="checkAll" title="Selecionar Todos" onclick="selecionarTodosOsRequerimentosDaPagina()">';
            cabecalhoDaTabela     += '</th>';
        
            let corpoDaTabela = '';
            $.each(jsonData.listaRequerimentos, function(eachIndice, eachRequerimento) {

                let estiloLinha = 'cel-gray';
                if(eachIndice % 2 != 0){
                    estiloLinha =  'cel-gray2';
                }

                corpoDaTabela += '<tr class="' + estiloLinha + '">';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datFormalizacao;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.nome;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.numCpf;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.numNit;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.numPis;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.numProtocolo;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.tipoProcesso;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.tipoRequerimento;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.regimeOrigem;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datConcessao;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datAtuFuncional;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datAbertReq;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datHomolTc;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.datCessacao;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.estadoReq;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.analise;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        eachRequerimento.responsavelAtuFunc;
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        '<a href="javascript:abrirRequerimento('+retornaValorComAspas(eachRequerimento.numSeqReq)+');" title="Ver requerimento número '+eachRequerimento.numProtocolo+'">';
                corpoDaTabela +=            '<i class="fa fa-search fa-lg" aria-label="Ver Requerimento"></i>';
                corpoDaTabela +=        '</a>';
                corpoDaTabela +=    '</td>';
                corpoDaTabela +=    '<td>';
                corpoDaTabela +=        '<input type="checkbox" name="idRequerimento" id="idRequerimento" prot="'+eachRequerimento.numProtocolo+'" title="Selecionar Requerimento" value="' + eachRequerimento.numSeqReq + '" onclick="atualizarSelecionados()">';
                corpoDaTabela +=    '</td>';
                corpoDaTabela += '</tr>';
            });

            $('#tableResult').find('thead').empty();
            $('#tableResult').find('thead').append(cabecalhoDaTabela);
            $('#tableResult').find('tbody').empty();
            $('#tableResult').find('tbody').append(corpoDaTabela);

            //$('#divPosConsulta').show();

            montarTabelaDinamica(jsonData.listaRequerimentos.length);
        }
        $('#divPosConsulta').show();
    }
}
function atualizarSelecionados() {
    let checkboxes = document.querySelectorAll('input[name="idRequerimento"]:checked');
    let totalSelecionados = checkboxes.length;

    let spanInfo = document.getElementById("selecionadosInfo");

    if (totalSelecionados === 0) {
        spanInfo.innerText = "";
    } else if (totalSelecionados === 1) {
        spanInfo.innerText = "1 item selecionado";
    } else {
        spanInfo.innerText = totalSelecionados + " itens selecionados";
    }
}

function selecionarTodosOsRequerimentosDaPagina() {
    let checkBoxes = document.querySelectorAll('input[name="idRequerimento"]');

    for(let i=REQ_INICIAL_PAGINA; i<=REQ_FINAL_PAGINA; i++) {
        if(checkBoxes[i] != undefined) {
            checkBoxes[i].click();
        }
    }
}

function montarTabelaDinamica(qtdRequerimentos) {
    //with(document.forms[0]) {
        TOTAL_REGISTROS    = qtdRequerimentos;
        $('#tableInfo').html('');
        $('#tableInfoParcial').html('');
        $('#tableLinks').html('');
        REQ_INICIAL_PAGINA = 0;
        REQ_FINAL_PAGINA   = QTD_REGISTROS_POR_PAGINA - 1;

        let reqFimPagina = 0;
        if(TOTAL_REGISTROS < REQ_FINAL_PAGINA) {
            reqFimPagina = TOTAL_REGISTROS;
        } else {
            reqFimPagina = REQ_FINAL_PAGINA + 1;
        }

        let rowsTotal        = qtdRequerimentos;
        let numPaginas       = rowsTotal/QTD_REGISTROS_POR_PAGINA;
        PAGINA_ATUAL         = 0;
        PAGINA_FINAL         = Math.ceil(numPaginas) - 1;
        QTD_TOTAL_DE_PAGINAS = Math.ceil(numPaginas);
        QTD_TOTAL_DE_GRUPOS_DE_PAGNAS = Math.ceil(QTD_TOTAL_DE_PAGINAS/QUANTIDADE_MAXIMA_DE_LINKS_PARA_PAGINAS )


        $('#selecionadosInfo').append()
        $('#tableInfoParcial').append('Mostrando de ' + (REQ_INICIAL_PAGINA+1) + ' até ' + (reqFimPagina));
        $('#tableLinks').append('[<a id="first" href="javascript:mudarPagina('+retornaValorComAspas('first')+');" rel="0">Primeiro</a>/');
        $('#tableLinks').append('<a id="ant" href="javascript:mudarPagina('+retornaValorComAspas('ant')+');" rel="'+(PAGINA_ATUAL-1)+'"><<</a>]');
        for(let i=0; i<numPaginas; i++) {
            let pageNum = i+1;
            $('#tableLinks').append('<a id="'+i+'" class="pgs" href="javascript:mudarPagina('+retornaValorComAspas(i)+')" rel="'+i+'">'+pageNum+'</a>');
        }
        $('#tableLinks').append('[<a id="prox" href="javascript:mudarPagina('+retornaValorComAspas('prox')+');" rel="'+(PAGINA_ATUAL+1)+'">>></a>/');
        $('#tableLinks').append('<a id="last" href="javascript:mudarPagina('+retornaValorComAspas('last')+')" rel="'+Math.ceil(numPaginas-1)+'">Último</a>]');

        // Mostra o primeiro grupo de páginas
        $('.pgs').hide();
        $('.pgs').slice(0, QUANTIDADE_MAXIMA_DE_LINKS_PARA_PAGINAS).show();

        $('#tableResult tbody tr').hide();
        $('#tableResult tbody tr').slice(0, QTD_REGISTROS_POR_PAGINA).show();
        $('#0').addClass('active');

        if( $(".tabelaLink").length > 0 ) {
            /*
            $(".table-responsive").html("<div class='row'><div class='col-md-5'>"+
                $(".table-responsive").html()
                .replace("</span><span", "</span></div><div class='col-md-7 text-right'><span")
                .replace("</SPAN><SPAN", "</span></div><div class='col-md-7 text-right'><span")
                .replace("<table"," </div></div> <table")
                .replace("<TABLE"," </div></div> <table")
            );
            */
            menuPaginacao();
        }
    //}
}

function desmarcarTodosOsCheckBoxes() {
    if($("#checkAll").is(":checked")) {
        $("#checkAll").click();
    }
    let checkBoxes = document.querySelectorAll("#idRequerimento");
    for(let i=0; i<checkBoxes.length; i++) {
        if(checkBoxes[i].checked) {
            checkBoxes[i].click();
        }
    }
}

function mudarPagina(pageNum) {

    // desmarcarTodosOsCheckBoxes();

    let elemento = $('#'+pageNum);
    $('#tableLinks a').removeClass('active');
    let paginaAtual = elemento.attr('rel');
    $('#'+paginaAtual).addClass('active');
    //elemento.addClass('active');

    if(paginaAtual < 0) {
        paginaAtual = 0;
     }
    if(paginaAtual > PAGINA_FINAL) {
        paginaAtual = PAGINA_FINAL;
    }


    PAGINA_ATUAL = paginaAtual;

    // Atualiza o atributo REL dos botões anterior e próximo
    $('#ant').attr("rel",  (parseInt(PAGINA_ATUAL) - 1 < 0 ? 0 : parseInt(PAGINA_ATUAL) - 1));
    $('#prox').attr("rel", (parseInt(PAGINA_ATUAL) + 1 > PAGINA_FINAL ? PAGINA_FINAL : parseInt(PAGINA_ATUAL) + 1));

    // Atualiza grupo de páginas
    let paginas = getGrupoPaginas(PAGINA_ATUAL);
    if(parseInt(paginas.pagInicial) != -1 && parseInt(paginas.pagFinal) != -1) {
        $('.pgs').hide();
        $('.pgs').slice(paginas.pagInicial, parseInt(paginas.pagFinal)+1).show();
    }
    

    let itemInicial = parseInt(paginaAtual) * parseInt(QTD_REGISTROS_POR_PAGINA);
    let itemFinal   = parseInt(itemInicial) + parseInt(QTD_REGISTROS_POR_PAGINA);
    $('#tableResult tbody tr').hide();
    $('#tableResult tbody tr').slice(itemInicial, itemFinal).show();
    REQ_INICIAL_PAGINA = itemInicial;
    REQ_FINAL_PAGINA   = itemFinal - 1;

    if(REQ_FINAL_PAGINA > (TOTAL_REGISTROS - 1)) {
        REQ_FINAL_PAGINA = TOTAL_REGISTROS - 1;
    }

    $('#tableInfoParcial').html('');
    $('#tableInfoParcial').append('Mostrando de ' + (REQ_INICIAL_PAGINA+1) + ' até ' + (REQ_FINAL_PAGINA+1));

    verificarCheckboxesDaPaginaAtual();

}

function verificarCheckboxesDaPaginaAtual() {
    let checkboxes = document.querySelectorAll('input[name="idRequerimento"]');
    let algumMarcado = false;

    for (let i = REQ_INICIAL_PAGINA; i <= REQ_FINAL_PAGINA; i++) {
        if (checkboxes[i] && checkboxes[i].checked) {
            algumMarcado = true;
            break;
        }
    }

    if (!algumMarcado) {
        let checkAll = document.getElementById('checkAll');
        if (checkAll) {
            checkAll.checked = false;
        }
    }

    if (algumMarcado){
        let checkAll = document.getElementById('checkAll');
        if (checkAll.checked === false) {
            checkAll.checked = true;
        }
    }

        let spanInfo = document.getElementById("selecionadosInfo");
        if (spanInfo) {
            spanInfo.innerText = "";
        }

    atualizarSelecionados();
    }

function getGrupoPaginas(pagAtual) {
    let pagInicial = -1;
    let pagFinal = -1;
    let pag = pagAtual;
    let grpPaginas = {}

    while(true) {
        if(pag % QUANTIDADE_MAXIMA_DE_LINKS_PARA_PAGINAS == 0) {
            pagInicial = pag;
            break;
        }
        pag = parseInt(pag) - 1;
    }

    pag = pagAtual;

    if(pag == pagInicial) {
        pag = parseInt(pag) + 1;
    }

    while(true) {
        if(pag % QUANTIDADE_MAXIMA_DE_LINKS_PARA_PAGINAS == 0) {
            pagFinal = parseInt(pag)-1;
            break;
        }
        pag = parseInt(pag) + 1;
    }

    grpPaginas.pagInicial = pagInicial;
    grpPaginas.pagFinal = pagFinal;
    return(grpPaginas);
}

function abrirRequerimento(numSeqReq) {
    let params = {}
    params.codIns    = getCookieSigeprev('cookieCodIns');
    params.numSeqReq = numSeqReq
    let jsonData = consumidor.executarServico("enviarRequerimento/buscarDadosRequerimentoSelecionado", params);
    let urlParam = "";
    if(jsonData.codTipoRequerimento == '1') {
        urlParam = PAGINA_REQUERIMENTO;
        urlParam     += "?codIdeCli="       + jsonData.codIdeCli;
        urlParam     += "&numSeqFunc="      + jsonData.numSeqFunc;
        urlParam     += "&numMatricula="    + jsonData.numMatricula;
        urlParam     += "&codIdeRelFunc="   + jsonData.codIdeRelFunc;
        urlParam     += "&numSeqBeneficio=" + jsonData.numSeqBeneficio;
        urlParam     += "&numSeqReq="       + jsonData.numSeqReq;
        urlParam     += "&readOnly="        + '1';
    } else if(jsonData.codTipoRequerimento == '2') {
        urlParam = PAGINA_REQUERIMENTO_PENSAO;
        urlParam     += "?codIdeCli="       + jsonData.codIdeCli;
        urlParam     += "&numSeqFunc="      + jsonData.numSeqFunc;
        urlParam     += "&numMatricula="    + jsonData.numMatricula;
        urlParam     += "&codIdeRelFunc="   + jsonData.codIdeRelFunc;
        urlParam     += "&numSeqBeneficio=" + jsonData.numSeqBeneficio;
        urlParam     += "&numSeqReq="       + jsonData.numSeqReq;
        urlParam     += "&numSeqReqApos="   + jsonData.numSeqReqApos;
        urlParam     += "&numCpfServidor="  + jsonData.numCpfServidor;
        urlParam     += "&readOnly="        + '1';
    }
    window.open(urlParam,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
    
}

function enviar() {

    let checkBoxes = document.querySelectorAll("#idRequerimento");
    let requerimentosSelecionados = [];
    for(let i=0; i<checkBoxes.length; i++) {
        if(checkBoxes[i].checked) {
            requerimentosSelecionados.push(checkBoxes[i].value);
        }
    }
    if(requerimentosSelecionados.length == 0) {
        alert("- Selecione ao menos 1 requerimento para ser enviado.");
    } else {
        let requerimentosComProblemas       = [];
        let requerimentosEnviadosComSucesso = [];
        let listaResultados = "";
        for(let i=0; i<requerimentosSelecionados.length; i++) {
            let params = {}
            params.sequencialRequerimento = requerimentosSelecionados[i];
            params.login = getCookieSigeprev('cookieLogin');
            let result = consumidor.executarServico("requerimentoCompensacao/enviarRequerimento", params);
            result.numSeqReq = requerimentosSelecionados[i];
            let registroSelecionado = document.querySelector("[id='idRequerimento'][value='"+result.numSeqReq+"']");
            result.numProtocolo = $(registroSelecionado).attr("prot");
            if(result.statusCode != '201') {
                if(result == "Erro"){
                    alert("Erro ao consultar informacoes do requerimento.")
                }
                requerimentosComProblemas.push(result);
            } else {
                requerimentosEnviadosComSucesso.push(result);
            }
        }

        if(requerimentosEnviadosComSucesso.length > 0) {
            for(let i=0; i<requerimentosEnviadosComSucesso.length; i++) {
                listaResultados = listaResultados + "- Requerimento Protocolo " + requerimentosEnviadosComSucesso[i].numProtocolo + " enviado com sucesso.\n";
            }
        }

        if(requerimentosComProblemas.length > 0) {
            for(let i=0; i<requerimentosComProblemas.length; i++) {
                let numSeqReq = requerimentosComProblemas[i].numSeqReq;
                let numProtocolo = requerimentosComProblemas[i].numProtocolo
                
                 if(requerimentosComProblemas[i].response.erros !== undefined) {
                    for(let j=0; j<requerimentosComProblemas[i].response.erros.length; j++) {
                        let mensagem  = requerimentosComProblemas[i].response.erros[j].mensagem
                        let descricao = requerimentosComProblemas[i].response.erros[j].descricao
                        listaResultados = listaResultados + "- Requerimento Protocolo " + numProtocolo + ": " + mensagem + " " + descricao+ "\n";
                    }
                } else {
                    let mensagem  = requerimentosComProblemas[i].response.mensagem
                    let descricao = requerimentosComProblemas[i].response.descricao
                    listaResultados = listaResultados + "- Requerimento Protocolo " + numProtocolo + ": " + mensagem + " " + descricao+ "\n";
                }
                if(requerimentosComProblemas[i].mensagemResultadoBD !== undefined && requerimentosComProblemas[i].mensagemResultadoBD != "") {
                    listaResultados = listaResultados + "- Requerimento Protocolo " + numProtocolo + ": " + requerimentosComProblemas[i].mensagemResultadoBD + "\n";
                }
                // listaResultados = listaResultados + "- "
                listaResultados = listaResultados + "\n";
            }
        }

        if(listaResultados != "") {
            alert(listaResultados);
            listaResultados = "";
        }
    }
    consultar();
    
}

function exportarConsultaEmArquivo(tipoArquivo) {
    let params = {};
    params.cod_regime_origem    = $('#codRegimeOrigem').val();
    params.tipo_processo        = $('#codTipProcesso').val();
    params.tipo_requerimento    = $('#codTipRequerimento').val();
    params.cod_analise          = $('#codAnalise').val();
    params.resp_atu_func        = $('#usuResponsavel').val();
    params.dat_incl_folha_ini   = $('#datInclFolhaIni').val();
    params.dat_incl_folha_fim   = $('#datInclFolhaFim').val();
    params.cpf                  = $('#numCpf').val() != '' ? tirarMascaraDeValor($('#numCpf').val()) : ''
    params.protocolo            = $('#numProtocolo').val();
    params.nit                  = $('#numNit').val();
    params.pis_pasep            = $('#numPis').val() != '' ? tirarMascaraDeValor($('#numPis').val()) : ''
    params.dat_conc_ben_ini     = $('#datConcBenIni').val();
    params.dat_conc_ben_fim     = $('#datConcBenFim').val();
    params.dat_atu_req_ini      = $('#datAtuReqIni').val();
    params.dat_atu_req_fim      = $('#datAtuReqFim').val();

    params.dat_abert_req_ini = $('#datAbertReqIni').val();
    params.dat_abert_req_fim = $('#datAbertReqFim').val();
    params.dat_homol_tc_ini  = $('#datHomolTcIni').val();
    params.dat_homol_tc_fim  = $('#datHomolTcFim').val();
    params.dat_cessacao_ini  = $('#datCessacaoIni').val();
    params.dat_cessacao_fim  = $('#datCessacaoFim').val();

    let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd;
    if(tipoArquivo == 'excel') {
        urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + "enviarRequerimento/exportarExcelRequerimentos";
    } else if(tipoArquivo == 'csv') {
        urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + "enviarRequerimento/exportarCSVRequerimentos";
    } else {
        alert('Formato inválido.');
        return;
    }
    if(params !== undefined && params !== '{}'){
        urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + '?' + $.param(params);
    }
    window.open(urlDominioContextoServicoParametros, "_blank");
}

/*
function exportarExcel() {
    let params = {};
    params.cod_regime_origem    = $('#codRegimeOrigem').val();
    params.tipo_processo        = $('#codTipProcesso').val();
    params.tipo_requerimento    = $('#codTipRequerimento').val();
    params.cod_analise          = $('#codAnalise').val();
    params.resp_atu_func        = $('#usuResponsavel').val();
    params.dat_incl_folha_ini   = $('#datInclFolhaIni').val();
    params.dat_incl_folha_fim   = $('#datInclFolhaFim').val();
    params.cpf                  = $('#numCpf').val() != '' ? tirarMascaraDeValor($('#numCpf').val()) : ''
    params.protocolo            = $('#numProtocolo').val();
    params.nit                  = $('#numNit').val();
    params.pis_pasep            = $('#numPis').val() != '' ? tirarMascaraDeValor($('#numPis').val()) : ''
    params.dat_conc_ben_ini     = $('#datConcBenIni').val();
    params.dat_conc_ben_fim     = $('#datConcBenFim').val();
    params.dat_atu_req_ini      = $('#datAtuReqIni').val();
    params.dat_atu_req_fim      = $('#datAtuReqFim').val();
    let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + "enviarRequerimento/exportarExcelRequerimentos";
    if(params !== undefined && params !== '{}'){
        urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + '?' + $.param(params);
    }

    window.open(urlDominioContextoServicoParametros, "_blank");
}

function exportarCSV() {
    let params = {};
    params.cod_regime_origem    = $('#codRegimeOrigem').val();
    params.tipo_processo        = $('#codTipProcesso').val();
    params.tipo_requerimento    = $('#codTipRequerimento').val();
    params.cod_analise          = $('#codAnalise').val();
    params.resp_atu_func        = $('#usuResponsavel').val();
    params.dat_incl_folha_ini   = $('#datInclFolhaIni').val();
    params.dat_incl_folha_fim   = $('#datInclFolhaFim').val();
    params.cpf                  = $('#numCpf').val() != '' ? tirarMascaraDeValor($('#numCpf').val()) : ''
    params.protocolo            = $('#numProtocolo').val();
    params.nit                  = $('#numNit').val();
    params.pis_pasep            = $('#numPis').val() != '' ? tirarMascaraDeValor($('#numPis').val()) : ''
    params.dat_conc_ben_ini     = $('#datConcBenIni').val();
    params.dat_conc_ben_fim     = $('#datConcBenFim').val();
    params.dat_atu_req_ini      = $('#datAtuReqIni').val();
    params.dat_atu_req_fim      = $('#datAtuReqFim').val();
    let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + "enviarRequerimento/exportarCSVRequerimentos";
    if(params !== undefined && params !== '{}'){
        urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + '?' + $.param(params);
    }
    window.open(urlDominioContextoServicoParametros, "_blank");
}
*/

function retornaValorComAspas(valor){
    return "'" + valor + "'";
}

function verificarDatasInicialFinal(campoDataInicio, campoDataFim, paramNomeCampo, paramErros){
    if(campoDataInicio.value != '' && !ValidaData(campoDataInicio.value)) {
        paramErros += '- O campo "' + paramNomeCampo + ' Inicial" não foi preenchido com uma data correta.\n';
    }else if(campoDataFim.value != '' && !ValidaData(campoDataFim.value)){
        paramErros += '- O campo "' +  paramNomeCampo + ' Final" não foi preenchido com uma data correta.\n';
    }else{
        if(campoDataInicio.value != '' && campoDataFim.value != '') {
             if(comparaDatas(campoDataInicio.value, campoDataFim.value) == 2) {
                paramErros = paramErros + '- A "' + paramNomeCampo + ' Inicial" não pode ser anterior à "' + paramNomeCampo +' Final".\n';
             }
        }
    }
    return paramErros;
}

// Inicialização - init
$(document).ready(function(){
    init();
});