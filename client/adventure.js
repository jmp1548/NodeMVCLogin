"use strict";

$(document).ready(function() {

    function handleError(message) {
        $("#errorMessage").text(message);
     }
    
    
    $("#addAdventure").on("click", addAdventure);
    $("#addPoint").on("click", addPoint);
    $("#addPost").on("click", addPost);
});
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
function addAdventure(){
       
        if($("#atitle").val() === '') {
            handleError("All fields are required");
            return false;
        }
        console.log("in addAdventure");
        addLocation("adventureForm","a",submitForm);
        return false;
    }
function addPoint(){
        addLocation("pointForm","o",submitForm);
        return false;
    }
function addPost(){
       
        if($("#post").val() === '') {
            handleError("All fields are required");
            return false;
        }
      
        addLocation("postForm","p",submitForm);
        return false;
    }
function submitForm(formName,startL, latitude, longitude){
    console.log("Lat: "+latitude+" Long: "+longitude);
    $("#"+startL+"longitude").val(longitude);
    $("#"+startL+"latitude").val(latitude);
    sendAjax($("#"+formName).attr("action"), $("#"+formName).serialize());
}
   
    
    
    $('.ajaxLoader').hide();
    


function addLocation(formName,startL,callback){
    
    console.log("in location");
        if(formName==="adventureForm"){
            var coords=locations[0];
           }
        else{
           var recent=locations.length-1 ;
           var coords=locations[recent];
           }
        console.log(locations);
       /* if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(show_map);
           // $('.ajaxLoader').show();
        } else { 
            handleError("Geolocation is not supported by this browser.");
        }
        
        function show_map(position) {
            coords=position.coords;
            console.log(coords);
            
        }*/
        console.log("Lat: "+coords.lat+" Long: "+coords.long);
        callback(formName,startL,coords.lat,coords.long);
}


