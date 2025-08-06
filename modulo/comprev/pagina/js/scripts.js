String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); }
String.prototype.replaceAll=function() {return this.split(arguments[0]).join(arguments[1])}

var CONS_PROJETO = 'spprev';
//var CONS_PROJETO = 'sigeprev';

/**
 * Arquivo necess�rio para funcionar o JSON no IE8 --> json-ie8.js 
 * 
 * @param {*} _url 		    - Passar os atributos no fim. Ex.: modExibicao e formOrigem
 * @param {*} _modExibicao  - (1 para Consultar pelos campos {} 
 *                            ,2 para Consultar pelos campos {} 
 *                            ,3 para Consultar pelos campos {} 
 *                            )
 * @param {*} _formOrigem   - "Nome do Form de Origem: Ex.: 'servidor' "
 * @param {*} _campos 	    - Ex.: ["codIdeCliServ","numCpfServidor"]
 * @param {*} _callback     - Ex.: "processar()" - Essa funcao deve ser implementada na janela mae
 */
function janelaGenerica(_url, _modExibicao, _formOrigem, _campos, _callback) {
	
	var existeParametroModExibicao = _modExibicao != undefined && _modExibicao != null && _modExibicao != "";
	var existeParametroFormOrigem  = _formOrigem  != undefined && _formOrigem  != null && _formOrigem  != "";

	if (!existeParametroModExibicao) {
		alert('Falta especificar o par\u00E2metro do Modo de Exibi\u00E7\u00E3o (modExibicao).');
		return;
	}

	if (!existeParametroFormOrigem) {
		alert('Falta especificar o par\u00E2metro de Form de Origem (formOrigem).');
		return;
	}
	
	var url = _url.indexOf("?") !== -1 ? _url + "&modExibicao=" + _modExibicao : _url + "?modExibicao=" + _modExibicao ;
	url = url + "&formOrigem=" + _formOrigem;
	url = url + "&parametrosDaTela=";

	var params = {campos: _campos , callback: _callback };
	params = encodeURI(JSON.stringify(params));
	var retornoConsulta =  window.open(url+params, "consulta", "top=100,left=100,titlebar=no,resizable=yes,status=no,help=no,Width=700,Height=500,scrollbars=yes");			

}

function janelaSimples(_url, _campos, _callback) {
	
	var existeParametro = _campos != undefined && _campos != null && _campos != "";

	if (!existeParametro){
		alert('Falta especificar o(s) par\u00E2metro(s) da tela.');
		return;
	}

	var url = _url.indexOf("?") !== -1 ? _url + "&parametrosDaTela=" : _url + "?parametrosDaTela=";
	var params = {campos: _campos , callback: _callback };
	params = encodeURI(JSON.stringify(params));
	var retornoConsulta =  window.open(url+params, "janelaSigeprev", "top=100,left=100,titlebar=no,resizable=yes,status=no,help=no,Width=700,Height=500,scrollbars=yes");			

}


/*===================================================================================
In�cio - janela popup com nome da janela definida no arquivo .js
- Utilizar com arquivo json-ie8.js 
===================================================================================*/ 

function janelaSimples2(_url, _campos, _callback, _nomejanela, _paramjanela) {
	
	var existeParametro = _campos != undefined && _campos != null && _campos != "";

	if (!existeParametro){
		alert('Falta especificar o(s) par\u00E2metro(s) da tela.');
		return;
    }
    
    if (_nomejanela == "" || _nomejanela == undefined || _nomejanela == null){ 
        _nomejanela = "janelaSigeprev";
    }

    if (_paramjanela == "" || _paramjanela == undefined || _paramjanela == null){
        _paramjanela = "top=100,left=100,titlebar=no,resizable=yes,status=no,help=no,Width=700,Height=500,scrollbars=yes";
    }

	var url = _url.indexOf("?") !== -1 ? _url + "&parametrosDaTela=" : _url + "?parametrosDaTela=";
	var params = {campos: _campos , callback: _callback };
	params = encodeURI(JSON.stringify(params));
	var retornoConsulta =  window.open(url+params, _nomejanela, _paramjanela);			
}

/*===================================================================================
In�cio - janela popup com nome da janela definida no arquivo .js
===================================================================================*/ 

//Autor: Tony Caravana Campos
//Data : 06/05/2009
//Exibe objeto pelo ID
function exibeBloco(idObj) {
	with (document.forms[0]) {
		if (isIE())
			document.getElementById(idObj).style.display = 'block';
	} 
}

//Autor: Tony Caravana Campos
//Data : 06/05/2009
//Exibe objeto pelo ID
function escondeBloco(idObj) {
	with (document.forms[0]) {
		if (isIE())
			document.getElementById(idObj).style.display = 'none';
	}
}

/** 
 * 	@author Tony Caravana Campos
 *  @since 20/08/2010
 *  Prepara a tela para exibir a mensagem que pode ser de Erro, Aviso ou Sucesso (Muda as cores de acordo com o Tipo)
 **/
function printMsg(idNewObj, tipoMsg, tam, msg) {

	var cor = (tipoMsg.toUpperCase() == 'S' ? 'green'         : (tipoMsg.toUpperCase() == 'E' ? 'red'                  : '#FF7518'));
	var icn = (tipoMsg.toUpperCase() == 'S' ? 'ico_lamp.png'  : (tipoMsg.toUpperCase() == 'E' ? 'ico_erro_pequeno.png' : 'ico_alerta.gif'));
	var tit = (tipoMsg.toUpperCase() == 'S' ? 'MENSAGEM:'     : (tipoMsg.toUpperCase() == 'E' ? 'ERRO:' : 'ALERTA:'));

	document.write("<div id=\""+idNewObj+"\" style=\"visibility:visible; background-color:#FFFFFF; filter: Alpha(Opacity=100, FinishOpacity=70, Style=2); width:"+tam+";\">");
	document.write("<table width=\"100%\"  border=\"0\" cellspacing=\"0\" cellpadding=\"1\" style=\"border:1px "+cor+" dotted\"> ");
	document.write("  <tr> ");
	document.write("<td valign=\"middle\" align=\"center\" rowspan=\"2\" width=\"30\">&nbsp;&nbsp;<img name=\"objImgAlerta\" id=\"objImgAlerta\" src=\"/" + CONS_PROJETO + "/jsp/images/"+icn+"\" border=\"0\"></td> ");
	document.write("<td> ");
	document.write("<font color=\"Black\">&nbsp;&nbsp;<B>"+ tit + "</B></font> ");
	document.write("</td> ");
	document.write("</tr> ");
	document.write("<tr> ");
	document.write("<td> ");
	document.write("<font color=\""+cor+"\">&nbsp;&nbsp;<B>" + msg + "</B></font> ");	
	document.write("</td> ");
	document.write("</tr> ");
	document.write("</table> ");
	document.write("</div>");
}

//Autor: Tony Caravana Campos
//Data : 10/02/2009
//Prepara a tela para exibir a mensagem de espera
//� aconselh�vel chamar esta fun��o no in�cio da p�gina.
function printMsgEspera() {
	document.write("<div id=\"layerEspera\" style=\"position:absolute; overflow:hidden; visibility:hidden; background-color:#FFFFFF; filter: Alpha(Opacity=100, FinishOpacity=70, Style=2); width:100%; height:100%; padding:0px;\">");
	document.write("<table id=\"tbLayerEspera\"cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" height=\"100%\" align=\"center\">");
	document.write("<tr valign=\"middle\">");
	document.write("<td align=\"center\">");
	document.write("<img src=\"/" + CONS_PROJETO + "/jsp/images/ico_msg_espera.gif\">");
	document.write("<p style=\"margin-top:10px;\">");
	document.write("<font color=\"#000000\" style=\"font-size:13px;\">");
	document.write("<b><font style=\"font-size:17px;\">Aguarde</font><p style=\"margin-top:12px;\">");
	document.write("Sua solicita\u00E7\u00E3o est\u00E1 sendo processada.</b>");
	document.write("</font>");
	document.write("<p>");	
	document.write("<img src=\"/" + CONS_PROJETO + "/jsp/images/ico_carregando.gif\">");
	document.write("</td>");
	document.write("</tr>");	
	document.write("<tr valign=\"top\">");
	document.write("<td align=\"center\"><div id=\"innerLayerEsperaInfo\" style=\"vertical-align:top;text-align:center;\">&nbsp;</div></td>");
	document.write("</tr>");	
	document.write("</table>");
	document.write("</div>");	    
}


//Autor: Tony Caravana Campos
//Data : 20/11/2009
//Prepara a tela para exibir a mensagem de sucesso
function printMsgSucessoOperacao(msg) {
//	document.write("<div id=\"layerMsgSucesso\" style=\"position:absolute; overflow:hidden; visibility:visible; background-color:#FFFFFF; filter: Alpha(Opacity=100, FinishOpacity=70, Style=2); width:100%; height:100%;\">");
	document.write("<table width=\"100%\"  border=\"0\" cellspacing=\"1\" cellpadding=\"1\" style=\"border: 1px solid #B94A48; border-radius:10px;\"> ");
	document.write("  <tr> ");
	document.write("<td width=\"30\">&nbsp;&nbsp;<img name=\"objImgAlerta\" id=\"objImgAlerta\" src=\"../images/info-sigeprev.png\" border=\"0\"></td> ");
	document.write("<td> ");
	document.write("<font color=\"#B94A48\">&nbsp;&nbsp;<B>MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA<B></font> ");	
	document.write("</td> ");
	document.write("</tr> ");
	document.write("<tr> ");
	document.write("<td>&nbsp;</td> ");
	document.write("<td> ");
	document.write("<font color=\"#B94A48\">&nbsp;&nbsp;<b>" + msg + "<b></font> ");	
	document.write("</td> ");
	document.write("</tr> ");
	document.write("</table> ");	
//	document.write("</div>");
}

//Funcao que visa abrir arquivo existente no servidor
//utilizando chave de parametro do param.par
function abrirArquivo(nomArq, paramFile) {
	var url = '/' + CONS_PROJETO + '/comum/downloadArquivosGenericos.do?acao=downloadArquivo&flgCompactado=S&nomeArquivo='+nomArq+'&paramParNomChave=' + paramFile;
	window.open(url,'AbrirArq','width=800,height=500,left=150,top=150,scrollbars=yes,resizable=no,menubar=no');
}

//Funcao que visa abrir arquivo existente no servidor
//utilizando chave de parametro do param.par
function abrirArquivoInstituto(nomArq, paramFile) {
	var url = '/' + CONS_PROJETO + '/comum/downloadArquivosGenericos.do?acao=downloadArquivo&flgCompactado=S&nomeArquivo='+nomArq+'&paramParNomChave=' + paramFile + '&paramPastaIns=1';
	window.open(url,'AbrirArq','width=800,height=500,left=150,top=150,scrollbars=yes,resizable=no,menubar=no');
}

//Autor: Tony Caravana Campos
//Data : 10/02/2009
//Exibe mensagem de espera.
function exibirMsgEspera() {
	window.scroll(0,0);			
	document.getElementById('layerEspera').style.visibility = 'visible';
}

//Funcao que verifica a porcentagem.
function formataPorcent(obj){
	with (document.forms[0]){
		obj.value = obj.value.replaceAll(",",".");
		var aux = obj.value;
		aux = aux.replaceAll(".","");

		if (!SoNumeros(aux)) {
			alert("Caracteres Inv�lidos.");
			obj.value = "";
			obj.focus();
			return;
		}		

		if (((obj.value.indexOf(".") < 0) && (obj.value.length < 4)) == false) {
			if (((obj.value.length == 6) && (obj.value.indexOf(".") < 0)) ||
					(obj.value.indexOf(".") == 0) || 
					(obj.value.replace(".","").indexOf(".") > 0) ||
					(obj.value.indexOf(".") == (obj.value.length - 1))){

				alert("Valor Inv�lido.");
				obj.value = "";
				obj.focus();
				return;
			}
		}
	}
}

//Autor: Adriano Silva
//Data: 26/04/2012
function formatCamposMonet(obj) {
	with (document.forms[0]) {
		obj.value = obj.value.replaceAll(",",".");
		var aux = obj.value;
		aux = aux.replaceAll(".","");

		if (!SoNumeros(aux)) {
			alert("Caracteres Inv�lidos.");
			obj.value = "";
			obj.focus();
			return;
		}		

		if (((obj.value.indexOf(".") < 0) && (obj.value.length < 4)) == false) {
			if (((obj.value.length == 6) && (obj.value.indexOf(".") < 0)) ||
					(obj.value.indexOf(".") == 0) || 
					(obj.value.replace(".","").indexOf(".") > 0) ||
					(obj.value.indexOf(".") == (obj.value.length - 1))){

				alert("Valor Inv�lido.");
				obj.value = "";
				obj.focus();
				return;
			}
		}
	}
}

//Autor: Tony Caravana Campos
//Data : 10/02/2009
//Oculta mensagem de espera.
function sumirMsgEspera() {
	window.scroll(0,0);			
	document.getElementById('layerEspera').style.visibility = 'hidden';
}

/*
	Author: TONY CARAVANA CAMPOS
	Fun��o que verifica se o objeto de parametro � uma inst�ncia de array ou n�o
 */

function isObject(obj){
	return typeof(obj)=='object';
}

function isObjectArray(obj){
	return typeof(obj)=='object'&&(obj instanceof Array);
}

/*
 * Author: Marcos Farias Sixel Fun��o que realiza refresh do formulario quando �
 * mudado um combo com relacionamento a outro combo
 */
function campoComboOnChange(campo){
	with (document.forms[0]){
		acaoAux.value = acao.value;
		acao.value='REFRESH_COMBO';
		nomComboAlterado.value=campo.name;
		habilitaCamposForm(document.forms[0]);
		lockButtons(document.forms[0]);
		submit();
		lockCombo(document.forms[0]);
	}
}

function campoComboOnChangeDisp(campo){
	with (document.forms[0]){
		acaoAux.value = acao.value;
		acao.value='refreshCombo';
		nomComboAlterado.value=campo.name;
		habilitaCamposForm(document.forms[0]);
		lockButtons(document.forms[0]);
		submit();
		lockCombo(document.forms[0]);
	}
}

//Bloqueia os bot�es na hora do submit
function lockCombo(formName){
	for (i=0; i < formName.elements.length; i++){
		if (formName.elements[i].type == 'select' || formName.elements[i].type == 'select-one'){
			formName.elements[i].disabled = true;
		}
	}
}

/*
	Author: Tony Caravana Campos
	Fun��o que verifica se o browser utilizado � IE ou variante do mesmo (utiliza o motor) e carrega combo via AJAX.
 */
function xAbreJanelaCargaCombo(paramCombo, paramJanelaAtual, paramNomeJanela, paramDefJanela){

	if (!isIE()){
		paramCombo = paramCombo + "!navegadorIE=0";
		//url = "../../comum/comboBox.do?paramCargaCombo=" + paramCombo;
		url = "/" + CONS_PROJETO + "/comum/comboBox.do?paramCargaCombo=" + paramCombo;

		if (paramDefJanela == null)
			paramDefJanela = "center:yes;scrollbar:no;titlebar:no;resizable:no;status:no;help:no;dialogWidth:300px;dialogHeight:100px";

		window.xShowModalDialog(url, paramNomeJanela, paramDefJanela);

	}else{
		paramCombo = paramCombo + "!navegadorIE=1";
		url = "../comum/comboBox.do?paramCargaCombo=" + paramCombo;

		if (paramDefJanela == null)
			paramDefJanela = "scrollbar:no;titlebar:no;resizable:no;status:no;help:no;dialogWidth:300px;dialogHeight:100px";

		window.showModalDialog(url, paramJanelaAtual, paramDefJanela);
	}
}


function xAbreJanelaCargaComboAJAX(nomeCombo,paramCombo){

	$.ajax({
		url:contexto+"/comum/comboCargaAjax.do?metodoParaChamarNoServidor=getListaCarga&"+(paramCombo.replace(/!/gi,"&")),
		dataType:"json",
		success:function(listacarga){
		
		inserirOpcoesNaTagSelect(listaCarga, nomeCombo, 'codCombo', 'desCombo');
		
		
		},
		error:function(erro){
			alert('Um erro de processamento ocorreu.  Caso o erro se repita contate o suporte.');
		}
		
		
	
	});

}

/*
	Author: Tony Caravana Campos
	Fun��o que verifica se o browser utilizado � IE ou variante do mesmo (utiliza o motor).
 */
function isIE() {
	return (window.navigator.appVersion.indexOf("MSIE") != -1);
}

/*
Author: Jose Mario Mestre
Verifica se o browser utilizado � IE, incluindo a versao 11.
*/
function isIEFull() {
	return ((window.navigator.appVersion.indexOf("MSIE") != -1) || (window.navigator.appVersion.indexOf("Trident") != -1));
}

/* Author: Tony Caravana Campos (Criador)
   Data: 23/11/2004
   OBS: Fun��o para simula��o de uma Modal para Netscape e Mozilla.

  Notas:
    1. Os atributos edge & help funcionam somente para modal via IE. Para outros Browsers ser� ignorada.
    2. "height" & "width" tem que ser digitados antes de "center"
    3. Se voc� escolher "center=yes" n�o coloque "left" nem "top"
    4. O bot�o minimize n�o est� escondido. But when clicado a Janela n�o desaparecer�.
    5. Fora o mencionado acima todos recursos deveriam do mesmo jeito de uma modal.
	6. Para utilizar no IE, use a fun��o checkFocus(); no evento onFocus() do body. Para Mozilla n�o � necess�rio.
 */

dFeatures = 'dialogHeight: 480px; dialogWidth: 640px; dialogTop: 646px; dialogLeft: 4px; edge: Raised; center: Yes; help: Yes; resizable: Yes; status: Yes;';//default features
modalWin = "";
function xShowModalDialog( sURL, vArguments, sFeatures )
{
	if (sURL==null||sURL=='')
	{
		alert ("Invalid URL input.");
		return false;
	}
	if (vArguments==null||vArguments=='')
	{
		vArguments='';
	}
	if (sFeatures==null||sFeatures=='')
	{
		sFeatures=dFeatures;
	}

	if (window.navigator.appVersion.indexOf("MSIE")!=-1)
	{
		window.showModalDialog ( sURL, vArguments, sFeatures );
		return false;
	}
	sFeatures = sFeatures.replace(/ /gi,'');
	aFeatures = sFeatures.split(";");
	sWinFeat = "directories=0,menubar=0,titlebar=0,toolbar=0,";

	if (!isIE())
		sWinFeat += "modal,";

	var pHeight, pWidth;
	for ( x in aFeatures )
	{
		aTmp = aFeatures[x].split(":");
		sKey = aTmp[0].toLowerCase();
		sVal = aTmp[1];
		switch (sKey)
		{
		case "dialogheight":
			sWinFeat += "height="+sVal+",";
			pHeight = sVal;
			break;
		case "dialogwidth":
			sWinFeat += "width="+sVal+",";
			pWidth = sVal;
			break;
		case "dialogtop":
			sWinFeat += "screenY="+sVal+",";
			break;
		case "dialogleft":
			sWinFeat += "screenX="+sVal+",";
			break;
		case "resizable":
			sWinFeat += "resizable="+sVal+",";
			break;
		case "status":
			sWinFeat += "status="+sVal+",";
			break;
		case "scrollbars":
			sWinFeat += "scrollbars="+sVal+",";
			break;
		case "center":
			if ( sVal.toLowerCase() == "yes" )
			{
				//sWinFeat += "screenY="+((screen.availHeight-parseInt(pHeight))/2)+",";
				//sWinFeat += "screenX="+((screen.availWidth-parseInt(pWidth))/2)+",";
				var iMyWidth = (window.screen.width/2) - (75 + 10);
				var iMyHeight = (window.screen.height/2) - (100 + 50);                    
				sWinFeat += "screenY="+iMyHeight+",";
				sWinFeat += "screenX="+iMyWidth+",";
			}
			break;
		}
	}
	modalWin=window.open(String(sURL),vArguments,sWinFeat);
	if (vArguments!=null&&vArguments!='')
	{
		modalWin.dialogArguments=vArguments;
	}
	
}

