
let paramsCod_entidade

function init() {
  with (document.forms[0]) {
    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
    setaMascara(datIncorp, MASK_DATA);
  }
  
  $('[data-toggle="tooltip"]').tooltip();

  $("#fixedValue").maskMoney({thousands:'.', decimal:',', affixesStay: false, precision:4});
  $("#unitValue").maskMoney({thousands:'.', decimal:',', affixesStay: false, precision:4});
  $("#percentageValue").maskMoney({thousands:'.', decimal:',', affixesStay: false, precision:2});
  $('#btnConsultarCargosComissionadosServidor').hide();
}


function consultaDiretaFuncao() {
  $.ajax({
    url: urlBackendConsultaDiretaFuncao + "?cod_entidade=" + paramsCod_entidade + "&cod_funcao="+$('#codFuncao').val()+"&cod_conceito="+cod_conceito_rub,
    success: function(data){
        console.log(data);
        if (data.valor != undefined && data.valor != '') {
          $('#descricaoFuncao').html(data.valor);
        } else {
          $('#descricaoFuncao').html("Fun&ccedil;&atilde;o "+$('#codFuncao').val()+" n&atilde;o encontrado");
          $('#codFuncao').val('');
        }
    }
  }); 
}


function consultaDiretaCargo() {
  $.ajax({
    url: urlBackendConsultaDiretaCargo + "?cod_entidade=" + paramsCod_entidade + "&cod_cargo="+$('#codCargoIncorp').val(),
    success: function(data){
        console.log(data);
        if (data.valor != undefined && data.valor != '') {
          $('#descricaoCargoIncorporado').html(data.valor);
        } else {
          $('#descricaoCargoIncorporado').html("Cargo "+$('#codCargoIncorp').val()+" n&atilde;o encontrado");
          $('#codCargoIncorp').val('');
        }        
    }
  }); 
}

function consultaDiretaReferencia() {
  $.ajax({
    url: urlBackendConsultaDiretaReferencia + "?cod_entidade=" + paramsCod_entidade + "&cod_referencia="+$('#salarioReferencia').val()+"&cod_cargo="+$('#codCargoIncorp').val(),
    success: function(data){
        console.log(data);
        if (data.valor != undefined && data.valor != '') {
          $('#descricaoComposicaoReferencia').html(data.valor);
        } else {
          $('#descricaoComposicaoReferencia').html("Refer&ecirc;ncia "+$('#salarioReferencia').val()+" n&atilde;o encontrada");
          $('#salarioReferencia').val('');
        }
    }
  }); 
}


function consultaDiretaCargo2() {
  $.ajax({
    url: urlBackendConsultaDiretaCargo + "?cod_entidade=" + paramsCod_entidade + "&cod_cargo="+$('#codCargo2').val(),
    success: function(data){
        console.log(data);
        if (data.valor != undefined && data.valor != '') {
          $('#descricaoCargoIncorporado2').html(data.valor);
        } else {
          $('#descricaoCargoIncorporado2').html("Cargo "+$('#codCargo2').val()+" n&atilde;o encontrado");
          $('#codCargo2').val('');
        }        
    }
  }); 
}

function consultaDiretaReferencia2() {
  $.ajax({
    url: urlBackendConsultaDiretaReferencia + "?cod_entidade=" + paramsCod_entidade + "&cod_referencia="+$('#salarioReferencia2').val()+"&cod_cargo="+$('#codCargo2').val(),
    success: function(data){
      console.log(data);
      if (data.valor != undefined && data.valor != '') {
        $('#descricaoComposicaoReferencia2').html(data.valor);
      } else {
        $('#descricaoComposicaoReferencia2').html("Refer&ecirc;ncia "+$('#salarioReferencia2').val()+" n&atilde;o encontrada");
        $('#salarioReferencia2').val('');
      }
    }
  }); 
}


function consultarSalarioReferencia() {
	if(paramsCod_entidade != '') {
		with (document.forms[0]) {

      if ($('#codCargoIncorp').val() == '') {
          alertSigePrev('Voc&ecirc; precisa preencher um c&oacute;digo de cargo para pesquisar uma refer&ecirc;ncia.');
          return;
      }

			var retornoConsulta = new Array;
			url = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/salarioReferenciaConsulta.do?modExibicao=7&tpConsulta=9&acaoAux=COMPOSICAOBENEFICIO&acao=PESQUISAR&codCargo="+$('#codCargoIncorp').val()+"&formOrigem=movimentacaoPontual&codEntidade="+paramsCod_entidade+"&acaoAux=MOVPONT";
			params = ["salarioReferencia"];
			retornoConsulta = janelaSimples2(url, params, "processarCodRefPadVenc(retornoConsulta)", "consulta"); //habilitaCamposForm(window.opener.document.forms[0])
		}
	} else {
		alertNew('Um beneficiario deve ser selecionado.');
	}
}

function processarCodRefPadVenc(retornoConsulta) {
	if (retornoConsulta != null) {
		//document.getElementById("idSpanComposicao").innerHTML = retornoConsulta[1];	
    console.log('retornoConsulta: ');
    console.log(retornoConsulta);
	}
}

function consultarSalarioReferencia2() {
	if(paramsCod_entidade != '') {
		with (document.forms[0]) {

      if ($('#codCargo2').val() == '') {
        alertSigePrev('Voc&ecirc; precisa preencher um c&oacute;digo de cargo para pesquisar uma refer&ecirc;ncia.');
        return;
      }

			var retornoConsulta = new Array;
      url = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/salarioReferenciaConsulta.do?modExibicao=7&tpConsulta=9&acaoAux=COMPOSICAOBENEFICIO&acao=PESQUISAR&codCargo="+$('#codCargoIncorp').val()+"&formOrigem=movimentacaoPontual&codEntidade="+paramsCod_entidade+"&acaoAux=MOVPONT";
			params = ["salarioReferencia2"];
			retornoConsulta = janelaSimples2(url, params, "", "consulta"); //habilitaCamposForm(window.opener.document.forms[0])
		}
	} else {
		alertNew('Um beneficiario deve ser selecionado.');
	}
}

function consultarCargoComissionado() {
	with (document.forms[0]) {
    if(paramsCod_entidade != '') {
      var parametroConsulta = "?nomeParam1=codEntidade&nomeParam2=codPccs&nomeParam4=flgComissao";
		
      parametroConsulta = parametroConsulta + "&valorParam1=" + paramsCod_entidade + "&valorParam2=" + 0 + "&valorParam4=N";
      parametroConsulta = parametroConsulta + "&pacote=com.sondaprev.cadastro.model&nomeClasse=Cargo&paramFind=nomCargo";
      parametroConsulta = parametroConsulta + "&retornoParam1=codCargo&retornoParam2=nomCargo&funcaoRetorno=retornoCargoComissionado";
      
      url = urlDominioSigeprev + urlContextoSigeprev + "/comum/consultaGenerica.do" + parametroConsulta;
      params = ["","","","codCargoIncorp"];
      retornoConsulta = janelaSimples2(url, params, "processarConsultaCargoComissionado(retornoConsulta)", "consulta");
    }
	}
}

