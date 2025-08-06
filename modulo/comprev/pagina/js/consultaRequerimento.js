const PAGINA_CONSULTA_DETALHADA  = urlDominioFrontEnd + urlContextoFrontEnd + 'componenteGenerico/html/consultaDetalhada.html';
const PAGINA_REQUERIMENTO        = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/requerimento.html';
const PAGINA_REQUERIMENTO_PENSAO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/pensao.html';

function init() {

    with (document.forms[0]) {
        setaMascara(numCpf, MASK_CPF);
        setaMascara(numPis, MASK_PIS);

        //token
        let paramsToken = {};
        paramsToken.token = getCookieSigeprev("tokenSigeprev");
        let jsonDataToken = consumidor.executarServico("token/verificarTokenRetornandoJson", paramsToken);
        setCookieSigeprev('cookieContexto',jsonDataToken.ambiente, 1);
        setCookieSigeprev('cookieCodIns',jsonDataToken.codIns, 1);
        setCookieSigeprev('cookieLogin',jsonDataToken.login, 1);
        setCookieSigeprev('cookieNumCpfLogin',jsonDataToken.numCpfLogin, 1);
        
        if(urlParametros.get("numCpf") !== null){
            if($('#numCpf').val() === ''){
                $('#numCpf').val(urlParametros.get("numCpf"));
            }
            setaMascara(numCpf, MASK_CPF);
            consultarServidorPorNumCpfBotao();
        } else {
            if($("#numCpf").val() != null && $("#numCpf").val() != ""){
                setaMascara(numCpf, MASK_CPF);
                consultarServidorPorNumCpfBotao();
            }
        }
    }
}

//inicialização
$(document).ready(function(){
    init();
});

//funcao que eh chamada pela pop-up consultaDetalhada.
function carregarNumCpfPelaConsultaDetalhada2(paramNumCpf, paramCodIdeCli){
    $('#numCpf').val(paramNumCpf);

    //esconderTableBeneficio();
    //segundaFunction();
    //consultarPorCodIdeCliProtocolo(paramCodIdeCli);
    //consultarPorCpfProtocolo(numCpf.value);
    //consultarPorCpfBeneficio(numCpf.value);
    //consultarServidorPorNumCpfCallBack(paramCodIdeCli);
    consultarServidorPorNumCpfBotao();
    window.close()
}