/* Author: Tony Caravana Campos 
   Data: 17/10/2004
   Obs: Fun��es/Engine para Abertura de Janelas Centralizadas ou em FullScreen */
function novaJanela(url, name, w, h) {
	if (screen.width == 800) {
		l = 0;
		t = 0;
	}
	else {
		l = (screen.availWidth-10 - w) / 2;
		t = (screen.availHeight-20 - h) / 2;
	}

	features = "width="+w+",height="+h+",left="+l+",top="+t;
	if (screen.width == 800)
		features += ",screenX="+l+",screenY="+t;
	features += ",scrollbars=0,resizable=1,location=0";
	features += ",menubar=0,toolbar=0,status=1";

	if (!isIE())
		features += ",modal";

	window.open(url, name, features);
}   

function janelaTelaCheia(url, name) {
	w = screen.availWidth-10;
	h = screen.availHeight-30;
	features = "width="+w+",height="+h;
	features += ",left=0,top=0,screenX=0,screenY=0,status=0,scrollbars=1, modal";

	window.open(url, name, features);
}

function janelaSistema(url, name) {
	if (screen.width != 800)
		novaJanela(url,name, 790, 540)

		w = screen.availWidth-10;
	h = screen.availHeight-50;
	features = "width="+w+",height="+h;
	features += ",left=0,top=0,screenX=0,screenY=0,status=1,modal";

	window.open(url, name, features);
}

/* AUTOR: "Raphael Silva" and "Jones Picous"*/
/* DATA: 11/12/2001 */
/* Implementa ispunct, isalpha, isdigit */
/* ispunct verifica se o caracter � pontua��o ou s�mbolo digit�vel (aspa e apostrofe nao podem)*/
/* isalpha verifica se o caracter � uma letra */
/* isdigit verifica se o caracter � um n�mero */

function DateAdd(startDate, numDays, numMonths, numYears)
{
	var returnDate = new Date(startDate.getTime());
	var yearsToAdd = numYears;

	var month = returnDate.getMonth()	+ numMonths;
	if (month > 11)
	{
		yearsToAdd = Math.floor((month+1)/12);
		month -= 12*yearsToAdd;
		yearsToAdd += numYears;
	}
	returnDate.setMonth(month);
	returnDate.setFullYear(returnDate.getFullYear()	+ yearsToAdd);

	returnDate.setTime(returnDate.getTime()+60000*60*24*numDays);

	return returnDate;

}


function YearAdd(startDate, numYears)
{
	return DateAdd(startDate,0,0,numYears);
}

function MonthAdd(startDate, numMonths)
{
	return DateAdd(startDate,0,numMonths,0);
}

function DayAdd(startDate, numDays)
{
	return DateAdd(startDate,numDays,0,0);
}

function ispunct(c)
{
	if ((c == '.') || (c == ',') || (c == '-') || (c == '+') ||
			(c == '@') || (c == '_') || (c == '"') ||
			(c == '$') || (c == '#') || (c == '!') ||
			(c == '%') || (c == '&') || (c == '*') || (c == '(') ||
			(c == ')') || (c == '=') || (c == '{') || (c == '}') ||
			(c == '[') || (c == ']') || (c == '/') || (c == '\\') ||
			(c == ':') || (c == ';') || (c == '>') || (c == '<') ||
			(escape(c) == '%20') )
		return true;
	else
		return false;
}

function isalpha(c)
{
	if (((c >= 'a') && (c <= 'z')) ||
			((c >= 'A') && (c <= 'Z')))
		return true;
	else
		return false;
}

function isdigit(c)
{
	if ((c >= '0') && (c <= '9'))
		return true;
	else
		return false;
}
//Formata Percentual
function formataPercentual(valor, qtdDecimal)
{
	var indPontoDec;                // localizacao do ponto decimal
	var valorLimpo = "";            // valor filtrado (apenas numeros e virgula)
	var cont = 0;                   // contador
	var indPonto = 0;               // localizacao do �ltimo ponto
	var indVirgula = 0;             // localizacao da �ltima virgula
	var numero = "0123456789"; // dom�nio de d�gitos v�lidos
	var qtPonto = 0;                // qtde de pontos de milhar
	var qtResto = 0;                // resto de indPontoDec / 3
	var limite = 0;                 // limite da coloca��o do ponto de milhar


	// descobre qual o �ltimo separador que est� sendo utilizado
	indVirgula = valor.lastIndexOf(',');
	indPonto = valor.lastIndexOf('.');
	if (indVirgula == indPonto)
		indPontoDec = -1;
	else
		if (indVirgula > indPonto)
			indPontoDec = indVirgula;
		else
			indPontoDec = indPonto;

	// limpa d�gitos n�o num�ricos do valor
	for (cont=0; cont < valor.length; cont++)
	{
		if (numero.indexOf(valor.charAt(cont)) != -1)
			valorLimpo += valor.charAt(cont);
		// substitui ponto decimal por v�rgula
		if (cont+1 == indPontoDec)
		{
			cont++;
			valorLimpo += ',';
		}
		else
			if ((cont==0) && (indPontoDec==0))
				valorLimpo += ',';
	}

	if (valorLimpo.indexOf(",") == -1){
		valorLimpo += ",";
		for(i=0; i<qtdDecimal; i++){
			valorLimpo +="0"
		}
	}
	if (valorLimpo.indexOf(",") == valorLimpo.length-1){

		for(i=0; i<qtdDecimal; i++){
			valorLimpo +="0"
		}
	}
	while (valorLimpo.indexOf(",") > valorLimpo.length-1-qtdDecimal){
		valorLimpo += "0";
	}


	// retira zeros � esquerda
	while (valorLimpo.charAt(0)=='0')
		valorLimpo = valorLimpo.substring(1, valorLimpo.length);

	// transforma ",xx" em "0,xx"
	if (valorLimpo.charAt(0)==',')
		valorLimpo = '0' + valorLimpo;

	// coloca separa��o de milhar
	indPontoDec = valorLimpo.lastIndexOf(',');
	qtPonto = Math.floor(indPontoDec/3);
	qtResto = indPontoDec%3;
	if (qtResto==0)
		limite=1;
	else
		limite=0;
	/*if(valor != ""){
     for (cont=qtPonto-1; cont >= limite; cont--)
          valorLimpo = valorLimpo.substring(0, qtResto + cont*3) + '.' +valorLimpo.substring(qtResto + cont*3, valorLimpo.length);
	}*/
	// Deixa s� duas casas depois da v�rgula
	if((valor != "") && (valorLimpo != "")){
		while (valorLimpo.indexOf(",") != valorLimpo.length-1-qtdDecimal)
			valorLimpo = valorLimpo.substring(0, valorLimpo.length-1);
	}

	// Se o valor for igual 0,00 coloca o campo vazio
	//valorAux = valorLimpo;
	//if (eval(valorAux.replace(',','.')) == 0) {
	//	valorLimpo = "";
	//}
	return valorLimpo;
}
//Formata Moeda

function FormataMoeda(valor, blnUnidade)
{
	var indPontoDec;                // localizacao do ponto decimal
	var valorLimpo = "";            // valor filtrado (apenas numeros e virgula)
	var cont = 0;                   // contador
	var indPonto = 0;               // localizacao do �ltimo ponto
	var indVirgula = 0;             // localizacao da �ltima virgula
	var numero = "0123456789"; // dom�nio de d�gitos v�lidos
	var qtPonto = 0;                // qtde de pontos de milhar
	var qtResto = 0;                // resto de indPontoDec / 3
	var limite = 0;                 // limite da coloca��o do ponto de milhar
	var sinal = "";


	// descobre qual o �ltimo separador que est� sendo utilizado
	indVirgula = valor.lastIndexOf(',');
	indPonto = valor.lastIndexOf('.');
	if (indVirgula == indPonto)
		indPontoDec = -1;
	else
		if (indVirgula > indPonto)
			indPontoDec = indVirgula;
		else
			indPontoDec = indPonto;

	// limpa d�gitos n�o num�ricos do valor
	if(valor.charAt(0) == '-'){
		sinal = '-';
	}
	for (cont=0; cont < valor.length; cont++)
	{
		if (numero.indexOf(valor.charAt(cont)) != -1)
			valorLimpo += valor.charAt(cont);
		// substitui ponto decimal por v�rgula
		if (cont+1 == indPontoDec)
		{
			cont++;
			valorLimpo += ',';
		}
		else
			if ((cont==0) && (indPontoDec==0))
				valorLimpo += ',';
	}

	if (valorLimpo.indexOf(",") == -1)
		valorLimpo += ",00";         
	if (valorLimpo.indexOf(",") == valorLimpo.length-1)
		valorLimpo += "00";
	if (valorLimpo.indexOf(",") == valorLimpo.length-2)
		valorLimpo += "0";


	// retira zeros � esquerda
	while (valorLimpo.charAt(0)=='0')
		valorLimpo = valorLimpo.substring(1, valorLimpo.length);

	// transforma ",xx" em "0,xx"
	if (valorLimpo.charAt(0)==',')
		valorLimpo = '0' + valorLimpo;

	// coloca separa��o de milhar
	indPontoDec = valorLimpo.lastIndexOf(',');
	qtPonto = Math.floor(indPontoDec/3);
	qtResto = indPontoDec%3;
	if (qtResto==0)
		limite=1;
	else
		limite=0;
	if(valor != ""){
		for (cont=qtPonto-1; cont >= limite; cont--)
			valorLimpo = valorLimpo.substring(0, qtResto + cont*3) + '.' +valorLimpo.substring(qtResto + cont*3, valorLimpo.length);
	}
	// Deixa s� duas casas depois da v�rgula
	if((valor != "") && (valorLimpo != "")){
		while (valorLimpo.indexOf(",") != valorLimpo.length-3)
			valorLimpo = valorLimpo.substring(0, valorLimpo.length-1);
	}

	// Se o valor for igual 0,00 coloca o campo vazio
	if (valorLimpo == "0,00") {
		valorLimpo = "";
	}else{
		valorLimpo = sinal+valorLimpo;
	}
	return valorLimpo;
}

function FormataDecimal(valor, blnUnidade)
{

	var indPontoDec;                // localizacao do ponto decimal
	var valorLimpo = "";            // valor filtrado (apenas numeros e virgula)
	var cont = 0;                   // contador
	var indPonto = 0;               // localizacao do �ltimo ponto
	var indVirgula = 0;             // localizacao da �ltima virgula
	var numero = "0123456789"; // dom�nio de d�gitos v�lidos
	var qtPonto = 0;                // qtde de pontos de milhar
	var qtResto = 0;                // resto de indPontoDec / 3
	var limite = 0;                 // limite da coloca��o do ponto de milhar
	/*

     // descobre qual o �ltimo separador que est� sendo utilizado

     indPontoDec = valor.lastIndexOf(',');

     // limpa d�gitos n�o num�ricos do valor
     for (cont=0; cont < valor.length; cont++)
     {
          if (numero.indexOf(valor.charAt(cont)) != -1)
               valorLimpo += valor.charAt(cont);
          // substitui ponto decimal por v�rgula
          if (cont+1 == indPontoDec)
          {
               cont++;
               valorLimpo += '.';
          }
          else
               if ((cont==0) && (indPontoDec==0))
                    valorLimpo += '.';
     }

     if (valorLimpo.indexOf(".") == -1)
          valorLimpo += ",00";
     if (valorLimpo.indexOf(".") == valorLimpo.length-1)
          valorLimpo += "00";
     if (valorLimpo.indexOf(".") == valorLimpo.length-2)
          valorLimpo += "0";

     // retira zeros � esquerda
     while (valorLimpo.charAt(0)=='0')
          valorLimpo = valorLimpo.substring(1, valorLimpo.length);

     // transforma ",xx" em "0,xx"
     if (valorLimpo.charAt(0)=='.')
          valorLimpo = '0' + valorLimpo;

	 */
	valorLimpo = valor;
	return valorLimpo;
}

//Formatar Moeda.
//Autor : Claudio Braga Leite.
//Fun��o de formata��o r�pida de valores tipo moeda.
//Essa fun��o n�o precisa trabalhar em conjunto com a fun��o FormataDecimal().
//Exemplos de entrada : "qwe1234.56".
//"1234.56".
//"1234,56".
//"1a2n3n4.,.56".
//Exemplo do retorno  : "1.234,56".
function formatarMoeda(m)
{
	var valorLimpo = "";

	valorLimpo = FormataMoeda(FormataDecimal(m, false), false);

	if (valorLimpo == "")
	{
		valorLimpo = "0,00";
	}

	return valorLimpo;
}

//On Blur Moeda.
//Autor : Claudio Braga Leite.
function onBlurMoeda(obj) {
	with (document.forms[0]) {
		obj.value = formatarMoeda(obj.value);
	}
}

//Confirma Excluir.
//Autor : Claudio Braga Leite.
//Fun��o para padronizar as mensagens de exclus�o.
function confirmaExcluir()
{
	return !confirm("Deseja realmente excluir?");
}

function ValidaCPF(s)
{
	var i;
	var c;
	var achou;
	x = 0;
	soma = 0;
	dig1 = 0;
	dig2 = 0;
	texto = "";
	numcpf1="";
	numcpf = "";

	for (i = 0; i < s.length; i++) {
		c = s.substring(i,i+1);
		if (isdigit(c))
			numcpf = numcpf + c;
	}

	if (numcpf.length != 11) {
		return false;
	}

	/*if (s.indexOf("-")!=9)
 	 return false;
	 */
	len = numcpf.length; x = len -1;
	for (var i=0; i <= len - 3; i++) {
		y = numcpf.substring(i,i+1);
		soma = soma + ( y * x);
		x = x - 1;
		texto = texto + y;
	}
	dig1 = 11 - (soma % 11);
	if (dig1 == 10) dig1=0 ;
	if (dig1 == 11) dig1=0 ;
	numcpf1 = numcpf.substring(0,len - 2) + dig1 ;
	x = 11; soma=0;
	for (var i=0; i <= len - 2; i++) {
		soma = soma + (numcpf1.substring(i,i+1) * x);
		x = x - 1;
	}
	dig2= 11 - (soma % 11);
	if (dig2 == 10) dig2=0;
	if (dig2 == 11) dig2=0;
	if ((dig1 + "" + dig2) == numcpf.substring(len,len-2)) {
		return true;
	}
	return false;
}

function ValidaCPFSemNumerosIguais(s)
{
	var i;
	var c;
	var achou;
	x = 0;
	soma = 0;
	dig1 = 0;
	dig2 = 0;
	texto = "";
	numcpf1="";
	numcpf = "";

	for (i = 0; i < s.length; i++) {
		c = s.substring(i,i+1);
		if (isdigit(c))
			numcpf = numcpf + c;
	}

	if ( numcpf.length != 11||
	     numcpf == "00000000000" || 
	     numcpf == "11111111111" || 
	     numcpf == "22222222222" || 
	     numcpf == "33333333333" || 
	     numcpf == "44444444444" || 
	     numcpf == "55555555555" || 
	     numcpf == "66666666666" || 
	     numcpf == "77777777777" || 
	     numcpf == "88888888888" || 
	     numcpf == "99999999999") {
	    return false;
	}

	/*if (s.indexOf("-")!=9)
 	 return false;
	 */
	len = numcpf.length; x = len -1;
	for (var i=0; i <= len - 3; i++) {
		y = numcpf.substring(i,i+1);
		soma = soma + ( y * x);
		x = x - 1;
		texto = texto + y;
	}
	dig1 = 11 - (soma % 11);
	if (dig1 == 10) dig1=0 ;
	if (dig1 == 11) dig1=0 ;
	numcpf1 = numcpf.substring(0,len - 2) + dig1 ;
	x = 11; soma=0;
	for (var i=0; i <= len - 2; i++) {
		soma = soma + (numcpf1.substring(i,i+1) * x);
		x = x - 1;
	}
	dig2= 11 - (soma % 11);
	if (dig2 == 10) dig2=0;
	if (dig2 == 11) dig2=0;
	if ((dig1 + "" + dig2) == numcpf.substring(len,len-2)) {
		return true;
	}
	return false;
}

function validaMatricula(obj){

	return true;

	if ((obj.value != '') && (validaDAC(obj.value) == false)) {
		alert("Matr�cula preenchida com valor inv�lido");
		return;
	}
}
/* Valida o n�mero do benef�cio de pens�o e da matr�cula
 */
function validaDAC(s){
	var i;
	var c;
	num = "";
	dig1 = 0;


	for (i = 0; i < s.length; i++) {
		c = s.substring(i,i+1);
		if (isdigit(c))
			num = num + c;
	}
	len = num.length;
	if(num.length < 2){
		return false;
	}
	dig1 = calculaDAC(num.substring(0, len-1));
	if ((dig1) == num.substring(len)) {
		return true;
	}
	return false;
}
function validaDAC2(campo) {

	if (campo.value == ''){
		if (erros == '') {
			campo.focus();
		}
		erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.\n';
		return true;
	}else if (validaDAC(campo.value) == false) {
		if (erros == '') {
			campo.focus();
		}
		erros = erros + '- O campo '+campo.title+ ' preenchido com valor inv�lido.\n';
		return true;
	}
}
/*retorna o digito verificador do n�mero informado calculado pelo modulo 11*/
function calculaDAC(num)
{
	x = 0;
	soma = 0;
	dig1 = 0;
	texto = "";

	len = num.length; x = len + 1;
	for (var i=0; i <= len - 1; i++) {
		y = num.substring(i,i+1);


		if(x > 10){

			soma = soma + ( y *( x - 10));
		} else {
			soma = soma + ( y * x);
		}
		x = x - 1;
		texto = texto + y;
	}
	dig1 = 11 - (soma % 11);
	if (dig1 == 10) dig1=0 ;
	if (dig1 == 11) dig1=0 ;

	return dig1;
}

function ValidaCGC(s)
{
	var i;
	var c;
	x = 2;
	soma = 0;
	dig1 = 0;
	dig2 = 0;
	numcgc1="";
	numcgc = "";


	for (i = 0; i < s.length; i++) {
		c = s.substring(i,i+1);
		if (isdigit(c))
			numcgc = numcgc + c;
	}

	if (numcgc.length != 14) {
		return false;
	}

	/*if (s.indexOf("-")!=9)
 	 return false;
	 */
	len = numcgc.length;
	for (var i = len - 3; i >= 0; i--) {
		y = numcgc.substring(i,i+1);
		soma = soma + ( y * x);
		if (x == 9)
			x = 2;
		else
			x = x + 1;
	}
	dig1 = 11 - (soma % 11);
	if (dig1 == 10) dig1=0 ;
	if (dig1 == 11) dig1=0 ;
	numcgc1 = numcgc.substring(0,len - 2) + dig1 ;
	x = 2; soma=0;
	for (var i=len - 2; i >= 0; i--) {
		soma = soma + (numcgc1.substring(i,i+1) * x);
		if (x == 9)
			x = 2;
		else
			x = x + 1;
	}
	dig2= 11 - (soma % 11);
	if (dig2 == 10) dig2=0;
	if (dig2 == 11) dig2=0;
	if ((dig1 + "" + dig2) == numcgc.substring(len,len-2)) {
		return true;
	}
	return false;
}


