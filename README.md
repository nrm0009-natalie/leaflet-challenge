# Leaflet Challenge - Visualizing Earthquake Data with Leaflet

The goal of this project was to present an interactive map visualization of United States Geological Survey (USGS) earthquake data within a web page. The baseline data covered the time span of a week - January 14, 2020 to January 20, 2020 - and was provided in GeoJSON format. Leaflet was utilized within JavaScript to import and process the data, as well as generating the required visualization.

## Assignment:

Find and depict all of the earthquakes recorded by USGS within the past week on a map of the US. 

## Steps:

1. Import GeoJSON Data
2. Extract the location, magnitude, and timestamp of each earthquake event.
3. For each earthquake event, create a circle marker whose size and color change dynamically with the event's magnitude.
4. Create a pop-up box that displays the location, magnitude, and timestamp information for each event.
5. Import two map layers (dark and streetmap) from the Mapbox API.
6. Link the map layers, circle markers, and pop-up boxes together to create an interactive map.
7. Create a legend for the circle marker color scale and add it to the interactive map.

## Earthquake Data
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

## Visualization

![Earthquake-Visualization] (image_of_map.png)
