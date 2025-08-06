function init(){

  with (document.forms[0]) {
    setaMascara(startDate, MASK_DATA);
    setaMascara(endDate, MASK_DATA);
  }
  
}

$(function(){
  init();
});