import { chamar_api,pegarToken,_getGenres,_getTracks,_getPlaylistByGenre} from "./api_spotify.js";
import { nome_local } from "./mapa.js";
let playlists = {};
const date = new Date();
const timestamp = date.getTime();
var div_buscar_playlist = document.querySelector("#page #conteudo .card-body [data-role=salvar_playlist]");	
const montar_playlist = () =>{
    let fechar_div = document.querySelectorAll("#page #conteudo .card-body [data-role]");
    let abrir_div = document.querySelector("#page #conteudo .card-body [data-role=salvar_playlist]");
    abrir_div.style = "block";
    for(let div of fechar_div){
        if(div.getAttribute('data-role')!="salvar_playlist"){
            div.style.display = "none";
        }
    }
}
const buscar_generos = async() =>{
    let campo_buscar_musica = document.querySelector("#page #conteudo .card-body [data-value=campo_buscar_musica]");
    const token_acesso = await chamar_api();
    const listar_generos = await _getGenres(token_acesso);
    let campo_selecionar_genero = document.querySelector("#page #conteudo .card-body [data-id=genero]");
    for(let genero of listar_generos){
        const option = document.createElement("option");
        option.value = genero.id;
        option.text = genero.name;
        option.id = genero.name;
        campo_selecionar_genero.add(option,null);
    }
}
buscar_generos(); 
const buscar_playlist = async()=>{
    var div_carregando_playlist = document.querySelector("#page #conteudo .card-body [data-role=carregando_playlist]");
    div_carregando_playlist.style.display = "block";
    var campo_select = document.querySelector("#page #conteudo .card-body [data-id=genero]");
    var genero = campo_select.options[campo_select.selectedIndex];
    const token_acesso = await chamar_api();
    let genero_id = genero.value;
    console.log("carregando músicas!");
    const listar_musicas_por_genero = await _getPlaylistByGenre(token_acesso,genero_id)
    const musicas_track_indice = Math.floor(Math.random() * 9);
    const listar_playlists = await _getTracks(token_acesso,listar_musicas_por_genero[musicas_track_indice].tracks.href);
    // console.log(listar_playlists);
    div_carregando_playlist.style.display = "none";
    var nova_playlist = Object.assign({},{
        titulo_playlist:'',
        genero_playlist:'',
        link_playlist_spotify:'',
        musicas:new Array(),
        id_musicas:new Array(),
    });
    nova_playlist.titulo_playlist = genero.value;
    // nova_playlist.titulo_playlist = timestamp;
    nova_playlist.genero_playlist = genero.id;
    nova_playlist.link_playlist_spotify = listar_musicas_por_genero[musicas_track_indice].external_urls.spotify;
    for(let i = 0; i < listar_playlists.length; i++){
        nova_playlist.musicas.push(listar_playlists[i].track.name);
        nova_playlist.id_musicas.push(listar_playlists[i].track.id);
    }
    listar_playlists_tela(nova_playlist,campo_select)
}
let clique = 0;
const listar_playlists_tela = async(nova_playlist,campo_select) =>{
    const label_musica = document.querySelectorAll("#page #conteudo .card-body [data-role=salvar_playlist] label");
    const hr_label_musica = document.querySelectorAll("#page #conteudo .card-body [data-role=salvar_playlist] hr");
    const btn_salvar_playlist = document.querySelector("#page #conteudo .card-body [data-id=btn_salvar_playlist]");
    btn_salvar_playlist.style.display = "block";
    if(clique > 0){
        for(let label of label_musica){
            label.remove();        
        }
        for(let hr of hr_label_musica){
            hr.remove();        
        }
    }
    var i = 0;
    for(let playlist of nova_playlist.musicas){
        let label_nome_musica = document.createElement("label");
        label_nome_musica.id = "nome_musica";
        let tag_hr = document.createElement("hr");
        tag_hr.id = "tag_hr";
        let nome_musica = document.createTextNode(playlist);
        label_nome_musica.appendChild(nome_musica);
        div_buscar_playlist.appendChild(label_nome_musica);
        div_buscar_playlist.appendChild(tag_hr);
        campo_select.after(label_nome_musica);
        campo_select.after(tag_hr);
    }
    clique+=1;
    playlists = [nova_playlist];
}
const salvar_playlist = ()=>{
    // localStorage.setItem(timestamp, JSON.stringify(playlists));
    localStorage.setItem(nome_local, JSON.stringify(playlists));
    alert("Playlist salva!");
}
export {montar_playlist,buscar_generos,buscar_playlist,listar_playlists_tela,salvar_playlist}