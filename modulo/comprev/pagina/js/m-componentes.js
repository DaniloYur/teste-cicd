
// Atalhos �teis
function atalhosUteis(img) {
    /* Constru��o do link, preencher campos de title e alt e mouseover */
    var numimg = 1;
    $.each(img, function(index,value){

        lista = $("<li><a href='#'><img src='' alt='' title='' id='Image" + numimg + "'></a></li>");
        $("#atalhos").append(lista);
        
        $("#Image"+numimg).mouseover(function(){
             $(this).addClass("opacidade");
        }).mouseout(function(){
             $(this).removeClass("opacidade");
        })
        .attr({src:value.img,alt:value.titulo,title:value.titulo})
        .parent('a').attr("href",value.link);

        if (eval("linkbool"+numimg) == true) {
            $("#Image"+numimg).parents('li').show();
        } else {
            $("#Image"+numimg).parents('li').hide();
        }
        
        numimg++;
    });
}

// Bot�o Rodap�
function botaoRodape(botao){
    $.each(botao, function(index,value){

        lista = $("<input type='button' role='button' name='btn"+value.nome+"' id='btn"+value.nome+"' value='"+value.nome+"' class='"+value.classe+"'>");
        
        if (eval("linkbool"+index) == true) {
            $("#botao-rodape").append(lista);
        }
        $("#btn"+value.nome).click(function(){
            eval(value.funcao);
        });
        
    });
}

/* 
===================================================================================
    Pesquisar campo CPF e Matr�cula - In�cio
===================================================================================
*/

function inicioPesquisa() {
    $("#consulta").click(function(){ 
        consultarServidor();
        limpaCampo("#numMatricula");
    });

    $("#numCpf").focus().mask('000.000.000-00', {reverse: true});

    $("#numCpf").on("keypress", function(event){
        limpaCampo("#numMatricula");
        realizarPesquisaCpf(keyVal(event),"#numCpf","pesquisarCpf()");
    });
    
    $("#btnPesquisarCpfServidor").click(function(){ 
        if ($("#numCpf").val().length == 14) {
            limpaCampo("#numMatricula");
            pesquisarCpf();
        } else {
            alertNovo("O campo CPF deve ser preenchido.");
        }
    });

    $("#numMatricula").on("keypress", function(event){
        verifica = keyMatricula(keyVal(event));
        if (verifica.length>0) alertNovo(verifica);
        event.preventDefault();
    });

    $("#btnPesquisarMatriculaServidor").click(function(){ 
        limpaCampo("#numCpf");
        if ($("#numMatricula").val().length >= 1) {
            pesquisarMatricula();
        }else {
            alertNovo("O campo matr�cula deve ser preenchido.");
        }
    });
}

function keyMatricula(keyValue) {
    if (keyValue == 13) {
        if ($("#numMatricula").val().length >= 1) {
            $("#numCpf").val("");
            pesquisarMatricula();
        } else {
            return "O campo matr�cula deve ser preenchido.";
        }
    }
}

function keyVal(event){
    var keynum;
    if(window.event) {
        keynum = event.keyCode;
    } else if (event.which) {
        keynum = event.which;
    }
    return keynum;
}