function processarConsultaCargoComissionado(retornoConsulta){
	if (retornoConsulta != null) {
		//document.getElementById("idSpanNomeCargo").innerHTML = retornoConsulta[4];
    console.log('retornoConsulta: ');
    console.log(retornoConsulta);
	}
}


function consultarCargoComissionado2() {
	with (document.forms[0]) {
    if(paramsCod_entidade != '') {
      var parametroConsulta = "?nomeParam1=codEntidade&nomeParam2=codPccs&nomeParam4=flgComissao";
		
      parametroConsulta = parametroConsulta + "&valorParam1=" + paramsCod_entidade + "&valorParam2=" + 0 + "&valorParam4=N";
      parametroConsulta = parametroConsulta + "&pacote=com.sondaprev.cadastro.model&nomeClasse=Cargo&paramFind=nomCargo";
      parametroConsulta = parametroConsulta + "&retornoParam1=codCargo&retornoParam2=nomCargo&funcaoRetorno=retornoCargoComissionado";
      
      url = urlDominioSigeprev + urlContextoSigeprev + "/comum/consultaGenerica.do" + parametroConsulta;
      params = ["","","","codCargo2"];
      retornoConsulta = janelaSimples2(url, params, "processarConsultaCargoComissionado(retornoConsulta)", "consulta");
    }
	}
}

function consultarCodFuncaoIncorporacao() {
	var retornoConsulta = new Array;
    var url = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/popupSelecionarFuncaoIncorporacao.do?metodoParaChamarNoServidor=init&codEntidade="+paramsCod_entidade+"&codConceito=" + cod_conceito_rub + "&codFuncao=" + $('#codFuncao').val();
		params = ["codFuncao"];
		janelaSimples(url, params, "processarFuncaoIncorporacao(retornoConsulta)");
}

function processarFuncaoIncorporacao(retornoConsulta){
	//setSpanDescricaoFuncao(retornoConsulta[1]);
  $('#idSpanDescFuncaoIncorporacao').html(retornoConsulta[1]);
  console.log('retornoConsulta: ');
  console.log(retornoConsulta);
}

$(function(){
  init();
});

var urlBackendListaDeRubricas                             = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/rubricas/lista"
var urlBackendParamCalcRepresPrinc                        = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/paramCalcRepresPrinc/lista"
var urlBackendListaDeOrdemJudicial                        = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/ordemJudicial/lista"
var urlBackendListarComposicaoBeneficio                   = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/listarComposicaoBeneficio"
var urlBackendListarComposicaoBeneficioHistoricoCompleto  = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/listarComposicaoBeneficioHistoricoCompleto"
var urlBackendCriarComposicaoBeneficio                    = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/criar"
var urlBackendAtualizarComposicaoBeneficio                = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/atualizar"
var urlBackendCancelarComposicaoBeneficio                 = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/cancelar"
var urlBackendListarComposicaoBeneficioChaveComposta      = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/listarComposicaoBeneficioChaveComposta"
var urlBackendDeletarComposicaoBeneficioChaveComposta     = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/composicaoBeneficio/deletarComposicaoBeneficioChaveComposta"

var urlCriteriosReajustesConsulta                  = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/criteriosReajustesMovConsulta.do"
var urlMostrarEmentarioRubrica                     = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/consultaEmentarioRubrica.do"
var urlMostrarHistoricoAnaliseContraCheque         = urlDominioSigeprev + urlContextoSigeprev + "/jsp/folhaPagamento/historicoAnaliseContraCheque.jsp"
var urlMostrarHistoricoSalarial                    = urlDominioSigeprev + urlContextoSigeprev + "/jsp/folhaPagamento/historicoSalarial.jsp"
var urlMostrarHistoricoFinanceiroPensaoAlimenticia = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/historicoFinanceiroPensaoAlimenticiaLayoutNovo.do"
var urlMostrarHistoricoFinanceiroTerceiro          = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/historicoFinanceiroTerceiroLayoutNovo.do"
var urlHistoricoPDF                                = urlDominioSigeprev + urlContextoSigeprev + "/folhaPagamento/historicoComposicao.do"

var urlBackendConsultaDiretaFuncao                 = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/pesquisa/funcao"
var urlBackendConsultaDiretaCargo                  = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/pesquisa/cargo"
var urlBackendConsultaDiretaReferencia             = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/pesquisa/referencia"

