"use strict";

var map;
//var startInfowindow;
var marker;
var titles;
var ids;

function init() {
    var bounds = new google.maps.LatLngBounds();

    console.log(adventures);

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

    for (var i = 0; i < adventures.length; i++) {
        var position = new google.maps.LatLng(adventures[i].latitude, adventures[i].longitude);
        console.log(position);
        marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            map: map,
        });
        var startInfoWindow = new google.maps.InfoWindow();
        var content = "<h1>" + adventures[i].title + "</h1><br/><small><a href=/pastadventure/" + adventures[i]._id + ">Click to see " + adventures[i].title + "</a></small>";
        //startInfowindow = new google.maps.InfoWindow({
        //  content: content
        //});
        google.maps.event.addListener(marker, 'click', function (content) {
            return function () {
                startInfoWindow.setContent(content);
                startInfoWindow.open(map, this);
            }
        }(content));

        bounds.extend(marker.position);
    }
    map.fitBounds(bounds);
}

window.onload = init;