
/** Find the N closest world bank projects */
function nClosest(point, n) {
  // The SQL in english:
  // SELECT (all data) FROM (the table, world_bank_projects)
  // ORDER BY (distance of these geoms from the provided point)
  // LIMIT (to n cases)

  var sqls = 'SELECT * FROM health_centers_1 ORDER BY the_geom <-> ST_SetSRID(ST_point(' + point.lng + ',' + point.lat + '), 4326) LIMIT '+ n   ;
  $.ajax('https://yuntianwan.cartodb.com/api/v2/sql/?q=' + sqls).done(function(newresults) {
    //console.log(n +' closest:', results);
    addRecords(newresults);
 // L.marker([results.point_x, results.point_y]).addTo(map);
  // console.log(newresults.rows);
   for (var i=0; i<1; i++) {

           var lon = newresults.rows[i].x;
            var lat = newresults.rows[i].y;
           //  console.log(results[1]);
             alert('The Nearest Hospital:' +' '+ newresults.rows[i].name +'          '+'('+ newresults.rows[i].y +','+' '+ newresults.rows[i].x+')'+' '+'(See the Green Point on Map)');
             var markerLocation = new L.LatLng(lat, lon);
             markered = new L.circleMarker(markerLocation,{
               Color:'#ffcccc',
               radius:12,
               fillOpacity:0.5,
               Opacity:1,
               weight:1,
               fillColor:'#ccff99'

             });
            map.addLayer(markered);

         }

         var sql = 'SELECT * FROM schools_3 ORDER BY the_geom <-> ST_SetSRID(ST_point(' + point.lng + ',' + point.lat + '), 4326) LIMIT ' + n  ;
         $.ajax('https://yuntianwan.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
           //console.log(n +' closest:', results);
           addRecords(results);
           console.log(results);
        // L.marker([results.point_x, results.point_y]).addTo(map);
          for (var i=0; i<10; i++) {

                  var lon = results.rows[i].x;
                  var lat = results.rows[i].y;
                 //  console.log(results[1]);
                  console.log(lat, lon);
                   var newmarkerLocation = new L.LatLng(lat, lon);
                   var newmarker = new L.circleMarker(newmarkerLocation,{
                     radius:8,
                     fillOpacity:0.25,
                     Opacity:1,
                     weight:0.6
                   });
                  map.addLayer(newmarker);
                  console.log(newmarker);
                  // $(newmarker).click(function(){
                  //   alert (newmarker.)
                  // })
                  // // Reset all markers to original color
                  // var resetMarkers = newmarker._layers.setStyle({color: '#ff7800'});
                  //
                  //   resetMarkers();
                  // // Set up click event for when the user clicks the sidebar
                  // var sidebarClick = newmarker._layers[i].setStyle({color: '#ffffcc'});
                  //   // Reset all markers to original color
                  //
                  //   // Change only the marker with the id matching the sidebar
                  //
                  // // Add items on sidebar
                  //   $('.sidebar').append("<li class='item'  onclick='sidebarClick("+newmarker._layers._leaflet_id+")'>"+newmarker._layers.facilname_label+"</li>");
                }


  // console.log(results.points);

});
 });
}


/** Find all points within the box constructed */
function pointsWithin(rect) {
  // Grab the southwest and northeast points in this rectangle
  var sw = rect[0];
  var ne = rect[2];

 var sql = 'SELECT * FROM incidents_2014 WHERE the_geom @ ST_MakeEnvelope(' +
    sw.lng + ','+ sw.lat + ',' + ne.lng + ',' + ne.lat + ', 4326)';

  $.ajax('https://yuntianwan.cartodb.com/api/v2/sql/?q=' + sql).done(function(results) {
    //console.log('pointsWithin:', results);
    addRecords(results);
  });
}

/**
 * function for adding one record
 *
 * The pattern of writing the function which solves for 1 case and then using that function
 *  in the definition of the function which solves for N cases is a common way to keep code
 *  readable, clean, and think-aboutable.
 */
function addOneRecord(rec) {
  var title = $('<p></p>')
    .text('School Name: ' + rec.facilname_label);
    console.log(rec);
  var location = $('<p></p>')
    .text('Grade level: ' + rec.grade_level);

 var recordElement = $('<li class="item"></li>')
    .addClass('list-group-item')
    .append(title)
    .append(location);
    // .append(button);

  console.log(rec);
  $('#project-list').append(recordElement);


}
/** Given a cartoDB resultset of records, add them to our list */
function addRecords(cartodbResults) {
  $('#project-list').empty();
  _.each(cartodbResults.rows, addOneRecord);
}
