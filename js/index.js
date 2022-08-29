function change() {
    /* Logica para fazer com que os campos painel e nomes não apareça ao mesmo tempo */
    document.querySelector(".success").innerHTML = '';
    $('.success').hide();
    document.querySelector(".warning").innerHTML = '';
    $('.warning').hide();
    $(document).ready(function () {
        if (this.bool == true) {
            this.bool = false;
            $(".form-control").val('');
            $(".container-nomes").hide();
            $(".container-nomes-edit").hide();
            $(".container-ciclo").show();
            $(".container-ciclo-edit").show();
        } else {
            this.bool = true;
            $(".form-control").val('');
            $(".container-ciclo").hide();
            $(".container-ciclo-edit").hide();
            $(".container-nomes").show();
            $(".container-nomes-edit").show();
        }
    });
}

/* 
    função ecolha, serve para fazer a escolha mais otimizada dos membros nos grupos
    array_escolhas: ele contem os indices escolhidos dentro daquele grupo.
    array_verificacao: ele contem todos os indices já escolhids, incluindo os do array_escolhas.
*/
function escolha(array, array_escolhas, array_verificacao) {
    let temp = [];
    let indice = 0;
    let bool = true;
    for (let i = 0; i < array.length; i++) {
        temp.push(0);
    }

    for (let i = 0; i < array.length; i++) {
        if (array_escolhas.indexOf(i) != -1) {
            for (let j = 0; j < array.length; j++) {
                if (array_escolhas.indexOf(i) != -1) {
                    temp[j] = temp[j] + array[j][i]
                }
            }
        }
    }
    do {
        let min = Math.min(...temp);
        indice = temp.indexOf(min);
        if (array_verificacao.indexOf(indice) != -1) {
            temp[indice] = min + 10;
        } else {
            bool = false;
        }
    } while (bool);
    //console.log(indice);
    return indice;
}

/* 
    função indiceNome, serve para trocar o indice pelo seu respectivo nome dentro do array_nomes.
*/
function indiceNome(array_totais, array_nomes) {
    for (let i = 0; i < array_totais.length; i++) {
        for (let j = 0; j < array_totais[i].length; j++) {
            array_totais[i][j] = array_nomes[array_totais[i][j]];
        }
    }
    // console.log(array_totais)
    return array_totais;
}

function adicionarMembro() {
    /* atualização futuras */
    alert("Atualização futura...");
}

function atualizarValores(data) {
    console.log(data);
    document.querySelector(".row-ciclo").innerHTML = '';
    $(document).ready(function () {
        const tamanho = data.length;
        if ((12 / tamanho) < 2) {
            var col = 3
        } else {
            var col = 4
        }
        for (let i = 0; i < data.length; i++) {
            $(".row-ciclo").append("<div class='col-" + col + " grupo" + i + " space'></div>");
            $(".grupo" + i).append("<h3 class='title-grupo' > Grupo " + (i + 1) + "</h3>");
            for (let j = 0; j < data[i].length; j++) {
                $(".grupo" + i).append("<h4 class='title-membros' >" + data[i][j] + "</h4>");
            }
        }
    });
}

