"use strict";

var map;

function init() {
    var bounds = new google.maps.LatLngBounds();

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
        var marker = new google.maps.Marker({
            position: position,
            animation: google.maps.Animation.DROP,
            map: map
        });
    
         bounds.extend(marker.position);
    }

    map.fitBounds(bounds);

}
window.onload = init;