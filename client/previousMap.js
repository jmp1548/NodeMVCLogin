"use strict";

var map;
var marker;
var poly;
var path;
var position = [];

function init() {
    console.log(points)

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

    var startingPosition = new google.maps.LatLng(adventures[0].latitude, adventures[0].longitude);
    marker = new google.maps.Marker({
        position: startingPosition,
        animation: google.maps.Animation.DROP,
        map: map,
    });

    var startInfowindow = new google.maps.InfoWindow({
        content: "<h3>Starting Position</h3>"
    });
    google.maps.event.addListener(marker, 'click', function () {
        startInfowindow.open(map, this);
    });

    for (var j = 0; j < points.length; j++) {
        var position = new google.maps.LatLng(points[j].latitude, points[j].longitude);
        console.log(position);
        marker = new google.maps.Marker({
            position: position,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5
            },
            animation: google.maps.Animation.DROP,
            map: map,
            info: content
        });
        var content = "<h3>" + points[j].content + "</h3>";
        var Infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', function (content) {
            return function () {
                Infoindow.setContent(content);
                Infoindow.open(map, this);
            }
        }(content));
    }

    poly = new google.maps.Polyline(polyOptions);
    poly.setMap(map);
    path = poly.getPath();
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < adventures.length; i++) {
        var position = new google.maps.LatLng(adventures[i].latitude, adventures[i].longitude);
        console.log(position);
        path.push(position);
        bounds.extend(position);
    }

    map.fitBounds(bounds);
    poly.setPath(path);
}

window.onload = init;