$(document).ready(function() {
  window.onload = initPage();

  var paramsCod_simulacao;
  var paramsCod_beneficio;

  function initPage() {
    var uri = window.location.href;
    var url = new URL(uri);
    paramsCod_simulacao = url.searchParams.get("cod_simulacao"); // recupera o parametro cod_simulacao da uri
    paramsCod_beneficio = url.searchParams.get("cod_beneficio"); // recupera o parametro cod_beneficio da uri
    paramsCod_entidade  = url.searchParams.get("cod_entidade");  // recupera o parametro cod_beneficio da uri
    paramsCod_ide_cli   = url.searchParams.get("cod_ide_cli");  // recupera o parametro cod_beneficio da uri

    document.getElementById('btnExcluir').disabled = true;
    document.getElementById('btnAtualizar').disabled = true;
    
    var urlComposicao = urlBackendListarComposicaoBeneficio;
    listarComposicaoBeneficio (urlComposicao);

    $('#btnExibirHistorico').click(function() {
      if (urlComposicao == urlBackendListarComposicaoBeneficioHistoricoCompleto ) {
        urlComposicao = urlBackendListarComposicaoBeneficio
      } else {
        urlComposicao = urlBackendListarComposicaoBeneficioHistoricoCompleto;
      }
      listarComposicaoBeneficio(urlComposicao);
    });

    $('#btnCriterioReajuste').click(function() {
      window.open(urlCriteriosReajustesConsulta + "?codIdeCli=" + paramsCod_ide_cli + "&codBeneficio=" + paramsCod_beneficio + "&acao=CONSULTA")
    })

    $('#btnConsultaEmentarioRubricas').click(function() {
      window.open(urlMostrarEmentarioRubrica + "?codIdeCli=" + paramsCod_ide_cli + "&codEntidade=1" + "&codConceito=" + "&v=2")
    })

    $('#btnHistoricoAnaliseContraCheque').click(function() {
      window.open(urlMostrarHistoricoAnaliseContraCheque + "?codIdeCli=" + paramsCod_ide_cli + "&codBeneficio=" + paramsCod_beneficio)
    })
    
    $('#btnMostrarHistoricoSalarial').click(function() {
      window.open(urlMostrarHistoricoSalarial + "?codIdeCli=" + paramsCod_ide_cli + "&codBeneficio=" + paramsCod_beneficio)
    })

    $('#btnMostrarHistoricoFinanceiroPensaoAlimenticia').click(function() {
      window.open(urlMostrarHistoricoFinanceiroPensaoAlimenticia + "?codIdeCli=" + paramsCod_ide_cli + "&codBeneficio=" + paramsCod_beneficio)
    })

    $('#btnMostrarHistoricoFinanceiroTerceiro').click(function() {
      window.open(urlMostrarHistoricoFinanceiroTerceiro + "?codIdeCli=" + paramsCod_ide_cli + "&codBeneficio=" + paramsCod_beneficio)
    })

    $('#btnHistoricoPDF').click(function() {
      window.open(urlHistoricoPDF + "?codBeneficio=" + paramsCod_beneficio + "&codIdeCliBen=" + paramsCod_ide_cli + "&codEntidade=" + paramsCod_entidade + "&periodo=" + "&tipoBeneficio=" + "&indOpcao=0")
    })
    carregarCabecalho();
  } // fim initPage()

  function carregacomboRubricas() {
    $.getJSON(urlBackendListaDeRubricas+"?cod_beneficio="+urlParametros.get("cod_beneficio")+"&cod_simulacao="+urlParametros.get("cod_simulacao"), function (dados) {
      //console.log(dados);
      if (urlBackendListaDeRubricas.length > 0) {
        $('#comboRubricas').children().remove();
        var option = '<option>Selecionar</option>';
        $(option).appendTo('#comboRubricas');
        $.each(dados, function(key, value) {
          //console.log(dados);
          option = '<option value="' + value.CHAVE + '" data-tip-valor="'+(value.TIP_VALOR == null ? "" : value.TIP_VALOR)+'"  data-flg-quota="'+(value.FLG_QUOTA == null ? "" : value.FLG_QUOTA)+'"  data-flg-natureza="'+(value.FLG_NATUREZA == null ? "" : value.FLG_NATUREZA)+'"  data-flg-incorporacao="'+(value.FLG_INCORPORACAO == null ? "" : value.FLG_INCORPORACAO)+'" data-flg-cod-cargo-incorp="'+(value.FLG_HABILITA_COD_CARGO_INCORP == null ? "" : value.FLG_HABILITA_COD_CARGO_INCORP)+'" data-flg-sal-ref-incorp="'+(value.FLG_HABILITA_SAL_REF_INCORP  == null  ? "" : value.FLG_HABILITA_SAL_REF_INCORP)+'" data-flg-dt-incorp="'+(value.FLG_HABILITA_DT_INCORP == null  ? "" : value.FLG_HABILITA_DT_INCORP)+'" data-flg-cod-funcao-incorp="'+(value.FLG_HABILITA_COD_FUNCAO_INCORP == null ? "" : value.FLG_HABILITA_COD_FUNCAO_INCORP)+'" data-cod-conceito="'+(value.COD_CONCEITO == null ? "" : value.COD_CONCEITO)+'" data-flg-tabela-incorp="'+(value.FLG_HABILITA_TABELA_INCORP     == null ? "" : value.FLG_HABILITA_TABELA_INCORP)+'" data-flg-cod-cargo2-incorp="'+(value.FLG_HABILITA_COD_CARGO2_INCORP == null ? "" : value.FLG_HABILITA_COD_CARGO2_INCORP)+'" data-flg-sal-ref2-incorp="'+(value.FLG_HABILITA_SAL_REF2_INCORP   == null ? "" : value.FLG_HABILITA_SAL_REF2_INCORP)+'" >' + value.VALOR + '</option>';
          $(option).appendTo('#comboRubricas');
        });
      }
    });
  }
  carregacomboRubricas();

  function carregacomboParamCalcRepresPrinc() {
    $.getJSON(urlBackendParamCalcRepresPrinc, function (dados) {
      //console.log(dados);
      if (urlBackendParamCalcRepresPrinc.length > 0) {
        $('#comboParamCalcRepresPrinc').children().remove();
        var option = '<option>Selecionar</option>';
        $(option).appendTo('#comboParamCalcRepresPrinc');
        $.each(dados, function(key, value) {
          //console.log(dados);
          option = '<option value="' + value.COD_ELEMENTO + '">' + value.DES_VARIAVEL + '</option>';
          $(option).appendTo('#comboParamCalcRepresPrinc');
        });
      }
    });
  }
  carregacomboParamCalcRepresPrinc();

  /*
  function carregacomboListaDeOrdemJudicial() {
    var uri = document.baseURI
    //console.log(uri);
    var indexUri = uri.indexOf('cod_ide_cli='); // pegar os parametros da uri
    var params = uri.substring(indexUri, uri.length); // recupera parametros da uri

    $.getJSON(urlBackendListaDeOrdemJudicial + "?" + params, function (dados) {
      //console.log(dados);
      if (urlBackendListaDeOrdemJudicial.length > 0) {
        $('#comboListaDeOrdemJudicial').children().remove();
        var option = '<option>Selecionar</option>';
        $(option).appendTo('#comboListaDeOrdemJudicial');
        $.each(dados, function(key, value) {
          //console.log(dados);
          option = '<option value="' + value.NUM_ORD_JUD + '">' + value.DES_ORD_JUD + '</option>';
          $(option).appendTo('#comboListaDeOrdemJudicial');
        });
      }
    });
  }
  carregacomboListaDeOrdemJudicial();
  */

  // Inserir Composicao Beneficio
  $('#btnInserir').click(function() {
    /* if ($('#comboRubricas').val() != 'Selecionar') {
      alert('campo rubrica é obrigatório')
    } */
    var url = urlBackendCriarComposicaoBeneficio;


    var a = $("#dat_ini_vig").val();
    let b = a.split('/').reverse().join('/');
    let DAT_INI_VIG = b.replaceAll('/', '-');
    console.log(DAT_INI_VIG);

    var c = $("#dat_fim_vig").val();
    let d = c.split('/').reverse().join('/');
    let DAT_FIM_VIG = d.replaceAll('/', '-'); 
    console.log(DAT_FIM_VIG);

    var e = $("#datIncorp").val();
    let f = e.split('/').reverse().join('/');
    let DAT_INCORP = f.replaceAll('/', '-'); 
    console.log(DAT_INCORP);    

    /*
    var a = $("#dat_ini_ref").val();
    let b = a.split('/').reverse().join('/');
    let DAT_INI_REF = b.replaceAll('/', '-');
    console.log(DAT_INI_REF);

    var c = $("#dat_fim_ref").val();
    let d = c.split('/').reverse().join('/');
    let DAT_FIM_REF = d.replaceAll('/', '-'); 
    console.log(DAT_FIM_REF);    
    */

    var matriz;
      matriz = {
        cod_simulacao :     paramsCod_simulacao,
        cod_ins :           1,
        cod_beneficio :     paramsCod_beneficio,
        cod_fcrubrica :     $('#comboRubricas').val(),
        seq_vig_fc :        1,    
        seq_vig :           null, // VALOR SERÁ RECUPERADO EM TEMPO DE EXECUCAO
        val_fixo :          ($('#fixedValue').val() == null || $('#fixedValue').val() == '' ? 0 : $('#fixedValue').val()),
        val_porc :          $('#percentageValue').val(), 
        val_inidade :       $('#unitValue').val(), 
        dat_ini_vig :       DAT_INI_VIG,
        dat_fim_vig :       DAT_FIM_VIG,
        cod_referencia :    $('#salarioReferencia').val(),
        val_str1 :          $('#comboParamCalcRepresPrinc').val(),
        val_str2 :          $('#comboListaDeOrdemJudicial').val(),
        val_porc2 :         $('#PercIncorpRepres').val(),
        flg_status :        'V', 
        cod_entidade :      paramsCod_entidade, 
        cod_pccs :          null,
        ind_opcao :         0, // VALOR TÁ FIXO
        ind_reajuste :      0, // VALOR TÁ FIXO
        cod_fcrubrica_mig : null,
        flg_controle :      null,
        val_fixo_mig :      null,
        dat_incorp :        DAT_INCORP,
        cod_cargo :         $('#codCargoIncorp').val(),
        cod_funcao :        $('#codFuncao').val(),
        cod_referencia_2 :  $('#salarioReferencia2').val(),
        dsc_formula :       null,
        cod_tabela :        $('#codTabela').val(),
        cod_cargo_2 :       $('#codCargo2').val(),
//      usu_ing :           null,
//      dat_ing :           null,
//      dat_ult_atu :       null,
        nom_usu_ult_atu :  'THIAGO-SILVA', // VALOR TÁ FIXO
        nom_pro_ult_atu :  'TASK-55883'    // VALOR TÁ FIXO
      };
            
  // console.log(JSON.stringify(matriz));
    if (validacaoInsert()) {  
      var settings = {
        "async": false,
        "crossDomain": true,
        "processData": false,
        "url": url,
        "method": "POST",
        "headers": {
            "Cache-Control": "no-cache"
          , "Content-Type" : "application/json"
          , "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
        },
        "data": JSON.stringify(matriz),
        "statusCode": {
          200: function() {
            //console.log("UPDATE");
            location.reload(true)
          },
          201: function() {
            location.reload(true)
          },
          404: function() {
            alert('Requisução não encontrada!')
          },
          500: function() {
            alert('Ocorreu um erro interno!')
          }
        }                                
      };
    }

    var _response = {};
      $.ajax(settings).done(function (response) {
    });
  }) // Fim - Inserir Composicao Beneficio




  //-- Inicio Atualizar
  $('#btnAtualizar').click(function() {
    var url = urlBackendAtualizarComposicaoBeneficio

    var a = $("#dat_ini_vig").val();
    let b = a.split('/').reverse().join('/');
    let DAT_INI_VIG = b.replaceAll('/', '-');
    console.log(DAT_INI_VIG);

    var c = $("#dat_fim_vig").val();
    let d = c.split('/').reverse().join('/');
    let DAT_FIM_VIG = d.replaceAll('/', '-'); 
    console.log(DAT_FIM_VIG);

    var e = $("#datIncorp").val();
    let f = e.split('/').reverse().join('/');
    let DAT_INCORP = f.replaceAll('/', '-'); 
    console.log(DAT_INCORP);      

    /*
    var a = $("#dat_ini_ref").val();
    let b = a.split('/').reverse().join('/');
    let DAT_INI_REF = b.replaceAll('/', '-');
    console.log(DAT_INI_REF);

    var c = $("#dat_fim_ref").val();
    let d = c.split('/').reverse().join('/');
    let DAT_FIM_REF = d.replaceAll('/', '-'); 
    console.log(DAT_FIM_REF);    
    */

    var matriz;
      matriz = {
        cod_simulacao :     paramsCod_simulacao,
        cod_ins :           1,
        cod_beneficio :     paramsCod_beneficio,
        cod_fcrubrica :     $('#comboRubricas').val(),
        seq_vig_fc :        1,    
        seq_vig :           $('#comboRubricas').data('seq-vig'), // VALOR SERÁ RECUPERADO EM TEMPO DE EXECUCAO
        val_fixo :          ($('#fixedValue').val() == null || $('#fixedValue').val() == '' ? 0 : $('#fixedValue').val()),
        val_porc :          $('#percentageValue').val(), 
        val_inidade :       $('#unitValue').val(), 
        dat_ini_vig :       DAT_INI_VIG,
        dat_fim_vig :       DAT_FIM_VIG,
        cod_referencia :    $('#salarioReferencia').val(),
        val_str1 :          $('#comboParamCalcRepresPrinc').val(),
        val_str2 :          $('#comboListaDeOrdemJudicial').val(),
        val_porc2 :         $('#PercIncorpRepres').val(),
        flg_status :        $('#comboRubricas').data('flg-status'),
        cod_entidade :      paramsCod_entidade, 
        cod_pccs :          null,
        ind_opcao :         $('#comboRubricas').data('ind-opcao'),
        ind_reajuste :      0, // VALOR TÁ FIXO
        cod_fcrubrica_mig : null,
        flg_controle :      null,
        val_fixo_mig :      null,
        dat_incorp :        DAT_INCORP,
        cod_cargo :         $('#codCargoIncorp').val(),
        cod_funcao :        $('#codFuncao').val(),
        cod_referencia_2 :  $('#salarioReferencia2').val(),
        dsc_formula :       null,
        cod_tabela :        $('#codTabela').val(),
        cod_cargo_2 :       $('#codCargo2').val(),
//      usu_ing :           null,
//      dat_ing :           null,
//      dat_ult_atu :       null,
        nom_usu_ult_atu :  'THIAGO-SILVA', // VALOR TÁ FIXO
        nom_pro_ult_atu :  'TASK-55883'    // VALOR TÁ FIXO
      };
  // console.log(JSON.stringify(matriz));
    var settings = {
      "async": false,
      "crossDomain": true,
      "processData": false,
      "url": url,
      "method": "POST",
      "headers": {
          "Cache-Control": "no-cache"
        , "Content-Type" : "application/json"
        , "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
      },
      "data": JSON.stringify(matriz),
      "statusCode": {
        200: function() {
          //console.log("UPDATE");
          location.reload(true)
        },
        201: function() {
          location.reload(true)
        },
        404: function() {
          alert('Requisução não encontrada!')
        },
        500: function() {
          alert('Ocorreu um erro interno!')
        }
      }                                
    };

    var _response = {};
      $.ajax(settings).done(function (response) {
    });        
  });
  //-- Fim Atualizar

//-- Inicio Cancelar
$('#btnCancelar').click(function() {
  var url = urlBackendCancelarComposicaoBeneficio

  var a = $("#dat_ini_vig").val();
  let b = a.split('/').reverse().join('/');
  let DAT_INI_VIG = b.replaceAll('/', '-');
  console.log(DAT_INI_VIG);

  var c = $("#dat_fim_vig").val();
  let d = c.split('/').reverse().join('/');
  let DAT_FIM_VIG = d.replaceAll('/', '-'); 
  console.log(DAT_FIM_VIG);

  var e = $("#datIncorp").val();
  let f = e.split('/').reverse().join('/');
  let DAT_INCORP = f.replaceAll('/', '-'); 
  console.log(DAT_INCORP);

  /*
  var a = $("#dat_ini_ref").val();
  let b = a.split('/').reverse().join('/');
  let DAT_INI_REF = b.replaceAll('/', '-');
  console.log(DAT_INI_REF);

  var c = $("#dat_fim_ref").val();
  let d = c.split('/').reverse().join('/');
  let DAT_FIM_REF = d.replaceAll('/', '-'); 
  console.log(DAT_FIM_REF);    
  */

  var matriz;
    matriz = {
      cod_simulacao :     paramsCod_simulacao,
      cod_ins :           1,
      cod_beneficio :     paramsCod_beneficio,
      cod_fcrubrica :     $('#comboRubricas').val(),
      seq_vig_fc :        1,    
      seq_vig :           $('#comboRubricas').data('seq-vig'), // VALOR SERÁ RECUPERADO EM TEMPO DE EXECUCAO
      val_fixo :          ($('#fixedValue').val() == null || $('#fixedValue').val() == '' ? 0 : $('#fixedValue').val()),
      val_porc :          $('#percentageValue').val(), 
      val_inidade :       $('#unitValue').val(), 
      dat_ini_vig :       DAT_INI_VIG,
      dat_fim_vig :       DAT_FIM_VIG,
      cod_referencia :    $('#salarioReferencia').val(),
      val_str1 :          $('#comboParamCalcRepresPrinc').val(),
      val_str2 :          $('#comboListaDeOrdemJudicial').val(),
      val_porc2 :         $('#PercIncorpRepres').val(),
      flg_status :        'C', //$('#comboRubricas').data('flg-status') //CANCELADO
      cod_entidade :      paramsCod_entidade, 
      cod_pccs :          null,
      ind_opcao :         $('#comboRubricas').data('ind-opcao'),
      ind_reajuste :      0, // VALOR TÁ FIXO
      cod_fcrubrica_mig : null,
      flg_controle :      null,
      val_fixo_mig :      null,
      dat_incorp :        DAT_INCORP,
      cod_cargo :         $('#codCargoIncorp').val(),
      cod_funcao :        $('#codFuncao').val(),
      cod_referencia_2 :  $('#salarioReferencia2').val(),
      dsc_formula :       null,
      cod_tabela :        $('#codTabela').val(),
      cod_cargo_2 :       $('#codCargo2').val(),
//      usu_ing :           null,
//      dat_ing :           null,
//      dat_ult_atu :       null,
      nom_usu_ult_atu :  'THIAGO-SILVA', // VALOR TÁ FIXO
      nom_pro_ult_atu :  'TASK-55883'    // VALOR TÁ FIXO
    };
// console.log(JSON.stringify(matriz));
  var settings = {
    "async": false,
    "crossDomain": true,
    "processData": false,
    "url": url,
    "method": "POST",
    "headers": {
        "Cache-Control": "no-cache"
      , "Content-Type" : "application/json"
      , "tokenSigeprev": getCookieSigeprev("tokenSigeprev")    
    },
    "data": JSON.stringify(matriz),
    "statusCode": {
      200: function() {
        //console.log("UPDATE");
        location.reload(true)
      },
      201: function() {
        location.reload(true)
      },
      404: function() {
        alert('Requisução não encontrada!')
      },
      500: function() {
        alert('Ocorreu um erro interno!')
      }
    }                                
  };

  var _response = {};
    $.ajax(settings).done(function (response) {
  });        
});
//-- Fim Cancelar  

  function atualizarComposicaoBeneficio() {
    var cod_simulacao = ''
    var cod_ins = ''
    var cod_beneficio = ''
    var cod_fcrubrica = ''
    var seq_vig = ''
    var ind_opcao = ''

    var selecionados = tabela.getElementsByClassName("selecionado");
    
    for(var i = 0; i < selecionados.length; i++){
      var selecionado = selecionados[i];
      selecionado = selecionado.getElementsByTagName("td");
      
      cod_simulacao = selecionado[7].innerHTML
      cod_ins = selecionado[8].innerHTML
      cod_beneficio = selecionado[9].innerHTML
      cod_fcrubrica = selecionado[10].innerHTML
      seq_vig = selecionado[11].innerHTML
      ind_opcao = selecionado[12].innerHTML
    }

    // GET - Listar Composicao Beneficio Por Chave Composta
    let urlCompleta = urlBackendListarComposicaoBeneficioChaveComposta + 
            "?cod_simulacao=" + cod_simulacao + 
            "&cod_ins="       + cod_ins       + 
            "&cod_beneficio=" + cod_beneficio + 
            "&cod_fcrubrica=" + cod_fcrubrica + 
            "&seq_vig="       + seq_vig       + 
            "&ind_opcao="     + ind_opcao

    $.ajax({
      url: urlCompleta,
      success: function(data){
        console.log(data);
        for (var jsonData in data) {

          if (data[jsonData].DAT_INI_VIG != null) {
            var a = data[jsonData].DAT_INI_VIG.substring(0,10);
            var DAT_INI_VIG = a.split('-').reverse().join('-');
            DAT_INI_VIG = DAT_INI_VIG.replaceAll('-', '/');
          } else {
            var DAT_INI_VIG = "";
          }  
      
          if (data[jsonData].DAT_FIM_VIG != null) {
            var b = data[jsonData].DAT_FIM_VIG.substring(0,10);
            var DAT_FIM_VIG = b.split('-').reverse().join('-');
            DAT_FIM_VIG = DAT_FIM_VIG.replaceAll('-', '/');
          } else {
            var DAT_FIM_VIG = "";
          }  

          if (data[jsonData].DAT_INI_REF != null) {
            var a = data[jsonData].DAT_INI_REF.substring(0,10);
            var DAT_INI_REF = a.split('-').reverse().join('-');
            DAT_INI_REF = DAT_INI_REF.replaceAll('-', '/');
          } else {
            var DAT_INI_REF = "";
          }  
      
          if (data[jsonData].DAT_FIM_REF != null) {
            var b = data[jsonData].DAT_FIM_REF.substring(0,10);
            var DAT_FIM_REF = b.split('-').reverse().join('-');
            DAT_FIM_REF = DAT_FIM_REF.replaceAll('-', '/');
          } else {
            var DAT_FIM_REF = "";
          }            

          $('#comboRubricas').val(data[jsonData].COD_FCRUBRICA)
          $('#fixedValue').val(data[jsonData].VAL_FIXO)
          $('#unitValue').val(data[jsonData].VAL_INIDADE)
          $('#percentageValue').val(data[jsonData].VAL_PORC)
          $('#salarioReferencia').val(data[jsonData].COD_REFERENCIA)
          $('#codTabela').val(data[jsonData].COD_TABELA)
          $('#comboParamCalcRepresPrinc').val()
          $('#PercIncorpRepres').val()
          $('#comboListaDeOrdemJudicial').val()
          $('#dat_ini_vig').val(DAT_INI_VIG)
          $('#dat_fim_vig').val(DAT_FIM_VIG)
          $('#inicioRef').val(DAT_INI_REF)
          $('#fimRef').val(DAT_FIM_REF)
        }
      }
    });
  }
/* 
  $('#btnHistoricoFinanceiroTerceiro').click(function(paramIdeCli,paramCodBeneficio) {
      var url = "/" + CONS_PROJETO + "/folhaPagamento/historicoFinanceiroTerceiroLayoutNovo.do?codIdeCliBeneficiario=" + paramIdeCli + "&codBeneficio=" + paramCodBeneficio;
      var popup = window.open(url, "", "scrollbars=yes, titlebar=no, resizable=yes, status=no, help=no, width=800, height=400,left=200 , top= 270");
      popup.moveTo(0,0);
      popup.resizeTo(screen.width,screen.height);
  }) */

  // GET - Listar Composicao Beneficio  
  function listarComposicaoBeneficio (urlComposicao) {
    $.ajax({
      url: urlComposicao + "?cod_simulacao=" + paramsCod_simulacao + "&cod_beneficio="+urlParametros.get("cod_beneficio"),
      success: function(data){
        console.log(data);
        if(data == '') {
          tr = $('<tr/>');
          tr.append("Sem dados para exibir!");
          $('#tableComposition').append(tr);
        }

        $('#tableCompositionCorpo').empty();
        for (var jsonData in data) { 
          // Convertendo a data,
          if (data[jsonData].INI_VIG != null) {
            var a = data[jsonData].INI_VIG.substring(0,10)
            var INI_VIG = a.split('-').reverse().join('-');
          } else {
            var INI_VIG = "";
          }
          if (data[jsonData].FIM_VIG != null) {
            var b = data[jsonData].FIM_VIG.substring(0,10)
            var FIM_VIG = b.split('-').reverse().join('-');
          } else {
            var FIM_VIG = "";
          } 
          
          tr = $('<tr/>');
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + data[jsonData].TIPO  + "</a></td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + data[jsonData].COD_RUBRICA        + "</a></td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + data[jsonData].DES_RUBRICA        + "</a></td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + INI_VIG                           + "</a></td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + FIM_VIG                           + "</a></td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + (data[jsonData].PRIORIDADE_INDIV ? data[jsonData].PRIORIDADE_INDIV : '')  + "</td>");
            tr.append("<td><a onclick=\"selecionarComposicaoBeneficio('"+data[jsonData].COD_INS+"','"+data[jsonData].COD_SIMULACAO+"','"+data[jsonData].COD_BENEFICIO+"','"+data[jsonData].COD_RUBRICA+"','"+data[jsonData].SEQ_VIG+"','"+data[jsonData].IND_OPCAO+"','"+data[jsonData].STATUS+"');\">" + (data[jsonData].STATUS.toUpperCase() == 'V' ? 'Vigente' : (data[jsonData].STATUS == 'C' ? 'Cancelado' : data[jsonData].STATUS)) + "</a></td>");

            tr.append("<td style=\"display:none\">" + data[jsonData].COD_SIMULACAO      + "</td>");
            tr.append("<td style=\"display:none\">" + data[jsonData].COD_INS            + "</td>");
            tr.append("<td style=\"display:none\">" + data[jsonData].COD_BENEFICIO      + "</td>");
            tr.append("<td style=\"display:none\">" + data[jsonData].COD_RUBRICA        + "</td>");
            tr.append("<td style=\"display:none\">" + data[jsonData].SEQ_VIG            + "</td>");
            tr.append("<td style=\"display:none\">" + data[jsonData].IND_OPCAO          + "</td>");

            //tr.append("<td><a href=\"javascript:preparaExclusao("+data[jsonData].COD_SIMULACAO + "," +data[jsonData].COD_INS + "," +data[jsonData].COD_BENEFICIO + "," +data[jsonData].COD_RUBRICA + "," +data[jsonData].SEQ_VIG + "," +data[jsonData].IND_OPCAO+");\"><i class=\"fa fa-trash\" aria-label=\"Pesquisa\"></i></a></td>");                 
          $('#tableComposition').append(tr);
        }
      }
    }); // fim $.ajax()
  }

  function validacaoInsert() {
    var validado = true;

    if ($('#comboRubricas').val() == undefined || $('#comboRubricas').val() == '' || $('#comboRubricas').val() == 'Selecionar') {
      alertNovo('Campo Rubricas &eacute; obrigat&oacute;rio');
      validado = false;

    } /*else if ($('#comboParamCalcRepresPrinc').val() == undefined || $('#comboParamCalcRepresPrinc').val() == '' || $('#comboParamCalcRepresPrinc').val() == 'Selecionar') {
      alertNovo('Campo Parâm. Cálc. Repres. Princ &eacute; obrigat&oacute;rio');
      validado = false;

    }*/ else if ($('#comboListaDeOrdemJudicial').val() == undefined || $('#comboListaDeOrdemJudicial').val() == '' || $('#comboListaDeOrdemJudicial').val() == 'Selecionar') {
      alertNovo('Campo Ordem Judicial &eacute;	obrigat&oacute;rio');
      validado = false;
    } 
    return validado;
  }
  
});

