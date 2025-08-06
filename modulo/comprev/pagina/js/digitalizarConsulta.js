var protocoloComZero1;
var isTipoProtocoloBeneficioTela;

function init() {
    with (document.forms[0]) {
        setaMascara(numCPF, MASK_CPF);
        carregarComboBox(comboGrupoDeDocumentos);
        //arquivosCarregados();
        esconderTableBeneficio();
    }
    $("#numProtocolo").keypress(function (event) {
        return validaNumero(this, event)
    });
    $("#numBeneficio").keypress(function (event) {
        return validaNumero(this, event)
    });

    $("#aguarde").load("../../../../componenteGenerico/html/aguardeBootstrap.html");

    // dialogMsg();

    $("#limpar").bind("click", function () {
        $('#segundadiv').hide();
        $('#comboGrupoDeDocumentos').prop('selectedIndex', 0);
        $('#numProtocolo').val("");
        $('#numCpf').val("");
        $('#numBeneficio').val("");
    });
}

function primeiraFunction() {
    if($("#comboGrupoDeDocumentos option:selected").val() == '10'){
        $("#pesquisaProtocolo").hide();
        $("#botaoAbaProtocolo").hide();
        mostrarTableBeneficio();
    }else{
        $("#pesquisaProtocolo").show();
    }
    $('#primeiradiv').show();
}

function mostrarAbaBeneficio() {
    document.getElementById("botaoAbaProtocolo").classList.remove('active');
    document.getElementById("abaProtocolo").classList.remove('active');
    document.getElementById("botaoAbaBeneficio").classList.add('active');
    document.getElementById("abaBeneficio").classList.add('active');
    $('#alterarIndicesBtnBeneficio').show();
    $('#alterarIndicesBtnProtocolo').hide();
    $('#botaoAbaProtocolo').hide();
}

function mostrarAbaProtocolo() {
    $('#botaoAbaBeneficio').hide();
    $('#alterarIndicesBtnBeneficio').hide();
    $('#alterarIndicesBtnProtocolo').show();
}

function mostraDialogo(mensagem, tipo, tempo) {
    if ($("#message").is(":visible")) { // se houver outro alert desse sendo exibido, cancela essa requisição
        return false;
    }
    if (!tempo) { // se não setar o tempo, o padrão é 3 segundos
        var tempo = 3000;
    }
    if (!tipo) { // se não setar o tipo, o padrão é alert-info
        var tipo = "info";
    }

    // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
    var cssMessage = "display: block; position: fixed; top: 0; left: 20%; right: 20%; width: 60%; padding-top: 10px; z-index: 9999";
    var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black;";

    // monta o html da mensagem com Bootstrap
    var dialogo = "";
    dialogo += '<div id="message" style="' + cssMessage + '">';
    dialogo += '    <div class="alert alert-' + tipo + ' alert-dismissable" style="' + cssInner + '">';
    dialogo += '    <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>';
    dialogo += mensagem;
    dialogo += '    </div>';
    dialogo += '</div>';

    // adiciona ao body a mensagem com o efeito de fade
    $("body").append(dialogo);
    $("#message").hide();
    $("#message").fadeIn(200);

    // contador de tempo para a mensagem sumir
    setTimeout(function () {
        $('#message').fadeOut(3000, function () {
            $(this).remove();
        });
    }, tempo); // milliseconds

}

//TODO configurar funcao para popular combo box com dados vindos do banco
function carregarComboBox(comboGrupoDeDocumentos) {
    let valorSelecionado = $('#comboGrupoDeDocumentos :checked').val();
    limparComboBox(comboGrupoDeDocumentos, valorSelecionado);
    let settings = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/grupoDeDocumentos",
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settings).done(function (response) {
        let keys = Object.keys(response);
        response = response[keys[0]];
        limparComboBox(comboGrupoDeDocumentos, valorSelecionado);
        response.forEach(elemento => {
            let elementKeys = Object.keys(elemento);
            if (valorSelecionado != undefined && valorSelecionado != null && valorSelecionado != '' && valorSelecionado == elemento[elementKeys[0]]) {
               	$(comboGrupoDeDocumentos).append("<option value='" + elemento[elementKeys[0]] + "' selected>" + elemento[elementKeys[1]] + "</option>");
            } else {
               	$(comboGrupoDeDocumentos).append("<option value='" + elemento[elementKeys[0]] + "'>" + elemento[elementKeys[1]] + "</option>");
            }
        });
    });
}

//TODO configurar funcao para popular combo box com dados vindos do banco
function carregarComboBoxFiliais() {
    let valorSelecionado = $('#inputIndiceEditavelProtocoloFilial :checked').text();
    limparComboBoxFiliais(valorSelecionado);
    let settingsFiliais = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarFiliais",
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsFiliais).done(function (response) {
        let keysFiliais = Object.keys(response);
        response = response[keysFiliais[0]];
        limparComboBoxFiliais(valorSelecionado);
        response.forEach(elemento => {
            let elementKeys = Object.keys(elemento);
            if (valorSelecionado != undefined && valorSelecionado != null && valorSelecionado != '' && valorSelecionado == elemento[elementKeys[0]]) {
                $('#inputIndiceEditavelProtocoloFilial').append("<option value='" + elemento[elementKeys[0]] + "' selected>" + elemento[elementKeys[1]] + "</option>");
            } else {
                $('#inputIndiceEditavelProtocoloFilial').append("<option value='" + elemento[elementKeys[0]] + "'>" + elemento[elementKeys[1]] + "</option>");
            }
        });
    });
}

function limparComboBox(comboGrupoDeDocumentos, valorSelecionado) {
    $(comboGrupoDeDocumentos).empty();
    let selecioneField = "Selecione";
    let selecione = (valorSelecionado != undefined || valorSelecionado == null || valorSelecionado != '' ? "selected" : "");
    $(comboGrupoDeDocumentos).append("<option value='' " + selecione + ">" + selecioneField + "</option>");
}

function limparComboBoxFiliais(valorSelecionado) {
    $('#inputIndiceEditavelProtocoloFilial').empty();
    let selecioneField = "Selecione";
    let selecione = (valorSelecionado != undefined || valorSelecionado == null || valorSelecionado != '' ? "selected" : "");
    $('#inputIndiceEditavelProtocoloFilial').append("<option value='' " + selecione + ">" + selecioneField + "</option>");
}

