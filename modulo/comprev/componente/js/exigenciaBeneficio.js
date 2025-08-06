/**
 * Bloco Exigência do Benefício
 */
let arrayExigenciasBeneficio = [];

let valorCampoAnaliseAntes = ''; //TODO confirmar se deve implementar um rollback caso as exigencias sejam deletadas.

function obterObjetoExigenciaBeneficioLimpo(){
    let objetoExigenciaBeneficio = {
        numItem                  : '', // Número do Item.
        flgTipoExigencia         : '', // Faltante(F) ou Ilegível(I).
        codExigenciaBeneficio    : '', // Tipo de Exigência.
        desExigenciaBeneficio    : ''  // Descrição do Tipo de Exigência
    }
    return objetoExigenciaBeneficio;
}

function buscarBancoDadosTodasExigenciasBeneficioCadastradas(){
    let params = {};
    params.codIns = 1;
    //params.numSeqBeneficio = 2;
    params.numSeqBeneficio = $('#hiddenNumSeqBeneficio').val();
    let jsonData = consumidor.executarServico("exigenciaBeneficio/pesquisarTodasExigenciasDoBeneficio", params);
    if(JSON.stringify(jsonData.listaExigencias) === '[]'){

    }else{
        $.each(jsonData.listaExigencias, function(eachIndice, eachExigencia){
            let exigenciaCadastrada = obterObjetoExigenciaBeneficioLimpo();
            exigenciaCadastrada.numItem = eachExigencia.numItem;
            exigenciaCadastrada.flgTipoExigencia = eachExigencia.flgTipoExigencia;
            exigenciaCadastrada.codExigenciaBeneficio = eachExigencia.codExigenciaBeneficio;
            exigenciaCadastrada.desExigenciaBeneficio = eachExigencia.desExigenciaBeneficio;
            arrayExigenciasBeneficio.push(exigenciaCadastrada);
        });
    }

    carregarBlocoExigenciaBeneficio();
}

function carregarBlocoExigenciaBeneficio(){
    $('#divExigenciaBeneficio').empty();
    $('#divExigenciaBeneficio').html('<input type="button" value="Inserir Exigência do Benefício" class="btn bt-azul" onclick="adicionarNovaLinhaExigenciaBeneficio()"><br/>');

    let conteudoTabela = '<div class="form-inline mb-2">';
    conteudoTabela    += '<table style="width: 50%">';
    conteudoTabela    +=     '<thead>';
    conteudoTabela    +=         '<th style="width: 20%"></th>';
    conteudoTabela    +=         '<th style="width: 20%"></th>';
    conteudoTabela    +=         '<th style="width: 50%"></th>';
    conteudoTabela    +=         '<th style="width: 10%"></th>';
    conteudoTabela    +=     '</thead>';
    conteudoTabela    +=     '<tbody id="tbodyExigenciaBeneficio"></tbody>';
    conteudoTabela    += '</table>';
    conteudoTabela    += '</div>';

    $('#divExigenciaBeneficio').append(conteudoTabela);

    carregarExigenciasDoArray();
}

function carregarExigenciasDoArray(){

    $.each(arrayExigenciasBeneficio, function(eachIndice, eachExigencia){
        let conteudoRegistroArray = '<tr>';
        conteudoRegistroArray += '<td>';
        conteudoRegistroArray += 'Faltante <input type="checkbox" value="F" id="checkboxFaltante_' + eachExigencia.numItem + '" onclick="desmarcarCheckBoxExigencia(\'checkboxIlegivel_' + eachExigencia.numItem + '\'); alterarExigenciaBeneficioNoArray(\'' + eachExigencia.numItem + '\')">';
        conteudoRegistroArray += '</td>';

        conteudoRegistroArray += '<td>';
        conteudoRegistroArray += 'Ilegível <input type="checkbox" value="I" id="checkboxIlegivel_' + eachExigencia.numItem + '" onclick="desmarcarCheckBoxExigencia(\'checkboxFaltante_' + eachExigencia.numItem + '\'); alterarExigenciaBeneficioNoArray(\'' + eachExigencia.numItem + '\')">';
        conteudoRegistroArray += '</td>';

        conteudoRegistroArray += '<td id="tdExigenciaBeneficio_' + eachExigencia.numItem + '">';
        conteudoRegistroArray += eachExigencia.desExigenciaBeneficio;
        conteudoRegistroArray += '</td>';

        conteudoRegistroArray += '<td style="text-align: center">';
        conteudoRegistroArray += '<a id="botaoExcluirExigencia_' + eachExigencia.numItem + '"  href="javascript:excluirExigenciaBeneficio(\'' + eachExigencia.numItem + '\')"><img src="../../../../img/icon-excluir.png" alt="Excluir" /></a>';
        conteudoRegistroArray += '</td>';
        conteudoRegistroArray += '</tr>';

        $('#tbodyExigenciaBeneficio').append(conteudoRegistroArray);

        if (eachExigencia.flgTipoExigencia === 'F') {
            $('#checkboxFaltante_' + eachExigencia.numItem).prop("checked", true);
        } else if (eachExigencia.flgTipoExigencia === 'I') {
            $('#checkboxIlegivel_' + eachExigencia.numItem).prop("checked", true);
        }
    });
}

