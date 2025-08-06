const controleCompensacaoConsumer = {
  getData: function (servico, params) {
      domain = 'https://sigeprev.spprev.sp.gov.br/comprev-backend/';
      token = 'token123';

      let dominioServicoParametros = domain + servico;
      if(params !== undefined && params !== '{}'){
        dominioServicoParametros = dominioServicoParametros + '?' + $.param(params);
      }

      let settings = {
              "async": false,
              "crossDomain": true,
              "url": dominioServicoParametros,
              "method": "GET",
              "headers": {
                  "Cache-Control": "no-cache",
                  "Authorization": token
              }
          }
          let JSONData = {};
          $.ajax(settings).done(function (response) {
              JSONData = response;  
          });
          //return JSON.stringify(JSONData);
    return JSONData;
  }
};

//CPF do Servidor
//NOME DO SERVIDOR
//Colunas : CPF e Nome

//Cpf do Servidor
//CPF DO SERVIDOR
//CPF    NOME

// Nome do Dependente
//NOME DO DEPENDENTE
// Colunas Cpf do Servidor, Nome do Dependente, Nome da Mae, Data de Nascimento

//CPF do dependente
//CPF DO DEPENDENTE
// CPF do Servidor, Nome do Dependente, Nome da Mae, Data de Nascimento 

//Cod beneficio aposentadoria
//COD. BENEFÍCIO
//Mat./RS/RF/RE    CPF  Nome

//PISPASEP do Servidor
//PIS/PASEP DO SERVIDOR:



function ajustarCampoValor(){
    with (document.forms[0]) {

        $('#valor').val('');

        valor.onkeydown = null;
        valor.onkeyup = null;
        valor.onblur = null;

        if ($('#tipoConsulta').val() === 'Nome do Servidor') {

        } else if ($('#tipoConsulta').val() === 'CPF do Servidor') {
            setaMascara(valor,"###########");
        } else if ($('#tipoConsulta').val() === 'Cod. Benefício (Aposentadoria)') {
            setaMascara(valor,"##########");
        }

    }

}

function consultar() {
    $('#divResultadoConsulta').empty();


    if($('#valor').val() === ''){
        alert('O campo valor não foi preenchido.');
        return;
    }

    if($('#valor').val().length < 3){
        alert('É necessário preencher pelo menos 3 caracteres no campo valor.');
        return;
    }

    let params = {};
    params.tipoConsulta = $('#tipoConsulta').val();
    params.valor = $('#valor').val();

    let listaResultado = consumidor.executarServico("servidorConsultaGenerica2/consultar", params);


    if(JSON.stringify(listaResultado) === '[]'){
        alert('Não foram encontrados registros para o valor consultado.');
    }else{
        let conteudoTabela = '<div class="table-responsive">';
        conteudoTabela += '<table class="tabelaPaddingMenor" id="tabelaResultadoConsulta">';
        conteudoTabela += '<thead>';

        if ($('#tipoConsulta').val() === 'Nome do Servidor') {
            conteudoTabela += obterConteudoTabelaNomeOuCpfServidor(listaResultado);
        }else if ($('#tipoConsulta').val() === 'CPF do Servidor') {
            conteudoTabela += obterConteudoTabelaNomeOuCpfServidor(listaResultado);
        }else if ($('#tipoConsulta').val() === 'Nome do Dependente') {
            conteudoTabela += obterConteudoTabelaNomeOuCpfDependente(listaResultado);
        }else if ($('#tipoConsulta').val() === 'CPF do Dependente') {
            conteudoTabela += obterConteudoTabelaNomeOuCpfDependente(listaResultado);            
        }else if ($('#tipoConsulta').val() === 'Cod. Benefício (Aposentadoria)') {
            conteudoTabela += obterConteudoTabelaCodBeneficioAposentadoria(listaResultado);
        }

        conteudoTabela += '</tbody>';
        conteudoTabela += '</table>';
        conteudoTabela += '</div>';
        $('#divResultadoConsulta').append(conteudoTabela);
    }
}


function obterConteudoTabelaNomeOuCpfServidor(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>CPF</th>';
    conteudoTabela += '<th>Nome</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachPessoaFisica) {

        conteudoTabela += '<tr>';
        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\');">';
        conteudoTabela +=              eachPessoaFisica.numCpf;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\');">';
        conteudoTabela +=              eachPessoaFisica.nomPessoaFisica;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}

function obterConteudoTabelaNomeOuCpfDependente(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>CPF</th>';
    conteudoTabela += '<th>Nome</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachPessoaFisica) {

        conteudoTabela += '<tr>';
        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\');">';
        conteudoTabela +=              eachPessoaFisica.numCpf;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\');">';
        conteudoTabela +=              eachPessoaFisica.nomPessoaFisica;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}

function obterConteudoTabelaCodBeneficioAposentadoria(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>Mat./RS/RF/RE</th>';
    conteudoTabela += '<th>CPF</th>';
    conteudoTabela += '<th>Nome</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachBeneficio) {

        conteudoTabela += '<tr>';
        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\');">';
        conteudoTabela +=              eachBeneficio.codIdeRelFunc;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\');">';
        conteudoTabela +=              eachBeneficio.numCpf;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\');">';
        conteudoTabela +=              eachBeneficio.nomPessoaFisica;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}


function selecionarPessoaFisica(paramNumCpf){
    window.opener.carregarNumCpfPelaConsultaDetalhada(paramNumCpf);
    window.close();
}