function consultarPorProtocolo(params) {
    isTipoProtocoloBeneficioTela = 'Protocolo';
    if ($('#comboGrupoDeDocumentos').val() < 1) {
        alertNew('Selecione um grupo de documento');
    }
    $('#limpar').show();
    $('#divVoltar').show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $('#alterarIndicesBtnBeneficio').hide();
    $('#alterarIndicesBtnProtocolo').show();
    $("#indices").empty();
    $("#tableProtocolo").children('tbody').empty();
    $("#abaBeneficio").hide();
    let settingsConsultarPorProtocolo = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarPorProtocolo" + "?protocolo=" + params,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsConsultarPorProtocolo).done(function (response) {
        let keysConsultarPorProtocolo = Object.keys(response);
        responseConsultarPorProtocolo = response[keysConsultarPorProtocolo[0]];
        if (responseConsultarPorProtocolo.length == 0 || responseConsultarPorProtocolo === undefined || responseConsultarPorProtocolo === null || responseConsultarPorProtocolo === '') {
            $('#abaProtocolo').hide();
            $('#botaoAbaProtocolo').hide();
            $('#protBeneNaoEncontradoProtocolo').show();
            $("#nomeServidor").text("");
        } else if (responseConsultarPorProtocolo.length > 0) {
            $('#protBeneNaoEncontradoProtocolo').hide();
            $('#abaProtocolo').show();
            $('#botaoAbaProtocolo').show();
            $('#tableProtocolo').show();
            let bodyTabeProtocolo = "";
            responseConsultarPorProtocolo.forEach(elementoConsultarPorProtocolo => {
                let protocolo = elementoConsultarPorProtocolo.protocolo;
                consultarNomeProtocolo(protocolo);
                bodyTabeProtocolo += "<tr id='trTableProtocolo'> <td><input type='radio' name='inputProtocolo' value = '" + elementoConsultarPorProtocolo.protocolo + "' id='" + elementoConsultarPorProtocolo.protocolo + "' onclick='receberIndicesCpfProtocolo(); carregarComboBoxFiliais();'/> </td> <td>" + "<p>" + elementoConsultarPorProtocolo.protocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorProtocolo.tipoSolicitacaoProtocolo + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorProtocolo.dataSolicitacaoProtocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorProtocolo.statusSolicitacaoProtocolo + "</p>" + "</td> </tr>";
            });
            $("#tableProtocolo").children('tbody').append(bodyTabeProtocolo);
        }
    });
    $.ajax(settingsConsultarPorProtocolo).error(function (response) {
        $('#abaProtocolo').hide();
        $('#botaoAbaProtocolo').hide();
        $("#trTableProtocolo").empty();
        $('#protBeneNaoEncontradoProtocolo').show();
    });
}

function consultarPorBeneficio(params) {
    isTipoProtocoloBeneficioTela = 'Beneficio';
    if ($('#comboGrupoDeDocumentos').val() < 1) {
        alertNew('Selecione um grupo de documento');
    }
    $('#limpar').show();
    $('#divVoltar').show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $('#alterarIndicesBtnBeneficio').show();
    $('#alterarIndicesBtnProtocolo').hide();
    $("#abaProtocolo").hide();
    $("#indices").empty();
    $("#tableBeneficio").children('tbody').empty();
    let settingsConsultarPorBeneficio = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarPorBeneficio" + "?beneficio=" + params,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsConsultarPorBeneficio).done(function (response) {
        let keysConsultarPorBeneficio = Object.keys(response);
        responseConsultarPorBeneficio = response[keysConsultarPorBeneficio[0]];
        if (responseConsultarPorBeneficio.length == 0 || responseConsultarPorBeneficio === undefined || responseConsultarPorBeneficio === null || responseConsultarPorBeneficio === '') {
            $('#abaBeneficio').hide();
            $('#botaoAbaBeneficio').hide();
            $('#protBeneNaoEncontradoBeneficio').show();
            $("#nomeServidor").text("");
            $("#limpar").bind("click", function () {
                $('#segundadiv').hide();
                $('#comboGrupoDeDocumentos').prop('selectedIndex', 0);
                document.getElementById('numProtocolo').value = ''
                document.getElementById('numCpf').value = ''
                document.getElementById('numBeneficio').value = ''
            });
        } else if (responseConsultarPorBeneficio.length > 0) {
            $('#protBeneNaoEncontradoBeneficio').hide();
            $('#abaBeneficio').show();
            $('#botaoAbaBeneficio').show();
            $('#tableBeneficio').show();
            let bodyTabeBeneficio = "";
            responseConsultarPorBeneficio.forEach(elementoConsultarPorBeneficio => {
                let beneficio = elementoConsultarPorBeneficio.beneficio;
                consultarNomeBeneficio(beneficio);
                bodyTabeBeneficio += " <tr id='trTableBeneficio'> <td><input type='radio' name='inputBeneficio' value = '" + elementoConsultarPorBeneficio.beneficio + "' id='" + elementoConsultarPorBeneficio.beneficio + "' onclick='receberIndicesCpfBeneficio();'> </td> <td>" + "<p>" + elementoConsultarPorBeneficio.beneficio + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorBeneficio.tipoBeneficio + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorBeneficio.dataConcessaoBeneficio + "</p>" + "</td> </tr>";
            });
            $("#tableBeneficio").children('tbody').append(bodyTabeBeneficio);
        }
    });
    $.ajax(settingsConsultarPorBeneficio).error(function (response) {
        $('#abaBeneficio').hide();
        $('#botaoAbaBeneficio').hide();
        $("#trTableBeneficio").empty();
        $('#protBeneNaoEncontradoBeneficio').show();
        $("#nomeServidor").text("");
    });
}

//TODO configurar funcao para popular combo box com dados vindos do banco
async function consultarPorCpfProtocolo(params) {
    let isExisteProtocolo = false;
    isTipoProtocoloBeneficioTela = 'Protocolo';
    if ($('#comboGrupoDeDocumentos').val() < 1) {
        alertNew('Selecione um grupo de documento');
    }
    $('#limpar').show();
    $('#divVoltar').show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $("#indices").empty();
    $("#tableProtocolo").children('tbody').empty();
    let cpfSemMascara = params.replace(/[^\d]+/g, '');
    let settingsConsultarPorCpfProtocolo = {
        url:
            urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarPorCpfProtocolo" + "?numCpf=" + cpfSemMascara,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    await $.ajax(settingsConsultarPorCpfProtocolo).done(function (response) {
        let keysConsultarPorCpfProtocolo = Object.keys(response);
        responseConsultarPorCpfProtocolo = response[keysConsultarPorCpfProtocolo[0]];
        if (responseConsultarPorCpfProtocolo.length == 0 || responseConsultarPorCpfProtocolo == undefined || responseConsultarPorCpfProtocolo == null || responseConsultarPorCpfProtocolo == '') {
            $('#abaProtocolo').hide();
            $('#botaoAbaProtocolo').hide();
            $('#protBeneNaoEncontradoProtocolo').show();
            $("#nomeServidor").text("");
            $("#limpar").bind("click", function () {
                $('#segundadiv').hide();
                document.getElementById('numProtocolo').value = ''
                document.getElementById('numCpf').value = ''
                document.getElementById('numBeneficio').value = ''
            });
        } else if (responseConsultarPorCpfProtocolo.length > 0) {
            isExisteProtocolo = true;
            $('#protBeneNaoEncontradoProtocolo').hide();
            $('#abaProtocolo').show();
            $('#botaoAbaProtocolo').show();
            let bodyTableProtocolo = '';
            responseConsultarPorCpfProtocolo.forEach(elementoConsultarPorCpfProtocolo => {
                let protocolo = elementoConsultarPorCpfProtocolo.protocolo;
                consultarNomeProtocolo(protocolo);
                bodyTableProtocolo += " <tr id='trTableProtocolo'> <td><input type='radio' value='" + protocolo + "'name='inputProtocolo' id='" + protocolo + "' onclick='receberIndicesCpfProtocolo(); carregarComboBoxFiliais();'> </td> <td>" + "<p>" + elementoConsultarPorCpfProtocolo.protocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCpfProtocolo.tipoSolicitacaoProtocolo + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorCpfProtocolo.dataSolicitacaoProtocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCpfProtocolo.statusSolicitacaoProtocolo + "</p>" + "</td> </tr>";
            });
            $("#tableProtocolo").children('tbody').append(bodyTableProtocolo);
        }
    });
    $.ajax(settingsConsultarPorCpfProtocolo).error(function (response) {
        $('#abaProtocolo').hide();
        $('#botaoAbaProtocolo').hide();
        $("#tableProtocolo").empty();
        $('#protBeneNaoEncontradoProtocolo').show();
        $("#nomeServidor").text("");
    });
    return isExisteProtocolo;
}

