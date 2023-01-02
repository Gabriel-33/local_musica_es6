import {chamar_api,pegarToken,_getGenres,_getPlaylistByGenre,_getTracks} from "./api_spotify.js";
import {initMap,chamarInitMap} from "./mapa.js";
import {montar_playlist,buscar_generos,buscar_playlist,salvar_playlist} from './playlist.js';
import { listar_playlists_salvas } from "./montar_playlist.js";
const conteudo_div = document.getElementById("conteudo");
chamarInitMap();
const chamar_funcao = (e,funcao_nome) =>{
  e.preventDefault();
    let chamar_div_funcao = document.querySelector(`#page #conteudo .card-body [data-role='${funcao_nome}']`);
    let campo_busca = document.querySelector("#page #conteudo .card-body [data-role=pac-input]");
    let fechar_divs = document.querySelectorAll("#page #conteudo .card-body [data-role]");
    let btn_confirmar_local = document.querySelector("#page #conteudo .card-body [data-role=btn_ir]");
    let div_texto_infor = document.querySelector("#page #conteudo [data-role=texto_info]");
    let marcar_link_selecionado = document.querySelector(`#menu #item [data-id=${funcao_nome}]`);
    let desmarcar_link_nao_selecionado = document.querySelectorAll(`#menu #item a`);
    for(let item of desmarcar_link_nao_selecionado){
        let item_data_id = item.getAttribute("data-id");
        if(item_data_id!=funcao_nome){
            item.style.color = "white";
        }
    }
    marcar_link_selecionado.style.color = "#1E90FF";
    for(let div of fechar_divs){
        div.style.setProperty('display', 'none', 'important');
    }
    chamar_div_funcao.style.display = "block";
    switch(funcao_nome){
      case 'nova_playlist':
        // desmarcar_btn_salvar_playlist.style.display = "none";
        campo_busca.style.display = "block"
        div_texto_infor.style.display = "block";
        btn_confirmar_local.style.display = "block";
          // alert('nova_playlist');
      break;
      case 'listar_playlists':
        // alert("listar_playlists");
        listar_playlists_salvas();
      break;
      default:
          // alert("default");
      break; 
    }
}
document.querySelector('[data-tag-a=nova_playlist]').addEventListener('click', event => {chamar_funcao(event,"nova_playlist")});
document.querySelector('[data-tag-a=listar_playlists]').addEventListener('click', event => {chamar_funcao(event,"listar_playlists")});
document.querySelector('#page #conteudo .card-body [data-role=btn_ir] button').addEventListener("click", montar_playlist);
document.querySelector('#page #conteudo .card-body [data-id=btn_salvar_playlist]').addEventListener("click", salvar_playlist);
document.querySelector('#page #conteudo .card-body [data-id=genero]').addEventListener("change", buscar_playlist);