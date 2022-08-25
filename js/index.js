$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/nomes.json", function (data) {
        //console.log(data.nomes);
        for (let i = 0; i < data.nomes.length; i++) {
            //console.log("Nome: "+data.nomes[i]);
            //$(".container").append("<h2>Nome: "+data.nomes[i]+"</h2>")
        }
    });
});
$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/ciclos.json", function (data) {
        //console.log(data.count);
        //console.log(data.ciclos[data.count - 1][1].length);
        for (let i = 0; i < data.ciclos[data.count - 1].length; i++) {
            console.log("Grupo ("+ (i+1) + "): ")
            for (let j = 0; j < data.ciclos[data.count - 1][i].length; j++) {
                console.log("Nome: "+ data.ciclos[data.count - 1][i][j])
            }
        }
        //$(".container").append("<h2>Nome: "+data[count-1]+"</h2>")
    });
});