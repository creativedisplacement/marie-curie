var gmarkers = [];
var map;
function initialize() {
    var theJSON = $('.jsonContain').text();
    //var centerLondon = new google.maps.LatLng(51.529351, -0.0955119);
    var centerUk = new google.maps.LatLng(54.934, -2.849);
    var mapOptions;
    var mapCanvas = document.getElementById('iya-results-map');

    if (theJSON.length === 0) { // Cold search page
        mapOptions = {
            center: centerUk,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        map = new google.maps.Map(mapCanvas, mapOptions);
    } else {
        theJSON = JSON.parse(theJSON);
        var centerLocation = new google.maps.LatLng(theJSON.centralCoordinates[0], theJSON.centralCoordinates[1]);
        
        mapOptions = {
            center: centerLocation,
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        map = new google.maps.Map(mapCanvas, mapOptions);

        //map.data.addGeoJson(theJSON);

        var infoWindow = new google.maps.InfoWindow();
        var marker;

        //New function to grab third party pins
        var theIcon = '';
        function thirdPartyCheck(isItThirdParty) {

            //The following line doesn't work if you write - 'true', 'false'.
            if (isItThirdParty == true) {
                theIcon = '/Content/images/iya/map-marker-grey.png';
                return theIcon;
            } else if (isItThirdParty == false) {
                theIcon = '/Content/images/iya/map-marker.png';
                return theIcon;
            }
        };



        for (var i = 0, length = theJSON.features.length; i < length; i++) {
            var data = theJSON.features[i],
                latLng = new google.maps.LatLng(data.geometry.coordinates[0], data.geometry.coordinates[1]);
            //initiate marker
            var theDataThird = data.isThirdParty;
            thirdPartyCheck(theDataThird);

            var image = {
                url: theIcon,
                // This marker is 36 pixels wide by 50 pixels tall.
                size: new google.maps.Size(72, 100),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0, 0),
                // The anchor for this image point of the pin
                anchor: new google.maps.Point(18, 50),
                // If scaling down for higher dpi screens
                scaledSize: new google.maps.Size(36, 50)
            };

            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data.type,
                icon: image
            });
            gmarkers.push(marker);

            var contentString;
            (function(marker, data) {
                //This is enough for the sidebar to connect to the map because the javascript in the html connects the click of the li to the marker

                //On marker click, build and show infomarker
                google.maps.event.addListener(marker, 'click', function(e) {
                    contentString = '<p class="someText">' + data.title + '</p><p>' + data.description + '</p><p><a href=\"' + data.link + '\">The link</a></p>';
                    var contentString = '<div class="map-info">' +
                        '<h3 class="h4">' + data.title + '</h3>' +
                        '<div class="info-body margin-half">' +
                        //'<p class="margin-half"><span class="label label-info">Shop</span></p>' +
                        '<address class="milli result-title">' + data.address + '</address>' +
                        '<p class="margin-half milli"><strong>' + data.distance + '</strong></p>' +
                        '<a href=\"' + data.href + '\" ' + 'class="btn btn-primary btn-xs">More details</a>' +
                        '</div>' +
                        '</div>';

                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);

                });

                var theListItem = $('.theFirstCall');
                google.maps.event.addListener(marker, 'click', function(e) {
                    var theClass = (data.theClass);
                    var theListItems = $('#results-list');
                    $(theListItems).find('.map-active-link').removeClass('map-active-link');
                    $(theListItems).find(theClass).addClass('map-active-link');

                    //scroll to view
                    var scrollContainer = $('#results-list'),
                        scrollTo = $('.map-active-link');
                    scrollContainer.animate({
                        scrollTop: scrollTo.offset().top - scrollContainer.offset().top + scrollContainer.scrollTop()
                    });
                    // setTimeout(function() {
                    //     $(theListItems).find(theClass).removeClass('map-active-link');
                    // }, 1000)


                    // on click if theListItems has map-active-link remove and run the function

                    //Could use this:
                    //$('div').addClass('saving').delay(2000).queue(function(){
                    //    $(this).removeClass('saving') 
                    // })

                });

                //end anonymous function
            })(marker, data);


            $('.loopCaller').click(function() {
                google.maps.event.trigger(gmarkers[0], 'click');
            });


        } //End of for loop
    }
} //end initialize


