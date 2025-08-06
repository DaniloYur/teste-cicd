function init() {
  $('#cnpj').mask('00.000.000/0000-00', {reverse: false});
  $('#cep').mask('00000-000', {reverse: false});
}

function pages(dataSet) {
  
  $(".tableDefault").DataTable({
    data: dataSet, 
    columns: [
      { title: "CNPJ" },
      { title: "Nome" },
      { title: "Cidade" },
      { title: "Estado" },
      { title: "A\u00E7\u00E3o" }
    ],
    "pageLength": 10,
    "searching": false,
    "ordering": false,
    "info": false,
    "lengthChange": false,
    "language": {
      "paginate": {
        "previous": "<i class='fa fa-angle-left' aria-hidden='true'></i>",
        "next": "<i class='fa fa-angle-right' aria-hidden='true'></i>"
      },
      "aria": {
        "paginate": {
          "previous": 'Anterior',
          "next": 'Pr\u00F3ximo'
        }
      }
    }
  });

}

//init
$(function(){ 
  controls();
  init();
  
  //Variável para popular tabela
  var dataSet = [], dataRow = [];

  dataRow = ['11111111111','Banco do Brasil','São Paulo','São Paulo',`
    <a href="#">
      <i class="fas fa-edit fa-lg" aria-label="editar"></i>
    </a>
    <a href="#">
      <i class="fas fa-trash-alt fa-lg" aria-label="editar"></i>
    </a>`
  ];
  dataSet.push(dataRow);
  
  pages(dataSet);
});