function consultarServidorPorNumCpfBotao(){
    with (document.forms[0]) {
        erros = '';
        validaCampo2(numCpf);
        validaCampoCpfComMascara2(numCpf);
        if (erros != ""){
            alert(erros);
            return;
        }
    }

    let params = {};
    params.numCpf = $('#numCpf').val();

    let jsonDataMultiplosServidores = consumidor.executarServico("controleCompensacao/verificarSeNumCpfPossuiMaisDeUmRegistro", params);
    if(jsonDataMultiplosServidores.possuiMaisDeUmRegistro === true){
        window.open(PAGINA_CONSULTA_DETALHADA + '?paramNumCpfMultiplo=' + $('#numCpf').val(),'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
    }else{
        consultarServidor(params);
    }
}

function consultarServidorPorNumCpfCallBack(paramCodIdeCliSelecionado){
    let params = {};
    params.numCpf = $('#numCpf').val();
    params.codIdeCli = paramCodIdeCliSelecionado;
    consultarServidor(params);
}


function consultarServidorPorNumMatricula(){
    with (document.forms[0]) {
        erros = '';
        validaCampo2(numMatricula);
        if (erros != ""){
            alert(erros);
            return;
        }
    }

    let params = {};
    params.numMatricula = $('#numMatricula').val();
    consultarServidor(params);
}
function consultarServidorPorPisPasep(){
    with (document.forms[0]) {
        erros = '';
        validaCampo2(numPis);
        if (erros != ""){
            alert(erros);
            return;
        }
    }

    let params = {};
    params.numPis = $('#numPis').val();
    consultarServidor(params);
}

function consultarServidor(params){
    $('#mensagemPesquisaPessoaFisica').hide();
    $('#mensagemPesquisaPessoaFisica').empty();


    $('#primeiroBlocoMensagemCliqueParticipante').hide();
    $('#segundoBlocoMensagemCliqueParticipante').hide();

    $('#primeiroBloco').hide();
    $('#segundoBloco').hide();
    $('#terceiroBlocoApiComprev').hide();
    $('#quartoBlocoAcoesGeraisTela').hide();

    $('#primeiroBlocoBotaoIncluir').hide();
    $('#segundoBlocoBotaoIncluir').hide();


    $('#primeiroBlocoTabelaFuncional').find('thead').empty();
    $('#primeiroBlocoTabelaFuncional').find('tbody').empty();

    $('#segundoBlocoTabelaFuncional').find('thead').empty();
    $('#segundoBlocoTabelaFuncional').find('tbody').empty();

    $('#primeiroBlocoTabelaBeneficioAssociadoAoVinculo').find('thead').empty();
    $('#primeiroBlocoTabelaBeneficioAssociadoAoVinculo').find('tbody').empty();

    $('#segundoBlocoTabelaBeneficioAssociadoAoVinculo').find('thead').empty();
    $('#segundoBlocoTabelaBeneficioAssociadoAoVinculo').find('tbody').empty();

    $('#nomeServidor').text('');

        let jsonData = consumidor.executarServico("controleCompensacao/consultarFuncional", params);

        if(jsonData.pessoaFisica == null){
            $('#mensagemPesquisaPessoaFisica').html('O servidor pesquisado não foi encontrado.');
            $('#mensagemPesquisaPessoaFisica').show();
        }else{
            $('#nomeServidor').text(jsonData.pessoaFisica.nomPessoaFisica);
            carregarRelacaoFuncional(jsonData);

                let paramsComprev = {};
                paramsComprev.codIdeCli = jsonData.pessoaFisica.codIdeCli;
                paramsComprev.numCpf = jsonData.pessoaFisica.numCpf;

                $('#btnConsultaApiComprev').show();

                let jsonDataBeneficio = consumidor.executarServico("controleCompensacao/consultarBeneficiosServidorPorCodIdeCli", paramsComprev);
                if(JSON.stringify(jsonDataBeneficio.listaBeneficios) === '[]'){
                    consultarApiComprev(paramsComprev);
                }
        }

    //Codigo do Paulo antigo
// if (resultado.pessoaFisica.listaFuncionais.length > 2){
//     var url = urlDominioBackEnd + urlContextoSigeprev + "/cadastro/multiplosServidores.do?numCpf=" + $('#numCpf').val();
//     url += "&parametrosDaTela={campos:[codIdeCli],callback:processar()}"
//     window.open(url,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
//     let parametros = {};
//     parametros.codIdeCli =  $('#codIdeCli').attr('data-value');
//     jsonData = consumidor.executarServico("controleCompensacao/consultarFuncionalCodIdeCli", parametros);
//     if (jsonData.pessoaFisica != null){
//         $('#nomeServidor').text(jsonData.pessoaFisica.nomPessoaFisica);
//         carregarRelacaoFuncional(jsonData);
//
//         let paramsComprev = {};
//         paramsComprev.codIdeCli = jsonData.pessoaFisica.codIdeCli;
//         paramsComprev.numCpf = jsonData.pessoaFisica.numCpf;
//
//         $('#btnConsultaApiComprev').show();
//
//         let jsonDataBeneficio = consumidor.executarServico("controleCompensacao/consultarBeneficiosServidorPorCodIdeCli", paramsComprev);
//         if(JSON.stringify(jsonDataBeneficio.listaBeneficios) === '[]'){
//             consultarApiComprev(paramsComprev);
//         }
//     }
// }
// else{
//     jsonData = consumidor.executarServico("controleCompensacao/consultarFuncional", params);
// }
}

function carregarRelacaoFuncional(jsonData){

    $('#primeiroBloco').show();
    $('#primeiroBlocoMensagemTabelaFuncional').html('');
    $('#primeiroBlocoMensagemTabelaFuncional').hide();

    if(Object.keys(jsonData.pessoaFisica.listaFuncionais).length === 0){
        $('#primeiroBlocoMensagemTabelaFuncional').html('Não foram encontrados relações funcionais para o servidor consultado.');
        $('#primeiroBlocoMensagemTabelaFuncional').show();
    }else{

        $('#quartoBlocoAcoesGeraisTela').show();

        let cabecalhoDaTabela  = '<th>Entidade</th>';
        cabecalhoDaTabela     += '<th>Mat./RS/RF/RE</th>';
        cabecalhoDaTabela     += '<th>Referência Funcional</th>';
        cabecalhoDaTabela     += '<th>PV</th>';
        cabecalhoDaTabela     += '<th>Cargo</th>';
        cabecalhoDaTabela     += '<th>Status do Vínculo</th>';


        $.each(jsonData.pessoaFisica.listaFuncionais, function(eachIndice, eachFuncional){
            let corpoDaTabela = '';
            corpoDaTabela += '<tr>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.nomEntidade;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.numMatricula;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.codIdeRelFunc;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.numPv;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.nomCargo;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td>';
            corpoDaTabela +=         eachFuncional.desStatusVinculo;
            corpoDaTabela +=      '</td>';
            corpoDaTabela += '</tr>';

            let bloco = 'primeiroBloco';
            if(eachIndice != 0){
                $('#segundoBloco').show();
                bloco = 'segundoBloco';
            }

            $('#'+ bloco + 'TabelaFuncional').find('thead').empty();
            $('#'+ bloco + 'TabelaFuncional').find('thead').append(cabecalhoDaTabela);
            $('#'+ bloco + 'TabelaFuncional').find('tbody').empty();
            $('#'+ bloco + 'TabelaFuncional').find('tbody').append(corpoDaTabela);
            carregarBeneficiosAssociadosAoVinculo(bloco, jsonData.pessoaFisica.codIdeCli, eachFuncional.numSeqFunc, eachFuncional.numMatricula, eachFuncional.codIdeRelFunc, jsonData.pessoaFisica.numCpf);
        });
    }
}


function carregarBeneficiosAssociadosAoVinculo(paramBloco, paramCodIdeCli, paramNumSeqFunc, paramNumMatricula, paramCodIdeRelFunc, paramNumCpf){
    let params = {};
    params.codIdeCli     = paramCodIdeCli;
    params.numMatricula  = paramNumMatricula;
    params.codIdeRelFunc = paramCodIdeRelFunc;
    params.codIns        = getCookieSigeprev('cookieCodIns');

    let ultimoEstiloUtilizado = "";

    let jsonData  = consumidor.executarServico("controleCompensacao/consultarBeneficio", params);
    let jsonData2 = consumidor.executarServico("pensao/consultarBeneficioPensao", params);

    $('#'+ paramBloco + 'MensagemTabelaBeneficioAssociadoAoVinculo').html('');
    $('#'+ paramBloco + 'MensagemTabelaBeneficioAssociadoAoVinculo').hide();


    //if(JSON.stringify(jsonData.listaBeneficios) === '[]'){
    if(JSON.stringify(jsonData.listaBeneficios) === '[]' && JSON.stringify(jsonData2.listaBeneficios) === '[]'){
        $('#'+ paramBloco + 'MensagemTabelaBeneficioAssociadoAoVinculo').html('Não existe benefício originado deste vínculo.');
        $('#'+ paramBloco + 'MensagemTabelaBeneficioAssociadoAoVinculo').show();
    }else{
        $('#'+ paramBloco + 'MensagemCliqueParticipante').show();


        let cabecalhoDaTabela  = '<th></th>';
        cabecalhoDaTabela     += '<th>Benefício</th>';
        cabecalhoDaTabela     += '<th>Tipo Benefício</th>';
        cabecalhoDaTabela     += '<th>Data de Início</th>';
        cabecalhoDaTabela     += '<th>Data de Cessação</th>';
        cabecalhoDaTabela     += '<th>Beneficiário</th>';
        cabecalhoDaTabela     += '<th>Última Modificação</th>';
        cabecalhoDaTabela     += '<th>Participante</th>';
        cabecalhoDaTabela     += '<th>Análise</th>';
        cabecalhoDaTabela     += '<th>Estado Requerimento</th>';

        let corpoDaTabela = '';
        $.each(jsonData.listaBeneficios, function(eachIndice, eachBeneficio){
            let qtdRequerimentos = eachBeneficio.listaRequerimentos.length;
            if(qtdRequerimentos == 0){
                qtdRequerimentos = 1;
            }

            let estiloLinha = 'cel-gray';
            if(eachIndice % 2 != 0){
                estiloLinha =  'cel-gray2';
            }

            let flgRowSpan = true;

            corpoDaTabela += '<tr class="'+ estiloLinha + '">';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         '<input type="radio" id="' + paramBloco + 'RadioBeneficio" name="' + paramBloco + 'RadioBeneficio" value="' + paramCodIdeCli + ';' + paramNumSeqFunc + ';' + paramNumMatricula + ';'+ paramCodIdeRelFunc + ';' + eachBeneficio.numSeqBeneficio + ';' + eachBeneficio.codTipoBeneficio + '">';
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         eachBeneficio.codBeneficio;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         eachBeneficio.desTipoBeneficio;
            corpoDaTabela +=     '</td>';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         eachBeneficio.datIniBen;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         eachBeneficio.datCessacaoComprev;
            corpoDaTabela +=      '</td>';
            corpoDaTabela +=     '<td rowspan="' + qtdRequerimentos + '">';
            corpoDaTabela +=         eachBeneficio.nomPessoaFisica;
            corpoDaTabela +=      '</td>';

            $.each(eachBeneficio.listaRequerimentos, function(eachIndiceRequerimento, eachRequerimento){
                if(!flgRowSpan){
                    corpoDaTabela += '<tr class="'+ estiloLinha + '">';
                }
                corpoDaTabela +=     '<td><a href="javascript:selecionarRequerimento(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(eachBeneficio.numSeqBeneficio) + ',' + retornaValorComAspas(eachRequerimento.numSeqReq) +')">';
                corpoDaTabela +=         eachRequerimento.datUltAtuComprev;
                corpoDaTabela +=      '</a></td>';
                corpoDaTabela +=     '<td><a href="javascript:selecionarRequerimento(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(eachBeneficio.numSeqBeneficio) + ',' + retornaValorComAspas(eachRequerimento.numSeqReq) +')">';

                let arrayCamposCampoParticipante = [];
                arrayCamposCampoParticipante.push(eachRequerimento.desRegimeOrigem, eachRequerimento.desEsferaRegOrigem, eachRequerimento.nomParticipante);
                corpoDaTabela +=         arrayCamposCampoParticipante.filter(Boolean).join(" - ");

                corpoDaTabela +=      '</a></td>';
                corpoDaTabela +=     '<td><a href="javascript:selecionarRequerimento(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(eachBeneficio.numSeqBeneficio) + ',' + retornaValorComAspas(eachRequerimento.numSeqReq) +')">';
                corpoDaTabela +=         eachRequerimento.desAnalise;
                corpoDaTabela +=      '</a></td>';
                corpoDaTabela +=     '<td><a href="javascript:selecionarRequerimento(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(eachBeneficio.numSeqBeneficio) + ',' + retornaValorComAspas(eachRequerimento.numSeqReq) +')">';
                corpoDaTabela +=         eachRequerimento.desEstadoReq;
                corpoDaTabela +=      '</a></td>';
                corpoDaTabela += '</tr>';
                flgRowSpan = false;
            });

            ultimoEstiloUtilizado = estiloLinha;

        });

        /* [INI] VITOR MONTICH - INCLUINDO LISTAGEM DE BENEFÍCIO DE PENSÃO */
        $.each(jsonData2.listaBeneficios, function(indexBeneficio, beneficio) {

            let qtdRequerimentos = beneficio.listaRequerimentos.length;
            let qtdBeneficiarios = beneficio.listaBeneficiarios.length;
            qtdRequerimentos == 0 ? qtdRequerimentos = 1 : qtdRequerimentos = qtdRequerimentos;
            let tamRowspan = qtdRequerimentos * qtdBeneficiarios;
            let flgRowSpan = true;

            ultimoEstiloUtilizado == 'cel-gray' ? estiloLinha =  'cel-gray2' : estiloLinha = 'cel-gray';

            corpoDaTabela +=    '<tr class="'+ estiloLinha + '">';
            corpoDaTabela +=        '<td rowspan="' + tamRowspan + '">';
            corpoDaTabela +=            '<input type="radio" id="' + paramBloco + 'RadioBeneficio" name="' + paramBloco + 'RadioBeneficio" value="' + paramCodIdeCli + ';' + paramNumSeqFunc + ';' + paramNumMatricula + ';'+ paramCodIdeRelFunc + ';' + beneficio.numSeqBeneficio + ';' + beneficio.codTipoBeneficio + ';' + paramNumCpf + '">';
            corpoDaTabela +=        '</td>';
            corpoDaTabela +=        '<td rowspan="' + tamRowspan + '">';
            corpoDaTabela +=            beneficio.codBeneficio
            corpoDaTabela +=        '</td>';
            corpoDaTabela +=        '<td rowspan="' + tamRowspan + '">';
            corpoDaTabela +=            beneficio.desTipoBeneficio
            corpoDaTabela +=        '</td>';
            flgRowSpan = true;

            if(beneficio.listaRequerimentos.length > 0) {
                $.each(beneficio.listaRequerimentos, function(indexRequerimento, requerimento) {

                    $.each(beneficio.listaBeneficiarios, function(indexBeneficiario, beneficiario) {

                        if(!flgRowSpan){
                            corpoDaTabela +=    '<tr class="'+ estiloLinha + '">';
                        }

                        corpoDaTabela +=            '<td>';
                        corpoDaTabela +=                beneficiario.datIniBen;
                        corpoDaTabela +=            '</td>';
                        corpoDaTabela +=            '<td>';
                        corpoDaTabela +=                beneficiario.datFimBen;
                        corpoDaTabela +=            '</td>';
                        corpoDaTabela +=            '<td>';
                        corpoDaTabela +=                beneficiario.nomPessoaFisica;
                        corpoDaTabela +=            '</td>';

                        if(indexBeneficiario == 0) {
                            //alert("Entrou " + indexBeneficiario + " | " + (beneficio.listaRequerimentos.length));
                            corpoDaTabela +=            '<td rowspan="' + qtdBeneficiarios + '">';
                            corpoDaTabela +=                '<a href="javascript:selecionarRequerimentoPensao(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(beneficio.numSeqBeneficio) + ',' + retornaValorComAspas(requerimento.numSeqReq) + ',' + retornaValorComAspas(requerimento.numSeqReqApos) + ',' + retornaValorComAspas(paramNumCpf) +')">';
                            corpoDaTabela +=                    requerimento.datUltAtuComprev;
                            corpoDaTabela +=                '</a">';
                            corpoDaTabela +=            '</td>';
                            corpoDaTabela +=            '<td rowspan="' + qtdBeneficiarios + '">';
                            corpoDaTabela +=                '<a href="javascript:selecionarRequerimentoPensao(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(beneficio.numSeqBeneficio) + ',' + retornaValorComAspas(requerimento.numSeqReq) + ',' + retornaValorComAspas(requerimento.numSeqReqApos) + ',' + retornaValorComAspas(paramNumCpf) +')">';

                            let arrayCamposCampoParticipante = [];
                            arrayCamposCampoParticipante.push(requerimento.desRegimeOrigem, requerimento.desEsferaRegOrigem, requerimento.nomParticipante);

                            corpoDaTabela +=            arrayCamposCampoParticipante.filter(Boolean).join(" - ");
                            corpoDaTabela +=                '</a">';
                            corpoDaTabela +=            '</td>';
                            corpoDaTabela +=            '<td rowspan="' + qtdBeneficiarios + '">';
                            corpoDaTabela +=                '<a href="javascript:selecionarRequerimentoPensao(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(beneficio.numSeqBeneficio) + ',' + retornaValorComAspas(requerimento.numSeqReq) + ',' + retornaValorComAspas(requerimento.numSeqReqApos) + ',' + retornaValorComAspas(paramNumCpf) +')">';
                            corpoDaTabela +=                    requerimento.desAnalise;
                            corpoDaTabela +=                '</a">';
                            corpoDaTabela +=            '</td>';
                            corpoDaTabela +=            '<td rowspan="' + qtdBeneficiarios + '">';
                            corpoDaTabela +=                '<a href="javascript:selecionarRequerimentoPensao(' + retornaValorComAspas(paramCodIdeCli) + ',' + retornaValorComAspas(paramNumSeqFunc) + ',' + retornaValorComAspas(paramNumMatricula) +',' + retornaValorComAspas(paramCodIdeRelFunc) + ','+ retornaValorComAspas(beneficio.numSeqBeneficio) + ',' + retornaValorComAspas(requerimento.numSeqReq) + ',' + retornaValorComAspas(requerimento.numSeqReqApos) + ',' + retornaValorComAspas(paramNumCpf) +')">';
                            corpoDaTabela +=                    requerimento.desEstadoReq;
                            corpoDaTabela +=                '</a">';
                            corpoDaTabela +=            '</td>';
                            corpoDaTabela +=        '</tr>';
                        }
                        flgRowSpan = false;

                    });
                });
            } else {
                $.each(beneficio.listaBeneficiarios, function(indexBeneficiario, beneficiario) {
                    if(!flgRowSpan){
                        corpoDaTabela +=    '<tr class="'+ estiloLinha + '">';
                    }

                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                beneficiario.datIniBen;
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                beneficiario.datFimBen;
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                beneficiario.nomPessoaFisica;
                    corpoDaTabela +=            '</td>';

                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                '&nbsp;';
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                '&nbsp;';
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                '&nbsp;';
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=            '<td>';
                    corpoDaTabela +=                '&nbsp;';
                    corpoDaTabela +=            '</td>';
                    corpoDaTabela +=        '</tr>';
                    flgRowSpan = false;
                });
            }
        });
        /* [FIM] VITOR MONTICH - INCLUINDO LISTAGEM DE BENEFÍCIO DE PENSÃO */

        $('#'+ paramBloco + 'TabelaBeneficioAssociadoAoVinculo').find('thead').empty();
        $('#'+ paramBloco + 'TabelaBeneficioAssociadoAoVinculo').find('thead').append(cabecalhoDaTabela);
        $('#'+ paramBloco + 'TabelaBeneficioAssociadoAoVinculo').find('tbody').empty();
        $('#'+ paramBloco + 'TabelaBeneficioAssociadoAoVinculo').find('tbody').append(corpoDaTabela);

        $('#'+ paramBloco + 'BotaoIncluir').show();
    }
}