google.maps.event.addDomListener(window, 'load', initialize);


$(document).ready(function() {




//*********************************************************************************************************************************************
// 2 functions to hide the google map and to change the button text
//*********************************************************************************************************************************************

function theShowHider() {
    $('.results-map').slideToggle('slow');
    //uses display: none/block - so the test in checkIfElementIsVisible() is based on that
    // if (event.preventDefault) {
    //     event.preventDefault();
    // } else {
    //     event.returnValue = false;
    // }
    // return false;
}

function checkIfElementIsVisible() {
    if ($('.results-map').css('display') === 'block') {
        setTimeout(function () {
            $('.showHideFunc').text('Show map');
        }, 500);


    } else if ($('.results-map').css('display') === 'none') {

        setTimeout(function () {
            $('.showHideFunc').text('Hide map');
        }, 500)

        $('body').removeClass('result-map-active');

    }
}

$('.showHideFunc').on('click', checkIfElementIsVisible);
$('.showHideFunc').on('click', theShowHider);
$('.showHideFunc').on('click', function () {
    return false;
});


//*********************************************************************************************************************************************





    //*********************************************************************************************************************************************
    // Function to adjust the height of the google map dependant on window size so user knows content is visible below
    //*********************************************************************************************************************************************

    //store the height of the window
    //set the max height of the map as a percentage of the window

var checkHeightofFullViewport = (window.outerHeight);
var checkHeightofVisibleViewport = (document.documentElement.clientHeight);
var mapDesiredHeight = (.40 * checkHeightofVisibleViewport);
    //console.log(checkHeightofFullViewport + ' ' + checkHeightofVisibleViewport + ' ' + mapDesiredHeight);

$('.results-map').css('max-height', mapDesiredHeight + 'px');

    //OR

    //check if certain elements below the map are visible and if they are not, adjust the map height so a portion of them are


    //*********************************************************************************************************************************************







    //*********************************************************************************************************************************************
    // Function to disable the refine button until something is in the search box
    //*********************************************************************************************************************************************

    //on focus, count the amount of characters in the search box and if it is more than 1, then remove the disable class
$('.mapSearchText').bind('input', function () {
    //TO DO - use the dom structure to traverse and find then add/remove class instead of searching the whole dom        //TO DO - use the dom structure to traverse and find then add/remove class instead of searching the whole dom
    var theInputVal = $('.mapSearchText').val().length;
    if (theInputVal > 0) {
        $('.mapSearch').removeClass('disabled');
    } else {
        $('.mapSearch').addClass('disabled');
    }
});



    //*********************************************************************************************************************************************





    //*********************************************************************************************************************************************
    // Function to handle map interactions on smaller screens
    //*********************************************************************************************************************************************

    //If screen is small, hide the map
    //If view on a map is clicked, show map and scroll to that marker

function manageMapSmallScreen() {
    if ($(window).width() < 768) {
        $('.results-map').css('display', 'none');
        //this uses the gmarkers code        
    };

    $('.result-object a.result-btn').on('click', function () {
        event.preventDefault();
        $('.results-map').css('display', 'block');
        $('body').addClass('result-map-active');
        setTimeout(function () {
            $('.showHideFunc').text('Hide map');
        }, 500);

        $(window).scrollTop($('.results-map').offset().top);

        //uses display: none/block - so the test in checkIfElementIsVisible() is based on that
        // if (event.preventDefault) {
        //     event.preventDefault();
        // } else {
        //     event.returnValue = false;
        // }
        // return false;


    });
}

manageMapSmallScreen();






    //*********************************************************************************************************************************************






}); // End document ready
