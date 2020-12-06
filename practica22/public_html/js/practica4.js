/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* dibujo el menu*/

let menu = [{name: "Inicio", url: "index.html", options: []},
            {name: "Categorías", url: "categorias.html", options: [{name: "Suvs", url: "categorias.html#suvs", options: []},
                                        {name: "Berlinas", url: "categorias.html#berlinas", options: []},
                                        {name: "Todoterrenos", url: "categorias.html#todoterrenos", options: []}]},
            {name: "Artículos", url: "articulos.html", options: []},
            {name: "Formulario", url: "formulario.html", options: []}
];
        
let menuHTML = '<ul class="menu">';

for (let i in menu){
    menuHTML += "<li> <a href='" + menu[i].url + "'>" + menu[i].name + "</a>";
    for (let j in menu[i].options){
        if(j==0){
            menuHTML += "<ul>";
        }
        menuHTML += "<li class='clear'> <a href='" + menu[i].options[j].url + "'>" + menu[i].options[j].name + "</a>";
        for (let k in menu[i].options[j].options) {
            if (k == 0) {
                menuHTML += "<ul>";
            }
            menuHTML += "<li><a>" + menu[i].options[j].options[k] + "</a></li>";
            if (k == menu[i].options[j].options.length - 1) {
                menuHTML += "</ul>";
            }
        }
        menuHTML += "</li>";
        if(j==menu[i].options.length -1){
            menuHTML += "</ul>";
        }
    }
    menuHTML += "</li>";
}
menuHTML += "</ul>";

let nav = document.getElementsByTagName("nav")[0];
nav.innerHTML=menuHTML;

/*Termino de dibujar el menu*/

/*Cambio de color de la fila de la celda precio*/

function cambiacolor(){
    let precio = document.getElementsByClassName("precio");
    let fila=precio.parentNode;
    fila.className="RedAndWhite";
}

/*Termino de cambiar el color de la celda precio*/

/*Select y codigo postal*/
let prov = document.getElementById("prov");

window.onload = function () {
    let provincias = new Array("Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Baleares", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba", "Coruña", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipuzcoa", "Huelva", "Huesca", "Jaén", "León", "Lleida", "Rioja", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Asturias", "Palencia", "Las Palmas", "Pontevedra", "Salamanca", "Tenerife", "Cantabria", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla");
    for (let p in provincias) {
        prov.options[p] = new Option(provincias[p], p);
    }
};


/* Asignar provincia al introducir el Código Postal */

let cp = document.getElementById("cp");
cp.onchange = function () {
    let opciones = document.getElementsByTagName("option");
    
    let cpProv = parseInt(cp.value.substr(0, 2));

    for (let op of opciones) {
        if(op.hasAttribute("selected")) {
            op.removeAttribute("selected");
        }
        if (op.value == cpProv - 1) {
            op.setAttribute("selected", "");
        }
    }
};
/*termino select y codigo postal*/