function SoNumeros(s)
{
	for (var i=0;i<s.length;i++) {
		c = s.substring(i,i+1);
		if (!isdigit(c))
			return false;
	}
	return true;
}

function SoNumerosLetras(s)
{
	for (var i=0;i<s.length;i++) {
		c = s.substring(i,i+1);
		if (!isdigit(c) && !isalpha(c))
			return false;
	}
	return true;
}

function SoLetras(s)
{
	for (var i=0;i<s.length;i++) {
		c = s.substring(i,i+1);
		if (!isalpha(c) && c != ' ')
			return false;
	}
	return true;
}

function ValidaValor(s, prec)
{
	if (s.length - s.lastIndexOf(",") != (prec + 1))
		return false;
	return true;
}

function DataNasc(s)
{
	var i;
	var c;
	var n_barras;
	var data;

	hoje = new Date()
	teste_ano = hoje.getYear()
	teste_dia = hoje.getDay()
	teste_mes = hoje.getMonth()
	teste_mes = teste_mes + 1
	if (teste_dia < 10)
		teste_dia = "0" + teste_dia

		if (teste_mes < 10)
			teste_mes = "0" + teste_mes

			if (navigator.appName=='Netscape')
				teste_ano= 1900 + teste_ano;

	n_barras = 0;
	if (s.length != 10)
		return false;
	for(i=0; i<s.length; i++) {
		c = s.substring(i,i+1);
		if (c == "/")
			n_barras++;
		if (n_barras > 2)
			return false;
		if (!isdigit(c) && (c != "/"))
			return false;
	}
	if (n_barras != 2)
		return false;

	if ( (s.indexOf("/") != 2) || (s.lastIndexOf("/") != 5) )
		return false;

	d = s.substring(0, 2)// dia
	m = s.substring(3, 5)// mes
	a = s.substring(6, 11)// ano
	if (m<1 || m>12)
		return false;
	if (d<1 || d>31)
		return false;

	if (a + m + d > teste_ano + teste_mes + teste_dia)
		return false;

	if (a<1900 || a>2050)
		return false;
	if (m==4 || m==6 || m==9 || m==11) {
		if (d==31)
			return false;
	}
//	Bissexto
	if (m==2){
		var g=parseInt(a/4)
		if (isNaN(g)) {
			return false;
		}
		if (d > 29){
			return false;
		}
		if (d==29 && ((a/4)!=parseInt(a/4))){
			return false;
		}
	}
	return true;
}

//Verifica se a primeira data � maior que a segunda data
function verificaTamDatas(d1, d2)
{
	if (!ValidaData(d1) || !ValidaData(d2))
		return false;

	d1_dia	= d1.substring(0,2);
	d1_mes	= d1.substring(3,5);
	d1_ano	= d1.substring(6,10);

	dt_ini = new Date();
	dt_ini.setFullYear(parseInt(d1_ano));
	dt_ini.setMonth(parseInt(d1_mes));
	dt_ini.setDate(parseInt(d1_dia));

	d2_dia	= d2.substring(0,2);
	d2_mes	= d2.substring(3,5);
	d2_ano	= d2.substring(6,10);

	dt_fim = new Date();
	dt_fim.setFullYear(parseInt(d2_ano));
	dt_fim.setMonth(parseInt(d2_mes));
	dt_fim.setDate(parseInt(d2_dia));

	return ((dt_ini.getTime() - dt_fim.getTime() < 0) || (dt_ini.getTime() - dt_fim.getTime() == 0));

}

//Comparar duas datas, onde o retorno �:
//-1 -> Erro caso as datas passadas como parametro estejam no formato errado
//0 -> d1 < d2
//1 -> d1 = d2
//2 -> d1 > d2
function comparaDatas(d1, d2)
{
	if (!ValidaData(d1) || !ValidaData(d2))
	{
		return -1;
	}

	d1_aux = d1.substring(6,10) + d1.substring(3,5) + d1.substring(0,2);
	d2_aux = d2.substring(6,10) + d2.substring(3,5) + d2.substring(0,2);

	if (parseFloat(d1_aux) < parseFloat(d2_aux))
	{
		return 0;
	}
	else if (parseFloat(d1_aux) > parseFloat(d2_aux))
	{
		return 2;
	}
	else
	{
		return 1;
	}
}

//Verifica se a data esta no formato DD/MM/YYYY
function ValidaData(s)
{
	var i;
	var c;
	var n_barras;
	var data;

	n_barras = 0;
	
	if (s.length != 10)
		return false;
	for(i=0; i<s.length; i++) {
		c = s.substring(i,i+1);
		if (c == "/")
			n_barras++;
		if (n_barras > 2)
			return false;
		if (!isdigit(c) && (c != "/"))
			return false;
	}
	if (n_barras != 2)
		return false;

	if ( (s.indexOf("/") != 2) || (s.lastIndexOf("/") != 5) )
		return false;

	d = s.substring(0, 2)// dia
	m = s.substring(3, 5)// mes
	a = s.substring(6, 11)// ano
	if (m<1 || m>12)
		return false;
	if (d<1 || d>31)
		return false;
	if (a<1800 || a>3000)
		return false;
	if (m==4 || m==6 || m==9 || m==11) {
		if (d==31)
			return false;
	}
//	Bissexto
	if (m==2){
		var g=parseInt(a/4)
		if (isNaN(g)) {
			return false;
		}
		if (d > 29){
			return false;
		}
		if (d==29 && ((a/4)!=parseInt(a/4))){
			return false;
		}
	}
	return true;
}

//Verifica se a data esta no formato MM/YYYY
function ValidaMesAno(s)
{
	var i;
	var c;
	var n_barras;
	var data;

	n_barras = 0;
	if (s.length != 07) {
		return false;
	}
	for(i=0; i<s.length; i++) {
		c = s.substring(i,i+1);
		if (c == "/")
			n_barras++;
		if (n_barras > 1) {
			return false;
		}
		if (!isdigit(c) && (c != "/")) {
			return false;
		}
	}
	if (n_barras != 1) {
		return false;
	}

	//d = s.substring(0, 2)// dia
	//m = s.substring(3, 5)// mes
	//a = s.substring(6, 11)// ano
	m = s.substring(0, 2)// mes
	a = s.substring(3, 8)// ano

	if (m<1 || m>12) {
		return false;
	}
	if (a<1900 || a>3000) {
		return false;
	}
//	Bissexto
	if (m==2){
		var g=parseInt(a/4)
		if (isNaN(g)) {
			return false;
		}
		//if (d > 29){
		//return false;
		//}
		//if (d==29 && ((a/4)!=parseInt(a/4))){
		//return false;
		//}
	}
	return true;
}

function ValidaCEP(s)
{
	var i;
	var c;
	var achou;

	if (s.length != 9)
		return false;
	achou = false;
	for (i=0; i<s.length; i++) {
		c = s.substring(i,i+1);
		if ( !isdigit(c) && (c != '-') )
			return false;
		if (c == '-') {
			if (!achou) achou = true;
			else
				return false;
		}
	}
	if (s.indexOf("-")!=5)
		return false;
	return true;
}

function ValidaFone(s)
{
	var i;
	var c;
	var achou;

	achou = false;
	for (i=0; i<s.length; i++) {
		c = s.substring(i,i+1);
		if ( !isdigit(c) && (c != '-') )
			return false;
		if (c == '-') {
			if (!achou)
				achou = true;
			else
				return false;
		}
	}
	return true;
}

function ValidaTexto(s) // Critica se ha caracteres estranhos
{
	var i;
	var c;

	for (i=0;i<s.length;i++) {
		c = s.substring(i,i+1);
		if (!( isalpha(c) ||
				isdigit(c) ||
				ispunct(c) ) )
			return false;
	}
	return true;
}

function validaPipe(obj,evt) {
	if (isIE()) {
		var charCode = evt.keyCode;
		//124 - ASCII: vertical bar
		if (charCode == 124) return false;
		return true;
	}
}

function SoTexto(s) // Critica so texto
{
	var i;
	var c;

	for (i=0;i<s.length;i++) {
		c = s.substring(i,i+1);
		if (isdigit(c))
			return false;
	}
	return true;
}

function ValidaEmail(email) {
	var achou_ponto=false;
	var achou_arroba=false;
	var achou_caracter=false;
	for (var i=0; i<email.length; i++) {
		if (email.charAt(i)=="@") achou_arroba=true;
		else if (email.charAt(i)==".") achou_ponto=true;
		else if (email.charAt(i)!=" ") achou_caracter=true;
	}
	return (achou_ponto & achou_arroba & achou_caracter);
}

function checkMail(mail){ 

	var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/); 

	if(typeof(mail) == "string"){ 
		if(er.test(mail)) { 
			return true; 
		} 

	} else if(typeof(mail) == "object"){ 
		if(er.test(mail.value)){  
			return true;  
		}

	} else{ 
		return false; 
	} 
}




//Obtem valor de um grupo de radio buttons de mesmo nome
function ValorRadio(radio)
{
	for (i = 0; i < radio.length; i++)
		if (radio[i].checked) {
			return radio[i].value;
		}
	return "";
}

//Obtem descricao do item selecionado
function GetSelectText(sel)
{
	if(sel.selectedIndex >= 0)
		if (GetSelectValue(sel) == ''){
			return "";
		}
		else{
			return sel.options[sel.selectedIndex].text;
		}
	else
		return "";
}

//Obtem valor do item selecionado
function GetSelectValue(sel)
{
	if(sel.selectedIndex >= 0)
		return sel.options[sel.selectedIndex].value;
	else
		return "";
}

//Posiciona o select no item cujo valor eh value
function PosicionaSelect(select, value)
{
	for (var i=0; i <select.length; i++)
		if (select.options[i].value == value) {
			select.selectedIndex = i;
			return;
		}
}

//Seta o radiobutton cujo valor eh value
function SetaRadio(radio, value)
{
	for (i = 0; i < radio.length; i++)
		if (radio[i].value == value)
			radio[i].checked = true;
		else
			radio[i].checked = false;
}

//Seta a checkbox cujo valor eh value
function SetaCheckBox(checkbox, value)
{
	for (i = 0; i < checkbox.length; i++)
		if (checkbox[i].value == value)
			checkbox[i].checked = true;
		else
			checkbox[i].checked = false;
}

//Seta a checkbox cujo checkbox s�o diferentes
function SetaCheckBox2(checkbox, value)
{
	if (checkbox.value == value)
		checkbox.checked = true;
	else
		checkbox.checked = false;
}

function formatavalor(valor) {
//	formata valor de 100.000,00 p/ 100000.00
	temp = ""
		tamanho = valor.length
		cont = 1

		for (i=0;i<tamanho;i++) {
			if (valor.substring(i,cont) == ",") {
			}
			else if (valor.substring(i,cont) == ".") {
			}
			else {
				temp = temp + valor.substring(i,cont)
			}
			cont = cont + 1
		}
	tamanho = temp.length
	temp = temp.substring(0,tamanho-2) + "." + temp.substring(tamanho-2)
	valor =  temp
	return valor;
}

//Soma a esquerda qualquer car�ter quando necess�rio
//sWord 	- STRING
//iLength 	- Tamanho desejado
//sChar 	- Caracter a ser preenchido
function addLeftChar(sWord, iLength, sChar) {
	result = sWord;
	if ((sWord.length > iLength)||(iLength<=0)||(sChar.length==0)) {
		result = sWord;
	}
	while (result.length < iLength){
		result = sChar + result
	}
	return result;
}

//Valida��o de hora no formato HH:MM:SS (24 horas)
//Os segundos s�o opcionais.
//Retorna 0 se for tudo ok!
//Retorna 1 se a hora for inv�lida.
//Retorna 2 se os minutos forem invalidos.
//Retorna 3 se os segundos forem inv�lidos.
//Retorna 4 se a hora estiver no formato inv�lido
//Na valida��o do form, deve ser usado o Switch()
function ValidaHora(timeStr) {
	var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;

	var matchArray = timeStr.match(timePat);
	if (matchArray == null) {
		return 4;
	}
	hour = matchArray[1];
	minute = matchArray[2];
	second = matchArray[4];
	ampm = matchArray[6];

	if (second=="") { second = null; }
	if (ampm=="") { ampm = null }

	if (hour < 0  || hour > 23) {
//		alert("Hour must be between 1 and 12. (or 0 and 23 for military time)");
		return 1;
	}

	/*
if (hour <= 12 && ampm == null) {
	if (confirm("Please indicate which time format you are using.  OK = Standard Time, CANCEL = Military Time")) {
		alert("You must specify AM or PM.");
		return 2;
   }
}

if  (hour > 12 && ampm != null) {
alert("You can't specify AM or PM for military time.");
return false;
}
	 */

	if (minute<0 || minute > 59) {
//		alert ("Minute must be between 0 and 59.");
		return 2;
	}
	if (second != null && (second < 0 || second > 59)) {
//		alert ("Second must be between 0 and 59.");
		return 3;
	}
	return 0;
}

//Valida hora.
//Autor : Ivan Magalh�es.
//Fun��o de valida��o de hora.
//Valida��o de hora no formato HH:MM:SS (24 horas)
//Os segundos s�o opcionais.
function ValidaCampoHora(hora) {

	if (ValidaHora(hora.value) != 0){
		alert('O campo '+hora.title+ ' est� com formato inv�lido.');
		hora.focus();
		hora.select();
		return true;
	}
	return false;
}
function ValidaCampoHoraNovo(hora) {

	if (ValidaHora(hora.value) != 0){
		alertSigePrev('O campo '+hora.title+ ' est� com formato inv�lido.');
		hora.focus();
		hora.select();
		return true;
	}
	return false;
}

function validaCampoHora2(hora) {

	if (hora.value != "" && ValidaHora(hora.value) != 0){
		erros = erros + '- O campo '+hora.title+ ' n�o foi preenchido corretamente.\n';
		hora.focus();
		hora.select();
		return true;
	}
	return false;
}

//Valida a igualdade das horas.
//Autor : Ivan Magalh�es.
function validaHorasIguais(hora1, hora2) {

	if (comparaHoras(hora1.value, hora2.value) == 0){
		alert('O campo '+hora1.title+ ' n�o pode ser igual ao campo '+ hora2.title +'.');
		hora2.focus();
		hora2.select();
		return true;
	}
	return false;
}
//Valida a igualdade das horas.
//Autor : Ivan Magalh�es.
function validaHorasIguaisNovo(hora1, hora2) {

	if (comparaHoras(hora1.value, hora2.value) == 0){
		alertSigePrev('O campo '+hora1.title+ ' n�o pode ser igual ao campo '+ hora2.title +'.');
		hora2.focus();
		hora2.select();
		return true;
	}
	return false;
}


//Valida a superioridade das horas.
//Autor : Ivan Magalh�es.
function validaHoraMaior(hora1, hora2) {

	if (comparaHoras(hora1.value, hora2.value) == 1){
		alert('O campo '+hora2.title+ ' n�o pode ser maior que o campo '+ hora2.title +'.');
		hora1.focus();
		hora1.select();
		return true;
	}
	return false;
}
//Valida a superioridade das horas.
//Autor : Ivan Magalh�es.
function validaHoraMaiorNovo(hora1, hora2) {

	if (comparaHoras(hora1.value, hora2.value) == 1){
		alertSigePrev('O campo '+hora2.title+ ' n�o pode ser maior que o campo '+ hora2.title +'.');
		hora1.focus();
		hora1.select();
		return true;
	}
	return false;
}

//Valida a superioridade das horas.
//Autor : Ivan Magalh�es.
function validaHoraMaior2(hora1, hora2) {

	if (hora1.value != '' && hora2 != '' && comparaHoras(hora1.value, hora2.value) == 1){
		erros = erros + '- O campo '+hora2.title+ ' n�o pode ser maior que o campo '+ hora1.title +'.\n';
		hora1.focus();
		hora1.select();
		return true;
	}
	return false;
}

//Valida a superioridade das horas.
//Autor : Ivan Magalh�es.
function validaHoraMenor(hora1, hora2) {

	if (comparaHoras(hora1.value, hora2.value) == 2){
		alert('O campo '+hora1.title+ ' n�o pode ser menor que o campo '+ hora2.title +'.');
		hora1.focus();
		hora1.select();
		return true;
	}
	return false;
}

//Compara horas.
//Autor : Ivan Magalh�es.
//Fun��o de compara��o de 2 par�metros horas de mesmo formato .
//Valida��o de cada hora no formato HH:MM:SS (24 horas)
//Os segundos s�o opcionais para ambas as horas simultaneamente.
//Retorna 0 se primeira hora for igual a segunda.
//Retorna 1 se a primeira hora for maior que a segunda.
//Retorna 2 se a primeira hora for menor que a segunda.
//Retorna 3 se a primeira hora estiver no formato inv�lido
//Retorna 4 se a segunda hora estiver no formato inv�lido
//Na valida��o do form, deve ser usado o Switch()
function comparaHoras(timeStr1, timeStr2) {
	var timePat = /^(\d{1,2}):(\d{2})(:(\d{2}))?(\s?(AM|am|PM|pm))?$/;

	var matchArray1 = timeStr1.match(timePat);
	var matchArray2 = timeStr2.match(timePat);
	if (ValidaHora(timeStr1) == 4) {
		return 3;
	}
	if (ValidaHora(timeStr2) == 4) {
		return 4;
	}

	hour1 = matchArray1[1];
	minute1 = matchArray1[2];
	second1 = matchArray1[4];
	ampm1 = matchArray1[6];
	hour2 = matchArray2[1];
	minute2 = matchArray2[2];
	second2 = matchArray2[4];
	ampm2 = matchArray2[6];


	if (second1=="") { second1 = null; }
	if (ampm1=="") { ampm1 = null; }
	if (second2=="") { second2 = null; }
	if (ampm2=="") { ampm2 = null; }


	if (hour1 > hour2) {
		return 1;
	}else if(hour1 < hour2) {
		return 2;
	}else{
		// As horas(HH) s�o iguais
		if (minute1 > minute2) {
			return 1;
		}else if (minute1 < minute2) {
			return 2;
		}else{
			// Os minutos s�o iguais
			if (second1 != null && second2 != null && (second1  > second2)) {
				return 1;
			}else if (second1 != null && second2 != null && (second1  < second2)) {
				return 2;
			}else{
				// timeStr1 = timeStr2
				return 0;
			}
		}

	}

}