function consultarPorCodIdeCliProtocolo(_codIdeCli) {
    isTipoProtocoloBeneficioTela = 'Protocolo';
    if ($('#comboGrupoDeDocumentos').val() < 1) {
        alertNew('Selecione um grupo de documento');
    }
    $('#limpar').show();
    $('#divVoltar').show();
    $(trArquivosCarregadosNome).empty();
    $(trArquivosCarregadosValor).empty();
    $(indices).empty();
    $(trTableProtocolo).empty();
    $(trTableBeneficio).empty();
    $(botaoAbaProtocolo).show();
    $(botaoAbaBeneficio).show();
    let codIdeCli = _codIdeCli
    let settingsConsultarPorCodIdeCliProtocolo = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarPorCodIdeCliProtocolo" + "?codIdeCli=" + codIdeCli,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsConsultarPorCodIdeCliProtocolo).done(function (response) {
        let keysConsultarPorCodIdeCliProtocolo = Object.keys(response);
        responseConsultarPorCodIdeCliProtocolo = response[keysConsultarPorCodIdeCliProtocolo[0]];
        if (responseConsultarPorCodIdeCliProtocolo.length == 0 || responseConsultarPorCodIdeCliProtocolo == undefined || responseConsultarPorCodIdeCliProtocolo == null || responseConsultarPorCodIdeCliProtocolo == '') {
            $('#abaProtocolo').hide();
            $('#protBeneNaoEncontradoProtocolo').show();
            $("#limpar").bind("click", function () {
                $('#segundadiv').hide();
                $('#comboGrupoDeDocumentos').prop('selectedIndex', 0);
                document.getElementById('numProtocolo').value = ''
                document.getElementById('numCpf').value = ''
                document.getElementById('numBeneficio').value = ''
            });
        } else if (responseConsultarPorCodIdeCliProtocolo.length > 0) {
            $('#abaProtocolo').show();
            $('#protBeneNaoEncontradoProtocolo').hide();
            responseConsultarPorCodIdeCliProtocolo.forEach(elementoConsultarPorCodIdeCliProtocolo => {
                let elementKeysConsultarPorCpfProtocolo = Object.keys(elementoConsultarPorCodIdeCliProtocolo);
                let protocolo = elementoConsultarPorCodIdeCliProtocolo.protocolo;
                consultarNomeProtocolo(protocolo);
                $(tableProtocolo).append(" <tr id='trTableProtocolo'> <td><input type='radio' value='" + protocolo + "'name='inputProtocolo' id='" + protocolo + "' onclick='receberIndicesCpfProtocolo(); carregarComboBoxFiliais();'> </td> <td>" + "<p>" + elementoConsultarPorCodIdeCliProtocolo.protocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCodIdeCliProtocolo.tipoSolicitacaoProtocolo + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorCodIdeCliProtocolo.dataSolicitacaoProtocolo + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCodIdeCliProtocolo.statusSolicitacaoProtocolo + "</p>" + "</td> </tr>");
                //$(tableBeneficio).append(" <tr> <td><input type='radio' name='consultarPorCpfProtocolo' id=''> </td> <td>" + "<p>" + elementoConsultarPorCpfProtocolo.beneficio + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCpfProtocolo.tipoBeneficio + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorCpf.dataConcessaoBeneficio + "</p>" + "</td> </tr>" );
            });
        }
    });
}

//TODO configurar funcao para popular combo box com dados vindos do banco
async function consultarPorCpfBeneficio(params) {
    let isExisteBeneficio = false;
    isTipoProtocoloBeneficioTela = 'Beneficio';
    $('#limpar').show();
    $('#divVoltar').show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $("#indices").empty();
    $("#tableBeneficio").children('tbody').empty();
    let cpfSemMascara = params.replace(/[^\d]+/g, '');
    let settingsConsultarPorCpfBeneficio = {
        url: //"http://localhost:8082/digitalizarConsulta/consultarPorCpfProtocolo?numCpf=32007795868",
            urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/consultarPorCpfBeneficio" + "?numCpf=" + cpfSemMascara,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    await $.ajax(settingsConsultarPorCpfBeneficio).done(function (response) {
        let keysConsultarPorCpfBeneficio = Object.keys(response);
        responseConsultarPorCpfBeneficio = response[keysConsultarPorCpfBeneficio[0]];
        if (responseConsultarPorCpfBeneficio.length == 0 || responseConsultarPorCpfBeneficio == undefined || responseConsultarPorCpfBeneficio == null || responseConsultarPorCpfBeneficio == '') {
            $('#abaBeneficio').hide();
            $('#protBeneNaoEncontradoBeneficio').show();
            $('#botaoAbaBeneficio').hide();
            $("#nomeServidor").text("");
            $("#limpar").bind("click", function () {
                $('#segundadiv').hide();
                document.getElementById('numProtocolo').value = ''
                document.getElementById('numCpf').value = ''
                document.getElementById('numBeneficio').value = ''
            });
        } else if (responseConsultarPorCpfBeneficio.length > 0) {
            isExisteBeneficio = true;
            $('#abaBeneficio').show();
            $('#protBeneNaoEncontradoBeneficio').hide();
            let bodyTableBeneficio = '';
            responseConsultarPorCpfBeneficio.forEach(elementoConsultarPorCpfBeneficio => {
                let beneficio = elementoConsultarPorCpfBeneficio.beneficio;
                consultarNomeBeneficio(beneficio);
                bodyTableBeneficio += " <tr id='trTableBeneficio'> <td><input type='radio' value='" + beneficio + "'name='inputBeneficio' id='" + beneficio + "' onclick='receberIndicesCpfBeneficio();'> </td> <td>" + "<p>" + elementoConsultarPorCpfBeneficio.beneficio + "</p>" + "</td> <td>" + "<p>" + elementoConsultarPorCpfBeneficio.tipoBeneficio + "</p>" + "</td><td>" + "<p>" + elementoConsultarPorCpfBeneficio.dataConcessaoBeneficio + "</p>" + "</td> </tr>";
            });
            $("#tableBeneficio").children('tbody').append(bodyTableBeneficio);
        }
    });
    return isExisteBeneficio;
}

function consultarNomeProtocolo(params) {
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let settingsConsultarNomeProtocolo = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&protocolo=" + params,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsConsultarNomeProtocolo).done(function (response) {
        let keysConsultarNomeProtocolo = Object.keys(response);
        $(keysConsultarNomeProtocolo).each(function () {
            responseConsultarNomeProtocolo = response[keysConsultarNomeProtocolo[this]];
            if (isEqualsIgnoreCase(responseConsultarNomeProtocolo["chave"], ["NOME SERVIDOR", "NOME DO SERVIDOR"])) {
                let nomeServidor = responseConsultarNomeProtocolo["valor"];
                document.getElementById('nomeServidor').innerHTML = nomeServidor;
            }
        });
    });
}

