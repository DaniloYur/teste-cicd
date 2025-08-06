// const controleCompensacaoConsumer = {
//   getData: function (servico, params) {
//       domain = 'https://sigeprev.spprev.sp.gov.br/comprev-backend/';
//       token = 'token123';
//
//       let dominioServicoParametros = domain + servico;
//       if(params !== undefined && params !== '{}'){
//         dominioServicoParametros = dominioServicoParametros + '?' + $.param(params);
//       }
//
//       let settings = {
//               "async": false,
//               "crossDomain": true,
//               "url": dominioServicoParametros,
//               "method": "GET",
//               "headers": {
//                   "Cache-Control": "no-cache",
//                   "Authorization": token
//               }
//           }
//           let JSONData = {};
//           $.ajax(settings).done(function (response) {
//               JSONData = response;
//           });
//           //return JSON.stringify(JSONData);
//     return JSONData;
//   }
// };

$(function() {
    let numCpfMultiplo = urlParametros.get("paramNumCpfMultiplo");
    if (numCpfMultiplo !== null) {
        $('#tipoConsulta').val('CPF do Servidor');
        $('#valor').val(numCpfMultiplo);
        consultar();
    }
});




function ajustarCampoValor(){
    with (document.forms[0]) {
        $('#valor').val('');
        valor.onkeydown = null;
        valor.onkeyup = null;
        valor.onblur = null;

        if ($('#tipoConsulta').val() === 'Nome do Servidor') {
            //Não existe máscara.
        } else if ($('#tipoConsulta').val() === 'CPF do Servidor') {
            setaMascara(valor,"###########");
        }else if ($('#tipoConsulta').val() === 'Nome do Dependente') {
            //Não existe máscara.
        }else if ($('#tipoConsulta').val() === 'CPF do Dependente') {
            setaMascara(valor,"###########");
        }else if ($('#tipoConsulta').val() === 'Cod. Benefício (Pensão por Morte)') {
            setaMascara(valor,"##########");
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

    let listaResultado = consumidor.executarServico("servidorConsultaGenerica/consultar", params);

    if(JSON.stringify(listaResultado) === '[]'){
        alert('Não foram encontrados registros para o valor consultado.');
    }else{
        let conteudoTabela = '<div class="table-responsive">';
        conteudoTabela += '<table class="tabelaPaddingMenor" id="tabelaResultadoConsulta">';
        conteudoTabela += '<thead>';

        if ($('#tipoConsulta').val() === 'Nome do Servidor') {
            conteudoTabela += obterConteudoTabelaServidor(listaResultado);
        }else if ($('#tipoConsulta').val() === 'CPF do Servidor') {
            conteudoTabela += obterConteudoTabelaServidor(listaResultado);
        }else if ($('#tipoConsulta').val() === 'Nome do Dependente') {
            conteudoTabela += obterConteudoTabelaDependente(listaResultado);
        }else if ($('#tipoConsulta').val() === 'CPF do Dependente') {
            conteudoTabela += obterConteudoTabelaDependente(listaResultado);
        }else if ($('#tipoConsulta').val() === 'Cod. Benefício (Pensão por Morte)') {
            conteudoTabela += obterConteudoTabelaCodBeneficio(listaResultado);
        }else if ($('#tipoConsulta').val() === 'Cod. Benefício (Aposentadoria)') {
            conteudoTabela += obterConteudoTabelaCodBeneficio(listaResultado);
        }
        conteudoTabela += '</tbody>';
        conteudoTabela += '</table>';
        conteudoTabela += '</div>';
        $('#divResultadoConsulta').append(conteudoTabela);
    }
}

function obterConteudoTabelaDependente(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>CPF do Servidor</th>';
    conteudoTabela += '<th>Nome do Dependente</th>';
    conteudoTabela += '<th>Nome da Mãe</th>';
    conteudoTabela += '<th>Data de Nascimento</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachPessoaFisica) {
        conteudoTabela += '<tr>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpfServ + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.numCpfServ;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpfServ + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.nomPessoaFisicaDep;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpfServ + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.nomMaeDep;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpfServ + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.datNascDep;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}

function obterConteudoTabelaServidor(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>CPF</th>';
    conteudoTabela += '<th>Nome</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachPessoaFisica) {
        conteudoTabela += '<tr>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.numCpf;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachPessoaFisica.numCpf + '\',\'' + eachPessoaFisica.codIdeCli + '\');">';
        conteudoTabela +=              eachPessoaFisica.nomPessoaFisica;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}

function obterConteudoTabelaCodBeneficio(listaResultado){
    let conteudoTabela = '';
    conteudoTabela += '<th>Mat./RS/RF/RE</th>';
    conteudoTabela += '<th>CPF</th>';
    conteudoTabela += '<th>Nome</th>';
    conteudoTabela += '</thead>';
    conteudoTabela += '<tbody>';
    $.each(listaResultado, function (eachIndice, eachBeneficio) {
        conteudoTabela += '<tr>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\',\'' + eachBeneficio.codIdeCli + '\');">';
        conteudoTabela +=              eachBeneficio.codIdeRelFunc;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\',\'' + eachBeneficio.codIdeCli + '\');">';
        conteudoTabela +=              eachBeneficio.numCpf;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela +=     '<td>';
        conteudoTabela +=         '<a href="javascript:selecionarPessoaFisica(\'' + eachBeneficio.numCpf + '\',\'' + eachBeneficio.codIdeCli + '\');">';
        conteudoTabela +=              eachBeneficio.nomPessoaFisica;
        conteudoTabela +=         '</a>';
        conteudoTabela +=      '</td>';

        conteudoTabela += '</tr>';
    });

    return conteudoTabela;
}


function selecionarPessoaFisica(paramNumCpf, paramCodIdeCli){
    window.opener.carregarNumCpfPelaConsultaDetalhada(paramNumCpf, paramCodIdeCli);
    window.close();
}