let cod_conceito_rub = 0
function preparaCampos(){
  var selected        = $("#comboRubricas").find('option:selected');
  var tipValor        = selected.data('tip-valor');    
  var flgQuota        = selected.data('flg-quota');    
  var flgNatureza     = selected.data('flg-natureza');    
  var flgIncorporacao = selected.data('flg-incorporacao');    
  
  cod_conceito_rub = $('#comboRubricas').val().substr(0, $('#comboRubricas').val().length - 2);

  if (tipValor == 'P') {	
    $('#percentageValue').attr("disabled",false);
    $('#fixedValue').attr("disabled",true);
    $('#unitValue').attr("disabled",false);
  }
  if (tipValor == 'F') {	
    $('#percentageValue').attr("disabled",true);
    $('#fixedValue').attr("disabled",false);
    $('#unitValue').attr("disabled",true);
  }
  if (tipValor == 'U') {	
    $('#percentageValue').attr("disabled",false);
    $('#fixedValue').attr("disabled",true);
    $('#unitValue').attr("disabled",false);
  }
  
  if (tipValor == 'C') {	
    $('#percentageValue').attr("disabled",false);
    $('#fixedValue').attr("disabled",false);
    $('#unitValue').attr("disabled",false);
  }

  //Autor: Adriano Silva
  //Data: 11/04/2012
  if(tipValor == 'N'){
    $('#percentageValue').attr("disabled",false);
    $('#fixedValue').attr("disabled",false);
    $('#unitValue').attr("disabled",true);
  }
  if(tipValor == 'A'){
    $('#percentageValue').attr("disabled",false);
    $('#fixedValue').attr("disabled",true);
    $('#unitValue').attr("disabled",false);
  }

  //-- Limpeza antes de habilitar/desabilitar campos
  $('#codCargoIncorp').val('');
  $('#datIncorp').val('');
  $('#salarioReferencia').val('');
  $('#codFuncao').val('');
  $('#codTabela').val('');
  $('#codCargo2').val('');
  $('#salarioReferencia2').val('');

  $('#btnConsultarCargosComissionadosServidor').hide();
  //300504 (300504,C,S,C)
  if (flgIncorporacao == 'S') {
    $('#btnConsultarCargosComissionadosServidor').show();
    var flgCodCargoIncorp  = selected.data('flg-cod-cargo-incorp');
    var flgDatIncorp       = selected.data('flg-dt-incorp');
    var flgSalRefIncorp    = selected.data('flg-sal-ref-incorp');
    var flgCodFuncaoIncorp = selected.data('flg-cod-funcao-incorp');
    var flgCodConceito     = selected.data('cod-conceito');
    var flgTabelaIncorp    = selected.data('flg-tabela-incorp');
    var flgCodCargo2Incorp = selected.data('flg-cod-cargo2-incorp');
    var flgSalRef2Incorp   = selected.data('flg-sal-ref2-incorp');
    
    if (flgCodCargoIncorp == 'S') $('#codCargoIncorp').removeAttr("disabled");
    else $('#codCargoIncorp').attr("disabled",true);
        
    if (flgDatIncorp == 'S') $('#datIncorp').removeAttr("disabled");
    else $('#datIncorp').attr("disabled",true);
    
    if (flgSalRefIncorp == 'S') $('#salarioReferencia').removeAttr("disabled");
    else $('#salarioReferencia').attr("disabled",true);
        
    if (flgCodFuncaoIncorp == 'S') $('#codFuncao').removeAttr("disabled");
    else $('#codFuncao').attr("disabled",true);

    if (flgTabelaIncorp == 'S') $('#codTabela').removeAttr("disabled");
    else $('#codTabela').attr("disabled",true);

    if (flgCodCargo2Incorp == 'S') $('#codCargo2').removeAttr("disabled");
    else $('#codCargo2').attr("disabled",true);

    if (flgSalRef2Incorp == 'S') $('#salarioReferencia2').removeAttr("disabled");
    else $('#salarioReferencia2').attr("disabled",true);

  } else {

    $('#codCargoIncorp').attr("disabled",true);
    $('#datIncorp').attr("disabled",true);
    $('#salarioReferencia').attr("disabled",true);
    $('#codFuncao').attr("disabled",true);
    $('#codTabela').attr("disabled",true);
    $('#codCargo2').attr("disabled",true);
    $('#salarioReferencia2').attr("disabled",true);

  }
 
} 


