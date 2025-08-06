const PAGINA_HISTORICO_REQUERIMENTO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoRequerimento.html';
const PAGINA_HISTORICO_REQUERIMENTO_INSERIDO_PELA_TELA_CADASTRO  = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoRequerimentoInseridoPelaTelaCadastro.html';
const PAGINA_RETORNO_API_COMPREV = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/retornoApiComprev.html';
const PAGINA_HISTORICO_FINANCEIRO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoFinanceiro.html';

const PAGINA_CONSULTA_REQUERIMENTO = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/consultaRequerimento.html';
const PAGINA_REQUERIMENTO          = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/requerimento.html';
/**___________________________________________________________________________________________________________________________________________________
 |___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_|
 |_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
 |____________________________________________________________ FUNÇÕES DE CARREGAMENTO DA TELA ________________________________________________________|
 |__|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|
 |____|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|*/


function abrirTelaSigeprevHistoricoTempo(){
    //https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/histCarteiraTrab.do?acao=PESQUISAR&modo=JANELA&codIdeCli=9006000547143600&codEntidade=6&numCpf=093.181.248-80&nomPessoaFisica=ANTONIA%20PIMENTEL%20DA%20SILVA&nomEntidade=SECRETARIA%20DE%20SA%DADE&travarTela=true
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/histCarteiraTrab.do";
    url += "?acao=PESQUISAR";
    url += "&modo=JANELA";
    url += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
    url += "&codEntidade=" + $('#hiddenCodEntidade').val();
    url += "&numCpf=" + $('#hiddenNumCpf').val();
    url += "&nomPessoaFisica=" + $('#hiddenNomPessoaFisica').val();
    url += "&nomEntidade=" + $('#hiddenNomEntidade').val();
    url += "&travarTela=true";
    window.open(url, 'historicoTempo');

}