function adicionarCiclo() {
    if ($(".input-style").val() == '') {
        /* Validação, caso o campo esteja vazio */
        document.querySelector(".warning").innerHTML = '';
        $('.warning').show();
        $('.warning').append("<h5 style='text-align: center;'>Por favor, preencha todos os campos.</h5>")
    } else if ($(".input-style").val() > 1 && $(".input-style").val() <= 10) {
        /* Validado */
        $('.warning').hide();
        $(document).ready(function () {
            var qtd = $(".input-style").val();
            $(".form-control").val('');
            //console.log(tamanho);
            $.get("http://127.0.0.1:5500/json/nomes.json", function (nomes) {
                $.get("http://127.0.0.1:5500/json/ciclos.json", function (ciclos) {
                    /* Criação dos matriz, que serve para dizer qual as melhores conbinações */
                    var array = [];
                    for (let i = 0; i < nomes.nomes.length; i++) {
                        var arrayPopulacao = [];
                        for (let p = 0; p < nomes.nomes.length; p++) {
                            arrayPopulacao.push(0);
                        }
                        //console.log(arrayPopulacao.length);
                        for (let j = (ciclos.count - 1); j >= 0; j--) {
                            //console.log(ciclos.ciclos[j]);
                            let cont = 0;
                            for (let x = 0; x < ciclos.ciclos[j].length; x++) {
                                //console.log(ciclos.ciclos[j][x]);
                                for (let z = 0; z < ciclos.ciclos[j][x].length; z++) {
                                    //console.log(ciclos.ciclos[j][x][z]);
                                    if (nomes.nomes[i] == ciclos.ciclos[j][x][z]) {
                                        for (let b = 0; b < ciclos.ciclos[j][x].length; b++) {
                                            var ts = nomes.nomes.indexOf(ciclos.ciclos[j][x][b]);
                                            arrayPopulacao[ts] = 1 + arrayPopulacao[ts];
                                            //console.log(nomes.nomes.indexOf(ciclos.ciclos[j][x][b], 0));
                                            //console.log(nomes.nomes);
                                            //console.log(ts);
                                        }
                                    }
                                }
                            }
                        }
                        array.push(arrayPopulacao);
                    }
                    //console.log(array);
                    var array_total = [];
                    let array_escolhas = [];
                    let array_verificacao = [];
                    let i = 0; let y = 0; let controle = 0; let j = 1;
                    /* O switch serve para organizar os grupos dependendo da qtd escolhida pelo o usuario */
                    switch (qtd) {
                        case '9': case '6': case '3':
                            controle = 2;
                            do {
                                if (controle > 0) {
                                    j = 0;
                                    controle -= 1;
                                } else {
                                    j = 1;
                                }
                                do {
                                    if (i == 0) {
                                        // ponto de partida
                                        array_escolhas.push(i);
                                        array_verificacao.push(i);
                                        i++;
                                        j++;
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++;
                                        j++;
                                    } else {
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++
                                        j++
                                    }
                                } while ((nomes.nomes.length / qtd) >= j)
                                array_total.push(array_escolhas);
                                array_escolhas = [];
                            } while (nomes.nomes.length > i);
                            console.log(i)
                            break;
                        case '8':
                            controle = 4;
                            do {
                                if (controle > 0) {
                                    j = 0;
                                    controle -= 1;
                                    console.log(controle);
                                } else {
                                    j = 1;
                                }
                                do {
                                    console.log(j);
                                    if (i == 0) {
                                        // ponto de partida
                                        array_escolhas.push(i);
                                        array_verificacao.push(i);
                                        i++;
                                        j++;
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++;
                                        j++;
                                    } else {
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++
                                        j++
                                    }
                                } while ((nomes.nomes.length / qtd) >= j)
                                array_total.push(array_escolhas);
                                array_escolhas = [];
                            } while (nomes.nomes.length > i);
                            console.log(i)
                            break;
                        case '7':
                            controle = 6;
                            do {
                                if (controle > 0) {
                                    j = 0;
                                    controle -= 1;
                                } else {
                                    j = 1;
                                }
                                do {
                                    if (i == 0) {
                                        // ponto de partida
                                        array_escolhas.push(i);
                                        array_verificacao.push(i);
                                        i++;
                                        j++;
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++;
                                        j++;
                                    } else {
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++
                                        j++
                                    }
                                } while ((nomes.nomes.length / qtd) >= j)
                                array_total.push(array_escolhas);
                                array_escolhas = [];
                            } while (nomes.nomes.length > i);
                            console.log(array_total)
                            break;
                        case '2': case '4': case '5': case '10':
                            do {
                                do {
                                    if (i == 0) {
                                        // ponto de partida
                                        array_escolhas.push(i);
                                        array_verificacao.push(i);
                                        i++;
                                        j++;
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++;
                                        j++;
                                    } else {
                                        y = escolha(array, array_escolhas, array_verificacao);
                                        array_escolhas.push(y);
                                        array_verificacao.push(y);
                                        i++
                                        j++
                                    }

                                } while ((nomes.nomes.length / qtd) >= j)
                                array_total.push(array_escolhas);
                                j = 1;
                                array_escolhas = [];
                            } while (nomes.nomes.length > i);
                            break;
                    }
                    var final = indiceNome(array_total, nomes.nomes);
                    console.log(final);
                    document.querySelector(".success").innerHTML = '';
                    $('.success').show();
                    $('.success').append("<h5 style='text-align: center;'>Novo ciclo criado com sucesso, <strong>caso atualize a página perdera a visualização do novo ciclo.</strong></h5>")
                    //console.log(nomes);
                    //console.log(ciclos);
                    let conteudo = '{';
                    conteudo += '"ciclos": [';
                    for (let i = 0; i < ciclos.count; i++) {
                        conteudo += JSON.stringify(ciclos.ciclos[i]) + ',';
                    }
                    // acresentando valor do novo ciclo
                    conteudo += JSON.stringify(final);
                    // fim dos ciclos
                    conteudo += '], "count": ' + (ciclos.count + 1);
                    conteudo += '}';
                    //console.log(conteudo);
                    atualizarValores(final);
                    // data = "text/json;charset=utf-8," + encodeURIComponent(conteudo);
                    // var a = document.createElement("a");
                    // document.body.appendChild(a);
                    // a.style = "display: none";
                    // a.href = 'data:' + data;
                    // a.download = "data.json";
                    // a.click();
                });
            });
        });
    } else {
        /* Validação, caso o campo esteja preenchido com valores invalidos */
        document.querySelector(".warning").innerHTML = '';
        $('.warning').show();
        $('.warning').append("<h5 style='text-align: center;'>Por favor, preenha com um valor válido (2-10);</h5>")
    }
}

