$(document).bind("pagebeforeshow", function () {
    setTheme();
    
});
//
$(document).on('click', '#submit', function () {
    var tema = $('#tema').val();
    localStorage.setItem("tema", tema); // Retrieve
    setTheme();
});

function setTheme() {
    
    var temares = localStorage.getItem("tema");
    
    $.mobile.activePage.find('.ui-btn')
            .removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e')
            .addClass('ui-btn-up-' + temares)
            .attr('data-theme', temares);
    //reset the header/footer widgets
    $.mobile.activePage.find('.ui-header, .ui-footer')
            .removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e')
            .addClass('ui-bar-' + temares)
            .attr('data-theme', temares);
    //reset the page widget
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e')
            .addClass('ui-body-' + temares)
            .attr('data-theme', temares);
}

$( document ).on( "pageinit", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});