//verifica o preenchimento do campo
function validaCampo(campo, valida) {

	if (campo.type == 'text'){
		if (campo.value == ''){
			alert('O campo '+campo.title+ ' deve ser preenchido.');
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.\n';
			campo.focus();
			campo.select();
			return true;
		}
	}
	else if (campo.type == 'textarea'){
		if (campo.value == ''){
			alert('O campo '+campo.title+ ' deve ser preenchido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	else if (campo.type == 'select-one'){
		if (campo.options.length > 1) {
			if (campo.value == '' || campo.value == '-1'){
				alert('O campo '+campo.title+ ' deve ser selecionado.');
				campo.focus();
				return true;
			}
		}
		else{
			if (valida == 'S'){
				if (campo.value == '' || campo.value == '-1'){
					alert('O campo '+campo.title+ ' deve ser selecionado.');
					campo.focus();
					return true;
				}
			}
		}
	}

	return false;
}

//verifica o preenchimento do campo tipo radio
function validaCampoRadio(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			return false;
		}
	}

	if (campo.length>0){
		alert('O campo '+campo[0].title+ ' deve ser escolhido.');
		return true;
	}
	else{
		if (!campo.checked){
			alert('O campo '+campo.title+ ' deve ser escolhido.');
			return true;
		}
	}


	return false;
}



function validaCampoRadioNovo(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			return false;
		}
	}

	if (campo.length>0){
		alertSigePrev('O campo '+campo[0].title+ ' deve ser escolhido.');
		return true;
	}
	else{
		if (!campo.checked){
			alertSigePrev('O campo '+campo.title+ ' deve ser escolhido.');
			return true;
		}
	}


	return false;
}

function validaCampoRadio2(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			return false;
		}
	}

	if (campo.length>0){
		erros = erros + '- O campo '+campo[0].title+ ' deve ser escolhido.\n';
		return true;
	}
	else{
		if (!campo.checked){
			erros = erros + '- O campo '+campo.title+ ' deve ser escolhido.\n';
			return true;
		}
	}

	return false;
}

function validaCampoRadio2Novo(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			return false;
		}
	}

	if (campo.length>0){
		erros = erros + '- O campo '+campo[0].title+ ' deve ser escolhido.<br/>';
		return true;
	}
	else{
		if (!campo.checked){
			erros = erros + '- O campo '+campo.title+ ' deve ser escolhido.<br/>';
			return true;
		}
	}

	return false;
}

//retorna true no caso de alguma op��o ter sido checkada
//falso caso nenhuma op��o tenha sido escolhida
function isCampoCheckboxChecked(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			marcou = true;
		}
	}

	if (!marcou){
		if (campo.length>0){
			return false;
		}
		else{
			if (!campo.checked){
				return false;
			}
		}
	}

	return true;
}

function validaCampoChave(campo) {
	if (campo.type != 'select-one'){
		if (campo.defaultValue == '') {
			alert("O campo " + campo.title + " precisa ser consultado.");
			campo.focus();
			return true;
		}
		else {
			if (campo.value != campo.defaultValue) {
				alert("O campo " + campo.title + " pesquisado '" + campo.defaultValue + "' n�o pode ser diferente do campo " + campo.title + " digitado '" + campo.value + "'.");
				campo.focus();
				return true;
			}
		}
	}
	else {
		if (campo[0].defaultSelected == true) {
			alert("O campo " + campo.title + " precisa ser selecionado e consultado.");
			campo.focus();
			return true;
		}
		else {
			if (campo[campo.selectedIndex].defaultSelected != true) {
				for (i=0; i<campo.length; i++) {
					if (campo[i].defaultSelected == true) {
						alert("O campo " + campo.title + " pesquisado '" + campo[i].text + "' n�o pode ser diferente do campo " + campo.title + " selecionado '" + campo[campo.selectedIndex].text + "'.");
						campo.selectedIndex = i;
						campo.focus();
						return true;
					}
				}
			}
		}
	}
	return false;
}

function validaCampoChave2(campo1, campo2) {
	if (campo1.value != campo2.value) {
		alert("O " + campo1.title + " pesquisado '" + campo2.value + "' n�o pode ser diferente do " + campo1.title + " digitado '" + campo1.value + "'.");
		campo1.focus();
		return true;
	}
	return false;
}

function validaMinimoCaracteres(campo, tamMin) {
	if (campo.value.length < tamMin) {
		alert("O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.");
		campo.focus();
		return true;
	}
	return false;
}

function validaMinimoCaracteresNovo(campo, tamMin) {
	if (campo.value.length < tamMin) {
		alertSigePrev("O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.");
		campo.focus();
		return true;
	}
	return false;
}

/**
 * @author Niedson Araujo
 * @since 20/03/2013
 */
//---------------INICIO--------------
function validaMinimoCaracteresSemContarEspacos(campo, tamMin) {
	var valorSemEspacos = campo.value.replaceAll(" ","");
	if (valorSemEspacos.length < tamMin) {
		alert("O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.");
		campo.focus();
		return true;
	}
	return false;
}
//---------------FIM--------------


/**
 * @author Niedson Araujo
 * @since 06/08/2013
 */
//---------------INICIO--------------
function isIE10() {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf("MSIE 10") != -1) {
		return true;
	}
	return false;
}
//---------------FIM--------------


/**
 * Retorna se a tecla pressionada e o enter 
 * Exemplo de uso cancelando o submit do form: <body onKeyPress="return disableEnterKey(event)" />
 * @author Niedson Araujo
 * @since 20/03/2013
 */
//---------------INICIO--------------
function disableEnterKey(e){
    var key;
    if(window.event)
         key = window.event.keyCode;     
    else
         key = e.which;     
    if(key == 13)
         return false;
    else
         return true;
}
//---------------FIM--------------

function validaCampoCompleto(campo) {
	if (campo.value.length != campo.maxLength) {
		alert("O campo " + campo.title + " deve ser completamente preenchido.");
		campo.focus();
		return true;
	}
	return false;
}

//verifica o preenchimento do campo tipo checkbox
function validaCampoCheckbox(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			marcou = true;
		}
	}

	if (!marcou){
		if (campo.length>0){
			alert('O campo '+campo[0].title+ ' deve ser escolhido.');
			return true;
		}
		else{
			if (!campo.checked){
				alert('O campo '+campo.title+ ' deve ser escolhido.');
				return true;
			}
		}
	}

	return false;
}

//verifica se todos  os checkbox foram preenchidos
function validaTodosCamposCheckbox(campo) {

	marcados = 0;
	entrou = false;

	for (i=0; i<campo.length; i++){
		entrou = true;
		if (campo[i].checked){
			marcados++;
		}
	}

	if (!entrou){
		if (!campo.checked){
			alert('Todas as op��es do campo '+campo.title+ ' devem ser selecionadas.');
			return true;
		}
	}

	if (campo.length > marcados){
		alert('Todas as op��es do campo '+campo[0].title+ ' devem ser selecionadas.');
		return true;
	}

	return false;
}

//verifica se todos  os checkbox foram preenchidos
function validaTodosCamposCheckboxObrigatorios(campo) {

	for (i=0; i<campo.length; i++){
		if (campo[i].value.split('#')[1] == 'S') {
			if (campo[i].checked) {
			} else {
				alert('Todas as op��es do campo '+campo[i].title+ ' que s�o obrigat�rias devem ser selecionadas.');
				return true;    		
			}
		}
	}
	return false;
}


//seleciona todas as op��es de um checkbox
function selecionaTodosCheckbox(campo) {

	entrou = false;
	for (i=0; i<campo.length; i++){
		entrou = true;
		campo[i].checked = true;
	}

	if (!entrou){
		campo.checked = true;
	}

	return;
}

//seleciona e tamb�m desmarca todas as op��es de um checkbox.
function selecionaEDeselecionaTodosCheckbox(campoTodos, campo) {

	entrou = false;

	if (!campoTodos.checked) {
		for (i=0; i<campo.length; i++){
			entrou = false;
			campo[i].checked = false;
		}
	} else {
		for (i=0; i<campo.length; i++){
			entrou = true;
			campo[i].checked = true;
		}
	}

	if (!entrou){
		campo.checked = true;
	}

	return;
}



//Alterna todas as op��es de um checkbox do form
function alternaAllCheckboxForm(campo) {
	var flag = campo.checked;

	for (i=0; i < document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].type == 'checkbox'){
			document.forms[0].elements[i].checked = flag;
		}
	}
}