function consultarNomeBeneficio(params) {
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let settingsConsultarNomeBeneficio = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&beneficio=" + params,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsConsultarNomeBeneficio).done(function (response) {
        let keysConsultarNomeBeneficio = Object.keys(response);
        $(keysConsultarNomeBeneficio).each(function () {
            responseConsultarNomeBeneficio = response[keysConsultarNomeBeneficio[this]];
            if (isEqualsIgnoreCase(responseConsultarNomeBeneficio["chave"], ["NOME SERVIDOR", "NOME DO SERVIDOR"])) {
                let nomeServidor = responseConsultarNomeBeneficio["valor"];
                document.getElementById('nomeServidor').innerHTML = nomeServidor;
            }
        });
    });
}
function receberIndicesCpfProtocolo() {
    $('#limpar').show();
    $('#divVoltar').show();
    $("#indices").show();
    $("#bloco-geral").show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $('#alterarIndicesBtn').show();
    $("#indices").empty();
    let tipoDocumentoCpfProtocolo;
    let numeroCaixaCpfProtocolo;
    let filialCpfProtocolo;

    let checkedProtocolo = document.querySelector('input[name="inputProtocolo"]:checked').value;
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let settingsIndices = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&protocolo=" + checkedProtocolo,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsIndices).done(function (response) {
        isTipoProtocoloBeneficioTela = 'Protocolo';
        let keysIndices = Object.keys(response);
        protocoloComZero1 = $("#numProtocolo").val();
        $(keysIndices).each(function () {
            responseIndices = response[keysIndices[this]];
            if (responseIndices["chave"] == "NOME SERVIDOR" || responseIndices["chave"] == "NOME DO SERVIDOR") {
                let nomeServidor = responseIndices["valor"];
                document.getElementById('nomeServidor').innerHTML = nomeServidor;
            }
            if (responseIndices["chave"] == "NUMERO DO PROCESSO") {
                protocoloComZero1 = responseIndices["valor"];
            }
            if (isEqualsIgnoreCase(responseIndices["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO"])) {
                tipoDocumento = "DOCUMENTO DE " + responseIndices["valor"]
                $("#alterarIndicesBtnProtocolo").bind("click", function () {
                    if($("#indices").is(":visible") == false || document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]') == null){
                        return;
                    }
                    let tipoDocumentoAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
                    tipoDocumentoCpfProtocolo = tipoDocumentoAlterarIndices;
                });
            } else if (responseIndices["chave"] == "FILIAL") {
                filial = responseIndices["valor"]
                $("#alterarIndicesBtnProtocolo").bind("click", function () {
                    if($("#indices").is(":visible") == false || $('#inputIndiceEditavelProtocoloFilial :checked').val() == ''){
                        return;
                    }
                    let filialAlterarIndices = $('#inputIndiceEditavelProtocoloFilial :checked').text();
                    filialCpfProtocolo = filialAlterarIndices;
                });
            } else if (responseIndices["chave"] == "NUMERO CAIXA") {
                numeroCaixa = responseIndices["valor"]
                $("#alterarIndicesBtnProtocolo").bind("click", function () {
                    if($("#indices").is(":visible") == false || document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]') == null){
                        return;
                    }
                    let numeroCaixaAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
                    numeroCaixaCpfProtocolo = numeroCaixaAlterarIndices;
                });
            }

            let html = '';
            if (responseIndices["editavel"] == "S" && isEqualsIgnoreCase(responseIndices["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO"])) {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'> <input type='text' class='form-control' id='inputIndiceEditavelProtocoloTipoDocumento' name='inputIndiceEditavelProtocoloTipoDocumento' value='" + responseIndices["valor"] + "'>  </div></div>"
            } else if (responseIndices["editavel"] == "S" && responseIndices["chave"] == "FILIAL") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'>  <select name='' id='inputIndiceEditavelProtocoloFilial' class='form-control' required><option value=''></option><option value='valorSelecionado'> </option></select> </div></div>"
                carregarComboBoxFiliais($('#inputIndiceEditavelProtocoloFilial').text());
            } else if (responseIndices["editavel"] == "S" && responseIndices["chave"] == "NUMERO CAIXA") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'> <input type='text' class='form-control' id='inputIndiceEditavelProtocoloNumeroCaixa'  name='inputIndiceEditavelProtocoloNumeroCaixa' value='" + responseIndices["valor"] + "'>  </div></div>"
            } else if (responseIndices["editavel"] == "N") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-3'><p class='form-control-static'>" + responseIndices["valor"] + " </p></div></div>"
            }
            $(indices).append(html);

        });
        if (('.inputIndiceEditavelProtocoloTipoDocumento').value != undefined) {
            tipoDocumentoCpfProtocolo = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
        }
        if (('.inputIndiceEditavelProtocoloFilial').value != undefined) {
            filialCpfProtocolo = $('#inputIndiceEditavelProtocoloFilial :checked').text();
        }
        if (('.inputIndiceEditavelProtocoloNumeroCaixa').value != undefined) {
            numeroCaixaCpfProtocolo = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
        }
        $("#btnScan").bind("click", function () {
            abrirTelaScannerDocumentoCpfProtocolo(protocoloComZero1, tipoDocumentoCpfProtocolo, filialCpfProtocolo, numeroCaixaCpfProtocolo);
        });
        $('#carregarArquivosBeneficio').hide();
    });
}