// Dialog Jquery UI 1.12 => adaptado para old template
function alertNovo(msgEmHtml){
	$(function() {
        $("#dialog-confirm").attr("title", 'MENSAGEM S\u00C3O PAULO PREVID\u00CANCIA');
        $("#dialog-confirm").html(msgEmHtml);
		$("#dialog-confirm").dialog({
            position: { my: "center", at: "center", of: window },
            closeText: "",
            resizable: false,
            modal: true,
            width: 380,
            height: 280,
            buttons: [
                {
                    text: "OK",
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });
        // Ajuste da dialog para o IE8 e o Firefox
        if (!!(navigator.userAgent.match(/MSIE 8/))) {
            $("#dialog-confirm").parent().css({ 
                "top": "10%",
                "left": "30%"
            });
            $(".ui-dialog .ui-dialog-titlebar-close").css({
                "height":"13px",
                "top":"40%"
            });
        } else if (!!(navigator.userAgent.match(/Firefox/))) {
            $("#dialog-confirm").parent().css("top","10%");
        }
	});
}

// Dialog Jquery UI 1.12 => template novo responsivo.
function alertNew(msgEmHtml){
	$(function() {
        if (screen.availWidth >= 1024) {
            largura = 380;
        } else if (screen.availWidth >= 768) {
            largura = 350;
        } else if (screen.availWidth >= 414) {
            largura = 330;
        } else {
            largura = 310;
        }
    
        if (screen.availHeight >= 850) {
            altura = 280;
        } else if (screen.availHeight >= 736) {
            altura = 250;
        } else {
            altura = 230;
        }

        // Verifica se a p�gina est� aberta no iframe da p�gina principal
        if ($("#dialog-msg",window.parent.document).length > 0) {
            $("#dialog-msg .ui-dialog-content",window.parent.document).html(msgEmHtml);
            $("#dialog-msg",window.parent.document).css({ "display":"block"});
            $(".ui-widget-overlay",window.parent.document).css({ "display":"block"});

            $("#dialog-msg .ui-dialog-buttonset button",window.parent.document).click(function(){ botaoDialog("#dialog-msg") });
            $("#dialog-msg .ui-dialog-titlebar .ui-dialog-titlebar-close",window.parent.document).click(function(){ botaoDialog("#dialog-msg") });
            
            altura = altura/2;
            largura = largura/2;

            $("#dialog-msg",window.parent.document).css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
        // Verifica se est� aberto em janela popup
        } else {
            $("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
            $("#dialog-confirm").html(msgEmHtml);
            $("#dialog-confirm").dialog({
                resizable: false,
                modal: true,
                width: largura,
                height: altura,
                position: { my: "center", at: "center", of: "body" },
                buttons: [
                    {
                        text: "OK",
                        click: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                ]
            });
            $(".ui-dialog-titlebar-close").attr("aria-label","Fechar janela pop-up").html("<span class='ui-button-icon ui-icon ui-icon-closethick'></span>");
            $(".ui-dialog-buttonset button").attr("aria-label","Fechar janela pop-up");

            // altura = altura/2;
            // largura = largura/2;
           
            // Ajuste para o IE8 
            // if ((window.navigator.appVersion.indexOf("MSIE 8") != -1) || (window.navigator.appVersion.indexOf("Trident/4") != -1)) {
            //     $(".ui-dialog").css({position:"absolute", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
            //     $(".ui-widget-overlay").css({position:"absolute"});
            //     $(".ui-dialog-content").css({height:"140px"});
            // } else {
            //     $(".ui-dialog").css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
            // }
        }
    });
    
}

/* 
===================================================================================
    Pesquisar campo CPF e Matr�cula - Final
===================================================================================
*/

/* 
===================================================================================
In�cio - Constru��o da caixa de mensagens dialog popUpYesNo 
===================================================================================
*/
function dialogMsg() {
    var msgSPPrev = $("<div></div>").attr({id:"dialog-confirm",title:"MENSAGEM S\u00C3O PAULO PREVID\u00CANCIA",role:"dialog","aria-label":"janela pop-up"}).html("<p><span id='msgBody'></span></p>");
    $("body").prepend(msgSPPrev);
}
/*
===================================================================================
Final - Constru��o da caixa de mensagens dialog popUpYesNo 
===================================================================================
*/

/*===================================================================================
In�cio - Limpeza de campos 
===================================================================================*/ 
//Um campo
function limpaCampo(campoPesquisa) {
    if ($(campoPesquisa).val().length > 0) { $(campoPesquisa).val(""); }
}

//V�rios campos listados em array
function limpaCampos(campoPesquisa) {
	$.each(campoPesquisa, function(i, val){
        limpaCampo(val);
	});
}
/*===================================================================================
Final - Limpeza de campos 
===================================================================================*/ 

/*===================================================================================
In�cio - Realizar pesquisa gen�rica para bot�o 'Enter' e campo CPF
===================================================================================*/ 

function realizarPesquisa(keyValue,campoPesquisado,processar) {
    if (keyValue == 13) {
        if ($(campoPesquisado).val().length > 0) {
            eval(processar);
        }
    }
}
function realizarPesquisaCpf(keyValue,campoPesquisado,processar) {
    if (keyValue == 13) {
        if ($(campoPesquisado).val().length == 14) {
            eval(processar);
        }
    }
}   

/*===================================================================================
Final - Realizar pesquisa gen�rica para bot�o 'Enter'
====================================================================================*/ 


/*===================================================================================
In�cio - Mensagem de confirm com parametros
===================================================================================*/ 
function confirmSigeprev3(msgEmHtml, metodoCallback, params){
    $(function() {
		// Abre popup para p�gina principal
		if ($("#confirm-msg",window.parent.document).length > 0) {
			$("#confirm-msg .ui-dialog-content",window.parent.document).html(msgEmHtml);
			$("#confirm-msg",window.parent.document).css({ "display":"block"});
			$(".ui-widget-overlay",window.parent.document).css({ "display":"block"});

			$("#confirm-msg .ui-dialog-buttonset button:first-child",window.parent.document).click(function(){
				botaoDialog("#confirm-msg");
				eval(metodoCallback+"("+true+","+ params +")");
			})
			.next().click(function(){
				botaoDialog("#confirm-msg");
				eval(metodoCallback+"("+false+","+ params +")");
			});
			$("#confirm-msg .ui-dialog-titlebar .ui-dialog-titlebar-close",window.parent.document).click(function(){ botaoDialog("#confirm-msg") });

			altura = $("#confirm-msg",window.parent.document).height()/2;
			largura = $("#confirm-msg",window.parent.document).width()/2;

			$("#confirm-msg",window.parent.document).css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
		
		// Abre mensagem para janela popup
		} else {
			if (screen.availWidth >= 1024) {
				largura = 380;
			} else if (screen.availWidth >= 768) {
				largura = 350;
			} else if (screen.availWidth >= 414) {
				largura = 330;
			} else {
				largura = 310;
			}
		
			if (screen.availHeight >= 850) {
				altura = 280;
			} else if (screen.availHeight >= 736) {
				altura = 250;
			} else {
				altura = 230;
			}

			$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
			$("#dialog-confirm").html(msgEmHtml);
			$("#dialog-confirm").dialog({
				resizable : false,
				modal : true,
				width: largura,
				height: altura,
				buttons:
					{
					"Sim" : function() { 
						$(this).dialog().dialog("close");
						eval(metodoCallback+"("+true+","+ params +")");
					},
					"N\u00E3o" : function() {
						$(this).dialog().dialog("close");
						eval(metodoCallback+"("+false+","+ params +")");
					}
				}
			});

			altura = altura/2;
            largura = largura/2;

            $(".ui-dialog").css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
		}
	});
}

/*===================================================================================
Final - Mensagem de confirm com parametros
===================================================================================*/ 


/*===================================================================================
In�cio - Mensagem de confirm - nova vers�o
===================================================================================*/ 

function botaoDialog2Novo(tela){
    $(tela,window.parent.document).remove();
 }
 
 function confirmSigeprev2Novo(msgEmHtml, metodoCallback){
    $(function() {
 
        if (screen.availWidth >= 1024) {
            largura = 380;
        } else if (screen.availWidth >= 768) {
            largura = 350;
        } else if (screen.availWidth >= 414) {
            largura = 330;
        } else {
            largura = 310;
        }

        if (screen.availHeight >= 850) {
            altura = 280;
        } else if (screen.availHeight >= 736) {
            altura = 250;
        } else {
            altura = 230;
        }
 
        // Abre popup para p�gina principal
        if ($("#confirm-msg",window.parent.document).length > 0) {
 
            $("#dialog-confirm",window.parent.document).attr("title", 'MENSAGEM S\u00C3O PAULO PREVID\u00CANCIA');
            $("#dialog-confirm",window.parent.document).html(msgEmHtml);
            $("#dialog-confirm",window.parent.document).dialog({
                resizable : false,
                modal : true,
                width: largura,
                height: altura,
                buttons:
                    {
                    "Sim" : function() { 
                        botaoDialog2Novo("#confirm-message");
                        eval(metodoCallback+"("+true+")");
                    },
                    "N\u00E3o" : function() {
                        botaoDialog2Novo("#confirm-message");
                        eval(metodoCallback+"("+false+")");
                    }
                }
            });
 
            altura = altura/2;
            largura = largura/2;
 
            $("#dialog-confirm",window.parent.document)
                .parents(".ui-dialog")
                .attr("id","confirm-message")
                .css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
         
        // Abre mensagem para janela popup
        } else {
 
            $("#dialog-confirm").attr("title", 'MENSAGEM S\u00C3O PAULO PREVID\u00CANCIA');
            $("#dialog-confirm").html(msgEmHtml);
            $("#dialog-confirm").dialog({
                resizable : false,
                modal : true,
                width: largura,
                height: altura,
                buttons:
                    {
                    "Sim" : function() { 
                        $(this).dialog().dialog("close");
                        eval(metodoCallback+"("+true+")");
                    },
                    "N\u00E3o" : function() {
                        $(this).dialog().dialog("close");
                        eval(metodoCallback+"("+false+")");
                    }
                }
            });
 
            altura = altura/2;
            largura = largura/2;
 
            $(".ui-dialog").css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });
        }
    });
}
/*===================================================================================
Final - Mensagem de confirm - nova vers�o
===================================================================================*/ 

/* Fallback para dialog - in�cio - inicializa��o para o layout novo */

$(function(){ checkPageOutput() }); 

/* Fallback para dialog - fim */