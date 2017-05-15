jQuery.validator.addMethod('threepartdate', function (value, element, params) {
    var $wrapper = $(element).closest('.form-group');
    var $dayField = $('.threepartday', $wrapper).first();
    var $monthField = $('.threepartmonth', $wrapper).first();
    var $yearField = $('.threepartyear', $wrapper).first();

    var requiredErrorMsg = params.requirederrormsg;

    // If date is required, test for that first
    if (requiredErrorMsg) {
        if ($dayField.val() == 0 || $monthField.val() == 0 || $yearField.val() == 0) {
            $(element).data('val-required', requiredErrorMsg);
            var $yearErrorSpan = $('.has-error-alert', $wrapper);
            if ($yearErrorSpan.length > 0) {
                $yearErrorSpan.html('<span class="has-error">' + requiredErrorMsg + '</span>');
            }
            return false;
        }
    } else {
        // If no date selected, it's OK
        if ($dayField.val() == 0 && $monthField.val() == 0 && $yearField.val() == 0)
            return true;
    }

    // Finally check for a valid date
    if (validDate($yearField.val() + "-" + pad($monthField.val(), 2) + "-" + pad($dayField.val(), 2)))
        return true;

    return false;
}, '');

jQuery.validator.unobtrusive.adapters.add('threepartdate', ['dayproperty', 'monthproperty', 'yearproperty', 'requirederrormsg'], function (options) {
    options.rules['threepartdate'] = options.params;
    options.messages['threepartdate'] = options.message;
});

function validDate(text) {

    var date = Date.parse(text);

    if (isNaN(date)) {
        return false;
    }

    var comp = text.split('-');

    if (comp.length !== 3) {
        return false;
    }

    var y = parseInt(comp[0], 10);
    var m = parseInt(comp[1], 10);
    var d = parseInt(comp[2], 10);
    var date = new Date(y, m - 1, d);
    return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
}

function pad(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}