function retornaValorComAspas(valor){
    return "'" + valor + "'";
}


function limpar(){
    $('#primeiroBloco').hide();
    $('#segundoBloco').hide();
    $('#terceiroBlocoApiComprev').hide();
    $('#quartoBlocoAcoesGeraisTela').hide();
    $('#nomeServidor').text('');
    $('#numCpf').val('');
    $('#numMatricula').val('');
    $('#numPis').val('');
    $('#btnConsultaApiComprev').hide();
}


function incluirNovoRequerimento(paramBloco){
    //if($('#' + paramBloco + 'RadioBeneficio').filter(":checked").val() === undefined){
    if($('input[name=' + paramBloco + 'RadioBeneficio]').filter(":checked").val() === undefined){
        alert('Selecione o benefício que deseja incluir um novo requerimento.');
    }else{
        let valorRadioBeneficio =  $('input[name=' + paramBloco + 'RadioBeneficio]').filter(":checked").val();
        let parametros = valorRadioBeneficio.split(';');

        if(parametros[5] == 'M') {

            let urlParam = PAGINA_REQUERIMENTO_PENSAO;
            urlParam     += "?codIdeCli="        + parametros[0];
            urlParam     += "&numSeqFunc="       + parametros[1];
            urlParam     += "&numMatricula="     + parametros[2];
            urlParam     += "&codIdeRelFunc="    + parametros[3];
            urlParam     += "&numSeqBeneficio="  + parametros[4];
            urlParam     += "&numCpfServidor="   + parametros[6];
            urlParam     += "&numSeqReq=";
            window.location.href = urlParam;

        } else {
            let urlParam = PAGINA_REQUERIMENTO;
            urlParam     += "?codIdeCli="        + parametros[0];
            urlParam     += "&numSeqFunc="       + parametros[1];
            urlParam     += "&numMatricula="     + parametros[2];
            urlParam     += "&codIdeRelFunc="    + parametros[3];
            urlParam     += "&numSeqBeneficio="  + parametros[4];
            urlParam     += "&numSeqReq=";
            window.location.href = urlParam;
        }
    }
}