function abrirTelaSigerevServidor(){
    //https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/servidor.do?numCpf=093.181.248-80&acao=PESQUISAR_CPF
    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/servidor.do";
    url += "?acao=PESQUISAR_CPF";
    url += "&numCpf=" +  $('#hiddenNumCpf').val();
    window.open(url, 'beneficiarios');
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

function abrirTelaSigeprevVisualizacaoDocumentosDigitalizados(){
    // https://sigeprev.spprev.sp.gov.br/spprevhom/cadastro/documentoDigital.do?acao=prepararTelaVisualizacao&numeroProtocoloPreenchimentoDadosAutomatico=0080007000


    let url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/documentoDigitalLayoutNovo.do";
    url += "?metodoParaChamarNoServidor=prepararTelaVisualizacao";
    url += "&numeroProtocoloPreenchimentoDadosAutomatico=" + completarProtocoloComZeros($('#hiddenCodBeneficio').val());
    url += "&origem=comprev";
    window.open(url, '_blank');
}

function completarProtocoloComZeros(numeroProtocolo) {

    let numeroProtocoloStr;
    if(numeroProtocolo == null || numeroProtocolo == "") {
        return "";
    }else {

        numeroProtocoloStr = numeroProtocolo;

        if(numeroProtocolo.length < 10) {
            var qtdZerosFaltantes =  10 - numeroProtocolo.length;

            let sbZeros = "";
            for(var contador = 0; contador < qtdZerosFaltantes; contador++) {
                sbZeros+= "0";
            }

            numeroProtocoloStr = sbZeros + numeroProtocolo;

        }
    }

    return numeroProtocoloStr;
}

function habilitarCampoMatriculaOrigem(){
    with (document.forms[0]) {
        $('#botaoMatriculaOrigemEditar').hide();
        $('#botaoMatriculaOrigemSalvar').show();
        numMatriculaOrigemComprev.disabled = false;
    }
}

function gravarCampoMatriculaOrigem(){
    with (document.forms[0]) {
        if(numMatriculaOrigemComprev.value.length < 3){
            alert('- O campo Matrícula Origem deve ter pelo menos 3 caracteres.');
            return;
        }

        if(confirm("Deseja realmente alterar a matrícula?")){
            let params = {};
            params.numSeqFunc = $("#hiddenNumSeqFunc").val();
            params.numMatriculaOrigemComprev = $("#numMatriculaOrigemComprev").val();
            params.numMatricula = $("#hiddenNumMatricula").val();
            params.login  = getCookieSigeprev('cookieLogin');
            let jsonRetorno = consumidor.executarServico("controleCompensacao/gravarMatriculaOrigem", params);

            if(jsonRetorno.codApiRetorno == 0){
                alert('Matrícula gravada com sucesso');
                $('#botaoMatriculaOrigemEditar').show();
                $('#botaoMatriculaOrigemSalvar').hide();
                numMatriculaOrigemComprev.disabled = true;
            }
            else{
                alert(jsonRetorno.msgApiRetorno);
            }
        }
    }
}

/*function salvarMatriculaOrigem(){
    var frm = document.forms[0];

    if(frm.numMatriculaOrigem.value.length < 3){
        alertNew('- O campo Matrícula Origem deve ter pelo menos 3 caracteres.');
        return;
    }

    alertNew('Deseja realmente alterar a matrícula?');

    $.ajax({
        url:location.href.split("?", 1),
        data:{ acao:"acaoAjaxSalvarMatriculaOrigem",
            numMatriculaOrigem :frm.numMatriculaOrigem.value,
            codIns             :frm.codIns.value,
            codIdeCli          :frm.codIdeCli.value,
            codEntidade        :frm.codEntidade.value,
            codCargo           :frm.codCargo.value,
            numMatricula       :frm.numMatricula.value,
            codIdeRelFunc      :frm.codIdeRelFunc.value,
            tipoMatriculaSaa   :frm.tipoMatriculaSaa.value,
            codBeneficio       :frm.codBeneficio.value
        },
        dataType:"JSON",
        async: false,
        error: function(XMLHttpRequest){
            alertNew(XMLHttpRequest.responseText);
        },
        success: function(){
            alertNew('Matrícula gravada com sucesso');
            $('#botaoMatriculaOrigemEditar').show();
            $('#botaoMatriculaOrigemSalvar').hide();
            frm.numMatriculaOrigem.disabled = true;
        }
    });
}

*/

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


    if($('#datIngServPublico').val() == null){
        $('#datIngServPublico').val() = "";
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

    executarRegrasDoCampoHouveLicencaSemVencimentosAposEssePeriodo(); // essa funcao está no arquivo registrosLSV.js.

    //]executarRegraCamposObrigatorios();


}





//Primerio é a regra de quais sao os campos que deverão ser exibidos na tela.
//Segundo é a regra de quais sao os campos que ficarao editaveis ou nao.
//Terceiro é a regra de quais campos são obrigatórios ou nao.
//Criar mecaniscmo caso eu queira ignorar algum campo para determinado cenario.

/*

nome do campo   numcpf
tipo do campo   text
tipo de valor   cpf
tamanho do campo maxlenght   20
tamanho do campo minimo  x


isVisivel    https://stackoverflow.com/questions/2928688/how-to-hide-elements-without-having-them-take-space-on-the-page
isEditavel
isObrigatorio



criar mecanismo pra verificar se realmente deve fazer a busca no servico novamente
se teve alguma mudanca q interfere em mudanca de campo.
*/


function executarRegraCamposObrigatorios(){
    let arrayIdCamposObrigatorios =[];

    arrayIdCamposObrigatorios.push('NumRg');
    arrayIdCamposObrigatorios.push('NumCnpj');
    arrayIdCamposObrigatorios.push('FlgLicenca');

    arrayIdCamposObrigatorios.push('CodTipoDocCompensacao');
    arrayIdCamposObrigatorios.push('CodTipoMatrComprev');
    arrayIdCamposObrigatorios.push('CodSexo');

    arrayIdCamposObrigatorios.push('CodTipoBeneficioComprev');
    arrayIdCamposObrigatorios.push('ValBeneficioComprev');

    arrayIdCamposObrigatorios.push('FlgFiscalizacaoTcComprev');

    if($('#flgFiscalizacaoTcComprev').val() === 'S'){
        arrayIdCamposObrigatorios.push('NumProcessoTcComprev');
    }

    arrayIdCamposObrigatorios.push('DatIniBenComprev');
    arrayIdCamposObrigatorios.push('QtdTmpLiqDiaTotal');


    arrayIdCamposObrigatorios.push('CodRegimeOrigem');
    arrayIdCamposObrigatorios.push('NumSeqParticipante');

    if ($('#rgpsDatIni').val() !== '') {
        arrayIdCamposObrigatorios.push('DatIngRegOrig');
        arrayIdCamposObrigatorios.push('DatDesvRegOrig');
        arrayIdCamposObrigatorios.push('NumTempContribRegOrig');

    }



    //Bloco PERÍODOS DE TEMPO DE SERVIÇO/CONTRIBUIÇÃO DO REGIME DE ORIGEM - INSS

    //1 - RGPS
    arrayIdCamposObrigatorios.push('RgpsDatIni');
    arrayIdCamposObrigatorios.push('RgpsDatFim');
    arrayIdCamposObrigatorios.push('RgpsNomEmpresa');
    arrayIdCamposObrigatorios.push('RgpsTempoConsiderado');
    arrayIdCamposObrigatorios.push('RgpsQtdTmpLiqAno');
    arrayIdCamposObrigatorios.push('RgpsQtdTmpLiqMes');
    arrayIdCamposObrigatorios.push('RgpsQtdTmpLiqDia');

    //2 - RRPPS
    arrayIdCamposObrigatorios.push('RppsDatIni');
    arrayIdCamposObrigatorios.push('RppsDatFim');
    arrayIdCamposObrigatorios.push('RppsQtdDescontos');
    arrayIdCamposObrigatorios.push('RppsTempoConsiderado');
    arrayIdCamposObrigatorios.push('RppsProtocoloCertidao');



    //Esconder todos os asteriscos da tela primeiro.
    $('span[id^=asterisco]').each(function(eachIndice, eachSpanAsterisco) {
        $('#'+eachSpanAsterisco.id).hide();
    });

    arrayIdCamposObrigatorios.forEach(function(idCampo){ //depois fazer regra pra pegar primeira letra minuscula
        $('#asterisco'+ idCampo).show();
    });
}

function executarRegraCamposDesabilitados(){
    let arrayIdCamposDesabilitados =[];

    //Bloco Dados Do Beneficio.
    arrayIdCamposDesabilitados.push('codBeneficio');
    arrayIdCamposDesabilitados.push('flgStatus');
    arrayIdCamposDesabilitados.push('codMotCessacao');
    //arrayIdCamposDesabilitados.push('dscFundLegalComprev');
    arrayIdCamposDesabilitados.push('numProcBen');

    //Bloco Acompanhamento Requerimento de compensação
    arrayIdCamposDesabilitados.push('numProtocoloCompen');
    arrayIdCamposDesabilitados.push('datAbertReq');
    arrayIdCamposDesabilitados.push('valProRataConcessao');
    arrayIdCamposDesabilitados.push('valUltProRataAtualizada');
    arrayIdCamposDesabilitados.push('datUltComptProRata');

    //Bloco Histórico de Importação
    arrayIdCamposDesabilitados.push('regImportacaoComprevLegado');

    //Bloco Histórico Jabol
    arrayIdCamposDesabilitados.push('codStatusReqLegado');


    //Bloco ATUALIZAÇÃO DE DADOS
    arrayIdCamposDesabilitados.push('datUltAtuComprev');
    arrayIdCamposDesabilitados.push('nomUsuUltAtu');

    arrayIdCamposDesabilitados.push('codSexoMasculino');
    arrayIdCamposDesabilitados.push('codSexoFeminino');
    arrayIdCamposDesabilitados.forEach(function(idCampo){ //depois fazer regra pra pegar primeira letra minuscula
        $('#'+ idCampo).prop("disabled", true);
    });
}

function abrirTelaHistoricoAtualizacaoDados(){
    let urlParam = PAGINA_HISTORICO_REQUERIMENTO;
    urlParam     += "?numSeqReq=" + $('#hiddenNumSeqReq').val();
    window.open(urlParam,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function abrirTelaHistoricoDadosRequerimentoInseridosTelaCadastro(){
    let urlParam = PAGINA_HISTORICO_REQUERIMENTO_INSERIDO_PELA_TELA_CADASTRO;
    urlParam     += "?numSeqReq=" + $('#hiddenNumSeqReq').val();
    window.open(urlParam,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}

function abrirTelaDetalheRetornoApiComprev(){
    let urlTelaApiComprev = PAGINA_RETORNO_API_COMPREV;
    urlTelaApiComprev   += "?codIdeCli=" + $('#hiddenCodIdeCli').val();
    urlTelaApiComprev   += "&numSeqBeneficio=" + $('#hiddenNumSeqBeneficio').val();
    window.open(urlTelaApiComprev,'pagina',"width=950, height=755, top=100, left=110, scrollbars=no ");
}

function carregarDadosBasicosServidorVinculo(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarDadosBasicosServidorVinculo", params);
    let dadosBasicosServidorVinculo = jsonData.dadosBasicosServidorVinculo;

    //Campos Escondidos.
    $('#hiddenCodIdeCli').val(dadosBasicosServidorVinculo.codIdeCli);
    $('#hiddenNumMatricula').val(dadosBasicosServidorVinculo.numMatricula);
    $('#hiddenCodIdeRelFunc').val(dadosBasicosServidorVinculo.codIdeRelFunc);
    $('#hiddenCodEntidade').val(dadosBasicosServidorVinculo.codEntidade);

    $('#hiddenNomPessoaFisica').val(dadosBasicosServidorVinculo.nomPessoaFisica);
    $('#hiddenNomCargo').val(dadosBasicosServidorVinculo.nomCargo);
    $('#hiddenNomEntidade').val(dadosBasicosServidorVinculo.nomEntidade);
    $('#hiddenNumCpf').val(dadosBasicosServidorVinculo.numCpf);

    $('#nomPessoaFisica').text(dadosBasicosServidorVinculo.nomPessoaFisica);
    $('#numCpf').text(dadosBasicosServidorVinculo.numCpf);
    $('#numRg').val(dadosBasicosServidorVinculo.numRg);
    $('#nomCargo').text(dadosBasicosServidorVinculo.nomCargo);
    $('#nomMae').text(dadosBasicosServidorVinculo.nomMae);
    $('#datNasc').text(dadosBasicosServidorVinculo.datNasc);
    $('#datIngServPublico').val(dadosBasicosServidorVinculo.datIngServPublico);
    $('#nomEntidade').text(dadosBasicosServidorVinculo.nomEntidade);
    $('#numCnpj').val(dadosBasicosServidorVinculo.numCnpj);
    $('#datIniEstatutarioEfetivo').val(dadosBasicosServidorVinculo.datIniEstatutarioEfetivo);
    with (document.forms[0]) {
        setaMascara(numCnpj,MASK_CNPJ);
    }

    if(dadosBasicosServidorVinculo.flgLicenca != '') {
        $('input[name=flgLicenca][value=' + dadosBasicosServidorVinculo.flgLicenca + ']').prop('checked', true);
    }

    if(dadosBasicosServidorVinculo.codTipoDocCompensacao != ''){
        $('input[name=codTipoDocCompensacao][value=' + dadosBasicosServidorVinculo.codTipoDocCompensacao + ']').prop('checked', true);
    }
    $('#numNit').html(dadosBasicosServidorVinculo.numNit);
    $('#numPis').html(dadosBasicosServidorVinculo.numPis);

    if(dadosBasicosServidorVinculo.codTipoMatrComprev != ''){
        $('input[name=codTipoMatrComprev][value=' + dadosBasicosServidorVinculo.codTipoMatrComprev + ']').prop('checked', true);
    }
    $('#codIdeRelFunc').text(dadosBasicosServidorVinculo.codIdeRelFunc);
    $('#numMatricula').text(dadosBasicosServidorVinculo.numMatricula);
    $('#numMatriculaOrigemComprev').val(dadosBasicosServidorVinculo.numMatriculaOrigemComprev);
    $('input[name=codSexo][value=' + dadosBasicosServidorVinculo.codSexo + ']').prop('checked', true);
}

function carregarTabelaBeneficios(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarBeneficioComprev", params);
    let beneficio = jsonData.beneficio; //Por enquanto, existirá apenas 1 benefício por beneficiário, será necessário adaptação no futuro.

    //Campos Escondidos.
    $('#hiddenNumSeqBeneficio').val(beneficio.numSeqBeneficio);
    $('#hiddenCodBeneficio').val(beneficio.codBeneficio);
    $('#hiddenNomTipoBeneficio').val(beneficio.desTipoBeneficio);
    $('#hiddenCodBeneficioExt').val(beneficio.codBeneficioExt);
    $('#hiddenDesTipoTramite').val(beneficio.desTipoTramite);
    $('#hiddenDesTipoBeneficio').val(beneficio.desTipoBeneficio);
    $('#hiddenDatConcessao').val(beneficio.datConcessao);

    let cabecalhoDaTabela = '<th>Num. Protocolo</th>';
    cabecalhoDaTabela    += '<th>Num. Benefício</th>';
    cabecalhoDaTabela    += '<th>Tipo de Trâmite</th>';
    cabecalhoDaTabela    += '<th>Tipo de Benefício</th>';
    cabecalhoDaTabela    += '<th>Data de Concessão</th>';
    cabecalhoDaTabela    += '<th>Beneficiários</th>';

    let corpoDaTabela = '';
    corpoDaTabela += '<td>';
    corpoDaTabela +=      beneficio.codBeneficio;
    corpoDaTabela += '</td>';
    corpoDaTabela += '<td>';
    corpoDaTabela +=      beneficio.codBeneficioExt;
    corpoDaTabela += '</td>';
    corpoDaTabela += '<td>';
    corpoDaTabela +=     beneficio.desTipoTramite;
    corpoDaTabela += '</td>';
    corpoDaTabela += '<td>';
    corpoDaTabela +=     beneficio.desTipoBeneficio;
    corpoDaTabela += '</td>';
    corpoDaTabela += '<td>';
    corpoDaTabela +=     beneficio.datConcessao;
    corpoDaTabela += '</td>';
    corpoDaTabela += '<td><a href="javascript:abrirJanelaBeneficiarios()">';
    corpoDaTabela +=      '<i class="fa fa-search fa-lg" aria-label="Pesquisar"></i>';
    corpoDaTabela += '</a></td>';

    $('#tabelaBeneficios').find('thead').empty();
    $('#tabelaBeneficios').find('thead').append(cabecalhoDaTabela);
    $('#tabelaBeneficios').find('tbody').empty();
    $('#tabelaBeneficios').find('tbody').append(corpoDaTabela);

}



function carregarAbaDadosDoBeneficio(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarDadosBeneficio", params);
    let dadosBeneficio = jsonData.dadosBeneficio;

    consumidor.setCombo('flgStatus', 17);
    consumidor.setCombo('codTipoBeneficioComprev', 4);
    consumidor.setCombo('codMotCessacao', 6);
    consumidor.setCombo('flgFiscalizacaoTcComprev', 100);
    consumidor.setCombo('codTipoCalcParidComprev', 15);
    consumidor.setCombo('codTipoCompensacao', 18);

    $('#codBeneficio').val(dadosBeneficio.codBeneficio);
    $('#flgStatus').val(dadosBeneficio.flgStatus);
    $('#codTipoBeneficioComprev').val(dadosBeneficio.codTipoBeneficioComprev);
    $('#datCessacaoComprev').val(dadosBeneficio.datCessacaoComprev);

    $('#flgDoencaCoberturaIntegral').val(dadosBeneficio.flgDoencaCoberturaIntegral);
    $('#flgDoencaDecorrenteAcidenteTrabalho').val(dadosBeneficio.flgDoencaDecorrenteAcidenteTrabalho);

    $('#valBeneficioComprev').val(dadosBeneficio.valBeneficioComprev);
    $('#codMotCessacao').val(dadosBeneficio.codMotCessacao);
    $('#dscFundLegalComprev').val(dadosBeneficio.dscFundLegalComprev);
    $('#numProcBen').val(dadosBeneficio.numProcBen);
    $('#flgFiscalizacaoTcComprev').val(dadosBeneficio.flgFiscalizacaoTcComprev);
    $('#datIniBenComprev').val(dadosBeneficio.datIniBenComprev);
    $('#numProcessoTcComprev').val(dadosBeneficio.numProcessoTcComprev);
    $('#qtdTmpLiqDiaTotal').val(dadosBeneficio.qtdTmpLiqDiaTotal);
    $('#numCertidaoTc').val(dadosBeneficio.numCertidaoTc);
    $('#datIngServPublicComprev').val(dadosBeneficio.datIngServPublicComprev);
    if(dadosBeneficio.flgSemRegistro == 'S'){
        $('#flgSemRegistro').prop('checked', true);
    }
    if(dadosBeneficio.flgSemCertHomolog == 'S'){
        $('#flgSemCertHomolog').prop('checked', true);
    }
    $('#codTipoCalcParidComprev').val(dadosBeneficio.codTipoCalcParidComprev);
    $('#datHomolTc').val(dadosBeneficio.datHomolTc);
    $('#codTipoCompensacao').val(dadosBeneficio.codTipoCompensacao);
}

function carregarAbaValidacoesDoBeneficio(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarValidacoesBeneficio", params);
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

function carregarLocalizacaoDoArquivo(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarLocalizacaoArquivo", params);
    let dadosLocalizacaoArquivo = jsonData.dadosLocalizacaoArquivo;
    $('#numProtInterno').val(dadosLocalizacaoArquivo.numProtInterno);
    $('#numCaixa').val(dadosLocalizacaoArquivo.numCaixa);
    $('#numPosicao').val(dadosLocalizacaoArquivo.numPosicao);
    if(dadosLocalizacaoArquivo.flgDocLocDigit === 'S'){
        $('#flgDocLocDigit').prop('checked', true);
    }

}

function carregarDestinacaoRegimeOrigemTempo(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarDestinacaoRegimeOrigemTempo", params);
    let dadosDestinacaoRegimeOrigemTempo = jsonData.dadosDestinacaoRegimeOrigemTempo;

    consumidor.setCombo('codRegimeOrigem', 7);
    consumidor.setCombo('codEsferaRegOrigem', 8);
    consumidor.setCombo('codUfComprev', 19);


    if(dadosDestinacaoRegimeOrigemTempo !== null){
        $('#codRegimeOrigem').val(dadosDestinacaoRegimeOrigemTempo.codRegimeOrigem);
        $('#codEsferaRegOrigem').val(dadosDestinacaoRegimeOrigemTempo.codEsferaRegOrigem);
        $('#codUfComprev').val(dadosDestinacaoRegimeOrigemTempo.codUfComprev);
        $('#numTempContribRegOrig').val(dadosDestinacaoRegimeOrigemTempo.numTempContribRegOrig);
        $('#numTempContribRegOrigConcessor').val(dadosDestinacaoRegimeOrigemTempo.numTempContribRegOrigConcessor);
        $('#datIngRegOrig').val(dadosDestinacaoRegimeOrigemTempo.datIngRegOrig);
        $('#datDesvRegOrig').val(dadosDestinacaoRegimeOrigemTempo.datDesvRegOrig);
    }

    carregarComboMunicipio();
    if(dadosDestinacaoRegimeOrigemTempo !== null){
        $('#codMunicipioComprev').val(dadosDestinacaoRegimeOrigemTempo.codMunicipioComprev);
    }
    carregarComboDestinatario();
    if(dadosDestinacaoRegimeOrigemTempo !== null){
        $('#numSeqParticipante').val(dadosDestinacaoRegimeOrigemTempo.numSeqParticipante);
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


function carregarAbaTratamentoRequerimentoCompensacao(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarTratamentoRequerimentoCompensacao", params);
    let dadosTratamentoRequerimentoCompensacao = jsonData.dadosTratamentoRequerimentoCompensacao;

    consumidor.setCombo('codAnalise', 21);
    consumidor.setCombo('codSobrestado', 22);


    //TODO futuramente colocar em TB_CODIGO.
    $('#codAnalise option[value="'+ 6 +'"]').attr("disabled", true);
    $('#codAnalise option[value="'+ 7 +'"]').attr("disabled", true);
    $('#codAnalise option[value="'+ 8 +'"]').attr("disabled", true);
    $('#codAnalise option[value="'+ 9 +'"]').attr("disabled", true);
    $('#codAnalise option[value="'+ 10 +'"]').attr("disabled", true);

    $('#codAnalise option[value="'+ 6 +'"]').css("background-color", '#DCDCDC');
    $('#codAnalise option[value="'+ 7 +'"]').css("background-color", '#DCDCDC');
    $('#codAnalise option[value="'+ 8 +'"]').css("background-color", '#DCDCDC');
    $('#codAnalise option[value="'+ 9 +'"]').css("background-color", '#DCDCDC');
    $('#codAnalise option[value="'+ 10 +'"]').css("background-color", '#DCDCDC');



    if(dadosTratamentoRequerimentoCompensacao !== null){
        $('#codAnalise').val(dadosTratamentoRequerimentoCompensacao.codAnalise);
        $('#codSobrestado').val(dadosTratamentoRequerimentoCompensacao.codSobrestado);
        $('#desObsAnaliseComprev').val(dadosTratamentoRequerimentoCompensacao.desObsAnaliseComprev);
    }

}

function carregarAbaHistoricoImportacao(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarHistoricoImportacao", params);
    let dadosHistoricoImportacao = jsonData.dadosHistoricoImportacao;

    if(dadosHistoricoImportacao !== null){
        $('#regImportacaoComprevLegado').val(dadosHistoricoImportacao.regImportacaoComprevLegado);
        if(dadosHistoricoImportacao.flgVerificadoImpComprevLegado == 'S'){
            $('#flgVerificadoImpComprevLegado').prop('checked', true);
        }
    }

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

function carregarAbaAcompanhamentoRequerimentoCompensacao(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarAcompanhamentoRequerimentoCompensacao", params);
    let dadosAcompanhamentoRequerimentoCompensacao = jsonData.dadosAcompanhamentoRequerimentoCompensacao;

    consumidor.setCombo('codEstadoReq', 23);


    if(dadosAcompanhamentoRequerimentoCompensacao !== null){
        $('#numProtocoloCompen').val(dadosAcompanhamentoRequerimentoCompensacao.numProtocoloCompen);
        $('#datAbertReq').val(dadosAcompanhamentoRequerimentoCompensacao.datAbertReq);
        $('#codEstadoReq').val(dadosAcompanhamentoRequerimentoCompensacao.codEstadoReq);
        $('#datCompensacao').val(dadosAcompanhamentoRequerimentoCompensacao.datCompensacao);
        $('#valProRataConcessao').val(dadosAcompanhamentoRequerimentoCompensacao.valProRataConcessao);
        $('#valUltProRataAtualizada').val(dadosAcompanhamentoRequerimentoCompensacao.valUltProRataAtualizada);
        $('#datUltComptProRata').val(dadosAcompanhamentoRequerimentoCompensacao.datUltComptProRata);
    }
}



function carregarHistoricoJabol(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarHistoricoJabol", params);
    let dadosHistoricoJabol = jsonData.dadosHistoricoJabol;


    consumidor.setCombo('codStatusReqLegado', 24);
    if(dadosHistoricoJabol !== null){
        $('#codStatusReqLegado').val(dadosHistoricoJabol.codStatusReqLegado);
    }

}

function carregarAtualizacaoDados(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarAtualizacaoDados", params);
    let dadosAtualizacaoDados = jsonData.dadosAtualizacaoDados;

    if(dadosAtualizacaoDados !== null){
        $('#datUltAtuComprev').val(dadosAtualizacaoDados.datUltAtuComprev);
        $('#nomUsuUltAtu').val(dadosAtualizacaoDados.nomUsuUltAtu);
    }

}


function carregarDadosRequerimentoInseridosPelaTelaCadastro(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarDadosRequerimentoInseridosPelaTelaCadastro", params);
    let dadosRequerimentoInseridosTelaCadastro = jsonData.dadosRequerimentoInseridosTelaCadastro;

    if(dadosRequerimentoInseridosTelaCadastro === undefined){

    }else if(dadosRequerimentoInseridosTelaCadastro === null){

    }else{
        $('#desRequerimentoComprev').text(dadosRequerimentoInseridosTelaCadastro.desRequerimentoComprev);
        $('#desDadosRetificadosComprev').text(dadosRequerimentoInseridosTelaCadastro.desDadosRetificadosComprev);
    }


}

function preencherCamposBeneficioSelecionado(codBeneficioSelecionado){
    let jsonBeneficioSelecionado = consumidor.executarServico("controleCompensacao/consultarBeneficio?codBeneficio=" + codBeneficioSelecionado);
    carregarAbaDadosDoBeneficio(jsonBeneficioSelecionado);
    carregarAbaValidacoesDoBeneficio(jsonBeneficioSelecionado);
}

function incluirObservacaoValidacaoBeneficio(){
    let params = {};
    params.numSeqBeneficio              = $('#hiddenNumSeqBeneficio').val();
    params.codBeneficio                 = $('#hiddenCodBeneficio').val();
    params.observacaoValidacaoBeneficio = $('#observacaoValidacaoBeneficio').val();
    params.login                        = getCookieSigeprev('cookieLogin');
    consumidor.executarServico("controleCompensacao/incluirObservacaoValidacaoBeneficio", params);
    carregarAbaValidacoesDoBeneficio(params);
}

function incluirObservacaoValidacaoRequerimento(){
    let params = {};
    if($('#hiddenNumSeqReq').val() === ''){
        alert('Não existe registro de requerimento ainda, é necessário primeiro gravar a tela e em seguida tentar novamente inserir uma observação');
        return;
    }
    params.numSeqReq = $('#hiddenNumSeqReq').val();
    params.obserValidacaoRequerimento = $('#obserValidacaoRequerimento').val();
    params.login                      = getCookieSigeprev('cookieLogin');
    consumidor.executarServico("controleCompensacao/incluirObservacaoValidacaoRequerimento", params);
    carregarAbaValidacoesRequerimento(params);
}


function voltar(){
    let urlParam = PAGINA_CONSULTA_REQUERIMENTO;
    urlParam     += "?numCpf=" + $('#hiddenNumCpf').val();
    window.location.href = urlParam;
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


function gravarTela(){


    with (document.forms[0]) {
        erros = "";
        validaCampo2(numRg);
        validaCampo2(numCnpj);
        validaCampo2(flgLicenca);


        //validaCampo2(datIniEstatutarioEfetivo);
        //validaCampoData2(datIniEstatutarioEfetivo);


        validaCampo2(codTipoDocCompensacao);
        validaCampo2(codTipoMatrComprev);
        validaCampo2(codSexo);

        validaCampo2(codTipoBeneficioComprev);
        validaCampoData2(datCessacaoComprev);

        if($('#codTipoBeneficioComprev').val() === '3'){ //Aposentadoria por Tempo de Contribuição.
            validaCampo2(flgDoencaCoberturaIntegral);
            validaCampo2(flgDoencaDecorrenteAcidenteTrabalho);
        }


        validaCampo2(valBeneficioComprev);

        validaCampo2(flgFiscalizacaoTcComprev);

        if($('#flgFiscalizacaoTcComprev').val() === 'S'){
            validaCampo2(numProcessoTcComprev);
        }


        validaCampo2(datIniBenComprev);
        validaCampo2(qtdTmpLiqDiaTotal);

        validaCampoData2(datIniBenComprev);
        validaCampoData2(datIngServPublicComprev);
        validaCampoData2(datHomolTc);
        validaCampoData2(datCompensacao);


        validaCampo2(codRegimeOrigem);
        validaCampo2(numSeqParticipante);

        if ($('#rgpsDatIni').val() !== '') {
            validaCampo2(datIngRegOrig);
            validaCampo2(datDesvRegOrig);
            validaCampoData2(datIngRegOrig);
            validaCampoData2(datDesvRegOrig);
            validaCampo2(numTempContribRegOrig);
        }
        if (erros != ""){
            alerta = JSON.stringify(erros.replace(/(?:\r\n|\r|\n)/g, '  '));
            alert(alerta.replace(/[\\"]/g, ''));
            erros = "";
            alerta = "";
            return;
        }
    }



    let mensagemExigencia = validarExigenciaBeneficio();
    if(mensagemExigencia !== ''){
        alert(mensagemExigencia);
        return;
    }


    if(!confirm("Realizada a validação da matrícula requerimento?")) {
        return;
    }


    let params = obterCamposPreenchidosTela();

    let jsonDataRegistroGravado = consumidor.executarServico2("controleCompensacao/gravarTela", params);

    if(jsonDataRegistroGravado.codStatus !== 0){
        alert(jsonDataRegistroGravado.msgStatus);
        return;
    }

    $('#hiddenNumSeqReq').val(jsonDataRegistroGravado.numSeqReq);

    //carregarAbaValidacoesDoBeneficio(params);

    alert('Requerimento gravado com sucesso.');

    let urlParam = PAGINA_REQUERIMENTO;
    urlParam     += "?numCpf="        + $('#hiddenNumCpf').val();
    urlParam     += "&codIdeCli="     + $('#hiddenCodIdeCli').val();
    urlParam     += "&numSeqFunc="    + $('#hiddenNumSeqFunc').val();
    urlParam     += "&numMatricula="  + $('#hiddenNumMatricula').val();
    urlParam     += "&codIdeRelFunc=" + $('#hiddenCodIdeRelFunc').val();

    urlParam     += "&numSeqBeneficio="    +  $('#hiddenNumSeqBeneficio').val();
    urlParam     += "&numSeqReq="          +  $('#hiddenNumSeqReq').val();


    window.location.href = urlParam;

}


$(function(){


    let formulario_001 = {
        init: function () {
            this.consultar();
        },
        consultar: function () {
            var urlParams = new URLSearchParams(window.location.search);
            let params = {};

            params.codIns             = getCookieSigeprev('cookieCodIns');
            params.login              = getCookieSigeprev('cookieLogin');
            params.numCpfLogin        = getCookieSigeprev('cookieNumCpfLogin');

            params.numCpf             = urlParams.get("numCpf");
            params.codIdeCli          = urlParams.get("codIdeCli");
            params.numSeqFunc         = urlParams.get("numSeqFunc");
            params.numMatricula       = urlParams.get("numMatricula");
            params.codIdeRelFunc      = urlParams.get("codIdeRelFunc");

            params.numSeqBeneficio    = urlParams.get("numSeqBeneficio");
            params.numSeqReq          = urlParams.get("numSeqReq");
            params.numSeqParticipante = urlParams.get("numSeqParticipante");

            // $('#hiddenAmbiente').val(params.ambiente);
            $('#hiddenCodIns').val(params.codIns);
            $('#hiddenLogin').val(params.login);
            $('#hiddenNumCpfLogin').val(params.numCpfLogin);
            $('#hiddenOrigem').val(params.origem);

            $('#hiddenNumCpf').val(params.numCpf);
            $('#hiddenCodIdeCli').val(params.codIdeCli);
            $('#hiddenNumSeqFunc').val(params.numSeqFunc);
            $('#hiddenNumMatricula').val(params.numMatricula);
            $('#hiddenCodIdeRelFunc').val(params.codIdeRelFunc);

            $('#hiddenNumSeqBeneficio').val(params.numSeqBeneficio);
            $('#hiddenNumSeqReq').val(params.numSeqReq);




            carregarDadosBasicosServidorVinculo(params);

            pesquisarLsvCadastradasNoBanco(params.numSeqFunc);

            carregarTabelaBeneficios(params);
            carregarAbaDadosDoBeneficio(params);
            carregarAbaValidacoesDoBeneficio(params);

            buscarBancoDadosTodasExigenciasBeneficioCadastradas(); //essa função é chamada no arquivo exigenciaBeneficio.js

            carregarLocalizacaoDoArquivo(params);
            carregarDestinacaoRegimeOrigemTempo(params);

            //carregarPeriodosTempoServicoContribuicaoRegimeOrigem(params);
            pesquisarPeriodosComprevServico(params.numSeqReq);

            carregarAbaTratamentoRequerimentoCompensacao(params);
            carregarAbaHistoricoImportacao(params);
            carregarAbaValidacoesRequerimento(params);
            carregarAbaAcompanhamentoRequerimentoCompensacao(params);

            carregarRetificacoesTelaRequerimento(); //funcao do arquivo retificacoes.js

            consultarApiComprev(params);
            carregarHistoricoJabol(params);
            carregarAtualizacaoDados(params);
            carregarDadosRequerimentoInseridosPelaTelaCadastro(params);


            deveMostrarBlocoDadosRequerimentoInseridosPelaTelaCadastro(params);
            selecionarRegimeOrigem();



            carregarDocumentosExigencia();


            executarRegraCamposObrigatorios();
            executarRegraCamposDesabilitados();

            preencherMascaras();


            bloquearOuDesbloquearBotaoGravarRetificacao(); //funcao da retificacoes.js

            habilitarBotaoHistoricoFinanceiro(params);


        },
    };
    formulario_001.init();

});



function preencherMascaras(){
    with (document.forms[0]) {


        setaMascara(datIniLsv, MASK_DATA);
        setaMascara(datFimLsv, MASK_DATA);

        setaMascara(datIngServPublico, MASK_DATA);
        setaMascara(numCnpj, MASK_CNPJ);
        setaMascara(datIniEstatutarioEfetivo, MASK_DATA);

        $("#valBeneficioComprev").maskMoney({thousands:'.', decimal:',', affixesStay: false});


        setaMascara(datIniBenComprev, MASK_DATA);
        setaMascara(datIngServPublicComprev,MASK_DATA);
        setaMascara(datHomolTc,MASK_DATA);


        setaMascara(datIngRegOrig,MASK_DATA);
        setaMascara(datDesvRegOrig,MASK_DATA);


        setaMascara(datAbertReq,MASK_DATA);
        setaMascara(datCompensacao,MASK_DATA);
        setaMascara(datUltComptProRata,MASK_DATA);

        //https://plentz.github.io/jquery-maskmoney/
        $("#valProRataConcessao").maskMoney({thousands:'.', decimal:',', affixesStay: false});
        $("#valUltProRataAtualizada").maskMoney({thousands:'.', decimal:',', affixesStay: false});

        //Bloco Periodos de Tempo
        setaMascara(rgpsDatIni, MASK_DATA);
        setaMascara(rgpsDatFim, MASK_DATA);

        setaMascara(rppsDatIni, MASK_DATA);
        setaMascara(rppsDatFim, MASK_DATA);

        //masca

        /*
        setaMascara(numCnpjComprev,MASK_CNPJ);
        setaMascara(datCompensacao, MASK_PERIODO);
        setaMascara(numProcessoTC,MASK_NUMERO_PROCESSOTC);

        setaMascara(inicPeriodoConsiderado, MASK_DATA);
        setaMascara(fimPeriodoConsiderado, MASK_DATA);

        setaMascara(inicioPeriodoConsideradoRgps, MASK_DATA);
        setaMascara(fimPeriodoConsideradoRgps, MASK_DATA);

        setaMascara(dataIngressoRegimeOrigem, MASK_DATA);
        setaMascara(dataDesvinculacaoRegimeOrigem, MASK_DATA);

        valBeneficioComprev.value = formatarMoeda(valBeneficioComprev.value);
        valCompensacao.value = formatarMoeda(valCompensacao.value);
        valProRataAtualizada.value = formatarMoeda(valProRataAtualizada.value);*/

    }

}


function init() {
    with (document.forms[0]) {

    }

    /*with (document.forms[0]) {
        setaMascara(numCnpjComprev,MASK_CNPJ);
        if(existeBeneficioComprev){
            setarMascaras();
            if(isEstagiario){
                bloquearCamposEstagiario();
            }else{
                bloquearCampos();
            }
            carregarInformacoesAdicionaisTelaComprev();
            mostrarMensagemAlteracacoStatusProcessoCompensacao();

        }else{
            bloquearTelaInteira();
        }

    }

    if ($("#regimeOrigem").val() == "RPPS") {
        $(".rppsOrigemShow").addClass("ativo");
    } else if ($("#regimeOrigem").val() == "RGPS"){
        $(".certidaoRgpsShow").addClass("ativo");
    }

  $('[data-toggle="popover"]').click(function(){
    $(this).popover('toggle');
  });

  $('[data-toggle="tooltip"]').tooltip();

  $("#fundamentoLegal_charsLeft").text(150-$("#fundamentoLegal").val().length);

    $("#btnRetornoApiComprev").click(function(){
        window.open("retornoApiComprev.html","API Comprev","top=100,left=100,titlebar=no,resizable=yes,status=no,help=no,scrollbars=yes,width=900,height=600");
    });

    $("#regimeOrigem").change(function(){
        if ($(this).val() == "RPPS") {
            $(".rppsOrigemShow").addClass("ativo");
            $(".certidaoRgpsShow").removeClass("ativo");
        } else if ($(this).val() == "RGPS"){
            $(".certidaoRgpsShow").addClass("ativo");
            $(".rppsOrigemShow").removeClass("ativo");
        } else {
            $(".rppsOrigemShow").removeClass("ativo");
            $(".certidaoRgpsShow").removeClass("ativo");
        }
    });

    */


    executarRegraCampos();

}



function verificarSePodeAlterarRegimeOrigem(){
    let params = {};
    params.numSeqReq = $('#hiddenNumSeqReq').val();
    params.codRegimeOrigem = $('#codRegimeOrigem').val();
    let jsonData = consumidor.executarServico("controleCompensacao/verificarSePodeAlterarRegimeOrigem", params);

    if(jsonData.podeAlterarRegimeOrigem){

    }else{
        alert('Para alterar o regime de origem, é necessário deletar todas as certidões do outro tipo de regime de origem.');
        $('#codRegimeOrigem').val(jsonData.codRegimeOrigemCadastrado);
    }

}


function setarMascaras(){
    with (document.forms[0]) {

        setaMascara(datUltCessacao, MASK_DATA);    //Data de Cessação do Benefício
        setaMascara(datIniBenComprev,MASK_DATA);   //Data de Início do Benefício
        setaMascara(datIngServPublico,MASK_DATA);
        setaMascara(numCnpjComprev,MASK_CNPJ);
        setaMascara(datIniEstatutarioEfetivo,MASK_DATA);

        setaMascara(datCompensacao, MASK_PERIODO);
        setaMascara(numProcessoTC,MASK_NUMERO_PROCESSOTC);

        setaMascara(inicPeriodoConsiderado, MASK_DATA);
        setaMascara(fimPeriodoConsiderado, MASK_DATA);

        setaMascara(inicioPeriodoConsideradoRgps, MASK_DATA);
        setaMascara(fimPeriodoConsideradoRgps, MASK_DATA);

        setaMascara(dataIngressoRegimeOrigem, MASK_DATA);
        setaMascara(dataDesvinculacaoRegimeOrigem, MASK_DATA);

        valBeneficioComprev.value = formatarMoeda(valBeneficioComprev.value);
        valCompensacao.value = formatarMoeda(valCompensacao.value);
        valProRataAtualizada.value = formatarMoeda(valProRataAtualizada.value);

    }
}

function bloquearCampos(){
    with (document.forms[0]) {
        //Dados Básicos Servidor e Vínculo
        numMatriculaOrigem.disabled = true;
        if($("input[name='sexo']:checked").val() == 'M' || $("input[name='sexo']:checked").val() == 'F'){
            $("input[name='sexo']").prop("disabled", true);
        }

        //Dados do Benefício
        codBeneficio.disabled = true;
        flgStatus.disabled = true;
        if(!isLegado(codBeneficio.value)){
            tipoBeneficioSaa.disabled = true;
        }

        if(isBeneficioSpprev(codBeneficio.value)){
            valBeneficioComprev.disabled = true;
        }

        motCessacao.disabled = true;

        if(isBeneficioSpprev(codBeneficio.value)){
            if(tipoFluxo.value == 'OD' || tipoFluxo.value == 'ON' ||
                tipoFluxo.value == 'OVE'|| tipoFluxo.value == 'OVN' || tipoFluxo.value == 'OOJ'){
                descFundamentacaoLegal.disabled = true;
            }
        }
        numProcBen.disabled = true;

        //Acompanhamento requerimento de compensação
        valCompensacao.disabled = true;
        valProRataAtualizada.disabled = true;
        dtCompProRata.disabled = true;

        //Atualização de Dados
        datUltAtuComprev.disabled = true;
        nomUsuUltAtuComprev.disabled = true;
    }
}

function bloquearCamposEstagiario(){
    with (document.forms[0]) {

        //bloqueia a tela inteira, menos os botões e os campos hidden.
        //$('input[type!="button"][type!="hidden"], select,textarea').prop('disabled', true);	tsukasa

        //bloqueia o botão da matrícula origem
        botaoMatriculaOrigemEditar.disabled = true;

        //Apenas esses campos estarão habilitados para o perfil de estagiário.

        //Bloco Certidão(ões) de Tempo de Serviço/Contribuição de outro RPPS ou Ente Federativo
        botaoAlterarInssRgps.disabled = true;
        botaoExcluirInssRgps.disabled = true;
        botaoInserirInssRgps.disabled = true;

        //Bloco Tratamento Requerimento de Compensação

        obsAnaliseComprev.disabled = false;

        //Bloco Localização do Arquivo
        numProtInterno.disabled = false;
        numCaixa.disabled = false;
        numPosicao.disabled = false;
        flgEnviadoDigitArquivo.disabled = false;

    }
}

function carregarInformacoesAdicionaisTelaComprev(){
    with (document.forms[0]) {

        carregarCertidoesTempoContribuicaoInssRgps();
        carregarCertidoesTempoContribuicaoRppsEnte();

        habilitarCamposExigencia();
        habilitarCampoOutraDiretoriaRegional();
        carregarExigenciasAjax();

        $('#botaoMatriculaOrigemSalvar').hide();
        var tipoMatricula = document.forms[0].tipoMatriculaSaa.value;
        if(tipoMatricula == ""){
            if(isEntidadeExterna || isMilitar || isAposentadoExterno){
                document.forms[0].tipoMatriculaSaa.value = 'M';
            }else{
                if(isAposentado){
                    document.forms[0].tipoMatriculaSaa.value = 'R';
                }
            }
        }
    }
}

function habilitarCamposExigencia(){

    /*	with (document.forms[0]) {
        if(codAnalise.value == "2"){
          codSobrestado.disabled = false;
        }else{
          codSobrestado.disabled = true;
        }

        if(codAnalise.value == "3"){
          $("#tbExigencias").show();
          $("#diretoriaRegionalLabel").show();
          $("#diretoriaRegionalCombo").show();
          $("#outraDiretoriaReginalLabel").show();
          $("#outraDiretoriaReginalTexto").show();
        }else{
          $("#tbExigencias").hide();
          $("#diretoriaRegionalLabel").hide();
          $("#diretoriaRegionalCombo").hide();
          $("#outraDiretoriaReginalLabel").hide();
          $("#outraDiretoriaReginalTexto").hide();
        }
        }	*/
}

function bloquearTelaInteira(){
    //$('input[type!="hidden"], select,textarea').prop('disabled', true); tsukasa
    $('#btnVoltar').prop('disabled', false);//Deixar habilitado apenas o botão voltar.
    $("a").click(function(){
        return false;
    });
}


/**___________________________________________________________________________________________________________________________________________________
 |___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_|
 |_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
 |____________________________________________________________ FUNÇÕES QUE ABREM JANELAS EXTERNAS _____________________________________________________|
 |__|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|
 |____|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|*/

function abrirJanelaTemposAverbados() {
    with (document.forms[0]) {
        var url = contexto + "/cadastro/histCarteiraTrab.do?";
        url += 'acao=PESQUISAR';
        url += '&modo=JANELA';
        url += '&codIdeCli='		+ codIdeCli.value;
        url += '&codEntidade=' 		+ codEntidade.value;
        url += '&numCpf=' 			+ numCpf.value;
        url += '&nomPessoaFisica=' 	+ encodeURI(nomPessoaFisica.value);
        url += '&nomEntidade=' 		+ encodeURI(nomEntidade.value);

        if(isEstagiario || indPermissaoAlterar == false){
            url += "&travarTela=true";
        }
        abrirJanela(url, 'histCartTrab');
    }
}

function abrirJanelaTelaServidor(cpfServidor){
    var url = contexto + "/cadastro/servidor.do?";
    var parametros = {
        numCpf:	 cpfServidor,
        acao:	'PESQUISAR_CPF'
    };
    var parametrosEmFormatoParaUrl = $.param(parametros);
    abrirJanelaComRefreshAposFechada(url+parametrosEmFormatoParaUrl, 'Informações do Servidor');
}

function abrirJanelaVisualizarCertidoes() {
    with (document.forms[0]) {
        var url = contexto + "/comprev/certidaoTemposComprev.do?";
        url += "acao=PESQUISAR";
        url += "&modo=JANELA";
        url += "&codIdeCli="		+ codIdeCli.value;
        url += "&codEntidade=" 		+ codEntidade.value;
        url += "&codBeneficio=" 	+ codBeneficio.value;
        url += "&relatorio=" 		+ "relatorioTemposAverbadosComprev";

        if(isEstagiario || !indPermissaoAlterar){
            url = url +"&travarTela=true";
        }

        abrirJanela(url, 'certidaoTemposComprev');
    }
}



function abrirJanelaBeneficiarios() {
    var url = urlDominioSigeprev+ urlContextoSigeprev + "/cadastro/beneficiario.do";

    url += "?acao=PESQUISAR";
    url += "&modo=JANELA";
    url += "&codIdeCli=" 		         + $('#hiddenCodIdeCli').val();
    url += "&codEntidade="  	         + $('#hiddenCodEntidade').val();
    url += "&codIdeRelFunc="	         + $('#hiddenCodIdeRelFunc').val();
    // url += "&codPccs="			         + frm.codPccs.value;
    url += "&codBeneficio=" 	         + $('#hiddenCodBeneficio').val();
    url += "&nomTipoBeneficio="          + $('#hiddenNomTipoBeneficio').val();
    url += "&codCargo=" 	             + $('#hiddenCodCargo').val();
    url += "&nomCargo="                  + $('#hiddenNomCargo').val();
    url += "&numCpf=" 			         + $('#hiddenNumCpf').val();
    url += "&nomPessoaFisica=" 	         + encodeURI($('#hiddenNomPessoaFisica').val());
    url += "&numMatricula=" 	         + $('#hiddenNumMatricula').val();
    url += "&nomEntidade=" 		         + encodeURI($('#hiddenNomEntidade').val());
    url += "&permiteManipulacaoValores=" + 'false';


    abrirJanela(url, 'beneficiarios');
}



function abrirJanelaHistoricoRequerimentoComprev(){
    let url = contexto+"/comprev/historicoAlteracoesRequerimento.do?codBeneficio="+document.forms[0].codBeneficio.value;
    window.open(url,"historicoRequerimentoComprev","width=800,height=600,resizable=1,scrollbars=yes");
}


function abrirJanela(url, nomeJanela){
    if (isIE()) {
        window.open(url);
    }else{
        abrirJanelaComRefreshAposFechada(url, nomeJanela);
    }
}

function abrirJanelaComRefreshAposFechada(url, name){
    w = screen.availWidth-15;
    h = screen.availHeight-70;
    features = "scrollbars:yes;dialogWidth:"+w+"px;dialogHeight:"+h+"px;";
    if(isIE()){
        var retorno = window.showModalDialog(url, name, features);
        /*Modificado:David Data:12/06/2017
         *TT40597 erro na página da Funcional COMPREV
         *nao existe no form, foi comentado, alterado acao pois a ALTERAR não existe
         */
        //document.forms[0].acao.value="ALTERAR";
        document.forms[0].acao.value="acaoPesquisar";

        //document.forms[0].acaoAux.value="";
        //FimTT40597
        document.forms[0].submit();
    }else{
        var janela = xShowModalDialog(url, name, features);
    }
}




/**___________________________________________________________________________________________________________________________________________________
 |___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_|
 |_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
 |____________________________________________________________ FUNÇÕES DO CAMPO MATRÍCULA ORIGEM_______________________________________________________|
 |__|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|
 |____|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|*/

function habilitarMatriculaOrigem(){
    with (document.forms[0]) {
        $('#botaoMatriculaOrigemEditar').hide();
        $('#botaoMatriculaOrigemSalvar').show();
        numMatriculaOrigem.disabled = false;
    }
}

function salvarMatriculaOrigem(){
    var frm = document.forms[0];

    if(frm.numMatriculaOrigem.value.length < 3){
        alertNew('- O campo Matrícula Origem deve ter pelo menos 3 caracteres.');
        return;
    }

    alertNew('Deseja realmente alterar a matrícula?');

    $.ajax({
        url:location.href.split("?", 1),
        data:{ acao:"acaoAjaxSalvarMatriculaOrigem",
            numMatriculaOrigem :frm.numMatriculaOrigem.value,
            codIns             :frm.codIns.value,
            codIdeCli          :frm.codIdeCli.value,
            codEntidade        :frm.codEntidade.value,
            codCargo           :frm.codCargo.value,
            numMatricula       :frm.numMatricula.value,
            codIdeRelFunc      :frm.codIdeRelFunc.value,
            tipoMatriculaSaa   :frm.tipoMatriculaSaa.value,
            codBeneficio       :frm.codBeneficio.value
        },
        dataType:"JSON",
        async: false,
        error: function(XMLHttpRequest){
            alertNew(XMLHttpRequest.responseText);
        },
        success: function(){
            alertNew('Matrícula gravada com sucesso');
            $('#botaoMatriculaOrigemEditar').show();
            $('#botaoMatriculaOrigemSalvar').hide();
            frm.numMatriculaOrigem.disabled = true;
        }
    });
}



function irParaTelaHistoricoFinanceiro(){
    with (document.forms[0]){
        var url = contexto + '/comprev/upControleCompensacao.do?'
            + 'acao=irParaTelaHistoricoFinanceiro'
            + '&codIns=' + codIns.value
            + '&codBeneficio=' + codBeneficio.value;
        if(isIE()){
            var janela = window.open(url, "","width=500,height=250,resizable=1,scrollbars=no");
        }else{
            var janela = window.open(url, "Histórico Financeiro", "scrollbars=yes, titlebar=no, resizable=yes, status=no, help=no, width=500, height=250, left=130");
            janela.moveTo(50,50);
        }

    }
}

function desmarcarCheckBox(checkbox){
    document.getElementById(checkbox).checked = false;
}

function marcarCheckBox(checkbox){
    document.getElementById(checkbox).checked = true;
}


/**___________________________________________________________________________________________________________________________________________________
 |___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|_|
 |_|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|
 |____________________________________________________________ AÇÕES PRINCIPAIS________________________________________________________________________|
 |__|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|
 |____|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|___|__|*/

//function preencherCamposBeneficioSelecionado(numProtocolo){
//with (document.forms[0]){
//	codBeneficio.value = numProtocolo;
//	exibirAguardeBootstrap();
//	chamarMetodoNoServidor('acaoPesquisar', 'acao');
//}
//}

//function voltar(){
//	with (document.forms[0]) {
//  exibirAguardeBootstrap();
//	chamarMetodoNoServidor('acaoVoltar', 'acao');
//}
//}


function verificarCamposObrigatoriosProntoParaEnviarAoInss(){
    erros = "";
    with (document.forms[0]) {
        validaCampo2Novo(tipoDocCompensacao);
        validaCampo2Novo(tipoMatriculaSaa);
        validaCampo2Novo(datIngServPublico);
        validaCampo2Novo(numCnpjComprev);
        validaCampo2Novo(codBeneficio);
        validaCampo2Novo(flgStatus);
        validaCampo2Novo(valBeneficioComprev);
        validaCampo2Novo(isfiscTribunalContas);
        validaCampo2Novo(datIniBenComprev);
        validaCampo2Novo(numProcessoTC);
        validaCampo2Novo(qtdTmpLiqDiaTotal);
        validaCampo2Novo(qtdTmpLiqDiaRgps);
        validaCampo2Novo(obsAnaliseComprev);
        validaCampo2Novo(tipoRequerimento);
        validaCampo2Novo(dadosRetificadosComprev);
    }
}


function gravarComprev(){
    with (document.forms[0]) {
        if(!isEstagiario){

            erros = "";

            validaCampo2Novo(datIngServPublico);
            validaCampoData2Novo(datIngServPublico);

            validaCampo2Novo(numCnpjComprev);
            if (numCnpjComprev.value != '' && !ValidaCGC(numCnpjComprev.value)){
                erros = erros +"-  O campo CNPJ é inválido. <br/>";
            }


            //Dados Básicos Servidor e Vínculo
            if(!isRadioChecked(tipoDocCompensacao)){
                erros = erros +"-  Deve-se selecionar um tipo de documento para<br/> compensação(NIT ou PIS/PASEP)<br/>";
            };

            if(!isRadioChecked(tipoMatriculaSaa)){
                erros = erros +"-  Deve-se selecionar um tipo de Matrícula<br/> Requerimento(RF, Matrícula ou Matrícula Origem)<br/>";
            };

            if(!isRadioChecked(sexo)){
                erros = erros +"-  Deve-se selecionar o sexo.<br/>";
            };

            if(datIngServPublic.value != ""){
                if(datIniBenComprev.value != ""){
                    if(comparaDatas(datIniBenComprev.value, datIngServPublic.value) < 1 || comparaDatas(datIniBenComprev.value, datIngServPublic.value) == 1){
                        erros = erros +"- A data de ingresso não pode ser maior ou igual a data de início do benefício. <br/>";
                    }
                }
            }

            //Dados do Benefício
            if(datUltCessacao.value != ""){
                if(comparaDatas(datIniBenComprev.value, datUltCessacao.value) > 1){
                    erros = erros +"- " + datIniBenComprev.title + "(" + datIniBenComprev.value + ") deve ser menor que  a "+ datUltCessacao.title + "(" + datUltCessacao.value + ").<br/>";
                }
            }

            if(isfiscTribunalContas.value == 'S'){
                validaCampo2Novo(numProcessoTC);
            }

            validaCampoData2Novo(datUltCessacao);

            if(valBeneficioComprev.value == '0,00'){
                erros = erros +"-  O valor do campo Valor Benefício na Concessão<br/> não pode ser igual a zero.<br/>";
            }

            validaCampo2Novo(datIniBenComprev);
            validaCampoData2Novo(datIniBenComprev);

            validaCampo2Novo(qtdTmpLiqDiaTotal);//tempo total
            validaCampo2Novo(qtdTmpLiqDiaRgps); // tempo rgps
            validaCampo2Novo(obsAnaliseComprev); //observação

            if(qtdDiasTotalInssRgps < parseInt(qtdTmpLiqDiaRgps.value)){
                erros = erros +"-  O campo Tempo RGPS não pode ser maior que a<br/> soma de todas as certidões de Tempo de<br/> Contribuição INSS/RGPS.<br/>";
            };

            if(parseInt(qtdTmpLiqDiaRgps.value) > parseInt(qtdTmpLiqDiaTotal.value)){
                erros = erros +"-  O campo Tempo RGPS não pode ser maior que o campo Tempo Total.<br/>";
            };

            comparaCampoPeriodoMenorDataFixa(datCompensacao,'01/1990'); //data de concessao cp

            //tt correção producao
            if(isLegado(codBeneficio.value)){
                validaCampo2Novo(tipoBeneficioSaa);
            }

            if(codTipoCompensacao.value == "1" || codTipoCompensacao.value == "2"){
                if(qtdRegistrosRppsEnte == 0){
                    erros = erros +"- Insira pelo menos uma Certidão de Tempo de<br/> Serviço/Contribuição de outro RPPS ou<br/> Ente Federativo.<br/>";
                }
            }

            //se selecionado outros em exigencia, campo deve estar preenchido
            var arrExigencia = [];
            for(i=0;i<codExigenciaFaltante.length;i++){
                if(codExigenciaFaltante[i].checked == true){
                    arrExigencia[i]= codExigenciaFaltante[i].value;
                }
            }

            for(i=0;i<codExigenciaIlegivel.length;i++){
                if(codExigenciaIlegivel[i].checked == true){
                    arrExigencia[i]= codExigenciaIlegivel[i].value;
                }
            }

            //Nova Exigência 1
            if($.inArray("99",arrExigencia) !="-1"){
                validaCampo2Novo(nomOutros);
            }
            if($.inArray("98",arrExigencia) !="-1"){
                validaCampo2Novo(nomOutros);
            }

            //Nova Exigência 2
            if($.inArray("97",arrExigencia) !="-1"){
                validaCampo2Novo(nomOutros2);
            }
            if($.inArray("96",arrExigencia) !="-1"){
                validaCampo2Novo(nomOutros2);
            }

            if($('#codAnalise option:selected').val() == '2'){
                validaCampo2Novo(codSobrestado);
            }
            if($('#codAnalise option:selected').val() == '3' && arrExigencia.length < 1 ){
                erros = erros +" -  Selecione ao menos uma exigência<br/>";
            }

            if(datFimBen.value != ""){
                if(comparaDatas(datIniBenComprev.value,datFimBen.value)>1){
                    erros = erros +"- "+datIniBenComprev.title +"  deve ser menor que a<br/> Data Final do Beneficio ("+datFimBen.value+")<br/>";
                }
            }

            if (erros != ""){
                alertNew(erros);
                erros ="";
                return;
            }


            var radioNit =$("input[name='tipoDocCompensacao'][value='N']");
            var radioPis =$("input[name='tipoDocCompensacao'][value='P']");
            if((radioNit.prop("checked") == true && numNitInss.value == "")
                || (radioPis.prop("checked") == true  && numPis.value =="")){
                confirmSigeprev2("O Documento para Compensação escolhido está em branco, tem certeza de que deseja  utilizar este documento?", "confirmarMensagemGravar");
            }else{
                confirmarMensagemGravar(true);
            }


        }else{
            validaCampo2Novo(obsAnaliseComprev);

            if (erros != ""){
                alertNew(erros);
                erros ="";
                return;
            }

            confirmaGravar(true);
        }
    }
}


function confirmarMensagemGravar(resposta){
    if(resposta){
        with(document.forms[0]){
            confirmSigeprev2("Realizada a validação da matrícula requerimento? ", "confirmaGravar");
        }
    }
}


function confirmaGravar(resposta){
    if(resposta){
        with(document.forms[0]){


            var desabilitadoSobrestado = codSobrestado.disabled;
            var desabilitadoExigencia = $("#tbExigencia").prop("disabled");
            habilitaCamposForm(document.forms[0]);

            if(isEstagiario){
                desabilitadoSobrestado = false;
                var desabilitadoExigencia = false;
            }


            codSobrestado.disabled = desabilitadoSobrestado;
            $("#tbExigencia").prop("disabled",desabilitadoExigencia);

            if(isLegado(codBeneficio.value)){
                valBeneficioComprev.disabled = '';
            }
            tipoBeneficioSaa.disabled = '';

            numCnpjComprev.value = numCnpjComprev.value.replaceAll("/", "").replaceAll("-", "").replaceAll(".", "");
            exibirAguardeBootstrap();
            chamarMetodoNoServidor('acaoGravar', 'acao');
        }
    }
}



function isLegado(codBeneficio){
    return codBeneficio < 60000000;
}

function isBeneficioSpprev(codBeneficio){
    return codBeneficio > 80000000;
}

function mostrarMensagemAlteracacoStatusProcessoCompensacao(){

    $(document).ready(function(){

        $("#selectStatusProcessoCompensacao").focus(function(evento){
            valorAntesStatusProcesso = $(this).val();
        }).change(function(){
            confirmSigeprev2('Confirmar Alteração de Status Processo Compensação?','mudarValorCombo');
        })
    });
}

function mudarValorCombo(retorno){
    if(!retorno){
        $("#selectStatusProcessoCompensacao").val(valorAntesStatusProcesso);
    }
}


//FIM TASK2899
function preencherCampos(indice) {
    with (document.forms[0]){

        $("input[name='valBeneficioComprev']").prop("disabled",true);

        habilitarCamposExigencia();

        carregarExigenciasAjax();

        if(typeof btnAlterar !=='undefined')
            btnAlterar.disabled = false;

    }
}


function habilitarCampoOutraDiretoriaRegional(){
    with (document.forms[0]){
        if(codDiretoriaOuRegional.value == ''){
            descOutraDiretOuReg.disabled = false;
        }else{
            descOutraDiretOuReg.value = '';
            descOutraDiretOuReg.disabled = true;
        }
    }

}

function habilitarOutros(){
    var checkboxFaltante = $("input[name='codExigenciaFaltante'][value='99']");
    var checkboxIlegivel = $("input[name='codExigenciaIlegivel'][value='98']");
    if(checkboxFaltante.prop("checked") == true || checkboxIlegivel.prop("checked") == true){
        $("input[name='nomOutros']").prop("disabled",false);
    }else{
        $("input[name='nomOutros']").prop("disabled",true);
        document.forms[0].nomOutros.value = '';
    }
}

function habilitarOutros2(){
    var checkboxFaltante = $("input[name='codExigenciaFaltante'][value='97']");
    var checkboxIlegivel = $("input[name='codExigenciaIlegivel'][value='96']");
    if(checkboxFaltante.prop("checked") == true || checkboxIlegivel.prop("checked") == true){
        $("input[name='nomOutros2']").prop("disabled",false);
    }else{
        $("input[name='nomOutros2']").prop("disabled",true);
        document.forms[0].nomOutros2.value = '';
    }
}

function carregarExigenciasAjax(){
    var frm = document.forms[0];

    $.ajax({
        cache:false	,
        url:contexto+"/comprev/upControleCompensacao.do",
        data:{acao:"acaoAjaxCarregarExigencias",codBeneficio:frm.codBeneficio.value},
        dataType:"JSON",
        async: false,
        success:function(retorno){
            $.each(retorno, function(index, elem){
                var checkFaltante = $("input[name='codExigenciaFaltante'][value ='"+elem.codDocumento+"']");
                var checkIlegivel = $("input[name='codExigenciaIlegivel'][value ='"+elem.codDocumento+"']");

                if(elem.flgStatus == 'F'){
                    checkFaltante.prop("checked",true);
                }else if(elem.flgStatus == 'I'){
                    checkIlegivel.prop("checked",true);
                }

                if(elem.codDocumento == "99"){
                    frm.nomOutros.value = elem.nomOutros;
                    habilitarOutros();
                }else if(elem.codDocumento == "98"){
                    frm.nomOutros.value = elem.nomOutros;
                    habilitarOutros();
                }

                if(elem.codDocumento == "97"){
                    frm.nomOutros2.value = elem.nomOutros2;
                    habilitarOutros2();
                }else if(elem.codDocumento == "96"){
                    frm.nomOutros2.value = elem.nomOutros2;
                    habilitarOutros2();
                }
            });
        }
    });

}

function initBtn() {

    /*
    $("#btnTemposAverbados").click(function(event){
        event.preventDefault();
        abrirJanelaTemposAverbados();
    });

    $("#btnTelaServidor").click(function(event){
        event.preventDefault();
        var servidor = document.forms[0].numCpf.value;
        abrirJanelaTelaServidor(servidor);
    })

    $("#btnVisCertidoes").click(function(event){
        event.preventDefault();
        abrirJanelaVisualizarCertidoes();
    });



    $("#numMatriculaOrigem").keypress(function(event){ return validaNumero(this, event) });
    $("#botaoMatriculaOrigemEditar").click(function(){ habilitarMatriculaOrigem() });
    $("#botaoMatriculaOrigemSalvar").click(function(){ salvarMatriculaOrigem() });

    $("#valBeneficioComprev")
        .blur(function(){ onBlurMoeda(this) })
        .keypress(function(event){
            return(currencyFormat(this,'.',',',event))
        });

    $("#qtdTmpLiqDiaTotal").keypress(function(event){ return validaNumero(this, event) });
    $("#tempoRGPS").keypress(function(event){ return validaNumero(this, event) });
    $("#qtdTmpLiqAnoIR").keypress(function(event){ return validaNumero(this, event) });
    $("#qtdTmpLiqMesIR").keypress(function(event){ return validaNumero(this, event) });
    $("#qtdTmpLiqDiaIR").keypress(function(event){ return validaNumero(this, event)	});

    $("#fundamentoLegal").on("keyup",function(event){
        if ($("#fundamentoLegal").val().length > 150) {
            $("#fundamentoLegal").val($("#fundamentoLegal").val().slice(0,150));
            alertNew("Limite máximo de caracteres.");
            $("#fundamentoLegal_charsLeft").text(0);
            event.preventDefault();
        } else {
            $("#fundamentoLegal_charsLeft").text(150-$("#fundamentoLegal").val().length);
        }
    });

    $("#qtdeDescontos").keypress(function(event){ return validaNumero(this, event) });
    $("#tempoConsiderado").keypress(function(event){ return validaNumero(this, event) });

    $("#botaoAlterarInssRgps").click(function(){ alterarCertidaoTempoContribuicaoInssRgps() });
    $("#botaoExcluirInssRgps").click(function(){ excluirCertidaoTempoContribuicaoInssRgps() });
    $("#botaoInserirInssRgps").click(function(){ inserirCertidaoTempoContribuicaoInssRgps() });

    $("#botaoAlterarRppsEnte").click(function(){ alterarCertidaoTempoContribuicaoRppsEnte() });
    $("#botaoExcluirRppsEnte").click(function(){ excluirCertidaoTempoContribuicaoRppsEnte() });
    $("#botaoInserirRppsEnte").click(function(){ inserirCertidaoTempoContribuicaoRppsEnte() });

    $("#codAnalise").change(function(){ habilitarCamposExigencia() });

    $("#codDiretoriaOuRegional").change(function(){ habilitarCampoOutraDiretoriaRegional() });

    $("#botaoHistoricoFinanceiro").click(function(){ irParaTelaHistoricoFinanceiro() });

    $("#btnHistRequerimentoComprev").click(function(event){
        event.preventDefault();
        abrirJanelaHistoricoRequerimentoComprev()
    });

    // $("#btnVoltar").click(function(){ voltar() });
    // $("#btnGravar").click(function(){ gravarComprev() });
*/
}

// Inicialização - init
$(function(){
    init();
    initBtn();
});

function limparPeriodo(){
    $('#hiddenFlagAdicionarPeriodoCertidao').val('');
    $('#hiddenNumSeqReqCert').val('');
    $('#hiddenNumSeqReqCertDet').val('');

    $('#rgpsNumCertidao').prop("disabled", false);
    $('#rppsNumCertidao').prop("disabled", false);

    $('#rgpsDatIni').val('');
    $('#rgpsDatFim').val('');
    $('#rgpsNomEmpresa').val('');
    $('#rgpsTempoConsiderado').val('');
    $('#rgpsNumCertidao').val('');
    $('#rgpsQtdTmpLiqAno').val('');
    $('#rgpsQtdTmpLiqMes').val('');
    $('#rgpsQtdTmpLiqDia').val('');

    $('#rppsDatIni').val('');
    $('#rppsDatFim').val('');
    $('#rppsQtdDescontos').val('');
    $('#rppsTempoConsiderado').val('');
    $('#rppsNumCertidao').val('');

    $('#btnInserirPeriodoParaCertidao').hide();
    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnAdicionarPeriodo').hide();
    $('#btnInserirPeriodo').show();
}


function selecionarOpcaoAdicionarPeriodoParaEstaCertidao(){
    $('#hiddenFlagAdicionarPeriodoCertidao').val('true');

    $('#btnInserirPeriodoParaCertidao').show();
    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnAdicionarPeriodo').hide();

    if($('#codRegimeOrigem').val() === '1'){ //RGPS
        $('#rgpsDatIni').val('');
        $('#rgpsDatFim').val('');
        $('#rgpsNomEmpresa').val('');
        $('#rgpsTempoConsiderado').val('');
        //$('#rgpsNumCertidao').val();
        $('#rgpsQtdTmpLiqAno').val('');
        $('#rgpsQtdTmpLiqMes').val('');
        $('#rgpsQtdTmpLiqDia').val('');
    }else{
        $('#rppsDatIni').val('');
        $('#rppsDatFim').val('');
        $('#rppsQtdDescontos').val('');
        $('#rppsTempoConsiderado').val('');
    }
}





function validarCamposRGPS(){
    with (document.forms[0]) {
        let erros = '';
        // Validar se os campos estão obrigatórios estão preenchidos.
        if(rgpsDatIni.value  == ''){
            erros += "- O campo Início Período Considerado é obrigatório.\n";
        }
        if(rgpsDatFim.value  == ''){
            erros += "- O campo Fim do Período Considerado  é obrigatório.\n";
        }
        if(rgpsNomEmpresa.value  == ''){
            erros += "- O campo Empresa é obrigatório.\n";
        }
        if(rgpsTempoConsiderado.value  == ''){
            erros += "- O campo Tempo Considerado é obrigatório.\n";
        }
        if(rgpsQtdTmpLiqAno.value  == ''){
            erros += "- O campo Anos é obrigatório.\n";
        }
        if(rgpsQtdTmpLiqMes.value  == ''){
            erros += "- O campo Meses é obrigatório.\n";
        }
        if(rgpsQtdTmpLiqDia.value  == ''){
            erros += "- O campo Dias é obrigatório.\n";
        }

        if (erros != ""){
            return erros;
        }
        // Validar regras
        if(rgpsQtdTmpLiqMes.value > 11){
            erros += "- O campo Meses não pode ser maior que 11.\n";
        }
        if(rgpsQtdTmpLiqDia.value > 31){
            erros += "- O campo Dia não pode ser maior que 31.\n";
        }

        if(!ValidaData(rgpsDatIni.value)){
            erros += "- O campo Início Período Considerado não foi preenchido com uma data correta.\n";
        }

        if(!ValidaData(rgpsDatFim.value)){
            erros += "- O campo Fim Período Considerado não foi preenchido com uma data correta.\n";
        }

        if (erros != ""){
            return erros;
        }
        if(comparaDatas(rgpsDatIni.value, rgpsDatFim.value) > 1){
            erros = erros +"- " + rgpsDatIni.title + "(" + rgpsDatIni.value + ") deve ser menor que  a "+ rgpsDatFim.title + "(" + rgpsDatFim.value + ").\n";
        }

        return erros;
    }
}


function validarCamposRPPS(){
    with (document.forms[0]) {
        let erros = '';
        // Validar se os campos estão obrigatórios estão preenchidos.
        if(rppsDatIni.value  == ''){
            erros += "- O campo Início Período Considerado é obrigatório.\n";
        }
        if(rppsDatFim.value  == ''){
            erros += "- O campo Fim do Período Considerado  é obrigatório.\n";
        }
        if(rppsQtdDescontos.value  == ''){
            erros += "- O campo Qtde de Descontos é obrigatório.\n";
        }

        if(rppsTempoConsiderado.value  == ''){
            erros += "- O campo Tempo Considerado é obrigatório.\n";
        }
        if (erros != ""){
            return erros;
        }
        // Validar regras
        if(!ValidaData(rppsDatIni.value)){
            erros += "- O campo Início Período Considerado não foi preenchido com uma data correta.\n";
        }

        if(!ValidaData(rppsDatFim.value)){
            erros += "- O campo Fim Período Considerado não foi preenchido com uma data correta.\n";
        }

        if (erros != ""){
            return erros;
        }
        if(comparaDatas(rppsDatIni.value, rppsDatFim.value) > 1){
            erros = erros +"- " + rppsDatIni.title + "(" + rppsDatIni.value + ") deve ser menor que  a "+ rppsDatFim.title + "(" + rppsDatFim.value + ").\n";
        }

        return erros;
    }
}


function limparCamposPeriodoTempoServico(){
    $('#hiddenNumSeqReqCert').val('');
    $('#hiddenNumSeqReqCertDet').val('');

    $('#rgpsDatIni').val('');
    $('#rgpsDatFim').val('');
    $('#rgpsNomEmpresa').val('');
    $('#rgpsTempoConsiderado').val('');
    $('#rgpsNumCertidao').val('');
    $('#rgpsQtdTmpLiqAno').val('');
    $('#rgpsQtdTmpLiqMes').val('');
    $('#rgpsQtdTmpLiqDia').val('');

    $('#rppsDatIni').val('');
    $('#rppsDatFim').val('');
    $('#rppsQtdDescontos').val('');
    $('#rppsTempoConsiderado').val('');
    $('#rppsProtocoloCertidao').val('');

    $('#btnAlterarPeriodo').hide();
    $('#btnExcluirPeriodo').hide();
    $('#btnInserirPeriodoParaCertidao').hide();
    $('#btnInserirPeriodo').show();
}




function consultarApiComprev(params){
    $('#terceiroBlocoApiComprev').empty();
    $('#terceiroBlocoApiComprev').show();

    let paramsServico = {};
    paramsServico.codIdeCli = params.codIdeCli;

    $('#mensagemApiComprev').html();
    $('#btnRetornoApiComprev').hide();

    let jsonData = consumidor.executarServico("controleCompensacao/consultarApiComprev", paramsServico);

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

}


function deveMostrarBlocoDadosRequerimentoInseridosPelaTelaCadastro(params){

    let jsonData = consumidor.executarServico("controleCompensacao/isDeveMostrarBlocoDadosRequerimentoInseridosPelaTelaCadastro", params);

    if(jsonData.deveMostrarBlocoDadosRequerimentoInseridosPelaTelaCadastro === true){
        $('#blocoDadosRequerimentoInseridosPelaTelaCadastro').show();
    }else{
        $('#blocoDadosRequerimentoInseridosPelaTelaCadastro').hide();
    }


}


function carregarDocumentosExigencia(){

    $('#divDocumentosNecessariosExigencia').empty();

    let codAnalise = $('#codAnalise option:selected').val();




    if(codAnalise === '3'){ //Exigencia
        let params  = {};
        params.codBeneficio = $('#hiddenCodBeneficio').val();
        let jsonData = consumidor.executarServico("controleCompensacao/consultaExigenciaRequerimento", params);

        let conteudoTabela =  '<h2 class="mb-3"><i class="fa fa-file" aria-hidden="true"></i> Exigência do Requerimento</h2>';

        conteudoTabela     += '<table id="tabelaDocumentos" class="tabelaPaddingMenor">';
        conteudoTabela     += '<thead>';
        conteudoTabela     += '<th class="text-center col-md-1 col-sm-1">Faltante</th>';
        conteudoTabela     += '<th class="text-center col-md-1 col-sm-1">Ilegível</th>';
        conteudoTabela     += '<th>Documento</th>';
        conteudoTabela     += '</thead>';
        conteudoTabela     += '<tbody>';

        $.each(jsonData, function(eachIndice, eachExigencia){


            let isDeveMostrarExigencia = true;

            // if($('#codRegimeOrigem').val() === '2') { //  RPPS
            //     if(eachExigencia.codPar === '30'){
            //         isDeveMostrarExigencia = true
            //     }
            // }else if($('#codRegimeOrigem').val() === '1') { //RGPS
            //     if(eachExigencia.codPar === '20'){
            //         isDeveMostrarExigencia = true
            //     }
            // }

            // if(isDeveMostrarExigencia){
            conteudoTabela     += '<tr>';
            conteudoTabela     +=     '<td class="text-center">';
            conteudoTabela     +=          '<input type="checkbox" id="' + eachExigencia.codPar +'_Faltante" name="codExigenciaFaltante" value="'+ eachExigencia.codPar +'"'
            if(eachExigencia.flgStatus == 'F') {
                conteudoTabela     += 'checked = "checked"';
            }
            conteudoTabela     += ' onclick="desmarcarCheckBox(\'' + eachExigencia.codPar + '_Ilegivel\');habilitarCampoDocumentoDescricao()"/>';
            conteudoTabela     +=     '</td>';

            conteudoTabela     +=     '<td class="text-center">';
            conteudoTabela     +=          '<input type="checkbox" id="' + eachExigencia.codPar +'_Ilegivel" name="codExigenciaIlegivel" value="'+ eachExigencia.codPar +'"'
            if(eachExigencia.flgStatus == 'I') {
                conteudoTabela     += 'checked = "checked"';
            }
            conteudoTabela     += ' onclick="desmarcarCheckBox(\'' + eachExigencia.codPar + '_Faltante\');habilitarCampoDocumentoDescricao()"/>';
            conteudoTabela     +=     '</td>';

            // if(eachExigencia.desDescricao.includes("Outro 1")){
            //     conteudoTabela     +=     '<td><input type="text" id="nomOutros998" class="form-control" disabled="true"/> Nova Exigência 1</td>';
            // }else if(eachExigencia.desDescricao.includes("Outro 2")){
            //     conteudoTabela     +=     '<td><input type="text" id="nomOutros999" class="form-control" disabled="true"/> Nova Exigência 2</td>';
            // }else{
            conteudoTabela     +=     '<td>' + eachExigencia.desDescricao + '</td>';
            // }

            conteudoTabela     += '</tr>';

            // }

        });
        conteudoTabela     += '</tbody>';
        conteudoTabela     += '</table>';

        $('#divDocumentosNecessariosExigencia').append(conteudoTabela);
    }

    preencherDocumentosExigencia();
}


function habilitarCampoDocumentoDescricao(){

    if($('input[name=codExigenciaFaltante][value=998]').is(':checked') === true
        || $('input[name=codExigenciaIlegivel][value=998]').is(':checked') === true){
        $('#nomOutros998').prop("disabled",false);
    }else{
        $('#nomOutros998').val('');
        $('#nomOutros998').prop("disabled",true);
    }

    if($('input[name=codExigenciaFaltante][value=999]').is(':checked') === true
        || $('input[name=codExigenciaIlegivel][value=999]').is(':checked') === true){
        $('#nomOutros999').prop("disabled",false);
    }else{
        $('#nomOutros999').val('');
        $('#nomOutros999').prop("disabled",true);
    }

}

function preencherDocumentosExigencia(){
    let codAnalise = $('#codAnalise option:selected').val();

    if(codAnalise === '3') { //Exigencia

        let params = {};
        params.numSeqReq = $('#hiddenNumSeqReq').val();

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

        habilitarCampoDocumentoDescricao();
    }
}

function atualizarPagina(){
    if(confirm("Deseja atualizar a página? Todas as informações preenchidas não gravadas serão descartadas.")){
        let urlParam = PAGINA_REQUERIMENTO;
        urlParam     += "?numCpf="        + $('#hiddenNumCpf').val();
        urlParam     += "&codIdeCli="     + $('#hiddenCodIdeCli').val();
        urlParam     += "&numSeqFunc="    + $('#hiddenNumSeqFunc').val();
        urlParam     += "&numMatricula="  + $('#hiddenNumMatricula').val();
        urlParam     += "&codIdeRelFunc=" + $('#hiddenCodIdeRelFunc').val();

        urlParam     += "&numSeqBeneficio="    +  $('#hiddenNumSeqBeneficio').val();
        urlParam     += "&numSeqReq="          +  $('#hiddenNumSeqReq').val();
        window.location.href = urlParam;
    }

}

function mascaraNumTce(id){
    var numProc = document.getElementById(id).value;
    var numProcForm;

    var barra = "/";
    if(numProc.length == 6){
        numProcForm = numProc + barra;
        document.getElementById(id).value = numProcForm;
        return true;
    }
    if(numProc.length == 10){
        numProcForm = numProc + barra;
        document.getElementById(id).value = numProcForm;
        return true;
    }
}

function habilitarBotaoHistoricoFinanceiro(params){
    let jsonData = consumidor.executarServico("controleCompensacao/consultarBeneficioComprev", params);
    let beneficio = jsonData.beneficio; //Por enquanto, existirá apenas 1 benefício por beneficiário, será necessário adaptação no futuro.

    let paramsHistoricoFinanceiro = {};
    paramsHistoricoFinanceiro.codBeneficio = beneficio.codBeneficio;
    //paramsHistoricoFinanceiro.codBeneficio = '40054507';
    let jsonDataHistoricoFinanceiro = consumidor.executarServico("controleCompensacao/deveHabilitarBotaoHistoricoFinanceiro", paramsHistoricoFinanceiro);
    with (document.forms[0]) {
        if (jsonDataHistoricoFinanceiro.isDeveHabilitarBotaoHistoricoFinanceiro === true) {
            botaoHistoricoFinanceiro.disabled = false;
        } else {
            botaoHistoricoFinanceiro.disabled = true;
        }
    }
}

function abrirTelaHistoricoFinanceiro(){
    let urlParam = PAGINA_HISTORICO_FINANCEIRO;
    urlParam     += "?numCpf="          + $('#hiddenNumCpf').val();
    urlParam     += "&codIdeCli="       + $('#hiddenCodIdeCli').val();
    urlParam     += "&numSeqFunc="      + $('#hiddenNumSeqFunc').val();
    urlParam     += "&numMatricula="    + $('#hiddenNumMatricula').val();
    urlParam     += "&codIdeRelFunc="   + $('#hiddenCodIdeRelFunc').val();
    urlParam     += "&numSeqBeneficio=" + $('#hiddenNumSeqBeneficio').val();
    urlParam     += "&codBeneficio="    + $('#hiddenCodBeneficio').val();

    urlParam     += "&nomCargo="              + $('#hiddenNomCargo').val();
    urlParam     += "&nomEntidade="           + $('#hiddenNomEntidade').val();
    urlParam     += "&datIniBen="             + $('#datIniBenComprev').val();
    urlParam     += "&codTipoDocCompensacao=" + $('input[name=codTipoDocCompensacao]:checked').val();
    urlParam     += "&codTipoMatrComprev="    + $('input[name=codTipoMatrComprev]:checked').val();

    window.open(urlParam,'pagina',"width=600, height=555, top=100, left=110, scrollbars=no ");
}


function obterCamposPreenchidosTela(){
    const date = new Date();
    const data = date.getDate();
    let params = {};

    params.codIns = getCookieSigeprev('cookieCodIns');
    params.login  = getCookieSigeprev('cookieLogin');

    params.codIdeCli          = $('#hiddenCodIdeCli').val();
    params.numSeqFunc         = $('#hiddenNumSeqFunc').val();
    params.numSeqBeneficio    = $('#hiddenNumSeqBeneficio').val();
    params.numSeqReq          = $('#hiddenNumSeqReq').val();

    //DADOS BÁSICOS SERVIDOR E VÍNCULO
    params.numRg                 = $('#numRg').val();
    params.datIngServPublico     = $('#datIngServPublico').val();
    params.numCnpj               = $('#numCnpj').val();
    params.numMatricula          = $('#hiddenNumMatricula').val();

    params.numCpf                = $('#numCpf').text();
    params.nomPessoaFisica       = $('#nomPessoaFisica').text();
    params.codCargo              = $('#nomCargo').text();
    params.nomMae                = $('#nomMae').text();
    params.datNasc               = $('#datNasc').text();
    params.numPis                = $('#numPis').text();
    params.nomEntidade           = $('#nomEntidade').text();

    params.datIniEstatutarioEfetivo  = $('#datIniEstatutarioEfetivo').val();
    params.flgLicenca               = $('input[name=flgLicenca]:checked').val();

    params.listaLsv = JSON.stringify(arrayRegistrosLsv);

    params.codTipoDocCompensacao = $('input[name=codTipoDocCompensacao]:checked').val();
    params.codTipoMatrComprev    = $('input[name=codTipoMatrComprev]:checked').val();
    params.numMatricula          = $('#hiddenNumMatricula').val();
    params.codSexo               = $('input[name=codSexo]:checked').val();
    params.datUltAtu             = data.toString();

    //DADOS DO BENEFÍCIO
    params.codBeneficio             =  $('#codBeneficio').val();
    params.codBeneficioExt          =  $('#hiddenCodBeneficioExt').val();
    params.desTipoTramite           =  $('#hiddenDesTipoTramite').val();
    params.desTipoBeneficio         =  $('#hiddenDesTipoBeneficio').val();
    params.datConcessao             =  $('#hiddenDatConcessao').val();

    params.flgStatus                =  $('#flgStatus').val();
    params.codTipoBeneficioComprev  =  $('#codTipoBeneficioComprev').val();
    params.datCessacaoComprev       =  $('#datCessacaoComprev').val();

    params.flgDoencaCoberturaIntegral          = $('#flgDoencaCoberturaIntegral').val();
    params.flgDoencaDecorrenteAcidenteTrabalho = $('#flgDoencaDecorrenteAcidenteTrabalho').val();

    params.valBeneficioComprev      =  $('#valBeneficioComprev').val();
    params.codMotCessacao           =  $('#codMotCessacao').val();
    params.dscFundLegalComprev      =  $('#dscFundLegalComprev').val();
    params.numProcBen               =  $('#numProcBen').val();
    params.flgFiscalizacaoTcComprev =  $('#flgFiscalizacaoTcComprev').val();
    params.datIniBenComprev         =  $('#datIniBenComprev').val();
    params.numProcessoTcComprev     =  $('#numProcessoTcComprev').val();
    params.qtdTmpLiqDiaTotal        =  $('#qtdTmpLiqDiaTotal').val();
    params.numCertidaoTc            =  $('#numCertidaoTc').val();
    params.datIngServPublicComprev  = $('#datIngServPublicComprev').val();

    if($('#flgSemRegistro').is(':checked')){
        params.flgSemRegistro = $('#flgSemRegistro').val();
    }else{
        params.flgSemRegistro = '';
    }

    if($('#flgSemCertHomolog').is(':checked')){
        params.flgSemCertHomolog =  $('#flgSemCertHomolog').val();
    }else{
        params.flgSemCertHomolog = '';
    }

    params.codTipoCalcParidComprev =  $('#codTipoCalcParidComprev').val();
    params.datHomolTc              =  $('#datHomolTc').val();
    params.codTipoCompensacao      =  $('#codTipoCompensacao').val();

    //LOCALIZAÇÃO DO ARQUIVO
    params.numProtInterno = $('#numProtInterno').val();
    params.numCaixa = $('#numCaixa').val();
    params.numPosicao = $('#numPosicao').val();

    if($('#flgDocLocDigit').is(':checked')){
        params.flgDocLocDigit = $('#flgDocLocDigit').val();
    }else{
        params.flgDocLocDigit = '';
    }

    // DESTINAÇÃO/REGIME ORIGEM E TEMPO
    params.numTempContribRegOrig = $('#numTempContribRegOrig').val();
    params.numTempContribRegOrigConcessor = $('#numTempContribRegOrigConcessor').val();
    params.datDesvRegOrig        = $('#datDesvRegOrig').val();
    params.datIngRegOrig         = $('#datIngRegOrig').val();

    params.codRegimeOrigem     = $('#codRegimeOrigem').val();
    params.codEsferaRegOrigem  = $('#codEsferaRegOrigem').val();
    params.codUfComprev        = $('#codUfComprev').val();
    params.codMunicipioComprev = $('#codMunicipioComprev').val();
    params.numSeqParticipante     = $('#numSeqParticipante').val();

    //Tratamento Requerimento de Compensacao
    params.codAnalise           = $('#codAnalise option:selected').val();
    params.codSobrestado        = $('#codSobrestado').val();
    params.desObsAnaliseComprev = $('#desObsAnaliseComprev').val();

    //Histórico de Importação
    params.regImportacaoComprevLegado = $('#regImportacaoComprevLegado').val();
    if($('#flgVerificadoImpComprevLegado').is(':checked')){
        params.flgVerificadoImpComprevLegado = $('#flgVerificadoImpComprevLegado').val();
    }else{
        params.flgVerificadoImpComprevLegado = '';
    }

    //Acompanhamento Requerimento de Compensação
    params.numProtocoloCompen      = $('#numProtocoloCompen').val();
    params.datAbertReq             = $('#datAbertReq').val();
    params.codEstadoReq            = $('#codEstadoReq').val();
    params.datCompensacao          = $('#datCompensacao').val();

    var valProRataConcessao        = $('#valProRataConcessao').val();

    if(valProRataConcessao.indexOf("R$") > -1){
        var valProRataConcessaoFormat = valProRataConcessao.replace(/[^0-9]/g, '');
        params.valProRataConcessao = valProRataConcessaoFormat;
    } else {
        params.valProRataConcessao     = $('#valProRataConcessao').val();
    }

    var valProRataAtualizada       = $('#valUltProRataAtualizada').val();

    if(valProRataAtualizada.indexOf("R$") > -1){
        var valProRataAtualizadaFormat = valProRataAtualizada.replace(/[^0-9]/g, '');
        params.valUltProRataAtualizada = valProRataAtualizadaFormat;
    } else {
        params.valProRataConcessao = $('#valProRataConcessao').val();
    }

    params.datUltComptProRata      = $('#datUltComptProRata').val();

    //Histórico Jabol
    params.codStatusReqLegado = $('#codStatusReqLegado').val();

    //Atualizao de dados ja ta gravando la em cima, com o login e a dat atual por de baixo dos panos.



    let arrayExigenciasFaltante = [];
    $('input[name=codExigenciaFaltante]:checked').each(function (){
        arrayExigenciasFaltante.push($(this).val());
    });

    let arrayExigenciasIlegivel = [];
    $('input[name=codExigenciaIlegivel]:checked').each(function (){
        arrayExigenciasIlegivel.push($(this).val());
    });


    params.arrayExigenciasFaltante = arrayExigenciasFaltante.toString();
    params.arrayExigenciasIlegivel = arrayExigenciasIlegivel.toString();

    params.nomOutros998 = $('#nomOutros998').val();
    params.nomOutros999 = $('#nomOutros999').val();


    params.certidoes = JSON.stringify(arrayPeriodosComprev);

    params.listaExigenciasBeneficio = JSON.stringify(arrayExigenciasBeneficio);

    return params;
}
function imprimirRequerimento(){
    let req = new XMLHttpRequest();
    let paramUrl = urlDominioBackEnd + urlContextoBackEnd + '/controleCompensacao/imprimirRequerimentoPdf'
    let params = obterCamposPreenchidosTela();

    req.open("POST", paramUrl, true);
    req.responseType = "blob"
    req.onload = function (event) {
        let blob = req.response;
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download= 'Requerimento.pdf';
        link.click();
    };
    req.send(JSON.stringify(params));
}

function excluirCallBack(simNao){

    if(!simNao)
        return;

    let param = {};
    param.codBeneficio = $('#codBeneficio').val();
    param.numSeqReq = $('#hiddenNumSeqReq').val();
    param.tipoReq = $('input[name=codTipoDocCompensacao]:checked').val();

    var msg = consumidor.executarServico("cadastroRequerimento/cancelarRequerimentoApo", param);

    if(msg != undefined && msg.codigoResultado == 0){
        alertSigePrev2comCallback2("Requerimento excluido com sucesso!", redirecionarParaPrimeiraPagina);
    }else{
        alertSigePrev2(msg.mensagemResultado);
    }
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

function excluirReqApo(){

    erros = "";
    let codPar = "1";

    validaCampo2Novo(numSeqParticipante, 'S');

    if (erros != "") {
        codPar = "3";
    }

    let objMsg = buscarMsg(codPar);

    if(objMsg != undefined && objMsg != "" && objMsg.codigos.length > 0){
        objMsg.codigos[0].desDescricao = objMsg.codigos[0].desDescricao.replace("$P{destinacaoregimeorigem}", $("#numSeqParticipante :selected").text());
    }

    confirmSigeprev2(objMsg.codigos[0].desDescricao, "excluirCallBack");
}

function buscarMsg(codPar){
    let msg = "";
    let param = {};
    param.codNum = "30213";
    param.codPar = codPar;
    msg = consumidor.executarServico("cadastroRequerimento/consultarCodigo", param);
    return msg;
}

function redirecionarParaPrimeiraPagina() {
    let urlParam = PAGINA_CONSULTA_REQUERIMENTO;
    urlParam += "?numCpf=" + $('#hiddenNumCpf').val();
    urlParam += "&codIdeCli=" + $('#hiddenCodIdeCli').val();
    urlParam += "&numSeqFunc=" + $('#hiddenNumSeqFunc').val();
    urlParam += "&numMatricula=" + $('#hiddenNumMatricula').val();
    urlParam += "&codIdeRelFunc=" + $('#hiddenCodIdeRelFunc').val();

    urlParam += "&numSeqBeneficio=" + $('#hiddenNumSeqBeneficio').val();
    urlParam += "&numSeqReq=" + $('#hiddenNumSeqReq').val();
    window.location.href = urlParam;
}