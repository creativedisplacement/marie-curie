$(document).ready(function () {
    
    var selectedId = $('#select-widget').val();
    $('.widget-id_' + selectedId).removeClass('hide');
    $('#select-widget').on('change', function () {
        var wId = $(this).val();
        $('.widget-embed').addClass('hide');
        $('.widget-id_' + wId).removeClass('hide');

        $('.widget-id_' + wId +' .copy-button').zclip('remove').zclip({
            path: '/Views/MediaCentre/js/ZeroClipboard.swf',
            copy: function () {
                return $(this).parent().find('.copy-text').val();
            }
        });
    });

    $('.copy-button').zclip({
        path: '/Views/MediaCentre/js/ZeroClipboard.swf',
        copy: function () {
            return $(this).parent().find('.copy-text').val();
        }
    });
});