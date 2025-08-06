function init() {
  with (document.forms[0]) {
    setaMascara(reference, MASK_DATA);
  }
  $("#fixedValue").mask("#.##0,00", {reverse: true, placeholder: "0,00"});
}

$(function(){
  init();
});