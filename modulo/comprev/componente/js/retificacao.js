

function carregarRetificacoesTelaCadastroRequerimento(){
    $('#divRetificacoes').empty();

    let paramsRetificacoes  = {};

    let numSeqReq = $('#hiddenNumSeqReq').val();

    if(numSeqReq !== ''){
        paramsRetificacoes.numSeqReq = $('#hiddenNumSeqReq').val();
        let jsonRetificacoes = consumidor.executarServico("retificacao/pesquisarRetificacoesTelaCadastroRequerimento", paramsRetificacoes);

        if(JSON.stringify(jsonRetificacoes.listaRetificacoes) !== '[]'){
            let conteudoTabela =  '';
            conteudoTabela     +=  ' <h2><i class="fa fa-user" aria-hidden="true"></i> Histórico de Alterações</h2>';
            conteudoTabela     += '<table id="tabelaRetificacoees" class="tabelaPaddingMenor">';
            conteudoTabela     += '<thead>';
            conteudoTabela     += '<th>Data</th>';
            conteudoTabela     += '<th>Usuário</th>';
            conteudoTabela     += '<th>Campo</th>';
            conteudoTabela     += '<th>Valor Anterior</th>';
            conteudoTabela     += '<th>Valor Atualizado</th>';
            conteudoTabela     += '<th>Análise Spprev</th>';
            conteudoTabela     += '<th>Observação</th>';
            conteudoTabela     += '</thead>';
            conteudoTabela     += '<tbody>';

            $.each(jsonRetificacoes.listaRetificacoes, function(eachIndice, eachRetificacao){
                conteudoTabela     += '<input type="hidden" name="hiddenNumSeqRetificacao" value="' + eachRetificacao.numSeqRetificacao + '"/>';
                conteudoTabela     += '<input type="hidden" name="hiddenCodCampoRetificacao_' + eachRetificacao.numSeqRetificacao + '" value="' + eachRetificacao.codCampo + '"/>';

                conteudoTabela     += '<tr>';
                conteudoTabela     +=     '<td>' + eachRetificacao.datIng + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.nomUsuUltAtu + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.desCampo + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.valMascaraAtual + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.valMascaraNovo + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.desCampoAtualizado + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.observacao + '</td>';
                conteudoTabela     += '</tr>';
            });

            conteudoTabela     += '</tbody>';
            $('#divRetificacoes').append(conteudoTabela);
        }
    }

}


function carregarRetificacoesTelaRequerimento() {
    $('#divRetificacoes').empty();
     let paramsRetificacoes  = {};
     paramsRetificacoes.numSeqReq = $('#hiddenNumSeqReq').val();
     let jsonRetificacoes = consumidor.executarServico("retificacao/pesquisarRetificacoesTelaRequerimento", paramsRetificacoes);

    if(JSON.stringify(jsonRetificacoes.listaRetificacoes) !== '[]'){
        let conteudoTabela =  '';

        conteudoTabela     += '<table id="tabelaRetificacoees" class="tabelaPaddingMenor">';
        conteudoTabela     += '<thead>';
        conteudoTabela     += '<th >Data</th>';
        conteudoTabela     += '<th>Campo</th>';
        conteudoTabela     += '<th>Valor Atual</th>';
        conteudoTabela     += '<th></th>';
        conteudoTabela     += '<th>Valor Novo</th>';
        conteudoTabela     += '<th></th>';
        conteudoTabela     += '<th>Observação</th>';
        conteudoTabela     += '</thead>';
        conteudoTabela     += '<tbody>';

        $.each(jsonRetificacoes.listaRetificacoes, function(eachIndice, eachRetificacao){
                conteudoTabela     += '<input type="hidden" name="hiddenNumSeqRetificacao" value="' + eachRetificacao.numSeqRetificacao + '"/>';
                conteudoTabela     += '<input type="hidden" name="hiddenCodCampoRetificacao_' + eachRetificacao.numSeqRetificacao + '" value="' + eachRetificacao.codCampo + '"/>';

                conteudoTabela     += '<tr>';
                conteudoTabela     +=     '<td>' + eachRetificacao.datIng + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.desCampo + '</td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.valMascaraAtual + '</td>';
                conteudoTabela     +=     '<td><input type="radio" name="retificacaoFlgValSelecionado_' + eachRetificacao.numSeqRetificacao + '" value="A"/></td>';
                conteudoTabela     +=     '<td>' + eachRetificacao.valMascaraNovo + '</td>';
                conteudoTabela     +=     '<td><input type="radio" name="retificacaoFlgValSelecionado_' + eachRetificacao.numSeqRetificacao + '" value="N"/></td>';
                conteudoTabela     +=     '<td><input type="text" size="25" name="retificacaoObservacao_' + eachRetificacao.numSeqRetificacao + '" value=""/></td>';
                conteudoTabela     += '</tr>';
        });

        conteudoTabela     += '</tbody>';

        $('#divRetificacoes').append(conteudoTabela);
    }else{
        $('#divRetificacoes').append("Não existem retificações para o requerimento.");
        $('#btnGravarRetificacao').hide();

    }
}