function validacoesAntesDeInserirUmaNovaLinhaExigenciaBeneficio(jsonListaCodigos){
    let mensagemValidacao = '';

    if(arrayExigenciasBeneficio.length === jsonListaCodigos.codigos.length){
        mensagemValidacao = 'Não é possível adicionar mais exigências do benefício, todas as opções disponíveis já estão sendo utilizadas.';
    }

    if(mensagemValidacao == ''){
        for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
            if (arrayExigenciasBeneficio[i].codExigenciaBeneficio === '') {
                mensagemValidacao = 'É necessário selecionar a exigência do benefício disponível antes de adicionar uma nova.';
                break;
            }
        }
    }
    return mensagemValidacao;
}


function adicionarNovaLinhaExigenciaBeneficio(){
    let params  = {};
    params.codNum = 56;
    let jsonListaCodigos = consumidor.executarServico("controleCompensacao/consultarCodigo", params);

    let mensagemValidacao = validacoesAntesDeInserirUmaNovaLinhaExigenciaBeneficio(jsonListaCodigos);
    if(mensagemValidacao !== ''){
        alert(mensagemValidacao);
        return;
    }

    //Deve-se ajustar o valor do campo Analise para Exigencia assim que alguma exigencia é adicionada.
    $('#codAnalise').val('3');


    let numItem = arrayExigenciasBeneficio.length + 1;

    //Adicionando um novo registro no array zerado.
    let objetoExigenciaBeneficio = obterObjetoExigenciaBeneficioLimpo();
    objetoExigenciaBeneficio.numItem = numItem.toString();
    arrayExigenciasBeneficio.push(objetoExigenciaBeneficio);


    //Esconder todos os botões de exclusão das exigências
    $('a[id^="botaoExcluirExigencia_"]').hide();
    $('input[id^="checkboxFaltante_"]').prop('disabled', true);
    $('input[id^="checkboxIlegivel_"]').prop('disabled', true);

    let conteudoLinha  = '<tr>';
    conteudoLinha    += '<td>';
    conteudoLinha    += 'Faltante <input type="checkbox" value="F" id="checkboxFaltante_' + numItem + '" onclick="desmarcarCheckBoxExigencia(\'checkboxIlegivel_' + numItem + '\'); alterarExigenciaBeneficioNoArray(\'' + numItem + '\')">';
    conteudoLinha    += '</td>';

    conteudoLinha    += '<td>';
    conteudoLinha    += 'Ilegível <input type="checkbox" value="I" id="checkboxIlegivel_' + numItem + '" onclick="desmarcarCheckBoxExigencia(\'checkboxFaltante_' + numItem + '\'); alterarExigenciaBeneficioNoArray(\'' + numItem + '\')">';
    conteudoLinha    += '</td>';

    conteudoLinha    += '<td id="tdExigenciaBeneficio_' + numItem + '">';

    conteudoLinha    += '<select id="codExigenciaBeneficio_' + numItem + '" class="form-control" onchange="alterarExigenciaBeneficioNoArray(\'' + numItem + '\'); selecionarExigenciaBeneficio(\'' + numItem + '\')">';
    conteudoLinha    += montarComboExigenciasDesconsideradoJaSelecionadas(jsonListaCodigos);
    conteudoLinha    += '</select>';

    conteudoLinha    += '</td>';

    conteudoLinha    += '<td style="text-align: center">';
    conteudoLinha    += '<a id="botaoExcluirExigencia_' + numItem + '" href="javascript:excluirExigenciaBeneficio(\'' + numItem + '\')"><img src="../../../../img/icon-excluir.png" alt="Excluir" /></a>';
    conteudoLinha    += '</td>';

    conteudoLinha    += '</tr>';

    $('#tbodyExigenciaBeneficio').append(conteudoLinha);

}

function excluirExigenciaBeneficio(paramNumItem){
    for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
        if (arrayExigenciasBeneficio[i].numItem.toString() === paramNumItem) {
            arrayExigenciasBeneficio.splice(i, 1);
            break;
        }
    }

    //Após deletar o registro, é necessário reorganizar os valores dos numItems para deixar ordenado.
    let numItem = 0;
    $.each(arrayExigenciasBeneficio, function(eachIndice, eachExigencia){
        eachExigencia.numItem = ++numItem;
    });

    carregarBlocoExigenciaBeneficio();
}

