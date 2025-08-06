/* TASK 66238 | Habilitação Pensão Autoatendimento | Lilian Monteiro | 18/08/2021 
 * Controle genérico dos plugins
*/

function controls() {
  
  $("#metismenu").metisMenu();
  $("#metismenu2").metisMenu();

  $("#painelControle button").click(function(){
    if ($("#painelControle button i").hasClass("fa-plus-square")) {
      $("#painelControle button i").removeClass("fa-plus-square").addClass("fa-minus-square");
    } else {
      $("#painelControle button i").removeClass("fa-minus-square").addClass("fa-plus-square");
    }        
  });

  $(".card-border button").click(function(){
    if ($(".card-border button i").hasClass("fa-chevron-down")) {
      $(".card-border button i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
    } else {
      $(".card-border button i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    }        
  });

  $("#date-today").datepicker({
    language: "pt-BR",
    todayHighlight: true
  });

  if (document.getElementById("date-filter-end") != undefined) {
    $('.input-daterange input').each(function() {
      $(this).datepicker({
        language: "pt-BR",
        daysOfWeekDisabled: "0,6"
      });
    });
  } else {
    $("#date-filter").datepicker({
      language: "pt-BR",
      daysOfWeekDisabled: "0,6"
    });
  }

  $("#date-filter2").datepicker({
    language: "pt-BR",
    format: "mm/yyyy",
    minViewMode: 1,
    daysOfWeekDisabled: "0,6"
  });

  $("#date-filter3").datepicker({
    format: "mm/yyyy",
    minViewMode: 1,
    language: "pt-BR"
  });

  $("#dataEvidenciaSaida").datepicker({
    language: "pt-BR",
    format: "dd/mm/yyyy",
    minViewMode: 1,
    daysOfWeekDisabled: "0,6"
  }); 
}


//mask plugin - início - celular ou telefone
var SPMaskBehavior = function (val) {
  return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
spOptions = {
  onKeyPress: function(val, e, field, options) {
      field.mask(SPMaskBehavior.apply({}, arguments), options);
    }
};
//mask plugin - final