function gravarRetificacoes(){

    let r = confirm("Todas as retificações selecionadas serão gravadas diretamente no banco, e todas as informações alteradas na tela serão descartadas. Deseja continuar?");
    if (r == true) {
    } else {
       return;
    }


    let params = {};

    let arrayRetificacoes = [];

    let arrayHiddensRetificacoes = [];
    $('input[name=hiddenNumSeqRetificacao]').each(function (){
        arrayHiddensRetificacoes.push($(this).val());
    });


    let mensagemValidacao = '';
    for (let index = 0; index < arrayHiddensRetificacoes.length; ++index) {
        let objetoRetificacao = obterObjetoRetificacao();
        objetoRetificacao.numSeqRetificacao = arrayHiddensRetificacoes[index];
        objetoRetificacao.codCampo =  $('input[name=hiddenCodCampoRetificacao_' + arrayHiddensRetificacoes[index] + ']').val();

        let valFlgValSelecionado  = $('input[name=retificacaoFlgValSelecionado_' + arrayHiddensRetificacoes[index] + ']:checked').val();
        if(valFlgValSelecionado === undefined){
            objetoRetificacao.flgValSelecionado = "";
        }else{
            objetoRetificacao.flgValSelecionado = valFlgValSelecionado;
        }

        objetoRetificacao.observacao =  $('input[name=retificacaoObservacao_' + arrayHiddensRetificacoes[index] + ']').val();



        if(objetoRetificacao.flgValSelecionado === "A" && objetoRetificacao.observacao === ""){
            mensagemValidacao = 'Preencha o campo observação da retificação que está com o valor atual selecionado.';
        }
        arrayRetificacoes.push(objetoRetificacao);
    }

    if(mensagemValidacao === ''){
        params.login = $('#hiddenLogin').val();
        params.numSeqReq =  $('#hiddenNumSeqReq').val();
        params.arrayRetificacoes = JSON.stringify(arrayRetificacoes);

        let jsonRetificacoesGravado = consumidor.executarServico("retificacao/gravarRetificacoes", params);


        if(jsonRetificacoesGravado.codStatus !== 0){
            alert(jsonRetificacoesGravado.msgStatus);
            return;
         }else{

            if($('#codAnalise').val() === "3") { //Exigencia
                alert("O requerimento está em exigência de dados. Após o cumprimento das exigências, para envio da retificação ao Comprev você deve alterar o campo Análise para “Pronto para Enviar ao Comprev.");
            }else{
                alert("Bloco de Retificação gravado com sucesso.");
            }

            let urlParam = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/pagina/html/requerimento.html';
            urlParam     += "?numCpf="        + $('#hiddenNumCpf').val();
            urlParam     += "&codIdeCli="     + $('#hiddenCodIdeCli').val();
            urlParam     += "&numSeqFunc="    + $('#hiddenNumSeqFunc').val();
            urlParam     += "&numMatricula="  + $('#hiddenNumMatricula').val();
            urlParam     += "&codIdeRelFunc=" + $('#hiddenCodIdeRelFunc').val();

            urlParam     += "&numSeqBeneficio="    +  $('#hiddenNumSeqBeneficio').val();
            urlParam     += "&numSeqReq="          +  $('#hiddenNumSeqReq').val();
            window.location.href = urlParam;

        }
    }else{
        alert(mensagemValidacao);
    }

}


function obterObjetoRetificacao(){
    let objetoRetificacao = {
        numSeqRetificacao  : '',
        codCampo           : '',
        flgValSelecionado  : '',
        observacao         : ''
    }
    return objetoRetificacao;
}


function bloquearOuDesbloquearBotaoGravarRetificacao(){

    $('#btnGravarRetificacao').prop("disabled", false);
    $('#mensagemRetificacao').hide();
    if($('#codAnalise').val() === "8"){ //Campo analise - enviado ao comprev com sucesso
        if($('#codEstadoReq').val() !== "2") { // diferente de em Exigencia
            $('#btnGravarRetificacao').prop("disabled", true);
            $('#mensagemRetificacao').show();
        }
    }

}



function abrirTelaHistoricoRetificacao(){
    let urlParam = urlDominioFrontEnd + urlContextoFrontEnd + 'modulo/comprev/componente/html/historicoRetificacao.html';
    urlParam     += "?numSeqReq=" + $('#hiddenNumSeqReq').val();
    window.open(urlParam,'pagina',"width=850, height=555, top=100, left=110, scrollbars=no ");
}
