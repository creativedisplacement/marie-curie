/* For the styleguide to toggle the code */
$(document).ready(function () {

    $('small').append('<div style="color:#fff; position:absolute; top:-2.5px; left:1px;">-</div>');

    $('.boxToggle').click(function () {
        $(this).parent().nextAll('.boxCode').first().toggle().removeClass('hide');
        return false;
    });

    var textCounter = {
        init: function () {

            //Showing an error on pages that don't have this textarea - if required
            $('.textareaCounter').keyup(function () {
                var max = 500;
                var len = $(this).val().length;
                var remainingEl = $(this).nextAll('.chsRemaining');
                if (len >= max) {
                    remainingEl.text(' you have reached the limit');
                } else {
                    var character = max - len;
                    remainingEl.text(character + ' characters left');
                }
            });
        }
    };

    textCounter.init();

    if (isIE() == 8) {
        window.attachEvent("hashchange", shiftWindow);
    } else {
        window.addEventListener('hashchange', shiftWindow);
    }
    

}); // End document ready

function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var shifted = false;

function shiftWindow() {
    if (window.location.hash.length > 0) {
        scrollBy(0, -84);
        shifted = true;
    }
}

$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};

// how to call it (with a 1000ms timeout):
$(window).scrollEnd(function () {
    if (!shifted)
        shiftWindow();
}, 100);

//either on clicking search or on unchecking checkbox run a function
//function: store the value of #search-main and #search-section in variables store the value of the checkboxes in search-checkbox if checked
//Concatenate the 3 values
//if nothing after ? (for the time being), append them to the url
//otherwise if there is something after the ? (for the time being) then remove it then append the
//redirect to the new url
function stripTheUrl() {
    var theUrl = ($(location).attr('href'));
    var theUrlPlusQue = (theUrl);
    if (theUrlPlusQue.indexOf('?') > -1) {
        theUrlPlusQue = theUrlPlusQue.substring(0, theUrlPlusQue.indexOf('?'));
        return theUrlPlusQue;
    }
    else {
        return theUrlPlusQue;
    }
}


function buildAndRedirect() {
    var theSearchMain = $('#search-main').val();
    var theSearchSection = $('#search-section option:selected').val();
    var theCheckboxes = $('input[name=chkboxName]:checked').map(function () { return this.value; }).get();
    var cleanUrl = stripTheUrl() + theSearchMain + theSearchSection + theCheckboxes;
    $('.tempForTest').text(cleanUrl);
    //uncomment the line below to set up the redirect
    // $(location).attr('href', cleanUrl);
}

$('#search-section-submit').focus(buildAndRedirect);
$('input[name=chkboxName]:checked').change(buildAndRedirect);


//A function to reset the checkbox filters on the search pages "Search results for...."
function resetFilters() {
    $('.reset-filters').click(function () {
        $('input[name=chkboxName]').prop('checked', true);
        return false;
    });
}

resetFilters();

//Concertina block, making sure the first child is open.
var $singleAccordionPanels = $('.singleAccordion .panel:nth-child(1)');
$singleAccordionPanels.find('div.panel-collapse').addClass('in');
$singleAccordionPanels.find('a.panel-heading').removeClass('collapsed');


//Geolocation::BCWEB-95
function supports(bool, suffix) {
    var s = "Your browser ";
    if (bool) {
        s += "supports " + suffix + ".";
    } else {
        s += "does not support " + suffix + ". :(";
    }
    return s;
}

//function lookup_location() {
//    geoPosition.getCurrentPosition(show_map, show_map_error);
//}
function show_map(loc) {
    $("#geo-wrapper").css({ 'width': '320px', 'height': '350px' });
    var map = new google.maps.Map(document.getElementById("geo-wrapper"), { zoom: 10, mapTypeControl: true, zoomControl: true, mapTypeId: google.maps.MapTypeId.ROADMAP });
    var center = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
    map.setCenter(center);
    var marker = new google.maps.Marker({ map: map, position: center, draggable: false, title: "You are here (more or less)" });
}
function show_map_error() {
    $("#live-geolocation").html('Unable to determine your location.');
}
//$(function () {
//    if (geoPosition.init()) {
//        $("#live-geolocation").html(supports(true, "geolocation") + ' <a href="#" onclick="lookup_location();return false">Click to look up your location</a>.');
//    } else {
//        $("#live-geolocation").html(supports(false, "geolocation"));
//    }
//});





$('.fotorama__video-close').click(function () {
    $('.fotorama__nav__shaft').toggle();
    $('.fotorama__caption').toggle();
});


//Third party run/triathlon
$(function () {
    $('.to-show').change(function () {
        var $otherOption = $(this).find('option[data-otherfield]').first();
        if ($otherOption.length > 0) {
            var otherFieldClass = $otherOption.data('otherfield');
            var $otherField = $('.form-group.' + otherFieldClass);
            if (otherFieldClass && $otherField.length > 0) {
                if ($(this).val() == $otherOption.val()) {
                    $otherField.addClass('shower');
                } else {
                    $otherField.removeClass('shower');
                }
            }
        }
    });
});


// Checkbox to show/hide supplementary field
$(function () {
    // For single checkbox
    $('.to-show-check input[type=checkbox]').change(function () {
        $(this).closest('.to-show-wrapper').find('.to-show-check-toggle').toggle($(this).prop('checked'));

        // Empty toggled input value
        if ($(this).prop('checked')) {
            $(this).closest('.to-show-wrapper').find('.to-show-check-toggle input').val('');
        }
    });

    // For radio buttons or drop-downs - needs each radio button or select tag to display a data attribute with the "true" toggle value
    $('.to-show-choose input[type=radio], .to-show-choose select').change(function () {
        $(this).closest('.to-show-wrapper').find('.to-show-check-toggle').toggle($(this).val() == $(this).data('truevalue'));

        // Empty the toggled input value if not the truevalue
        if ($(this).val() != $(this).data('truevalue')) {
            $(this).closest('.to-show-wrapper').find('.to-show-check-toggle input').val('');
        }
    });
});

// Check whether to show/hide supplementary field on page load
$(function () {
    $('.to-show-check input[type=checkbox]').each(function() {
        $(this).closest('.to-show-wrapper').find('.to-show-check-toggle').toggle($(this).prop('checked'));
    });

    $('.to-show-choose input[type=radio]').each(function () {
        $(this).closest('.to-show-wrapper').find('.to-show-check-toggle').toggle($(this).prop('checked') && $(this).val() == $(this).data('truevalue'));
    });

    $('.to-show-choose select').each(function () {
        $(this).closest('.to-show-wrapper').find('.to-show-check-toggle').toggle($(this).val() == $(this).data('truevalue'));
    });
});


//Tooltip initialization

$(function () {
    $("[data-toggle='tooltip']").tooltip({
        'container': 'body'
    }).click(function(e) {
        $("[data-toggle='tooltip']").not(this).tooltip('hide');
    });

    // Hide all tooltips on document click which is not a tooltip toggle div
    $(document).click(function(e) {
        if (!$(e.target).is("[data-toggle='tooltip']")) {
            $("[data-toggle='tooltip']").tooltip('hide');
        }
    });
});


/* Prevent unexpected close yamm menu */
$(document).on('click', '.yamm .dropdown-menu', function(e) {
    e.stopPropagation();
});



