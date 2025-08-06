function menuPaginacao() {
    $(function(){
        $(".pagelinks").html(
            $(".pagelinks").html()
            .replace(/(\u005B|\u005D|\u002C)/g," ")
            .replace("Primeiro/","<a class='btn bt-azul' disabled='disabled'>Primeiro</a> ")
            .replace("Anterior ","<a class='btn bt-azul' disabled='disabled'>Anterior</a> ")
            .replace("</a>/","</a> ")
            .replace("/<a "," <a ")
            .replace("<STRONG>","<a class='btn bt-azul active' disabled='disabled'>")
            .replace("<strong>","<a class='btn bt-azul active' disabled='disabled'>")
            .replace("</STRONG>","</a>")
            .replace("</strong>","</a>")
            .replace("Próximo/Último","<a class='btn bt-azul' disabled='disabled'>Próximo</a> <a class='btn bt-azul' disabled='disabled'>Último</a>")
            .replace("</A>/","</a> ")
            .replace("Próximo</B></A>/","Próximo</b></a> ")
        );
        $(".pagelinks a")
            .addClass("btn bt-azul")
            .click(function(){ /*exibirAguardeBootstrap();*/ });
        $("a[disabled='disabled']").click(function(){ /*sumirAguardeBootstrap();*/ return false; });
    });
}