function sayHelloWorldToServer() {
    with (document.forms[0]) {
        let params = {};
        params.nomUsuario = $('#nome').val();
        let jsonData = consumidor.executarServico("helloWorld/sayHelloWorld", params);
        $('#nome').val(jsonData.fraseBoasVindas);
    }
}