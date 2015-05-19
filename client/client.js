"use strict";

$(document).ready(function () {

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
            success: function (result, status, xhr) {

                window.location = result.redirect;
            },
            error: function (xhr, status, error) {
                var messageObj = JSON.parse(xhr.responseText);

                handleError(messageObj.error);
            }
        });
    }

    $("#signupSubmit").on("click", function (e) {
        e.preventDefault();

        if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            $('#user').addClass("error");
            $('#pass').addClass("error");
            $('#pass2').addClass("error");
            return false;
        }

        if ($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            $('#user').removeClass("error");
            $('#pass').addClass("error");
            $('#pass2').addClass("error");
            return false;
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

        return false;
    });

    $("#loginSubmit").on("click", function (e) {
        e.preventDefault();

        if ($("#user").val() == '') {
            handleError("Username is empty");
            $('#user').addClass("error");
            $('#pass').removeClass("error");
            return false;
        }

        if ($("#pass").val() == '') {
            handleError("Password is empty");
            $('#pass').addClass("error");
            $('#user').removeClass("error");
            return false;
        }

        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });
});