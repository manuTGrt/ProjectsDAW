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