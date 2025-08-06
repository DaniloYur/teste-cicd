$(function(){
  $("#btnClose").click(function(){ window.close() });

  let urlParams = new URLSearchParams(window.location.search);
  $('#hiddenNumCpf').val(urlParams.get("numCpf"));
  $('#hiddenCodIdeCli').val(urlParams.get("codIdeCli"));
  $('#hiddenNumSeqFunc').val(urlParams.get("numSeqFunc"));
  $('#hiddenNumMatricula').val(urlParams.get("numMatricula"));
  $('#hiddenCodIdeRelFunc').val(urlParams.get("codIdeRelFunc"));
  $('#hiddenNumSeqBeneficio').val(urlParams.get("numSeqBeneficio"));
  $('#hiddenCodBeneficio').val(urlParams.get("codBeneficio"));

  $('#hiddenNomCargo').val(urlParams.get("nomCargo"));
  $('#hiddenNomEntidade').val(urlParams.get("nomEntidade"));
  $('#hiddenDatIniBen').val(urlParams.get("datIniBen"));
  $('#hiddenCodTipoDocCompensacao').val(urlParams.get("codTipoDocCompensacao"));
  $('#hiddenCodTipoMatrComprev').val(urlParams.get("codTipoMatrComprev"));

});


function gerarHistoricoFinanceiroExcel(){
  let urlServico = urlDominioBackEnd + urlContextoBackEnd + '/controleCompensacao/gerarHistoricoFinanceiroExcel';
  invocarDownload(urlServico , 'HistoricoFinanceiro.xls');
}

function gerarHistoricoFinanceiroPdf(){
  let urlServico = urlDominioBackEnd + urlContextoBackEnd + '/controleCompensacao/gerarHistoricoFinanceiroPdf';
  invocarDownload(urlServico,'HistoricoFinanceiro.pdf');
}


function invocarDownload(paramUrl, paramNomeArquivo){
  let req = new XMLHttpRequest();
  paramUrl += '?numCpf=' + $('#hiddenNumCpf').val();
  paramUrl += '&codIdeCli=' + $('#hiddenCodIdeCli').val();
  paramUrl += '&numSeqFunc=' + $('#hiddenNumSeqFunc').val();
  paramUrl += '&numMatricula=' + $('#hiddenNumMatricula').val();
  paramUrl += '&codIdeRelFunc=' + $('#hiddenCodIdeRelFunc').val();
  paramUrl += '&numSeqBeneficio=' + $('#hiddenNumSeqBeneficio').val();
  paramUrl += '&codBeneficio=' + $('#hiddenCodBeneficio').val();

  paramUrl += '&nomCargo=' + $('#hiddenNomCargo').val();
  paramUrl += '&nomEntidade=' + $('#hiddenNomEntidade').val();
  paramUrl += '&datIniBen=' + $('#hiddenDatIniBen').val();
  paramUrl += '&codTipoDocCompensacao=' + $('#hiddenCodTipoDocCompensacao').val();
  paramUrl += '&codTipoMatrComprev=' + $('#hiddenCodTipoMatrComprev').val();

  req.open("POST", paramUrl, true);
  req.responseType = "blob";
  req.onload = function (event) {
    let blob = req.response;
    let link=document.createElement('a');
    link.href=window.URL.createObjectURL(blob);
    link.download= paramNomeArquivo;
    link.click();
  };
  req.send();
}