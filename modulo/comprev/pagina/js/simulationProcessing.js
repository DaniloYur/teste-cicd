$(function(){
  $("#resumodoResultadoDoProcessamento").css("display","none");
  $("#tableResumoResultadoProcessamento").css("display","none");

  $("#detalheResultadoDoProcessamento").css("display","none");
  $("#tabelaDetalheResultadoProcessamento").css("display","none");
  $("#btnExportarExcel").css("display","none");
  $("#btnExportarDetalhadoExcel").css("display","none");
  $("#btnVerDetalheRubricas").css("display","none");
  $("#btnPlanilhaJudiciais").css("display","none");
});  

urlPeriododeProcessamento                  = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/listar"
urlResumoProcessamento                     = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/resumo"
urlDetalheProcessamento                    = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/detalhe"
urlDetalheDeRubricas                       = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/detalheDeRubricas"
//urlExportarResumoResultadoDoProcessamento  = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/exportarParaExcel"
urlExportarDetalheResultadoDoProcessamento = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/exportarDetalhadoExcel"
urlExportarDetalheRubricas                 = urlDominioBackEnd + urlContextoBackEnd + "/api/v1/simulador/folha/processamento/exportarDetalheRubricas"
urlExportarPlanilhaCalculosJudiciais       = urlDominioBackEnd + urlContextoBackEnd + "api/v1/sample/report/generate/pdf"
urlProcessar                               = urlDominioBackEnd + urlContextoBackEnd + "api/v1/simulador/folha/processamento/processar"


