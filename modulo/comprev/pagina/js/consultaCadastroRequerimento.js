const PAGINA_CADASTRO_REQUERIMENTO  = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/cadastroRequerimento.html';


//inicialização
$(document).ready(function(){
    init();
});

function limparTela(){
    $('#divConteudo').empty();
    $('#btnIncluir').hide();
    $('#btnIncluirRequerimento').hide();
    $('#btnCriarFuncionalBeneficioRequerimento').hide();
    $('#btnCriarRequerimentoParaOutroVinculo').hide();
    $('#btnAlterarEntidade').hide();
    $('#divAlteracaoEntidade').hide();

    $('#hiddenCodIdeCli').val('');
}

function init() {
    with (document.forms[0]) {
        setaMascara(numCpf, MASK_CPF);

        let paramsToken = {};
        paramsToken.token = getCookieSigeprev("tokenSigeprev");
        let jsonDataToken = consumidor.executarServico("token/verificarToken", paramsToken);
        setCookieSigeprev('cookieContexto',jsonDataToken.ambiente, 1);
        setCookieSigeprev('cookieCodIns',jsonDataToken.codIns, 1);
        setCookieSigeprev('cookieLogin',jsonDataToken.login, 1);
        setCookieSigeprev('cookieNumCpfLogin',jsonDataToken.numCpfLogin, 1);

        limparTela();


        if(urlParametros.get("numCpf") !== null){
            if($('#numCpf').val() === ''){
                $('#numCpf').val(urlParametros.get("numCpf"));
            }
            consultarCpf();
        }

    }
}

function consultarCpf(){
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
    params.codIns = getCookieSigeprev('cookieCodIns');
    params.login = getCookieSigeprev('cookieLogin');
    let jsonData = consumidor.executarServico("cadastroRequerimento/consultarRequerimentoServidor", params);

    if(jsonData.codigoResultado !== 0){
        alert(jsonData.mensagemResultado);
        return;
    }

    limparTela();

    if(jsonData.pessoaFisica === null){
        let conteudo = '';
        conteudo += '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
        conteudo += '<p class="text-msg">Não existe cadastro associado a este CPF. Deseja cadastrar uma pessoa com requerimento de comprev?</p>';
        conteudo += ' <div class="botao-rodape centralizar">'
        conteudo += '<input type="button" id="btnSim"  value="Sim" class="btn butverde"     onclick="acessarCadastroRequerimentoPorNumCpf()">';
        conteudo += '<input type="button" id="btnNao"  value="Não" class="btn butvermelho"  onclick="limparTela()">';
        conteudo += ' </div>';

        $('#divConteudo').append(conteudo);

    }else{

        if(isPossuiDuasRelacoesFuncionaisSendoQueUmaContemContemBeneficioEOutraNao(jsonData)){

            carregarBeneficioEFuncionalApenasIsolados(jsonData);



        }else{
            if(isExisteRequerimento(jsonData) || isExisteBeneficio(jsonData)){
                carregarBeneficiosComRequerimentos(jsonData);
            }else if(isExisteFuncional(jsonData)){
                carregarFuncionais(jsonData);
            }else if(isExistePessoaFisica(jsonData)){
                carregarPessoaFisica(jsonData);
            }
        }

    }
}




