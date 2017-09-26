
// Leaflet map setup
var map = L.map('map', {
  center: [40.0056, -75.1542],
  zoom: 13
});

//
//
// var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   subdomains: 'abcd',
//   minZoom: 0,
//   maxZoom: 20,
//   ext: 'png'
// }).addTo(map);

// Leaflet map setup


var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

var CARTOCSS = [
  'Map {',
  '-torque-frame-count:128;',
  '-torque-animation-duration:50;',
  '-torque-time-attribute:"dispatch_date";',
  '-torque-aggregation-function:"count(cartodb_id)";',
  '-torque-resolution:8;',
  '-torque-data-aggregation:linear;',
  '}',

  '#incidents_2014_copy{',
    'comp-op: lighter;',
    'marker-fill-opacity: 0.9;',
    'marker-line-color: #A53ED5;',
    'marker-line-width: 0.5;',
    'marker-line-opacity: 0.9;',
    'marker-type: ellipse;',
    'marker-width: 4.5;',
    'marker-fill: #7B00B4;',
  '}',
  '#incidents_2014_copy[frame-offset=1] {',
   'marker-width:6.5;',
   'marker-fill-opacity:0.45;',
  '}',
  '#incidents_2014_copy[frame-offset=2] {',
   'marker-width:8.5;',
   'marker-fill-opacity:0.225;',
  '}',
  '#incidents_2014_copy[frame-offset=3] {',
  ' marker-width:10.5;',
   'marker-fill-opacity:0.15;',
  '}',
  ].join('\n');

//   map.on('click', function(k) {
//     // var newType = k.layerType;
//     // var newLayer = k.layer;
//       L.circleMarker(k.latlng).addTo(map);
//          nNearest(k.latlng, 1);
//       console.log(k.latlng);
//
// });
//

// Leaflet draw setup
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);


// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  },
  draw: {
    polyline: false,
    polygon: false,
    circle: false
  }
});

// Handling the creation of Leaflet.Draw layers
// Note here, the use of drawnLayerID - this is undoubdtedly the way you should approach
//  remembering and removing layers
var drawnLayerID;
map.addControl(drawControl);
map.on('draw:created', function (e) {
  $('#shuoming').hide();
  var type = e.layerType;
  var layer = e.layer;
  //console.log('draw created:', e);
  var myIcon = L.icon({

});
  if (type === 'marker') {
    // Change the 5 here to alter the number of closest records returned!
    nClosest(layer._latlng, 10);
  } else if (type === 'rectangle') {
    pointsWithin(layer._latlngs);
  }





  if (drawnLayerID) { map.removeLayer(map._layers[drawnLayerID]); }
  map.addLayer(layer);
  drawnLayerID = layer._leaflet_id;
});




var layerUrl = 'https://yuntianwan.cartodb.com/api/v2/viz/bdd1ee4c-0bbf-11e6-93bb-0e787de82d45/viz.json';
// var layerUrl = 'https://yuntianwan.cartodb.com/api/v2/sql/?q=';


// Use of CartoDB.js
cartodb.createLayer(map, layerUrl)
 .addTo(map)
 .on('done', function(layer) {
   // layer is a cartodb.js Layer object - can call getSubLayer on it!
   // console.log(layer);
   layer.on('featureClick', function(e, latlng, pos, data) {
     // nClosest(latlng[0], latlng[1], 10);
     // console.log(e, latlng, pos, data);
   });
 }).on('error', function(err) {
   // console.log(err):
 });



$('#project-list').click( function(e){
  console.log(e);
});
 // var torqueLayer = new L.TorqueLayer({
 //   user: 'yuntianwan',
 //   cartocss: CARTOCSS
 // });
 // torqueLayer.addTo(map);

 // On timechange, update the HTML which hovers over the upper right of the map

   //put torque layer on the top of basemaps
   cartodb.createLayer (map, 'https://yuntianwan.cartodb.com/api/v2/viz/2a8740c8-1480-11e6-9398-0e31c9be1b51/viz.json')
   .addTo(map)
   .done(function(layer){
     // do stuff
   })
   .error(function(err){
     console.log("Error:" + err);
   });


// window.onload=main;


//  var myGeoJson;
//
// var leafletLayers;
//
// var geojsonMarkerOptions = {
//   color: 'green'
// };
//
// var url = "http://data.phl.opendata.arcgis.com/datasets/d46a7e59e2c246c891fbee778759717e_0.geojson";
//
// $.ajax(url).done(function(data){
//   myGeoJson = JSON.parse(data);
//   leafletLayers = L.geoJson(myGeoJson, {
//     pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng, geojsonMarkerOptions);
//     }
//   });
//   leafletLayers.addTo(map);
// });
//
// var styleMarkers = function(closestPoints) {
//   var artIds = _.map(closestPoints, function(point) {
//     return point.properties.ArtID;
//   });
//   _.each(leafletLayers._layers, function(layer, index) {
//     if (_.contains(artIds, layer.feature.properties.ArtID)) {
//       layer.setStyle({color: 'orange', radius: 25});
//     }
//     else {
//       layer.setStyle({color: 'green', radius: 10});
//     }
//   });
// };
//
// var getClosestPoints = function(e) {
//   var allJson = _.clone(myGeoJson);
//   var point = {
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [e.latlng.lng, e.latlng.lat]
//     }
//   };
//   var closest = [];
//   for (var i=1; i < 10; i++) {
//     near = turf.nearest(point, allJson);
//     closest.push(near);
//     allJson = {type: "FeatureCollections", features: _.without(allJson.features, near)};
//   }
//   return closest;
// };
//
// map.on('mousemove', function(e) {
//   var closestPoints = getClosestPoints(e);
//   styleMarkers(closestPoints);
// });
