//Para utilizar esse javascript,a pagina html deve importar o arquivo principal.js
const consumidor = {
    executarServico: function (servico, params) {
        let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + servico;
        if(params !== undefined && params !== '{}'){
            urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + '?' + $.param(params);
        }
        let settings = {
            "async": false,
            "crossDomain": true,
            "url": urlDominioContextoServicoParametros,
            "method": "GET",
            "headers": {
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            }
        }        
        let JSONData = {};
        $.ajax(settings).done(function (response) {
            JSONData = response;
        });
        //return JSON.stringify(JSONData);
        return JSONData;
    },

    executarServico2: function(servico, params) {
        let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + servico;
        /*
        if(params !== undefined && params !== '{}'){
            urlDominioContextoServicoParametros = urlDominioContextoServicoParametros + '?' + $.param(params);
        }
        */
        console.log(params)
        let settings = {
            "async": false,
            "crossDomain": true,
            "processData": false,
            "url": urlDominioContextoServicoParametros,
            "method": "POST",
            "headers": {
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev"),
                "Cache-Control": "no-cache",
                "Content-Type" : "application/json"
            },
            "data": JSON.stringify(params)
        }        
        let JSONData = {};
        $.ajax(settings).done(function (response) {
            JSONData = response;
        });
        //return JSON.stringify(JSONData);
        return JSONData;
    },

    setCombo: function (idCombo, codNum, servico) {
        let dominioServicoParametros = null;
        if(servico === undefined){
            dominioServicoParametros = urlDominioBackEnd + urlContextoBackEnd + "controleCompensacao/consultarCodigo" + '?codNum=' + codNum;
        }else{
            dominioServicoParametros = urlDominioBackEnd + urlContextoBackEnd + servico + '?codNum=' + codNum;
        }

        let settings = {
            "url": dominioServicoParametros,
            "crossDomain": true,
            "async": false,
            "method": "GET",
            "headers": {
                "Cache-Control": "no-cache",
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            },
            "processData": false,
            "contentType": false
        };

        $.ajax(settings).done(function (response) {
            $('#' + idCombo).append('<option value="">' + 'Selecione' + '</option>');
            response.codigos.forEach(elemento => {
                $('#' + idCombo).append("<option value='" + elemento.codPar + "'>" + elemento.desDescricao + "</option>");
            });
        });

        //2- Retorna o resultado
        //jsonData.flgError = false;
        //jsonData.msg = "";
        //return jsonData;

    },

    setComboComOpcaoTodos: function (idCombo, codNum, servico) {
        let dominioServicoParametros = null;
        if(servico === undefined){
            dominioServicoParametros = urlDominioBackEnd + urlContextoBackEnd + "controleCompensacao/consultarCodigo" + '?codNum=' + codNum;
        }else{
            dominioServicoParametros = urlDominioBackEnd + urlContextoBackEnd + servico + '?codNum=' + codNum;
        }

        let settings = {
            "url": dominioServicoParametros,
            "crossDomain": true,
            "async": false,
            "method": "GET",
            "headers": {
                "Cache-Control": "no-cache",
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            },
            "processData": false,
            "contentType": false
        };

        $.ajax(settings).done(function (response) {

            //Yumi pediu, depois tem que criar a funcao corretamente como parametro para passar flag se deve mostrar o selecione ou nao
            //$('#' + idCombo).append('<option value="">' + 'Selecione' + '</option>');

            $('#' + idCombo).append('<option value="Todos">' + 'Todos' + '</option>');
            response.codigos.forEach(elemento => {
                $('#' + idCombo).append("<option value='" + elemento.codPar + "'>" + elemento.desDescricao + "</option>");
            });
        });
    },

    setComboNovo: function (idCombo, servico, params) {
        let	 dominioServicoParametros = urlDominioBackEnd + urlContextoBackEnd + servico;
        if(params !== undefined && params !== '{}'){
            dominioServicoParametros +=  '?' + $.param(params);
        }
        let settings = {
            "url": dominioServicoParametros,
            "async": false,
            "crossDomain": true,
            "method": "GET",
            "headers": {
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            },
            "processData": false,
            "contentType": false
        };

        $.ajax(settings).done(function (response) {
            $('#' + idCombo).empty();
            $('#' + idCombo).append('<option value="">' + 'Selecione' + '</option>');
            response.options.forEach(option => {
                $('#' + idCombo).append("<option value='" + option.codigo + "'>" + option.descricao + "</option>");
            });
        });
    }
};


/*

function token(wantData = false) {
    var sToken = getCookie('token');
    $.ajaxSetup({ async: false });
    $.ajax({
        "url": domain + "api/v1/customer/authorization/verify/token",
        "method": "POST",
        "timeout": 0,
        "crossDomain": true,
        "processData": false,
        "contentType": false,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "token": sToken.toString()
        }),
    }).done(function (response) {
        //console.log(response);
        if (response.flgError)
            window.location.href = '/pages/login.html';
        if (wantData)
            sToken = response;
    });
    if (sToken == '' && window.location.pathname != '/pages/login.html')
        window.location.href = '/pages/login.html';
    return sToken;
}
*/
/*

// Usando cookie da maquina
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}*/