function receberIndicesCpfBeneficio() {
    $('#limpar').show();
    $('#divVoltar').show();
    $("#indices").show();
    $("#bloco-geral").show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    $('#alterarIndicesBtn').show();
    $("#indices").empty();
    let checkedBeneficio = document.querySelector('input[name="inputBeneficio"]:checked').value;
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let tipoDocumentoCpfBeneficio;
    let filialCpfBeneficio;
    let numeroCaixaCpfBeneficio;
    let settingsIndices = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&beneficio=" + checkedBeneficio,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsIndices).done(function (response) {
        isTipoProtocoloBeneficioTela = 'Beneficio';
        let keysIndices = Object.keys(response);
        $(keysIndices).each(function () {
            responseIndices = response[keysIndices[this]];
            if (responseIndices["chave"] == "NOME SERVIDOR" || responseIndices["chave"] == "NOME DO SERVIDOR") {
                let nomeServidor = responseIndices["valor"];
                document.getElementById('nomeServidor').innerHTML = nomeServidor;
            }
            // var checkedBeneficio
            // if(responseIndices["chave"] == "NUMERO DO PROCESSO"){
            //   checkedBeneficio = responseIndices["valor"]
            // }
            if (isEqualsIgnoreCase(responseIndices["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO"])) {
                tipoDocumentoCpfBeneficio = "DOCUMENTO DE " + responseIndices["valor"]
                $("#alterarIndicesBtnBeneficio").bind("click", function () {
                    let tipoDocumentoAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
                    tipoDocumentoCpfBeneficio = tipoDocumentoAlterarIndices;
                    // let mensagem = "<strong>Índice(s) alterados com sucesso!</strong>";
                    // mostraDialogo(mensagem, "success", 2500);
                });
            } else if (responseIndices["chave"] == "FILIAL") {
                filialCpfBeneficio = responseIndices["valor"]
                $("#alterarIndicesBtnBeneficio").bind("click", function () {
                    let filialAlterarIndices = $('#inputIndiceEditavelProtocoloFilial :checked').text();
                    filialCpfBeneficio = filialAlterarIndices;
                });
            } else if (responseIndices["chave"] == "NUMERO CAIXA") {
                numeroCaixaCpfBeneficio = responseIndices["valor"]
                $("#alterarIndicesBtnBeneficio").bind("click", function () {
                    let numeroCaixaAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
                    numeroCaixaCpfBeneficio = numeroCaixaAlterarIndices;
                });
            }

            let html = '';
            if (responseIndices["editavel"] == "S" && isEqualsIgnoreCase(responseIndices["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO"])) {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'> <input type='text' class='form-control' id='inputIndiceEditavelProtocoloTipoDocumento' name='inputIndiceEditavelProtocoloTipoDocumento' value='" + responseIndices["valor"] + "'>  </div></div>"
            } else if (responseIndices["editavel"] == "S" && responseIndices["chave"] == "FILIAL") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'>  <select name='' id='inputIndiceEditavelProtocoloFilial' class='form-control' required><option value=''></option><option value='valorSelecionado'> </option></select> </div></div>"
                carregarComboBoxFiliais();
            } else if (responseIndices["editavel"] == "S" && responseIndices["chave"] == "NUMERO CAIXA") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-5'> <input type='text' class='form-control' id='inputIndiceEditavelProtocoloNumeroCaixa' name='inputIndiceEditavelProtocoloNumeroCaixa' value='" + responseIndices["valor"] + "'>  </div></div>"
            } else if (responseIndices["editavel"] == "N") {
                html = "<div class='form-group'> <label id='labelIndices' class='control-label col-md-3'> " + responseIndices["chave"] + " </label> <div id='valueIndices' class='col-md-3'><p class='form-control-static'>" + responseIndices["valor"] + " </p></div></div>"
            }
            $(indices).append(html);
        });
        if (('.inputIndiceEditavelProtocoloTipoDocumento').value != undefined) {
            tipoDocumentoCpfBeneficio = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
        }
        if (('.inputIndiceEditavelProtocoloFilial').value != undefined) {
            filialCpfBeneficio = $('#inputIndiceEditavelProtocoloFilial :checked').text();
        }
        if (('.inputIndiceEditavelProtocoloNumeroCaixa').value != undefined) {
            numeroCaixaCpfBeneficio = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
        }
        $("#btnScan").bind("click", function () {
            abrirTelaScannerDocumentoCpfBeneficio(checkedBeneficio, tipoDocumentoCpfBeneficio, filialCpfBeneficio, numeroCaixaCpfBeneficio);
        });

        $('#carregarArquivosBeneficio').show();
        $("#carregarArquivosBeneficio").bind("click", function () {
            carregarDivArquivosCarregadosBeneficio(checkedBeneficio);
            let a = $('#inputIndiceEditavelProtocoloFilial');
            carregarComboBoxFiliais(a);
        });
    });
}

function mostrarTableBeneficio() {
    $(abaProtocolo).hide();
    $(abaBeneficio).show();
}

function esconderTableBeneficio() {
    $(abaBeneficio).hide();
    $(abaProtocolo).show();
}

function abrirTelaScannerDocumentoCpfProtocolo(protocoloComZeroCpfProtocolo, tipoDocumentoCpfProtocolo, filialCpfProtocolo, numeroCaixaCpfProtocolo) {
    //let url = "https://sigeprev.spprev.sp.gov.br/spprevpre/digitalizacao/digitalizarDocumento.do?numProtocolo=0080001372&tipoDocumento=APOSENTADORIA%20ADM%20DIRETA"
    let url = urlDominioSigeprev + urlContextoSigeprev + "/jsp/digitalizacaoNew/digitalizarDocumento.do";
    url += "?numProtocolo=" + protocoloComZeroCpfProtocolo;
    url += "&codBeneficio=";
    url += "&tipoDocumento=" + $('#comboGrupoDeDocumentos :selected').text();
    url += "&descTipoDeDocumento=" + ($("#inputIndiceEditavelProtocoloTipoDocumento").length == 0 ? "" : document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value);
    url += "&filial=" + ($('#inputIndiceEditavelProtocoloFilial :checked').val() == "" ? "" : $('#inputIndiceEditavelProtocoloFilial :checked').text());
    url += "&caixa=" + ($("#inputIndiceEditavelProtocoloNumeroCaixa").length == 0 ? "" : document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value);
    url += "&origem=COMPREV";
    url += "&retornarArq=S";
    url += "&flgCodTipoDocumento=" + $('#comboGrupoDeDocumentos :checked').val();
    url += "&codGrupoDocumento=" + $('#comboGrupoDeDocumentos :checked').val();
    url += "&codFilial=" + $('#inputIndiceEditavelProtocoloFilial :checked').val();
    url += "&numCpf=" + $('#numCpf').val();

    let winRef;
    winRed = window.open(url, 'pagina', "width=1100, height=768, top=100, left=120, scrollbars=no ");
    if (winRef == null || winRef.document.location.href != url) {
        $('#carregarArquivos').show();
        $('#carregarArquivosBeneficio').hide();
    }
}

function abrirTelaScannerDocumentoCpfBeneficio(checkedBeneficio, tipoDocumentoCpfBeneficio, filialCpfBeneficio, numeroCaixaCpfBeneficio) {
    let url = urlDominioSigeprev + urlContextoSigeprev + "/jsp/digitalizacaoNew/digitalizarDocumento.do";
    url += "?numProtocolo=";
    url += "&codBeneficio=" +checkedBeneficio;
    url += "&tipoDocumento=" + $('#comboGrupoDeDocumentos :selected').text();
    url += "&descTipoDeDocumento=" + ($("#inputIndiceEditavelProtocoloTipoDocumento").length == 0 ? "" : document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value);
    url += "&filial=" + ($('#inputIndiceEditavelProtocoloFilial :checked').val() == "" ? "" : $('#inputIndiceEditavelProtocoloFilial :checked').text());
    url += "&caixa=" + ($("#inputIndiceEditavelProtocoloNumeroCaixa").length == 0 ? "" : document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value);
    url += "&origem=COMPREV";
    url += "&retornarArq=S";
    url += "&flgCodTipoDocumento=" + $('#comboGrupoDeDocumentos :checked').val();
    url += "&codGrupoDocumento=" + $('#comboGrupoDeDocumentos :checked').val();
    url += "&codFilial=" + $('#inputIndiceEditavelProtocoloFilial :checked').val();
    url += "&numCpf=" + $('#numCpf').val();

    let winRef;
    winRef = window.open(url, 'pagina', "width=1100, height=768, top=100, left=120, scrollbars=no ");
    if (winRef == null || winRef.document.location.href != url) {
        $('#carregarArquivos').show();
        $('#carregarArquivosBeneficio').show();
    }
}

function carregarDivArquivosCarregadosProtocolo(params) {
    let numSeq1 = $('#numSeq').attr('data-value');
    if (numSeq1 != "") {
        chamarArquivosCarregadosProtocolo(params);
        $('#arquivosCarregados').show();
    } else {
        alertNew('Envie um arquivo primeiro!')
    }
}

function carregarDivArquivosCarregadosBeneficio(params) {
    let numSeq2 = $('#numSeq').attr('data-value');
    if (numSeq2 != null || numSeq2 != undefined || numSeq2 != "" || numSeq2 != '') {
        chamarArquivosCarregadosBeneficio(params);
        $('#arquivosCarregados').show();
    } else {
        alertNew('Envie um arquivo primeiro!')
    }
}