function selecionarComposicaoBeneficio(cod_ins, cod_simulacao, cod_beneficio, cod_fcrubrica, seq_vig, ind_opcao, cod_status) {
  
  // GET - Listar Composicao Beneficio Por Chave Composta
  let urlCompleta = urlBackendListarComposicaoBeneficioChaveComposta + 
  "?cod_simulacao=" + cod_simulacao + 
  "&cod_ins="       + cod_ins       + 
  "&cod_beneficio=" + cod_beneficio + 
  "&cod_fcrubrica=" + cod_fcrubrica + 
  "&seq_vig="       + seq_vig       + 
  "&ind_opcao="     + ind_opcao;

  $.ajax({url: urlCompleta, success: function(data){

      for (var jsonData in data) {

          if (data[jsonData].DAT_INI_VIG != null) {
              var a = data[jsonData].DAT_INI_VIG.substring(0,10);
              var DAT_INI_VIG = a.split('-').reverse().join('-');
              DAT_INI_VIG = DAT_INI_VIG.replaceAll('-', '/');
          } else {
              var DAT_INI_VIG = "";
          }  

          if (data[jsonData].DAT_FIM_VIG != null) {
            var b = data[jsonData].DAT_FIM_VIG.substring(0,10);
            var DAT_FIM_VIG = b.split('-').reverse().join('-');
            DAT_FIM_VIG = DAT_FIM_VIG.replaceAll('-', '/');
          } else {
            var DAT_FIM_VIG = "";
          }  

          if (data[jsonData].DAT_INI_REF != null) {
            var a = data[jsonData].DAT_INI_REF.substring(0,10);
            var DAT_INI_REF = a.split('-').reverse().join('-');
            DAT_INI_REF = DAT_INI_REF.replaceAll('-', '/');
          } else {
            var DAT_INI_REF = "";
          }  

          if (data[jsonData].DAT_FIM_REF != null) {
            var b = data[jsonData].DAT_FIM_REF.substring(0,10);
            var DAT_FIM_REF = b.split('-').reverse().join('-');
            DAT_FIM_REF = DAT_FIM_REF.replaceAll('-', '/');
          } else {
            var DAT_FIM_REF = "";
          }

          if (data[jsonData].DAT_INCORP != null) {
            var b = data[jsonData].DAT_INCORP.substring(0,10);
            var DAT_INCORP = b.split('-').reverse().join('-');
            DAT_INCORP = DAT_INCORP.replaceAll('-', '/');
          } else {
            var DAT_INCORP = "";
          }

          $('#comboRubricas').val(data[jsonData].COD_FCRUBRICA);
          $('#fixedValue').val(data[jsonData].VAL_FIXO);
          $('#unitValue').val(data[jsonData].VAL_INIDADE);
          $('#percentageValue').val(data[jsonData].VAL_PORC);
          $('#salarioReferencia').val(data[jsonData].COD_REFERENCIA);
          $('#codTabela').val(data[jsonData].COD_TABELA);

          $('#codFuncao').val(data[jsonData].COD_FUNCAO);
          $('#codCargoIncorp').val(data[jsonData].COD_CARGO);
          $('#datIncorp').val(DAT_INCORP);
          $('#comboParamCalcRepresPrinc').val(data[jsonData].VAL_STR1);
          $('#PercIncorpRepres').val(data[jsonData].VAL_PORC2);
          $('#comboListaDeOrdemJudicial').val(data[jsonData].VAL_STR2);

          $('#dat_ini_vig').val(DAT_INI_VIG);
          $('#dat_fim_vig').val(DAT_FIM_VIG);
          $('#inicioRef').val(DAT_INI_REF);
          $('#fimRef').val(DAT_FIM_REF);

          $('#comboRubricas').data('seq-vig',  seq_vig);
          $('#comboRubricas').data('ind-opcao',ind_opcao);
          $('#comboRubricas').data('flg-status',cod_status);
     
          //preparaCampos();
          desabilitarCamposParaEdicao();
          //$('#btnAtualizar').removeAttr('disabled');
      }
    }
  });  
}

