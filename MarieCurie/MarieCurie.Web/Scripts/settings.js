$(document).ready(function () {

    //Press Relases



    $('.reset').click(function () {
    
        ResetDate();

    });


    function ResetDate()
    {
            var datePub = $('#fltStartPublish').val();
            var datePub_ = $('#fltEndPublish').val();

            //go overboard on the resetting of dropdowns as FF doesn't redraw properly after just setting the attribute
            $('select[name="lstContentType"] option').removeAttr('selected');
            $('select[name="lstCategories"] option').removeAttr('selected');
            $('select[name="lstContentType"] option[value=""]').prop('selected', 'selected');
            $('select[name="lstCategories"] option[value=""]').prop('selected', 'selected');
            //$('select[name="lstContentType"]').val('');
            //$('select[name="lstCategories"]').val('');

            if (datePub != '' || datePub_ != '')
            {
                 
                $('#fltStartPublish').val('');
                $('#fltEndPublish').val('');
                $('.reset').css('visibility', 'hidden');
                $('.reset').css('margin', '-15px');
            }
            else
            {
                $('.reset').css('visibility', 'hidden');
                $('.reset').css('margin', '-15px');
            }
            $('.reset').parent().find('button.btn_filt.btn-home span.filter_btn').removeClass('hide-sm');
    }
    
    NoAttach();

    function NoAttach() {
        var count = $('ul.attach').children().length;
        var totalCount = count + $('div.panel_bac .related-media').length;

        //NOTE: isn't this made redundant by the block below?
        //var ScreenSize = $(window).width();
        //if (ScreenSize >= 1200 && count == 0) {

        //    $('div.attach').css('display', 'none');
        //    $('div.panel_bac').css('display', 'none');
        //}

        //NOTE: rewritten to cater for more circumstances
        if (totalCount == 0) {
            $('div.panel_bac').css('display', 'none');
        }

        if (count == 0) {
            $('div.attach').css('display', 'none');
        }

        //if (count == 0) {
        //    $('div.attach').css('display', 'none');
        //    $('div.panel_bac').css('display', 'none');
        //}
        //else
        //{
        //    $('div.panel_bac').css('display', 'block');
        //}


    }

    $('.topic').click(function () {

        $('i.n').toggleClass('fa-chevron-down fa-chevron-up');
        $('#downline').toggleClass('yes no');
        $('.whiteback').toggleClass("border_btm");
        $('.greenback').toggleClass("border_btm");

    });

    $('#arrowbox').click(function () {
        $('#downline').attr('class', 'yes');
        $('i.n').removeClass('n fa-chevron-down fa-chevron-up').attr('class', 'n fa fa-chevron-down fa-chevron-down');
        $('.whiteback').removeClass("border_btm");
    });   
});

