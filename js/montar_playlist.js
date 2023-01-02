const listar_playlists = document.querySelector("#page #conteudo .card-body [data-role=listar_playlists]");
const accordion_playlists = document.querySelector("#page #conteudo .card-body [data-role=listar_playlists]");
let buscar_playlists = [];
const buscar_playlists_salvas = ()=>{
    let criar_titulo_pagina = document.createElement("p");
    criar_titulo_pagina.appendChild(document.createTextNode("Listar playlists"));
    var delChild = accordion_playlists.lastChild;
    while(delChild) {
        accordion_playlists.removeChild(delChild);
        delChild = accordion_playlists.lastChild;
    }
    var valores = Object.keys(localStorage)
    console.log(valores)
    listar_playlists.appendChild(criar_titulo_pagina);
    for (var i = 0; i < valores.length; i++) {
        buscar_playlists.push(localStorage.getItem(valores[i]));
        console.log(JSON.parse(localStorage.getItem(valores[i])));
    }
}
let excluir_playlist = ()=>{
    let chave_local_storage = document.querySelector("#conteudo #btn_excluir_playlist").value;
    // console.log(chave_local_storage)
    localStorage.removeItem(chave_local_storage);
    // localStorage.clear()
    listar_playlists_salvas();
}
export const listar_playlists_salvas =()=>{
    let i = 0;
    buscar_playlists_salvas();
    console.log(buscar_playlists)
    for(i = 0; i < buscar_playlists.length; i++){
        let track = JSON.parse(buscar_playlists[i]);
        let criar_div_acordion = document.createElement("div");
        let criar_acordion_item = document.createElement("div");
        let criar_titulo_acordion = document.createElement("h2");
        let criar_btn_acordion =  document.createElement("button");
        let criar_btn_excluir_musica =  document.createElement("button");
        let criar_texto = document.createTextNode(track[0].titulo_playlist);
        let criar_panel_acordion = document.createElement("div");
        let criar_body_acordion =  document.createElement("div");
        let criar_body_link =  document.createElement("a");
        let criar_quebra_linha = document.createElement("br");
        let criar_body_link_texto = document.createTextNode(track[0].link_playlist_spotify);
        criar_div_acordion.id = "accordionPanelsStayOpenExample";
        criar_div_acordion.className = "accordion";
        criar_div_acordion.style.marginBottom = "12px";
        // criar_div_acordion.style.width = "110%";
        criar_acordion_item.className = "accordion-item";
        criar_titulo_acordion.id = "panelsStayOpen-headingTwo";
        criar_titulo_acordion.className = "accordion-header";
        criar_btn_acordion.type = "button";
        criar_btn_acordion.className = "accordion-button collapsed";
        criar_panel_acordion.id = `panelsStayOpen-collapse${i}`
        criar_panel_acordion.className = "accordion-collapse collapse collapse";
        criar_body_acordion.className = "accordion-body";
        criar_btn_excluir_musica.id = "btn_excluir_playlist";
        criar_btn_excluir_musica.value = track[0].titulo_playlist;
        criar_btn_excluir_musica.className = "btn btn-warning";
        criar_btn_excluir_musica.appendChild(document.createTextNode("Excluir playlist"));
        criar_btn_excluir_musica.addEventListener("click", excluir_playlist);
        criar_btn_acordion.setAttribute("data-bs-toggle", "collapse");
        criar_btn_acordion.setAttribute("data-bs-target", `#panelsStayOpen-collapse${i}`);
        criar_btn_acordion.setAttribute("aria-expanded", "false");
        criar_btn_acordion.setAttribute("aria-controls", `panelsStayOpen-collapse${i}`);
        criar_panel_acordion.setAttribute("aria-labelledby", `panelsStayOpen-heading${i}`);
        criar_btn_acordion.appendChild(criar_texto);
        criar_titulo_acordion.appendChild(criar_btn_acordion);
        criar_acordion_item.appendChild(criar_titulo_acordion);
        criar_div_acordion.appendChild(criar_acordion_item);
        criar_body_link.appendChild(criar_body_link_texto);
        criar_body_link.href = track[0].link_playlist_spotify;
        criar_body_link.style.textDecoration = "none";
        criar_body_link.style.color = "black";
        criar_body_acordion.appendChild(criar_body_link)
        criar_body_acordion.appendChild(criar_quebra_linha);
        criar_body_acordion.appendChild(criar_btn_excluir_musica)
        criar_panel_acordion.appendChild(criar_body_acordion);
        criar_acordion_item.appendChild(criar_panel_acordion);
        listar_playlists.appendChild(criar_div_acordion);
        // console.log(JSON.parse(playlists[i]))
    }
    buscar_playlists = [];
}