function desabilitarCamposParaEdicao() {
    $('#btnAtualizar').removeAttr('disabled');

    $('#comboRubricas').attr('disabled','disabled');
    $('#fixedValue').attr('disabled','disabled');
    $('#unitValue').attr('disabled','disabled');
    $('#percentageValue').attr('disabled','disabled');
    $('#salarioReferencia').attr('disabled','disabled');
    $('#codTabela').attr('disabled','disabled');
    $('#comboParamCalcRepresPrinc').attr('disabled','disabled');
    $('#PercIncorpRepres').attr('disabled','disabled');
    $('#comboListaDeOrdemJudicial').attr('disabled','disabled');
    $('#dat_ini_vig').attr('disabled','disabled');
    $('#inicioRef').attr('disabled','disabled');
    $('#fimRef').attr('disabled','disabled');
    $('#codFuncao').attr('disabled','disabled');
    $('#codCargoIncorp').attr('disabled','disabled');    
    $('#datIncorp').attr('disabled','disabled');
    $('#salarioReferencia2').attr('disabled','disabled'); 
    $('#codCargo2').attr('disabled','disabled');

    habilitarOuNaoBotoesParaEdicao();
}

function habilitarOuNaoBotoesParaEdicao() 
{
	/* if (ativarMetodo_habilitarOuNaoBotaoExcluir == false) {
		return;
	} */
  var resultadoHabilitar = 0;
  resultadoHabilitar = comparaDatas($('#dat_ini_vig').val(), "01/08/2021");
  if (resultadoHabilitar <= 0) {
    $('#btnExcluir').attr('disabled','disabled');
  } else {
    $('#btnExcluir').removeAttr('disabled');
  }

  //resultadoHabilitar = 0;
  //resultadoHabilitar = (comparaDatas($('#dat_fim_vig').val(), "01/08/2021");
  $('#dat_fim_vig').removeAttr('disabled');
  if($('#dat_fim_vig').val() != "" || $('#comboRubricas').val() == '' || $('#comboRubricas').val() == 'Selecionar'){
    $('#btnAtualizar').attr('disabled','disabled');

    if ($('#dat_fim_vig').val() != "") 
      $('#dat_fim_vig').attr('disabled','disabled');

  }	else {
    $('#btnAtualizar').removeAttr('disabled');
  }

  $('#btnInserir').attr('disabled','disabled');

  if ($('#comboRubricas').data('flg-status') != undefined && $('#comboRubricas').data('flg-status') != null && $('#comboRubricas').data('flg-status') == 'C') {
    $('#btnCancelar').attr('disabled','disabled');
  } else {
    $('#btnCancelar').removeAttr('disabled');
  }

  if ($('#comboRubricas').val() == '' || $('#comboRubricas').val() == 'Selecionar') {
    $('#btnCancelar').attr('disabled','disabled');
  }

}


