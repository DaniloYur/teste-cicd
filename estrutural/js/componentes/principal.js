const urlParametros       = new URLSearchParams(window.location.search);
const token               = '';

//Ambiente Sigeprev - Descomentar esse pedaco caso for gerar a versao para o ambientes de Homologacao, PreProducao ou Producao.

     // const urlDominioSigeprev  = (new URL(window.location.href)).origin + "/";     //https://sigeprev.spprev.sp.gov.br/
     // const urlDominioFrontEnd  = (new URL(window.location.href)).origin + "/";
     // const urlDominioBackEnd   = (new URL(window.location.href)).origin + "/";

     /* Homologacao */
         //const urlContextoSigeprev = "spprevhom";
         //const urlContextoFrontEnd = "comprev-frontendhmg/";
         //const urlContextoBackEnd  = "comprev-backendhmg/";

    /* hmlnew */
        //const urlContextoSigeprev = "spprevhmlnew";
        //const urlContextoFrontEnd = "comprev-frontendhmlnew/";
        //const urlContextoBackEnd  = "comprev-backendhmlnew/";

     /* Novaprev */
        //const urlContextoSigeprev = "novaprev";
        //const urlContextoFrontEnd = "comprev-frontendnov/";
        //const urlContextoBackEnd  = "comprev-backendpre/";

     /* Pre-producao */
        //const urlContextoSigeprev = "spprevpre";
        //const urlContextoFrontEnd = "comprev-frontendpre/";
        //const urlContextoBackEnd  = "comprev-backendpre/";
        
     // /* Producao */
     //     const urlContextoSigeprev = "spprevdev";
     //     const urlContextoFrontEnd = "comprev-frontend-dev/";
     //     const urlContextoBackEnd  = "comprev-backenddev/";

     // /* Producao */
     //     const urlContextoSigeprev = "spprev";
     //     const urlContextoFrontEnd = "comprev-frontend/";
     //     const urlContextoBackEnd  = "comprev-backend/";


//Localhosts - Descomentar esse pedaco caso for fazer testes na maquina local do desenvolvedor.

    const urlDominioSigeprev  = "http://localhost:8080/";
    const urlDominioFrontEnd  = "http://localhost:8081/";
    const urlDominioBackEnd   = "http://localhost:8082/";

    const urlContextoSigeprev = "spprev";
    const urlContextoFrontEnd = "comprev-frontend/";
    const urlContextoBackEnd  = "";


//LocalHost Yumi - Descomentar esse pedaco caso queira compartilhar o localhost para alguma analista utilizando o ngrok.
/*
    const urlDominioSigeprev  = "http://localhost:8080/";
    const urlDominioFrontEnd  = "http://0ce9864edf7d.ngrok.io/";   //8081 frontend
    const urlDominioBackEnd   = "http://c4957c4dd081.ngrok.io/";   //8082 backend

    const urlContextoSigeprev = "spprev";
    const urlContextoFrontEnd = "comprev-frontend/";
    const urlContextoBackEnd  = "";
*/

function setCookieSigeprev(nomeCookie, valorCookie, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expiracao = "expires=" + data.toUTCString();
    document.cookie = nomeCookie + "=" + valorCookie + ";" + expiracao + ";path=/";
}
function getCookieSigeprev(nomeCookie) {
    let name = nomeCookie + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

let tokenSigeprev = urlParametros.get("token");
if(tokenSigeprev != null){
    setCookieSigeprev("tokenSigeprev", tokenSigeprev, 1);
}