function carregarBeneficioEFuncionalApenasIsolados(jsonData){

    let conteudoBeneficioRequerimento  = '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
    conteudoBeneficioRequerimento += '<span class="negrito destaque-warning">Clique sobre o Participante relacionado ao requerimento que deseja consultar ou selecione um benefício para incluir um novo requerimento (Novo Participante).</span>';

    $.each(jsonData.pessoaFisica.listaFuncionais, function(eachIndice, eachFuncional){

        if(JSON.stringify(eachFuncional.listaBeneficios) !== '[]'){
            conteudoBeneficioRequerimento     += '<div class="table-responsive">';
            conteudoBeneficioRequerimento     +=     '<table class="tabelaPaddingMenor">';
            conteudoBeneficioRequerimento     +=         '<thead>';
            conteudoBeneficioRequerimento     +=             '<th></th>';
            conteudoBeneficioRequerimento     +=             '<th>Benefício</th>';
            conteudoBeneficioRequerimento     +=             '<th>Tipo Benefício</th>';
            conteudoBeneficioRequerimento     +=             '<th>Entidade</th>';
            conteudoBeneficioRequerimento     +=             '<th>Data de Início</th>';
            conteudoBeneficioRequerimento     +=             '<th>Data de Cessação</th>';
            conteudoBeneficioRequerimento     +=             '<th>Beneficiário</th>';
            conteudoBeneficioRequerimento     +=             '<th>Última Modificação</th>';
            conteudoBeneficioRequerimento     +=             '<th>Participante</th>';
            conteudoBeneficioRequerimento     +=             '<th>Status Análise</th>';
            conteudoBeneficioRequerimento     +=             '<th>Estado Processo de Compensação</th>';
            conteudoBeneficioRequerimento     +=         '</thead>';
            conteudoBeneficioRequerimento     +=         '<tbody>';

            $.each(eachFuncional.listaBeneficios, function(eachBeneficio, eachBeneficio){
                let qtdRequerimentos = eachBeneficio.listaRequerimentos.length;

                conteudoBeneficioRequerimento += '<tr>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">';
                conteudoBeneficioRequerimento +=         '<input type="radio" id="numSeqBeneficio" name="numSeqBeneficio" value="' + eachBeneficio.numSeqBeneficio+'" onclick="desselecionarOutrosRadios(this);">';
                conteudoBeneficioRequerimento +=         '<input type="hidden" id="hiddenNumSeqBeneficioPodeAcessarIncluirRequerimento_' + eachBeneficio.numSeqBeneficio + '" value="' + eachFuncional.podeAcessarPorEntidadePerfil + '">';

                conteudoBeneficioRequerimento +=     '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.codBeneficio            + '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.desTipoBeneficio        + '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.nomEntidade             + '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.beneficiario.datIniBen  + '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.beneficiario.datFimBen  + '</td>';
                conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + jsonData.pessoaFisica.nomPessoaFisica + '</td>';


                $.each(eachBeneficio.listaRequerimentos, function(eachRequerimento, eachRequerimento){
                    conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachRequerimento.datUltAtuComprev)      + '</td>';
                    conteudoBeneficioRequerimento +=    '<td>';

                    if(eachRequerimento.participante !== null){
                        let arrayCamposCampoParticipante = [];
                        arrayCamposCampoParticipante.push(eachRequerimento.desRegimeOrigem,
                            eachRequerimento.desEsferaRegOrigem,
                            eachRequerimento.participante.nomParticipante);

                        conteudoBeneficioRequerimento +=       obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, arrayCamposCampoParticipante.filter(Boolean).join(" - "));
                    }else{
                        conteudoBeneficioRequerimento +=     obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachRequerimento.desRegimeOrigem);
                    }

                    conteudoBeneficioRequerimento +=   ' </td>';
                    conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachRequerimento.desAnalise) + '</td>';
                    conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachRequerimento.desEstadoReq) + '</td>';
                    conteudoBeneficioRequerimento += '</tr>';

                });
            });

            conteudoBeneficioRequerimento     +=         '<tbody>';
            conteudoBeneficioRequerimento     +=     '</table>';
            conteudoBeneficioRequerimento     += '</div>';

            conteudoBeneficioRequerimento += '<div class="botao-rodape centralizar">';
            conteudoBeneficioRequerimento += '<input type="button" id="btnIncluir"             value="Incluir"               class="btn butverde"         onclick="acessarCadastroRequerimentoPorBeneficioSelecionado()">';
            conteudoBeneficioRequerimento += '</div>';

            $('#divConteudo').append(conteudoBeneficioRequerimento);


        }else{ //caso onde contem funcional mas nao contem beneficio.


            let conteudo      = '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
            conteudo     += '<div class="table-responsive">';
            conteudo     +=     '<table class="tabelaPaddingMenor">';
            conteudo     +=         '<thead>';
            conteudo     +=             '<th></th>';
            conteudo     +=             '<th>CPF</th>';
            conteudo     +=             '<th>NOME</th>';
            conteudo     +=             '<th>DATA NASCIMENTO</th>';
            conteudo     +=             '<th>SEXO</th>';
            conteudo     +=             '<th>RF</th>';
            conteudo     +=             '<th>MATRÍCULA</th>';
            conteudo     +=             '<th>ENTIDADE</th>';
            conteudo     +=             '<th>CARGO</th>';
            conteudo     +=         '</thead>';
            conteudo     +=         '<tbody>';
            conteudo +=             '<tr>';
            conteudo +=                 '<td>';
            conteudo +=                     '<input type="hidden" id="hiddenNumSeqFuncPodeAcessarIncluirRequerimento_' + eachFuncional.numSeqFunc + '" value="' + eachFuncional.podeAcessarPorEntidadePerfil + '">';
            conteudo +=                     '<input type="radio"  id="numSeqFunc" name="numSeqFunc" value="' + eachFuncional.numSeqFunc + '" onclick="desselecionarOutrosRadios(this)">';
            conteudo +=                 '</td>';
            conteudo +=                 '<td>' + jsonData.pessoaFisica.numCpf          + '</td>';
            conteudo +=                 '<td>' + jsonData.pessoaFisica.nomPessoaFisica + '</td>';
            conteudo +=                 '<td>' + jsonData.pessoaFisica.datNasc         + '</td>';
            conteudo +=                 '<td>' + jsonData.pessoaFisica.desSexo         + '</td>';
            conteudo +=                 '<td>' + eachFuncional.codIdeRelFunc           + '</td>';
            conteudo +=                 '<td>' + eachFuncional.numMatricula            + '</td>';
            conteudo +=                 '<td>' + eachFuncional.nomEntidade             + '</td>';
            conteudo +=                 '<td>' + eachFuncional.nomCargo                + '</td>';
            conteudo +=             '</tr>';
            conteudo     +=         '<tbody>';
            conteudo     +=     '</table>';
            conteudo     += '</div>';

            conteudo += '<div class="botao-rodape centralizar">';
            conteudo += '<input type="button" id="btnIncluirRequerimento" value="Incluir Requerimento"  class="btn butazul"          onclick="acessarCadastroRequerimentoPorFuncionalSelecionado()">';
            conteudo += '<input type="button" id="btnAlterarEntidade"     value="Alterar Entidade"      class="btn butGenericoVerde" onclick="mostrarBlocoAlteracaoEntidade()">';
            conteudo += '</div>';


            $('#divConteudo').append(conteudo);

        }




    });


}


