/**
 * Created by HKoehler on 3/17/17.
 */

"use strict";
(function(){

    // ---- DEFAULT: San Antonio Weather Data ------------------------------//
    var weatherData = $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
        APPID: "1aa73ecf55c9a516cfc7ffeb4fb3613f",
        q: "San Antonio, TX",
        units: "imperial",
        cnt: 3
    });

    // ----- DEFAULT: Weather Data .done Function ----------------------------------//
    weatherData.done(function (data) {

        console.log("Data Retrieved!")
        console.log(data);

        // put name of city into header
        $('#cityName').text(data.city.name);

        // put number of days into header
        $('#dayCount').text(data.cnt);

        // do this for each day
        var days = '';

        data.list.forEach(function (obj) {
            days +=
                "<div class='dayDiv col-xs-4 col-sm-12 col-md-12'>"
                    + "<h5 class='dateText'>" + moment.unix(obj.dt).format("ddd, MM-DD-YYYY") + "</h5>"
                    + "<div id='highLowDiv'>"
                        + "<p id='highLow'>"
                            + "<span id='high'>" + Math.round(obj.temp.max) + "&deg</span>"
                            + " <span id='low'>" + Math.round(obj.temp.min) + "&deg" + "</span>"
                        + "</p>"
                    + "</div>" //end of high low div //
                    + "<div id='bottomBlock'>"
                        + "<div id='conditionsDiv'>"
                            + "<p id='conditions'>" + obj.weather[0].main + " ( " + obj.weather[0].description + " )</p>"
                            + "<p id='humidity'>Humidity: " + obj.humidity + " %</p>"
                            + "<p id='pressure'>Pressure: " + obj.pressure + "</p>"
                        + "</div>" // end of conditions div //
                        + "<div id='iconDiv'>"
                            + "<img id='icon' src='http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png'>"
                        + "</div>" // end of icon div
                    + "</div>" // end of bottom block //
                + "</div>"; // end of day div //

            $('#forecastDiv').html(days);
        });
    }); // -------- end of weatherData.done function


    $('#cityStateBtn').click(function () {

        var newCity = $('#cityState').val();

        $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
            APPID: "1aa73ecf55c9a516cfc7ffeb4fb3613f",
            q: newCity,
            units: "imperial",
            cnt: 3
        }).done(function (data) {

            // put name of city into header
            $('#cityName').text(data.city.name);

            // put number of days into header
            $('#dayCount').text(data.cnt);

            // var date = moment.unix(obj.dt);
            var days = '';

            data.list.forEach(function (obj) {
                days +=
                    "<div class='dayDiv col-xs-4 col-sm-12 col-md-12'>"
                    + "<h5 class='dateText'>" + moment.unix(obj.dt).format("ddd, MM-DD-YYYY") + "</h5>"
                    + "<div id='highLowDiv'>"
                    + "<p id='highLow'>"
                    + "<span id='high'>" + Math.round(obj.temp.max) + "&deg</span>"
                    + " <span id='low'>" + Math.round(obj.temp.min) + "&deg" + "</span>"
                    + "</p>"
                    + "</div>" //end of high low div //
                    + "<div id='bottomBlock'>"
                    + "<div id='conditionsDiv'>"
                    + "<p id='conditions'>" + obj.weather[0].main + " ( " + obj.weather[0].description + " )</p>"
                    + "<p id='humidity'>Humidity: " + obj.humidity + " %</p>"
                    + "<p id='pressure'>Pressure: " + obj.pressure + "</p>"
                    + "</div>" // end of conditions div //
                    + "<div id='iconDiv'>"
                    + "<img id='icon' src='http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png'>"
                    + "</div>" // end of icon div
                    + "</div>" // end of bottom block //
                    + "</div>"; // end of day div //

                $('#forecastDiv').html(days);
            });

            // clear input value
            $('#cityState').val('')
        });

    }); // end of cityStateBtn click function

    // ----- MAP OPTIONS ----------------------------------------------------//
    var mapOptions = {
        disableDoubleClickZoom: true,
        // ZOOM LEVEL
        zoom: 4,
        // DEFAULT CENTER [SA,TX]
        center: {
            lat: 29.42412,
            lng: -98.493629
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: false,
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: false,
        scrollwheel: false,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    };


    // ---- RENDER MAP -----------------------------------------------------//
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


    // ---- DEFAULT: CREATE MARKER ---------------------//
    var marker = new google.maps.Marker({
        position: {
            lat: 29.42412,
            lng: -98.493629
        },
        map: map,
        animation: google.maps.Animation.DROP,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
        // var dragLat = marker.getPosition().lat();
        // var dragLng = marker.getPosition().lng();

        var dragLat = event.latLng.lat().toFixed(3);
        var dragLng = event.latLng.lng().toFixed(3);

        console.log(dragLat);
        console.log(dragLng);

        var updateFromMap = $.get("http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + dragLat + "&lon=" + dragLng + "&cnt=3", {
            APPID: "1aa73ecf55c9a516cfc7ffeb4fb3613f",
            // lat: dragLat,
            // lng: dragLng,
            units: "imperial",
            // cnt: 3
        });

        updateFromMap.done(function (data) {

            // put name of city into header
            $('#cityName').text(data.city.name);

            var days = '';

            data.list.forEach(function (obj) {
                days +=
                    "<div class='dayDiv col-xs-4 col-sm-12 col-md-12'>"
                    + "<h5 class='dateText'>" + moment.unix(obj.dt).format("ddd, MM-DD-YYYY") + "</h5>"
                    + "<div id='highLowDiv'>"
                    + "<p id='highLow'>"
                    + "<span id='high'>" + Math.round(obj.temp.max) + "&deg</span>"
                    + " <span id='low'>" + Math.round(obj.temp.min) + "&deg" + "</span>"
                    + "</p>"
                    + "</div>" //end of high low div //
                    + "<div id='bottomBlock'>"
                    + "<div id='conditionsDiv'>"
                    + "<p id='conditions'>" + obj.weather[0].main + " ( " + obj.weather[0].description + " )</p>"
                    + "<p id='humidity'>Humidity: " + obj.humidity + " %</p>"
                    + "<p id='pressure'>Pressure: " + obj.pressure + "</p>"
                    + "</div>" // end of conditions div //
                    + "<div id='iconDiv'>"
                    + "<img id='icon' src='http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png'>"
                    + "</div>" // end of icon div
                    + "</div>" // end of bottom block //
                    + "</div>"; // end of day div //

                $('#forecastDiv').html(days);
            });
        });
    });

})();



//
// Extra Challenges:
//     1) Allow the user to double click the map to drop a pin, allowing them to display the weather data wherever they drop the pin.
// 2) Try creating an event to reflect the weather, in the background of the page, for the area we are currently searching.
//     Hint: try using the conditions inside of data.list.weather[0].main this should give you conditions that you can trigger off of.
// 3) Allow the user to select the number of days they want to see a forecast for.
// Hint: this will require a second form input.
// 4) Try using GoogleMaps API to provide predictive text options in your search bar
// 5) Let the user drop multiple map markers with content tags to specify the weather data for the area where the map marker was dropped.