function excluirRubrica() {
    confirmSigeprev2Novo('Deseja realmente excluir o registro?', 'excluir');
}

function excluir(_retorno) {

  if (_retorno != true){
    return;
  }

  let urlCompleta = urlBackendDeletarComposicaoBeneficioChaveComposta + 
    "?cod_simulacao=" + urlParametros.get("cod_simulacao")  + 
    "&cod_ins="       + 1  + 
    "&cod_beneficio=" + urlParametros.get("cod_beneficio")  + 
    "&cod_fcrubrica=" + $('#comboRubricas').val() + 
    "&seq_vig="       + $('#comboRubricas').data('seq-vig') + 
    "&ind_opcao="     + $('#comboRubricas').data('ind-opcao') + 
    "&cod_status="    + $('#comboRubricas').data('flg-status') 

    var settings = {
      "async": false,
      "crossDomain": true,
      "processData": false,
      "url": urlCompleta,
      "method": "DELETE",
      "headers": {
        "Cache-Control": "no-cache"
      , "Content-Type" : "application/json"
      },
      //"data": JSON.stringify(matriz),
      "statusCode": {
        200: function() {
          setTimeout(function() {
            alertNovo('Registro removido com sucesso.');
          }, 1000);          
          setTimeout(function() {
            location.reload(true);
          }, 5000);
        },
        204: function() {
          setTimeout(function() {
            alertNovo('Registro removido com sucesso.');
          }, 1000);          
          setTimeout(function() {
            location.reload(true);
          }, 5000);
        },
        404: function() {
          alert('Requisução não encontrada!')
        },
        500: function() {
          alert('Ocorreu um erro interno!')
        }
      }                                
    };

    var _response = {};
      $.ajax(settings).done(function (response) {
    });
}