function isPossuiDuasRelacoesFuncionaisSendoQueUmaContemContemBeneficioEOutraNao(jsonData){
    let isPossuiDuasRelacoesFuncionaisSendoQueUmaContemContemBeneficioEOutraNao = false;
    if(jsonData.pessoaFisica !== null){
        if(JSON.stringify(jsonData.pessoaFisica.listaFuncionais) !== '[]'){

           if(jsonData.pessoaFisica.listaFuncionais.length === 2){

               $.each(jsonData.pessoaFisica.listaFuncionais, function(indexFuncional, eachFuncional){
                   if(JSON.stringify(eachFuncional.listaBeneficios) === '[]'){
                       isPossuiDuasRelacoesFuncionaisSendoQueUmaContemContemBeneficioEOutraNao = true;
                   }
               });
           }

        }
    }
    return isPossuiDuasRelacoesFuncionaisSendoQueUmaContemContemBeneficioEOutraNao;

}

function mostrarBlocoAlteracaoEntidade(){
    let params = {}
    params.codIns = getCookieSigeprev('cookieCodIns');
    params.login  = getCookieSigeprev('cookieLogin');
    consumidor.setComboNovo('codEntidade', "cadastroRequerimento/consultarTodasEntidades", params)
    $('#divAlteracaoEntidade').show();
}

function gravarAlteracaoEntidade(){
    if($('input[name=numSeqFunc]:checked').val() === undefined){
        alert('Selecione a relação funcional que deseja alterar a entidade.');
        return;
    }

    if($('#codEntidade').val() === ''){
        alert('Selecione o campo Entidade');
        return;
    }

    let paramsFuncional = {};
    paramsFuncional.numSeqFunc  = $('input[name=numSeqFunc]:checked').val();
    paramsFuncional.codEntidade = $('#codEntidade').val();
    consumidor.executarServico("cadastroRequerimento/gravarAlteracaoEntidade", paramsFuncional);
    alert('Entidade da Relação Funcional alterada com sucesso!');
    consultarCpf();
}



