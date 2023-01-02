const initMap = async() =>{
  const map = await new google.maps.Map(document.querySelector("[data-role=nova_playlist]"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.querySelector("[data-role='pac-input']");
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  marcar_mapa_pesquisa(searchBox,markers,map)
  cadastrar_nome_local(map);
}
const chamarInitMap = () =>{
  var script = document.createElement('script');
  // script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&libraries=places&v=weekly&signed_in=true';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_API&callback=initMap&libraries=places&v=weekly&signed_in=true';
  script.async = true;
  window.initMap = function() {
      initMap()
  };
  document.head.appendChild(script);
}
var nome_local = "";
var busca_usada = 0;
var clique_usado = 0;
const marcar_mapa_pesquisa = (searchBox,markers,map)=>{
    searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();
    nome_local = places[0].name+"-"+places[0].formatted_address;
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
const cadastrar_nome_local = async(map)=>{
  let geocoder = await new google.maps.Geocoder();
  map.addListener("click", (mapsMouseEvent) => {
  // console.log(nome_local)
  let cordenadas = mapsMouseEvent.latLng.toJSON();
  // console.log(cordenadas);
  geocoder.geocode({ location: cordenadas }).then((response) => {
      if (response.results[0]) {
        // console.log(response.results)
        nome_local = response.results[0].formatted_address;
        // alert(nome_local)
      } else {
        window.alert("No results found");
      }
    }).catch();
  });
}
export {initMap,chamarInitMap,nome_local}