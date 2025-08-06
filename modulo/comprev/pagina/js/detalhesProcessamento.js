//init
$(function(){ 
  controls(); 
  entidades(comboEntidade);
  detalhesProcessamentoSaidas();
});

var urlService = "administrador/arquivos/detalhes/processamento/entidadesDetalhesProcessamento"
function entidades(comboEntidade) {
  var valorSelecionado = $('#comboEntidade :checked').val();
  limparComboBox(comboEntidade,valorSelecionado);
  var settings = {
      url: urlDominioBackEnd + urlContextoBackEnd + urlService,
      method: "GET",
      headers: {
        "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
      },
      processData: false,
      crossDomain: true,
      contentType: false
  };
  $.ajax(settings).done(function (response) {
      var keys = Object.keys(response);
      response = response[keys[0]];
      limparComboBox(comboEntidade, valorSelecionado);
      response.forEach(elemento => {
          var elementKeys = Object.keys(elemento);
          if (valorSelecionado != undefined && valorSelecionado != null && valorSelecionado != '' && valorSelecionado == elemento[elementKeys[0]]) {
              $(comboEntidade).append("<option  value='"+ elemento[elementKeys[0]] +"'selected>" + elemento[elementKeys[1]] + "</option>");
          } else {
              $(comboEntidade).append("<option value='"+ elemento[elementKeys[0]] +"'>" + elemento[elementKeys[1]] + "</option>");
          }
      });
  });
}

function limparComboBox(comboEntidade,valorSelecionado) {
  $(comboEntidade).empty();
  var selecioneField = "Selecione";
  var selecione = (valorSelecionado != undefined || valorSelecionado == null || valorSelecionado != '' ? "selected" : "");
  $(comboEntidade).append("<option value='' " + selecione + ">" + selecioneField + "</option>");
}

function detalhesProcessamentoSaidas() {
  let params = {};
  let detalhesProcessamentoSaidas = consumidor.executarServico("/administrador/arquivos/detalhes/processamento/detalhesProcessamentoSaidas", params);
      var keysDetalhesProcessamentoSaidas = Object.keys(detalhesProcessamentoSaidas);
      detalhesProcessamentoSaidas = detalhesProcessamentoSaidas[keysDetalhesProcessamentoSaidas[0]];
      detalhesProcessamentoSaidas.forEach(elementoProcessamentoSaidas => {
          var elementKeysProcessamentoSaidas = Object.keys(elementoProcessamentoSaidas);
              //document.getElementById('nomEntidade').innerHTML = elemento[elementKeys[10]];
                                
              var htmlToRender = 
                 "<form action='detalhesArquivos.html'>\n   "+
                 "<table id='tabelaDetalhesProc' >\n   "+
                 "                <thead>\n   "+
                 "                  <tr>\n   "+
                 "                    <th></th>\n   "+
                 "                    <th id='thTipoArquivo'> SAÍDAS </th>\n   "+
                 "                    <th>PROCESSADAS</th>\n   "+
                 "                  </tr>\n   "+
                 "                </thead>\n   "+
                 "                <tbody>\n   "+
                 "                  <tr>\n   "+
                 "                    <th id='thPeriocidade'> "+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[11]]+" </th>\n   "+
                 "                    <td id='tdProcessamento1'>\n   "+
                 "                      <h2><span id='nomEntidade'> "+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[9]]+" </span></h2>\n   "+
                 "                      <table class='tabela-detalhe'>\n   "+
                 "                        <tbody id='tdBodyProcessamento1'>\n   "+
                 "                          \n <tr> <th>Programados:</th> <td> "+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[0]]+" </td></tr> <tr> <th>Recebidos:</th> <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[1]]+"</td> </tr><tr><th>Recebidos parcial:</th><td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[2]]+"</td></tr>   "+
                 "                        </tbody>\n   "+
                 "                      </table>\n   "+
                 "                    </td>\n   "+
                 "                    <td id='tdProcessamento2'>\n   "+
                 "                      <div class='text-right'>\n   "+
                 "                        <input type='hidden' id='periodo' name='periodo'  value='"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[12]]+"'>\n   "+
                 "                        <button type='submit' value='Detalhes' class='btn btn-sm butblue my-3'>Detalhes</button>\n   "+
                 "                      </div>\n   "+
                 "                      <table class='tabela-detalhe'>\n   "+
                 "                        <tbody id='tdBodyProcessamento2'>\n   "+
                 "                          <tr>\n   "+
                 "                            <th>Competência:</th>\n   "+
                 "                            <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[12]]+"</td>\n   "+
                 "                          </tr>\n   "+
                 "                          <tr>\n   "+
                 "                            <th>Processados:</th>\n   "+
                 "                            <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[3]]+"/"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[4]]+"</td>\n   "+
                 "                          </tr>\n   "+
                 "                          <tr>\n   "+
                 "                            <th>Processados 100%:</th>\n   "+
                 "                           <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[3]]+"/"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[4]]+"</td>\n   "+
                 "                          </tr>\n   "+
                 "                          <tr>\n   "+
                 "                            <th>Processados Parcial:</th>\n   "+
                 "                            <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[2]]+"/"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[1]]+"</td>\n   "+
                 "                          </tr>\n   "+
                 "                          <tr>\n   "+
                 "                            <th>Falha no processamento:</th>\n   "+
                 "                            <td>"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[8]]+"/"+elementoProcessamentoSaidas[elementKeysProcessamentoSaidas[6]]+"</td>\n   "+
                 "                          </tr>\n   "+
                 "                        </tbody>\n   "+
                 "                      </table>\n   "+
                 "                    </td>\n   "+
                 "                  </tr>                  \n   "+
                 "                </tbody>\n   "+
                 "           </table>   " 
                 "           </form>   "; 
                $('#table-responsive').append(htmlToRender);                      
      });

    }

    function detalhesProcessamentoEntradas() {
      let params = {};
      let detalhesProcessamentoEntradas = consumidor.executarServico("/administrador/arquivos/detalhes/processamento/detalhesProcessamentoEntradas", params);          
          var keysDetalhesProcessamentoEntradas = Object.keys(detalhesProcessamentoEntradas);
          detalhesProcessamentoEntradas = detalhesProcessamentoEntradas[keysDetalhesProcessamentoEntradas[0]];
          detalhesProcessamentoEntradas.forEach(elementoEntradas => {
              var elementKeysEntradas = Object.keys(elementoEntradas);
                  //document.getElementById('nomEntidade').innerHTML = elemento[elementKeys[10]];
                                    
                  var htmlToRender = 
                  "<table id='tabelaDetalhesProc' >\n   "+
                  "                <thead>\n   "+
                  "                  <tr>\n   "+
                  "                    <th></th>\n   "+
                  "                    <th id='thTipoArquivo'> SAÍDAS </th>\n   "+
                  "                    <th>PROCESSADAS</th>\n   "+
                  "                  </tr>\n   "+
                  "                </thead>\n   "+
                  "                <tbody>\n   "+
                  "                  <tr>\n   "+
                  "                    <th id='thPeriocidade'> "+elementoEntradas[elementKeysEntradas[11]]+" </th>\n   "+
                  "                    <td id='tdProcessamento1'>\n   "+
                  "                      <h2><span id='nomEntidade'> "+elementoEntradas[elementKeysEntradas[9]]+" </span></h2>\n   "+
                  "                      <table class='tabela-detalhe'>\n   "+
                  "                        <tbody id='tdBodyProcessamento1'>\n   "+
                  "                          \n <tr> <th>Programados:</th> <td> "+elementoEntradas[elementKeysEntradas[0]]+" </td></tr> <tr> <th>Recebidos:</th> <td>"+elementoEntradas[elementKeysEntradas[1]]+"</td> </tr><tr><th>Recebidos parcial:</th><td>"+elementoEntradas[elementKeysEntradas[2]]+"</td></tr>   "+
                  "                        </tbody>\n   "+
                  "                      </table>\n   "+
                  "                    </td>\n   "+
                  "                    <td id='tdProcessamento2'>\n   "+
                  "                      <div class='text-right'>\n   "+
                  "                        <button type='button' class='btn btn-sm butblue my-3'>Detalhes</button>\n   "+
                  "                      </div>\n   "+
                  "                      <table class='tabela-detalhe'>\n   "+
                  "                        <tbody id='tdBodyProcessamento2'>\n   "+
                  "                          <tr>\n   "+
                  "                            <th>Competência:</th>\n   "+
                  "                            <td>"+elementoEntradas[elementKeysEntradas[12]]+"</td>\n   "+
                  "                          </tr>\n   "+
                  "                          <tr>\n   "+
                  "                            <th>Processados:</th>\n   "+
                  "                            <td>"+elementoEntradas[elementKeysEntradas[3]]+"/"+elementoEntradas[elementKeysEntradas[4]]+"</td>\n   "+
                  "                          </tr>\n   "+
                  "                          <tr>\n   "+
                  "                            <th>Processados 100%:</th>\n   "+
                  "                            <td>"+elementoEntradas[elementKeysEntradas[3]]+"/"+elementoEntradas[elementKeysEntradas[4]]+"</td>\n   "+
                  "                          </tr>\n   "+
                  "                          <tr>\n   "+
                  "                            <th>Processados Parcial:</th>\n   "+
                  "                            <td>"+elementoEntradas[elementKeysEntradas[2]]+"/"+elementoEntradas[elementKeysEntradas[1]]+"</td>\n   "+
                  "                          </tr>\n   "+
                  "                          <tr>\n   "+
                  "                            <th>Falha no processamento:</th>\n   "+
                  "                            <td>"+elementoEntradas[elementKeysEntradas[8]]+"/"+elementoEntradas[elementKeysEntradas[6]]+"</td>\n   "+
                  "                          </tr>\n   "+
                  "                        </tbody>\n   "+
                  "                      </table>\n   "+
                  "                    </td>\n   "+
                  "                  </tr>                  \n   "+
                  "                </tbody>\n   "+
                  "           </table>   "; ;
                 $('#table-responsive').append(htmlToRender);                       
          });
    
        }
    function detalhesProcessamentoFiltro() {
        $('#cover-spin').show(0);
        $('#table-responsive').empty(); 
        var periodo = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
        var entidade = $('#comboEntidade').val();
        var tipoArquivo = $('#tipoArquivo').val();
        var dataInicio = $('#date-filter').val();
        var dataFim = $('#date-filter-end').val();
        let params = {periodo, entidade, tipoArquivo, dataInicio, dataFim};
        let detalhesProcessamentoFiltro = consumidor.executarServico("/administrador/arquivos/detalhes/processamento/detalhesProcessamentoFiltro", params);
        if (detalhesProcessamentoFiltro.data.length == 0 || detalhesProcessamentoFiltro.data.length == undefined){
          $('#naoExistemDetalhesProcessamento').show();      
        }
        else{
          $('#naoExistemDetalhesProcessamento').hide();
        }
        var keysDetalhesProcessamentoFiltro = Object.keys(detalhesProcessamentoFiltro);
        detalhesProcessamentoFiltro = detalhesProcessamentoFiltro[keysDetalhesProcessamentoFiltro[0]];
        detalhesProcessamentoFiltro.forEach(elementoFiltro => {
              var elementKeysFiltro = Object.keys(elementoFiltro);
                    //document.getElementById('nomEntidade').innerHTML = elemento[elementKeys[10]];
                                      
                    var htmlToRender = 
                    "<form action='detalhesArquivos.html'>\n   "+
                    "<table id='tabelaDetalhesProc' >\n   "+
                    "                <thead>\n   "+
                    "                  <tr>\n   "+
                    "                    <th></th>\n   "+
                    "                    <th id='thTipoArquivo'> SAÍDAS </th>\n   "+
                    "                    <th>PROCESSADAS</th>\n   "+
                    "                  </tr>\n   "+
                    "                </thead>\n   "+
                    "                <tbody>\n   "+
                    "                  <tr>\n   "+
                    "                    <th id='thPeriocidade'> "+elementoFiltro[elementKeysFiltro[11]]+" </th>\n   "+
                    "                    <td id='tdProcessamento1'>\n   "+
                    "                      <h2><span id='nomEntidade'> "+elementoFiltro[elementKeysFiltro[9]]+" </span></h2>\n   "+
                    "                      <table class='tabela-detalhe'>\n   "+
                    "                        <tbody id='tdBodyProcessamento1'>\n   "+
                    "                          \n <tr> <th>Programados:</th> <td> "+elementoFiltro[elementKeysFiltro[0]]+" </td></tr> <tr> <th>Recebidos:</th> <td>"+elementoFiltro[elementKeysFiltro[1]]+"</td> </tr><tr><th>Recebidos parcial:</th><td>"+elementoFiltro[elementKeysFiltro[2]]+"</td></tr>   "+
                    "                        </tbody>\n   "+
                    "                      </table>\n   "+
                    "                    </td>\n   "+
                    "                    <td id='tdProcessamento2'>\n   "+
                    "                      <div class='text-right'>\n   "+
                    "                        <input type='hidden' id='periodo' name='periodo'  value='"+elementoFiltro[elementKeysFiltro[12]]+"'>\n   "+
                    "                        <button type='submit' value='Detalhes' class='btn btn-sm butblue my-3'>Detalhes</button>\n   "+
                    "                      </div>\n   "+
                    "                      <table class='tabela-detalhe'>\n   "+
                    "                        <tbody id='tdBodyProcessamento2'>\n   "+
                    "                          <tr>\n   "+
                    "                            <th>Competência:</th>\n   "+
                    "                            <td>"+elementoFiltro[elementKeysFiltro[12]]+"</td>\n   "+
                    "                          </tr>\n   "+
                    "                          <tr>\n   "+
                    "                            <th>Processados:</th>\n   "+
                    "                            <td>"+elementoFiltro[elementKeysFiltro[3]]+"/"+elementoFiltro[elementKeysFiltro[4]]+"</td>\n   "+
                    "                          </tr>\n   "+
                    "                          <tr>\n   "+
                    "                            <th>Processados 100%:</th>\n   "+
                    "                           <td>"+elementoFiltro[elementKeysFiltro[3]]+"/"+elementoFiltro[elementKeysFiltro[4]]+"</td>\n   "+
                    "                          </tr>\n   "+
                    "                          <tr>\n   "+
                    "                            <th>Processados Parcial:</th>\n   "+
                    "                            <td>"+elementoFiltro[elementKeysFiltro[2]]+"/"+elementoFiltro[elementKeysFiltro[1]]+"</td>\n   "+
                    "                          </tr>\n   "+
                    "                          <tr>\n   "+
                    "                            <th>Falha no processamento:</th>\n   "+
                    "                            <td>"+elementoFiltro[elementKeysFiltro[8]]+"/"+elementoFiltro[elementKeysFiltro[6]]+"</td>\n   "+
                    "                          </tr>\n   "+
                    "                        </tbody>\n   "+
                    "                      </table>\n   "+
                    "                    </td>\n   "+
                    "                  </tr>                  \n   "+
                    "                </tbody>\n   "+
                    "           </table>   " 
                    "           </form>   "; 
                $('#table-responsive').append(htmlToRender);                          
            });
            setTimeout(function(){ 
              $('#cover-spin').hide(0);
          }, 1500); 
}

function verificaFiltro(){
  if($('#comboEntidade').val() == '' || $('#tipoArquivo').val() == '' || $('#date-filter').val() == '' || $('#date-filter-end').val() == ''){
    alert('Preencha todos os campos do filtro.');
    return;
  }
  else{
    detalhesProcessamentoFiltro();
  }
}