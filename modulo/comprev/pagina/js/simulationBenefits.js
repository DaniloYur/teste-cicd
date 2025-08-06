function init() {

  with (document.forms[0]) {
    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
  }

  $("#valueBenefits").mask("#.##0,00", {reverse: true, placeholder: "0,00"});
  $("#parameter").mask("#.##0,00", {reverse: true, placeholder: "0,00"});

  $("#proportionality").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });

  $("#pension").keyup(function(){
    $(this).val($(this).val().replace(/\D/g, ''));
  });
}

$(function(){
  init();
});

$(document).ready(function() {
  window.onload = initPage();

  function initPage() {

    var uri = window.location.href;
    var url = new URL(uri);
    paramsDes_tipo_beneficio = url.searchParams.get("des_tipo_beneficio"); // recupera o parametro des_tipo_beneficio da uri
    paramsCod_tipo_beneficio = url.searchParams.get("cod_tipo_beneficio"); // recupera o parametro des_tipo_beneficio da uri

    if ( paramsDes_tipo_beneficio == 'PENSÃO' ) {
      if ( paramsCod_tipo_beneficio != "M" ) {
        $('#mostrarTableHistoricoDePercentualDoBeneficioDePensao').hide();
      }
    }


    
  }

  $('#btnGravar').click(function() {
    porFora();
  })
  
});

function porFora(obj) {
  var valueBenefits = $('#valueBenefits').val().replaceAll(',', '.');

  if (valueBenefits > 100) {
    alertNovo('Valor % Benefício não pode ser maior que 100%!');
  }
}