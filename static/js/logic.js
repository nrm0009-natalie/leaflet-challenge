// Store the API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once response is returned, send the json data to the createFeatures function
  createFeatures(data);
});

// function to create markers and popups (eathquakeData is the placeholder)
function createFeatures(earthquakeData) {

//   var geojsonMarkerOptions = {

// };

  // Create a variable that holds the GeoJSON layer containing our json data
  var earthquakes = L.geoJSON(earthquakeData, {
// use "pointToLayer" from leaflet, which allows us to customize the markers being created by geoJSON
// "feature" accesses the features object, and "latlng" represents the geometry object which geoJSON automatically searches for within each feature
    pointToLayer: function (feature, latlng) {
        console.log(feature);
// create if statement that changes the size and color of the circle markers based on the magnitue of the earthquake
        if (feature.properties.mag >=5) {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 7,
            fillColor: "#241C6C",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.5 
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
        }

        else if (feature.properties.mag >=4) {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 6,
            fillColor: "#3C28A1",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6 
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")}

        else if (feature.properties.mag >=3) {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 6,
            fillColor: "#2B4EA1",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")}

        else if (feature.properties.mag >=2) {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 6,
            fillColor: "#3DCAB7",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")}

        else if (feature.properties.mag >=1) {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 6,
            fillColor: "#5ECA37",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")}

        else {
            return L.circleMarker(latlng, {
            radius: feature.properties.mag * 6,
            fillColor: "#B7E145",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 1.0
        })
        .bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")};

        }
    });
  

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
};


// function that will create map and all layers
function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
        38.2544, -104.6091
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});


//   create a separate legend for the marker colors
  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = ["5+", "4-5", "3-4", "2-3", "1-2", "0-1"],
          labels = ["#241C6C", "#3C28A1", "#2B4EA1", "#3DCAB7", "#5ECA37", "#B7E145"];
  
      // loop through our intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + labels[i] + '"></i> ' + grades[i] + '<br>'};
  
      return div;
  };
  
  legend.addTo(myMap);

}