function selecionarRequerimento(paramCodIdeCli, paramNumSeqFunc, paramNumMatricula, paramCodIdeRelFunc, paramNumSeqBeneficio, paramNumSeqReq){
    let urlParam = PAGINA_REQUERIMENTO;
    urlParam     += "?codIdeCli="        + paramCodIdeCli;
    urlParam     += "&numSeqFunc="      + paramNumSeqFunc;
    urlParam     += "&numMatricula="    + paramNumMatricula;
    urlParam     += "&codIdeRelFunc="   + paramCodIdeRelFunc;
    urlParam     += "&numSeqBeneficio=" + paramNumSeqBeneficio;
    urlParam     += "&numSeqReq="       + paramNumSeqReq;
    window.location.href = urlParam;
}

function selecionarRequerimentoPensao(paramCodIdeCli, paramNumSeqFunc, paramNumMatricula, paramCodIdeRelFunc, paramNumSeqBeneficio, paramNumSeqReq, paramNumSeqReqApos, paramNumCpf) {
    let urlParam = PAGINA_REQUERIMENTO_PENSAO;
    urlParam     += "?codIdeCli="          + paramCodIdeCli;
    urlParam     += "&numSeqFunc="         + paramNumSeqFunc;
    urlParam     += "&numMatricula="       + paramNumMatricula;
    urlParam     += "&codIdeRelFunc="      + paramCodIdeRelFunc;
    urlParam     += "&numSeqBeneficio="    + paramNumSeqBeneficio;
    urlParam     += "&numSeqReq="          + paramNumSeqReq;
    urlParam     += "&numSeqReqApos="      + paramNumSeqReqApos;
    urlParam     += "&numCpfServidor="     + paramNumCpf;
    window.location.href = urlParam;
}