function desmarcarCheckBoxExigencia(paramIdCheckBox){
    document.getElementById(paramIdCheckBox).checked = false;
}

function selecionarExigenciaBeneficio(paramNumItem){
    let idTdExigenciaBeneficio = '#tdExigenciaBeneficio_' + paramNumItem;
    let idComboSelecionado     = '#codExigenciaBeneficio_'  + paramNumItem + ' option:selected';

    let valorTextoComboSelecionado = $(idComboSelecionado).text();

    $(idTdExigenciaBeneficio).empty();
    $(idTdExigenciaBeneficio).append(valorTextoComboSelecionado);
}




function alterarExigenciaBeneficioNoArray(paramNumItem){
    let objetoExigenciaBeneficio = null;

    for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
        if (arrayExigenciasBeneficio[i].numItem.toString() === paramNumItem) {
            objetoExigenciaBeneficio = arrayExigenciasBeneficio[i];
        }
    }

    let flgTipoExigenciaSelecionado = '';
    if($('#checkboxFaltante_' + paramNumItem).is(':checked')){
        flgTipoExigenciaSelecionado = 'F';
    }else if($('#checkboxIlegivel_' + paramNumItem).is(':checked')){
        flgTipoExigenciaSelecionado = 'I';
    }

    let idComboSelecionado = '#codExigenciaBeneficio_'  + paramNumItem + ' option:selected';
    let codExigenciaBeneficioSelecionado = $(idComboSelecionado).val();

    let desExigenciaBeneficioSelecionado = '';
    if(codExigenciaBeneficioSelecionado !== '' && codExigenciaBeneficioSelecionado !== undefined){
        desExigenciaBeneficioSelecionado = $(idComboSelecionado).text();
    }

    objetoExigenciaBeneficio.numItem               = paramNumItem;
    objetoExigenciaBeneficio.flgTipoExigencia      = flgTipoExigenciaSelecionado;
    if(codExigenciaBeneficioSelecionado !== undefined){ //quando é undefined, significa que está mostrando o texto em vez do combo na tela.
        objetoExigenciaBeneficio.codExigenciaBeneficio = codExigenciaBeneficioSelecionado;
        objetoExigenciaBeneficio.desExigenciaBeneficio = desExigenciaBeneficioSelecionado;
    }


    let isTodasAsExigenciasEstaoSelecionadas = true;
    for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
        if (arrayExigenciasBeneficio[i].codExigenciaBeneficio === '') {
            isTodasAsExigenciasEstaoSelecionadas = false;
        }
    }

    if(isTodasAsExigenciasEstaoSelecionadas){
        $('a[id^="botaoExcluirExigencia_"]').show();
        $('input[id^="checkboxFaltante_"]').prop('disabled', false);
        $('input[id^="checkboxIlegivel_"]').prop('disabled', false);
    }

}


function montarComboExigenciasDesconsideradoJaSelecionadas(jsonListaCodigos){
    let conteudoLinha = '<option value="">Selecione</option>';

    $.each(jsonListaCodigos.codigos, function(eachIndice, eachCodigo){
        let exigenciaJaSelecionada = false;
        for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
            if (arrayExigenciasBeneficio[i].codExigenciaBeneficio === eachCodigo.codPar) {
                exigenciaJaSelecionada  = true;
                break;
            }
        }
        if(!exigenciaJaSelecionada){
            conteudoLinha    += '<option value="' + eachCodigo.codPar + '">' + eachCodigo.desDescricao + '</option>';
        }
    });
    return conteudoLinha;
}


function verificarSePodeAlterarStatusExigencia(){
    if(arrayExigenciasBeneficio.length >= 1){
        alert('Não é possivel alterar o status da Análise Exigência caso exista algum registro de exigência inserido.');
        $('#codAnalise').val('3'); //Exigência
    }
}


function validarExigenciaBeneficio(){
    let mensagemValidacao = '';
    for(let i = arrayExigenciasBeneficio.length - 1; i >= 0; i--) {
        if (arrayExigenciasBeneficio[i].codExigenciaBeneficio === '') {
            mensagemValidacao = 'É necessário selecionar a exigência do benefício que está habilitada.'
        }

        if (arrayExigenciasBeneficio[i].flgTipoExigencia === '') {
            mensagemValidacao = 'Nas Exigências do Benefício, deverá ser selecionado Faltante ou Ilegível para todas as Exigências.'
        }
    }
    return mensagemValidacao;
}
