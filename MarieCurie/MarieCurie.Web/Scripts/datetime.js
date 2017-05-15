
function getAge(birth, eventDate) {
    var comparisonDate = eventDate.length > 0 ? new Date(eventDate) : new Date();

    var nowyear = comparisonDate.getFullYear();
    var nowmonth = comparisonDate.getMonth();
    var nowday = comparisonDate.getDate();

	var birthyear = birth.getFullYear();
	var birthmonth = birth.getMonth();
	var birthday = birth.getDate();

	var age = nowyear - birthyear;
	var age_month = nowmonth - birthmonth;
	var age_day = nowday - birthday;
		
	if (age_month < 0 || (age_month == 0 && age_day < 0)) {
		age = parseInt(age) - 1;
	}
	//alert(age);

	return age;
}

function dateOfBirthCheck(sessionId, guardianlimit, agelimit, checkrequired) {
	var containerId = "#" + sessionId + "-AdultNameContainer";
	$(containerId).hide();

	var $dayField = $('select.' + sessionId + '-DobDay').first();
	var $monthField = $('select.' + sessionId + '-DobMonth').first();
    var $yearField = $('select.' + sessionId + '-DobYear').first();
    var day = $dayField.val();
    var month = $monthField.val();
    var year = $yearField.val();
    var $form = $yearField.closest('form');
    var $wrapper = $yearField.closest('.form-group');
    var eventDate = $('input.SelectedEventDate', $form).val();
    var badDateMsg = $wrapper.data('baddatemsg');
    var requiredDobMsg = $wrapper.data('requireddatemsg');
    var tooYoungMsg = $wrapper.data('tooyoungmsg');

    if (day > 0 && month > 0 && year > 0) {
        if (!IsValidDate(month + '/' + day + '/' + year)) {
            ShowError($yearField, badDateMsg);
            return false;
        }

		var jsmonth = month - 1; //month is 0 based in JavaScript
		var birthDate = new Date(year, jsmonth, day);
		var age = getAge(birthDate, eventDate);

        if (agelimit && age < agelimit) {
            ShowError($yearField, tooYoungMsg);
            return false;
        } else if (guardianlimit && age < guardianlimit) {
            HideError($yearField);
            $(containerId).show();
        } else {
            HideError($yearField);
        }
    }

    if (checkrequired && requiredDobMsg && requiredDobMsg.length > 0 && (day == 0 || month == 0 || year == 0)) {
        ShowError($yearField, requiredDobMsg);
        return false;
    }

    HideError($yearField);
    return true;
}

function futureDateCheck($dateField, checkrequired) {
    var $wrapper = $dateField.closest('.form-group');
    var $dayField = $('select.threepartday', $wrapper).first();
    var $monthField = $('select.threepartmonth', $wrapper).first();
    var $yearField = $('select.threepartyear', $wrapper).first();
    var day = $dayField.val();
    var month = $monthField.val();
    var year = $yearField.val();
    var badDateMsg = $wrapper.data('baddatemsg');
    var requiredDateMsg = $wrapper.data('requireddatemsg');
    var notFutureDateMsg = $wrapper.data('notfuturedatemsg');

    if (day > 0 && month > 0 && year > 0) {
        if (!IsValidDate(month + '/' + day + '/' + year)) {
            ShowError($yearField, badDateMsg);
            return false;
        }

        var jsmonth = month - 1; //month is 0 based in JavaScript
        var eventDate = new Date(year, jsmonth, day);
        var today = new Date();

        if (today > eventDate) { // eventDate is in the past
            ShowError($yearField, notFutureDateMsg);
            return false;
        }
    }

    if (checkrequired && requiredDateMsg && requiredDateMsg.length > 0 && (day == 0 || month == 0 || year == 0)) {
        ShowError($yearField, requiredDateMsg);
        return false;
    }

    HideError($yearField);
    return true;
}

function IsValidDate(date) {
	var regex = /\d{1,2}\/\d{1,2}\/\d{4}/;
	if (!regex.test(date)) return false;
	var day = Number(date.split("/")[1]);
	date = new Date(date);
	if (date && date.getDate() != day) return false;
	return true;
}

function ShowError($yearField, message) {
    var $wrapper = $yearField.closest('.form-group');
    var $msgSpan = $('.has-error-alert', $wrapper);
    SetErrorMessage($msgSpan, message);
    $yearField.attr('aria-invalid', 'true');
    $wrapper.addClass('has-error').removeClass('has-success');
    $msgSpan.addClass('field-validation-error').removeClass('field-validation-valid');
}

function HideError($yearField) {
    var $wrapper = $yearField.closest('.form-group');
    var $msgSpan = $('.has-error-alert', $wrapper);
    $yearField.attr('aria-invalid', 'false');
    $wrapper.addClass('has-success').removeClass('has-error');
    $msgSpan.addClass('field-validation-error').removeClass('field-validation-valid');
}

function SetErrorMessage($messageSpan, message) {
    $messageSpan.html('<span>' + message + '</span>');
}

$(document).ready(function () {
    // Any booking option number selection to set selected event date
    $('.radio input.BookingOptionNumber, .radio-inline input.BookingOptionNumber').on('change', function () {
        var $formGroup = $(this).closest('.form-group');
        var $checkedOption = $('input.BookingOptionNumber:checked', $formGroup);

        // if there are no checked options (like on page load), take the first option's date
        if ($checkedOption.length == 0) {
            $checkedOption = $('input.BookingOptionNumber', $formGroup).first();
        }

        var $dateField = $('input.SelectedEventDate', $formGroup).first();
        $dateField.val($checkedOption.data('eventdate'));
    });

    // Hide any adult name containers
    $('.adultNameContainer').hide();

    // Any three part DoB date select to fire its onchange event on blur
    $('div.form-group.threepartdob select.threepartday, ' +
        'div.form-group.threepartdob select.threepartmonth, ' +
        'div.form-group.threepartdob select.threepartyear').on('blur change', function () {
        var $wrapper = $(this).closest('div.form-group');
        var agelimit = $wrapper.data('agelimit');
        var guardianlimit = $wrapper.data('guardianlimit');
        var sessionid = $wrapper.data('sessionid');
        dateOfBirthCheck(sessionid, guardianlimit, agelimit, false);
    });

    // Any three part future date select to fire its onchange event on blur
    $('div.form-group.threepartfuturedate select.threepartday, ' +
        'div.form-group.threepartfuturedate select.threepartmonth, ' +
        'div.form-group.threepartfuturedate select.threepartyear').on('blur change', function () {
        futureDateCheck($(this), false);
    });

    // Date check when submitting a form with a three part date DoB
    $('form').has('div.form-group.threepartdob').on('submit', function (e) {
        var $dobWrapper = $(this).find('div.form-group.threepartdob');
        var agelimit = $dobWrapper.data('agelimit');
        var guardianlimit = $dobWrapper.data('guardianlimit');
        var sessionid = $dobWrapper.data('sessionid');
        if (!dateOfBirthCheck(sessionid, guardianlimit, agelimit, true)) {
            e.preventDefault();
        }
    });

    // Date check when submitting a form with a three part date in the future (e.g. event date)
    $('form').has('div.form-group.threepartfuturedate').on('submit', function (e) {
        var $yearField = $(this).find('div.form-group.threepartfuturedate select.threepartyear');
        if (!futureDateCheck($yearField, true)) {
            e.preventDefault();
        }
    });

    // Finally kick off a blur event on page load in case we came back from the server
    $('.radio input.BookingOptionNumber:first-child, .radio-inline input.BookingOptionNumber:first-child').change();
    $('select.threepartyear').change();
});