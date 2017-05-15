function ReplaceAll(data, stringToFind, stringToReplace) {
    var temp = data;
    var index = temp.indexOf(stringToFind);
    while (index != -1) { temp = temp.replace(stringToFind, stringToReplace); index = temp.indexOf(stringToFind); }
    return temp;
};
//Inject JQuery
//Filter all http and https requests
//Filter if teh site links to host domain
//Bind the click event and inject analytic tag
$(document).ready(function () {

    //redirect to search page
    $('.SearchBox_SearchButton').click(function (event) {
        if ($('.SearchBox_SearchText').val() != "") {
            //cater for localhost version
            if (location.hostname.indexOf('localhost') != -1) { window.location = "/cms/Marie-Curie-Search?searchstr=" + $('.SearchBox_SearchText').val(); }
            else { window.location = "/Marie-Curie-Search?searchstr=" + $('.SearchBox_SearchText').val(); }
        }

        // don't process form submission
        event.preventDefault();
    });

    //apply google tag to external hyperlinks including pdfs and docs
    //and to internal download links including those in sub-domains
    //**************************************
    var filetypes = /\.(zip|exe|pdf|docx?|xlsx?|pptx?|mp3)$/i;

    $('a').each(function () {
        try {
            var href = $(this).attr('href');

            if (href == undefined || href == '') return;

            if ((href.match(/^https?\:/i)) && (!href.match(/^https?\:\/\/(([^.]+)\.)?mariecurie\.org\.uk/i)) && (!href.match(/^https?\:\/\/#\$\$/i))) {
                $(this).click(function () { var buildUrl = '/external/' + href.replace(/^https?\:\/\//i, ''); _gaq.push(['_trackPageview', buildUrl.toLowerCase()]); });
            } else if (href.match(filetypes)) {
                $(this).click(function () { var buildUrl = href.substr(0, 1) == "/" ? href.substr(1) : href.replace(/^https?\:\/\//i, ''); buildUrl = '/download/' + buildUrl; var filePath = ReplaceAll(buildUrl, '_', '-'); filePath = ReplaceAll(filePath, '%20', '-'); _gaq.push(['_trackPageview', filePath.toLowerCase()]); });
            }
        } catch (err) { }
    });

    //MSP panel click tracking
    $('a[href^="http://#$$"]').click(function () { var buildUrl = this.href.split('$$'); _gaq.push(['_trackEvent', 'MSP Tab', 'MSP Tab click', buildUrl]); });

    // Event external registration form link click tracking
    $('a.external-registration').click(function () { _gaq.push(['_trackEvent', 'Event Register_3rd Party Site', 'Button Click', 'Register Now_Event 3rd Party Site']); });
});