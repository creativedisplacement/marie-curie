/* ------------------------------------------------------------
		Global JavaScript functions
	---------------------------------------------------------------- */

$(document).ready(function () {
	// Target your .container, .wrapper, .post, etc.
	$('body').fitVids();
});

/* ------------------------------------------------------------
	Breakpoint-specific JavaScript functions
---------------------------------------------------------------- */

$(document).ready(function () {
    // PHONES
    jRes.addFunc({
	    breakpoint: ['handheld'],
	    enter: function () {
		    // Collapse the sitemap 
		    $('#sitemap-nav').removeClass('in');
		    // Create a dropdown menu for the top nav
		  //  dropDownNav('#top-nav', '#top-nav ul', '- Other menu options -');
		    // Create a dropdown menu for the sub nav
	        // dropDownNav('#sub-nav', '#sub-nav div', '- Media Centre menu -');
		    $('ul.login').removeClass('navbar-right');
		    $('ul.login li').removeClass('dropdown');
		    $('ul.login li a').removeClass('dropdown-toggle');
		    $('ul.login li a').attr('data-toggle', 'none');
		    $('ul.login li').removeClass('open');
		    $('ul.magic').removeClass('dropdown-menu');
		    $('form.navbar-form').removeClass('navbar-right');
		    
		    MorOptions();
		    $('#top-nav').hide();
		    $('ul.magic li.more-options a').click(function () {

		        $('#top-nav').slideDown();
		        $('ul.magic li.more-options').hide();
		        FewerOptions();

		    });

		    $('#top-nav ul').on('click', ' li a.fewer-options', function () {
		        $('#top-nav').slideUp();
		        $('ul.magic li.more-options').show();
		        $('#top-nav > ul #f-option').remove();
		    });

		    if ($('span.reset').css('visibility') == 'visible')
		    {
		        $('span.reset').css('display', 'block');
		    }

	        ///Press relesases

		    PressReleases();

		    Attachment();

		    AttachmentForSmallEfect();

		    ChangeDownloadButton();

		    MovePressReleasesBox();

	        //Search bar

		    searchBar();

            //media Resources

		    RemoveMediaImage();

	        //case study

		    MoveTheShareStory();

            //home page
		    HomeContacatMove();

	    },
	    // Unbind functions for mobile
	    exit: function () {
		    // Expand the sitemap
		    $('#sitemap-nav').addClass('in');
		    // Remove the top nav dropdown menu
		    $('#top-nav select').remove();
		    // Show the top nav bulleted list
		    $('#top-nav ul').show();
		    // Remove the sub nav dropdown menu
		    //$('#sub-nav select').remove();
		    // Show the sub nav bulleted list
		    //$('#sub-nav div').show();
		    // Remove the collapse class from the main nav 
		    $('.navbar-collapse').removeClass('in');

		    $('ul.login').addClass('navbar-right');
		    $('ul.login li').addClass('dropdown');
		    $('ul.login li a').addClass('dropdown-toggle');
		    $('ul.login li a').attr('data-toggle', 'data-toggle');
		    $('ul.magic').addClass('dropdown-menu');
		    $('#main-nav ul.magic li a').attr('class', '').attr('data-toggle', 'data-toggle');
		    $('form.navbar-form').addClass('navbar-right');
		    $('#main-nav').show();
		    $('#top-nav').show();
		    $('ul.magic li.more-options').remove();
		    $('#top-nav > ul #f-option').remove();


	        ///Press relesases
		    MovePressReleasesBox();

		    if ($('span.reset').css('display') == 'block') {
		        $('span.reset').css('display', 'inline');
		    }

		    PressReleasesRemove();

		    BackDownlaodButton();
		    RemoveSearchBar();

	        //media resources
		    ChangeMediaImage();

		    $('div.img_dropdown').css('display', 'none');
		    $('.col-xs-6').attr('style', '');

	        //case study

		    MoveTheShareStoryBack();

	        // home page

		    HomeContactBack();
	    }
    });
    // Tablet
    jRes.addFunc({
	    breakpoint: ['tablet'],
	    enter: function () {
		    $('#sitemap-nav').removeClass('in');
		    // Create a dropdown menu for the top nav
		   // dropDownNav('#top-nav', '#top-nav ul', '- Other menu options -');
		    // Create a dropdown menu for the sub nav
	        //dropDownNav('#sub-nav', '#sub-nav div', '- Media Centre menu -');

		    $('ul.login').removeClass('navbar-right');
		    $('ul.login li').removeClass('dropdown');
		    $('ul.login li a').removeClass('dropdown-toggle');
		    $('ul.login li a').attr('data-toggle', 'none');
		    $('ul.login li').removeClass('open');
		    $('ul.magic').removeClass('dropdown-menu');
		    $('form.navbar-form').removeClass('navbar-right');
		    $('#main-nav').css('display', 'none');
		    $('div.show_box').click(function () {
		        //$('#main-nav').toggle();

		        if ($('#main-nav').is(':visible')) {
		             
		            $('#main-nav').hide();
		        }
		        else
		        {
		      
		            $('#main-nav').show();
		        }

		        $('#top-nav').hide();

		    });

		    Attachment();
		    MorOptions();
		    $('#top-nav').hide();
		    $('ul.magic li.more-options a').click(function () {

		        $('#top-nav').slideDown();
		        $('ul.magic li.more-options').hide();
		        FewerOptions();

		    });

		    $('#top-nav ul').on('click', ' li a.fewer-options', function () {
		        $('#top-nav').slideUp();
		        $('ul.magic li.more-options').show();
		        $('#top-nav > ul #f-option').remove();
		    });

            //media resources
		    RemoveMediaImage();

	        //case study

		    MoveTheShareStory();


	        //press releases
		    MovePressReleasesBox();

            //
		    MoveKeyInfoPanels();

	        //home
		    HomeContacatMove();

		    Attachment();

	    },
	    // Unbind functions for mobile
	    exit: function () {
		    // Expand the sitemap
		    $('#sitemap-nav').addClass('in');
		    // Remove the top nav dropdown menu
		    $('#top-nav select').remove();
		    // Show the top nav bulleted list
		    $('#top-nav ul').show();
		    // Remove the sub nav dropdown menu
		    //$('#sub-nav select').remove();
		    // Show the sub nav bulleted list
		    //$('#sub-nav div').show();


		    $('ul.login').addClass('navbar-right');
		    $('ul.login li').addClass('dropdown');
		    $('ul.login li a').addClass('dropdown-toggle');
		    $('ul.login li a').attr('data-toggle', 'data-toggle');
		    $('ul.magic').remove('magic').addClass('magic').addClass('dropdown-menu');
		    $('#main-nav ul.magic li a').attr('class', '').attr('data-toggle', '');
		    $('form.navbar-form').addClass('navbar-right');
		    $('#main-nav').show();
		    $('#top-nav').show();
		    $('ul.magic li.more-options').remove();
		    $('#top-nav > ul #f-option').remove();
		    $('ul.login li').click(function () {

		        if ($(this).hasClass('open')) {
		            $(this).removeClass('open');
		        }
		        else {
		            $(this).addClass('open');
		        }
		    });

            //remove media resources
		    ChangeMediaImage();

	        //case study

		    MoveTheShareStoryBack();

	        //press releases

		    MoveBackPressReleasesBox();

		    MoveKeyInfoPanelsBack();

		    HomeContactBack();
		
	    }
    });
    // Laptop
    jRes.addFunc({
	    breakpoint: ['laptop'],
	    enter: function () {
	        $('#sitemap-nav').addClass('in');
	        Attachment();
	    },
	    // Unbind functions for mobile
	    exit: function () {
		    $('#sitemap-nav').removeClass('in');
	    }
    });
    // Desktop
    jRes.addFunc({
	    breakpoint: ['desktop'],
	    enter: function () {
	        $('#sitemap-nav').addClass('in');

	        Attachment();
	    },
	    // Unbind functions for mobile
	    exit: function () {
	        $('#sitemap-nav').removeClass('in');
	        $('div.img_dropdown').css('display', 'none');
	    }
    });
});



function MorOptions() {
    $('ul.magic').append('<li class="more-options"><a> More Options <i class="fa fa-chevron-down"></i></a></li>');
}

function FewerOptions() {
    $('#top-nav > ul').append('<li id="f-option"><a class="fewer-options">Fewer Options <i class="fa fa-chevron-up"></i></a></li>');
}

function PressReleases() {
    

    $('.col-tog').addClass('collapse');
    $('.filter').attr('data-toggle', 'collapse').attr('data-target', '.col-tog').addClass('btn').addClass('btn-default');//
    $('.form-inline').addClass('search-area');
    $('.filt_lbl').removeClass('d_normal');
    $('.topic span.visible-xs').addClass('d_normal');

    $('#arrowbox').attr('data-target', '.col-tog');


    $('.filter').click(function () {

        $('.pressReleses').toggleClass("grenback whiteback");
        $('i.fb').toggleClass('fa fa-chevron-down visible-xs fa fa-chevron-up visible-xs');
        $('#downline').toggleClass('yes no');


        if ($('#topics-nav').css('display') == 'block') {
            $('#topics-nav').addClass('col-tog');
        }
        else {
            $('#topics-nav').removeClass('col-tog');
        }
        
    });



    $('#arrowbox').click(function() {

        $('.pressReleses').toggleClass("grenback whiteback");

        if ($('#topics-nav').css('display') == 'block') {

            $('#topics-nav').addClass('col-tog');
            $('i.fb').toggleClass('fa fa-chevron-down visible-xs fa fa-chevron-up visible-xs');

        }
        else
        {
            $('#topics-nav').removeClass('col-tog');
            $('i.fb').toggleClass('fa fa-chevron-down visible-xs fa fa-chevron-up visible-xs');
        }

    })
   
  

    $(function () {
        $('.dp').datepicker().on('changeDate', function (e) {

            $('.reset').css('display', 'block');
            $('.reset').css('margin', '0px');
            $('.reset').css('margin-right', '5px');
        });
    });


    $('.reset').click(function () {

        var datePub = $('#fltStartPublish').val();
        var datePub_ = $('#fltEndPublish').val();
        if (datePub != '' || datePub_ != '') {

            $('#fltStartPublish').val('');
            $('#fltEndPublish').val('');
            $('.reset').css('display', 'none');
            $('.reset').css('margin', '-15px');
        }
        else {
            $('.reset').css('display', 'none');
            $('.reset').css('margin', '-15px');
        }
        $('.reset').parent().find('button.btn_filt.btn-home span.filter_btn').removeClass('hide-sm');
    });


    $('.topic').click(function () {
        $('#downline').toggleClass('yes');
    });

    
}


function PressReleasesRemove() {

    $('.filter').attr('data-toggle', '').attr('data-target', '#topics-nav').removeClass('btn').removeClass('btn-default')
    $('.col-tog').removeClass('collapse');
    $('.filter .n').remove();

    $('.pressReleses').removeClass('grenback').addClass('whiteback').toggleClass("border_btm");
    

    $('.form-inline').removeClass('search-area');

    $('.filt_lbl').addClass('d_normal');

    $('.topic span.visible-xs').removeClass('d_normal');

    $('#arrowbox').attr('data-target', '#topics-nav').css('visiblity', 'hidden');

    $('#topics-nav').remove('col-tog');

    $('#topics-nav').addClass('collapse');

    $(function () {
        $('.dp').datepicker().on('changeDate', function (e) {

            $('.reset').css('visibility', 'visible');
            $('.reset').css('margin', '0px');
            $('.reset').css('margin-right', '5px');
            $('.reset').css('display', '-');
        });
    });

    $('.col-tog').attr('style', '');

    $('.topic').click(function () {
        $('.pressReleses').removeClass('greenback');

        $('#downline').toggleClass('yes no');
      
    });

    
    $('#arrowbox').click(function () {
        $('#downline').attr('class', 'yes');
        $('.pressReleses').removeClass('grenback');
        if ($('.pressReleses').hasClass('wihteback'))
        {

        }
        else
        {
            $('.pressReleses').addClass('whiteback').removeClass('border_btm');
        }
    });

}

function searchBar() {
    $('.search_box ').css('display', 'none');
    $('.sml-search').addClass('ext-small');
    $('.ext-small').css('width', 'auto');
    $('.btn_search').click(function (e) {

    $(this).css('float', 'right');

    e.preventDefault();

        $('.btn_donate').hide();
        $('.ext-small').css('width', '70%');
        $('.search_box ').show().animate({ 'width': '100%' }, 'slow', 'linear');
        return false;

    });
}

function RemoveSearchBar() {
    $('.btn_donate').css('display', 'inline-block');
    $('.search_box').css('display', 'inline-block').css('width','245px');
    $('.btn_search').css('float', 'none');
    $('.sml-search').removeClass('ext-small').attr('style', '');
    $('.sml-search').css('width', '245px');
    $('.btn_search').click(function (e) {
        $(this).css('float', 'none');
        $('.btn_donate').css('display', 'inline-block')
    
        $('.search_box').css('display', 'inline-block').css('width', '245px');
        $('.sml-search').css('width', '245px');
       
    });

}

var Screatbox = false;
var g_attached = false;

function Attachment() {

    if (!g_attached) {

        $(document).click(function (evt) {
            if (Screatbox == true) {
                $('div.img_dropdown').css('display', 'none');
                $('img.img_border').css('outline', 'solid 5px #fff');
            }
        });




        $('img.img_border').click(function (e) {

            $('img.img_border').css('outline', 'solid 5px #fff');
            if ($('div.img_dropdown').is(':visible')) {
                Screatbox = false;
                $('div.img_dropdown').css('display', 'none');
                $(this).css('outline', 'solid 5px #fff');
                e.stopPropagation();
            }
            else {
                $('div.img_dropdown').css('display', 'none');
                $(this).parent().next('div.img_dropdown').css('display', 'block');
                $(this).css('outline', 'solid 5px rgb(255,246,37)');
                Screatbox = true;
                e.stopPropagation();
            }

        });
    }

g_attached = true;

 /*   $('img.img_border').toggle(function () {

      //  $('div.img_dropdown').css('display', 'none');
        $(this).parent().next('div.img_dropdown').css('display', 'block');
        $(this).css('outline', 'solid 5px #ffe600');

    },
    function () {
       /// $('div.img_dropdown').css('display', 'none');
        $(this).css('outline', 'solid 5px #fff');
    });*/
  
}

function AttachmentForSmallEfect()
{
   
    $('img.img_border').click(function myfunction() {

        $('.col-xs-6').css('width', '50%');
        $(this).closest('.col-xs-6').css('width','100%');

        if ($('div.img_dropdown').is(':visible')) {
            $(this).closest('.col-xs-6').css('width', '100%');
        }

    })
}

function RemoveMediaImage()
{
  

    $('div.change-above').appendTo('#move-area').css('padding-bottom','25px');
}

function ChangeMediaImage() {

    $('div.change-above').appendTo('#above-area');
}

function ChangeDownloadButton()
{
    $('p.DownloadLink').appendTo('#top_btn');

    $('.widt_img').css('width', '100%');
}

function BackDownlaodButton()
{
    $('p.DownloadLink').appendTo('#above_btn');

    $('.widt_img').css('width', 'auto');
}

function MoveTheShareStory() {


    $('div.share-story').appendTo('#bottom-story');
}


function MoveTheShareStoryBack() {


    $('div.share-story').appendTo('#top-story');
}

function MovePressReleasesBox()
{
    $('#sing-contact').appendTo('#press-bottom');
}

function MoveBackPressReleasesBox() {
    $('#sing-contact').appendTo('#press-top');
}

function HomeContacatMove()
{
    $('div.contact-panel').appendTo('#home-bottom');

}

function HomeContactBack()
{
    $('div.contact-panel').appendTo('#home-top');
}

function MoveKeyInfoPanels()
{
    $('#my-last').appendTo('#tabel-view');
    $('#my-first').appendTo('#tabel-view');
}

function MoveKeyInfoPanelsBack() {
    $('#my-last').appendTo('#row-top');
    $('#my-first').appendTo('#row-bottom');
}