//verifica o CPF caso o campo tenha sido preenchido
function validaCampoCpf(campo) {
	if (campo.value != ''){
		if (!ValidaCPF(campo.value)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alert(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	return false;
}

//Verifica o CPF com Mascara caso o campo tenha sido preenchido.
function validaCampoCpfComMascara(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPF(cpf)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alert(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	return false;
}

//verifica o CNPJ caso o campo tenha sido preenchido
function validaCampoCnpj(campo) {

	if (campo.value != ''){
		if (!ValidaCGC(campo.value)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alert(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o Per�odo(mm/aaaa) caso o campo tenha sido preenchido
function validaCampoPeriodo(campo) {

	if (campo.value != ''){
		if (!ValidaData("01/" + campo.value)){
			alert('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o Per�odo(mm/aaaa) caso o campo tenha sido preenchido
function validaCampoPeriodo2(campo) {

	if (campo.value != ''){
		if (!ValidaData("01/" + campo.value)){
			if (erros=='') {
				campo.focus();
				campo.select();
			}
			erros += '- O campo '+campo.title+ ' n�o foi preenchido corretamente.\n';
			return true;
		}
	}
	return false;
}



//verifica os campos Periodo caso tenham sido preenchidos
function comparaCampoPeriodoMenor(campo1, campo2) {

	if (campo1.value != '' && campo2.value != ''){
		if (comparaDatas("01/"+campo1.value, "01/"+campo2.value) == 2){
			alert('O campo '+campo2.title+ ' n�o pode ser anterior a '+campo1.title+'.');
			campo2.focus();
			return true;
		}
	}

	return false;
}
//GABRIEL FELIX 11/02/2016 TASK2347
function comparaCampoPeriodoMenor2(campo1, campo2) {

	if (campo1.value != '' && campo2.value != ''){
		if (comparaDatas("01/"+campo1, "01/"+campo2) == 2){
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function validaCampoData(campo) {

	if (campo.value != ''){
		if (!ValidaData(campo.value)){
			alert('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoData(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2){
			alert('O campo '+data1.title+ ' n�o pode ser posterior a '+data2.title+'.');
			data1.focus();
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoDataMenor(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2){
			alert('O campo '+data2.title+ ' n�o pode ser anterior a '+data1.title+'.');
			data2.focus();
			return true;
		}
	}

	return false;
}


//verifica se � N�mero o campo preenchido
function validaCampoNumero(campo) {

	if (campo.value != ''){
		if (!SoNumeros(campo.value)){
			alert('O campo '+campo.title+ ' deve ser preenchido apenas com n�meros.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

function validaCampoNumero2(campo) {

	if (campo.value != ''){
		if (!SoNumeros(campo.value)){
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido apenas com n�meros.\n';
			campo.focus();
			return true;
		}
	}

	return false;
}

function comparaCampoValorMenor(valor1, valor2) {

	if (valor1.value != '' && valor2.value != ''){

		if (parseFloat(formataNumero(vazio(valor1.value), "2", false, ".")) > parseFloat(formataNumero(vazio(valor2.value), "2", false, "."))){
			alert('O campo '+valor2.title+ ' n�o pode ser menor que o campo '+ valor1.title +'.');
			valor2.focus();
			return true;
		}
	}

	return false;
}


//verifica se � um ANO v�lido
function validaCampoAno(campo) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(4)){
			alert('O campo '+campo.title+ ' deve ser preenchido com no minimo 4 caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}

		if (campo.value < 1900 || campo.value > 2100){
			alert('O campo '+campo.title+ ' deve ser um ano de 1900 a 2100.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica se � N�mero o campo preenchido
function validaTamanhoCampo(campo, tam) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(tam)){
			alert('O campo '+campo.title+ ' deve ser preenchido com no minimo '+tam+' caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//valida um tamanho m�ximo de um campo - muito usado no caso de um textarea, pois este n�o possui maxlength
function validaTamanhoMaxCampo(campo, tam) {

	if (tam=='')
		tam = 255;

	if (campo.value != ''){
		if (campo.value.length > parseInt(tam)){
			alert('O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//habilita todos os campos existentes no formul�rio recebido
function habilitaCamposForm(formName) {
	for (i=0; i < formName.elements.length; i++) {
		if (formName.elements[i].type != 'hidden') {
			formName.elements[i].disabled = false;
		}
	}
}

//bloquear todos os campos existentes no formul�rio recebido
function bloquearCamposForm(formName) {
	for (i=0; i < formName.elements.length; i++) {
		if (formName.elements[i].type != 'hidden' && formName.elements[i].type != 'a' && formName.elements[i].type != 'button') {
			formName.elements[i].disabled = true;
		}
	}
}

//limpa todos os campos existentes no formul�rio recebido
function limpaCamposForm(formName) {
	for (i=0; i < formName.elements.length; i++){
		if (formName.elements[i].type != 'hidden') {
			if (formName.elements[i].type != 'button'){
				if (formName.elements[i].type != 'submit'){
					formName.elements[i].value = '';
				}
			}
		}
	}
}

//limpa todos os campos existentes no formul�rio recebido
//inclusive os campos "hidden"
function limpaCamposForm2(formName) {
	for (i=0; i < formName.elements.length; i++) {
		if (formName.elements[i].type != 'button') {
			if (formName.elements[i].type != 'submit') {
				formName.elements[i].value = '';
			}
		}
	}
}

//imprime o frame corrente
function imprimeTelaCorrente(){
	if(confirm("O documento que ser� impresso corresponde as informa��es contidas na p�gina corrente. Deseja prosseguir?") == false) {
		return;
	}
	else {
		for (i=0; i < document.forms[0].elements.length; i++) {
			if (document.forms[0].elements[i].type == 'button' || document.forms[0].elements[i].type == 'submit'){
				document.forms[0].elements[i].style.visibility = 'hidden';
			}
		}

		window.print();

		for (i=0; i < document.forms[0].elements.length; i++) {
			if (document.forms[0].elements[i].type == 'button' || document.forms[0].elements[i].type == 'submit'){
				document.forms[0].elements[i].style.visibility = 'visible';
			}
		}
	}
}


//Bloqueia os bot�es na hora do submit
function lockButtons(formName) {
	for (i=0; i < formName.elements.length; i++) {
		if (formName.elements[i].type == 'button' || formName.elements[i].type == 'submit'){
			formName.elements[i].disabled = true;
		}
	}
}
//Desbloqueia os bot�es
function unlockButtons(formName) {
	for (i=0; i < formName.elements.length; i++) {
		if (formName.elements[i].type == 'button' || formName.elements[i].type == 'submit'){
			formName.elements[i].disabled = false;
		}
	}
}

//FUN��O QUE DEVE SER UTILIZADA NO EVENTO ONKEYPRESS DE UM OBJETO TEXTO
//EXEMPLO DE USO: onKeyPress="return validaNumero(this, event)"
//@autor: Arthur Bellieny
function validaNumero(obj,evt) {
    	/*
    	 * [ TT20129 ] TELA CADASTRO �RG�O
    	 * Modifica��o: Gabriel, Data: 12/11/2014
    	 * Fun��o tamb�m ser� utilizada em outros browsers. 
    	 */
	//if (isIE()) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		
		return true;
	//}
}

function validaNumeroPontoVirgula(obj,evt) {
	//if (isIE()) {
		var charCode = evt.keyCode;
		if (charCode == 32) return false;
		if (charCode == 46) return true;
		if (charCode == 44) return true;
		if (isNaN(String.fromCharCode(charCode))) return false;
		return true;
	//}
}
//FUN��O QUE DEVE SER UTILIZADA NO EVENTO ONKEYPRESS DE UM OBJETO TEXTO
//EXEMPLO DE USO: onKeyPress="return validaNumero(this, event)"
//@autor: Lucas Prestes
function validaNumeroVirgula(obj,evt){
	//if (isIE()) {
		var charCode = evt.keyCode;
		
		if (charCode == 46) return false;
		return validaNumeroPontoVirgula(obj,evt);
	//}
}

//FUN��O QUE DEVE SER UTILIZADA NO EVENTO ONKEYPRESS DE UM OBJETO TEXTO
//EXEMPLO DE USO: onkeypress="return(currencyFormat(this,'.',',',event))";
//fls: objeto texto
//milSep: separador de milhar
//decSep: separador de casas decimais
//e: evento
//@autor: Arthur Bellieny
function currencyFormat(fld, milSep, decSep, e) {
	var MAXIMO_VALOR = 18;
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter

	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key

	len = fld.value.length;

	if (len >= MAXIMO_VALOR) return false;

	for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) fld.value = '';
	if (len == 1) fld.value = '0'+ decSep + '0' + aux;
	if (len == 2) fld.value = '0'+ decSep + aux;
	if (len > 2) {
		aux2 = '';
		for (j = 0, i = len - 3; i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
		fld.value += decSep + aux.substr(len - 2, len);
	}
	return false;
}


//FUN��O QUE DEVE SER UTILIZADA NO EVENTO ONKEYPRESS DE UM OBJETO TEXTO
//EXEMPLO DE USO: onkeypress="return(currencyFormat(this,'.',',',event))";
//fls: objeto texto
//milSep: separador de milhar
//decSep: separador de casas decimais
//e: evento
//@autor: Arthur Bellieny
function currencyNegativeFormat(fld, milSep, decSep, e) {
	var MAXIMO_VALOR = 18;
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '-0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter

	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
	
	// verifica se o n�mero � negativo
	negativo = false;
	if (fld.length > 0 && fld.substr(fld.length - 1, fld.length) == "-") {
		fld = fld.substr(0,fld.length-1); // tira o sinal
		negativo = true;
	}

	len = fld.value.length;

	if (len >= MAXIMO_VALOR) return false;

	for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;
	len = aux.length;
	if (len == 0) fld.value = '';
	if(negativo == true){
		if (len == 1) fld.value = '-0'+ decSep + '0' + aux;
		if (len == 2) fld.value = '-0'+ decSep + aux;
		if (len > 2) {
			aux2 = '';
			for (j = 0, i = len - 3; i >= 0; i--) {
				if (j == 3) {
					aux2 += milSep;
					j = 0;
				}
				aux2 += aux.charAt(i);
				j++;
			}
			fld.value = '';
			len2 = aux2.length;
			for (i = len2 - 1; i >= 0; i--)
				fld.value += aux2.charAt(i);
			fld.value += decSep + aux.substr(len - 2, len);
			fld.value = "-" + fld.value;
			onBlurMoeda(fld);
		}		
	}else{	
		if (len == 1) fld.value = '0'+ decSep + '0' + aux;
		if (len == 2) fld.value = '0'+ decSep + aux;
		if (len > 2) {
			aux2 = '';
			for (j = 0, i = len - 3; i >= 0; i--) {
				if (j == 3) {
					aux2 += milSep;
					j = 0;
				}
				aux2 += aux.charAt(i);
				j++;
			}
			fld.value = '';
			len2 = aux2.length;
			for (i = len2 - 1; i >= 0; i--)
				fld.value += aux2.charAt(i);
			fld.value += decSep + aux.substr(len - 2, len);
			onBlurMoeda(fld);
		}
	}	
	return false;
	
	
}


//FUN��O QUE DEVE SER UTILIZADA NO EVENTO ONKEYPRESS DE UM OBJETO TEXTO
//EXEMPLO DE USO: onkeypress="return(currencyFormatGeneric(this,'.',',','7',3,event))";
//fls: objeto texto
//milSep: separador de milhar
//decSep: separador de casas decimais
//MaxDigitos: quantidade m�xima de d�gitos, incluindo os separadores de milhar e de casas decimais.
//nCasasDec: quantidade de casas decimais
//e: evento
//@autor: Ivan Magalh�es
function currencyFormatGeneric(fld, milSep, decSep,MaxDigitos, nCasasDec, e) {
	var sep = 0;
	var key = '';
	var i = j = 0;
	var len = len2 = 0;
	var strCheck = '0123456789';
	var aux = aux2 = '';
	var whichCode = (window.Event) ? e.which : e.keyCode;
	if (whichCode == 13) return true;  // Enter

	key = String.fromCharCode(whichCode);  // Get key value from key code
	if (strCheck.indexOf(key) == -1) return false;  // Not a valid key

	len = fld.value.length;

	if (len >= MaxDigitos) return false;

	for(i = 0; i < len; i++)
		if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
	aux = '';
	for(; i < len; i++)
		if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
	aux += key;

	len = aux.length;

	for(d = 0; d <= (nCasasDec - len); d++){
		if (d == 0) fld.value = '0'+ decSep;
		if (d > 0) fld.value = fld.value + '0';
		if (d == (nCasasDec - len)) fld.value = fld.value + aux;
	}
	if (len > nCasasDec) {
		aux2 = '';
		for (j = 0, i = (len - (nCasasDec+1)); i >= 0; i--) {
			if (j == 3) {
				aux2 += milSep;
				j = 0;
			}
			aux2 += aux.charAt(i);
			j++;
		}
		fld.value = '';
		len2 = aux2.length;
		for (i = len2 - 1; i >= 0; i--)
			fld.value += aux2.charAt(i);
		fld.value += decSep + aux.substr(len - nCasasDec, len);
	}
	return false;
}

//---------------
//RECURSO: VALIDA��O E FORMATA��O DE N�MEROS
//PAR�METROS:
//1) pStr: CONTE�DO A SER VALIDADO / FORMATADO (obs.: possivelmente proveniente de um element 'text' do html)
//2) formata: INDICA SE O RETORNO SER� FORMATADO '9.999.999,99'(true) OU N�O (false)
//-> obs.: Para 'formata==true', o separador obrigatoriamente dever� ser ',' (v�rgula)
//3) separador: INDICA QUAL O SEPARADOR FAR� PARTE DO N�MERO FRACION�RIO (caso seja fracion�rio)
//-> obs.: Ao enviar o valor do textField para o servlet, utilizar os seguintes par�metros (valor, numCasasDec, false, '.')
//formataNumero(pStr: string, numCasasDec: inteiro, formata: booleano, separador: string)
//@autor: Arthur Bellieny
function formataNumero(pStr, numCasasDec, formata, separador) {

	// Valida o n�mero de casas decimais
	if (isNaN(numCasasDec)) {
		alert("N�mero de casas decimais inv�lida na fun��o!"); return "erro";
	}
	// Valida o separador
	if (separador != "." && separador != ",") {
		alert("Separador inv�lido na fun��o!"); return "erro";
	}

	// retira os espa�os vazios antes do n�mero
	var ind = 0;
	tirouZeros = false;
	while (pStr.charAt(ind) == ' ') {
		pStr = (ind+1 > pStr.length) ? "" : pStr.substring(ind+1);
		tirouZeros = true;
	}

	if (tirouZeros && pStr.length == 0) return "erro";

	// verifica se o n�mero � negativo
	negativo = false;
	if (pStr.length > 0 && pStr.charAt(0) == "-") {
		pStr = pStr.substr(1,pStr.length); // tira o sinal
		negativo = true;
	}
	// valida todos os caracteres, com exce��o dos poss�veis separadores ('.' ou ',')
	for (var i=0; i<pStr.length; i++) {
		if (isNaN(pStr.charAt(i)) && pStr.charAt(i) != "." && pStr.charAt(i) != ",") {
			alert("N�mero inv�lido!"); return "erro";
		}
	}
	// recupera o �ndice do separador natural, se houver
	var inte = "", frac = "";
	var temSep = false;
	for (var j=pStr.length-1; j>=0; j--) {
		if (isNaN(pStr.charAt(j)) && (pStr.charAt(j) == "." || pStr.charAt(j) == ",")) {
			temSep = true;
			break;
		}
		else
			frac = pStr.charAt(j) + frac;
	}

	if (!temSep) {
		inte = pStr;
		frac = "";
	}
	else {
		inte = pStr.substr(0,j);
		if (j == 0) inte = "0";
		else inte = pStr.substr(0,j);
	}

	// retira uma poss�vel formata��o (99.999.999)
	var novoInte = "";
	for (var k=0; k<inte.length; k++)
		if (inte.charAt(k) != ".") novoInte += inte.charAt(k);
	if (novoInte != "") inte = novoInte;

	if (isNaN(inte)) {
		alert("N�mero inv�lido!"); return "erro";
	}
	// parte fracion�ria
	if (isNaN(frac)) {
		alert("N�mero inv�lido!"); return "erro";
	}

	// forma��o da parte inteira
	if (formata) {
		if (separador != ",") { // separador obrigat�rio para n�meros formatados
			alert("Separador inv�lido para formata��o num�rica!");return "erro";
		}
		var cont = 0; var aux = "";
		for (var i = inte.length-1; i >= 0; i--) {
			cont++; aux = inte.charAt(i) + aux;
			if (cont == 3 && i > 0) {
				aux = "." + aux;  cont = 0;
			}
		}
		inte = aux;
	}

	// formata��o da parte fracion�ria
	if (numCasasDec > 0) {
		var max = 0;
		if (numCasasDec > frac.length)
			max = numCasasDec - frac.length;
		if (inte.length > 0) {
			if (frac.length < numCasasDec) {
				for (ind=0; ind < max; ind++)
					frac += "0";
			}
			else
				frac = frac.substr(0,numCasasDec);
		}
	}
	else {
		frac = "";
		separador = "";
	}

	/*  inteiroZero = true;
  for (var i=0; i<inte.length; i++) {
     if (inte.charAt(i) != '0') { inteiroZero = false; break; }
  }
  fracZero = true;
  for (var i=0; i<frac.length; i++) {
     if (frac.charAt(i) != '0') { fracZero = false; break; }
  }*/
//	if ((inte.length == 0 && frac.length == 0) || (inteiroZero && fracZero)) {

	if ((inte.length == 0 && frac.length == 0)) {
		inte = ""; frac = "";
		separador = "";
	}

	if (inte.length > 0 && negativo) inte = "-" + inte;

	return inte + separador + frac;
}

//retorna um objeto
//campo - nome do objeto
//frame - nome do frame onde esta o objeto
//@autor: Arthur Bellieny
function getElement(campo, frame){
	if (frame != null) {
		if (frame != "[object]") frame = getFrame(frame);
		return frame.document.all.item(campo);
	} else {
		return document.all.item(campo);
	}
}

//faz o arredondamento de um numero
//num - numero para ser arredondado
//X   - numero de casas
//@autor: Arthur Bellieny
function round(num,X) {
	X = (!X ? 2 : X);
	return Math.round(num * Math.pow(10, X )) / Math.pow(10,X);
}

//fun��o para ser usada no metodo de soma
//retorna um valor 0,00 quando o valor for vazio
//val - valor a ser validado
//@autor: Arthur Bellieny
function vazio(val) {
	if (val == "") {
		return "0,00";
	}
	return val;
}

//fun��o para somar um array de objetos texto
//valores - array de objetos texto
//@autor: Arthur Bellieny
function somaValores(valores) {
	if (valores.length == null){
		return valores.value;
	}
	var t = 0;
	for (var i = 0; i < valores.length; i++) {
		t += parseFloat(formataNumero(vazio(valores[i].value), "2", false, "."));
	}
	return round(t, 2);
}

//fun��o para ser usada em uma janela modal
//seta o campo de origem com o valor passado como parametro
//codigo - valor a ser setado
//@autor: Arthur Bellieny
function enviarServidor(codigo){
	with (document.forms[0]){
		var handler = window.dialogArguments;
		var obj = handler.getElement(campoOrigem.value);
		obj.value = codigo;

		window.close();
	}
}
//valida se um PT esta no formato padr�o
function validaPt(objText){
	return validaCampoMask(objText, MASK_PT);
}

//valida se uma Natureza de Receita esta no formato padr�o
function validaNaturezaReceita(objText){
	return validaCampoMask(objText, MASK_NATUREZA_RECEITA);
}

//valida se uma Natureza de Despesa esta no formato padr�o
function validaNaturezaDespesa(objText){
	return validaCampoMask(objText, MASK_NATUREZA_DESPESA);
}

//fun��o para validar um campo texto
//de acordo com uma mascara
//Arthur Bellieny
function validaCampoMask(objText, mascara){
	var tamMask = mascara.length;
	if (objText.value.length != tamMask){
		var msg = objText.title == "" ? "Campo" : objText.title;
		alert(msg + " n�o esta no formato padr�o.\nEx.: " + mascara);
		objText.focus();
		return true;
	}
	return false;
}

function replaceAll(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
		string = string.replace(token, newtoken);
	}
	return string;
}

function replaceSubstring(inputString, fromString, toString) {
	var temp = inputString;
	if (fromString == "") {
		return inputString;
	}
	if (toString.indexOf(fromString) == -1) {
		while (temp.indexOf(fromString) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(fromString));
			var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
			temp = toTheLeft + toString + toTheRight;
		}
	} else {
		var midStrings = new Array("~", "`", "_", "^", "#");
		var midStringLen = 1;
		var midString = "";
		while (midString == "") {
			for (var i=0; i < midStrings.length; i++) {
				var tempMidString = "";
				for (var j=0; j < midStringLen; j++) { tempMidString += midStrings[i]; }
				if (fromString.indexOf(tempMidString) == -1) {
					midString = tempMidString;
					i = midStrings.length + 1;
				}
			}
		}
		while (temp.indexOf(fromString) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(fromString));
			var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
			temp = toTheLeft + midString + toTheRight;
		}
		while (temp.indexOf(midString) != -1) {
			var toTheLeft = temp.substring(0, temp.indexOf(midString));
			var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
			temp = toTheLeft + toString + toTheRight;
		}
	}
	return temp;
}

//retorna a data atual no formato dd/mm/yyyy
function getDataAtual(){
	var d, s;
	d = new Date();
	s =  (d.getDate() < 10 ? "0" : "")+ d.getDate() + "/";
	mes = d.getMonth() + 1;
	s += ( mes < 10 ? "0" : "")+ mes + "/";
	s += d.getFullYear();
	return(s);
}

function tirarMascara(campo) {

	var c, ret;
	ret = "";
	for (i = 0; i < campo.value.length; i++) {
		c = campo.value.substring(i,i+1);
		if (isdigit(c))
			ret = ret + c;
	}

	return ret;

}
//Init padr�o
function init(){
}

function disableItens(){
	var parametros = document.querySelectorAll(":disabled");
	for (var i = 0; i < parametros.length; i++) {
	    parametros[i].setAttribute("class", "estiloDisabled");
	}	
}

function calculaTotalDias(ano,mes,dia){
	ano = ano == "" ? 0 : parseInt(ano);
	mes = mes == "" ? 0 : parseInt(mes);
	dia = dia == "" ? 0 : parseInt(dia);

	if (mes == 11) {
		return (ano * 365) + (mes * 30) + dia + 4;
	}

	return (ano * 365) + (mes * 30) + dia;
}

function calculaTotalDiasComNumeroDias31(ano,mes,dia){
	ano = ano == "" ? 0 : parseInt(ano);
	mes = mes == "" ? 0 : parseInt(mes);
	dia = dia == "" ? 0 : parseInt(dia);

	if (mes == 11) {
		return (ano * 365) + (mes * 31) + dia + 4;
	}

	return (ano * 365) + (mes * 31) + dia;
}


//dias = total de dias
function calculaAnoMesDia(dias){
	var ano = parseInt(dias / 365);
	var dia = dias - (ano * 365);
	var mes = 0;

	if (dia > 30) {
		mes = parseInt(dia / 30);

		dia = dia - (mes * 30);

		/*if (mes == 11) {

			    var Aux1 = 0;
			    Aux1 = (365 * ano) + (30 * mes);
			    alert(Aux1);

			    var Aux2 = 0 ;
			    Aux2 = dias - Aux1;
			    alert(Aux2);

			    var Aux3 = 0;
			    Aux3 = 365 - 330 - Aux2;
			    alert(Aux3);

			    var Aux4 = 31 - Aux3;
				dia = Aux4;
				alert(Aux4);
			}*/
	}

	if (mes == 12 && dias < 365) {
		mes = 11;
		dia = 365 - dias;
		dia = 31 - dia;
	}
	return new Array(ano, mes, dia);
}

//dias = total de dias
function calculaAnoMesDiaComNumeroDias31(dias){
	var ano = parseInt(dias / 365);
	var dia = dias - (ano * 365);
	var mes = 0;

	if (dia > 31) {
		mes = parseInt(dia / 31);

		dia = dia - (mes * 31);

		/*if (mes == 11) {

			    var Aux1 = 0;
			    Aux1 = (365 * ano) + (30 * mes);
			    alert(Aux1);

			    var Aux2 = 0 ;
			    Aux2 = dias - Aux1;
			    alert(Aux2);

			    var Aux3 = 0;
			    Aux3 = 365 - 330 - Aux2;
			    alert(Aux3);

			    var Aux4 = 31 - Aux3;
				dia = Aux4;
				alert(Aux4);
			}*/
	}

	if (mes == 12 && dias < 365) {
		mes = 11;
		dia = 365 - dias;
		dia = 31 - dia;
	}
	return new Array(ano, mes, dia);
}




//Cria din�micamente uma m�scara espec�fica
//Autor: Franklin
function fnMascDinam(peStrCampo, peStrMask)
{
	var locObj		 = peStrCampo;

	var locStr		 = locObj.value;
	var locCharPos   = locStr.length;
	var locCharInput = String.fromCharCode(event.keyCode);

	var locCharMask  = peStrMask.substring(locCharPos, locCharPos + 1);
	var locCharProx	 = peStrMask.substring(locCharPos + 1, locCharPos + 2);
	var locStrNumeros= '0123456789';
	var locStrLetras = 'abcdefghijklmnopqrstuvxzABCDEFGHIJKLMNOPQRSTUVXZ��������������������������������������';

	// A - Alfanum�rico (Letras, espa�o e n�meros)
	// # - N�meros apenas.

	if (locStr.length >= peStrMask.length)
	{
		locObj.value = locStr.substring(0,peStrMask.length);
		return false;
	}

	switch (locCharMask)
	{
	case "#":
	{
		if (locStrNumeros.indexOf(locCharInput) == -1)
		{
			return false;
		}
		break;
	}
	case "A":
	{
		if (locStrLetras.indexOf(locCharInput) == -1)
		{
			return false;
		}
		break;
	}
	default:
	{
		switch (locCharProx)
		{
		case "#":
		{
			if (locStrNumeros.indexOf(locCharInput) == -1)
			{
				return false;
			}
			break;
		}
		case "A":
		{
			if (locStrLetras.indexOf(locCharInput) == -1)
			{
				return false;
			}
			break;
		}
		}
	}
	locObj.value += locCharMask;
	}
}

//===================================================================================
//Funcoes modificadas por Romulo, evitando varios alets de erro,
//Acumulando erros em uma unica variavel e apresentando apenas
//uma vez o Resumo de Erros a cada Evento

var erros = ""; // Variavel que agrega mensagens de Erro

//verifica o preenchimento do campo
function validaCampo2(campo, valida) {

	if (campo.type == 'text' || campo.type == 'file'){
		if (campo.value == ''){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.\n';
			return true;
		}
	}
	else if (campo.type == 'textarea'){
		if (campo.value == ''){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.\n';
			return true;
		}
	}
	else if (campo.type == 'select-one'){
		if (campo.options.length > 1) {
			if (campo.value == '' || campo.value == '-1'){
				if (erros == '') {
					campo.focus();
				}
				erros = erros + '- O campo '+campo.title+ ' deve ser selecionado.\n';
				return true;
			}
		}
		else{
			if (valida == 'S'){
				if (campo.value == '' || campo.value == '-1'){
					if (erros == '') {
						campo.focus();
					}
					erros = erros + '- O campo '+campo.title+ ' deve ser selecionado.\n';
					return true;
				}
			}
		}
	}

	return false;
}

function validaCampoCompleto2(campo) {
	/*
	 * Autor: Adriano Silva
	 * Data: 13/11/2012
	 * TASK1529
	 * Deixa de validar no caso dos telefones devido a mudan�a na mascara para dar suporte ao 9� digito
	 * --------INICIO
	 */
	if (campo.value.length != campo.maxLength && campo.styleClass != "telefone") {
	//---------FIM
		if (erros == '') {
			campo.focus();
		}
		erros = erros + '- O campo ' + campo.title + ' deve ser completamente preenchido.\n';
		return true;
	}
	return false;
}

//Verifica o CPF com Mascara caso o campo tenha sido preenchido.
function validaCampoCpfComMascara2(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPF(cpf)){
			var msg = "- " + (campo.title == '' ? 'Campo' : campo.title);
			//alert(msg + ' inv�lido.');
			if (erros == '') {
				if (!campo.disabled)
					campo.focus();
			}
			erros = erros + msg + ' inv�lido.\n';
			return true;
		}
	}
	return false;
}


function validaCampoCpfComMascara2SemDigitosIguais(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPFSemNumerosIguais(cpf)){
			var msg = "- " + (campo.title == '' ? 'Campo' : campo.title);
			//alert(msg + ' inv�lido.');
			if (erros == '') {
				if (!campo.disabled)
					campo.focus();
			}
			erros = erros + msg + ' DIGITADO N�O � VALIDO.\n';
			return true;
		}
	}
	return false;
}


//verifica o DATA caso o campo tenha sido preenchido
function validaCampoData2(campo) {

	if (campo.value != ''){
		if (!ValidaData(campo.value)){
			//alert('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' n�o foi preenchido corretamente.\n';
			return true;
		}
	}

	return false;
}
function validaMinimoCaracteres2(campo, tamMin) {
	if (campo.value.length < tamMin) {
		if (erros == '') {
			campo.focus();
		}
		erros = erros + "- O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.\n";
		return true;
	}
	return false;
}

function SoLetras2(campo) {
	for (var i=0;i<campo.value.length;i++) {
		c = campo.value.substring(i,i+1);
		if (!isalpha(c) && c != ' ') {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "- O campo " + campo.title + " cont�m caracteres diferentes de letras \n";
			return false;
		}
	}
	return true;
}

function DoisEspacosEmBranco(campo) {
	var blnEspacoDetectado = false;

	for (var i=0;i<campo.value.length;i++) {
		if (campo.value.substring(i,i+1)==' ') {
			if (blnEspacoDetectado) {
				//dois em seguida
				if (erros=='') campo.focus();
				erros = erros + "- O campo " + campo.title + " cont�m dois espa�os em branco juntos \n";
				return false;
			}
			blnEspacoDetectado = true;
		} else {
			blnEspacoDetectado = false;
		}
	}
	return true;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoDataMenor2(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2) {
			if (erros == '') {
				data2.focus();
			}
			erros = erros + "- O campo " + data2.title + " n�o pode ser anterior a "+data1.title+".\n";
			return true;
		}
	}

	return false;
}

function validaCampoChave3(campo) {
	if (campo.type != 'select-one'){
		if (campo.defaultValue == '') {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "- O campo " + campo.title + " precisa ser consultado.\n";
			return true;
		}
		else {
			if (campo.value != campo.defaultValue) {
				if (erros == '') {
					campo.focus();
				}
				erros = erros + "- O campo " + campo.title + " pesquisado " + campo.defaultValue + " n�o pode ser diferente do campo " + campo.title + " digitado " + campo.value + ".\n";
				return true;
			}
		}
	}
	else {
		if (campo[0].defaultSelected == true) {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "O campo " + campo.title + " precisa ser selecionado e consultado.\n";
			return true;
		}
		else {
			if (campo[campo.selectedIndex].defaultSelected != true) {
				for (i=0; i<campo.length; i++) {
					if (campo[i].defaultSelected == true) {
						if (erros == '') {
							campo.focus();
						}
						erros = erros + "O campo " + campo.title + " pesquisado " + campo[i].text + " n�o pode ser diferente do campo " + campo.title + " selecionado " + campo[campo.selectedIndex].text + ".\n";
						campo.selectedIndex = i;
						return true;
					}
				}
			}
		}
	}
	return false;
}


//Controla a entrada de dados para campos do tipo "NOME".
function fnEvnEntradaAlfa()
{
	var peCharEntrada = String.fromCharCode(event.keyCode);

	var locStrExpression	= /[^A-Za-z����������������������\ ]/i;
	var locRetorno			= peCharEntrada.match(locStrExpression);

	if (locRetorno == null)
	{
		return true;
	}
	else
	{
		event.keyCode = 0;
		return false;
	}
}

function fnEvnEntradaAlfa2Novo(event) {
	var peCharEntrada = String.fromCharCode(event.keyCode);

	var locStrExpression	= /[^A-Za-z����������������������\ ]/i;
	var locRetorno			= peCharEntrada.match(locStrExpression);

	if (locRetorno == null)
	{
		return true;
	}
	else
	{
		event.keyCode = 0;
		return false;
	}
}

//verifica o CNPJ caso o campo tenha sido preenchido
function validaCampoCnpj2(campo) {

	if (campo.value != ''){
		if (!ValidaCGC(campo.value)){
			var msg = campo.title == '' ? '- O campo' : campo.title;
			//alert(msg + ' inv�lido.');
			if (erros == '') {
				campo.focus();
			}
			erros = erros + msg + ' inv�lido.\n'
			return true;
		}
	}

	return false;
}

function validaCampoCnpj2Novo(campo) {

	if (campo.value != ''){
		if (!ValidaCGC(campo.value)){
			var msg = campo.title == '' ? '- O campo' : campo.title;
			if (erros == '') {
				campo.focus();
			}
			erros = erros + msg + ' inv�lido.<br>';
			return true;
		}
	}

	return false;
}



//valida um tamanho m�ximo de um campo - muito usado no caso de um textarea, pois este n�o possui maxlength
function validaTamanhoMaxCampo2(campo, tam) {
	if (tam=='')
		tam = 255;

	if (campo.value != ''){
		if (campo.value.length > parseInt(tam)){
			//alert('O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es).');
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es) (no momento possui ' + campo.value.length + ' caracteres).\n';
			return true;
		}
	}

	return false;
}

//valida um tamanho m�ximo de um campo - muito usado no caso de um textarea, pois este n�o possui maxlength
function validaTamanhoMaxCampo2Novo(campo, tam) {
	if (tam=='')
		tam = 255;

	if (campo.value != ''){
		if (campo.value.length > parseInt(tam)){
			//alert('O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es).');
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es) (no momento possui ' + campo.value.length + ' caracteres).<br/>';
			return true;
		}
	}

	return false;
}

//Valida o n�mero de caracteres de um campo 
function validaTamanhoTextArea(campo, tam) {
	if (tam==''){tam = 255;}
	if (campo.value.length < parseInt(tam)){
		return true;
	}
	return false;
}

//verifica se � um ANO v�lido
function validaCampoAno2(campo) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(4)) {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido com no minimo 4 caracter(es).\n';
			return true;
		}

		if (campo.value < 1900 || campo.value > 2100){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser um ano de 1900 a 2100.\n';
			return true;
		}
	}
}


/*
<!-- [ TASK-REDESENHO ] Substitui��o de alert nativo por Dialog do jQuery Personalizado -->

<!-- Autor: Nilson Junior, Data: 31/05/2016 -->

<!-� Duplicamos as valida��es e renomeamos para n�o alterar os alerts de todo projeto -->
*/


//verifica se � um ANO v�lido
function validaCampoAno2Novo(campo) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(4)) {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido com no minimo 4 caracter(es).<br/>';
			return true;
		}

		if (campo.value < 1900 || campo.value > 2100){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser um ano de 1900 a 2100.<br/>';
			return true;
		}
	}
}

function calcularDigitoVerificadorSantaderBanespa(auxAgencia, auxConta) {
	// FORMATO AG�NCIA(4) CONTA(8) DIGITO(1)

	var auxPeso = new Array("9","7","3","1","9","7","1","3","1","9","7","3");
	var cont = 0;
	var soma = 0;
	var digito = 0;
	var auxAgenciaConta = auxAgencia.toString() + auxConta.toString();

	for(cont = 0 ; cont < 12 ; cont++){
		soma = soma + ((auxAgenciaConta.substring(cont,cont+1) * auxPeso[cont]) % 10);
	}

	digito = (10 - (soma % 10)) % 10;

	return digito;
}


function calcularDigitoVerificador (conta, modulo) {

	var fator;
	var total;
	var dv;

	total=0;
	fator=2;
	modulo = parseInt(modulo);
	if (modulo==10) {
		for (var contador=conta.length-1; contador>=0; contador--) {
			totalAux = parseInt(conta.charAt(contador)) * fator;
			switch(totalAux){
			case 10: totalAux = 1; break;
			case 12: totalAux = 3; break;
			case 14: totalAux = 5; break;
			case 16: totalAux = 7; break;
			case 18: totalAux = 9; break;
			default: totalAux = totalAux;
			}
			total += totalAux;
			if (fator==2) {fator=1}else{fator=2};
		}
		resto = total%modulo;
		if (resto>0)
			dv = modulo-resto;
		else 
			dv = '0';	

		if (dv>9) dv='';

	} else {
		for (var contador=conta.length-1; contador>=0; contador--) {
			total += parseInt(conta.charAt(contador)) * fator;
			fator++;
			if (fator==10) fator=2;
		}
		resto = total%modulo;
		dv = modulo-resto;
		if (dv>9) dv='X';

	}
	return(dv);

}

function validarDigitoVerificador (conta, modulo) {
	var contaPura = conta.substr(0,conta.length-1);
	var digitoVerificador = conta.substr(conta.length-1, 1);
	var digitoCalculado = calcularDigitoVerificador (contaPura, modulo);
	return (digitoVerificador==digitoCalculado);
}


function calcularDigitoVerificador2 (conta, modulo) {

	var fator;
	var total;
	var dv;

	total=0;
	fator=2;
	modulo = parseInt(modulo);
	if (modulo==10) {
		for (var contador=conta.length-1; contador>=0; contador--) {
			totalAux = parseInt(conta.charAt(contador)) * fator;
			switch(totalAux){
			case 10: totalAux = 1; break;
			case 12: totalAux = 3; break;
			case 14: totalAux = 5; break;
			case 16: totalAux = 7; break;
			case 18: totalAux = 9; break;
			default: totalAux = totalAux;
			}
			total += totalAux;
			if (fator==2) {fator=1}else{fator=2};
		}
		resto = total%modulo;
		if (resto>0)
			dv = modulo-resto;
		else 
			dv = '0';	

		if (dv>9) dv='';

	} else {
		for (var contador=conta.length-1; contador>=0; contador--) {
			total += parseInt(conta.charAt(contador)) * fator;
			fator++;
			if (fator==10) fator=2;
		}
		resto = total%modulo;
		dv = modulo-resto;
		if (dv>9) dv='0';

	}
	return(dv);

}

function validarDigitoVerificador2 (conta, modulo) {
	var contaPura = conta.substr(0,conta.length-1);
	var digitoVerificador = conta.substr(conta.length-1, 1);
	var digitoCalculado = calcularDigitoVerificador2 (contaPura, modulo);
	return (digitoVerificador==digitoCalculado);
}

function validarDigitoVerificador2Novo (conta, modulo) {
	var contaPura = conta.substr(0,conta.length-1);
	var digitoVerificador = conta.substr(conta.length-1, 1);
	var digitoCalculado = calcularDigitoVerificador2 (contaPura, modulo);
	return (digitoVerificador==digitoCalculado);
}

function funcaoRetorno(funcaoRetorno) {
	document.location.replace(funcaoRetorno);
}

/*
 * Retorna um objeto de uma p�gina
 * Marcus Lacerda
 */
function returnObjById( id ) 
{ 
	if (document.getElementById) 
		var returnVar = document.getElementById(id); 
	else if (document.all) 
		var returnVar = document.all[id]; 
	else if (document.layers) 
		var returnVar = document.layers[id]; 
	return returnVar; 
}

/*
 * Felipe Regalgo
 * 
 * Metodo utilitario para auxiliar no uso da classe ActionGenerica
 */
function chamarMetodoNoServidor(metodoParaChamar, nomeParametro) {

	with (document.forms[0]) {
		if (nomeParametro != undefined) {
			eval(nomeParametro+'.value = "'+metodoParaChamar+'"');
		} else {
			metodoParaChamarNoServidor.value = metodoParaChamar;
		}
		
		habilitaCamposForm(document.forms[0]);
		submit(); 
	}

	lockButtons(document.forms[0]);
}

function parseVal(val)
{
	while (val.charAt(0) == '0')
		val = val.substring(1, val.length);

	return val;
}

/**
 * Frederico Oliveira
 * Fun��o que limita o tamanho de um textarea.
 * Esta fun��o � equivalente a propriedade Maxlength da tag Input.
 *
 *
 */
function textCounter(field, countfield, maxlimit) {
	//alert('ops: '+field.value.length);
	//alert('ops1: '+maxlimit);
	if (field.value.length > maxlimit)
		field.value = field.value.substring(0, maxlimit);
	else 
		countfield.value = maxlimit - field.value.length;
}

//Fonte: http://blog.lppjunior.com/javascript-ultimo-dia-do-mes/
//Frederico Oliveira - Data: 19/02/2010
//Retorna a quantidade de dias no m�s.
function diasNoMes(mes,ano) {
	var dd = new Date(ano, mes, 0);
	return dd.getDate();
}

function validaPIS2(campo)
{
	txtPis = campo.value;
	txtPis = retiraTracoPontoBarra(txtPis);

	if (txtPis == "")
	{
		return false;
	}

	/*
	// valida se campo � 00000000000
	if (parseInt(txtPis) == 0)
	{
		erros = erros + '- O campo '+campo.title+ ' � inv�lido.\n';
		return true;	
	}*/

	if (txtPis.length != 11)
	{
		erros = erros + '- O campo '+campo.title+ ' deve conter 11 d�gitos.\n';
		return true;	
	}

	if(retiraTracoPontoBarra(txtPis) != retirarLetras(txtPis))
	{
		erros = erros + '- O campo '+campo.title+ ' deve conter apenas n�meros.\n';
		return true;
	}

	//verifica se � valido o numero do pis
	sString = retirarLetras(txtPis);
	sAux = sString.substring(0,sString.length-1);
	sDigito = sString.substring(sString.length-1,sString.length);

	if(calculaDigitoMod11(sAux,1,2) != sDigito)
	{
		erros = erros + '- O campo '+campo.title+ ' � inv�lido.\n';
		return true;
	}	

	return false;
}

function calculaDigitoMod11(sValor,iDigSaida,sTipoValidacao)
{
	if (sTipoValidacao == 1) iCod = 12  
	if (sTipoValidacao == 2) iCod = 9   
	if (sTipoValidacao == 3) iCod = 10   

	for (t=1;t<=iDigSaida;t++)
	{
		soma = 0
		mult = 2
		for (j=sValor.length;j>0;j--)
		{
			soma = soma + (mult * parseInt(sValor.substring(j,j-1),10))
			mult++
			if (mult > iCod) mult = 2
		}
		soma = (soma * 10) % 11
		if (soma == 10) sValor = sValor + "0"
		else sValor = sValor + soma
	}
	return sValor.substring(sValor.length-iDigSaida,sValor.length)
}

function retirarLetras(textoParaRetirar)
{
	var sAux = '';
	for(i=0;i<textoParaRetirar.length;i++)
	{
		if(textoParaRetirar.charAt(i)>='0' && textoParaRetirar.charAt(i)<='9')
		{
			sAux = sAux + textoParaRetirar.charAt(i);
		}
	}
	return sAux;
}

function retiraTracoPontoBarra(textoParaRetirar)
{
	sAux = "";
	for(i=0;i<textoParaRetirar.length;i++)
	{
		if(textoParaRetirar.charAt(i)!='.' && textoParaRetirar.charAt(i)!='-' && textoParaRetirar.charAt(i) != '/')
		{
			sAux = sAux + textoParaRetirar.charAt(i);
		}
	}
	return sAux;
}

/* 
 * Se a URL come�ar com '?' entao ser� executado o url do form. 
 * Ex: url = document.forms[0].action + url;
 * 
 * O parametro metodoCallback_opc deve receber um metodo com apenas um parametro  
 * que ir� tratar o retorno do servidor em caso de sucesso.   
 * Esse metodo dever� receber como parametro ser uma string ou um objeto json conforme determinado no parametro retorno   
 * Caso n�o seja preenchido o valor recebido do servidor ir� retornar no metodo e consequentemente a requisicao ajax ser� sincrona e nao assincrona
 *   
 * tipoRetorno_opc(opcional): 'json', 'text' <<--  caso n�o seja especificado o retorno ser� deduzido automaticamente   
 *   
 * tipoRequisicao_opc(opcional) = 'POST', 'GET' <<-- (default = POST)
 */
function ajax(url, metodoCallback_opc, tipoRetorno_opc, tipoRequisicao_opc, erro_opc) {

	var primeiraLetraURL = url.substr(0, 1);
	if (primeiraLetraURL == '?') {
		url = document.forms[0].action + url;
	}

	var retorno; 

	$.ajax({
		type: tipoRequisicao_opc == null ? 'POST' : tipoRequisicao_opc,
				url: url,
				dataType: 'text',
				async: metodoCallback_opc != null,
				cache: false,
				error: function(xhr){
					if (erro_opc != null) {
						erro_opc(xhr);
					} else {
						//alert("Erro! " + xhr.status + ": " + xhr.statusText);
						console.warn("Erro ao tentar realizar chamada Ajax :  " + xhr.status + " :  " + xhr.statusText);
					}
				},
				success: function(data) {

					if (tipoRetorno_opc == null) {

						//if (data == null || data == '' || data.length < 10) {
						if (data == null || data == '' || data.length <= 1) {
							tipoRetorno_opc = 'text';
						} else {
							
							data = $.trim(data);
							/*
							 * var primeiraLetraEhJson = data.substr(0, 1) ==
							 * '{'; var ultimaLetraEhJson =
							 * data.substr(data.length - 1, data.length) == '}';
							 * var duasPrimeirasLetrasSaoJson = data.substr(0,
							 * 2) == '[{'; var duasUltimasLetrasSaoJson =
							 * data.substr(data.length - 2, data.length) ==
							 * '}]';
							 * 
							 * if ((primeiraLetraEhJson && ultimaLetraEhJson) ||
							 * (duasPrimeirasLetrasSaoJson &&
							 * duasUltimasLetrasSaoJson)) { tipoRetorno_opc =
							 * 'json'; } else { tipoRetorno_opc = 'text'; }
							 */
							var primeiraLetra = data.substr(0, 1);
							var ultimaLetra = data.substr(data.length - 1, data.length);
							
							if ((primeiraLetra == '{' && ultimaLetra == '}') || (primeiraLetra == '[' && ultimaLetra == ']')) {
								tipoRetorno_opc = 'json';
							} else {
								tipoRetorno_opc = 'text';
							}
						}
					} 

					if (tipoRetorno_opc == 'json') {
						var jsonObject = eval("(" + data + ")");
						retorno = jsonObject;
						if (metodoCallback_opc != null) {
							metodoCallback_opc(jsonObject);
						}
					} else {
						retorno = data;
						if (metodoCallback_opc != null) {
							metodoCallback_opc(data);
						}
					}
				}
	});

	return retorno;
}

function isRadioChecked(radioObj) {
	if(!radioObj) {
		return false;
	}

	var radioLength = radioObj.length;
	if(radioLength == undefined) {
		return radioObj.checked;
	}

	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			return true;
		}
	}
	return false;
}


function limitarTamanhoTextArea(elementoTextArea, limit, mensagem){
	var i = 0;
	var charsLeft = "charsLeft";
	while(true) {
		if($(charsLeft + i).length == 0){
			charsLeft += i;
			break;
		}
		i++;
	}

	// Adicionar a mensagem
	if(mensagem == undefined || mensagem){
		var span = '<br />Voc� tem <span id="'+charsLeft+'"></span>&nbspcaracteres para digitar.';
		$(elementoTextArea).after(span);
	}
	// Adiciona a a��o de limite no TextArea
	$(elementoTextArea).limit(limit, '#'+charsLeft);
}

function limitarTamanhoTextArea2(elementoTextArea, limit, mensagem){
	var i = 0;
	var charsLeft = elementoTextArea.name + "_charsLeft";

	// Adicionar a mensagem
	if(mensagem == undefined || mensagem){
		var span = '<br />Voc� tem <span id="'+charsLeft+'"></span>&nbspcaracteres para digitar.';
		$(elementoTextArea).after(span);
	}
	
	// Adiciona a a��o de limite no TextArea
	$(elementoTextArea).limit(limit, '#'+charsLeft);
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
*	Fun��o que abre uma nova janela e realiza o submit do form Passado dentro desta nova janela.
*	Obs: Configurar os campos do Form antes de passa-lo a fun��o.  
*
*	@param1(referenciaForm) - Passar o form que ser� realizado o submit na nova Janela.
*			Ex1: openWindowUtilizandoForm(document.forms[0]);
*			Ex2: openWindowUtilizandoForm(document.getElementById('meuForm'));
*	@param2(parametrosWindow) - Passar as informa��es para abrir o window.
*			Ex1: top=10,height=600,width=700,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes
*			Ex2: openWindowUtilizandoForm(form, 'top=10,height=600,width=700,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes');
*	@param3(parametrosAdicionaisNaURL) - Passar alguns parametros que n�o est�o no Form. 
*			Ex1: acao=teste&codidecliespecial=1654897
*			Ex2: openWindowUtilizandoForm(form, 'top=10,height=600,width=700,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes', 'acao=teste&codidecliespecial=1654897');
*
*	@author Rafael Zampieri
*	@since 25/07/2012
*/
function openWindowUtilizandoForm(referenciaForm, parametrosWindow, parametrosAdicionaisNaURL, formAction){

	// ------------------------------------
	// ------------ Prepara��o do Form
	// O form passado � "clonado" para que qualquer altera��o que seja feita abaixo 
	// n�o afete o form original da p�gina.
	var form = referenciaForm.cloneNode(true);
	// location.href = capturar url da p�gina atual em que o JS est� sendo executado.
	// location = http://www.w3schools.com/jsref/obj_location.asp
	// split = http://www.w3schools.com/jsref/jsref_split.asp
	// Ex: 	Estamos no site http://www.spprev.com.br/paginaInicial.do?acao=teste&codidecliespecial=1654897
	//		location.href.split("?", 1); o resultado ser� "http://www.spprev.com.br/paginaInicial.do" 
	if(formAction == undefined){
		var url = location.href.split("?", 1);
		if(parametrosAdicionaisNaURL != undefined){
			url += '?' + parametrosAdicionaisNaURL;	
		}
		form.action = url;
	} else {
		form.action = formAction;
	}
	form.method = "POST";
	// O form n�o ser� exibido par ao usu�rio para n�o confundi-lo enquanto o servidor 
	// est� realizando o processamento das informa��es.
	form.style.display = 'none';


	// ------------------------------------
	// ------------ Prepara��o da Nova Janela
	// Caso o "parametrosWindow" n�o seja passado no parametro, � inserido alguns parametros
	// padr�o para a abertura da janela 
	// property "undefined" = http://www.w3schools.com/jsref/jsref_undefined.asp
	if(parametrosWindow == undefined){
		var altura = 700;
		var largura = 800;
		// verifique os parametros existentes = http://www.w3schools.com/jsref/met_win_open.asp
		parametrosWindow = 'top=50,height='+altura+',left=50,width='+largura+',status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes'
	}
	// window.open = http://www.w3schools.com/jsref/met_win_open.asp
	var newWindow = window.open('',	'',	parametrosWindow);
	
	// Escrevendo dentro do "head" da janela os seguintes textos.
	var newWindowHead = newWindow.document.getElementsByTagName('head')[0];
	// http://api.jquery.com/append/
	$(newWindowHead).append('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />');

	// Escrevendo dentro do "body" da janela os seguintes textos.
	var newWindowBody = newWindow.document.getElementsByTagName('body')[0];
	$(newWindowBody).append('<h1 style="display: inline;">Carregando...</h1>');
	// Texto "HTML" completo do form.
	$(newWindowBody).append(form.outerHTML);

	
	// ------------------------------------
	// ------------ Submit do Form
	var newWindowForm = newWindow.document.forms[0];
	// Remover a a��o de onSubmit para que n�o chame nenhum c�digo javascript
	newWindow.document.forms[0].onsubmit = null;
	// Submit no form que est� dentro da janela, essa a��o n�o ir� afetar o form original.
	newWindowForm.submit();
}

/**
 * @author Adriano Silva
 * @since 27/09/2012
 */
function validaPeriodoDia(campo){
	with (document.forms[0]) {
		
		if (campo.value != "") {
			if(validaCampoData2(campo) == false){
				var dia = campo.value.substring(0, 2);

				if(dia >= 1 && dia <=15){
					//return false;
				}else{
					campo.focus();
					erros = erros + '- O Dia do campo '+campo.title+ ' deve estar entre 1 e 15.\n';
					//return true;
				}
			}/*else{
				campo.focus();
				erros = erros + '- O campo '+campo.title+ ' n�o foi preenchido corretamente.\n';
				//return true;
			}*/
		}
		return false;
	}
}

function validaPeriodoDia2Novo(campo){
	with (document.forms[0]) {
		
		if (campo.value != "") {
			if(validaCampoData2(campo) == false){
				var dia = campo.value.substring(0, 2);

				if(dia >= 1 && dia <=15){
					//return false;
				}else{
					campo.focus();
					erros = erros + '- O Dia do campo '+campo.title+ ' deve estar entre 1 e 15.<br>';
					//return true;
				}
			}/*else{
				campo.focus();
				erros = erros + '- O campo '+campo.title+ ' n�o foi preenchido corretamente.\n';
				//return true;
			}*/
		}
		return false;
	}
}

/**
 * @since 19/12/2012
 * @author Rafael Zampieri
 * @param campoDataInicio
 * @param campoDataFim
 * @return
 */

function validarPeriodoEntreDatasSomenteSeAsDuasDatasEstiveremPreenchidos(campoDataInicio, campoDataFim){
	if((campoDataInicio.value != "" && campoDataFim.value != "")){
		var dataInicioMenorQueDataFim = comparaDatas(campoDataInicio.value, campoDataFim.value) == 2;
		if(dataInicioMenorQueDataFim){
			erros += '- A ' + campoDataFim.title + ' n�o deve ser menor que a '+ campoDataInicio.title+ '.';
			return false;
		}
	}
	return true;
}

/**
 * @since 19/12/2012
 * @author Rafael Zampieri
 * @param campoDataInicio
 * @param campoDataFim
 * @return
 */
function validarObrigatoriedadeCasoUmasDasDatasSelecionadasEstejaPreenchida(campoDataInicio, campoDataFim){
	if((campoDataInicio.value == "" && campoDataFim.value != "") 
			|| (campoDataInicio.value != "" && campoDataFim.value == "")){
		erros += "Os campos " + campoDataInicio.title + " e " + campoDataFim.title +
					" devem ser preenchidos ou deixados em branco.\n";
		return false;
	}
	return true;
}

/**
 * @since 19/12/2012
 * @author Rafael Zampieri
 * @param campoDataInicio
 * @param campoDataFim
 * @return
 */
function validarCampoSelect(campo){
	if(campo.options.length == 1 || $(campo).val() == 'Selecione'){	
		erros += '- O campo ' + campo.title + ' deve ser selecionado.\n';
	} else {		
		validaCampo2(campo);
	}
}

/**
 * @since 26/06/2013
 * @author Niedson Araujo 
 */
function validarCampoSelectIndex(campo){
	if($(campo).val() == '0'){	
		erros += '- O campo ' + campo.title + ' deve ser selecionado.\n';
	} else {		
		validaCampo2(campo);
	}
}

function inserirOpcoesNaTagSelect(listaObject, nameTagSelect, nomeObjectContendoValor, nomeObjectContendoTexto, exibirOpcaoSelecione){
	$select = $('select[name="'+nameTagSelect+'"]');
	$select.find('option').remove();
	
	if(exibirOpcaoSelecione == undefined || exibirOpcaoSelecione){
		$select.append('<option value="">Selecione</option>');
	}
	
	$.each(listaObject, function(index, object){
		var valorLabel = eval('object.'+nomeObjectContendoTexto)
		
		var $tagOption = $('<option>'); //Equivalent: $(document.createElement('img'))
		$tagOption.attr('value', eval('object.'+nomeObjectContendoValor) ).html( valorLabel );
		
		$select.append($tagOption);
	});
}

function enviarConsultaGenerico(retornoConsulta){
	 var parametros = $("input[name='parametrosDaTela']").val();
	 if(parametros != undefined && parametros !=""){
		parametros =  JSON.parse(parametros);
	 }
	 var form = parametros.form;
	if( parametros != undefined && parametros.campos != undefined && parametros.campos.length > 0){
		$.each(parametros.campos,function(idx,val){
			if(val != ""){
				if(form == undefined || form.value == ""){
					var campo = eval("window.opener.document.forms[0]."+val);
				}else{
					var campo = eval("window.opener.document.forms["+form+"]."+val);
				}
				campo.value = retornoConsulta[idx];
			}
		
		
		
		});
		
	}else{
		
		console.warn("Aten��o! O atributo 'parametrosDaTela' n�o foi configurado, n�o ser�o retornados valores ");

	}
	
	if(parametros != undefined && parametros.callback != undefined){
	
		eval("window.opener."+parametros.callback);
		
	}
	
	

}
/*
 * [ TASK3179 ] Melhorias fluxo Comprev
 * Modifica��o:Lucas Prestes,Data:19/02/2015
 */
function comparaCampoDataMenorDataFixaSemMensagem(data1, dataFixa) {

	if (data1.value != '' && dataFixa != ''){
		var resultado = comparaDatas(data1.value, dataFixa);
		var ano = data1.value.substring(6);
		if (resultado == 0 || ano <= 1800) {// metodo comparaDatas retorna -1 para anos abaixo de 1800
			if (erros == '') {
				data1.focus();
			}
			erros = erros + "- O campo " + data1.title + " n�o pode ser anterior a "+dataFixa+".\n";
			return true;
		}
	}

	return false;
}
function comparaCampoPeriodoMenorDataFixa(campo1, dataFixa) {


	if (campo1.value != '' && dataFixa != ''){
		var resultado = comparaDatas("01/"+campo1.value, "01/"+dataFixa);
		 var ano = campo1.value.substring(3);
		if ( resultado == 0 || ano <= 1800 ){// metodo comparaDatas retorna -1 para anos abaixo de 1800
			
			erros = erros +'- O campo '+campo1.title+ ' n�o pode ser anterior a '+dataFixa+'.\n';
			campo1.focus();
			return true;
		}
	}

	return false;
}

//FIM TASK3179
/*
 * [ TASK2484 ] [Task Folha] Fluxo de isen��o de IR/CP
 * Modifica��o:Lucas Prestes
 * Data:13/01/2015
 */
var listaErros = "";
function validaCampoMontandoLista(campo){
	if(campo.value == ""){
			if(listaErros == ""){
				listaErros = campo.title;
			}else{
				listaErros = listaErros +", "+campo.title;
			}
	}
	
}

/*
 *[ TASK2218 ] cria��o de campos no fluxo de concess�o de aposentadoria judicial - exig�ncias - TRIBUNAL DE CONTAS DO ESTADO - TCE.
 *Modifica��o:Lucas Prestes
 *Data:07/02/2016
 */

function comparaCampoDataMenorDataFixa(campo1, dataFixa,msg) {

	if(typeof msg == 'undefined'){
		return comparaCampoDataMenorDataFixaSemMensagem(campo1,dataFixa);
	}
	else{

		if (campo1.value != '' && dataFixa != ''){
			var resultado = comparaDatas(dataFixa,campo1.value);
			 var ano = campo1.value.substring(3);
			if ( resultado == 0 || ano <= 1800 ){// metodo comparaDatas retorna -1 para anos abaixo de 1800
				
				erros = erros +msg;
				campo1.focus();
				return true;
			}
		}
	
		return false;
	}
}

function validarPeriodoEntreDatasDesconsiderandoDatasIguais(campo1,campo2){
	
	if (campo1.value != '' && campo2.value != ''){
		var resultado = comparaDatas(campo1.value,campo2.value);
		 var ano = campo1.value.substring(6);
		if ( resultado  <=1 || ano <= 1800 ){// metodo comparaDatas retorna -1 para anos abaixo de 1800
			
			erros = erros +'- A '+campo2.title+' deve ser  menor que a '+campo1.title+'.\n';
			campo2.focus();
			return true;
		}
	}

	return false;
}

//modo de usar: alertSigePrevComCallBackComParametros(msg,'funcaoCallback(param1,param2)')
function alertSigePrevComCallBackComParametros(msgEmHtml,metodoCallback){  	
	$(function() {
		$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
		$("#dialog-confirm").html(msgEmHtml);
		$("#dialog-confirm").dialog({
			resizable : false,
			modal : true,
			width: 380,
			height: 280,
			position: { my: "center bottom", at: "center center", of: window,within: $(".composicaoConsigTitulo")},
			buttons : 
			{
				"OK" : function() { 
				$("#dialog-confirm").dialog().dialog("close");
				eval(metodoCallback);
			}
		}
		});
		});
		ajustaDialogCentro();
	}




function alertSigePrevComCallBack(msgEmHtml,metodoCallback){  	
$(function() {
	$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
	$("#dialog-confirm").html(msgEmHtml);
	$("#dialog-confirm").dialog({
		resizable : false,
		modal : true,
		width: 380,
		height: 280,
		position: { my: "center bottom", at: "center center", of: window,within: $(".composicaoConsigTitulo")},
		buttons : 
		{
			"OK" : function() { 
			$("#dialog-confirm").dialog().dialog("close");
			eval(metodoCallback+"()");
		}
	}
	});
	});
	ajustaDialogCentro();
}


/**Gabriel Felix LAYOUT NOVO*/
function alertSigePrev1(msgEmHtml){  	
    	$(parent.document).scrollTop(0);
	$(function() {
		$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
		$("#dialog-confirm").html(msgEmHtml);
		$("#dialog-confirm").dialog({
			resizable : false,
			modal : true,
			width: 380,
			height: 280,
			position: { my: "center center", at: "top top", of: window,within: $("#ancoraMP")},
			buttons : 
				{
				"OK" : function() { 
					$("#dialog-confirm").dialog().dialog("close");
				}
			}
		});
	});
	 ajustaDialogCentro();
}

/**Gabriel Felix LAYOUT NOVO*/
function confirmSigeprev1(msgEmHtml, metodoCallback){
    $(parent.document).scrollTop(0);
    $(function() {
	$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
	$("#dialog-confirm").html(msgEmHtml);
	$("#dialog-confirm").dialog({
		resizable : false,
		modal : true,
		width: 380,
		height: 280,	
		position: { my: "center center", at: "center center", of: window,within: $(".composicaoConsigTitulo")},
		buttons : 
			{
			"Sim" : function() { 
	    			$("#dialog-confirm").dialog().dialog("close");
	    			eval(metodoCallback+"("+true+")");
			},
			"N�o" : function() {
				$("#dialog-confirm").dialog().dialog("close");
				eval(metodoCallback+"("+false+")");
			}
		}
	});
});
    ajustaDialogCentro();
}

function confirmSigeprev(msgEmHtml, metodoCallback){
	/**
	 * [ Ticket 31566 ] REDESENHO SIGEPREV - Telas de Folha de Pagamento e Atendimento
	 * 
	 * @Autor: Ederson da Silva, Data: 05/07/2016 - Foi ajustado pois o popup estava quebrando 
	 * pois de acordo com um range de linhas de 5 a 9 estava colocando o scroll no IE e quebrando o layout
	 * Foi ajustado para quando estiver neste range acrescentar linhas "<br/>" para n�o quebrar o layout*/
	
	msgEmHtml = msgEmHtml.replace('<br>' , '<br/>');
	var lines = msgEmHtml.split('<br/>').length;
	if(lines >4 && lines <= 10){
		msgEmHtml = msgEmHtml + "<br/><br/><br/><br/><br/><br/>";
	}
	/** Fim Ticket 31566 05/07/2016 - Ederson */
    $(function() {
	$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
	$("#dialog-confirm").html(msgEmHtml);
	$("#dialog-confirm").dialog({
		resizable : false,
		modal : true,
		width: 380,
		height: 280,	
		position: {  my: "center", at: "center", of: window},
		buttons : 
			{
			"Sim" : function() { 
	    			$("#dialog-confirm").dialog().dialog("close");
	    			eval(metodoCallback+"("+true+")");
			},
			"N�o" : function() {
				$("#dialog-confirm").dialog().dialog("close");
				eval(metodoCallback+"("+false+")");
			}
		}		 
	});	
});
 ajustaDialogCentro();
}

function ajustaDialogCentro(){
	$('html, body', window.parent.document).animate({scrollTop:$('#dialog-confirm').offset().top}, 800);
}


function alertSigePrev(msgEmHtml){
	/**
	 * [ Ticket 31566 ] REDESENHO SIGEPREV - Telas de Folha de Pagamento e Atendimento
	 * 
	 * @Autor: Ederson da Silva, Data: 05/07/2016 - Foi ajustado pois o popup estava quebrando 
	 * pois de acordo com um range de linhas de 5 a 9 estava colocando o scroll no IE e quebrando o layout
	 * Foi ajustado para quando estiver neste range acrescentar linhas "<br/>" para n�o quebrar o layout
	 */
	msgEmHtml = msgEmHtml.replace('<br>' , '<br/>');
	var lines = msgEmHtml.split('<br/>').length;
	if(lines >4 && lines <= 10){
		msgEmHtml = msgEmHtml + "<br/><br/><br/><br/><br/><br/>";
	}
	/** Fim Ticket 31566 05/07/2016 - Ederson */

	$(function() {
		$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA');
		$("#dialog-confirm").html(msgEmHtml);
		$("#dialog-confirm").dialog({
			resizable : false,
			modal : true,
			width: 380,
			height: 280,
			position: { my: "top", at: "center", of: window },
			buttons : 
				{
				"OK" : function() { 
					$("#dialog-confirm").dialog().dialog("close");
				}
			}
		});
	});
	ajustaDialogCentro();
}

function alertGenerico(msgEmHtml, posicao){ 

	$(function() { 
		$("#dialog-confirm").attr("title", 'MENSAGEM S&Atilde.;O PAULO PREVID&Ecirc;NCIA'); 
		$("#dialog-confirm").html(msgEmHtml); 
		$("#dialog-confirm").dialog({ 
			resizable : false, 
			modal : true, 
			width: 380, 
			height: 280, 
			position: { my: "center", at: posicao, of: window }, 
			buttons :  
				{ 
				"OK" : function() {  
					$("#dialog-confirm").dialog().dialog("close"); 
				} 
			} 
		}); 
	}); 

}

function validaCampoNovo(campo, valida) {

	if (campo.type == 'text'){
		if (campo.value == ''){
		    	alertSigePrev('O campo '+campo.title+ ' deve ser preenchido.');
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.<br/>';
			campo.focus();
			campo.select();
			return true;
		}
	}
	else if (campo.type == 'textarea'){
		if (campo.value == ''){
		    	alertSigePrev('O campo '+campo.title+ ' deve ser preenchido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	else if (campo.type == 'select-one'){
		if (campo.options.length > 1) {
			if (campo.value == '' || campo.value == '-1'){
	    	alertSigePrev('O campo '+campo.title+ ' deve ser selecionado.');
				campo.focus();
				return true;
			}
		}
		else{
			if (valida == 'S'){
				if (campo.value == '' || campo.value == '-1'){
				    	alertSigePrev('O campo '+campo.title+ ' deve ser selecionado.');
					campo.focus();
					return true;
				}
			}
		}
	}

	return false;
}
function validaCampoChaveNovo(campo) {
	if (campo.type != 'select-one'){
		if (campo.defaultValue == '') {
		    	alertSigePrev("O campo " + campo.title + " precisa ser consultado.");
			campo.focus();
			return true;
		}
		else {
			if (campo.value != campo.defaultValue) {
			    	alertSigePrev("O campo " + campo.title + " pesquisado '" + campo.defaultValue + "' n�o pode ser diferente do campo " + campo.title + " digitado '" + campo.value + "'.");
				campo.focus();
				return true;
			}
		}
	}
	else {
		if (campo[0].defaultSelected == true) {
		    	alertSigePrev("O campo " + campo.title + " precisa ser selecionado e consultado.");
			campo.focus();
			return true;
		}
		else {
			if (campo[campo.selectedIndex].defaultSelected != true) {
				for (i=0; i<campo.length; i++) {
					if (campo[i].defaultSelected == true) {
					    	alertSigePrev("O campo " + campo.title + " pesquisado '" + campo[i].text + "' n�o pode ser diferente do campo " + campo.title + " selecionado '" + campo[campo.selectedIndex].text + "'.");
						campo.selectedIndex = i;
						campo.focus();
						return true;
					}
				}
			}
		}
	}
	return false;
}

function validaCampoChave2Novo(campo1, campo2) {
	if (campo1.value != campo2.value) {
	    	alertSigePrev("O " + campo1.title + " pesquisado '" + campo2.value + "' n�o pode ser diferente do " + campo1.title + " digitado '" + campo1.value + "'.");
		campo1.focus();
		return true;
	}
	return false;
}

function validaMinimoCaracteresNovo(campo, tamMin) {
	if (campo.value.length < tamMin) {
	    	alertSigePrev("O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.");
		campo.focus();
		return true;
	}
	return false;
}
function validaMinimoCaracteresSemContarEspacos(campo, tamMin) {
	var valorSemEspacos = campo.value.replaceAll(" ","");
	if (valorSemEspacos.length < tamMin) {
	    	alertSigePrev("O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.");
		campo.focus();
		return true;
	}
	return false;
}
function validaCampoCompletoNovo(campo) {
	if (campo.value.length != campo.maxLength) {
	    	alertSigePrev("O campo " + campo.title + " deve ser completamente preenchido.");
		campo.focus();
		return true;
	}
	return false;
}
//verifica o preenchimento do campo tipo checkbox
function validaCampoCheckboxNovo(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			marcou = true;
		}
	}

	if (!marcou){
		if (campo.length>0){
		    	alertSigePrev('O campo '+campo[0].title+ ' deve ser escolhido.');
			return true;
		}
		else{
			if (!campo.checked){
			    	alertSigePrev('O campo '+campo.title+ ' deve ser escolhido.');
				return true;
			}
		}
	}

	return false;
}

//verifica se todos  os checkbox foram preenchidos
function validaTodosCamposCheckboxNovo(campo) {

	marcados = 0;
	entrou = false;

	for (i=0; i<campo.length; i++){
		entrou = true;
		if (campo[i].checked){
			marcados++;
		}
	}

	if (!entrou){
		if (!campo.checked){
		    	alertSigePrev('Todas as op��es do campo '+campo.title+ ' devem ser selecionadas.');
			return true;
		}
	}

	if (campo.length > marcados){
	    	alertSigePrev('Todas as op��es do campo '+campo[0].title+ ' devem ser selecionadas.');
		return true;
	}

	return false;
}

//verifica se todos  os checkbox foram preenchidos
function validaTodosCamposCheckboxObrigatoriosNovo(campo) {

	for (i=0; i<campo.length; i++){
		if (campo[i].value.split('#')[1] == 'S') {
			if (campo[i].checked) {
			} else {
				alertSigePrev('Todas as op��es do campo '+campo[i].title+ ' que s�o obrigat�rias devem ser selecionadas.');
				return true;    		
			}
		}
	}
	return false;
}
//verifica o CPF caso o campo tenha sido preenchido
function validaCampoCpfNovo(campo) {
	if (campo.value != ''){
		if (!ValidaCPF(campo.value)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alertSigePrev(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	return false;
}

//Verifica o CPF com Mascara caso o campo tenha sido preenchido.
function validaCampoCpfComMascaraNovo(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPF(cpf)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alertSigePrev(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}
	return false;
}

//verifica o CNPJ caso o campo tenha sido preenchido
function validaCampoCnpjNovo(campo) {

	if (campo.value != ''){
		if (!ValidaCGC(campo.value)){
			var msg = campo.title == '' ? 'Campo' : campo.title;
			alertSigePrev(msg + ' inv�lido.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o Per�odo(mm/aaaa) caso o campo tenha sido preenchido
function validaCampoPeriodoNovo(campo) {

	if (campo.value != ''){
		if (!ValidaData("01/" + campo.value)){
			alertSigePrev('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o Per�odo(mm/aaaa) caso o campo tenha sido preenchido
function validaCampoPeriodo2Novo(campo) {

	if (campo.value != ''){
		if (!ValidaData("01/" + campo.value)){
			if (erros=='') {
				campo.focus();
				campo.select();
			}
			erros += '- O campo '+campo.title+ ' n�o foi preenchido corretamente.<br/>';
			return true;
		}
	}
	return false;
}



//verifica os campos Periodo caso tenham sido preenchidos
function comparaCampoPeriodoMenorNovo(campo1, campo2) {

	if (campo1.value != '' && campo2.value != ''){
		if (comparaDatas("01/"+campo1.value, "01/"+campo2.value) == 2){
			alertSigePrev('O campo '+campo2.title+ ' n�o pode ser anterior a '+campo1.title+'.');
			campo2.focus();
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function validaCampoDataNovo(campo) {

	if (campo.value != ''){
		if (!ValidaData(campo.value)){
			alertSigePrev('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoDataNovo(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2){
			alertSigePrev('O campo '+data1.title+ ' n�o pode ser posterior a '+data2.title+'.');
			data1.focus();
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoData2Novo(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2){
			if (erros == '') {
				data1.focus();
			}
			erros = erros + '- O campo '+data1.title+ ' n�o pode ser posterior a '+data2.title+'.<br>';
			return true;
		}
	}

	return false;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoDataMenorNovo(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2){
			alertSigePrev('O campo '+data2.title+ ' n�o pode ser anterior a '+data1.title+'.');
			data2.focus();
			return true;
		}
	}

	return false;
}


//verifica se � N�mero o campo preenchido
function validaCampoNumeroNovo(campo) {

	if (campo.value != ''){
		if (!SoNumeros(campo.value)){
			alertSigePrev('O campo '+campo.title+ ' deve ser preenchido apenas com n�meros.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

function validaCampoNumero2Novo(campo) {

	if (campo.value != ''){
		if (!SoNumeros(campo.value)){
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido apenas com n�meros.\n';
			campo.focus();
			return true;
		}
	}

	return false;
}

function comparaCampoValorMenorNovo(valor1, valor2) {

	if (valor1.value != '' && valor2.value != ''){

		if (parseFloat(formataNumero(vazio(valor1.value), "2", false, ".")) > parseFloat(formataNumero(vazio(valor2.value), "2", false, "."))){
			alertSigePrev('O campo '+valor2.title+ ' n�o pode ser menor que o campo '+ valor1.title +'.');
			valor2.focus();
			return true;
		}
	}

	return false;
}

function comparaCampoValorMenor2Novo(valor1, valor2) {

	if (valor1.value != '' && valor2.value != ''){

		if (parseFloat(formataNumero(vazio(valor1.value), "2", false, ".")) > parseFloat(formataNumero(vazio(valor2.value), "2", false, "."))){
			if (erros == '') {
				valor2.focus();
			}
			erros = erros + 'O campo '+valor2.title+ ' n�o pode ser menor que o campo '+ valor1.title +'. <br>';
			return true;
		}
	}

	return false;
}


//verifica se � um ANO v�lido
function validaCampoAnoNovo(campo) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(4)){
			alertSigePrev('O campo '+campo.title+ ' deve ser preenchido com no minimo 4 caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}

		if (campo.value < 1900 || campo.value > 2100){
			alertSigePrev('O campo '+campo.title+ ' deve ser um ano de 1900 a 2100.');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//verifica se � N�mero o campo preenchido
function validaTamanhoCampoNovo(campo, tam) {

	if (campo.value != ''){
		if (campo.value.length < parseInt(tam)){
			alertSigePrev('O campo '+campo.title+ ' deve ser preenchido com no minimo '+tam+' caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

//valida um tamanho m�ximo de um campo - muito usado no caso de um textarea, pois este n�o possui maxlength
function validaTamanhoMaxCampoNovo(campo, tam) {

	if (tam=='')
		tam = 255;

	if (campo.value != ''){
		if (campo.value.length > parseInt(tam)){
			alertSigePrev('O campo '+campo.title+ ' deve ser preenchido com no m�ximo '+tam+' caracter(es).');
			campo.focus();
			campo.select();
			return true;
		}
	}

	return false;
}

function validaCampo2Novo(campo, valida) {

	if (campo.type == 'text' || campo.type == 'file'){
		if (campo.value == ''){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.<br/>';
			return true;
		}
	}
	else if (campo.type == 'textarea'){
		if (campo.value == ''){
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' deve ser preenchido.<br/>';
			return true;
		}
	}
	else if (campo.type == 'select-one'){
		if (campo.options.length > 1) {
			if (campo.value == '' || campo.value == '-1'){
				if (erros == '') {
					campo.focus();
				}
				erros = erros + '- O campo '+campo.title+ ' deve ser selecionado.<br/>';
				return true;
			}
		}
		else{
			if (valida == 'S'){
				if (campo.value == '' || campo.value == '-1'){
					if (erros == '') {
						campo.focus();
					}
					erros = erros + '- O campo '+campo.title+ ' deve ser selecionado.<br/>';
					return true;
				}
			}
		}
	}

	return false;
}

function validaCampoCompleto2Novo(campo) {
	/*
	 * Autor: Adriano Silva
	 * Data: 13/11/2012
	 * TASK1529
	 * Deixa de validar no caso dos telefones devido a mudan�a na mascara para dar suporte ao 9� digito
	 * --------INICIO
	 */
	if (campo.value.length != campo.maxLength && campo.styleClass != "telefone") {
	//---------FIM
		if (erros == '') {
			campo.focus();
		}
		erros = erros + '- O campo ' + campo.title + ' deve ser completamente preenchido.<br/>';
		return true;
	}
	return false;
}

//Verifica o CPF com Mascara caso o campo tenha sido preenchido.
function validaCampoCpfComMascara2Novo(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPF(cpf)){
			var msg = "- " + (campo.title == '' ? 'Campo' : campo.title);
			//alert(msg + ' inv�lido.');
			if (erros == '') {
				if (!campo.disabled)
					campo.focus();
			}
			erros = erros + msg + ' inv�lido.<br/>';
			return true;
		}
	}
	return false;
}


function validaCampoCpfComMascara2SemDigitosIguaisNovo(campo) {
	if (campo.value != '') {
		var cpf = campo.value;
		cpf = cpf.replace(".", "");
		cpf = cpf.replace(".", "");
		cpf = cpf.replace("-", "");

		if (!ValidaCPFSemNumerosIguais(cpf)){
			var msg = "- " + (campo.title == '' ? 'Campo' : campo.title);
			//alert(msg + ' inv�lido.');
			if (erros == '') {
				if (!campo.disabled)
					campo.focus();
			}
			erros = erros + msg + ' DIGITADO N�O � VALIDO.<br/>';
			return true;
		}
	}
	return false;
}


//verifica o DATA caso o campo tenha sido preenchido
function validaCampoData2Novo(campo) {

	if (campo.value != ''){
		if (!ValidaData(campo.value)){
			//alert('O campo '+campo.title+ ' n�o foi preenchido corretamente.');
			if (erros == '') {
				campo.focus();
			}
			erros = erros + '- O campo '+campo.title+ ' n�o foi preenchido corretamente.<br/>';
			return true;
		}
	}

	return false;
}
function validaMinimoCaracteres2Novo(campo, tamMin) {
	if (campo.value.length < tamMin) {
		if (erros == '') {
			campo.focus();
		}
		erros = erros + "- O campo " + campo.title + " deve ser preenchido com no m�nimo " + tamMin + " caracteres.<br/>";
		return true;
	}
	return false;
}

function SoLetras2Novo(campo) {
	for (var i=0;i<campo.value.length;i++) {
		c = campo.value.substring(i,i+1);
		if (!isalpha(c) && c != ' ') {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "- O campo " + campo.title + " cont�m caracteres diferentes de letras <br/>";
			return false;
		}
	}
	return true;
}

function DoisEspacosEmBrancoNovo(campo) {
	var blnEspacoDetectado = false;

	for (var i=0;i<campo.value.length;i++) {
		if (campo.value.substring(i,i+1)==' ') {
			if (blnEspacoDetectado) {
				//dois em seguida
				if (erros=='') campo.focus();
				erros = erros + "- O campo " + campo.title + " cont�m dois espa�os em branco juntos <br/>";
				return false;
			}
			blnEspacoDetectado = true;
		} else {
			blnEspacoDetectado = false;
		}
	}
	return true;
}

//verifica o DATA caso o campo tenha sido preenchido
function comparaCampoDataMenor2Novo(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2) {
			if (erros == '') {
				data2.focus();
			}
			erros = erros + "- O campo " + data2.title + " n�o pode ser anterior a "+data1.title+".<br/>";
			return true;
		}
	}

	return false;
}

function comparaCampoDataMenor2NovoSemFocus(data1, data2) {

	if (data1.value != '' && data2.value != ''){
		if (comparaDatas(data1.value, data2.value) == 2) {
			erros = erros + "- O campo " + data2.title + " n�o pode ser anterior a "+data1.title+".<br/>";
			return true;
		}
	}

	return false;
}


function validaCampoChave3Novo(campo) {
	if (campo.type != 'select-one'){
		if (campo.defaultValue == '') {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "- O campo " + campo.title + " precisa ser consultado.<br/>";
			return true;
		}
		else {
			if (campo.value != campo.defaultValue) {
				if (erros == '') {
					campo.focus();
				}
				erros = erros + "- O campo " + campo.title + " pesquisado " + campo.defaultValue + " n�o pode ser diferente do campo " + campo.title + " digitado " + campo.value + ".<br/>";
				return true;
			}
		}
	}
	else {
		if (campo[0].defaultSelected == true) {
			if (erros == '') {
				campo.focus();
			}
			erros = erros + "O campo " + campo.title + " precisa ser selecionado e consultado.<br/>";
			return true;
		}
		else {
			if (campo[campo.selectedIndex].defaultSelected != true) {
				for (i=0; i<campo.length; i++) {
					if (campo[i].defaultSelected == true) {
						if (erros == '') {
							campo.focus();
						}
						erros = erros + "O campo " + campo.title + " pesquisado " + campo[i].text + " n�o pode ser diferente do campo " + campo.title + " selecionado " + campo[campo.selectedIndex].text + ".<br/>";
						campo.selectedIndex = i;
						return true;
					}
				}
			}
		}
	}
	return false;
}

function validarPeriodoEntreDatasSomenteSeAsDuasDatasEstiveremPreenchidosNovo(campoDataInicio, campoDataFim){
	if((campoDataInicio.value != "" && campoDataFim.value != "")){
		var dataInicioMenorQueDataFim = comparaDatas(campoDataInicio.value, campoDataFim.value) == 2;
		if(dataInicioMenorQueDataFim){
			erros += '- A ' + campoDataFim.title + ' n�o deve ser menor que a '+ campoDataInicio.title+ '.<br/>';
			return false;
		}
	}
	return true;
}

//verifica o preenchimento do campo tipo checkbox
function validaCampoCheckbox2Novo(campo) {

	marcou = false;
	for (i=0; i<campo.length; i++){
		if (campo[i].checked){
			marcou = true;
		}
	}

	if (!marcou){
		if (campo.length>0){
		    erros = erros + '- O campo ' + campo[0].title + ' deve ser escolhido.<br>';
			return true;
		}
		else{
			if (!campo.checked){
			    erros = erros + '- O campo ' + campo.title + ' deve ser escolhido.<br>';
				return true;
			}
		}
	}

	return false;
}

//verifica se todos  os checkbox foram preenchidos
function validaTodosCamposCheckbox2Novo(campo) {

	marcados = 0;
	entrou = false;

	for (i=0; i<campo.length; i++){
		entrou = true;
		if (campo[i].checked){
			marcados++;
		}
	}

	if (!entrou){
		if (!campo.checked){
		    erros = erros + 'Todas as op��es do campo '+campo.title+ ' devem ser selecionadas.<br>';
			return true;
		}
	}

	if (campo.length > marcados){
	    erros = erros + 'Todas as op��es do campo '+campo[0].title+ ' devem ser selecionadas.<br>';
		return true;
	}

	return false;
}
/**FIM LAYOUT NOVO*/

/**
 * Altera��o de alertSigePrev1
 * Lilian - 05/2018
 * Observa��es: Altera��o de c�digo para mostrar mensagem Sigeprev
 * com tela fixa posicionada no centro.
 * 
 * Utilizar somente para layout antigo (com tabelas).
 * 
 * Para telas com layout constru�do em Bootstrap, 
 * utilizar o componentes.min.js e fun��o alertNew().
 * 
*/
function alertSigePrev2(msgEmHtml){
	$(function() {
		$("#dialog-msg .ui-dialog-content",window.parent.document).html(msgEmHtml);
		$("#dialog-msg",window.parent.document).css({ "display":"block"});
		$(".ui-widget-overlay",window.parent.document).css({ "display":"block"});

		$("#dialog-msg .ui-dialog-buttonset button",window.parent.document).click(function(){ botaoDialog("#dialog-msg") });
		$("#dialog-msg .ui-dialog-titlebar .ui-dialog-titlebar-close",window.parent.document).click(function(){ botaoDialog("#dialog-msg") });
		
		altura = $("#dialog-msg",window.parent.document).height()/2;
		largura = $("#dialog-msg",window.parent.document).width()/2;

		$("#dialog-msg",window.parent.document).css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });

		checkPageOutput(); //fallback 
	});
}

function botaoDialog(tela) {
	$(tela,window.parent.document).css({ "display":"none" });
	$(".ui-widget-overlay",window.parent.document).remove();
	$("body",window.parent.document).append("<div class='ui-widget-overlay ui-front' style='z-index: 100; display: none;'></div>");
}

function confirmSigeprev2(msgEmHtml, metodoCallback){
    $(function() {
		// Abre popup para p�gina principal
		if ($("#confirm-msg",window.parent.document).length > 0) {
			$("#confirm-msg .ui-dialog-content",window.parent.document).html(msgEmHtml);
			$("#confirm-msg",window.parent.document).css({ "display":"block"});
			$(".ui-widget-overlay",window.parent.document).css({ "display":"block"});

			$("#confirm-msg .ui-dialog-buttonset button:first-child",window.parent.document).click(function(){
				botaoDialog("#confirm-msg");
				eval(metodoCallback+"("+true+")");
			})
			.next().click(function(){
				botaoDialog("#confirm-msg");
				eval(metodoCallback+"("+false+")");
			});
			$("#confirm-msg .ui-dialog-titlebar .ui-dialog-titlebar-close",window.parent.document).click(function(){ botaoDialog("#confirm-msg") });

			altura = $("#confirm-msg",window.parent.document).height()/2;
			largura = $("#confirm-msg",window.parent.document).width()/2;

			$("#confirm-msg",window.parent.document).css({position:"fixed", top: "50%", left: "50%", "margin-top": "-"+altura+"px","margin-left":"-"+largura+"px" });

			checkPageOutput(); //fallback
		
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

/* =================================================================================
* Fallback para dialog - in�cio
* Quando o usu�rio sai da p�gina por qualquer motivo e a tela de mensagem/confirma��o
* continua aberta. 
===================================================================================== */

function checkPageOutput(){
	var arrayScreen = [];
	arrayScreen = ["#dialog-msg","#confirm-msg","#confirm-msg3","#confirm-message"];

	window.onbeforeunload = function(){
		if ((window.navigator.appVersion.indexOf("MSIE 8") != -1) || (window.navigator.appVersion.indexOf("Trident/4") != -1)) {
			for (var i=0; i < arrayScreen.length; i++){
				checkOpenScreen(arrayScreen[i]);
			}			
		} else {
			arrayScreen.forEach(function(item){
				checkOpenScreen(item);
			});
		}
	}
}

function checkOpenScreen(tela){
	if (tela == "#confirm-msg3") {
		checkRemoveScreen("#confirm-msg3");
	} else if (tela == "#confirm-message") {
		checkRemoveScreen("#confirm-message");
	} else {
		if ($(tela,window.parent.document).length > 0) {
			if ($(tela,window.parent.document).attr("style").indexOf("display: none") == -1) {
				$(tela,window.parent.document).hide();
				$(".ui-widget-overlay",window.parent.document).hide();
			}
		}
	}  
}

function checkRemoveScreen(screenName){
	if ($(screenName,window.parent.document).length > 0) {
		$(screenName,window.parent.document).remove();
	}
}

/* =================================================================================
* Fallback para dialog - final
===================================================================================== */