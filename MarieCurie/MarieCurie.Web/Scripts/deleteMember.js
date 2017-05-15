$(document).ready(function () {

	$('.deleteMemberModalLink').click(function () {
		var url = $(this).attr('data-url');

		$.get(url, function (data) {
			$('#modalContainer').html(data);

			$('#modalContainer').modal('show');
		});
	});

});