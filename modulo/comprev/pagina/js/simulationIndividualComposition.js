function init() {
  with (document.forms[0]) {
    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
  }
  
  $('[data-toggle="tooltip"]').tooltip();

  $("#fixedValue").mask("###,##00", {reverse: true, placeholder: "0,0000"});
  $("#unitValue").mask("###,##00", {reverse: true, placeholder: "0,0000"});
  $("#percentageValue").mask("###,##00", {reverse: true, placeholder: "0,0000"});
}

$(function(){
  init();
});