$(document).ready(function() {
  window.onload = initPage();

  var paramsCodIdeCli;
  var paramsCodSimulacao;
  
  function initPage() {
    // Recuperar parâmetros da URL
    var uri = window.location.href;
    var url = new URL(uri);
    var paramsCodMotivoSimulacao = url.searchParams.get("cod_motivo_simulacao"); // recupera o parametro cod_motivo_simulacao da uri
    paramsCodIdeCli = url.searchParams.get("cod_ide_cli"); // recupera o parametro cod_motivo_simulacao da uri
    paramsCodSimulacao = url.searchParams.get("cod_simulacao"); // recupera o parametro cod_simulacao da uri
    var paramsCodBeneficio = url.searchParams.get("cod_beneficio"); // recupera o parametro cod_beneficio da uri


    carregarCabecalho();
    if (paramsCodMotivoSimulacao != 1) {
      $('#btnPlanilhaJudiciais').hide();
    }

    document.getElementById('btnBuscar').disabled = true
    document.getElementById('btnProcessar').disabled = true
    $('#comboPeriodoDeProcessamento').click(function() {
      if ($('#comboPeriodoDeProcessamento').val() != 'Selecionar' || $('#comboPeriodoDeProcessamento').val() == this) {
        document.getElementById('btnBuscar').disabled = false
        document.getElementById('btnProcessar').disabled = false
      } else {
        document.getElementById('btnBuscar').disabled = true
        document.getElementById('btnProcessar').disabled = true
      }
    });

    $("#btnBuscar").click(function() {
      //document.getElementById('btnBuscar').disabled = true
      var per_processo = $('#comboPeriodoDeProcessamento').val()
      var mesAno = per_processo.substring(3, per_processo.length);
      //mesAno = '09/2021'
      //alert(mesAno)
      // GET - RESUMO DO RESULTADO DO PROCESSAMENTO 
      $.ajax({
        url: urlResumoProcessamento 
          + "?per_processo="  + mesAno
          + "&cod_ide_cli="   + paramsCodIdeCli //'9006000547143600'
          + "&cod_simulacao=" + paramsCodSimulacao //1
          + "&cod_beneficio=" + paramsCodBeneficio, //80007000,
          success: function(data) {
          
          console.log(data);
          
          if(data == '') {
            tr = $('<tr/>');
            tr.append("Sem dados para exibir!");
            $('#tableResumoResultadoProcessamento').append(tr);
          }

          if(data == '') {
              alertNovo('Não existe processamento para essa simulação!');
          } else {
            mostrar()
          }
          
          for (var jsonData in data) { 
            // Convertendo as datas,
            if (data[jsonData].DAT_PROC != null || data[jsonData].DAT_PROC != undefined) {
              encontrou = true;
              function adicionarZero(numero) {
                if (numero <= 9) 
                    return "0" + numero;
                else
                    return numero; 
              }
              var datas = new Date(data[jsonData].DAT_PROC);
              var DAT_PROC = ((adicionarZero(datas.getDate()) )) + "/" + ((adicionarZero(datas.getMonth() + 1))) + "/" + datas.getFullYear() + ' ' 
                + adicionarZero(datas.getHours()) + ':' + adicionarZero(datas.getMinutes())  + ':' + adicionarZero(datas.getSeconds()); 
            }

            if (data[jsonData].DAT_COMP_BASE_PROC != null) {
              var b = data[jsonData].DAT_COMP_BASE_PROC.substring(0,10)
              var DAT_COMP_BASE_PROC = b.split('-').reverse().join('-');
            } else {
              var DAT_COMP_BASE_PROC = "";
            } 
            if (data[jsonData].DAT_ULT_PER_RECEBIDO != null) {
              var c = data[jsonData].DAT_ULT_PER_RECEBIDO.substring(0,10)
              var DAT_ULT_PER_RECEBIDO = c.split('-').reverse().join('-');
            } else {
              var DAT_ULT_PER_RECEBIDO = "";
            } 
    
            const VAL_RETROATIVOS_REAL     = data[jsonData].VAL_RETROATIVOS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VAL_BRUTO_ULT_FOLHA_REAL = data[jsonData].VAL_BRUTO_ULT_FOLHA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VAL_BRUTO_ATUAL_REAL     = data[jsonData].VAL_BRUTO_ATUAL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VAL_DIFERENCA_REAL       = data[jsonData].VAL_DIFERENCA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
            
            tr = $('<tr/>');
              tr.append("<td>" + DAT_PROC                             + "</td>");
              tr.append("<td>" + DAT_COMP_BASE_PROC                   + "</td>");
              tr.append("<td>" + DAT_ULT_PER_RECEBIDO                 + "</td>");
              tr.append("<td>" + VAL_BRUTO_ULT_FOLHA_REAL             + "</td>");
              tr.append("<td>" + VAL_BRUTO_ATUAL_REAL                 + "</td>");
              tr.append("<td>" + VAL_DIFERENCA_REAL                   + "</td>");
              tr.append("<td>" + data[jsonData].PORC_DIFERENCA + '%'  + "</td>");
              tr.append("<td>" + VAL_RETROATIVOS_REAL                 + "</td>");
            $('#tableResumoResultadoProcessamentoCorpo').empty();
            $('#tableResumoResultadoProcessamento').append(tr);
          }
        }
      }); // fim $.ajax()

      // GET - DETALHE DO RESULTADO DO PROCESSAMENTO 
      $.ajax({

        url: urlDetalheProcessamento 
            + "?per_processo="  + mesAno
            + "&cod_ide_cli="   + paramsCodIdeCli //'9006000547143600'
            + "&cod_simulacao=" + paramsCodSimulacao //1
            + "&cod_beneficio=" + paramsCodBeneficio, //80007000,
  
        //url: urlDetalheProcessamento,
        success: function(data){
          var valorPagoBruto = 0
          var valor_devido_bruto = 0
          var valor_dif_bruto = 0
          var valor_pago_contr_prev = 0
          var valor_devido_contr_prev = 0
          var valor_dif_contr_prev = 0
  
          console.log(data);
          if(data == '') {
            tr = $('<tr/>');
            tr.append("Sem dados para exibir!");
            $('#tabelaDetalheResultadoProcessamento').append(tr);
          }
          
          $('#tabelaDetalheResultadoProcessamentoCorpo').empty();
          for (var jsonData in data) { 
            valorPagoBruto          += data[jsonData].VALOR_PAGO_BRUTO
            valor_devido_bruto      += data[jsonData].VALOR_DEVIDO_BRUTO
            valor_dif_bruto         += data[jsonData].VALOR_DIF_BRUTO
            valor_pago_contr_prev   += data[jsonData].VALOR_PAGO_CONTR_PREV
            valor_devido_contr_prev += data[jsonData].VALOR_DEVIDO_CONTR_PREV
            valor_dif_contr_prev    += data[jsonData].VALOR_DIF_CONTR_PREV
  
            // Convertendo as datas,
            if (data[jsonData].PERIODO != null) {
              var a = data[jsonData].PERIODO.substring(0,10)
              var PERIODO = a.split('-').reverse().join('-');
            } else {
              var PERIODO = "";
            }

            let TIPO = '';
            if (data[jsonData].TIPO == "N") {
               TIPO = "Normal";
            }else{
               TIPO = "13º Salário";
            }
  
            const VALOR_PAGO_BRUTO_REAL        = data[jsonData].VALOR_PAGO_BRUTO.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VALOR_DEVIDO_BRUTO_REAL      = data[jsonData].VALOR_DEVIDO_BRUTO.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VALOR_DIF_BRUTO_REAL         = data[jsonData].VALOR_DIF_BRUTO.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VALOR_PAGO_CONTR_PREV_REAL   = data[jsonData].VALOR_PAGO_CONTR_PREV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VALOR_DEVIDO_CONTR_PREV_REAL = data[jsonData].VALOR_DEVIDO_CONTR_PREV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const VALOR_DIF_CONTR_PREV_REAL    = data[jsonData].VALOR_DIF_CONTR_PREV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
            tr = $('<tr/>');
              tr.append("<td>" + PERIODO                        + "</td>");
              tr.append("<td>" + TIPO                           + "</td>");
              tr.append("<td>" + VALOR_PAGO_BRUTO_REAL          + "</td>");
              tr.append("<td>" + VALOR_DEVIDO_BRUTO_REAL        + "</td>");
              tr.append("<td>" + VALOR_DIF_BRUTO_REAL           + "</td>");
              tr.append("<td>" + VALOR_PAGO_CONTR_PREV_REAL     + "</td>");
              tr.append("<td>" + VALOR_DEVIDO_CONTR_PREV_REAL   + "</td>");
              tr.append("<td>" + VALOR_DIF_CONTR_PREV_REAL      + "</td>");
            
            $('#tabelaDetalheResultadoProcessamento').append(tr);
            
          }
          if(data != '') {
            tr = $('<tr/>');
              tr.append("<td colspan=\"2\" align=\"center\">" + "TOTAIS"                                                 + "</td>");
              tr.append("<td>" + valorPagoBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })          + "</td>");
              tr.append("<td>" + valor_devido_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })      + "</td>");
              tr.append("<td>" + valor_dif_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })         + "</td>");
              tr.append("<td>" + valor_pago_contr_prev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })   + "</td>");
              tr.append("<td>" + valor_devido_contr_prev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + "</td>");
              tr.append("<td>" + valor_dif_contr_prev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })    + "</td>");
            
            $('#tabelaDetalheResultadoProcessamento').append(tr);
          }
        }
      }); // fim $.ajax()
    });

    $("#btnVerDetalheRubricas").click(function() {

      // if ($('#comboPeriodoDeProcessamento').val() == '' || $('#comboPeriodoDeProcessamento').val() == 'Selecionar') {
      //   alert('Você precisa escolher o período de processamento para entrar nesta tela.');
      //   return;
      // }     

      // GET - RESUMO DETALHE DE RUBRICAS 
      $.ajax({
        url: urlDetalheDeRubricas + "?cod_simulacao="+paramsCodSimulacao+"&per_processo="+ $('#comboPeriodoDeProcessamento').val(),
        success: function(data) {
          console.log(data);

          $('#tableDetalheRubricaBody').empty();  
          for (var jsonData in data) { 
            if(data[jsonData].VANTAGENS != null) {
              var VANTAGENS_REAL = data[jsonData].VANTAGENS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            } else {
              var VANTAGENS_REAL = "";
            }
            if(data[jsonData].DESCONTOS != null) {
              var DESCONTOS_REAL = data[jsonData].DESCONTOS.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            } else {
              var DESCONTOS_REAL = "";
            }
            
            tr = $('<tr/>');
              tr.append("<td>" + data[jsonData].COD_FCRUBRICA   + "</td>");
              tr.append("<td>" + data[jsonData].NOM_RUBRICA     + "</td>");
              tr.append("<td>" + VANTAGENS_REAL  + "</td>");
              tr.append("<td>" + DESCONTOS_REAL  + "</td>");
              tr.append("<td>" + (data[jsonData].FLG_IMPRIME ? data[jsonData].FLG_IMPRIME : '')     + "</td>");

            $('#tableDetalheRubrica').append(tr);
          }
        }
      }); // fim $.ajax()

    });

    $('#btnExportarExcel').click(function() {
        var per_processo = $('#comboPeriodoDeProcessamento').val()
        var mesAno = per_processo.substring(3, per_processo.length);
        //mesAno = '09/2021'
        var fileName = "Detalhe_do_Resultado_do_Processamento"
        var urlCompleta = urlExportarDetalheResultadoDoProcessamento 
          + "?per_processo="  + mesAno 
          + "&cod_ide_cli="   + paramsCodIdeCli 
          + "&cod_simulacao=" + paramsCodSimulacao
          + "&cod_beneficio=" + paramsCodBeneficio;
  
        //Create XMLHTTP Request.
        var req = new XMLHttpRequest();
        req.open("GET", urlCompleta, true);
        req.responseType = "blob";
        req.onload = function () {
          //Convert the Byte Data to BLOB object.
          var blob = new Blob([req.response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
          //Check the Browser type and download the File.
          var isIE = false || !!document.documentMode;
          if (isIE) {
              window.navigator.msSaveBlob(blob, fileName);
          } else {
              var url = window.URL || window.webkitURL;
              link = url.createObjectURL(blob);
              var a = document.createElement("a");
              a.setAttribute("download", fileName);
              a.setAttribute("href", link);
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
          }
        };
        req.send();
      });
      
      // Exportar detalhes de Rubricas
      $('#btnExportarDetalhadoExcel').click(function() {
        var per_processo = $('#comboPeriodoDeProcessamento').val()
        var mesAno = per_processo.substring(3, per_processo.length);
        //mesAno = '09/2021'
        var urlCompleta = urlExportarDetalheRubricas 
          + "?per_processo="  + "01/"+ mesAno 
          //+ "&cod_ide_cli="   + paramsCodIdeCli 
          + "&cod_simulacao=" + paramsCodSimulacao
          //+ "&cod_beneficio=" + paramsCodBeneficio
      
          var fileName = "Resumo_Resultado_Detalhes_Rubricas"
    
          //Create XMLHTTP Request.
          var req = new XMLHttpRequest();
          req.open("GET", urlCompleta, true);
          req.responseType = "blob";
          req.onload = function () {
            //Convert the Byte Data to BLOB object.
            var blob = new Blob([req.response], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    
            //Check the Browser type and download the File.
            var isIE = false || !!document.documentMode;
            if (isIE) {
                window.navigator.msSaveBlob(blob, fileName);
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob);
                var a = document.createElement("a");
                a.setAttribute("download", fileName);
                a.setAttribute("href", link);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
          };
          req.send();
        });

        $('#btnPlanilhaJudiciais').click(function() {
          //var per_processo = $('#comboPeriodoDeProcessamento').val()
          //var mesAno = per_processo.substring(3, per_processo.length);
          var urlCompleta = urlExportarPlanilhaCalculosJudiciais
          + "?cod_ide_cli_ben="+ paramsCodIdeCli 
          + "&cod_simulacao="  + paramsCodSimulacao 
          + "&cod_beneficio="  + paramsCodBeneficio

          $.ajax({
            url: urlCompleta,
            success: function(data) {
              //console.log(data);
              var fileName = "Planilhas_Judiciais"
      
              //Create XMLHTTP Request.
              var req = new XMLHttpRequest();
              req.open("GET", urlCompleta, true);
              req.responseType = "blob";
              req.onload = function () {
                //Convert the Byte Data to BLOB object.
                var blob = new Blob([req.response], { type: "application/pdf" });
        
                //Check the Browser type and download the File.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.setAttribute("download", fileName);
                    a.setAttribute("href", link);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
              }
              req.send();
            }, error: function(error) {
              alertNovo('Não há diferenças geradas para as planilhas judiciais.');
            }
          });
        });

          $('#btnProcessar').click(function() {

            $('#cover-spin').show(0);
        
            var per_processo = $('#comboPeriodoDeProcessamento').val()
            var mesAno = per_processo.substring(3, per_processo.length);
            mesAno = '01/' + mesAno
        
            var url = urlProcessar + "?perProcesso=" + mesAno + "&cod_ide_cli=" + paramsCodIdeCli + "&num_seq_proc=" + 0 + "&cod_simulacao=" + paramsCodSimulacao + "&cod_beneficio=" + paramsCodBeneficio;
            console.log(url);
        
            //1- Chama o endPoint
            var matriz;
        
              matriz = {
                       perProcesso        : mesAno
                       ,cod_ide_cli       : paramsCodIdeCli
                       ,cod_simulacao     : paramsCodSimulacao
                       ,num_seq_proc      : 0
                      };
              //console.log(JSON.stringify(matriz));
              var settings = {
                  "async": false,
                  "crossDomain": true,
                  "processData": false,
                  "url": url,
                  "method": "POST",
                  "headers": {
                  "Cache-Control": "no-cache"
                  ,"Content-Type" : "application/json"
                  },
                  "data": JSON.stringify(matriz),
                  "statusCode": {
                    200: function() {
                      $('#tableResumoResultadoProcessamentoCorpo').empty();
                      $('#tabelaDetalheResultadoProcessamentoCorpo').empty();
                      setTimeout(function(){ 
                        $('#cover-spin').hide(0);
                        alertNovo('Processado agendado com sucesso. Aguarde o processamento.');
                        //location.reload(true);
                        $("#btnBuscar").click();
                        setInterval(function(){
                            if ($('#comboPeriodoDeProcessamento').val() != '' && $('#comboPeriodoDeProcessamento').val() != 'Selecionar') {
                                $("#btnBuscar").click();
                            }
                        }, 10000);
                      }, 3000);

                    },
                    201: function() {
                      setTimeout(function(){ 
                        $('#cover-spin').hide(0);
                        location.reload(true);
                      }, 10000);
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
        
              setTimeout(function(){ 
                $('#cover-spin').hide(0);
              }, 3000);         
        
          });          

  } // FIM - initPage()


}) 

// GET - Listar Composicao Beneficio  
function carregaComboPeriodoDeProcessamento() {
  $.getJSON(urlPeriododeProcessamento, function (dados) {
    console.log(dados);
    if (urlPeriododeProcessamento.length > 0) {
      $('#comboPeriodoDeProcessamento').children().remove();
      var option = '<option>Selecionar</option>';
      $(option).appendTo('#comboPeriodoDeProcessamento');
      $.each(dados, function(key, value) {
        //console.log(dados);
        option = '<option value="' + value.PERIODO + '">' + value.PERIODO + '</option>';
        $(option).appendTo('#comboPeriodoDeProcessamento');
      });
    }
  });
}
carregaComboPeriodoDeProcessamento();

function mostrar() {
  $("#simulacao").css("display","");
  $("#resumodoResultadoDoProcessamento").css("display","");
  $("#tableResumoResultadoProcessamento").css("display","");

  $("#detalheResultadoDoProcessamento").css("display","");
  $("#tabelaDetalheResultadoProcessamento").css("display","");
  $("#btnExportarExcel").css("display","");
  $("#btnExportarDetalhadoExcel").css("display","");
  $("#btnVerDetalheRubricas").css("display","");
  $("#btnPlanilhaJudiciais").css("display","");
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