/** Primeira Condição */
function isExisteRequerimento(jsonData){
    let isExisteRequerimento = false;
    if(jsonData.pessoaFisica !== null){
        if(JSON.stringify(jsonData.pessoaFisica.listaFuncionais) !== '[]'){
            $.each(jsonData.pessoaFisica.listaFuncionais, function(indexFuncional, eachFuncional){
                if(JSON.stringify(eachFuncional.listaBeneficios) !== '[]'){
                    $.each(eachFuncional.listaBeneficios, function(indexBeneficio, eachBeneficio){
                        if(JSON.stringify(eachBeneficio.listaRequerimentos) !== '[]') {
                            isExisteRequerimento = true;
                        }
                    });
                }
            });
        }
    }
    return isExisteRequerimento;
}
/** Segunda Condição */
function isExisteBeneficio(jsonData){
    let isExisteBeneficio = false;
    if(jsonData.pessoaFisica !== null){
        if(JSON.stringify(jsonData.pessoaFisica.listaFuncionais) !== '[]'){
            $.each(jsonData.pessoaFisica.listaFuncionais, function(eachIndice, eachFuncional){
                if(JSON.stringify(eachFuncional.listaBeneficios) !== '[]'){
                    isExisteBeneficio = true;
                }
            });
        }
    }
    return isExisteBeneficio;
}
/** Terceira Condição */
function isExisteFuncional(jsonData){
    let isExisteFuncional = false;
    if(jsonData.pessoaFisica !== null){
        if(JSON.stringify(jsonData.pessoaFisica.listaFuncionais) !== '[]'){
            isExisteFuncional = true;
        }
    }
    return isExisteFuncional;
}
/** Quarta Condição */
function isExistePessoaFisica(jsonData){
    let isExistePessoaFisica = false;
    if(jsonData.pessoaFisica !== null){
        isExistePessoaFisica = true;
    }
    return isExistePessoaFisica;
}

function carregarBeneficiosComRequerimentos(jsonData){
    let cabecalho = '';
    cabecalho  = '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
    cabecalho += '<span class="negrito destaque-warning">Clique sobre o Participante relacionado ao requerimento que deseja consultar ou selecione um benefício para incluir um novo requerimento (Novo Participante).</span>';


    $.each(jsonData.pessoaFisica.listaFuncionais, function(eachIndice, eachFuncional){
        let conteudoBeneficioRequerimento = '';
        conteudoBeneficioRequerimento     += '<div class="table-responsive">';
        conteudoBeneficioRequerimento     +=     '<table class="tabelaPaddingMenor">';
        conteudoBeneficioRequerimento     +=         '<thead>';
        conteudoBeneficioRequerimento     +=             '<th></th>';
        conteudoBeneficioRequerimento     +=             '<th>Benefício</th>';
        conteudoBeneficioRequerimento     +=             '<th>Tipo Benefício</th>';
        conteudoBeneficioRequerimento     +=             '<th>Entidade</th>';
        conteudoBeneficioRequerimento     +=             '<th>Data de Início</th>';
        conteudoBeneficioRequerimento     +=             '<th>Data de Cessação</th>';
        conteudoBeneficioRequerimento     +=             '<th>Beneficiário</th>';
        conteudoBeneficioRequerimento     +=             '<th>Última Modificação</th>';
        conteudoBeneficioRequerimento     +=             '<th>Participante</th>';
        conteudoBeneficioRequerimento     +=             '<th>Status Análise</th>';
        conteudoBeneficioRequerimento     +=             '<th>Estado Processo de Compensação</th>';
        conteudoBeneficioRequerimento     +=         '</thead>';
        conteudoBeneficioRequerimento     +=         '<tbody>';

        $.each(eachFuncional.listaBeneficios, function(eachBeneficio, eachBeneficio){
            let qtdRequerimentos = eachBeneficio.listaRequerimentos.length;

            conteudoBeneficioRequerimento += '<tr>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">';
            if (eachBeneficio.codTipoBeneficio != "M"){
                conteudoBeneficioRequerimento +=         '<input type="radio" id="numSeqBeneficio" name="numSeqBeneficio" value="' + eachBeneficio.numSeqBeneficio+'">';
                conteudoBeneficioRequerimento +=         '<input type="hidden" id="hiddenNumSeqBeneficioPodeAcessarIncluirRequerimento_' + eachBeneficio.numSeqBeneficio + '" value="' + eachFuncional.podeAcessarPorEntidadePerfil + '">';
            }
            conteudoBeneficioRequerimento +=     '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.codBeneficio            + '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.desTipoBeneficio        + '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.nomEntidade             + '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.beneficiario.datIniBen  + '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + eachBeneficio.beneficiario.datFimBen  + '</td>';
            conteudoBeneficioRequerimento +=     '<td rowspan="' + qtdRequerimentos + '">' + jsonData.pessoaFisica.nomPessoaFisica + '</td>';


            $.each(eachBeneficio.listaRequerimentos, function(eachRequerimento, eachRequerimento){
                conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachBeneficio.codTipoBeneficio, eachRequerimento.datUltAtuComprev)      + '</td>';
                conteudoBeneficioRequerimento +=    '<td>';

                if(eachRequerimento.participante !== null){
                    let arrayCamposCampoParticipante = [];
                    arrayCamposCampoParticipante.push(eachRequerimento.desRegimeOrigem,
                        eachRequerimento.desEsferaRegOrigem,
                        eachRequerimento.participante.nomParticipante);

                    conteudoBeneficioRequerimento +=       obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev,eachBeneficio.codTipoBeneficio, arrayCamposCampoParticipante.filter(Boolean).join(" - "));
                }else{
                    conteudoBeneficioRequerimento +=     obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachBeneficio.codTipoBeneficio,eachRequerimento.desRegimeOrigem);
                }

                conteudoBeneficioRequerimento +=   ' </td>';
                conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev, eachBeneficio.codTipoBeneficio, eachRequerimento.desAnalise) + '</td>';
                conteudoBeneficioRequerimento +=    '<td>' + obterDescricaoLink(eachRequerimento.numSeqReq, eachRequerimento.podeAcessarPorEntidadePerfil, eachRequerimento.flgRequerimentoComprev,eachBeneficio.codTipoBeneficio, eachRequerimento.desEstadoReq) + '</td>';
                conteudoBeneficioRequerimento += '</tr>';

            });
        });

        conteudoBeneficioRequerimento     +=         '<tbody>';
        conteudoBeneficioRequerimento     +=     '</table>';
        conteudoBeneficioRequerimento     += '</div>';
        $('#divConteudo').append(cabecalho + conteudoBeneficioRequerimento);
        cabecalho = '';
        $('#btnIncluir').show();

        if(jsonData.pessoaFisica.listaFuncionais.length === 1 && eachFuncional.listaBeneficios.length === 1){
            $("#numSeqBeneficio").prop("checked", true);
        }

    });

    if(jsonData.pessoaFisica.listaFuncionais.length == 1){
        $('#btnCriarRequerimentoParaOutroVinculo').show();
    }
}