function limparTela() {
  location.reload(true);
}

function consultarCargosComissionadosServidor() {
  with (document.forms[0]) {
    let paramsBeneficio = {};
    paramsBeneficio.codBeneficio =  urlParametros.get("cod_beneficio");
    let jsonFuncional = consumidor.executarServico("api/v1/simulador/folha/pesquisa/consultarFuncionalPorCodBeneficio", paramsBeneficio);
    var retornoConsulta = new Array;
    var url = urlDominioSigeprev + urlContextoSigeprev + "/cadastro/evolucaoFuncionalComissionadoLista.do?codIdeCli="+jsonFuncional.codIdeCli +"&numMatricula="+jsonFuncional.numMatricula+"&codIdeRelFunc="+jsonFuncional.codIdeRelFunc;
    var params = ["","edt_cod_cargo","edt_cod_referencia"];
    retornoConsulta = janelaSimples2(url, params, "processarCargosCommissionados(retornoConsulta)", "cargos");
  }
}

function processarCargosCommisionados(retornoConsulta){
  document.getElementById("idSpanNomeCargo").innerHTML = retornoConsulta[0];
  document.getElementById("idSpanComposicao").innerHTML = retornoConsulta[3];
}


function carregarCabecalho() {
  let paramsCabecalho = {};
  paramsCabecalho.cod_simulacao = urlParametros.get("cod_simulacao");
  let jsonRetorno = consumidor.executarServico("api/v1/simulador/calculo/folha/simulacoes/lista", paramsCabecalho);

  if (jsonRetorno.length == 0) {
    let tr = $('<tr/>');
    tr.append("Sem dados para exibir!");
    $('#tableResumo').append(tr);
  } else {
    let cabecalho = jsonRetorno[0];

    if (cabecalho.COD_MOTIVO_SIMULACAO == 1) {
      document.getElementById("campo1label").innerHTML = 'Motivo:';
      document.getElementById("campo2label").innerHTML = 'Autor:';
      document.getElementById("campo3label").innerHTML = 'Objeto:';
      document.getElementById("campo4label").innerHTML = 'N&#176;. Processo Judicial:';
      document.getElementById("campo5label").innerHTML = 'Interessado:';

      document.getElementById("campo1valor").innerHTML = 'Cálculos Judiciais';
      document.getElementById("campo2valor").innerHTML = cabecalho.NOM_AUTOR;
      document.getElementById("campo3valor").innerHTML = cabecalho.DES_OBJETO;
      document.getElementById("campo4valor").innerHTML = cabecalho.NUM_PROC_JUDICIAL;
      document.getElementById("campo5valor").innerHTML = cabecalho.NOM_INTERESSADO;
    } else {
      document.getElementById("campo1label").innerHTML = 'Motivo:';
      document.getElementById("campo2label").innerHTML = 'N° Protocolo'
      document.getElementById("campo3label").innerHTML = 'Observação';

      document.getElementById("campo1valor").innerHTML = 'Revisão Administrativa';
      document.getElementById("campo2valor").innerHTML = cabecalho.NUM_PROTOCOLO;
      document.getElementById("campo3valor").innerHTML = cabecalho.OBSERVACAO;
    }
  }
}

