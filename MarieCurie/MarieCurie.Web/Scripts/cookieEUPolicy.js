$(document).ready(function() {
    
    checkEUCookieConsent();
    
    function checkEUCookieConsent() {
        var euCookieBannerName = "ec_cookie_banner";
        var cookieDetails = getCookie(euCookieBannerName);
        if (cookieDetails == "") {
            //No Cookie 
            $('#euCookieBanner').show();
        } else {
            //Cookie exist
            $('#euCookieBanner').hide();
        }
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; path=/;" + expires;
    }

    $('#btnEUCookieBanner').click(function (e) {
        var euCookieBannerName = "ec_cookie_banner";

        setCookie(euCookieBannerName, "accepted", 3652);

        $('#euCookieBanner').hide();
    });
});