function obterDescricaoLink(paramNumSeqReq, paramPodeAcessarPorEntidadePerfil, paramFlgRequerimentoComprev, paramCodTipoBeneficio, descricaoValor){

    if(paramPodeAcessarPorEntidadePerfil && paramCodTipoBeneficio != "M" &&
        (paramFlgRequerimentoComprev == 'I' || paramFlgRequerimentoComprev == 'R')){
        return '<a href="javascript:acessarCadastroRequerimentoPorRequerimento(' + paramNumSeqReq + ');">' + descricaoValor + '</a>';
    }else{
        return descricaoValor;
    }

}

function carregarFuncionais(jsonData){
    let conteudo      = '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
    conteudo     += '<div class="table-responsive">';
    conteudo     +=     '<table class="tabelaPaddingMenor">';
    conteudo     +=         '<thead>';
    conteudo     +=             '<th></th>';
    conteudo     +=             '<th>CPF</th>';
    conteudo     +=             '<th>NOME</th>';
    conteudo     +=             '<th>DATA NASCIMENTO</th>';
    conteudo     +=             '<th>SEXO</th>';
    conteudo     +=             '<th>RF</th>';
    conteudo     +=             '<th>MATRÍCULA</th>';
    conteudo     +=             '<th>ENTIDADE</th>';
    conteudo     +=             '<th>CARGO</th>';
    conteudo     +=         '</thead>';
    conteudo     +=         '<tbody>';
    $.each(jsonData.pessoaFisica.listaFuncionais, function(eachIndice, eachFuncional){
        conteudo +=             '<tr>';
        conteudo +=                 '<td>';
        conteudo +=                     '<input type="hidden" id="hiddenNumSeqFuncPodeAcessarIncluirRequerimento_' + eachFuncional.numSeqFunc + '" value="' + eachFuncional.podeAcessarPorEntidadePerfil + '">';
        conteudo +=                     '<input type="radio"  id="numSeqFunc" name="numSeqFunc" value="' + eachFuncional.numSeqFunc + '">';
        conteudo +=                 '</td>';
        conteudo +=                 '<td>' + jsonData.pessoaFisica.numCpf          + '</td>';
        conteudo +=                 '<td>' + jsonData.pessoaFisica.nomPessoaFisica + '</td>';
        conteudo +=                 '<td>' + jsonData.pessoaFisica.datNasc         + '</td>';
        conteudo +=                 '<td>' + jsonData.pessoaFisica.desSexo         + '</td>';
        conteudo +=                 '<td>' + eachFuncional.codIdeRelFunc           + '</td>';
        conteudo +=                 '<td>' + eachFuncional.numMatricula            + '</td>';
        conteudo +=                 '<td>' + eachFuncional.nomEntidade             + '</td>';
        conteudo +=                 '<td>' + eachFuncional.nomCargo                + '</td>';
        conteudo +=             '</tr>';
    });
    conteudo     +=         '<tbody>';
    conteudo     +=     '</table>';
    conteudo     += '</div>';


    $('#divConteudo').append(conteudo);
    $('#btnIncluirRequerimento').show();
    $('#btnAlterarEntidade').show();

    if(jsonData.pessoaFisica.listaFuncionais.length === 1){
        $("#numSeqFunc").prop("checked", true);
        $('#btnCriarRequerimentoParaOutroVinculo').show();
    }
}


