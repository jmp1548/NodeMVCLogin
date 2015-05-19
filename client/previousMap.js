"use strict";

var map;
var marker;
var poly;
var path;
var position = [];


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

function init() {
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
    path = poly.getPath();
    
    for (var i = 0; i < adventures.length; i++) {
        var position = new google.maps.LatLng(adventures[i].latitude, adventures[i].longitude);
        console.log(position);
        path.push(position);
        //bounds.extend(marker.position);
    }

    poly.setPath(path);
}

window.onload = init;