function chamarArquivosCarregadosProtocolo(params) {
    $("#tableArquivosCarregados").children("thead").empty();
    $("#tableArquivosCarregados").children("tbody").empty();
    let numSeq = $('#numSeq').attr('data-value');
    let settingschamarArquivosCarregadosProtocolo = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/arquivosCarregadosProtocolo" + "?numSeq=" + numSeq,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingschamarArquivosCarregadosProtocolo).done(function (response) {
        $('#divEnviar').show();
        $('#divExcluir').show();
        $('#tableArquivosCarregados').show();
        $('#arquivoNaoCarregado').hide();
        let protocolo = params;
        let nomeArquivo = response.nomeArquivo;
        popularGridArquivosProtocolo(protocolo, nomeArquivo);
    });
    $.ajax(settingschamarArquivosCarregadosProtocolo).fail(function () {
        $('#tableArquivosCarregados').hide();
        $('#arquivoNaoCarregado').show();
    });
}

function chamarArquivosCarregadosBeneficio(params) {
    $("#tableArquivosCarregados").children("thead").empty();
    $("#tableArquivosCarregados").children("tbody").empty();
    let numSeq = $('#numSeq').attr('data-value');
    let settingsChamarArquivosCarregadosBeneficio = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/arquivosCarregadosProtocolo" + "?numSeq=" + numSeq,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    $.ajax(settingsChamarArquivosCarregadosBeneficio).done(function (response) {
        $('#divEnviar').show();
        $('#divExcluir').show();
        $('#tableArquivosCarregados').show();
        $('#arquivoNaoCarregado').hide();
        var beneficio = params;
        var nomeArquivo = response.nomeArquivo;
        popularGridArquivosBeneficio(beneficio, nomeArquivo);
    });
    $.ajax(settingsChamarArquivosCarregadosBeneficio).fail(function () {
        $('#tableArquivosCarregados').hide();
        $('#arquivoNaoCarregado').show();
    });
}

function abrirTelaConsultaDetalhada() {
    window.open(urlDominioBackEnd + urlContextoSigeprev + "/cadastro/servidorConsultaGenerica.do?modExibicao=2&formOrigem=funcional&parametrosDaTela=%7B%22campos%22:%5B%22codIdeCli%22%5D,%22callback%22:%22processar()%22%7D", 'pagina', "width=850, height=555, top=100, left=110, scrollbars=no ");
}

function popularGridArquivosProtocolo(protocolo, nomeArquivo) {
    $("#tableArquivosCarregados").children("thead").empty();
    $("#tableArquivosCarregados").children("tbody").empty();
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let settingsIndicesProtocolo = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&protocolo=" + protocolo,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    let tipoDocumento
    let filial
    let numeroCaixa
    let numSeq = $('#numSeq').attr('data-value');
    if (numSeq != null || numSeq != undefined || numSeq != "") {
        $.ajax(settingsIndicesProtocolo).done(function (response1) {
            $('#divEnviar').show();
            $('#divExcluir').show();
            $('#tableArquivosCarregados').show();
            $('#arquivoNaoCarregado').hide();
            let keysIndicesProtocolo = Object.keys(response1);
            let cabecalho = "";
            let corpo = "";
            $(keysIndicesProtocolo).each(function () {
                let responseIndicesProtocolo = response1[keysIndicesProtocolo[this]];
                if (responseIndicesProtocolo["chave"] == "FILIAL") {
                    var filialAlterarIndices = $('#inputIndiceEditavelProtocoloFilial :checked').val() == '' ? "" : $('#inputIndiceEditavelProtocoloFilial :checked').text();
                    filial = filialAlterarIndices;
                    responseIndicesProtocolo["valor"] = filial;
                } else if (responseIndicesProtocolo["chave"] == "NUMERO CAIXA") {
                    var numeroCaixaAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
                    numeroCaixa = numeroCaixaAlterarIndices;
                    responseIndicesProtocolo["valor"] = numeroCaixa;
                } else if (isEqualsIgnoreCase(responseIndicesProtocolo["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO", "TIPO DOCUMENTO"])) {
                    var tipoDocumentoAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
                    tipoDocumento = tipoDocumentoAlterarIndices;
                    responseIndicesProtocolo["valor"] = tipoDocumento;
                }
                cabecalho += "<th><p id='" + responseIndicesProtocolo["chave"] + "'> " + responseIndicesProtocolo["chave"] + " </p> </th>";
                corpo += "<td><p id='" + responseIndicesProtocolo["valor"] + "'> " + responseIndicesProtocolo["valor"] + " </p></td>";
            });

            cabecalho += "<th>Arquivo</th>";
            corpo += "<td> <a href='" + urlDominioBackEnd + urlContextoSigeprev + "/jsp/digitalizacaoNew/digitalizacao.do?nomeArq=" + nomeArquivo + "&metodoParaChamarNoServidor=downloadArquivo'  title=' Documento' > <img src=' ../../../../img/file-pdf-solid.png'  alt='Documento'  </a></td> ";

            $("#tableArquivosCarregados").children('thead').html(cabecalho);
            $("#tableArquivosCarregados").children('tbody').html(corpo);

            $("#enviarArquivo").unbind( "click" );//[TT-79304], Jhone Rossini, 02/08/2022
            $("#enviarArquivo").bind("click", function () {
                /*[TT-79304], Jhone Rossini, 02/08/2022*/
                if($("#indices").is(":visible") == false || $("input[name=inputIndiceEditavelProtocoloNumeroCaixa]").val() == ''){
                    if($("#tableArquivosCarregados:visible").val() || numSeq == ''){
                        alertNew("\u00C9 necess\u00E1rio carregar um arquivo.");
                        return;
                    }
                }
                /*[TT-79304] - FIM*/

                if (tipoDocumento == null || tipoDocumento == undefined || tipoDocumento == "" ? tipoDocumento = "Tipo de documento indefinido" : tipoDocumento = tipoDocumento)
                    if ($("input[name=documentoAssinado]:checked").val() !== undefined) {
                        salvarArquivo(filial, numeroCaixa, tipoDocumento);
                    } else {
                        verificaAssinatura();
                    }
            });
        });
    } else {
        $('#tableArquivosCarregados').hide();
        $('#arquivoNaoCarregado').show();
    }
}