function carregarPessoaFisica(jsonData){
    $('#divConteudo').empty();
    let conteudo = '';
    conteudo += '<h2><i class="fa fa-list-alt" aria-hidden="true" ></i> Resultado</h2>';
    conteudo += '<p class="text-msg">Nome do Servidor: ' + jsonData.pessoaFisica.nomPessoaFisica +'</p>';
    conteudo += '<p class="text-msg">Data Nascimento: '  + jsonData.pessoaFisica.datNasc +'</p>';
    conteudo += '<p class="text-msg">Sexo: '             + jsonData.pessoaFisica.desSexo +'</p>';
    $('#divConteudo').append(conteudo);
    $('#btnCriarFuncionalBeneficioRequerimento').show();

    $('#hiddenCodIdeCli').val(jsonData.pessoaFisica.codIdeCli);
}


function acessarCadastroRequerimentoPorRequerimento(paramNumSeqReq){
    window.location.href = PAGINA_CADASTRO_REQUERIMENTO + "?numSeqReq="  + paramNumSeqReq;
}


function acessarCadastroRequerimentoPorBeneficioSelecionado(){
    if($('input[name=numSeqBeneficio]:checked').val() === undefined){
        alert('Selecione o benefício que deseja cadastrar um novo requerimento.');
    }else{

        let numSeqBeneficio = $('input[name=numSeqBeneficio]:checked').val();
        if($('#hiddenNumSeqBeneficioPodeAcessarIncluirRequerimento_' + numSeqBeneficio).val() === 'false'){
            alert('Você não tem permissão para incluir requerimento para servidores dessa entidade.');
            return;
        }
        window.location.href =  PAGINA_CADASTRO_REQUERIMENTO + "?numSeqBeneficio="  + $('input[name=numSeqBeneficio]:checked').val();
    }
}

function acessarCadastroRequerimentoPorFuncionalSelecionado(){
    if($('input[name=numSeqFunc]:checked').val() === undefined){
        alert('Selecione a relação funcional que deseja incluir um requerimento.');
    }else{
        let numSeqFuncSelecionado = $('input[name=numSeqFunc]:checked').val();
        if($('#hiddenNumSeqFuncPodeAcessarIncluirRequerimento_' + numSeqFuncSelecionado).val() === 'false'){
            alert('Você não tem permissão para incluir requerimento para servidores dessa entidade.');
            return;
        }
        window.location.href = PAGINA_CADASTRO_REQUERIMENTO + "?numSeqFunc="  +  numSeqFuncSelecionado;
    }
}


function acessarCadastroRequerimentoPorNumCpf(){
    window.location.href = PAGINA_CADASTRO_REQUERIMENTO + "?numCpf=" + $('#numCpf').val();
}

function criarFuncionalBeneficioRequerimento(){
    window.location.href = PAGINA_CADASTRO_REQUERIMENTO + "?numCpf=" + $('#numCpf').val();
}

function desselecionarOutrosRadios(paramObjeto){
    if(paramObjeto.id === 'numSeqBeneficio'){
        $('#numSeqFunc').prop('checked', false);
    }else if(paramObjeto.id === 'numSeqFunc'){
        $('#numSeqBeneficio').prop('checked', false);
    }
}

function criarRequerimentoParaOutroVinculo(){
    let params = {};
    params.numCpf = $('#numCpf').val();
    let jsonData = consumidor.executarServico("cadastroRequerimento/verificarSePodeCriarRequerimentoOutroVinculo", params);

    if(jsonData.podeCriarRequerimentoOutroVinculo === true){
        window.location.href = PAGINA_CADASTRO_REQUERIMENTO + "?numCpf=" + $('#numCpf').val();
    }else{
        alert('O cargo do vínculo atual não permite acúmulo.');
    }
}