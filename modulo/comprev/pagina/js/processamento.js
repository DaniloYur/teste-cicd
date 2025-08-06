let intervalComponenteListaProcessamentos;

let reportServiceConsumer = {
    init: function () {
        var objetoTopLevel = this;
        this.componenteListaRelatorios();
        this.componenteListaProcessamentos();
        this.aplicarComponentesDeCampos();
        this.aplicarMascara();
        this.carregarTodosComboBoxes();
        intervalComponenteListaProcessamentos = setInterval(function() { objetoTopLevel.componenteListaProcessamentos() }, 5000);
    },
    isPreviewExpanded: false,
    previewExpandedId: '',
    previewTipoId: '',
    colapseDetail: function(idProcessamento, idTipo) {

        var hasEntered=false;
        if (this.isPreviewExpanded  && idProcessamento != this.previewExpandedId) {
            $('#collapseDetail'+this.previewExpandedId).collapse('toggle');
            $('#collapseDetail'+idProcessamento).collapse('toggle');
            hasEntered=true;
        } else if  (this.isPreviewExpanded  && this.previewTipoId != '' && idTipo != this.previewTipoId) {
            //$('#collapseDetail'+this.previewExpandedId).collapse('toggle');
            hasEntered=true;
        } else {
            $('#collapseDetail'+idProcessamento).collapse('toggle');
        }

        this.previewTipoId = idTipo;

        if (!hasEntered && this.isPreviewExpanded) {
            this.isPreviewExpanded = false;
            if (idProcessamento == this.previewExpandedId) {
                this.previewExpandedId='';
            }
        } else {
            this.componteListaColunasCorpo(idProcessamento, idTipo);
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
                            htmlToRender = htmlToRender.replaceAll('{{atom_data_composite:input}}', objetoTopLevel.getTemplateHTMLComponentNumber(''));
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
            var params               = { idTela: 21, serviceOn: true};
            var apiData              = '/api/v1/processamentos/genericos/tela/'+params.idTela+'/processamentos/listar';
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
    isCarregadoModalFiltros: false,
    componenteShowModalFiltros(idRelatorio) {

        if (idRelatorio == 2) {
            $("#modalReportUpload").modal('show');
        } else {                    
            if (this.isCarregadoModalFiltros == false) {
                var params               = { idRelatorio: idRelatorio, serviceOn: true};
                var apiData              = '/api/v1/processamentos/genericos/processamento/'+params.idRelatorio+'/filtros/listar';
                var organismoToRender    = 'organismo-Filtros';
                var templateHtmlToRender = this.getTemplateHTMLMoleculaFilter();
                this.engineTemplate(apiData, params, organismoToRender, templateHtmlToRender);
                $(".datepicker"   ).datepicker({format: "dd/mm/yyyy", orientation: "bottom auto"});
                $("#btnFiltrarRelatorio").attr('data-id', params.idRelatorio);
                $("#modalReportFilters").modal('show');
                this.isCarregadoModalFiltros = true;    
            } else {
                $("#modalReportFilters").modal('show');
            }
        }
            
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
        document.getElementById('attachment').value = ''
        document.getElementById('datEnvio').value = ''
    },
    componenteShowModalFiltrosPreenchidos(idProcessamento) {
        var params               = { idProcessamento: idProcessamento, serviceOn: true};
        var apiData              = '/api/v1/processamentos/genericos/processamento/'+params.idProcessamento+'/filtros/listar';
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
    componteListaColunasCorpo: function(idProcessamento, idTipo) {
        var rows
        var cols
        //var cols = urlDominioBackEnd + urlContextoBackEnd + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/colunas/lista';
        //var rows = urlDominioBackEnd + urlContextoBackEnd + '/api/v1/relatorios/genericos/processamento/'+idProcessamento+'/preview/lista';
        if (idTipo == 1){
            cols = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/colunas/lista';
            rows = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/preview/lista';
        }
        else if (idTipo == 2){
            cols = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/colunas/retorno/lista';
            rows = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/preview/retorno/lista';
        }
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
        var apiData              = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/colunas/lista';
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
        var apiData              = '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/preview/lista';
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
    filtrar: function() {


        $('#cover-spin').show(0);

        $("body").find('.filterReport').each(function(){
            $(this).attr('data-value', $(this).val());
        });

        $("body").find('.fieldNumber').each(function(){
            $(this).val($(this).val().replace('e',''));
            $(this).val($(this).val().replace(',',''));
            $(this).val($(this).val().replace('.',''));
            $(this).val($(this).val().replace('-',''));
            $(this).val($(this).val().replace('+',''));            
            $(this).attr('data-value', $(this).val());
        });        

        $('#modalReportFilters').modal('hide');

        setTimeout(function(){ 
            $('#cover-spin').hide(0);
        }, 4000);       

    },
    processarRelatorio: function() {
        //--Verificando obrigatoriedade
        
        if($('#datEnvio').val() == '' || $('#datEnvio').val() == 0 || $('#datEnvio').val() == null){
            alert("Por favor insira uma data de envio.");
            datEnvio.focus();
            return;
        }
        var documento = document.getElementById('attachment');
        if(documento.files.length === 0){
            alert("Por favor insira um arquivo.");
            documento.focus();
            return;
        }
        if(documento.value.indexOf('.csv') < 0 && documento.value.indexOf('.CSV') < 0){
            alert("Insira um arquivo no formato csv.");
            documento.focus();
            return;
        }

        $('#cover-spin').show(0);

        var apiData              = 'api/v1/processamentos/genericos/processar?datEnvio='+$('#datEnvio').val();
        let urlDominioContextoServicoParametros = urlDominioBackEnd + urlContextoBackEnd + apiData;
        //$('#formSubmitFile').attr("action", urlDominioContextoServicoParametros);
        //document.forms["formSubmitFile"].submit();

        var data = new FormData();
        jQuery.each(jQuery('#attachment')[0].files, function(i, file) {
            data.append('attachment', file);
        });

        data.append('tokenSigeprev', getCookieSigeprev("tokenSigeprev"));

        var opts = {
            url: urlDominioContextoServicoParametros,
            data: data,
            cache: false,
            contentType: false,
            processData: false,            
            method: 'POST',
            type: 'POST', // For jQuery < 1.9
            success: function(data){
                //alert(data);
            }
        };

        jQuery.ajax(opts);

        // //--Montando JSON de filtro
        // if ($("#btnFiltrarRelatorio").attr('data-id') == undefined || $("#btnFiltrarRelatorio").attr('data-id') == '') {
        //     alert('Você precisa preencher os filtros');
        //     return;
        // }

        $('#modalReportUpload').modal('hide');

        this.limparFiltrosRelatorio();

        if (this.isPreviewExpanded && this.previewExpandedId != null)
            this.colapseDetail(this.previewExpandedId);

        setTimeout(function(){ 
            $('#cover-spin').hide(0);
        }, 2000);            

    },
    confirmarProcessamento: function(idProcessamento, flgConcluiu) {
        if (flgConcluiu == 'S') {
            alert('Confirmação não está mais disponivel, pois o processo já está concluído.');
            return;
        } 
        $('#cover-spin').show(0);

        if (this.isPreviewExpanded && this.previewExpandedId != null) {
            $('#collapseDetail'+idProcessamento).collapse('toggle');
            this.isPreviewExpanded = false;
            this.previewExpandedId = ''
        }

        var params = {};
        var cols = 'api/v1/processamentos/genericos/processamento/'+idProcessamento+'/confirmar';
        consumidor.executarServico2(cols, params)

        setTimeout(function(){ 
            $('#cover-spin').hide(0);
        }, 2000);          

    },
    excluirProcessamento: function(idProcessamento, flgConcluiu) {

        if (flgConcluiu == 'S') {
            alert('Processamento já concluído. Não será possível cancelar a carga.');
            return;
        }

        $('#cover-spin').show(0);

        if (this.isPreviewExpanded && this.previewExpandedId != null) {
            $('#collapseDetail'+idProcessamento).collapse('toggle');
            this.isPreviewExpanded = false;
            this.previewExpandedId = ''
        }
        //this.colapseDetail(this.previewExpandedId);

        //$('#cover-spin').show(0);

        //--Chamar servico de processamento de relatório
        var params  = {}
        var domain  = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
        var cols = 'api/v1/processamentos/genericos/processamento/'+idProcessamento+'/excluir';
        consumidor.executarServico2(cols, params)
        //this.executarServico(apiData, params);

        setTimeout(function(){ 
            $('#cover-spin').hide(0);
        }, 2000);          
    },
    exportarXlsx: function(idProcessamento, flgConcluiu) {

        //if (flgConcluiu == 'N') {
            //alert('Download nao disponivel ainda. Aguarde o fim do processo.');
            //return;
        //}    

        //$('#cover-spin').show(0);

        //--Chamar servico de processamento de relatório
        //var params  = {}        
        var domain = urlDominioBackEnd + urlContextoBackEnd;  //'http://localhost:8082';
        var apiData              = domain + '/api/v1/processamentos/genericos/processamento/'+idProcessamento+'/xlsx/exportar';
        window.location.href     = apiData;
    },    
    componenteListaProcessamentos() {
        if (!this.isPreviewExpanded) {
                
            var idProcessamento        = "";
            var datInicioProcessamento = "";
            var datFimProcessamento    = "";
            var usuarioProcessamento   = "";
            $("body").find('.filterReport').each(function(){
                if ($(this).attr('data-id') == 1) { 
                    idProcessamento        = $(this).attr('data-value');
                } else if ($(this).attr('data-id') == 2) { 
                    datInicioProcessamento = $(this).attr('data-value');
                } else if ($(this).attr('data-id') == 3) {
                    datFimProcessamento    = $(this).attr('data-value');
                } else if ($(this).attr('data-id') == 4) {
                    usuarioProcessamento   = $(this).attr('data-value');
                }                
            });

            var params               = { idTela: 21, idProcessamento: idProcessamento, datInicioProcessamento : datInicioProcessamento, datFimProcessamento: datFimProcessamento, usuarioProcessamento : usuarioProcessamento };
            var apiData              = '/api/v1/processamentos/genericos/tela/'+params.idTela+'/processamentos/processamentos/listar';
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
               
                <td>{{atom_data:datGeracao}}</td>
                <td>{{atom_data:loginGeracao}}</td>
                <td>
                    <a href="#collapseDetail{{atom_data:idProcessamento}}" onclick="reportServiceConsumer.colapseDetail('{{atom_data:idProcessamento}}', 1)" role="button" aria-expanded="false" aria-controls="collapseDetail{{atom_data:idProcessamento}}">
                        <i class="fas fa-search fa-2x"></i>
                    </a>
                    <a onclick="reportServiceConsumer.confirmarProcessamento('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouCsv}}')" role="button">
                        <i class="fas fa-check fa-2x"></i>
                    </a>
                    <a onclick="reportServiceConsumer.excluirProcessamento('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouCsv}}')" role="button">
                        <i class="fas fa-times fa-2x" style="color:red"> </i>
                    </a>
                    <a href="#collapseDetail{{atom_data:idProcessamento}}" onclick="reportServiceConsumer.colapseDetail('{{atom_data:idProcessamento}}', 2)" role="button" aria-expanded="false" aria-controls="collapseDetail{{atom_data:idProcessamento}}">
                        <i class="fas fa-bars fa-2x"></i>
                    </a>
                    <a onclick="reportServiceConsumer.exportarXlsx('{{atom_data:idProcessamento}}','{{atom_data:flgProcessouXlsx}}')" role="button">
                        <i class="fas fa-file fa-2x"></i>
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
            <input type="text" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control {{atom_data:flgObrigatoriedade}}">        
        `;
        return htmlToRender;
    },     
    getTemplateHTMLComponentNumber: function() {
        var htmlToRender = `
            <input type="number" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport fieldNumber form-control {{atom_data:flgObrigatoriedade}}">        
        `;
        return htmlToRender;
    },
    getTemplateHTMLComponentDate: function() {
        var htmlToRender = `
            <div class="input-group date">
                <input type="text" data-id="{{atom_data:idFiltroRelatorio}}" class="filterReport form-control date2 datepicker">
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

