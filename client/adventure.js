"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
     }
    
    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                //window.location = result.redirect;
                console.log("is returned");
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#addAdventure").on("click", function(e) {
        e.preventDefault();
        
        if($("#alongitude").val() == '' || $("#alatitude").val() == '' || $("#atitle").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#adventureForm").attr("action"), $("#adventureForm").serialize());
        
        return false;
    });
     $("#addPoint").on("click", function(e) {
        e.preventDefault();
        
        if($("#olongitude").val() == '' || $("#olatitude").val() == '' ) {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#pointForm").attr("action"), $("#pointForm").serialize());
        
        return false;
    });
     $("#addPost").on("click", function(e) {
        e.preventDefault();
        
        if($("#plongitude").val() == '' || $("#platitude").val() == '' || $("#post").val() == '') {
            handleError("All fields are required");
            return false;
        }
        console.log($("#postForm").attr("action"));
        sendAjax($("#postForm").attr("action"), $("#postForm").serialize());
        
        return false;
    });
    
    $('.ajaxLoader').hide();
    
    $("#ogetLocations").on('click', function(e){
        e.preventDefault();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_map);
            $('.ajaxLoader').show();
        } else { 
            handleError("Geolocation is not supported by this browser.");
        }
        
        function show_map(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
             $('.ajaxLoader').hide();
            
            $("#olongitude").val(longitude);
            $("#olatitude").val(latitude);
        }
    }); 
$("#agetLocations").on('click', function(e){
        e.preventDefault();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_map);
            $('.ajaxLoader').show();
        } else { 
            handleError("Geolocation is not supported by this browser.");
        }
        
        function show_map(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
             $('.ajaxLoader').hide();
            
            $("#alongitude").val(longitude);
            $("#alatitude").val(latitude);
        }
    });  
$("#pgetLocations").on('click', function(e){
        e.preventDefault();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_map);
            $('.ajaxLoader').show();
        } else { 
            handleError("Geolocation is not supported by this browser.");
        }
        
        function show_map(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
             $('.ajaxLoader').hide();
            
            $("#plongitude").val(longitude);
            $("#platitude").val(latitude);
        }
    });        
});