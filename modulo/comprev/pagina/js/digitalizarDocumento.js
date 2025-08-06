/* Ticket 71851 | Digitalização | Lilian Monteiro | 27/07/2021 */

function confirmCallback(retorno){
  if (retorno) {
    console.log("oi");
  } else {
    return;
  }
}

// inicialização - init
$(function(){
  $( "#slider-shine, #slider-contrast, #slider-half-tone" ).slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 127,
    slide: 140,
    change: 140
  });
  
  $('[data-toggle="tooltip"]').tooltip();

  dialogMsg()

  $("#btnSair").click(function(){
    var msg = '<svg xmlns="http://www.w3.org/2000/svg" width="54.844" height="48.75" viewBox="0 0 54.844 48.75">';
    msg += '<path id="exclamation-triangle-solid" d="M54.226,41.9a4.573,4.573,0,0,1-3.959,6.854H4.575A4.573,4.573,0,0,1,.616,41.9L23.463,2.284a4.573,4.573,0,0,1,7.917,0L54.226,41.9Zm-26.8-8.19a4.38,4.38,0,1,0,4.38,4.38A4.38,4.38,0,0,0,27.422,33.706ZM23.263,17.963l.706,12.949a1.143,1.143,0,0,0,1.141,1.08h4.622a1.143,1.143,0,0,0,1.141-1.08l.706-12.949a1.143,1.143,0,0,0-1.141-1.2H24.4a1.143,1.143,0,0,0-1.141,1.2Z" transform="translate(0)" fill="#f89406"/>';
    msg += '</svg>';
    msg += 'Deseja salvar a digitaliza\u00E7\u00E3o antes de sair?';

    confirmSigeprev2(msg,'confirmCallback'); 
    $(".ui-dialog-title").text('DIGITALIZA\u00C7\u00C3O');
  });

  $("#btnSalvar").click(function(){
    var msg = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">';
    msg += '<path id="file-alt-solid" d="M21,12.75V0H2.25A2.245,2.245,0,0,0,0,2.25v43.5A2.245,2.245,0,0,0,2.25,48h31.5A2.245,2.245,0,0,0,36,45.75V15H23.25A2.257,2.257,0,0,1,21,12.75Zm6,22.125A1.128,1.128,0,0,1,25.875,36H10.125A1.128,1.128,0,0,1,9,34.875v-.75A1.128,1.128,0,0,1,10.125,33h15.75A1.128,1.128,0,0,1,27,34.125Zm0-6A1.128,1.128,0,0,1,25.875,30H10.125A1.128,1.128,0,0,1,9,28.875v-.75A1.128,1.128,0,0,1,10.125,27h15.75A1.128,1.128,0,0,1,27,28.125Zm0-6.75v.75A1.128,1.128,0,0,1,25.875,24H10.125A1.128,1.128,0,0,1,9,22.875v-.75A1.128,1.128,0,0,1,10.125,21h15.75A1.128,1.128,0,0,1,27,22.125Zm9-10.7V12H24V0h.572a2.248,2.248,0,0,1,1.594.656l9.178,9.188A2.243,2.243,0,0,1,36,11.428Z" fill="#029698"/>';
    msg += '</svg>';
    msg += 'Deseja gerar o arquivo de envio?';

    confirmSigeprev2(msg,'confirmCallback'); 
    $(".ui-dialog-title").text('DIGITALIZA\u00C7\u00C3O');
  });
});