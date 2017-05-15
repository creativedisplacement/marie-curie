//== Global variables =======================//
//===========================================//

//== Window height and width
//
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//== View ports
//
//* Large
var screenLgMax = 1500;
var screenLgMin = 1200;
//* Medium
var screenMdMax = (screenLgMin - 1);
var screenMdMin = 992;
//* Small
var screenSmMax = (screenMdMin - 1);
var screenSmMin = 768;
//* Extra small
var screenXsMax = (screenSmMin - 1);
var screenXsMin = 480;


//== Functions ==============================//
//===========================================//

//== In your area functions 
//
//* Set height of In your area search and scroll to form
function setHeight_IYA() {

    //* Set the height of the search results
    // Subtract height of affixed header, <h1>, .panel-heading and bottom margin
    var iyaHeight = (windowHeight - 253);

    $('.results-list-container, .results-scroll').height(iyaHeight);

} // setHeight_IYA()

//* Scroll to search form
function scrollToForm_IYA() {

    //* Scroll to search form with offset
    $('#location, #txtSearchKeyWord').focus(function () {

        var target = $('.search-iya');
        if (target.length) {
            var top_offset = 90;
            $('html,body').animate({
                scrollTop: target.offset().top - top_offset
            }, 200);
            return false;
        }

    });

} // scrollToForm_IYA()


//== Useful interface functions

//* Scroll to any element on page with the .scrollTo class
function scrollToTarget() {

    var target = $('.scrollTo').filter(':first');
    if (target.length) {
        var top_offset = 90;
        $('html,body').delay(500).animate({
            scrollTop: target.offset().top - top_offset
        }, 500);
        return false;
    }

} //scrollToTarget()

//==== javaScript for design ===//

$(document).ready(function () {

    //== Off canvas menu button
    //
    //* Toggle active class on menu button
    $('#off-canvas-open, #off-canvas-close, #off-canvas-close-after').click(function () {
        $('body').toggleClass('off-canvas-active');
    });

    //== Toggle off canvas jump menu in Brand lab
    //    
    //* Toggle open and close classes on menu
    $('#jump-menu-open, #jump-menu-close').click(function () {
        $('.container-jump-menu').toggleClass('jump-menu-active');
        $('.container-jump-menu').toggleClass('jump-menu-hidden');
    });

    //* Affix primary navigation on scroll (medium and large screens only)
    $('#affix-header').affix({
        offset: {
            top: 64
        }
    });

    //* Add class to .off-canvas to add padding when header is affixed
    $('.off-canvas').addClass('affixed');

    //== IYA v2 off canvas filters
    //    
    //* Toggle filters active class
    $('#results-filters-toggle').click(function () {
        $('body').removeClass('off-canvas-active');
        $('body').addClass('results-filters-active');
    });
    //* Toggle filters active class
    $('#results-list-toggle').click(function () {
        $('body').removeClass('results-filters-active');
    });


    //== In your area search 
    //
    //* If screen is small and up
    //* Set height of In your area search and scroll to form
    if (windowWidth >= screenSmMin) {

        scrollToForm_IYA();
        setHeight_IYA();

    }

    $(window).resize(setHeight_IYA());

    //* Prevent click function on filters 
    $('#filters-toggle').click(function (event) {
        event.preventDefault();
    });

    if (!$('.search-iya').hasClass('.iya-cold')) {

        //* Add class toggle class to filters
        $('#filters-toggle').click(function (event) {
            //event.preventDefault();
            $('#filters-collapse').slideToggle(200);
            $('#results-list').slideToggle(200);
            $('.results-list-container').toggleClass('filters-active');
            $('#results-filters .filters-footer').delay(200).fadeToggle(200);
            $('#filters-toggle .fa-toggle .fa').toggleClass('fa-angle-up');
            $('#filters-toggle .fa-toggle .fa').toggleClass('fa-angle-down');
        });

    }

    //* Add class toggle class to body for map view        
    $('.map-toggle').click(function (event) {
        event.preventDefault();
        $('body').toggleClass('map-active');
    });

    //* Else is In your area and not a cold search   
    //} else if ( !$('.search-iya').hasClass('iya-cold') ) {

    //* Scroll to element on page load using the .scrollTo class
    scrollToTarget();


 //Function to show/hide the helpline tab based on the visibility of the helpline at the top of the page

    $(window).scroll(function () {

        if ($('.helpline').visible(true) === false) {
            $('.helpline-fixed').show();
        } else {
            $('.helpline-fixed').hide();
        }

    });




});

// End design jQuery

// function countCSSRules() {
//     var results = '',
//         log = '';
//     if (!document.styleSheets) {
//         return;
//     }
//     for (var i = 0; i < document.styleSheets.length; i++) {
//         countSheet(document.styleSheets[i]);
//     }
//     function countSheet(sheet) {
//         var count = 0;
//         if (sheet && sheet.cssRules) {
//             for (var j = 0, l = sheet.cssRules.length; j < l; j++) {
//                 if (!sheet.cssRules[j].selectorText) {
//                     if (sheet.cssRules[j].cssRules) {
//                         for (var m = 0, n = sheet.cssRules[j].cssRules.length; m < n; m++) {
//                             if(sheet.cssRules[j].cssRules[m].selectorText) {
//                                 count += sheet.cssRules[j].cssRules[m].selectorText.split(',').length;
//                             }
//                         }
//                     }
//                 }
//                 else {
//                     count += sheet.cssRules[j].selectorText.split(',').length;
//                 }
//             }

//             log += '\nFile: ' + (sheet.href ? sheet.href : 'inline <style> tag');
//             log += '\nRules: ' + sheet.cssRules.length;
//             log += '\nSelectors: ' + count;
//             log += '\n--------------------------';
//             if (count >= 4096) {
//                 results += '\n********************************\nWARNING:\n There are ' + count + ' CSS rules in the stylesheet ' + sheet.href + ' - IE will ignore the last ' + (count - 4096) + ' rules!\n';
//             }
//         }
//     }
//     console.log(log);
//     console.log(results);
// };
// countCSSRules();