function popularGridArquivosBeneficio(beneficio, nomeArquivo) {
    $("#tableArquivosCarregados").children("thead").empty();
    $("#tableArquivosCarregados").children("tbody").empty();
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let settingsIndicesBeneficio = {
        url: urlDominioBackEnd + urlContextoBackEnd + "digitalizarConsulta/indices" + "?grupoDocumento=" + comboGrupoDeDocumentos + "&beneficio=" + beneficio,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    let numSeq = $('#numSeq').attr('data-value');
    let tipoDocumento
    let filial
    let numeroCaixa
    if (numSeq != null || numSeq != undefined || numSeq != "") {
        $.ajax(settingsIndicesBeneficio).done(function (response1) {
            $('#divEnviar').show();
            $('#divExcluir').show();
            $('#tableArquivosCarregados').show();
            $('#arquivoNaoCarregado').hide();
            let keysIndicesBeneficio = Object.keys(response1);
            let cabecalho = "";
            let corpo = "";
            $(keysIndicesBeneficio).each(function () {
                let responseIndicesBeneficio = response1[keysIndicesBeneficio[this]];
                if (responseIndicesBeneficio["chave"] == "FILIAL") {
                    var filialAlterarIndices = $('#inputIndiceEditavelProtocoloFilial :checked').val() == '' ? "" : $('#inputIndiceEditavelProtocoloFilial :checked').text();
                    filial = filialAlterarIndices;
                    responseIndicesBeneficio["valor"] = filial;
                } else if (responseIndicesBeneficio["chave"] == "NUMERO CAIXA") {
                    let numeroCaixaAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
                    numeroCaixa = numeroCaixaAlterarIndices;
                    responseIndicesBeneficio["valor"] = numeroCaixa;
                } else if (isEqualsIgnoreCase(responseIndicesBeneficio["chave"], ["TIPO DO DOCUMENTO", "TIPO DE DOCUMENTO", "TIPO DOCUMENTO"])) {
                    let tipoDocumentoAlterarIndices = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
                    tipoDocumento = tipoDocumentoAlterarIndices;
                    responseIndicesBeneficio["valor"] = tipoDocumento;
                }
                cabecalho += "<th><p id='" + responseIndicesBeneficio["chave"] + "'> " + responseIndicesBeneficio["chave"] + " </p> </th>";
                corpo += "<td><p id='" + responseIndicesBeneficio["valor"] + "'> " + responseIndicesBeneficio["valor"] + " </p></td>";
            });

            cabecalho += "<th>Arquivo</th>";
            corpo += "<td> <a href='" + urlDominioBackEnd + urlContextoSigeprev + "/jsp/digitalizacaoNew/digitalizacao.do?nomeArq=" + nomeArquivo + "&metodoParaChamarNoServidor=downloadArquivo'  title=' Documento' > <img src=' ../../../../img/file-pdf-solid.png'  alt='Documento'  </a></td> ";

            $("#tableArquivosCarregados").children('thead').html(cabecalho);
            $("#tableArquivosCarregados").children('tbody').html(corpo);

            $("#enviarArquivo").unbind( "click" );//[TT-79304], Jhone Rossini, 02/08/2022
            $("#enviarArquivo").bind("click", function () {
                if (tipoDocumento == null || tipoDocumento == undefined || tipoDocumento == "" ? tipoDocumento = "Tipo de documento indefinido" : tipoDocumento = tipoDocumento)
                    salvarArquivo(filial, numeroCaixa, tipoDocumento);
            });

            //[TT-79304], Jhone Rossini, 02/08/2022
            /*$("#excluir").bind("click", function () {
                excluirArquivo(numSeq);
                var mensagem = "<strong>Excluido com sucesso!</strong>";
                mostraDialogo(mensagem, "success", 2500);
            });*/
        });
    } else {
        $('#tableArquivosCarregados').hide();
        $('#arquivoNaoCarregado').show();
    }
}

function salvarArquivo(filial, numeroCaixa, tipoDocumento) {
    let numSeq;
    if (tipoDocumento == null || tipoDocumento == undefined || tipoDocumento == "" ? tipoDocumento = "Tipo de documento indefinido" : tipoDocumento = tipoDocumento)
        numSeq = $('#numSeq').attr('data-value');
    let documentoAssinado = document.querySelector('input[name="documentoAssinado"]:checked').value;
    let comboGrupoDeDocumentos = $('#comboGrupoDeDocumentos :checked').text();
    let settingsSalvarArquivo = {
        url: urlDominioSigeprev + urlContextoSigeprev + "/digitalizarDocumentoServlet/DigitalizarDocumentoServlet?acao=EA&origem=COMPREV" + "&numSeq=" + numSeq + "&assinar=" + documentoAssinado + "&filial=" + filial + "&caixa=" + numeroCaixa + "&" + $("#inputIndiceEditavelProtocoloTipoDocumento").serialize() + "&grupoDocumento=" + comboGrupoDeDocumentos + "&codFilial=" + $("#inputIndiceEditavelProtocoloFilial").val(),
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    if (numSeq != null || numSeq != undefined || numSeq != "") {

        //TT 77116, realizar verificacao se o campo Filial está preenchido.
        let paramsVerificacao = {};
        paramsVerificacao.numSeq = numSeq;
        let jsonVerificacao = consumidor.executarServico("digitalizarConsulta/verificarCamposObrigatoriosAntesDeEnviar", paramsVerificacao);
        if(jsonVerificacao.status == 'nok'){
            alertNew(jsonVerificacao.mensagem);
            return;
        }
        exibirAguardeBootstrap();
        $.ajax(settingsSalvarArquivo).done(function (retorno) {
            //[TT-79304], Jhone Rossini, 02/08/2022
            /*$(trArquivosCarregadosNome).empty();
            $(trArquivosCarregadosValor).empty();
            $('#carregarArquivosBeneficio').hide();*/
            sumirAguardeBootstrap();
            let jsonRetorno = JSON.parse(retorno);
            if(jsonRetorno.status == 'OK'){
                if(jsonRetorno.urlRetorno != ''){
                    window.open(jsonRetorno.urlRetorno, 'pagina', "width=850, height=555, top=100, left=110, scrollbars=no");
                    limpar();
                }else{
                    alertNew2('Arquivo enviado com sucesso!', limpar);
                }
            }else if(jsonRetorno.status =='ERRO'){
                alertNew('O E2Doc retornou erro ao tentar encaminhar sua imagem. Por favor contate o suporteged@sp.gov.br informando os dados do protocolo para an\u00E1lise.');
            }else if(jsonRetorno.status =='MSG_EXCEPT'){
                alertNew("Favor conferir o cadastro da Caixa/Filial para esse tipo documental!");
            }else{
                alertNew('Ocorreu um erro ao tentar enviar o arquivo!');
            }
        });
    } else if (numSeq == null || numSeq == undefined || numSeq == "") {
        alertNew("Salve primeiro um arquivo!");
        return;
    }
}

//[TT-79304], Jhone Rossini, 02/08/2022 - Alterado nome da funcao
function deletarArquivo(simNao) {

    if(!simNao)
        return;

    let numSeq = $('#numSeq').attr('data-value');
    let settingsExcluirArquivo = {
        url: urlDominioSigeprev + urlContextoSigeprev + "/digitalizarDocumentoServlet/DigitalizarDocumentoServlet?acao=E&origem=COMPREV" + "&numSeq=" + numSeq,
        method: "GET",
        headers: {
            "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        processData: false,
        crossDomain: true,
        contentType: false
    };
    exibirAguardeBootstrap();
    let ajax = $.ajax(settingsExcluirArquivo);
    ajax.done(function (response) {
        sumirAguardeBootstrap();
        //[TT-79304], Jhone Rossini, 02/08/2022
        alertNew('Excluido com sucesso!');
        // location.reload();
        $('#arquivosCarregados').hide();
        $("#tableArquivosCarregados").children("thead").empty();
        $("#tableArquivosCarregados").children("tbody").empty();
        $('#divEnviar').hide();
        $('#divExcluir').hide();
    });
    ajax.error(function (response) {
        sumirAguardeBootstrap();
        //[TT-79304], Jhone Rossini, 02/08/2022
        alertNew("Erro ao excluir!");
    });
}

function limpar() {
        let numSeq = $('#numSeq').attr('data-value');
        if(numSeq == ''){
            location.reload();
            return;
        }
        //A partir desse ponto vamos apagar o arquivo fisico do servidor,
        // pois estamos limpando a tela para realizar uma nova digitalizacao.
        let settingsExcluirArquivo = {
            url: urlDominioSigeprev + urlContextoSigeprev + "/digitalizarDocumentoServlet/DigitalizarDocumentoServlet?acao=E&origem=COMPREV" + "&numSeq=" + numSeq,
            method: "GET",
            headers: {
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            },
            processData: false,
            crossDomain: true,
            contentType: false
        };
        exibirAguardeBootstrap();
        $.ajax(settingsExcluirArquivo).done(function (response) {
            $("#arquivosCarregados").hide();
            $("#tableArquivosCarregados").children('tbody').empty();
            $("#enviarArquivo").hide();
            $("#excluirArquivo").hide();
            location.reload();
        });
        $.ajax(settingsExcluirArquivo).error(function (response) {
            //[TT-79304], Jhone Rossini, 02/08/2022
            location.reload();
        });
    // }
}

function voltar() {
    location.reload();
}

function verificaAssinatura() {
    if (document.querySelector('#assinaturaSim').checked == false && document.querySelector('#assinaturaNao').checked == false)
        alertNew('O campo de assinatura deve ser preenchido!');
    return;
}

//Essa função é chamada pelo sigeprev pelo window.opener
function armazenaNumSeq(numSeq) {
    $('#numSeq').attr('data-value', numSeq);
    carregarArquivo();
}

function carregarArquivo(){
    $("#enviarArquivo").show();
    $("#excluirArquivo").show();
    $("#trArquivosCarregadosNome").empty();
    $("#trArquivosCarregadosValor").empty();
    if(isTipoProtocoloBeneficioTela == 'Protocolo'){
        carregarDivArquivosCarregadosProtocolo(protocoloComZero1);
    }else{
        if($('input[name="inputBeneficio"]:checked').val() != undefined) {
            carregarDivArquivosCarregadosBeneficio($('input[name="inputBeneficio"]:checked').val());
        }else{
            alertNew("Selecione um BENEFICIO.");
        }
    }
}

function alterarIndicesArquivoCarregado() {

    let numSeqAlterar = $('#numSeq').attr('data-value');
    if(numSeqAlterar == ''){
        alertNew('Carregue o documento antes de alterar os indices.');
        return;
    } else if($('#indices').is(':visible') == false){
        alertNew("Por favor, escolha um protocolo para alterar os indices.");
        return;
    } else if($('#inputIndiceEditavelProtocoloFilial :checked').val() == ""){
        alertNew("O campo Filial \u00E9 obrigat\u00F3rio.");//[TT-79310] - Jhone Rossini, 02/08/2022
        return;
    } else if($("#comboGrupoDeDocumentos option:selected").val() == 10 && $('input[name=inputBeneficio]:checked').val() == undefined){
        alertNew("Por favor, escolha um benefício para alterar os indices.");
        return;
    }

    let comboGrupoDocumentos = $('#comboGrupoDeDocumentos :checked').val();
    let codBeneficioAlterar = isTipoProtocoloBeneficioTela == 'Protocolo' ? $('input[name="inputProtocolo"]:checked').val() : $('input[name="inputBeneficio"]:checked').val();
    let filialAlterar = $('#inputIndiceEditavelProtocoloFilial :checked').text();
    let codFilial = $('#inputIndiceEditavelProtocoloFilial :checked').val();
    let numeroCaixaAlterar = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]');
    let tipoDocumentoAlterar = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]');

    if(numeroCaixaAlterar != null){
        numeroCaixaAlterar = document.querySelector('input[name="inputIndiceEditavelProtocoloNumeroCaixa"]').value;
    }
    if(tipoDocumentoAlterar != null){
        tipoDocumentoAlterar = document.querySelector('input[name="inputIndiceEditavelProtocoloTipoDocumento"]').value;
    }

    let params = {};
    params.grupoDocumentos = comboGrupoDocumentos;
    params.numSeq = numSeqAlterar;
    params.codBeneficio = codBeneficioAlterar;
    params.filial = filialAlterar;
    params.codFilial = codFilial;
    params.numeroCaixa = numeroCaixaAlterar;
    params.tipoDocumento = tipoDocumentoAlterar;

    exibirAguardeBootstrap();
    let jsonData = consumidor.executarServico("digitalizarConsulta/alterarIndicesArquivoCarregado", params);
    sumirAguardeBootstrap();
    if(jsonData.status == 'ok'){
        alertNew("\u00CDndice(s) alterados com sucesso!");
        if(isTipoProtocoloBeneficioTela == 'Protocolo'){
            chamarArquivosCarregadosProtocolo(codBeneficioAlterar);
        }else{
            chamarArquivosCarregadosBeneficio(codBeneficioAlterar)
        }

    }else{
        alertNew(jsonData.mensagem);
    }
}

function isEqualsIgnoreCase(valor, valores){
    if(valor == undefined)
        return;
    if(valores == undefined)
        return;
    var retorno = false;
    valores.forEach(function(val, i){
        if(val.toUpperCase() == valor.toUpperCase())
            retorno = true;
    });
    return retorno;
}

function pesquisarPressionandoEnter(evento, campo) {
    with (document.forms[0]) {
        if (evento.keyCode == 13 || evento == false) {
            $("#protBeneNaoEncontradoBeneficio").hide();
            $("#protBeneNaoEncontradoProtocolo").hide();
            $("#bloco-geral").hide();
            if (campo == "protocolo") {
                //Limpar campos CPF e NUMERO DO BENEFICIO
                $("#numCpf").val("");
                $("#numBeneficio").val("");

                $('#segundadiv').show();
                mostrarAbaProtocolo();
                consultarPorProtocolo(numProtocolo.value);
            } else if (campo == "cpf") {
                //Limpar campos PROTOCOLO e NUMERO DO BENEFICIO
                $("#numProtocolo").val("");
                $("#numBeneficio").val("");

                $("#abaBeneficio").hide();
                $("#abaProtocolo").hide();
                $('#segundadiv').show();

                if($("#comboGrupoDeDocumentos option:selected").val() != '10') {
                    consultarPorCpfProtocolo(numCpf.value).then(e => {
                        if (e == false)
                            $("#nomeServidor").text("");
                        consultarPorCpfBeneficio(numCpf.value).then(e => {
                            if (e == true)
                                $("#abaBeneficio").hide();
                        });
                    });
                }else{
                    consultarPorCpfBeneficio(numCpf.value).then(e => {
                        $("#abaProtocolo").hide();
                        $("#botaoAbaProtocolo").hide();
                    });
                }
            } else if (campo == "numBeneficio") {
                //Limpar campos PROTOCOLO e CPF
                $("#numProtocolo").val("");
                $("#numCpf").val("");

                $('#segundadiv').show();
                mostrarAbaBeneficio();
                consultarPorBeneficio(numBeneficio.value);
            }
        }
    }
}

function carregarNumCpfPelaConsultaDetalhada(num_cpf, ide_cli){
    with (document.forms[0]) {
        $("#numCpf").val(num_cpf);
        pesquisarPressionandoEnter(false, "cpf");
    }
}