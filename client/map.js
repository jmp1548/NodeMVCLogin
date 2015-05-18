"use strict";

var map;
var marker;
var poly;
var watchId;
var locations = [];


var geoOptions = {
    enableHighAccuracy: true
};

function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation;
    }
}

function showCoords(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var path = poly.getPath();

    map.setZoom(30);

    locations.push({
        latlng: new google.maps.LatLng(lat, long)
    });

    var startInfowindow = new google.maps.InfoWindow({
        content: "<h3>Start Position</h3><br/><strong>Latitute: </strong><small>" + lat + "</small><br/><strong>Longitude: </strong><small>" + long + "</small>"
    });

    var marker = new google.maps.Marker({
        position: locations[0].latlng,
        animation: google.maps.Animation.DROP,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        startInfowindow.open(map, marker);
    });

    for (var i = 0; i < locations.length; i++) {
        //console.log(locations);
        map.panTo(
            locations[i].latlng
        );
        path.push(locations[i].latlng);
    }
}

function geoError(error) {
    //erorr 
    alert('ERROR(' + error.code + '): ' + error.message);

    //alert("");
}

function init() {
    //setInterval(function () {
    //navigator.geolocation.getCurrentPosition(showCoords, geoError, geoOptions);
    //}, 1000);

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    watchId = GeolocationThrottle.watchPosition(showCoords, geoError, geoOptions), {
        throttleTime: 5000
    };

    var mapOptions = {
        center: {
            lat: 39.828127,
            lng: -98.579404
        },
        zoom: 3,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-div'), mapOptions);

    var polyOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    };

    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
}

function clearWatch(watchId) {
    navigator.geolocation.clearWatch(watchId);
}

$('#endAdventure').on('click', function () {
    clearWatch(watchId);
});

window.onload = init;