function consultaDetalhadaApiComprev() {
    let params = {};
    params.numCpf = tirarMascaraDeValor($('#numCpf').val());
    params.login = getCookieSigeprev('cookieLogin');
    let jsonData = consumidor.executarServico("requerimentoCompensacao/consultaRequerimentos", params);
    alert(jsonData.mensagemFinal);
    consultarApiComprev();
}

function consultarApiComprev(){
    let paramsCpf = {};
    paramsCpf.numCpf = tirarMascaraDeValor($('#numCpf').val());
    $('#terceiroBlocoApiComprev').empty();
    $('#terceiroBlocoApiComprev').show();

    let jsonData = consumidor.executarServico("controleCompensacao/consultarApiComprev", paramsCpf);

    let listaApiComprev = jsonData.listaApiComprev;

    if(jsonData.listaApiComprev == ""){
        alert("Consulta sem Resultados. ");
        location.reload();
    }

    let titulo = '<h3><i class="fa fa-list-alt" aria-hidden="true"></i> Resultado da Consulta pelo CPF no Comprev (Dataprev):</h3>';
    $('#terceiroBlocoApiComprev').append(titulo);
    $.each(listaApiComprev, function(eachIndice, eachApi){

        let cabecalhoDaTabela  = '<div class="table-responsive">';
        cabecalhoDaTabela     += '<table class="tabelaPaddingMenor comprev" id="tabelaApiComprev'+ eachIndice + '">';
        cabecalhoDaTabela     += '<thead>';
        cabecalhoDaTabela     +=     '<th>Data Consulta</th>';
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


    });
}

function abrirTelaConsultaDetalhadaConsultaRequerimento(){
    window.open(PAGINA_CONSULTA_DETALHADA,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function abrirTelaConsultaDetalhada(){
    window.open(PAGINA_CONSULTA_DETALHADA,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}