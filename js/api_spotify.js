export const chamar_api = async() =>{
	const clientId = '7791ef48302648919d191376bb5a7cbd';
    const clientSecret = 'eea39935f70c4774b95df7a0b9954e7b';
    let token_promisse = pegarToken(clientId,clientSecret);
    return token_promisse;
}	
export const pegarToken = async (clientId,clientSecret) => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    }).then((value)=>{
        return value;
    });
    const data = await result.json();
    return data.access_token;
}
export const _getGenres = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_BR`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    }).then((value) => {
        return value;
    });
    const data = await result.json();
    return data.categories.items;
}
export const _getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    }).then((value) => {
        return value;
    });

    const data = await result.json();
    // console.log(data.playlists.items)
    return data.playlists.items;
}
export  const _getTracks = async (token, tracksEndPoint) => {
    const limit = 10;
    const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    }).then((value)=>{
        return value;
    });
    const data = await result.json();
    return data.items;
}
