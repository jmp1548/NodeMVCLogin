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
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);
            
                handleError(messageObj.error);
            }
        });        
    }
    
    $("#setLocations").on("click", function(e) {
        e.preventDefault();
        
        if($("#longitude").val() == '' || $("#latitude").val() == '') {
            handleError("All fields are required");
            return false;
        }

        sendAjax($("#locationsForm").attr("action"), $("#locationsForm").serialize());
        
        return false;
    });
    
    $('.ajaxLoader').hide();
    
    $("#getLocations").on('click', function(e){
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
            
            $("#longitude").val(longitude);
            $("#latitude").val(latitude);
        }
    });    
});