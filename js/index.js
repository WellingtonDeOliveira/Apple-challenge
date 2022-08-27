function change() {
    $(document).ready(function () {
        if(this.bool == true){
            this.bool = false;
            $(".container-nomes").hide();
            $(".container-ciclo").show();
        }else{
            this.bool = true;
            $(".container-ciclo").hide();
            $(".container-nomes").show();
        }
    });
}
$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/nomes.json", function (data) {
        console.log(data.nomes);
        if (Math.trunc(data.nomes.length / 4) < (data.nomes.length / 4)) {
            var contador = (Math.trunc(data.nomes.length / 4) + 1);
            var cont = contador;
        } else {
            var contador = (Math.trunc(data.nomes.length / 4));
            var cont = contador;
        }
        console.log(contador);
        var controlador = 1;
        $(".row-nomes").append("<div class='col-3 grupo-nomes" + controlador + " space'></div>");
        for (let i = 0; i < data.nomes.length; i++) {
            if (contador == (i)) {
                console.log(contador + "/" + i);
                contador += cont;
                controlador++;
                $(".row-nomes").append("<div class='col-3 grupo-nomes" + controlador + " space'></div>");
            }
            console.log("Nome: " + data.nomes[i]);
            $(".grupo-nomes" + controlador).append("<h2 class='title-membros' >" + data.nomes[i] + "</h2>")
        }
    });
});
$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/ciclos.json", function (data) {
        const tamanho = data.ciclos[data.count - 1].length;
        if ((12 / tamanho) < 2) {
            var col = 3
        } else {
            var col = 4
        }
        //console.log(data.ciclos[data.count - 1][1].length);
        for (let i = 0; i < data.ciclos[data.count - 1].length; i++) {
            $(".row-ciclo").append("<div class='col-" + col + " grupo" + i + " space'></div>");
            $(".grupo" + i).append("<h3 class='title-grupo' > Grupo " + (i + 1) + "</h3>");
            for (let j = 0; j < data.ciclos[data.count - 1][i].length; j++) {
                $(".grupo" + i).append("<h4 class='title-membros' >" + data.ciclos[data.count - 1][i][j] + "</h4>");
            }
        }
        //$(".container").append("<h2>Nome: "+data[count-1]+"</h2>")
    });
});