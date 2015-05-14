"use strict";

var map;
var marker;
var poly;

var geoOptions = {
    maximumAge: 10000,
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
    var locations = [];
    
    map.setZoom(30);
    
    locations.push({
        latlng: new google.maps.LatLng(lat, long)
    });

    var infowindow = new google.maps.InfoWindow({
        content: "<div>" + lat + "</div>"
    });

    for (var i = 0; i < locations.length; i++) {
        console.log(locations[i].latlng);
        var marker = new google.maps.Marker({
            position: locations[i].latlng,
            map: map
        });
        map.panTo(
            locations[i].latlng
        );
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        path.push(locations[i].latlng);
    }
}

function geoError() {
    //erorr   
}

function init() {
    setInterval(function () {
        navigator.geolocation.getCurrentPosition(showCoords, geoError, geoOptions);
    }, 1000);

    var mapOptions = {
        center: {
            lat: 39.828127,
            lng: -98.579404
        },
        zoom: 3,
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

window.onload = init;