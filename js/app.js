var map = L.map('map').setView([-13.51,-71.98], 7); // Cusco

var satellite = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{
  attribution: 'Google Satellite'
}).addTo(map)


// Ventana Emergente
function Info1(feature, layer) {
    if (feature.properties && feature.properties.area_ha) {
        layer.bindPopup("<b>Area_Has: </b>"+feature.properties.area_ha);
    }
}


// Show ba_2020
var jun_juli = L.geoJson(ba_06_08, {
  color:'red',
  onEachFeature: Info1
}).addTo(map)

var agos_sep = L.geoJson(ba_08_10, {
  color:'red',
  onEachFeature: Info1
}).addTo(map)

// Layer Control
var baseMaps = {
    "Google Satellite": satellite
};
var overlayMaps = {
    "Areas Quemadas 01-06-2020 al 01-08-2020": jun_juli,
    "Areas Quemadas 01-08-2020 al 01-10-2020": agos_sep
};

var control = L.control.layers(baseMaps,overlayMaps, {
  collapsed: false,
  autoZIndex: false,
}).addTo(map);

// search bar
var searchControl = new L.esri.Controls.Geosearch({position:'topleft'}).addTo(map);

var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });