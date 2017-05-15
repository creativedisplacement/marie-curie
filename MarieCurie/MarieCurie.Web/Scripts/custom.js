/* 
	Title: Marie Curie - Global JS functions
	Version: 1.0
	Author: Ben Ellis
	Last updated: 22/11/2013
*/

/* ------------------------------------------------------------
	jRespond breakpoints
---------------------------------------------------------------- */

var jRes = jRespond([
	{
		label: 'handheld',
		enter: 0,
		exit: 767
	},{
		label: 'tablet',
		enter: 768,
		exit: 992,
		

	},{
		label: 'laptop',
		enter: 993,
		exit: 1199
	},{
		label: 'desktop',
		enter: 1200,
		exit: 10000
	}
]);

$(function () {

    //trying some trickery for the PR double click wierdness
    if ($('.press-release-landing').length) {
        var is_touch_device = 'ontouchstart' in document.documentElement;

        if (is_touch_device) {
            $('.press-release-landing a').removeClass('notouch');
        }
    }

    //$('select[name="lstContentType"] option[value=""]').attr('selected', 'selected');
    //$('select[name="lstCategories"] option[value=""]').attr('selected', 'selected');
    //
    $('select[name="lstContentType"], select[name="lstCategories"]').change(function () {
        $('.reset').css('visibility', 'visible');
        $('.reset').css('margin', '0px');
        $('.reset').css('margin-right', '0px');

        
    });

    //more elastic-trickery
    

    var fromDate = $('#fltStartPublish').datepicker({
        format: 'dd/mm/yyyy',
        onRender: function (date) {
            return '';
        }
    }).on('changeDate', function (evt) {
          $('.reset').css('visibility', 'visible');
          $('.reset').css('margin', '0px');
          $('.reset').css('margin-right', '0px');
          $('.reset').parent().find('button.btn_filt.btn-home span.filter_btn').addClass('hide-sm');
        if (evt.date.valueOf() > toDate.date.valueOf()) {
            var newDate = new Date(evt.date);
            newDate.setDate(newDate.getDate() + 1);
            toDate.setValue(newDate);
        } else {
            toDate.update();
        }
        fromDate.hide();
    }).data('datepicker');

    var toDate = $('#fltEndPublish').datepicker({
        format: 'dd/mm/yyyy',
        onRender: function (date) {
            return date.valueOf() <= fromDate.date.valueOf() ? 'disabled' : '';
        }
    }).on('changeDate', function (evt) {
        $('.reset').css('visibility', 'visible');
        $('.reset').css('margin', '0px');
        $('.reset').css('margin-right', '0px');
        $('.reset').parent().find('button.btn_filt.btn-home span.filter_btn').addClass('hide-sm');
        toDate.hide();
    }).data('datepicker');
});

$('.endp').click(function () {
    $('#fltEndPublish').datepicker('show');
});

$('.startp').click(function () {
    $('#fltStartPublish').datepicker('show');
});

$('#fltStartPublish').click(function () {
    $(this).datepicker('show');
});

$('#fltEndPublish').click(function () {
    $(this).datepicker('show');
});


function dropDownNav(id,navContainer,defaultText){
	// Hide the bulleted list
	$(navContainer).hide();
	// Create the dropdown base
	$("<form><select class=\"form-control\" /></form>").appendTo(id);
	// Create default option "Go to..."
	$("<option />", {
		"selected": "selected",
		"value"   : "",
		"text"    : defaultText
	}).appendTo(id+" select");
	// Populate dropdown with menu items
	$(id+" a").each(function(){
		// Current item
		var el = $(this);
		// Text for current item
		var itemText = $(el).text();
		// If the current value is the same as the href
		if(el.attr("href") == window.location){
			// Create the HTML for the drop down
			$("<option />", {
				"selected": "selected",
				"value"   : el.attr("href"),
				"text"    : itemText
			}).appendTo(id+" select");
		}
		else {
			// Create the HTML for the drop down
			$("<option />", {
				"value"   : el.attr("href"),
				"text"    : itemText
			}).appendTo(id+" select");
		}
	});
	// To make dropdown actually work
	$(id+" select").change(function() {
		window.location = $(this).find("option:selected").val();
	});
}


//setup email validation
(function () {
    if ($('#emailSignupPanel').length) {
        H5F.setup(document.getElementById('emailSignupPanel'));
    }
})();


//magic for sub menu

$(document).ready(function () {

    if ($('ul.sub-in-sub > li').hasClass('active'))
    {
        $('ul.sub-list > li > a').removeClass('active');
    }


    $('.sub-toggle').click(function () {

        $('.sub-toggle > span.fa').toggleClass('fa-caret-up');
        $(this).toggleClass('main-down');
    });

    $('.sub-children-tog').click(function () {

        $(this).children('span.fa').toggleClass('fa-caret-up');

    });

});