/* as duas funções abaixo servem para fazer a leitura dos arquivos json, então mostrar os membros e o ciclo atual */
$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/nomes.json", function (data) {
        //console.log(data.nomes);
        if (Math.trunc(data.nomes.length / 4) < (data.nomes.length / 4)) {
            var contador = (Math.trunc(data.nomes.length / 4) + 1);
            var cont = contador;
        } else {
            var contador = (Math.trunc(data.nomes.length / 4));
            var cont = contador;
        }
        //console.log(contador);
        var controlador = 1;
        $(".row-nomes").append("<div class='col-12 col-sm-6 col-md-3 grupo-nomes" + controlador + " space'></div>");
        for (let i = 0; i < data.nomes.length; i++) {
            if (contador == (i)) {
                //console.log(contador + "/" + i);
                contador += cont;
                controlador++;
                $(".row-nomes").append("<div class='col-12 col-sm-6 col-md-3 grupo-nomes" + controlador + " space'></div>");
            }
            //console.log("Nome: " + data.nomes[i]);
            $(".grupo-nomes" + controlador).append("<h2 class='title-membros' >" + data.nomes[i] + "</h2>")
        }
    });
});

$(document).ready(function () {
    $.get("http://127.0.0.1:5500/json/ciclos.json", function (data) {
        //console.log(data.ciclos[data.count - 1][1].length);
        for (let i = 0; i < data.ciclos[data.count - 1].length; i++) {
            $(".row-ciclo").append("<div class='col-12 col-sm-6 col-md-3 grupo" + i + " space'></div>");
            $(".grupo" + i).append("<h3 class='title-grupo' > Grupo " + (i + 1) + "</h3>");
            for (let j = 0; j < data.ciclos[data.count - 1][i].length; j++) {
                $(".grupo" + i).append("<h4 class='title-membros' >" + data.ciclos[data.count - 1][i][j] + "</h4>");
            }
        }
        //$(".container").append("<h2>Nome: "+data[count-1]+"</h2>")
    });
});

