"use strict";

var map;
var marker;
var poly;
var watchId;
var locations = [];
var watchCount = 0;

var geoOptions = {
    enableHighAccuracy: true
};

function getLocation() {
    if (navigator.geolocation) {
        return navigator.geolocation;
    }
}

function showCoords(position) {
    watchCount++;

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    map.setZoom(30);

    locations.push({
        latlng: new google.maps.LatLng(lat, long),
        lat:lat,
        long:long
    });

    console.log(locations);
    drawNext();
}

function drawNext() {
    var lastElem = locations[locations.length - 1];
    var path = poly.getPath();
    path.push(lastElem.latlng);

    map.panTo(lastElem.latlng);

    var startInfowindow = new google.maps.InfoWindow({
        content: "<h3>Start Position</h3>"
    });

    if (locations.length == 1) {
        var marker = new google.maps.Marker({
            position: locations[0].latlng,
            animation: google.maps.Animation.DROP,
            map: map
        });

        google.maps.event.addListener(marker, 'click', function () {
            startInfowindow.open(map, marker);
        });
    }
}

function geoError(error) {
    //erorr 
    alert('ERROR(' + error.code + '): ' + error.message + " Check if gps is on");
}

function init() {
    window.setInterval(function () {
        if (watchCount <= 2) {
            watchId = navigator.geolocation.watchPosition(showCoords, geoError, geoOptions);
        }
        if (watchCount >= 2) {
            clearWatch(watchId);
            watchCount = 0;
        }
    }, 5000);

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    //watchId = GeolocationThrottle.watchPosition(showCoords, geoError, geoOptions), {
    //  throttleTime: 5000
    ///};

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
    for(var i=0; i<locations.length; i++){
        var lat=locations[i].lat;
        var long=locations[i].long;
        submitForm("pointForm","o",lat,long);
    }
    //console.log(" points saved");
});

window.onload = init;