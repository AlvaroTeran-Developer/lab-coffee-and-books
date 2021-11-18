function initMap() {
  const ironhackMAD = {
    lat: 40.3977381,
    lng: -3.690471916,
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: ironhackMAD,
  });

  //// Markers
  getPlaces(map)
    .then((places) => {
      const markers = placeMarkers(map, places);
    })
    .catch((error) => console.log(error));
}

function getPlaces() {
  return axios.get("/api").then((response) => response.data.places);
}

function placeMarkers(map, places) {
  console.log(places);
  const markers = [];
  places.forEach((place) => {
    const center = {
      lat: place.location.coordinates[1],
      lng: place.location.coordinates[0],
    };
    const newMarker = new google.maps.Marker({
      position: center,
      map: map,
      title: place.name,
    });
    markers.push(newMarker);
  });

  return markers;
}
