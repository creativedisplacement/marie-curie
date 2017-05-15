$(document).ready(function () {
    // Event external registration form link click tracking
    $('a.external-registration').click(function () {
        ga('universalTracker.send', 'event', 'Event Register_3rd Party Site', 'Button Click', 'Register Now_Event 3rd Party Site');
    });
});