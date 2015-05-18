"use strict";

var map;
var marker;
var poly;
var locations = [];

function drawMarkers() {
    var startInfowindow = new google.maps.InfoWindow({
        content: "<h3>Start Position</h3>"
    });

    var marker = new google.maps.Marker({
        position: [0].latlng,
        animation: google.maps.Animation.DROP,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function () {
        startInfowindow.open(map, marker);
    });

}

function init() {
    console.log(adventures);
    console.log(adventures[0].latitude);
    console.log(locations);

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

    for (var j = 0; j < adventures.length; j++) {
        locations = [
            adventures[j]
        ];
    }

    for (var i = 0; i < locations.length; i++) {
        var position = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);
        console.log(position);
        var marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            map: map
        });
    }

}
window.onload = init;