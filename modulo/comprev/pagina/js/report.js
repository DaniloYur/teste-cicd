let intervalComponenteListaProcessamentos;

let reportServiceConsumer = {
    init: function () {
        var objetoTopLevel = this;
        this.componenteListaRelatorios();
        this.componenteListaProcessamentos();
        this.aplicarComponentesDeCampos();
        this.aplicarMascara();
        this.carregarTodosComboBoxes();

        $("#RSIFrame", parent.document).height($("#RSIFrame", parent.document).contents().height() + 150);
        intervalComponenteListaProcessamentos = setInterval(function() { objetoTopLevel.componenteListaProcessamentos() }, 5000);
    },
    isPreviewExpanded: false,
    previewExpandedId: '',
    colapseDetail: function(idProcessamento) {

        var hasEntered=false;
        if (this.isPreviewExpanded  && idProcessamento != this.previewExpandedId) {
            $('#collapseDetail'+this.previewExpandedId).collapse('toggle');
            hasEntered=true;
        }

        if (!hasEntered && this.isPreviewExpanded) {
            this.isPreviewExpanded = false;
            if (idProcessamento == this.previewExpandedId) {
                this.previewExpandedId='';
            }
        } else {
            this.componteListaColunasCorpo(idProcessamento);
            this.isPreviewExpanded = true;
            this.previewExpandedId = idProcessamento; //--Seta o expandido
        }
    },
    clearIntervalComponenteListaProcessamentos: function() {
        if (intervalComponenteListaProcessamentos != undefined)
            clearInterval(intervalComponenteListaProcessamentos);
    },
    aplicarComponentesDeCampos: function() {
        
    },
    aplicarMascara: function() {

    },
    carregarTodosComboBoxes: function () {
        //carregarComboBox("#idioma", "api/v1/domain/list/module/language", 0);
    },
    validacao: function() {

    },          
    engineTemplate: function(apiData, params, organismoToRender, templateHtmlToRender) {
            var objetoTopLevel = this;
            var dataListObject = consumidor.executarServico(apiData, params);
            console.log(dataListObject);
            var divToRender = $('#'+organismoToRender);
            divToRender.html('');
            if (dataListObject != undefined)  {
                $(dataListObject).each(function(idx, dataObject){
                    var htmlToRender = new String(templateHtmlToRender); //objetoTopLevel.getTemplateHTMLButton()

                    //--Atomos compostos de matriz de linha
                    if (htmlToRender.indexOf('{{atom_data_composite:td_rows}}') > 0) {
                        var htmlRows = "";
                        Object.keys(dataObject).forEach(key => {
                            htmlRows     += "<td>{{atom_data:"+key+"}} </td>";
                        });
                        htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:td_rows}}', htmlRows);
                    }

                    if (htmlToRender.indexOf('{{atom_data_composite:th_rows}}') > 0) {
                        var htmlRows = "";
                        Object.keys(dataObject).forEach(key => {
                            htmlRows     += "<th>{{atom_data:"+key+"}} </th>";
                        });
                        htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:th_rows}}', htmlRows);
                    }                    

                    //--Atomos compostos
                    if (htmlToRender.indexOf('{{atom_data_composite:input}}') > 0) {
                        if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'text') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentText(''));
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'date') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentDate(''));
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'number') {
                            if(isIgualsIgnoreCase(dataObject.nomCampo, ['Protocolo'])) {
                                htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumberWithMask(dataObject.idFiltroRelatorio, MASK_PROTOCOLO, 'onKeyUp'));
                            }else if(isIgualsIgnoreCase(dataObject.nomCampo, ['NIT'])) {
                                htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumberWithMask(dataObject.idFiltroRelatorio, MASK_NIT, 'onKeyUp'));
                            }else if(isIgualsIgnoreCase(dataObject.nomCampo, ['PIS/PASEP', 'PIS', 'PASEP'])) {
                                htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumberWithMask(dataObject.idFiltroRelatorio, MASK_PIS, 'onKeyUp'));
                            } else if (isIgualsIgnoreCase(dataObject.nomCampo, ['CPF do Servidor', 'CPF DO BENEFICIARIO'])){
                                htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumberWithMask(dataObject.idFiltroRelatorio, MASK_CPF, 'onKeyUp'));
                            }else {
                                htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumber(''));
                            }
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'select') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentSelect(''));
                        }
                    }     
                    
                    if (htmlToRender.indexOf('{{atom_data_composite:inputFilled}}') > 0) {
                        if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'text') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:inputFilled}}', objetoTopLevel.getTemplateHTMLComponentTextWithValue());
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'date') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:inputFilled}}', objetoTopLevel.getTemplateHTMLComponentDateWithValue());
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'number') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:inputFilled}}', objetoTopLevel.getTemplateHTMLComponentNumberWithValue());
                        } else if (dataObject.tipoCampo != undefined && dataObject.tipoCampo == 'select') {
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:inputFilled}}', objetoTopLevel.getTemplateHTMLComponentSelectWithValue());
                        }
                    }                       

                    Object.keys(dataObject).forEach(key => {
                        var value = dataObject[key];
                        htmlToRender = htmlToRender.replaceAll('{{atom_data:' + key + '}}', (value  == null || value == undefined ? "" : value));
                    });    
                    var divToRender = $('#'+organismoToRender);
                    divToRender.append(htmlToRender);
                });

                //--Preenchendo comboboxes
                divToRender.find('.filterReportSelect').each(function(){
                    console.log('Select: ' + $(this).attr('data-id'));
                    objetoTopLevel.carregarComboBox("#"+$(this).attr('id'), "/api/v1/relatorios/genericos/componentes/select/filtro/"+$(this).attr('data-id')+"/listar", ($(this).attr('data-value') ? $(this).attr('data-value') : null));
                });

                //-- Colocando os campos somente leitura
                divToRender.find('.filterReportReadOnly').each(function(){

                    if ($(this).is('select, :checkbox, :radio'))
                        $(this).attr('disabled', 'disabled');
                    else
                        $(this).attr('readonly','readonly');
                    
                    
                    if ($(this).hasClass('datepicker'))
                        $(this).removeClass('datepicker');
                });                

            }
    }, 
    componenteListaRelatorios: function() {
            var params               = { jsonTokenSigeprev: getCookieSigeprev("tokenSigeprev"), idTela: 21, serviceOn: true};
            var apiData              = '/api/v1/relatorios/genericos/tela/'+params.idTela+'/relatorios/listar';
            var organismoToRender    = 'organism-relatorios';
            var templateHtmlToRender = this.getTemplateHTMLMoleculaButton();
            this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
    },
    getTemplateHTMLMoleculaButton: function() {
        var htmlToRender = `<button type="button" class="btn bt-azul" data-id="{{atom_data:idRelatorio}}" onclick="reportServiceConsumer.componenteShowModalFiltros('{{atom_data:idRelatorio}}')">
                            <i class="fa fa-file fa-2x" aria-hidden="true"></i><span>{{atom_data:nomRelatorio}}</span>
                            </button>
                        `;
        return htmlToRender;
    },    
    componenteShowModalFiltros(idRelatorio) {
            var params               = { idRelatorio: idRelatorio, serviceOn: true};
            var apiData              = '/api/v1/relatorios/genericos/relatorio/'+params.idRelatorio+'/filtros/listar';
            var organismoToRender    = 'organismo-Filtros';
            var templateHtmlToRender = this.getTemplateHTMLMoleculaFilter();
            this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
            $(".datepicker"   ).datepicker({format: "dd/mm/yyyy", orientation: "bottom auto"});
            $("#btnFiltrarRelatorio").attr('data-id', params.idRelatorio);
            $("#modalReportFilters").modal('show');
    },  
    getTemplateHTMLMoleculaFilter: function() {
        var htmlToRender = `<div class="form-group">
                                <label for="" class="control-label col-md-4 col-sm-3">{{atom_data:labelCampo}}:</label>
                                <div class="col-md-8 col-sm-5">
                                    <div class="input-group">
                                        {{atom_data_composite:input}}
                                    </div>
                                </div>
                            </div>
                            `;
        return htmlToRender;
    },    
    limparFiltrosRelatorio: function() {
        $('#organismo-Filtros').html('');
    },
    componenteShowModalFiltrosPreenchidos(idProcessamento) {
        var params               = { idProcessamento: idProcessamento, serviceOn: true};
        var apiData              = '/api/v1/relatorios/genericos/processamento/'+params.idProcessamento+'/filtros/listar';
        var organismoToRender    = 'organismo-Filtros-read-only';
        var templateHtmlToRender = this.getTemplateHTMLMoleculaFilterFilled();
        this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
        $(".datepicker"   ).datepicker({format: "dd/mm/yyyy", orientation: "bottom auto"});
        $("#btnFiltrarRelatorio").attr('data-id', params.idRelatorio);
        $("#modalReportFiltersReadOnly").modal('show');
        
    },      
    getTemplateHTMLMoleculaFilterFilled: function() {
        var htmlToRender = `<div class="form-group">
                                <label for="" class="control-label col-md-4 col-sm-3">{{atom_data:labelCampo}}:</label>
                                <div class="col-md-8 col-sm-5">
                                    <div class="input-group">
                                        {{atom_data_composite:inputFilled}}
                                    </div>
                                </div>
                            </div>
                            `;
        return htmlToRender;
    },
    limparFiltrosFilledRelatorio: function() {
        $('#organismo-Filtros-read-only').html('');
    },    
    componteListaColunasCorpo: function(idProcessamento) {

        //var cols = urlDominioBackEnd + urlContextoBackEnd + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/colunas/lista';
        //var rows = urlDominioBackEnd + urlContextoBackEnd + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/preview/lista';

        var cols = '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/colunas/lista';
        var rows = '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/preview/lista';

        var params = {}
        $('#reportList'+idProcessamento).footable({
            "columns": consumidor.executarServico(cols, params),
            "rows":    consumidor.executarServico(rows, params),
            "on": {
                "postdraw.ft.table": function(e, ft) {
                    console.log($("table#reportList"+idProcessamento).find('tbody').find('tr'));
                    /*
                     * e: The jQuery.Event object for the event.
                     * ft: The instance of the plugin raising the event.
                     */
                    // all initialized - do stuff here
                    //$("table#reportList"+idProcessamento).removeClass("table-stripped");
                    
                    setTimeout(function() {
                        $("table#reportList"+idProcessamento).find('tbody').find('tr').each(function (index) {
                            if ( index % 2 == 0) {
                              $(this).find('td').each(function (index) { $(this).css("background-color", "#FFFFFF"); });
                            } else {
                              $(this).find('td').each(function (index) { $(this).css("background-color", "#E7E7E7"); });
                            }
                        });
                    }, 500);
                }
            }            
        });
        
        /*
        $('#reportList'+idProcessamento).footable({
            "columns": $.get(cols),
            "rows": $.get(rows)
        });
        */

    },
    componenteListaColunasHeader: function(idProcessamento) {
        var params               = { };
        var apiData              = '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/colunas/lista';
        var organismoToRender    = 'reportList-thead'+idProcessamento;
        var templateHtmlToRender = this.getTemplateHTMLComponentDetailThead();
        this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
    }, 
    getTemplateHTMLComponentDetailThead: function() {
        var htmlToRender = `
            <tr>
                {{atom_data_composite:th_rows}}
            </tr>
        `;
        return htmlToRender;
    },
    componenteListaColunasBody: function(idProcessamento) {
        var params               = { };
        var apiData              = '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/preview/lista';
        var organismoToRender    = 'reportList-tbody'+idProcessamento;
        var templateHtmlToRender = this.getTemplateHTMLComponentDetailTbody();
        this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
    },     
    getTemplateHTMLComponentDetailTbody: function() {
        var htmlToRender = `
            <tr>
                {{atom_data_composite:td_rows}}
            </tr>
        `;
        return htmlToRender;
    },
    
    processarRelatorio: function() {
        //--Verificando obrigatoriedade

        $('#cover-spin').show(0);

        //--Montando JSON de filtro
        if ($("#btnFiltrarRelatorio").attr('data-id') == undefined || $("#btnFiltrarRelatorio").attr('data-id') == '') {
            alert('Você precisa preencher os filtros');
            return;
        }

        var parametros     = {};
        parametros.filtros = [];
        var divToRender = $('#modalReportFilters');
        divToRender.find('.filterReport').each(function(){
            var valores                      = {};
//          valores.codIns                   = 1;
            valores.idRgenParFiltroRelatorio = $(this).attr('data-id');
            valores.valorFiltro              = $(this).val();
            parametros.filtros.push(valores);
        });
        
        //--Chamar servico de processamento de relatório
        var params               = { idRelatorio: $("#btnFiltrarRelatorio").attr('data-id') };
        var apiData              = '/api/v1/relatorios/genericos/processar/relatorio/'+params.idRelatorio;
        var dataToPost           = { usuario: "TESTE", filterData: JSON.stringify(parametros)};

        jsonData = consumidor.executarServico2(apiData, dataToPost);
        $('#modalReportFilters').modal('hide');

        if(jsonData.cod_status != "" && jsonData.cod_status != null){
            alert("Ocorreu um erro no filtro : " + jsonData.des_status);
        }

        this.limparFiltrosRelatorio();

        if (this.isPreviewExpanded && this.previewExpandedId != null){
            this.colapseDetail(this.previewExpandedId);
        }

        setTimeout(function(){ 
            $('#cover-spin').hide(0);
        }, 2000);


    },
    exportarCsv: function(idProcessamento, flgConcluiu) {
        if (flgConcluiu == 'N') {
            alert('Relat\u00f3rio n\u00e3o dispon\u00edvel, sem resultado.');
            return;
        }   

        //$('#cover-spin').show(0);

        //--Chamar servico de processamento de relatório
         //var params  = {}
         var domain  = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
         var apiData = domain + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/csv/exportar';
         window.location.href     = apiData;
        //this.executarServico(apiData, params);
    },
    exportarXlsx: function(idProcessamento, flgConcluiu) {

        if (flgConcluiu == 'N') {
            alert('Relat\u00f3rio n\u00e3o dispon\u00edvel, sem resultado.');
            return;
        }    

        //$('#cover-spin').show(0);

        //--Chamar servico de processamento de relatório
        //var params  = {}        
        var domain = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
        var apiData              = domain + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/xlsx/exportar';
        window.location.href     = apiData;
    },    
    componenteListaProcessamentos() {
        if (!this.isPreviewExpanded) {
            var params     = { };
            params.idTela  = 21;
            //params.usuario = getCookieSigeprev('cookieLogin');

            var apiData              = '/api/v1/relatorios/genericos/tela/'+params.idTela+'/relatorios/processamentos/listar';
            var organismoToRender    = 'organismo-lista-processos';
            var templateHtmlToRender = this.getTemplateHTMLMoleculaListaProcessamentos();
            this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
            $('.spinner-progress-01').each(function() {
                if ($(this).attr('data-progress01') != undefined && parseInt($(this).attr('data-progress01')) >= 0 && parseInt($(this).attr('data-progress01')) < 100) {
                    $('#spinner-progress-'+$(this).attr('data-id')).css('visibility','visible');
                }
            });
        }
    },
    getTemplateHTMLMoleculaListaProcessamentos() {
        var htmlToRender = `
            <tr id="{{atom_data:idProcessamento}}">
                <td>{{atom_data:idProcessamento}}</td>
                <td>{{atom_data:nomRelatorio}}</td>
                <td>
                    <div>
                        <span>{{atom_data:numPorcentagem}}% </span>
                    </div>
                    <div class="progress progress-small">
                        <div style="width: {{atom_data:numPorcentagem}}%;" class="progress-bar"></div>
                    </div>
                </td>
                <td><div id="div-spinner-progress-{{atom_data:idProcessamento}}" class="spinner-progress-01" data-progress01="{{atom_data:numPorcentagem}}" data-id="{{atom_data:idProcessamento}}"><img id="spinner-progress-{{atom_data:idProcessamento}}" src="../../../../img/half-spinner-loading-blue-bg-gray.gif" width="23" height="23" style="visibility: hidden"/></div></td>
                <td><a onclick="reportServiceConsumer.componenteShowModalFiltrosPreenchidos('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouXlsx}}')" role="button">
                        <i class="fas fa-bars fa-2x"></i>
                    </a>
                </td>
                <td>{{atom_data:datGeracao}}</td>
                <td>{{atom_data:loginGeracao}}</td>
                <td>
                    <a data-toggle="collapse" href="#collapseDetail{{atom_data:idProcessamento}}" onclick="reportServiceConsumer.colapseDetail('{{atom_data:idProcessamento}}')" role="button" aria-expanded="false" aria-controls="collapseDetail{{atom_data:idProcessamento}}">
                        <i class="fas fa-search fa-2x"></i>
                    </a>
                    <a onclick="reportServiceConsumer.exportarXlsx('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouXlsx}}')" role="button">
                        <i class="fas fa-file-excel fa-2x"></i>
                    </a>
                    <a onclick="reportServiceConsumer.exportarCsv('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouCsv}}')" role="button">
                        <i class="fas fa-file-csv fa-2x"></i>
                    </a>
                </td>
            </tr>
            <tr>
                <td class="line" colspan="8">
                    <div id="collapseDetail{{atom_data:idProcessamento}}" class="detalhe-info collapse">                        
                        <h3>Detalhes</h3>
                        
                        <div class="table-responsive">                                                  

                            <table id="reportList{{atom_data:idProcessamento}}" class="table table-striped table-stripped footable breakpoint breakpoint-sm tabelaPaddingMenor" data-paging="true"  data-paging-size="5">

                            </table>

                        </div>

                    <div>
                </td>
            </tr>  
        `;
        
        return htmlToRender;
    },
    getTemplateHTMLComponentText: function() {
        var htmlToRender = `
            <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}" onKeyPress="mascaraNome('{{atom_data:idFiltroRelatorio}}')">        
        `;
        return htmlToRender;
    },     
    getTemplateHTMLComponentNumber: function() {
        var htmlToRender = `
            <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}" onKeyPress="somenteNumeros('{{atom_data:idFiltroRelatorio}}')">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentNumber: function(tipoKeyPress) {
        var htmlToRender = `
            <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}" `+tipoKeyPress+`="somenteNumeros('{{atom_data:idFiltroRelatorio}}')">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentNumberWithMask: function(id, mask) {
        var htmlToRender = `
            <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}" onKeyPress="aplicarMascara('`+id+`', '`+mask+`')">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentNumberWithMask: function(id, mask, tipoKeyPress) {
        var htmlToRender = `
            <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}" `+tipoKeyPress+`="aplicarMascara('`+id+`', '`+mask+`')">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentDate: function() {
        var htmlToRender = `
            <div class="input-group date">
                <input type="text" id="{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control date2 datepicker" onKeyPress="mascaraData('{{atom_data:idFiltroRelatorio}}');">
            </div>     
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentSelect: function() {
        var htmlToRender = `
            <select id="filterReport-{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReportSelect filterReport form-control {{atom_data:flgObrigatoriedade}}">
                <option>Selecione</option>
            </select>
        `;
        return htmlToRender;
    },
    //-- With value Tag
    getTemplateHTMLComponentTextWithValue: function() {
        var htmlToRender = `
            <input type="text" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport filterReportReadOnly form-control {{atom_data:flgObrigatoriedade}}" value="{{atom_data:valorCampo}}">        
        `;
        return htmlToRender;
    },     
    getTemplateHTMLComponentNumberWithValue: function() {
        var htmlToRender = `
            <input type="number" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport filterReportReadOnly form-control {{atom_data:flgObrigatoriedade}}" value="{{atom_data:valorCampo}}">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentDateWithValue: function() {
        var htmlToRender = `
            <div class="input-group date">
                <input type="text" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport filterReportReadOnly form-control date2 datepicker" value="{{atom_data:valorCampo}}">
            </div>     
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentSelectWithValue: function() {
        var htmlToRender = `
            <select id="filterReport-{{atom_data:idFiltroRelatorio}}" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReportSelect filterReport filterReportReadOnly form-control {{atom_data:flgObrigatoriedade}}" data-value="{{atom_data:valorCampo}}">
                <option>Selecione</option>
            </select>
        `;
        return htmlToRender;
    },

    carregarComboBox(idCombo, urlService, valorSelecionado) {
        domain = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
        //token  = 'token123';
        var objetoTopLevel = this;
        var settings = {
            url: domain + urlService,
            method: "GET",
            headers: {
                "tokenSigeprev": getCookieSigeprev("tokenSigeprev")
            },
            processData: false,
            crossDomain: true,
            contentType: false
        };
        $.ajax(settings).done(function (response) {
            var keys = Object.keys(response);
    
            objetoTopLevel.limparComboBox(idCombo, valorSelecionado);
    
            response.forEach(elemento => {
                var elementKeys = Object.keys(elemento);
                if (valorSelecionado != undefined && valorSelecionado != null && valorSelecionado != '' && valorSelecionado == elemento[elementKeys[0]]) {
                    $(idCombo).append("<option value='" + elemento[elementKeys[0]] + "' selected>" + elemento[elementKeys[1]] + "</option>");
                } else {
                    $(idCombo).append("<option value='" + elemento[elementKeys[0]] + "'>" + elemento[elementKeys[1]] + "</option>");
                }
            });
        });
    },
    limparComboBox(idCombo, valorSelecionado) {
        $(idCombo).empty();
        var selecioneField = "Selecione"; 
        var selecione = (valorSelecionado != undefined || valorSelecionado == null || valorSelecionado != '' ? "selected" : "");
        $(idCombo).append("<option value='' " + selecione + ">" + selecioneField + "</option>");
    }                   

};

function mascaraData(id){
    var reg = new RegExp('^[0-9/]*$');
    var dataForm;
    var data = document.getElementById(id).value;
    var barra = "/";
	if(data.length == 2 && reg.test(data) == true){
		dataForm = data + barra;
		document.getElementById(id).value = dataForm;
        $("#btnFiltrarRelatorio").prop( "disabled", false );
        return true;
	}
	if(data.length == 5 && reg.test(data) == true){
		dataForm = data + barra;
		document.getElementById(id).value = dataForm;
        $("#btnFiltrarRelatorio").prop( "disabled", false );
        return true;
	}
    if(data.length >= 10 || reg.test(data) == false){
        alert("Data Inv\u00E1lida")
        $("#btnFiltrarRelatorio").prop( "disabled", true );
        return false;
    }
    id='';
}

function somenteNumeros(id){
    var reg = new RegExp('^[0-9/]*$');
    var valor = document.getElementById(id).value;

    if(reg.test(valor) == true){
        document.getElementById(id).value = valor;
        $("#btnFiltrarRelatorio").prop( "disabled", false );
        return true
    } else {
        alert("Informa\u00E7\u00E3o digitada é Inv\u00E1lida")
        $("#btnFiltrarRelatorio").prop( "disabled", true );
        $("#"+id).val("");
        return false;
    }
}

function mascaraNome(id){
    var reg = new RegExp('^[a-zA-Z/]*$');
    var nome = document.getElementById(id).value;
    if(reg.test(nome) == true){
        $("#btnFiltrarRelatorio").prop( "disabled", false );
        return true;
    } else {
        alert("Nome Inv\u00E1lido");
        $("#btnFiltrarRelatorio").prop( "disabled", true );
        return false;
    }
    id='';
}

function aplicarMascara(id, mask){
    let obj = document.getElementById(id);
    setaMascara(obj, mask);
    var valor = document.getElementById(id).value;
    if(valor != '') {
        $("#btnFiltrarRelatorio").prop("disabled", false);
        return true;
    }else{
        $("#btnFiltrarRelatorio").prop("disabled", true);
        return false;
    }
    id='';
}