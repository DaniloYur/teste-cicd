function confirmSigeprev(msgEmHtml) {
    $(function () {
        $("#dialog-confirm").attr("title", 'MENSAGEM SÃO PAULO PREVIDÊNCIA');
        $("#dialog-confirm").html(msgEmHtml);
        $("#dialog-confirm").dialog({
            resizable: false,
            modal: true,
            width: 380,
            height: 280,
            position: { my: "center", at: "center", of: window },
            buttons:
                {
                /* "Sim": function () {
                    $("#dialog-confirm").dialog().dialog("close");
                    eval(metodoCallback + "(" + true + ")");
                },
                "N&atilde;o": function () {
                    $("#dialog-confirm").dialog().dialog("close");
                    eval(metodoCallback + "(" + false + ")");
                }, */
                "OK": function ()  {
                    $("#dialog-confirm").dialog().dialog("close");
                }
            }
        });
    });
    ajustaDialogCentro();
}

function ajustaDialogCentro() {
    $('html, body', window.parent.document).animate({ scrollTop: $('#dialog-confirm').offset().top }, 800);
}

function isIgualsIgnoreCase(_string, _lista){
    for(let string of _lista){
        if(_string.toUpperCase() == string.toUpperCase()){
            return true;
        }
    }
    return false;
}