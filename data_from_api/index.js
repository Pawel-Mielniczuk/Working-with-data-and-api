/**
 * Leaflet map
 */

const mymap = L.map('mapid').setView([0, 0], 1);

const issIcon = L.icon({
  iconUrl: 'iss200.png',
  iconSize: [38, 95],
  iconAnchor: [25, 16]
});

const marker = L.marker([0,0], {icon: issIcon}).addTo(mymap);


 //
 // Variables for leaflet map
 //

const url = 'https://api.wheretheiss.at/v1/satellites/25544';
const attribution =  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

/**
 * Get cords from api
 * @return Object with latitude and longitude
 */

async function getIssPosition() {
  
  const response = await fetch(url);
  const data = await response.json();
  const {latitude, longitude } = data;

  marker.setLatLng([latitude,longitude]);
  
  return { latitude, longitude };
 
};

getIssPosition();


setInterval(showPosition, 1000) ;


/**
 * Function print position into DOM
 */
async function showPosition() {
  const position = await getIssPosition();
  document.getElementById('lat').textContent = position.latitude.toFixed(2)
  document.getElementById('lon').textContent = position.longitude.toFixed(2)
};